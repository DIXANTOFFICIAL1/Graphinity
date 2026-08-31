import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";


export default function DelayNode({
  id,
  data,
}) {

  const [
    delay,
    setDelay,
  ] = useNodeField(
    id,
    data,
    "delay",
    1000
  );


  return (

    <BaseNode
      title="Delay"
      inputs={["in"]}
      outputs={["out"]}
    >

      <input
        type="number"
        min="0"
        max="5000"
        value={delay}
        onChange={(e) =>
          setDelay(
            Number(
              e.target.value
            )
          )
        }
      />

    </BaseNode>
  );
}
