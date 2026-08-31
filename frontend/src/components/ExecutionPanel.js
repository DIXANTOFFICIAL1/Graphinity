import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStore } from "../store";

// FORMAT NON-MARKDOWN VALUES
const formatValue = (value) => {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

// STATUS
const getStatusLabel = (status) => {
  if (status === "running") {
    return "Running";
  }

  if (status === "completed") {
    return "Completed";
  }

  if (status === "failed") {
    return "Failed";
  }

  return "Idle";
};

// RENDER OUTPUT
const OutputRenderer = ({ value }) => {
  if (
    typeof value === "string" &&
    (
      value.includes("**") ||
      value.includes("##") ||
      value.includes("- ") ||
      value.includes("| ")
    )
  ) {
    return (
      <div
        style={{
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#dbeafe",
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {value}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <pre
      style={{
        margin: 0,
        padding: "10px",
        borderRadius: "7px",
        background: "#080f1d",
        border: "1px solid #1f2d43",
        color: "#dbeafe",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontSize: "12px",
        overflowX: "auto",
      }}
    >
      {formatValue(value)}
    </pre>
  );
};

// EXECUTION PANEL
export default function ExecutionPanel() {
  const status = useStore(
    (state) => state.executionStatus
  );

  const result = useStore(
    (state) => state.executionResult
  );

  const logs = useStore(
    (state) => state.executionLogs
  );

  const error = useStore(
    (state) => state.executionError
  );

  if (status === "idle") {
    return null;
  }

  const statusColor =
    status === "completed"
      ? "#34d399"
      : status === "failed"
        ? "#fb7185"
        : "#60a5fa";

  return (
    <div
      style={{
        width: "min(1000px, calc(100% - 40px))",
        margin: "14px auto 24px",
        padding: "18px",
        borderRadius: "14px",
        border: "1px solid #26364f",
        background:
          "linear-gradient(180deg, #101b2e 0%, #0a1220 100%)",
        color: "#f8fafc",
        boxShadow:
          "0 10px 28px rgba(0,0,0,0.30)",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Execution Monitor
          </div>

          <div
            style={{
              marginTop: "4px",
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            Graphinity workflow runtime
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: statusColor,
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: statusColor,
              boxShadow:
                `0 0 8px ${statusColor}`,
            }}
          />

          {getStatusLabel(status)}
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div
          style={{
            marginBottom: "14px",
            padding: "11px 13px",
            borderRadius: "9px",
            background: "#321522",
            border: "1px solid #6b2940",
            color: "#fda4af",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {/* RESULTS */}

      {result && (
        <>
          {/* SUMMARY */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#162238",
                border: "1px solid #26364f",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >
                Nodes Executed
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {result.nodes_executed ?? 0}
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#162238",
                border: "1px solid #26364f",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >
                Duration
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {result.duration_ms ?? 0} ms
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#162238",
                border: "1px solid #26364f",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >
                Status
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: statusColor,
                }}
              >
                {getStatusLabel(status)}
              </div>
            </div>
          </div>

          {/* EXECUTION ORDER */}

          {Array.isArray(result.execution_order) &&
            result.execution_order.length > 0 && (
              <div
                style={{
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  Execution Order
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "7px",
                  }}
                >
                  {result.execution_order.map(
                    (nodeId, index) => (
                      <div
                        key={`${nodeId}-${index}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                        }}
                      >
                        <span
                          style={{
                            padding: "7px 10px",
                            borderRadius: "7px",
                            background: "#18263d",
                            border:
                              "1px solid #30415d",
                            color: "#e2e8f0",
                            fontSize: "12px",
                          }}
                        >
                          {index + 1}. {nodeId}
                        </span>

                        {index <
                          result.execution_order.length -
                            1 && (
                          <span
                            style={{
                              color: "#64748b",
                            }}
                          >
                            →
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* NODE RESULTS */}

          {logs.length > 0 && (
            <div>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "8px",
                  fontSize: "14px",
                }}
              >
                Node Results
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {logs.map((log, index) => (
                  <div
                    key={`${log.node_id}-${index}`}
                    style={{
                      padding: "11px 13px",
                      borderRadius: "9px",
                      background: "#121e32",
                      border: "1px solid #253650",
                    }}
                  >
                    {/* NODE HEADER */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          {log.node_id}
                        </span>

                        {log.node_type && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "11px",
                              color: "#94a3b8",
                            }}
                          >
                            {log.node_type}
                          </span>
                        )}
                      </div>

                      <span
                        style={{
                          color:
                            log.status ===
                            "completed"
                              ? "#34d399"
                              : log.status ===
                                "skipped"
                                ? "#fbbf24"
                                : "#fb7185",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {log.status}
                      </span>
                    </div>

                    {/* INPUTS */}

                    {log.inputs &&
                      log.inputs.length > 0 && (
                        <div
                          style={{
                            marginTop: "8px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#64748b",
                              marginBottom: "4px",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            Inputs
                          </div>

                          <pre
                            style={{
                              margin: 0,
                              padding: "8px",
                              borderRadius: "7px",
                              background: "#0a1220",
                              color: "#cbd5e1",
                              whiteSpace:
                                "pre-wrap",
                              fontSize: "11px",
                            }}
                          >
                            {formatValue(
                              log.inputs
                            )}
                          </pre>
                        </div>
                      )}

                    {/* OUTPUT */}

                    {log.output !== undefined && (
                      <div
                        style={{
                          marginTop: "8px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "10px",
                            color: "#64748b",
                            marginBottom: "4px",
                            textTransform:
                              "uppercase",
                          }}
                        >
                          Output
                        </div>

                        <OutputRenderer
                          value={log.output}
                        />
                      </div>
                    )}

                    {/* DURATION */}

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#64748b",
                        marginTop: "7px",
                      }}
                    >
                      Execution time:{" "}
                      {log.duration_ms ?? 0} ms
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINAL OUTPUT */}

          {result.outputs &&
            Object.keys(result.outputs).length > 0 && (
              <div
                style={{
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  Final Output
                </div>

                <div
                  style={{
                    padding: "13px",
                    borderRadius: "9px",
                    background: "#080f1d",
                    border: "1px solid #26364f",
                    color: "#e2e8f0",
                  }}
                >
                  <OutputRenderer
                    value={
                      result.outputs[
                        Object.keys(
                          result.outputs
                        )[0]
                      ]
                    }
                  />
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}