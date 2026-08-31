import { Handle, Position } from "reactflow";

const NODE_ICONS = {
  Input: "⇥",
  LLM: "✦",
  Output: "□",
  Text: "T",
  Math: "∑",
  Filter: "≡",
  Delay: "◷",
  Condition: "?",
  API: "⇄",
};

const HANDLE_LABELS = {
  system: "SYSTEM",
  prompt: "PROMPT",
  in: "INPUT",
  input: "INPUT",
  a: "A",
  b: "B",
  value: "VALUE",
  true: "TRUE",
  false: "FALSE",
  response: "RESPONSE",
  result: "RESULT",
  output: "OUTPUT",
};

export default function BaseNode({
  title,
  inputs = [],
  outputs = [],
  children,
}) {
  const icon = NODE_ICONS[title] || "•";

  return (
    <div
      style={{
        position: "relative",
        minWidth: "230px",
        maxWidth: "320px",
        padding: "12px",
        borderRadius: "12px",
        background:
          "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        color: "#e5e7eb",
        border: "1px solid #334155",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.35)",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minHeight: "30px",
          marginBottom: "10px",
          paddingBottom: "8px",
          borderBottom: "1px solid #334155",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#172338",
            border: "1px solid #334155",
            color: "#7dd3fc",
            fontSize: "15px",
            fontWeight: "700",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            color: "#f8fafc",
            letterSpacing: "0.3px",
          }}
        >
          {title}
        </div>

        <div
          title="Ready"
          style={{
            width: "7px",
            height: "7px",
            marginLeft: "auto",
            borderRadius: "50%",
            background: "#34d399",
            boxShadow:
              "0 0 7px rgba(52,211,153,0.45)",
          }}
        />
      </div>

      {/* INPUT HANDLES */}
      {inputs.map((input, index) => {
        const top =
          ((index + 1) / (inputs.length + 1)) * 100;

        return (
          <div key={`input-${input}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={input}
              style={{
                top: `${top}%`,
                width: "10px",
                height: "10px",
                background: "#38bdf8",
                border: "2px solid #0f172a",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "-92px",
                top: `calc(${top}% - 6px)`,
                width: "82px",
                textAlign: "right",
                fontSize: "8px",
                fontWeight: "600",
                color: "#7dd3fc",
                letterSpacing: "0.4px",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {HANDLE_LABELS[input] ||
                String(input).toUpperCase()}
            </div>
          </div>
        );
      })}

      {/* CONTENT */}
      <div
        style={{
          marginTop: "4px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* OUTPUT HANDLES */}
      {outputs.map((output, index) => {
        const top =
          ((index + 1) / (outputs.length + 1)) * 100;

        const lower = String(output).toLowerCase();

        const outputColor =
          lower === "true"
            ? "#34d399"
            : lower === "false"
              ? "#fb7185"
              : "#34d399";

        return (
          <div key={`output-${output}`}>
            <Handle
              type="source"
              position={Position.Right}
              id={output}
              style={{
                top: `${top}%`,
                width: "10px",
                height: "10px",
                background: outputColor,
                border: "2px solid #0f172a",
              }}
            />

            <div
              style={{
                position: "absolute",
                right: "-92px",
                top: `calc(${top}% - 6px)`,
                width: "82px",
                textAlign: "left",
                fontSize: "8px",
                fontWeight: "600",
                color: outputColor,
                letterSpacing: "0.4px",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {HANDLE_LABELS[output] ||
                String(output).toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}



