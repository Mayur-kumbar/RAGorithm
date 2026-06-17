import { useEffect, useRef } from "react";
import { Code2, GitMerge, Search, Terminal } from "lucide-react";
import useChat from "../hooks/useChat";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import SourcesPanel from "./SourcesPanel";

const SUGGESTIONS = [
  {
    icon: <Search size={16} color="#60a5fa" />,
    bg: "rgba(59,130,246,0.1)",
    title: "Explain Binary Search",
    desc: "How does it work on a sorted array?",
  },
  {
    icon: <GitMerge size={16} color="#34d399" />,
    bg: "rgba(52,211,153,0.1)",
    title: "Merge Sort vs Quick Sort",
    desc: "Compare time complexities and use cases.",
  },
  {
    icon: <Code2 size={16} color="#fbbf24" />,
    bg: "rgba(251,191,36,0.1)",
    title: "Dynamic Programming",
    desc: "Write a bottom-up Fibonacci solution.",
  },
  {
    icon: <Terminal size={16} color="#c084fc" />,
    bg: "rgba(192,132,252,0.1)",
    title: "Graph Traversals",
    desc: "Show me a BFS implementation in Python.",
  },
];

export default function ChatContainer() {
  const { messages, sources, loading, sendMessage } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sources, loading]);

  return (
    <>
      {/* Scrollable chat messages */}
      <div className="chat-scroll">
        <div className="chat-inner">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-logo">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="empty-title">How can I help you today?</h1>
              <p className="empty-sub">
                I'm AlgoChat — your AI assistant for mastering Data Structures &amp; Algorithms.
              </p>
              <div className="suggestion-grid">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.title}
                    className="suggestion-card"
                    onClick={() => sendMessage(`${s.title}: ${s.desc}`)}
                  >
                    <div className="suggestion-card-header">
                      <div
                        className="suggestion-card-icon"
                        style={{ background: s.bg }}
                      >
                        {s.icon}
                      </div>
                      <div className="suggestion-card-title">{s.title}</div>
                    </div>
                    <div className="suggestion-card-desc">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}

              {loading && (
                <div className="message-row">
                  <div className="avatar ai">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}

              <SourcesPanel sources={sources} />
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed input at the bottom */}
      <div className="input-area">
        <InputBox onSend={sendMessage} loading={loading} />
      </div>
    </>
  );
}
