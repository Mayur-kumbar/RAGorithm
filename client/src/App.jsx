import { useState } from "react";
import { Bot, Plus, Settings, MessageSquare, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import ChatContainer from "./components/ChatContainer";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className={`sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn">
            <div className="new-chat-icon">
              <Bot size={15} />
            </div>
            <span style={{ flex: 1, textAlign: "left" }}>New Chat</span>
            <Plus size={15} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        <div className="sidebar-history">
          <div className="history-label">Today</div>
          {[
            "Binary Search Implementation",
            "Graph BFS vs DFS",
            "Merge Sort Complexity",
          ].map((t) => (
            <button key={t} className="history-item">
              <MessageSquare size={14} style={{ flexShrink: 0 }} />
              {t}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="settings-btn">
            <Settings size={15} />
            Settings
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="main-panel">
        <header className="topbar">
          <button className="icon-btn" onClick={() => setSidebarOpen((o) => !o)}>
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>

          <div className="topbar-title">
            RAG<span>orithm</span>
          </div>

          {/* right-side spacer to keep title centered */}
          {/* <div style={{ width: 34 }} /> */}
        </header>

        <ChatContainer />
      </main>
    </div>
  );
}
