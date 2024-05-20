import * as React from "react";
import { styled } from "@mui/material/styles";
import { DiSqllite } from "react-icons/di";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { LuFileInput } from "react-icons/lu";
import { Box } from "@mui/material";
import { FaRegTrashAlt, FaFileDownload } from "react-icons/fa";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <LuFileInput />, name: "Data Input Node", key: "dataInputNode" },
  { icon: <DiSqllite />, name: "SQL Node", key: "sqlNode" },
  { icon: <FaFileDownload />, name: "Download Results", key: "downloadResults" },
  { icon: <FaRegTrashAlt />, name: "Delete Node", key: "deleteNode" }
];

export function SelectionDial({ handleNodeCreation, handleNodeDeletion, hasSelectedNode, handleDownloadResults }) {
  return (
    <Box sx={{ position: "relative" }}>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        direction={"right"}
      >
        {actions.map((action) => {
          if (action.key !== "deleteNode" && action.key !== "downloadResults") {
            return (
              <SpeedDialAction
                key={action.key}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  handleNodeCreation(action.key);
                }}
              />
            )
          }
          else if (hasSelectedNode) {
            if (action.key === "deleteNode") {
              return (
                <SpeedDialAction
                  sx={{ backgroundColor: 'rgba(255, 0, 43, 0.7)' }}
                  key={action.key}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => {
                    handleNodeDeletion();
                  }}
                />
              )
            }
            else if (action.key === "downloadResults") {
              return (
                <SpeedDialAction
                  sx={{ backgroundColor: 'rgba(43, 255, 0, 0.7)' }}
                  key={action.key}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => {
                    handleDownloadResults()
                  }}
                />
              )
            }
          }
          return null;
        }
        )}
      </StyledSpeedDial>
    </Box>
  );
}
