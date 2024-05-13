const xPx = 200;
const yPx = 100;

export function workflowConfigLatestNode(data) {
  if (data === undefined) return;

  return {
    data: { label: data.title },
    position: {
      x: xPx,
      y: yPx,
    },
    ...data
  };
}
