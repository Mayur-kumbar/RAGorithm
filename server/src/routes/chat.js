import express from "express";
import { ragChat } from "../services/rag.js";

const router = express.Router();

// ─── Health Check ─────────────────────────────────────────────────────────────
router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "AlgoChat RAG API", version: "1.0.0" });
});

// ─── Streaming Chat Endpoint (SSE) ────────────────────────────────────────────
// Uses Server-Sent Events so the client sees tokens as they arrive — same UX as ChatGPT
router.post("/stream", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Set up SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable nginx buffering

  function send(payload) {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }

  try {
    const { streamResult, sources } = await ragChat(message, history);

    // First event: tell the client which knowledge chunks were retrieved
    send({ type: "sources", sources });

    // Stream each text chunk as it arrives from Gemini
    for await (const chunk of streamResult.stream) {
      const text = chunk.text();
      if (text) send({ type: "chunk", text });
    }

    send({ type: "done" });
  } catch (err) {
    console.error("RAG pipeline error:", err.message);
    send({ type: "error", message: "Something went wrong. Please try again." });
  } finally {
    res.end();
  }
});

export default router;
