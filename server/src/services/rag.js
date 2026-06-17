import { searchSimilar } from "./vectorStore.js";
import { streamChat } from "./gemini.js";

// ─── RAG Pipeline ─────────────────────────────────────────────────────────────
// 1. Embed the user query
// 2. Retrieve top-k similar knowledge chunks (vector similarity search)
// 3. Inject retrieved context into LLM system prompt
// 4. Stream the response back
export async function ragChat(userMessage, chatHistory) {
  // Step 1 & 2: Retrieve relevant DSA knowledge
  const relevantDocs = await searchSimilar(userMessage, 3);
  const sources = [...new Set(relevantDocs.map((d) => d.topic))];
  const context = relevantDocs
    .map((d) => `### ${d.topic}\n${d.content}`)
    .join("\n\n---\n\n");

  // Step 3 & 4: Stream response with retrieved context
  const streamResult = await streamChat(userMessage, chatHistory, context);

  return { streamResult, sources };
}
