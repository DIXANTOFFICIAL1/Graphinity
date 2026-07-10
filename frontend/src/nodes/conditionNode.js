import { useState } from "react";
import BaseNode from "./BaseNode";

export default function ConditionNode() {
  const [condition, setCondition] = useState("");

  return (
    <BaseNode
      title="Condition"
      inputs={["value"]}
      outputs={["true", "false"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div>Condition:</div>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="value > 10"
        />

        <div style={{ fontSize: "11px", opacity: 0.7 }}>
          Routes output based on condition
        </div>
      </div>
    </BaseNode>
  );
}
