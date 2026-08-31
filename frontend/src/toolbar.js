import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";

const NODE_CONFIG = [
  { type: "customInput", label: "⇥ Input" },
  { type: "llm", label: "✦ LLM" },
  { type: "customOutput", label: "□ Output" },
  { type: "text", label: "T Text" },
  { type: "math", label: "∑ Math" },
  { type: "filter", label: "≡ Filter" },
  { type: "delay", label: "◷ Delay" },
  { type: "condition", label: "? Condition" },
  { type: "api", label: "⇄ API" },
];

export const PipelineToolbar = () => {
  const nodes = useStore(
    (state) => state.nodes
  );

  const edges = useStore(
    (state) => state.edges
  );

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "9px 16px 10px",
        background:
          "linear-gradient(180deg, #0f172a 0%, #0b1322 100%)",
        borderBottom: "1px solid #26364f",
        color: "#f8fafc",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            Graphinity
          </div>

          <div
            style={{
              fontSize: "9px",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.7px",
            }}
          >
            Workflow Canvas
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            fontSize: "9px",
            color: "#94a3b8",
          }}
        >
          <span
            style={{
              padding: "4px 7px",
              borderRadius: "5px",
              background: "#121e32",
              border: "1px solid #253650",
            }}
          >
            {nodes.length} nodes
          </span>

          <span
            style={{
              padding: "4px 7px",
              borderRadius: "5px",
              background: "#121e32",
              border: "1px solid #253650",
            }}
          >
            {edges.length} connections
          </span>
        </div>
      </div>

      {/* NODE PALETTE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            marginRight: "2px",
            fontSize: "9px",
            color: "#64748b",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.7px",
          }}
        >
          Nodes
        </div>

        {NODE_CONFIG.map((node) => (
          <div
            key={node.type}
            style={{
              transform: "scale(0.82)",
              transformOrigin: "left center",
              marginRight: "-12px",
            }}
          >
            <DraggableNode
              type={node.type}
              label={node.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};