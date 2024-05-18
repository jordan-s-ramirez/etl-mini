
export function configureCurrentQuery(nodes, edges, idx) {
  let filteredEdges = edges.filter(e => e.target === nodes[idx].id)
  let regex
  if (filteredEdges.length > 0) {
    let query = (" " + nodes[idx].nodeData.query).slice(1)
    for (let edge of filteredEdges) {
      regex = new RegExp(" +" + edge.sourceDisplayTitle + " *", "g")
      console.log(regex)
      query = query.replaceAll(regex, " " + edge.source + " ");
      query = query.replaceAll(edge.source, `(${configureCurrentQuery(nodes, edges, edge.sourceIdx)})`)
    }
    return query
  }

  return nodes[idx].id
}
