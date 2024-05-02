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
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);

  React.useEffect(() => {
    console.log(currentNodes);
    setNodes(currentNodes);
    setEdges(currentEdges);
  }, [currentNodes, currentEdges]);

  const onNodesChange = React.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onSelectionChange = (e) => {
    if (e !== undefined && e.hasOwnProperty("nodes") && e.nodes.length !== 0) {
      setSelectedNode(e.nodes[0]);
    }
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
          onSelectionChange={onSelectionChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}
