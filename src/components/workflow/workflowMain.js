import Workflow from "@/components/workflow/workflow";
import React from "react";
import { Card, Grid } from "@mui/material";
import { SelectionDial } from "@/components/workflow/sub-components/selection-dial";
import { DataInsertNode } from "@/components/workflow/sub-components/data-insert-node";
import { SqlNode } from "@/components/workflow/sub-components/sql-node";
import initSqlJs from "sql.js";
import { useDispatch, useSelector } from "react-redux";
import { createNewNode, updateNodeQuery, updateNodeInputFileName, updateNodeQueryResults, setSelectedNode, deleteSelectedNode, updateEdgeSourceDisplayTitle, updateNodeTitle } from "@/store/slices/workflowRedux";
import { configureCurrentQuery } from "@/util/workflow/workflowConfigureCurrentQuery.js"
import { workflowExportETLFile } from "@/util/workflow/workflowExportETLFile";
import { workflowImportETLFile } from "@/util/workflow/workflowImportETLFile";

export function WorkflowMain() {
  // Redux - Dispatch
  const dispatch = useDispatch()

  // DB States
  const [db, setDb] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isQueryPersisting, setIsQueryPersisting] = React.useState(false);

  // Workflow
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)
  const selectedNode = useSelector((state) => state.workflow.selectedNode)

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
  function exec(sql) {
    if (sql === "") {
      return;
    }
    try {
      const results = db.exec(sql);
      dispatch(updateNodeQueryResults(results))
      setError(null);
    } catch (err) {
      console.log("QUERY ERROR:\n", err);
      setError({ message: err.toString(), severity: "warning" });
    }
  }

  // Handle File Data Load
  async function handleDataLoad(e) {
    // Handle Form
    e.preventDefault();

    // SQL Table Paramerters
    console.log(e.target)
    let currDilimiter = e.target[1].value;
    let currFile = e.target[3].files[0];
    let currTable = selectedNode.id;

    // Update Node Info
    dispatch(updateNodeInputFileName(currFile.name))

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
      let dataInsertRow, currRowData;
      for (let i = 1; i < queryData.length; i++) {
        currRowData = queryData[i].split(currDilimiter);
        if (currRowData.length === columns.length) {
          dataInsertRow = `INSERT INTO ${currTable} VALUES (`;
          for (let value of currRowData) {
            dataInsertRow += `'${value}',`;
          }
          createQuery +=
            dataInsertRow.slice(0, dataInsertRow.length - 1) + ");";
        }
      }

      // Run SQL Commands
      exec(createQuery);
      exec(`select * from ${currTable}`);
    };
  }

  // Handle Download Results
  async function handleDownloadResult() {
    // Write Data
    let csvData = ""
    if (selectedNode.hasOwnProperty('nodeData')) {
      if (selectedNode.nodeData.hasOwnProperty('results')) {
        // Write Results if we have
        if (selectedNode.nodeData.results !== null) {
          // write our file
          console.log(selectedNode.nodeData.results)
          csvData += selectedNode.nodeData.results[0].columns.join(',') + '\n'
          for (let currValue of selectedNode.nodeData.results[0].values) {
            csvData += currValue.join(',') + '\n'
          }
        }
      }
    }

    const blob = new Blob([csvData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${selectedNode.title.replaceAll(' ', '_')}.csv`
    link.href = url;
    link.click();
  }

  // Handle SQL Node Query
  async function handleSQLNode(initalQuery) {
    // Curate SQL Query
    let baseQuery = configureCurrentQuery(nodes, edges, selectedNode.idx, initalQuery)
    console.log(baseQuery)
    exec(baseQuery);
  }

  return (
    <>
      <SelectionDial
        handleNodeCreation={(e) => {
          dispatch(createNewNode(e))
        }}
        handleNodeDeletion={() => {
          dispatch(deleteSelectedNode())
        }}
        handleDownloadResults={() => {
          handleDownloadResult()
        }}
        hasSelectedNode={selectedNode !== null}
        handleImportExport={(type) => {
          if (type === 'import') {
            workflowImportETLFile(dispatch)
          }
          else if (type === 'export') {
            workflowExportETLFile(nodes, edges)
          }
        }}
      />
      <Grid
        container
        sx={{ height: "100%", maxHeight: "100vh", overflow: "hidden" }}
        direction="row-reverse"
      >
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
              sx={{
                height: "100%",
                borderRadius: 0,
                maxHeight: "100vh",
                overflowY: "scroll",
              }}
            >
              {selectedNode.nodeType === "dataInputNode" ? (
                <form
                  onSubmit={(e) => {
                    handleDataLoad(e);
                  }}
                >
                  <DataInsertNode
                    title={selectedNode.title}
                    data={selectedNode.nodeData.results}
                    error={error}
                    inputFileName={selectedNode.nodeData.inputFileName}
                    handleTitleChange={(e) => {
                      dispatch(updateNodeTitle(e))
                    }}
                  />
                </form>
              ) : null}
              {selectedNode.nodeType === "sqlNode" ? (
                <>
                  <SqlNode
                    currEdges={edges}
                    error={error}
                    isQueryPersisting={isQueryPersisting}
                    setIsQueryPersisting={() => {
                      setIsQueryPersisting((e) => !e);
                    }}
                    setCurrQuery={(query) => {
                      dispatch(updateNodeQuery(query))
                    }}
                    selectedNode={selectedNode}
                    sendQuery={(e) => {
                      handleSQLNode(e);
                    }}
                    handleTableTitleChange={(e) => {
                      dispatch(updateEdgeSourceDisplayTitle(e))
                    }}
                    handleTitleChange={(e) => {
                      dispatch(updateNodeTitle(e))
                    }}
                  />
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
                dispatch(setSelectedNode(e));
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
