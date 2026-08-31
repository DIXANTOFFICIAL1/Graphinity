import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function FilterNode({
  id,
  data,
}) {

  const [
    keyword,
    setKeyword,
  ] = useNodeField(
    id,
    data,
    "keyword",
    ""
  );

  return (

    <BaseNode
      title="Filter"
      inputs={["input"]}
      outputs={["output"]}
    >
      
      <input
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
        placeholder="Keyword"
      />

    </BaseNode>
  );
}
