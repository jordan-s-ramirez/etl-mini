
export function configureCurrentQuery(nodes, edges, idx, initalQuery) {
  let filteredEdges = edges.filter(e => e.target === nodes[idx].id)
  let regex, query
  if (filteredEdges.length > 0) {
    if (initalQuery === null || initalQuery === "") {
      query = (" " + nodes[idx].nodeData.query).slice(1)
    }
    else {
      query = initalQuery
    }
    for (let edge of filteredEdges) {
      regex = new RegExp(" +" + edge.sourceDisplayTitle + " *", "g")
      query = query.replaceAll(regex, ` (${configureCurrentQuery(nodes, edges, edge.sourceIdx, null)}) `)
    }
    return query
  }

  return nodes[idx].id
}
