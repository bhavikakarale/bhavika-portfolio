export type CareerDAG = { nodes: string[]; edges: readonly (readonly [number, number])[] };

export function adjacencyList(graph: CareerDAG) {
  return graph.nodes.map((_, node) => graph.edges.filter(([from]) => from === node).map(([, to]) => to));
}

export function adjacencyMatrix(graph: CareerDAG) {
  return graph.nodes.map((_, from) => graph.nodes.map((_, to) => graph.edges.some(([edgeFrom, edgeTo]) => edgeFrom === from && edgeTo === to) ? 1 : 0));
}

export function inDegrees(graph: CareerDAG) {
  const degrees = Array.from({ length: graph.nodes.length }, () => 0);
  graph.edges.forEach(([, to]) => { degrees[to] += 1; });
  return degrees;
}
