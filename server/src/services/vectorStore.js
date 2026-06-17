import fs from "fs";
import { getEmbedding } from "./gemini.js";
import { knowledgeBase } from "../data/knowledge.js";

const CACHE_FILE = "./embeddings_cache.json";
const EMBED_DELAY_MS = 700; // Stay well under Gemini free-tier rate limits

// ─── Cosine Similarity ────────────────────────────────────────────────────────
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── In-Memory Store ─────────────────────────────────────────────────────────
let documents = [];

export async function initVectorStore() {
  // Load from cache if it exists — avoids re-embedding on every restart
  if (fs.existsSync(CACHE_FILE)) {
    documents = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    console.log(`✅ Loaded ${documents.length} embeddings from cache`);
    return;
  }

  console.log("🔄 Computing embeddings for DSA knowledge base...");
  console.log(`   This runs once and is cached to ${CACHE_FILE}`);

  for (const doc of knowledgeBase) {
    try {
      const embedding = await getEmbedding(doc.content);
      documents.push({ ...doc, embedding });
      console.log(`   ✓ Embedded: ${doc.topic}`);
      await sleep(EMBED_DELAY_MS); // rate limit buffer
    } catch (err) {
      console.error(`   ✗ Failed to embed ${doc.topic}:`, err.message);
      throw err;
    }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(documents, null, 2));
  console.log(`✅ All ${documents.length} embeddings computed and cached`);
}

// ─── Semantic Search ──────────────────────────────────────────────────────────
export async function searchSimilar(query, topK = 3) {
  if (!documents.length) throw new Error("Vector store not initialized");

  const queryEmbedding = await getEmbedding(query);

  const scored = documents.map((doc) => ({
    id: doc.id,
    topic: doc.topic,
    content: doc.content,
    score: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}
