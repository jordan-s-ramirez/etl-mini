import { Grid, TextField, Alert, AlertTitle } from "@mui/material";
import React from "react";
import initSqlJs from "sql.js";
import CustomDataGrid from "./sub-components/data-grid";

export default function SqlJsPage() {
  const [db, setDb] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [execResults, setExecResults] = React.useState(null);

  React.useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => setDb(new SQL.Database()))
      .catch((err) => setError(err));
  }, []);

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
  return (
    <Grid container sx={{ padding: "1%" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {db ? (
          <>
            <TextField
              fullWidth
              onChange={(e) => exec(e.target.value)}
              placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
              rows={5}
              multiline
            />
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
          </>
        ) : (
          <pre>Loading...</pre>
        )}
      </Grid>
    </Grid>
  );
}
