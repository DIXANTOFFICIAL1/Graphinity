import { useState } from "react";
import BaseNode from "./BaseNode";

export default function APINode() {
  const [method, setMethod] = useState("GET");

  return (
    <BaseNode
      title="API"
      inputs={["request"]}
      outputs={["response"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div>HTTP Method:</div>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>

        <div style={{ fontSize: "11px", opacity: 0.7 }}>
          Makes an API request
        </div>
      </div>
    </BaseNode>
  );
}
