import { createSlice } from '@reduxjs/toolkit'
import { workflowConfigInitalEdges } from '@/util/workflow/workflowConfigInitalEdges';
import { workflowConfigInitalNodes } from '@/util/workflow/workflowConfigInitalNodes';
export const workflowRedux = createSlice({
  name: 'workflowRedux',
  initialState: {
    nodes: [],
    edges: [],
    selectedNode: null,
  },
  reducers: {
    createNewNode: (state,action) => {
      let nodeType = action.payload

      // New Node
      let newNode = {
        id: "t" + crypto.randomUUID(),
        nodeType: nodeType,
        source: [],
        target: [],
      };
  
      // Create New Node
      if (nodeType === "dataInputNode") {
        newNode = {
          ...newNode,
          nodeData: { query: "", results: null },
          title: "Data Input",
          barSizing: { md: 4, lg: 3, xl: 3 },
        };
      } else if (nodeType === "sqlNode") {
        newNode = {
          ...newNode,
          nodeData: { query: "", results: null, tableList: [] },
          title: "SQL Node",
          barSizing: { md: 6, lg: 6, xl: 6 },
        };
      }
      state.nodes.push(newNode)
      state.nodes = workflowConfigInitalNodes(state.nodes)
      state.edges = workflowConfigInitalEdges(state.nodes)
      state.selectedNode = state.nodes[state.nodes.length - 1]
    },
    updateNodeQuery: (state, action) => {
      console.log(action.payload)
      // Update Selected Node
      state.selectedNode = {
        ...state.selectedNode,
        nodeData: {
          ...state.selectedNode.nodeData,
          query: action.payload,
        },
      }
      
      // Update All Nodes
      state.nodes[state.selectedNode.idx] = state.selectedNode
    },
    updateNodeQueryResults: (state, action) => {
      // Update Selected Node
      state.selectedNode = {
        ...state.selectedNode,
        nodeData: {
          ...state.selectedNode.nodeData,
          results: action.payload,
        },
      }
      
      // Update All Nodes
      state.nodes[state.selectedNode.idx] = state.selectedNode
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createNewNode
  , updateNodeQuery
  , updateNodeQueryResults 
  , setSelectedNode
} = workflowRedux.actions

export default workflowRedux.reducer