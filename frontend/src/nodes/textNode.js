// textNode.js

import { useState, useMemo } from "react";
import BaseNode from "./BaseNode";

export default function TextNode() {
  const [text, setText] = useState("");

  const variableInputs = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;
    const vars = new Set();
    let match;
    while ((match = regex.exec(text))) {
      vars.add(match[1]);
    }
    return Array.from(vars);
  }, [text]);

  const inputs = ["in", ...variableInputs];

  return (
    <BaseNode title="Text" inputs={inputs} outputs={["out"]}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          minHeight: 60,
          resize: "none",
        }}
        placeholder="Type text with {{variables}}"
      />
    </BaseNode>
  );
}



