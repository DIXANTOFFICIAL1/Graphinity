import { Handle, Position } from "reactflow";

export default function BaseNode({ title, inputs = [], outputs = [], children }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1e293b, #0f172a)",
        borderRadius: 12,
        padding: 14,
        minWidth: 220,
        color: "#e5e7eb",
        position: "relative",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        border: "1px solid #334155",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: 14,
          marginBottom: 10,
          paddingBottom: 6,
          borderBottom: "1px solid #334155",
          color: "#f8fafc",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={`in-${input}`}
          type="target"
          position={Position.Left}
          id={input}
          style={{
            top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
            background: "#38bdf8",
            width: 10,
            height: 10,
            border: "2px solid #0f172a",
          }}
        />
      ))}

      <div style={{ marginTop: 6 }}>{children}</div>

      {outputs.map((output, index) => (
        <Handle
          key={`out-${output}`}
          type="source"
          position={Position.Right}
          id={output}
          style={{
            top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
            background: "#34d399",
            width: 10,
            height: 10,
            border: "2px solid #0f172a",
          }}
        />
      ))}
    </div>
  );
}



