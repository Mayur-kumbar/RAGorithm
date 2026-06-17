import { Link2 } from "lucide-react";

export default function SourcesPanel({ sources }) {
  if (!sources || !sources.length) return null;

  return (
    <div className="sources-row">
      <div className="sources-label">
        <Link2 size={12} />
        Sources
      </div>
      {sources.map((src, idx) => (
        <span key={idx} className="source-chip">{src}</span>
      ))}
    </div>
  );
}
