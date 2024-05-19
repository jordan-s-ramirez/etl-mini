export function workflowConfigInitalNodes(data, lastPosition) {
  if (data === undefined) return;

  if (lastPosition !== null) {
    data[data.length - 1] = {
      idx: data.length - 1,
      data: { label: data[data.length - 1].title },
      position: {
        x: lastPosition.x,
        y: lastPosition.y + 100
      },
      ...data[data.length - 1],
    };
  }
  else {
    let maxPosition = { x: 0, y: 0 }
    for (let nodeIdx = 0; nodeIdx < data.length; nodeIdx++) {
      if (data.hasOwnProperty('position')) {
        if (maxPosition.y < data[nodeIdx].position.y) {
          maxPosition = data[nodeIdx].position
        }
      }
    }
    data[data.length - 1] = {
      idx: data.length - 1,
      data: { label: data[data.length - 1].title },
      position: {
        x: maxPosition.x,
        y: maxPosition.y + 100
      },
      ...data[data.length - 1],
    };
  }
  return data;
}
