import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function MathNode({ id, data }) {

  const [
    operation,
    setOperation,
  ] = useNodeField(
    id,
    data,
    "operation",
    "add"
  );

  return (
    <BaseNode
      title="Math"
      inputs={["a", "b"]}
      outputs={["result"]}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >

        <select
          value={operation}
          onChange={(e) =>
            setOperation(
              e.target.value
            )
          }
        >
          <option value="add">
            Add
          </option>

          <option value="subtract">
            Subtract
          </option>

          <option value="multiply">
            Multiply
          </option>

          <option value="divide">
            Divide
          </option>
        </select>

        <div
          style={{
            fontSize: "10px",
            color: "#94a3b8",
          }}
        >
          A and B are separate inputs
        </div>

      </div>

    </BaseNode>
  );
}
