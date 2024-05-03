import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  Select,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
} from "@mui/material";
import { MdFileUpload } from "react-icons/md";
import DataImportGrid from "./data-import-grid";

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

function InputFileUpload() {
  const [fileData, setFileData] = React.useState(null);

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
          let fileName;
          try {
            fileName = e.target.value.split("\\");
            fileName = fileName.slice(-1)[0];
          } catch {
            fileName = "";
          }
          setFileData(fileName);
        }}
      />
    </Button>
  );
}

export function DataInsertNode({ title, data }) {
  return (
    <>
      <Stack
        alignItems="stretch"
        direction="column"
        spacing={1}
        sx={{ height: "100%", p: 1, minHeight: 200 }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Delimiter</InputLabel>
          <Select label="Delimiter" required>
            <MenuItem value={","}>Comma</MenuItem>
            <MenuItem value={"|"}>Pipe</MenuItem>
            <MenuItem value={"\t"}>Tab</MenuItem>
          </Select>
        </FormControl>
        <InputFileUpload />
        <Button type="submit" fullWidth>
          Load Data
        </Button>
        {data !== null ? <DataImportGrid data={data} /> : null}
      </Stack>
    </>
  );
}
