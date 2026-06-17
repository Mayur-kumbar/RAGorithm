import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { User } from "lucide-react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user" : ""}`}>
      {/* Avatar */}
      <div className={`avatar ${isUser ? "user" : "ai"}`}>
        {isUser ? (
          <User size={16} />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div className={`bubble ${isUser ? "user" : "ai"}`}>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
