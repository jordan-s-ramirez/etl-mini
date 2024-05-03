import Layout from "@/components/layout/layout";
import Workflow from "@/components/workflow/workflow";
import { workflowConfigInitalEdges } from "@/util/workflow/workflowConfigInitalEdges";
import { workflowConfigInitalNodes } from "@/util/workflow/workflowConfigInitalNodes";
import React from "react";
import { Grid } from "@mui/material";
import { SidebarCreateNodesSection } from "@/components/workflow/sub-components/create-nodes";
import SelectionDial from "@/components/workflow/sub-components/selection-dial";
import { UploadDataForm } from "@/components/workflow/sub-components/uploadDataForm";

const Page = () => {
  // Sidebar Content
  // const [sidebarContent, setSidebarContent] = React.useState({})

  // Workflow
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  const [selectedNode, setSelectedNode] = React.useState(null);

  // Handle Node Orginization
  React.useMemo(() => {
    if (nodes.length !== 0) {
      setNodes((e) => workflowConfigInitalNodes(e));
      // setEdges((_) => workflowConfigInitalEdges(nodes));
    }
  }, [nodes]);

  // Handle Node Selection
  // React.useEffect(() => {
  //   console.log(selectedNode);
  // }, [selectedNode]);

  // Handle Selection
  function handleNodeCreation(nodeType) {
    // New Node
    let newNode = {
      id: crypto.randomUUID(),
      nodeType: nodeType,
    };

    // Create New Node
    if (nodeType === "dataInputNode") {
      newNode = {
        ...newNode,
        data: {},
        title: "Data Input",
        barSizing: { md: 4, lg: 3, xl: 3 },
      };
    } else if (nodeType === "sqlNode") {
      newNode = {
        ...newNode,
        data: {},
        title: "SQL Node",
        barSizing: { md: 6, lg: 6, xl: 6 },
      };
    }
    setNodes((e) => [...e, newNode]);
    // setEdges((_) => workflowConfigInitalEdges(nodes));
  }

  return (
    <>
      <SelectionDial
        handleNodeCreation={(e) => {
          handleNodeCreation(e);
        }}
      />
      <Grid container sx={{ height: "100%" }} direction="row-reverse">
        {selectedNode !== null ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={selectedNode.barSizing.md}
            lg={selectedNode.barSizing.lg}
            xl={selectedNode.barSizing.xl}
          >
            {console.log(selectedNode)}
            {selectedNode.nodeType === "dataInputNode" ? (
              <>
                <UploadDataForm />
              </>
            ) : null}
            {selectedNode.nodeType === "sqlNode" ? (
              <>
                <p>SQL Node</p>
                <p>test</p>
              </>
            ) : null}
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          sm={12}
          md={selectedNode !== null ? 12 - selectedNode.barSizing.md : 12}
          lg={selectedNode !== null ? 12 - selectedNode.barSizing.lg : 12}
          xl={selectedNode !== null ? 12 - selectedNode.barSizing.xl : 12}
        >
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
