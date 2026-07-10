import { useState } from "react";
import BaseNode from "./BaseNode";

export default function FilterNode() {
  const [keyword, setKeyword] = useState("");

  return (
    <BaseNode
      title="Filter"
      inputs={["input"]}
      outputs={["output"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div>Keyword:</div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
        />

        <div style={{ fontSize: "11px", opacity: 0.7 }}>
          Filters input based on keyword
        </div>
      </div>
    </BaseNode>
  );
}
