import { useState } from "react";
import { streamChat } from "../api/chat";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    const newMsgs = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setLoading(true);

    let assistantText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    await streamChat(text, newMsgs, (event) => {
      if (event.type === "sources") {
        setSources(event.sources);
      }

      if (event.type === "chunk") {
        assistantText += event.text;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantText;
          return updated;
        });
      }

      if (event.type === "done") {
        setLoading(false);
      }
    });
  }

  return { messages, sources, loading, sendMessage };
}