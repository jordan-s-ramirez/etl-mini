import pako from 'pako';

export function workflowExportETLFile(nodes, edges) {
  // Remove Results - To save data
  let cleanNodes = JSON.parse(JSON.stringify(nodes))
  for (let idx in nodes) {
    cleanNodes[idx].nodeData.results = []
  }

  // Compress Data - Make file small
  let compressed = pako.gzip(JSON.stringify({
    nodes: cleanNodes,
    edges: edges
  }), { to: 'string' });
  compressed = btoa(String.fromCharCode.apply(null, compressed));
  console.log(compressed)

  // Save File
  const filename = "my_etl_pipeline.etlm";
  const blob = new Blob([compressed], { type: 'application/gzip' });
  const link = document.createElement('a');
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
