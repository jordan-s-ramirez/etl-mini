import React from "react";
import ReactFlow, {
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch } from "react-redux";
import { applyNodeChangesRdx, applyEdgeChangesRdx, addNewEdge } from "@/store/slices/workflowRedux";
export default function Workflow({
  currentNodes,
  currentEdges,
  setSelectedNode,
}) {
  const dispatch = useDispatch()

  const onNodesChange = React.useCallback((changes) => {
    // console.log("NODE CHANGE TRIGGERD", changes)
    dispatch(applyNodeChangesRdx(changes))
  }, []);

  const onEdgesChange = React.useCallback((changes) => {
    // console.log("ENDGES CHANGES TRIGGERED",changes)
    dispatch(applyEdgeChangesRdx(changes))
  },[]);

  const onConnection = React.useCallback((changes)=>{
    // console.log("ON CONNECTION", changes)
    dispatch(addNewEdge(changes))
  },[])

  const onSelectionChange = (e) => {
    if (e !== undefined && e.hasOwnProperty("nodes") && e.nodes.length !== 0) {
      setSelectedNode(e.nodes[0]);
    } else {
      setSelectedNode(null);
    }
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ReactFlow
          nodes={currentNodes}
          onNodesChange={onNodesChange}
          edges={currentEdges}
          onEdgesChange={onEdgesChange}
          fitView
          onSelectionChange={onSelectionChange}
          onConnect={onConnection}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}
