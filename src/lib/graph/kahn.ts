import { adjacencyList, inDegrees, type CareerDAG } from "./career-dag";

export type KahnStep = { queue: number[]; resolved: number[]; inDegrees: number[]; cycleDetected: boolean };

export function kahnSteps(graph: CareerDAG): KahnStep[] {
  const degrees = inDegrees(graph); const adjacency = adjacencyList(graph); const queue = degrees.flatMap((degree, index) => degree === 0 ? [index] : []); const resolved: number[] = [];
  const steps: KahnStep[] = [{ queue:[...queue], resolved:[], inDegrees:[...degrees], cycleDetected:false }];
  while (queue.length) { const node = queue.shift()!; resolved.push(node); adjacency[node].forEach((next) => { degrees[next] -= 1; if (degrees[next] === 0) queue.push(next); }); steps.push({ queue:[...queue], resolved:[...resolved], inDegrees:[...degrees], cycleDetected:false }); }
  if (resolved.length !== graph.nodes.length) steps.push({ queue:[], resolved:[...resolved], inDegrees:[...degrees], cycleDetected:true });
  return steps;
}
