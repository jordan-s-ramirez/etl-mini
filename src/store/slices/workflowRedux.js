import { createSlice } from '@reduxjs/toolkit'
import { workflowConfigInitalEdges } from '@/util/workflow/workflowConfigInitalEdges';
import { workflowConfigInitalNodes } from '@/util/workflow/workflowConfigInitalNodes';
import {applyNodeChanges, applyEdgeChanges} from "reactflow"; 
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

      // New Node - General Config
      let newNode = {
        id: "t" + crypto.randomUUID().replaceAll("-", ""),
        nodeType: nodeType,
        nodeData: { 
          query: "", 
          results: null, 
          source: [],
          target: [], 
        },
      };
  
      // Configure New Node
      if (nodeType === "dataInputNode") {
        newNode = {
          ...newNode,
          type: "input",
          title: "Data Input",
          barSizing: { md: 4, lg: 3, xl: 3 },
        };
      } else if (nodeType === "sqlNode") {
        newNode = {
          ...newNode,
          type: "default",
          title: "SQL Node",
          barSizing: { md: 6, lg: 6, xl: 6 },
        };
      }
      state.nodes.push(newNode)
      state.nodes = workflowConfigInitalNodes(state.nodes)

      // Add new edge to selected node
      if(nodeType !== "dataInputNode" && state.selectedNode !== null) {
        state.edges.push({
          // label: "test",
          source: state.selectedNode.id,
          target: newNode.id,
          sourceHandle: null,
          targetHandle: null,
          type: "simplebezier",
        }) 
      }

      // Update Selected Node
      state.selectedNode = newNode
    },
    updateNodeQuery: (state, action) => {
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
    applyNodeChangesRdx: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
    applyEdgeChangesRdx: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    addNewEdge: (state, action) => {
      state.edges.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  createNewNode
  , updateNodeQuery
  , updateNodeQueryResults 
  , setSelectedNode
  , applyNodeChangesRdx
  , applyEdgeChangesRdx
  , addNewEdge
} = workflowRedux.actions

export default workflowRedux.reducer