import {
  Grid,
  TextField,
  Alert,
  AlertTitle,
  Card,
  Stack,
  Checkbox,
  Button,
} from "@mui/material";
import React from "react";
import initSqlJs from "sql.js";
import CustomDataGrid from "./sub-components/data-grid";
import FileForm from "../form/fileForm";

export default function SqlJsPage() {
  const [db, setDb] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [execResults, setExecResults] = React.useState(null);
  const [isQueryPersisting, setIsQueryPersisting] = React.useState(false);
  const [currQuery, setCurrQuery] = React.useState("");

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
      setExecResults(null);
      setError(err);
    }
  };

  // Handle Data Load
  async function handleDataLoad(e) {
    // Handle Form
    e.preventDefault();
    console.log(e);

    // SQL Table Paramerters
    let currTable = e.target[0].value;
    let currFile = e.target[1].files[0];

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
        currRowData = queryData[i].split(",");
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
      {db ? (
        <>
          <Grid
            container
            spacing={1}
            alignItems="stretch"
            sx={{ maxHeight: "30vh", p: 1 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <TextField
                fullWidth
                value={currQuery}
                onChange={(e) => {
                  // Handle Query Persisting
                  if (isQueryPersisting) {
                    exec(e.target.value);
                  }
                  setCurrQuery(e.target.value);
                }}
                placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
                rows={11}
                size="large"
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Stack
                direction={"column"}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                >
                  <form
                    onSubmit={(e) => {
                      handleDataLoad(e);
                    }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <FileForm />
                  </form>
                </Card>
                <Button
                  startIcon={
                    <Checkbox
                      size="small"
                      checked={isQueryPersisting}
                      onClick={() => {
                        setIsQueryPersisting((e) => !e);
                      }}
                    />
                  }
                  onClick={() => exec(currQuery)}
                  fullWidth
                >
                  Run Query
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {/* On Error */}
              <pre>
                {error ? (
                  <Alert severity="warning">
                    <AlertTitle>{"Error"}</AlertTitle>
                    <p>{error.toString()}</p>
                  </Alert>
                ) : null}
              </pre>
              {/* On Data */}
              <pre>
                {execResults ? <CustomDataGrid data={execResults} /> : ""}
              </pre>
            </Grid>
          </Grid>
        </>
      ) : (
        <pre>Loading...</pre>
      )}
    </>
  );
}
