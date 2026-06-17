import { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

export default function InputBox({ onSend, loading }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || loading) return;
    onSend(text.trim());
    setText("");
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "36px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-grow textarea
  const handleChange = (e) => {
    setText(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "36px";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  };

  const canSend = text.trim().length > 0 && !loading;

  return (
    <div className="input-wrapper">
      <div className="input-box">
        <textarea
          ref={textareaRef}
          className="chat-input"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask a DSA question…"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={!canSend}
          className={`send-btn ${canSend ? "active" : "disabled"}`}
        >
          {loading
            ? <Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />
            : <Send size={17} />
          }
        </button>
      </div>
      <div className="input-footer">
        Press Enter to send · Shift+Enter for a new line
      </div>
    </div>
  );
}
