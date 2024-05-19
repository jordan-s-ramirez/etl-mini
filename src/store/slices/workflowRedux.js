import { createSlice } from '@reduxjs/toolkit'
import { workflowConfigInitalEdges } from '@/util/workflow/workflowConfigInitalEdges';
import { workflowConfigInitalNodes } from '@/util/workflow/workflowConfigInitalNodes';
import { applyNodeChanges, applyEdgeChanges } from "reactflow";
export const workflowRedux = createSlice({
  name: 'workflowRedux',
  initialState: {
    nodes: [],
    edges: [],
    selectedNode: null,
  },
  reducers: {
    createNewNode: (state, action) => {
      let nodeType = action.payload

      // New Node - General Config
      let newNode = {
        id: "t" + crypto.randomUUID().replaceAll("-", ""),
        nodeType: nodeType,
        nodeData: {
          query: "",
          results: null,
          source: [],
          target: [],
          inputFileName: null,
        },
      };

      // Configure New Node
      if (nodeType === "dataInputNode") {
        newNode = {
          ...newNode,
          type: "input",
          title: "Data Input " + (state.nodes.length + 1).toString(),
          barSizing: { md: 4, lg: 3, xl: 3 },
        };
      } else if (nodeType === "sqlNode") {
        newNode = {
          ...newNode,
          type: "default",
          title: "SQL Node " + (state.nodes.length + 1).toString(),
          barSizing: { md: 6, lg: 6, xl: 6 },
        };
      }
      state.nodes.push(newNode)

      // Handle Node Placement
      if (state.selectedNode !== null) {
        state.nodes = workflowConfigInitalNodes(state.nodes, state.selectedNode.position)
      }
      else {
        state.nodes = workflowConfigInitalNodes(state.nodes, null)
      }

      // Add new edge to selected node
      if (nodeType !== "dataInputNode" && state.selectedNode !== null) {
        state.edges.push({
          // label: "test",
          source: state.selectedNode.id,
          target: newNode.id,
          idx: state.edges.length,
          sourceHandle: null,
          targetHandle: null,
          type: "simplebezier",
          sourceIdx: state.selectedNode.idx,
          targetIdx: newNode.idx,
          sourceTitle: state.selectedNode.title,
          targetTitle: newNode.title
        })
      }

      // Update Selected Node
      state.selectedNode = newNode
    },
    updateNodeQuery: (state, action) => {
      // Update Selected Node
      state.selectedNode.nodeData.query = action.payload

      // Update All Nodes
      state.nodes[state.selectedNode.idx].nodeData.query = action.payload
    },
    updateNodeQueryResults: (state, action) => {
      // Update Selected Nodes
      state.selectedNode.nodeData.results = action.payload
      // Update All Nodes
      state.nodes[state.selectedNode.idx].nodeData.results = action.payload     // state.nodes[state.selectedNode.idx] = state.nodes[state.selectedNode.idx] = JSON.parse(JSON.stringify({
    },
    updateNodeInputFileName: (state, action) => {
      // Update Selected Node
      state.selectedNode.nodeData.inputFileName = action.payload
      state.nodes[state.selectedNode.idx].nodeData.inputFileName = action.payload
    },
    updateNodeTitle: (state, action) => {
      state.selectedNode.title = action.payload
      state.selectedNode.data.label = action.payload

      state.nodes[state.selectedNode.idx].title = action.payload
      state.nodes[state.selectedNode.idx].data.label = action.payload
    },
    setSelectedNode: (state, action) => {
      if (
        state.selectedNode === null ||
        action.payload === null ||
        (action.payload !== null &&
          state.selectedNode.id !== action.payload.id)
      ) {
        state.selectedNode = action.payload
      }
    },
    applyNodeChangesRdx: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
    applyEdgeChangesRdx: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    addNewEdge: (state, action) => {
      let targetId = action.payload.target
      let sourceId = action.payload.source
      let nodeIdx = 0
      let targetIdx, sourceIdx, targetTitle, sourceTitle

      // Get Target Idx
      while (targetId !== state.nodes[nodeIdx].id && nodeIdx < state.nodes.length) {
        nodeIdx += 1
      }
      targetIdx = state.nodes[nodeIdx].idx
      targetTitle = state.nodes[nodeIdx].title

      // Get Source Idx
      nodeIdx = 0
      while (sourceId !== state.nodes[nodeIdx].id && nodeIdx < state.nodes.length) {
        nodeIdx += 1
      }
      sourceIdx = state.nodes[nodeIdx].idx
      sourceTitle = state.nodes[nodeIdx].title

      // Push New Edge
      state.edges.push({
        key: crypto.randomUUID(),
        idx: state.edges.length,
        targetIdx: targetIdx,
        sourceIdx: sourceIdx,
        sourceTitle: sourceTitle,
        sourceDisplayTitle: "",
        targetTitle: targetTitle,
        toDelete: false,
        ...action.payload
      })
    },
    updateEdgeSourceDisplayTitle: (state, action) => {
      // action.payload.idx   => edge idx
      // action.payload.title => edge display title
      state.edges[action.payload.idx].sourceDisplayTitle = action.payload.title
    },
    deleteSelectedNode: (state) => {
      // Update Node List
      state.nodes.splice(state.selectedNode.idx, 1)

      // Reapply Indexs
      for (let idx in state.nodes) {
        state.nodes[idx].idx = idx
      }

      // Reapply Edges
      let hasSource, hasTarget, initalCount
      for (let idx in state.edges) {
        hasSource = false
        hasTarget = false
        initalCount = 0
        // Update Index
        while (initalCount < state.nodes.length && (!hasTarget || !hasSource)) {
          if (state.edges[idx].target === state.nodes[initalCount].id) {
            state.edges[idx].targetIdx = initalCount
            hasTarget = true
          }
          if (state.edges[idx].source === state.nodes[initalCount].id) {
            state.edges[idx].sourceIdx = initalCount
            hasSource = true
          }
          initalCount += 1
        }

        // Mark Edge for Deletion 
        if (!hasSource || !hasTarget) {
          state.edges[idx].toDelete = true
        }
      }

      // Delete Edges
      state.edges = state.edges.filter(e => !e.toDelete)
      // Reapply Edge Indexes
      for (let idx in state.nodes) {
        state.nodes[idx].idx = idx
      }

      // Update Selected Node
      state.selectedNode = null
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  createNewNode
  , updateNodeQuery
  , updateNodeQueryResults
  , updateNodeInputFileName
  , setSelectedNode
  , applyNodeChangesRdx
  , applyEdgeChangesRdx
  , addNewEdge
  , deleteSelectedNode
  , updateEdgeSourceDisplayTitle
  , updateNodeTitle
} = workflowRedux.actions

export default workflowRedux.reducer
