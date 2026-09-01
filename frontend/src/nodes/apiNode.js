import BaseNode from "./BaseNode";
import useNodeField from "../useNodeField";

export default function APINode({
  id,
  data,
}) {
  const [
    method,
    setMethod,
  ] = useNodeField(
    id,
    data,
    "method",
    "GET"
  );

  const [
    url,
    setUrl,
  ] = useNodeField(
    id,
    data,
    "url",
    ""
  );

  const [
    headersText,
    setHeadersText,
  ] = useNodeField(
    id,
    data,
    "headersText",
    ""
  );

  const [
    ,
    setHeaders,
  ] = useNodeField(
    id,
    data,
    "headers",
    {}
  );

  const handleHeadersChange = (
    event
  ) => {
    const text =
      event.target.value;

    setHeadersText(text);

    try {
      const parsed =
        text.trim()
          ? JSON.parse(text)
          : {};

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        setHeaders(parsed);
      }
    } catch {
      setHeaders({});
    }
  };

  return (
    <BaseNode
      title="API"
      inputs={[
        "request",
      ]}
      outputs={[
        "response",
      ]}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >

        <select
          value={method}
          onChange={(e) =>
            setMethod(
              e.target.value
            )
          }
        >
          <option value="GET">
            GET
          </option>

          <option value="POST">
            POST
          </option>

          <option value="PUT">
            PUT
          </option>

          <option value="DELETE">
            DELETE
          </option>

          <option value="PATCH">
            PATCH
          </option>
        </select>


        <input
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
          placeholder="https://api.example.com"
        />

        <textarea
          value={headersText}
          onChange={
            handleHeadersChange
          }
          placeholder='Headers JSON'
          style={{
            width: "100%",
            minHeight: 55,
            resize: "none",
          }}
        />

      </div>

    </BaseNode>
  );
}
