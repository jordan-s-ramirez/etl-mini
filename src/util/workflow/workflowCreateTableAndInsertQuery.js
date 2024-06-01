export function workflowCreateTableAndInsertQuery(columns, values, currTable) {
  // Config Query
  let createQuery = `CREATE TABLE ${currTable} (`;
  for (const field of columns) {
    createQuery += field + " char,";
  }
  createQuery = createQuery.slice(0, createQuery.length - 1) + ");";

  // Configure Data
  let dataInsertRow, currRowData;
  for (let i = 1; i < values.length; i++) {
    currRowData = values[i]
    if (currRowData.length === columns.length) {
      dataInsertRow = `INSERT INTO ${currTable} VALUES (`;
      for (let value of currRowData) {
        dataInsertRow += `'${value}',`;
      }
      createQuery += dataInsertRow.slice(0, dataInsertRow.length - 1) + ");";
    }
  }
  return createQuery
} 
