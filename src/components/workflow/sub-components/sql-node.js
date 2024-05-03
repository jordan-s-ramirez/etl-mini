import React from "react";
import Button from "@mui/material/Button";
import { Input, Stack } from "@mui/material";

export function SqlNode({ title }) {
  return (
    <>
      <Stack
        alignItems="stretch"
        direction="column"
        spacing={1}
        sx={{ height: "100%", p: 1, minHeight: 200 }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <Input fullWidth placeholder="Table Name" required />
        <Button type="submit" fullWidth>
          Load Data
        </Button>
      </Stack>
    </>
  );
}
