import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initVectorStore } from "./services/vectorStore.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/chat", chatRoutes);

// ─── Serve React Client in Production ────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
  console.log(`📦 Serving React client from ${clientDist}`);
}

// ─── Boot: init vector store, then start listening ───────────────────────────
initVectorStore()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 AlgoChat server running on http://localhost:${PORT}`);
      console.log(`   API: POST /api/chat/stream`);
      if (process.env.NODE_ENV !== "production") {
        console.log(`   Dev client: http://localhost:5173`);
      }
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize vector store:", err.message);
    process.exit(1);
  });
