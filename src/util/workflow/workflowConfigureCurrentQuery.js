
export function configureCurrentQuery(nodes, edges, idx) {
  let filteredEdges = edges.filter(e=>e.target === nodes[idx].id)
  let query
  if(filteredEdges.length > 0) {
    for(let edge of filteredEdges) {
      query = nodes[idx].nodeData.query
      query = query.replaceAll(edge.sourceDisplayTitle, edge.source);
      query = query.replaceAll(edge.source, `(${configureCurrentQuery(nodes, edges, edge.sourceIdx)})`)
      return query
    }
  }

  return nodes[idx].id
}
