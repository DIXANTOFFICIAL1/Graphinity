import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function ConditionNode({
  id,
  data,
}) {

  const [
    condition,
    setCondition,
  ] = useNodeField(
    id,
    data,
    "condition",
    "value > 10"
  );

  return (
    <BaseNode
      title="Condition"
      inputs={["value"]}
      outputs={[
        "true",
        "false",
      ]}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >

        <input
          value={condition}
          onChange={(e) =>
            setCondition(
              e.target.value
            )
          }
          placeholder="value > 10"
        />

        <div
          style={{
            fontSize: "10px",
            color: "#94a3b8",
          }}
        >
          Routes through TRUE or FALSE
        </div>

      </div>

    </BaseNode>
  );
}