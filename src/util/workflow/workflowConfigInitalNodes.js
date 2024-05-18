export function workflowConfigInitalNodes(data, lastPosition) {
  if (data === undefined) return;

  data[data.length - 1] = {
    idx: data.length - 1,
    data: { label: data[data.length - 1].title },
    position: {
      x: lastPosition.x,
      y: lastPosition.y + 100
    },
    ...data[data.length - 1],
  };

  return data;
}
