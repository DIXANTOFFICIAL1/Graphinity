import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create(
  (set, get) => ({
    // WORKFLOW STATE
    nodes: [],
    edges: [],
    nodeIDs: {},

    // EXECUTION STATE
    executionStatus: "idle",
    executionResult: null,
    executionLogs: [],
    executionError: null,

    // NODE ID
    getNodeID: (type) => {
      const newIDs = {
        ...get().nodeIDs,
      };

      if (newIDs[type] === undefined) {
        newIDs[type] = 0;
      }

      newIDs[type] += 1;

      set({
        nodeIDs: newIDs,
      });

      return `${type}-${newIDs[type]}`;
    },

    // ADD NODE
    addNode: (node) => {
      set({
        nodes: [
          ...get().nodes,
          node,
        ],
      });
    },

    // NODE CHANGES
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(
          changes,
          get().nodes
        ),
      });
    },

    // EDGE CHANGES
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(
          changes,
          get().edges
        ),
      });
    },

    // CONNECT
    onConnect: (connection) => {
      set({
        edges: addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: "20px",
              width: "20px",
            },
          },
          get().edges
        ),
      });
    },

    // NODE FIELD UPDATE
    updateNodeField: (
      nodeId,
      fieldName,
      fieldValue
    ) => {
      set({
        nodes: get().nodes.map(
          (node) =>
            node.id === nodeId
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    [fieldName]: fieldValue,
                  },
                }
              : node
        ),
      });
    },

    // EXECUTION START
    startExecution: () => {
      set({
        executionStatus: "running",
        executionResult: null,
        executionLogs: [],
        executionError: null,
      });
    },

    // EXECUTION RESULT
    setExecutionResult: (result) => {
      set({
        executionStatus: result.status,
        executionResult: result,
        executionLogs: result.logs || [],
        executionError: result.error || null,
      });
    },

    // EXECUTION ERROR
    setExecutionError: (error) => {
      set({
        executionStatus: "failed",
        executionError: error,
        executionResult: null,
        executionLogs: [],
      });
    },

    // RESET EXECUTION
    resetExecution: () => {
      set({
        executionStatus: "idle",
        executionResult: null,
        executionLogs: [],
        executionError: null,
      });
    },
  })
);
