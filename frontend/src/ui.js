import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import ReactFlow, {
  Controls,
  Background,
  MiniMap,
} from "reactflow";

import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import InputNode from "./nodes/inputNode";
import LLMNode from "./nodes/llmNode";
import OutputNode from "./nodes/outputNode";
import TextNode from "./nodes/textNode";
import MathNode from "./nodes/mathNode";
import FilterNode from "./nodes/filterNode";
import DelayNode from "./nodes/delayNode";
import ConditionNode from "./nodes/conditionNode";
import APINode from "./nodes/apiNode";

import "reactflow/dist/style.css";

const gridSize = 20;

const proOptions = {
  hideAttribution: true,
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  condition: ConditionNode,
  api: APINode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState(null);

  const [interactive, setInteractive] =
    useState(true);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const selectedNodes = nodes.filter(
    (node) => node.selected
  );

  const getInitNodeData = (nodeID, type) => {
    const nodeData = {
      id: nodeID,
      nodeType: type,
    };

    switch (type) {
      case "customInput":
        nodeData.inputName =
          nodeID.replace(
            "customInput-",
            "input_"
          );
        nodeData.inputType = "Text";
        break;

      case "llm":
        nodeData.systemPrompt =
          "You are a helpful AI assistant.";
        nodeData.prompt =
          "Answer the user's request clearly.";
        nodeData.model =
          "openai/gpt-oss-20b";
        break;

      case "text":
        nodeData.text = "";
        break;

      case "math":
        nodeData.operation = "add";
        break;

      case "filter":
        nodeData.keyword = "";
        break;

      case "condition":
        nodeData.condition =
          "value > 10";
        break;

      case "delay":
        nodeData.delay = 1000;
        break;

      case "api":
        nodeData.method = "GET";
        nodeData.url = "";
        break;

      case "customOutput":
        nodeData.outputName =
          nodeID.replace(
            "customOutput-",
            "output_"
          );
        nodeData.outputType = "Text";
        break;

      default:
        break;
    }

    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        return;
      }

      if (!reactFlowWrapper.current) {
        return;
      }

      const reactFlowBounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const rawData =
        event?.dataTransfer?.getData(
          "application/reactflow"
        );

      if (!rawData) {
        return;
      }

      let appData;

      try {
        appData = JSON.parse(rawData);
      } catch (error) {
        console.error(
          "Invalid node drag data:",
          error
        );
        return;
      }

      const type = appData?.nodeType;

      if (!type) {
        return;
      }

      const position =
        reactFlowInstance.project({
          x:
            event.clientX -
            reactFlowBounds.left,
          y:
            event.clientY -
            reactFlowBounds.top,
        });

      const nodeID =
        getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data:
          getInitNodeData(
            nodeID,
            type
          ),
      });
    },
    [
      reactFlowInstance,
      getNodeID,
      addNode,
    ]
  );

  const onDragOver = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect =
        "move";
    },
    []
  );

  // DELETE SELECTED NODES
  const deleteSelectedNodes = useCallback(() => {
    const selectedIds =
      nodes
        .filter((node) => node.selected)
        .map((node) => node.id);

    if (!selectedIds.length) {
      return;
    }

    onNodesChange(
      selectedIds.map((id) => ({
        type: "remove",
        id,
      }))
    );

    onEdgesChange(
      edges
        .filter(
          (edge) =>
            selectedIds.includes(
              edge.source
            ) ||
            selectedIds.includes(
              edge.target
            )
        )
        .map((edge) => ({
          type: "remove",
          id: edge.id,
        }))
    );
  }, [
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  ]);

  // DELETE / BACKSPACE KEYBOARD SUPPORT
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key !== "Delete" &&
        event.key !== "Backspace"
      ) {
        return;
      }

      const activeElement =
        document.activeElement;

      const isTyping =
        activeElement?.tagName ===
          "INPUT" ||
        activeElement?.tagName ===
          "TEXTAREA" ||
        activeElement?.tagName ===
          "SELECT";

      if (isTyping) {
        return;
      }

      if (!interactive) {
        return;
      }

      if (selectedNodes.length > 0) {
        event.preventDefault();
        deleteSelectedNodes();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    selectedNodes.length,
    interactive,
    deleteSelectedNodes,
  ]);

  const fitWorkflow = useCallback(() => {
    if (
      reactFlowInstance &&
      nodes.length > 0
    ) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.2,
          duration: 450,
          minZoom: 0.45,
          maxZoom: 1.4,
        });
      }, 80);
    }
  }, [
    reactFlowInstance,
    nodes.length,
  ]);

  useEffect(() => {
    fitWorkflow();
  }, [fitWorkflow]);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: "100%",
        height: "68vh",
        minHeight: "540px",
        position: "relative",
        overflow: "hidden",
        background: "#020817",
        borderBottom:
          "1px solid #172338",
      }}
    >
      {/* CANVAS TITLE */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          zIndex: 5,
          pointerEvents: "none",
          padding: "6px 10px",
          borderRadius: "6px",
          background:
            "rgba(15,23,42,0.88)",
          border:
            "1px solid #26364f",
          color: "#64748b",
          fontSize: "9px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}
      >
        Workflow Canvas
      </div>

      {/* DELETE SELECTED */}
      {selectedNodes.length > 0 &&
        interactive && (
          <button
            onClick={deleteSelectedNodes}
            style={{
              position: "absolute",
              top: "14px",
              left: "160px",
              zIndex: 10,
              padding: "6px 10px",
              borderRadius: "6px",
              border:
                "1px solid #7f1d1d",
              background:
                "rgba(69,10,10,0.9)",
              color: "#fca5a5",
              fontSize: "9px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🗑 Delete Selected
          </button>
        )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[
          gridSize,
          gridSize,
        ]}
        connectionLineType="smoothstep"
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable={interactive}
        nodesConnectable={interactive}
        elementsSelectable={interactive}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
        }}
      >
        <Background
          color="#26364f"
          gap={gridSize}
          size={1}
        />

        <Controls
          position="bottom-left"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
          onInteractiveChange={
            setInteractive
          }
          style={{
            marginLeft: "18px",
            marginBottom: "18px",
            background: "#0f172a",
            border:
              "1px solid #26364f",
            borderRadius: "10px",
            padding: "4px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.35)",
          }}
        />

        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          nodeColor="#334155"
          maskColor="rgba(2,8,23,0.72)"
          style={{
            marginRight: "14px",
            marginBottom: "14px",
            border:
              "1px solid #26364f",
            borderRadius: "10px",
            overflow: "hidden",
            background:
              "#0f172a",
          }}
        />
      </ReactFlow>
    </div>
  );
};