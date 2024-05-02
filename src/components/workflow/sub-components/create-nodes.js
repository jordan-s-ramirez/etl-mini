import React from "react";
import { Stack, Button } from "@mui/material";

export function SidebarCreateNodesSection({ onSidebarSelection }) {
  return (
    <Stack sx={{ p: 1 }} spacing={1}>
      <p>Create New Node</p>
      <Button
        onClick={() => {
          onSidebarSelection("dataInputNode");
        }}
      >
        Data Import
      </Button>
      <Button
        onClick={() => {
          onSidebarSelection("sqlNode");
        }}
      >
        SQL Node
      </Button>
    </Stack>
  );
}
