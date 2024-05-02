import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Input, Card, Stack } from "@mui/material";
import { MdFileUpload } from "react-icons/md";

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

export function FileForm() {
  return (
    <>
      <Stack
        justifyContent="space-evenly"
        alignItems="stretch"
        direction="column"
        sx={{ height: "100%", p: 1, minHeight: 200 }}
      >
        <h3 style={{ margin: 0 }}>File Upload</h3>
        <Input fullWidth placeholder="Table Name" required />
        <InputFileUpload />
        <Button type="submit" fullWidth>
          Load Data
        </Button>
      </Stack>
    </>
  );
}
