import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function LLMNode({ id, data }) {
  const [systemPrompt, setSystemPrompt] = useNodeField(
    id,
    data,
    "systemPrompt",
    "You are a helpful AI assistant."
  );

  const [prompt, setPrompt] = useNodeField(
    id,
    data,
    "prompt",
    "Answer the user's request clearly."
  );

  return (
    <BaseNode
      title="LLM"
      inputs={["system", "prompt"]}
      outputs={["response"]}
    >
      <div
        style={{
          position: "relative",
          width: "280px",
          height: "230px",
        }}
      >
        {/* MODEL */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: 0,
            right: 0,
          }}
        >
          <div
            style={{
              marginBottom: "4px",
              fontSize: "10px",
              color: "#94a3b8",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            Model
          </div>

          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 9px",
              borderRadius: "7px",
              background: "#060b18",
              border: "1px solid #26364f",
              color: "#e2e8f0",
              fontSize: "11px",
            }}
          >
            GPT OSS 20B
          </div>
        </div>

        {/* SYSTEM PROMPT */}
        <div
          style={{
            position: "absolute",
            top: "63px",
            left: 0,
            right: 0,
          }}
        >
          <div
            style={{
              marginBottom: "4px",
              fontSize: "10px",
              color: "#94a3b8",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            System Prompt
          </div>

          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="System prompt"
            style={{
              width: "100%",
              height: "48px",
              boxSizing: "border-box",
              padding: "7px 8px",
              borderRadius: "7px",
              resize: "none",
              fontSize: "11px",
              lineHeight: "1.4",
            }}
          />
        </div>

        {/* PROMPT */}
        <div
          style={{
            position: "absolute",
            top: "135px",
            left: 0,
            right: 0,
          }}
        >
          <div
            style={{
              marginBottom: "4px",
              fontSize: "10px",
              color: "#94a3b8",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            Prompt
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt..."
            style={{
              width: "100%",
              height: "58px",
              boxSizing: "border-box",
              padding: "7px 8px",
              borderRadius: "7px",
              resize: "none",
              fontSize: "11px",
              lineHeight: "1.4",
            }}
          />
        </div>
      </div>
    </BaseNode>
  );
}
