import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";


export default function OutputNode({
  id,
  data,
}) {

  const [
    outputName,
    setOutputName,
  ] = useNodeField(
    id,
    data,
    "outputName",
    id.replace(
      "customOutput-",
      "output_"
    )
  );

  return (

    <BaseNode
      title="Output"
      inputs={[
        "value",
      ]}
    >

      <input
        value={outputName}
        onChange={(e) =>
          setOutputName(
            e.target.value
          )
        }
        placeholder="Output name"
      />

    </BaseNode>
  );
}

