# 🚀 RAGorithm — AI-Powered DSA Assistant (RAG + Gemini)

RAGorithm is a full-stack AI application that helps users learn and solve Data Structures & Algorithms problems using a Retrieval-Augmented Generation (RAG) pipeline powered by Google Gemini.

It retrieves relevant DSA concepts from a curated knowledge base, injects them into the prompt, and streams intelligent, context-aware responses in real-time.

---

## ✨ Features

* 🔍 RAG Pipeline (semantic search over DSA knowledge)
* 🧠 Google Gemini LLM integration
* ⚡ Real-time streaming responses (SSE)
* 📚 Source attribution (shows retrieved topics)
* 💬 Chat UI (React + Tailwind)
* 🧩 Modular backend architecture
* ⚙️ Embedding + similarity search system

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI / GenAI

* Google Gemini API
* Embeddings: `gemini-embedding-001`
* LLM: `gemini-2.5-flash` / `gemini-flash-latest`

### Data Layer

* In-memory vector store
* JSON-based embedding cache
* Cosine similarity search

---

## 🧠 Architecture

```
User Query
    ↓
Frontend (React)
    ↓
POST /api/chat/stream
    ↓
RAG Pipeline
├── Embed Query
├── Retrieve Similar Documents
├── Build Context
    ↓
Gemini LLM (Streaming)
    ↓
Server-Sent Events (SSE)
    ↓
Frontend (Live Response Rendering)
```

---

## 📁 Project Structure

```
algochat/
│
├── server/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   └── chat.js
│   │   ├── services/
│   │   │   ├── rag.js
│   │   │   ├── gemini.js
│   │   │   ├── vectorStore.js
│   │   └── data/
│   │      └── knowledge.js  
│   │
│   ├── embeddings_cache.json
│   ├── .env
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── styles/
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ragorithm.git
cd ragorithm
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 4️⃣ Open Application

```
http://localhost:5173
```

---

## 🧪 Example Queries

* Explain binary search
* What is sliding window technique?
* Solve two sum problem with explanation
* Explain segment tree

---

## ⚠️ Known Limitations

* Uses in-memory vector store (not scalable)
* Depends on external API for embeddings
* No persistent chat history
* Limited context size handling
* No retry/fallback for API failures

---

## 🚀 Future Improvements

* Integrate vector database (Pinecone / Chroma / FAISS)
* Add AI Agent workflows
* Add chat persistence (MongoDB)
* Improve prompt optimization & token handling
* Add retry logic + fault tolerance
* Deploy on AWS with Docker + Nginx

---

## 🎯 Key Learnings

* Built a full RAG pipeline from scratch
* Implemented semantic search using embeddings
* Integrated LLM with streaming responses (SSE)
* Designed modular backend architecture
* Handled real-world issues like API failures and context limits

