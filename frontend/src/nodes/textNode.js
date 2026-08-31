import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function TextNode({
  id,
  data,
}) {

  const [
    text,
    setText,
  ] = useNodeField(
    id,
    data,
    "text",
    "Result: {{input}}"
  );


  return (

    <BaseNode
      title="Text"
      inputs={["in"]}
      outputs={["out"]}
    >

      <textarea
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
        placeholder="Use {{input}}"
        style={{
          width:
            "100%",

          minHeight:
            70,

          resize:
            "none",
        }}
      />

    </BaseNode>
  );
}



