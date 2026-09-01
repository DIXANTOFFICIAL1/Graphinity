import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore(
    (state) => state.nodes
  );

  const edges = useStore(
    (state) => state.edges
  );

  const executionStatus = useStore(
    (state) => state.executionStatus
  );

  const startExecution = useStore(
    (state) => state.startExecution
  );

  const setExecutionResult = useStore(
    (state) => state.setExecutionResult
  );

  const setExecutionError = useStore(
    (state) => state.setExecutionError
  );

  const handleRunWorkflow = async () => {
    if (!nodes.length) {
      alert(
        "Add at least one node before running the workflow."
      );
      return;
    }

    startExecution();

    const inputs = {};

    nodes.forEach((node) => {
      if (node.type === "customInput") {
        const inputName =
          node.data?.inputName || node.id;

        inputs[inputName] =
          node.data?.value ??
          "What is AI?";
      }
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pipelines/execute`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nodes: nodes.map((node) => ({
              id: node.id,
              type: node.type,
              data: node.data || {},
            })),

            edges: edges.map((edge) => ({
              source: edge.source,
              target: edge.target,
              sourceHandle:
                edge.sourceHandle || null,
              targetHandle:
                edge.targetHandle || null,
            })),

            inputs,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setExecutionError(
          data.detail ||
            "Workflow execution failed."
        );
        return;
      }

      setExecutionResult(data);

      console.log(
        "Graphinity execution result:",
        data
      );
    } catch (error) {
      console.error(error);

      setExecutionError(
        "Unable to connect to the Graphinity backend."
      );
    }
  };

  const isRunning =
    executionStatus === "running";

  const isCompleted =
    executionStatus === "completed";

  const buttonText = isRunning
    ? "◌  Running..."
    : isCompleted
    ? "✓  Workflow Complete"
    : "▶  Run Workflow";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "14px",
        marginBottom: "14px",
      }}
    >
      <button
        onClick={handleRunWorkflow}
        disabled={isRunning}
        style={{
          minWidth:
            isCompleted
              ? "190px"
              : "165px",

          padding:
            "11px 24px",

          borderRadius: "9px",

          border:
            isCompleted
              ? "1px solid #1f9d73"
              : "1px solid #334155",

          background:
            isRunning
              ? "#111827"
              : isCompleted
              ? "#12352c"
              : "#172235",

          color:
            isCompleted
              ? "#34d399"
              : "#ffffff",

          fontSize: "14px",

          fontWeight: "700",

          cursor:
            isRunning
              ? "not-allowed"
              : "pointer",

          boxShadow:
            isCompleted
              ? "0 0 16px rgba(52,211,153,0.12)"
              : "0 4px 12px rgba(0,0,0,0.25)",

          transition:
            "all 0.2s ease",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};
