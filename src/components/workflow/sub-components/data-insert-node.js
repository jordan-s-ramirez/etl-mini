import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  Select,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
  Alert,
  AlertTitle,
} from "@mui/material";
import { MdFileUpload } from "react-icons/md";
import { GenericDataGrid } from "@/components/tables/generic-data-grid";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({ setCurrFileType, inputFileName }) {
  const [fileData, setFileData] = React.useState(inputFileName);

  React.useEffect(() => { setFileData(inputFileName) }, [inputFileName])

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<MdFileUpload />}
      type="file"
      fullWidth
    >
      {fileData !== null ? fileData : "Upload File"}
      <VisuallyHiddenInput
        type="file"
        required
        onChange={(e) => {
          // Update File Name
          let fileName;
          try {
            fileName = e.target.value.split("\\");
            fileName = fileName.slice(-1)[0];
          } catch {
            fileName = "";
          }
          setFileData(fileName);

          // Update File Type
          if (/\.csv$/.test(fileName)) {
            setCurrFileType(",");
          } else if (/\.tsv$/.test(fileName)) {
            setCurrFileType("\t");
          } else if (/\.psv$/.test(fileName)) {
            setCurrFileType("|");
          }
        }}
      />
    </Button>
  );
}

export function DataInsertNode({ title, data, error, inputFileName, handleTitleChange }) {
  const [currFileType, setCurrFileType] = React.useState("");

  // Sync File Type
  React.useEffect(() => {
    // Update File Type
    if (/\.csv$/.test(inputFileName)) {
      setCurrFileType(",");
    } else if (/\.tsv$/.test(inputFileName)) {
      setCurrFileType("\t");
    } else if (/\.psv$/.test(inputFileName)) {
      setCurrFileType("|");
    }
    else {
      setCurrFileType("")
    }
  }, [inputFileName])

  return (
    <>
      <Stack
        alignItems="stretch"
        direction="column"
        spacing={1}
        sx={{ height: "100%", p: 1, minHeight: 200 }}
      >
        <input onChange={(e) => { handleTitleChange(e.target.value) }} style={{ border: 0, fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold' }} value={title} />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Delimiter</InputLabel>
          <Select
            label="Delimiter"
            required
            value={currFileType}
            onChange={(e) => {
              setCurrFileType(e.target.value);
            }}
          >
            <MenuItem value={","}>Comma</MenuItem>
            <MenuItem value={"|"}>Pipe</MenuItem>
            <MenuItem value={"\t"}>Tab</MenuItem>
          </Select>
        </FormControl>
        <InputFileUpload
          setCurrFileType={(e) => {
            setCurrFileType(e);
          }}
          inputFileName={inputFileName}
        />
        <Button type="submit" fullWidth>
          Load Data
        </Button>
        {error === null ? (
          <GenericDataGrid data={data} />
        ) : (
          <>
            <Alert severity="warning">
              <AlertTitle>{"Error"}</AlertTitle>
              <p>{error.toString()}</p>
            </Alert>
          </>
        )}
      </Stack>
    </>
  );
}
