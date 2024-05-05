import React from "react";
import Button from "@mui/material/Button";
import { Input, Stack, Checkbox, localQueryText, TextField } from "@mui/material";
import { GenericDataGrid } from "@/components/tables/generic-data-grid";

export function SqlNode({
  isQueryPersisting,
  setIsQueryPersisting,
  setCurrQuery,
  sendQuery,
  currEdges,
  selectedNodeData,
}) {
  // const tableList = React.useMemo(() => {
  //   return currEdges.filter((e) => e.target === selectedNodeData.id);
  // }, [currEdges, selectedNodeData]);

  const tableList = []
  const [localQueryText, setLocalQueryText] = React.useState("")

  React.useEffect(()=>{
    setLocalQueryText(selectedNodeData.query)
  },[])

  return (
    <>
      <Stack
        alignItems="stretch"
        direction="column"
        spacing={1}
        sx={{ height: "100%", p: 1, minHeight: 200 }}
      >
        <h3 style={{ margin: 0 }}>{selectedNodeData.title}</h3>
        {tableList.map((obj) => {
          return (
            <Input
              key={obj.id}
              fullWidth
              placeholder="Table Name"
              required
              value={obj.id}
            />
          );
        })}
        <Button
          startIcon={
            <Checkbox
              size="small"
              checked={isQueryPersisting}
              onClick={() => {
                setIsQueryPersisting();
              }}
            />
          }
          onClick={() => {
            console.log("RUN QUERY", localQueryText);
            sendQuery(localQueryText);
          }}
          type="submit"
          fullWidth
        >
          Run Query
        </Button>
        <TextField
          fullWidth
          value={localQueryText}
          onChange={(e) => {
            if (isQueryPersisting) {
              // Handle Query Persisting
              sendQuery(e.target.value);
            }
            setLocalQueryText(e.target.value);
            setCurrQuery(e.target.value);
          }}
          placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
          rows={11}
          size="large"
          multiline
        />
        <GenericDataGrid data={selectedNodeData.results} />
      </Stack>
    </>
  );
}
