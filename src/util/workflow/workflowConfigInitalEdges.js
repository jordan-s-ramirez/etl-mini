export function workflowConfigInitalEdges(data) {
  if (data === undefined) return;

  let edges = [];
  for (let i = 1; i < data.length; i++) {
    edges.push({
      // ...data[i],
      source: data[i - 1].id,
      target: data[i].id,
      // label: "test",
      type: "simplebezier",
    });
  }

  return edges;
}
