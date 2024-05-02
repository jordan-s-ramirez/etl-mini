import Layout from "@/components/layout/layout";
import Workflow from "@/components/workflow/workflow";
import { workflowConfigInitalEdges } from "@/util/workflow/workflowConfigInitalEdges";
import { workflowConfigInitalNodes } from "@/util/workflow/workflowConfigInitalNodes";
import React from "react";
import { Grid } from "@mui/material";
import { SidebarCreateNodesSection } from "@/components/workflow/sub-components/create-nodes";

const Page = () => {
  // Sidebar Content
  // const [sidebarContent, setSidebarContent] = React.useState({})

  // Workflow
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  // const [selectedNode, setSelectedNode] = React.useState(null);

  // Handle Node Orginization
  React.useMemo(() => {
    if (nodes.length !== 0) {
      setNodes((e) => workflowConfigInitalNodes(e));
      setEdges((_) => workflowConfigInitalEdges(nodes));
    }
  }, [nodes]);

  // Handle Node Selection
  // React.useEffect(() => {
  //   console.log(selectedNode);
  // }, [selectedNode]);

  // Handle Selection
  function handleSidebarNodeSelection(nodeType) {
    // New Node
    let newNode = {
      id: crypto.randomUUID(),
      type: nodeType,
    };

    // Create New Node
    if (nodeType === "dataInputNode") {
      newNode = {
        ...newNode,
        data: {},
        title: "Data Input",
      };
    } else if (nodeType === "sqlNode") {
      newNode = {
        ...newNode,
        data: {},
        title: "SQL Node",
      };
    }
    setNodes((e) => [...e, newNode]);
    setEdges((_) => workflowConfigInitalEdges(nodes));
  }

  return (
    <>
      <Grid container sx={{ height: "100%" }} direction="row-reverse">
        <Grid item xs={12} sm={12} md={4} lg={3} xl={9}>
          {/* <form>
            <FileForm />
          </form> */}
          <SidebarCreateNodesSection
            onSidebarSelection={(e) => {
              handleSidebarNodeSelection(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={3}>
          <div style={{ width: "100%", height: "100%" }}>
            <Workflow
              currentNodes={nodes}
              currentEdges={edges}
              setSelectedNode={(e) => {
                setSelectedNode(e);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
