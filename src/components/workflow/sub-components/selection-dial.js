import * as React from "react";
import { styled } from "@mui/material/styles";
import { DiSqllite } from "react-icons/di";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { LuFileInput } from "react-icons/lu";
import { Box } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

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
  { icon: <FaRegTrashAlt/>, name: "Delete Node", key: "deleteNode"}
];

export default function SelectionDial({ handleNodeCreation, handleNodeDeletion, hasSelectedNode }) {
  return (
    <Box sx={{ position: "relative" }}>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        direction={"right"}
      >
        {actions.map((action) => {
          if(action.key !== "deleteNode") {
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
          else if(hasSelectedNode) {
            return(
              <SpeedDialAction
                sx={{backgroundColor:'rgba(255, 0, 43, 0.7)'}}
                key={action.key}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  handleNodeDeletion();
                }}
              />
            )
          }
          return null;
        }
        )}
      </StyledSpeedDial>
    </Box>
  );
}
