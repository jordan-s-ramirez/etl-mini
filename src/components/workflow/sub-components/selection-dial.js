import * as React from "react";
import { styled } from "@mui/material/styles";
import { DiSqllite } from "react-icons/di";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { LuFileInput } from "react-icons/lu";
import { Box } from "@mui/material";
import { FaRegTrashAlt, FaFileDownload } from "react-icons/fa";
import { TbTableImport, TbFileExport } from "react-icons/tb";

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

const nodeDialSelections = [
  { icon: <TbTableImport />, name: "Data Input Node", key: "dataInputNode" },
  { icon: <DiSqllite />, name: "SQL Node", key: "sqlNode" },
  { icon: <FaFileDownload />, name: "Download Results", key: "downloadResults" },
  { icon: <FaRegTrashAlt />, name: "Delete Node", key: "deleteNode" }
];
const importExportSelections = [
  { icon: <LuFileInput />, name: "Import ETL File", key: "import" },
  { icon: <TbFileExport />, name: "Export ETL File", key: "export" },
];

export function SelectionDial({
  handleNodeCreation,
  handleNodeDeletion,
  hasSelectedNode,
  handleDownloadResults,
  handleImportExport }) {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <Box sx={{ position: "relative" }}>
      {/* Import and Export Section of Dial */}
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={null}
        direction={"down"}
        open={isActive}
      >
        {importExportSelections.map((action) => {
          return (
            <SpeedDialAction
              key={action.key}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                // TODO: Handle Import and Export
                handleImportExport(action.key)
              }}
            />
          )
        }
        )}
      </StyledSpeedDial>
      {/* Node Selection Section of Dial */}
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        open={isActive}
        direction={"right"}
        onClick={() => { setIsActive(e => !e) }}
      >
        {nodeDialSelections.map((action) => {
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
