import { useState } from "react";
import BaseNode from "./BaseNode";

export default function DelayNode() {
  const [delay, setDelay] = useState(1000);

  return (
    <BaseNode
      title="Delay"
      inputs={["in"]}
      outputs={["out"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div>Delay (ms):</div>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />

        <div style={{ fontSize: "11px", opacity: 0.7 }}>
          Delays execution by given time
        </div>
      </div>
    </BaseNode>
  );
}
