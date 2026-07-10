// llmNode.js

import BaseNode from "./BaseNode";

export default function LLMNode({ id }) {
  return (
    <BaseNode
      title="LLM"
      inputs={["system", "prompt"]}
      outputs={["response"]}
    >
      <div>This is a LLM.</div>
    </BaseNode>
  );
}

