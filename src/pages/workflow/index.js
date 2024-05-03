import Layout from "@/components/layout/layout";
import Workflow from "@/components/workflow/workflow";
import { workflowConfigInitalEdges } from "@/util/workflow/workflowConfigInitalEdges";
import { workflowConfigInitalNodes } from "@/util/workflow/workflowConfigInitalNodes";
import React from "react";
import { Card, Grid } from "@mui/material";
import SelectionDial from "@/components/workflow/sub-components/selection-dial";
import { DataInsertNode } from "@/components/workflow/sub-components/data-insert-node";
import { SqlNode } from "@/components/workflow/sub-components/sql-node";
import initSqlJs from "sql.js";

const Page = () => {
  // DB States
  const [db, setDb] = React.useState(null);
  const [execResults, setExecResults] = React.useState(null);
  const [error, setError] = React.useState(null);
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

  // Load Local SQL DB
  React.useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => setDb(new SQL.Database()))
      .catch((err) => setError(err));
  }, []);

  // Run SQL Query
  const exec = (sql) => {
    if (sql === "") {
      return;
    }
    try {
      const results = db.exec(sql);
      setExecResults(results);
      setError(null);
    } catch (err) {
      console.log(err);
      setExecResults(null);
      setError(err);
    }
  };

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
        nodeData: {},
        title: "Data Input",
        barSizing: { md: 4, lg: 3, xl: 3 },
      };
    } else if (nodeType === "sqlNode") {
      newNode = {
        ...newNode,
        nodeData: {},
        title: "SQL Node",
        barSizing: { md: 6, lg: 6, xl: 6 },
      };
    }
    setNodes((e) => [...e, newNode]);
    // setEdges((_) => workflowConfigInitalEdges(nodes));
  }

  // Handle Data Load
  async function handleDataLoad(e) {
    // Handle Form
    e.preventDefault();

    // SQL Table Paramerters
    let currDilimiter = e.target[0].value;
    let currFile = e.target[2].files[0];
    let currTable = selectedNode.id.replaceAll("-", "");

    // Parse Out FIles
    let fr = new FileReader();
    fr.readAsText(currFile, "utf-8");
    fr.onloadend = async (j) => {
      let queryData = j.target.result;
      queryData = queryData.split("\n");
      let columns = queryData[0].split(",");

      // Config Query
      let createQuery = `CREATE TABLE ${currTable} (`;
      for (const field of columns) {
        createQuery += field + " char,";
      }
      createQuery = createQuery.slice(0, createQuery.length - 1) + ");";

      // Configure Data
      let dataInsertRow = `INSERT INTO ${currTable} VALUES (`;
      let currRowData;
      for (let i = 1; i < queryData.length; i++) {
        currRowData = queryData[i].split(currDilimiter);
        if (currRowData.length === columns.length) {
          for (let value of currRowData) {
            dataInsertRow += `'${value}',`;
          }
          createQuery +=
            dataInsertRow.slice(0, dataInsertRow.length - 1) + ");";
          dataInsertRow = `INSERT INTO ${currTable} VALUES (`;
        }
      }

      // Run SQL Commands
      exec(createQuery);
      console.log(createQuery);
    };
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
            <Card
              elevation={2}
              variant="outlined"
              sx={{ height: "100%", borderRadius: 0 }}
            >
              {selectedNode.nodeType === "dataInputNode" ? (
                <form
                  onSubmit={(e) => {
                    handleDataLoad(e);
                  }}
                >
                  <DataInsertNode title={selectedNode.title} />
                </form>
              ) : null}
              {selectedNode.nodeType === "sqlNode" ? (
                <>
                  <SqlNode title={selectedNode.title} />
                </>
              ) : null}
            </Card>
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
