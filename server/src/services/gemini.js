import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─── Embeddings ──────────────────────────────────────────────────────────────
export async function getEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// ─── Streaming Chat with RAG context ─────────────────────────────────────────
export async function streamChat(userMessage, chatHistory, context) {
  const systemInstruction = `You are AlgoChat, an expert DSA and competitive programming mentor. You help developers master data structures, algorithms, and ace coding interviews.

Relevant knowledge retrieved for this question:
${context}

Your guidelines:
- Give clear, educational explanations with intuition before jumping to code
- Always include working JavaScript code examples (add complexity analysis as comments)
- State Time and Space complexity for every solution
- Mention related LeetCode problem numbers when relevant  
- If asked about a specific problem, give the optimal solution and explain WHY it works
- Be encouraging — the student is preparing for interviews`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
  });

  // Convert our chat history format to Gemini format
  const formattedHistory = chatHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({ history: formattedHistory });
  return chat.sendMessageStream(userMessage);
}
