import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function InputNode({ id, data }) {
  const [inputName, setInputName] = useNodeField(
    id,
    data,
    "inputName",
    id.replace("customInput-", "input_")
  );

  const [value, setValue] = useNodeField(
    id,
    data,
    "value",
    "What is AI?"
  );

  const [inputType, setInputType] = useNodeField(
    id,
    data,
    "inputType",
    "Text"
  );

  return (
    <BaseNode
      title="Input"
      outputs={["value"]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span>Name:</span>

          <input
            type="text"
            value={inputName}
            onChange={(e) =>
              setInputName(e.target.value)
            }
          />
        </label>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span>Value:</span>

          <input
            type="text"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
          />
        </label>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span>Type:</span>

          <select
            value={inputType}
            onChange={(e) =>
              setInputType(e.target.value)
            }
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}

