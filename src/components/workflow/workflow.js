import React from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

export default function Workflow({
  currentNodes,
  currentEdges,
  setSelectedNode,
}) {

  const onNodesChange = React.useCallback((changes) => {
      console.log("NODE CHANGE TRIGGERD", changes)},
      // setNodes((nds) => applyNodeChanges(changes, nds))},
    [],
  );
  
  const onEdgesChange = React.useCallback((changes) => {
      console.log("ENDGES CHANGES TRIGGERED",changes)
      // setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [],
  );

  const onConnection = React.useCallback((changes)=>{
    console.log("ON CONNECTION", changes)
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
