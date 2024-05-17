
export function configureCurrentQuery(nodes, edges, idx) {
  let filteredEdges = edges.filter(e=>e.target === nodes[idx].id)

 // if(filteredEdges.length > 0) {
 //   for(let edge of filteredEdges) {
 //     
 //   }
 // }

  return ""
}
