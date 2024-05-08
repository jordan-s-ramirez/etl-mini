import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export function GenericDataGrid({ data }) {
  // const [currData, setCurrData] = React.useState([]);
  const [currCols, setCurrCols] = React.useState([]);
  const [currRows, setCurrRows] = React.useState([]);

  React.useMemo(() => {
    // Return if there is no data
    if (
      data === null ||
      data === undefined ||
      data.length === 0 ||
      data[0].columns === undefined ||
      data[0].values === undefined
    ) {
      setCurrCols([])
      setCurrRows([])
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
    for (let item of data[0].values) {
      for (let i = 0; i < item.length; i++) {
        itemData[newCols[i].field] = item[i];
      }
      rowData.push(itemData);
      itemData = { id: crypto.randomUUID() };
    }

    // Update States
    setCurrCols(newCols);
    setCurrRows(rowData);
  }, [data]);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid rows={currRows} columns={currCols} />
    </div>
  );
}
