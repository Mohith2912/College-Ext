import { traceLinearSearch, traceMinMax, traceCheckSorted, tracePowerRecursion } from '../engines/foundations';
import { traceBinarySearch, traceMergeSort, traceQuickSort } from '../engines/divideConquer';
import { traceDijkstra, tracePrimMST, traceJobSequencing, traceFractionalKnapsack } from '../engines/greedy';
import { trace01Knapsack, traceAllPairsShortestPath, traceOptimalBST } from '../engines/dynamicProg';
import { traceBFS, traceDFS, traceHamiltonianCycle, traceGraphColoring, traceNQueens, traceSumOfSubsets } from '../engines/backtracking';

export function runAllAlgorithmVerifications(): boolean {
  console.log('Running DAA Lab Verification Suite...');

  // 1. Linear Search
  const ls = traceLinearSearch([10, 20, 30], 20);
  if (ls.totalSteps < 2 || ls.finalMetrics.comparisons !== 2) throw new Error('Linear search failed');

  // 2. MinMax
  const mm = traceMinMax([5, 12, 3, 19]);
  if (mm.totalSteps < 4) throw new Error('MinMax failed');

  // 3. CheckSorted
  const cs1 = traceCheckSorted([1, 2, 3]);
  const cs2 = traceCheckSorted([3, 1, 2]);
  if (!cs1.steps[cs1.totalSteps - 1].data.isSorted) throw new Error('CheckSorted true failed');
  if (cs2.steps[cs2.totalSteps - 1].data.isSorted) throw new Error('CheckSorted false failed');

  // 4. Power Recursion
  const pr = tracePowerRecursion(2, 3);
  if (pr.steps[pr.totalSteps - 1].data.finalResult !== 8) throw new Error('Power recursion failed');

  // 5. Binary Search
  const bs = traceBinarySearch([2, 4, 6, 8, 10], 8);
  if (bs.steps[bs.totalSteps - 1].data.foundIndex !== 3) throw new Error('Binary search failed');

  // 6. Merge Sort
  const ms = traceMergeSort([5, 44, 3, 2, 1]);
  const sortedMs = ms.steps[ms.totalSteps - 1].data.arr;
  if (sortedMs.join(',') !== '1,2,3,5,44') throw new Error('Merge sort failed');

  // 7. Quick Sort
  const qs = traceQuickSort([20, 10, 30, 5]);
  const sortedQs = qs.steps[qs.totalSteps - 1].data.arr;
  if (sortedQs.join(',') !== '5,10,20,30') throw new Error('Quick sort failed');

  // 8. Dijkstra
  const dijk = traceDijkstra(
    [
      [0, 10, 30],
      [10, 0, 15],
      [30, 15, 0],
    ],
    0
  );
  if (dijk.steps[dijk.totalSteps - 1].data.dist[2] !== 25) throw new Error('Dijkstra failed');

  // 9. Prim MST
  const prim = tracePrimMST([
    [0, 2, 0, 6],
    [2, 0, 3, 8],
    [0, 3, 0, 0],
    [6, 8, 0, 0],
  ]);
  if (prim.steps[prim.totalSteps - 1].data.mstEdges.length !== 3) throw new Error('Prim MST failed');

  // 10. Job Sequencing
  const jobs = traceJobSequencing([
    { id: 'J1', deadline: 2, profit: 100 },
    { id: 'J2', deadline: 1, profit: 19 },
    { id: 'J3', deadline: 2, profit: 27 },
  ]);
  if (jobs.steps[jobs.totalSteps - 1].data.totalProfit !== 127) throw new Error('Job sequencing failed');

  // 11. Fractional Knapsack
  const frac = traceFractionalKnapsack(
    [
      { id: 'I1', weight: 10, value: 60 },
      { id: 'I2', weight: 20, value: 100 },
    ],
    15
  );
  if (Math.round(frac.steps[frac.totalSteps - 1].data.totalValue) !== 85) throw new Error('Fractional knapsack failed');

  // 12. 0/1 Knapsack
  const k01 = trace01Knapsack([2, 3], [3, 4], 4);
  const max01 = k01.steps[k01.totalSteps - 1].data.dpTable[2][4];
  if (max01 !== 4) throw new Error('0/1 Knapsack failed');

  // 13. APSP
  const apsp = traceAllPairsShortestPath([
    [0, 5, 999],
    [999, 0, 3],
    [999, 999, 0],
  ]);
  if (apsp.steps[apsp.totalSteps - 1].data.dpMatrix[0][2] !== 8) throw new Error('Floyd-Warshall failed');

  // 14. Optimal BST
  const obst = traceOptimalBST(['A', 'B'], [3, 2]);
  if (obst.totalSteps < 2) throw new Error('Optimal BST failed');

  // 15. BFS & DFS
  const bfs = traceBFS(
    [
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    0
  );
  if (bfs.steps[bfs.totalSteps - 1].data.traversalOrder.length !== 3) throw new Error('BFS failed');

  const dfs = traceDFS(
    [
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    0
  );
  if (dfs.steps[dfs.totalSteps - 1].data.traversalOrder.length !== 3) throw new Error('DFS failed');

  // 16. Hamiltonian Cycle
  const hc = traceHamiltonianCycle([
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ]);
  if (!hc.steps[hc.totalSteps - 1].data.isCycleFound) throw new Error('Hamiltonian cycle failed');

  // 17. Graph Coloring
  const gc = traceGraphColoring(
    [
      [0, 1],
      [1, 0],
    ],
    2
  );
  if (gc.steps[gc.totalSteps - 1].data.colorSolutions.length === 0) throw new Error('Graph coloring failed');

  // 18. N-Queens
  const nq = traceNQueens(4);
  if (nq.steps[nq.totalSteps - 1].data.solutionCount !== 1) throw new Error('N-Queens failed');

  // 19. Sum of Subsets
  const sos = traceSumOfSubsets([10, 20, 30], 30);
  if (sos.steps[sos.totalSteps - 1].data.foundSubsets.length !== 2) throw new Error('Sum of subsets failed');

  console.log('All 19 DAA algorithms verified successfully!');
  return true;
}
