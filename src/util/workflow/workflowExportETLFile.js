// NOTE: To Implement
export function workflowExportETLFile(nodes, edges) {
  // TODO: Remove Results - To save data
  for (let idx in nodes) {
    nodes[idx].nodeData.results = []
  }

  // TODO: Compress Data - Make file small


  // TODO: Save File
  const text = "This is the content of the text file.";
  const filename = "my_etl_pipeline.etlm";
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
