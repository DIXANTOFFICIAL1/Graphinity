import { useState } from "react";
import BaseNode from "./BaseNode";

export default function MathNode() {
  const [operation, setOperation] = useState("add");

  return (
    <BaseNode
      title="Math"
      inputs={["a", "b"]}
      outputs={["result"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div>Select Operation:</div>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>

        <div style={{ fontSize: "11px", opacity: 0.7 }}>
          Outputs result of operation
        </div>
      </div>
    </BaseNode>
  );
}
