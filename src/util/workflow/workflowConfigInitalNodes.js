const xPx = 200;
const yPx = 100;

export function workflowConfigInitalNodes(data) {
  if (data === undefined) return;

  // let rowLength = Math.ceil(Math.sqrt(data.length));
  for (let i = 0; i < data.length; i++) {
    data[i] = {
      idx: i,
      data: { label: data[i].title },
      position: {
        x: xPx * (i % 2),
        // x: xPx * (i % rowLength),
        y: yPx * i,
      },
      ...data[i],
    };
  }

  // data[data.length - 1] = {
  //   ...data[data.length - 1],
  //   type: "output",
  // };
  // data[0] = {
  //   ...data[0],
  //   type: "input",
  // };

  return data;
}
