import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const GridColDef = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

export default function CustomDataGrid({ data }) {
  // const [currData, setCurrData] = React.useState([]);
  const [currCols, setCurrCols] = React.useState([]);
  const [currRows, setCurrRows] = React.useState([]);

  React.useEffect(() => {
    if (
      data === undefined ||
      data.length === 0 ||
      data[0].columns === undefined ||
      data[0].values === undefined
    ) {
      return;
    }

    // Configure Column Def
    let newCols = [];
    for (let i = 0; i < data[0].columns.length; i++) {
      newCols.push({
        field: data[0].columns[i],
        headerName: data[0].columns[i],
        width: 150,
      });
    }

    // Configure Row Data
    let rowData = [];
    let itemData = { id: newCols[0].field + data[0].values[0][0] };
    for (let i = 0; i < data[0].values.length; i++) {
      for (let j = 0; j < data[0].values[i].length; j++) {
        itemData[newCols[i].field] = data[0].values[i][j];
      }
      rowData.push(itemData);
      itemData = { id: newCols[0].field + data[0].values[0][i] };
    }

    // Update States
    console.log(newCols);
    console.log(rowData);

    setCurrCols(newCols);
    setCurrRows(rowData);
  }, [data]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={currRows} columns={currCols} />
    </div>
  );
}
