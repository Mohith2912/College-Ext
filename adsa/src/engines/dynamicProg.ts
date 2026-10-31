import { AlgorithmTraceStep, ExecutionTrace } from '../types/algorithm';

export interface Knapsack01Data {
  weights: number[];
  values: number[];
  capacity: number;
  dpTable: number[][]; // (n+1) x (capacity+1)
  currentI: number | null; // 1-based item index
  currentW: number | null; // current capacity column
  takeVal?: number;
  dontVal?: number;
  chosenItemIndices?: number[];
  cellAction?: 'take' | 'dont' | 'exceed';
}

export function trace01Knapsack(weights: number[], values: number[], capacity: number): ExecutionTrace<Knapsack01Data> {
  const steps: AlgorithmTraceStep<Knapsack01Data>[] = [];
  const n = weights.length;
  let operations = 0;

  // Initialize dp table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  steps.push({
    stepIndex: 0,
    description: `Initialized (n+1) x (W+1) = ${n + 1} x ${capacity + 1} DP table with 0s. Row 0 (0 items) and Column 0 (capacity 0) represent boundary base cases.`,
    activeLine: 3,
    phase: 'init',
    data: {
      weights: [...weights],
      values: [...values],
      capacity,
      dpTable: dp.map((row) => [...row]),
      currentI: null,
      currentW: null,
    },
    variables: { n, capacity, rows: n + 1, cols: capacity + 1 },
    metrics: { operations: 1 },
  });

  for (let i = 1; i <= n; i++) {
    const itemWeight = weights[i - 1];
    const itemValue = values[i - 1];

    for (let w = 1; w <= capacity; w++) {
      operations++;

      if (itemWeight <= w) {
        const take = itemValue + dp[i - 1][w - itemWeight];
        const dont = dp[i - 1][w];
        const best = Math.max(take, dont);
        dp[i][w] = best;

        const action: 'take' | 'dont' = take > dont ? 'take' : 'dont';

        steps.push({
          stepIndex: steps.length,
          description: `Cell dp[${i}][${w}] for Item ${i} (wt=${itemWeight}, val=${itemValue}) at cap ${w}: take = ${itemValue} + dp[${i - 1}][${w - itemWeight}] (${dp[i - 1][w - itemWeight]}) = ${take}; dont = dp[${i - 1}][${w}] = ${dont}. Max is ${best} (${action.toUpperCase()}).`,
          activeLine: 8,
          phase: 'select',
          data: {
            weights: [...weights],
            values: [...values],
            capacity,
            dpTable: dp.map((row) => [...row]),
            currentI: i,
            currentW: w,
            takeVal: take,
            dontVal: dont,
            cellAction: action,
          },
          variables: { i, w, itemWeight, itemValue, take, dont, bestChoice: action },
          metrics: { operations },
        });
      } else {
        dp[i][w] = dp[i - 1][w];

        steps.push({
          stepIndex: steps.length,
          description: `Cell dp[${i}][${w}]: Item ${i} weight (${itemWeight}) exceeds current capacity ${w}. Must exclude item: dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dp[i - 1][w]}.`,
          activeLine: 10,
          phase: 'prune',
          data: {
            weights: [...weights],
            values: [...values],
            capacity,
            dpTable: dp.map((row) => [...row]),
            currentI: i,
            currentW: w,
            dontVal: dp[i - 1][w],
            cellAction: 'exceed',
          },
          variables: { i, w, itemWeight, reason: 'weight exceeds capacity' },
          metrics: { operations },
        });
      }
    }
  }

  // Backtracking step to identify selected items
  const chosen: number[] = [];
  let tempW = capacity;
  for (let i = n; i > 0; i--) {
    if (dp[i][tempW] !== dp[i - 1][tempW]) {
      chosen.push(i);
      tempW -= weights[i - 1];
    }
  }
  chosen.reverse();

  steps.push({
    stepIndex: steps.length,
    description: `0/1 Knapsack dynamic programming complete! Optimal profit = dp[${n}][${capacity}] = ${dp[n][capacity]}. Backtracking shows items chosen: [${chosen.map((c) => `Item ${c} (wt=${weights[c - 1]}, val=${values[c - 1]})`).join(', ')}].`,
    activeLine: 13,
    phase: 'done',
    data: {
      weights: [...weights],
      values: [...values],
      capacity,
      dpTable: dp.map((row) => [...row]),
      currentI: n,
      currentW: capacity,
      chosenItemIndices: chosen,
    },
    variables: { optimalProfit: dp[n][capacity], chosenCount: chosen.length },
    metrics: { operations },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
    },
  };
}

export interface APSPData {
  n: number;
  dpMatrix: number[][];
  k: number | null; // Intermediate pivot vertex
  i: number | null; // Source vertex
  j: number | null; // Destination vertex
  nodeNames: string[];
  detourDistance?: number;
  directDistance?: number;
  updated: boolean;
}

export function traceAllPairsShortestPath(initialMatrix: number[][], nodeNames?: string[]): ExecutionTrace<APSPData> {
  const steps: AlgorithmTraceStep<APSPData>[] = [];
  const n = initialMatrix.length;
  const labels = nodeNames && nodeNames.length === n ? nodeNames : Array.from({ length: n }, (_, idx) => `V${idx}`);
  const INF = 999;
  let operations = 0;

  const dp: number[][] = initialMatrix.map((row) => [...row]);

  steps.push({
    stepIndex: 0,
    description: `All-Pairs Shortest Path (Floyd-Warshall) Initialization: Loaded ${n}x${n} adjacency matrix. Unreachable edges represented with INF = 999. Preparing 3 nested loops across pivot k in 0..${n - 1}.`,
    activeLine: 4,
    phase: 'init',
    data: {
      n,
      dpMatrix: dp.map((r) => [...r]),
      k: null,
      i: null,
      j: null,
      nodeNames: labels,
      updated: false,
    },
    variables: { n, INF },
    metrics: { operations: 1 },
  });

  for (let k = 0; k < n; k++) {
    steps.push({
      stepIndex: steps.length,
      description: `Outer Loop: Testing intermediate pivot vertex k = ${k} (${labels[k]}). Inspecting if routing any path i -> j through ${labels[k]} produces a shorter distance.`,
      activeLine: 5,
      phase: 'visit',
      data: {
        n,
        dpMatrix: dp.map((r) => [...r]),
        k,
        i: null,
        j: null,
        nodeNames: labels,
        updated: false,
      },
      variables: { currentPivotK: labels[k], k },
      metrics: { operations },
    });

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        operations++;
        const direct = dp[i][j];
        const viaK = dp[i][k] + dp[k][j];
        const canImprove = dp[i][k] < INF && dp[k][j] < INF && viaK < direct;

        if (canImprove) {
          dp[i][j] = viaK;
          steps.push({
            stepIndex: steps.length,
            description: `Distance Improved! dp[${labels[i]}][${labels[j]}] via pivot ${labels[k]}: ${direct === INF ? 'INF' : direct} -> ${viaK} (dp[${labels[i]}][${labels[k]}] + dp[${labels[k]}][${labels[j]}] = ${dp[i][k]} + ${dp[k][j]}).`,
            activeLine: 10,
            phase: 'relax',
            data: {
              n,
              dpMatrix: dp.map((r) => [...r]),
              k,
              i,
              j,
              nodeNames: labels,
              directDistance: direct,
              detourDistance: viaK,
              updated: true,
            },
            variables: { i: labels[i], j: labels[j], k: labels[k], oldDist: direct === INF ? 'INF' : direct, newDist: viaK },
            metrics: { operations },
          });
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Floyd-Warshall complete! All-pairs shortest path distance matrix fully computed across all ${n} vertices in O(V³) time.`,
    activeLine: 14,
    phase: 'done',
    data: {
      n,
      dpMatrix: dp.map((r) => [...r]),
      k: null,
      i: null,
      j: null,
      nodeNames: labels,
      updated: false,
    },
    variables: { completed: true, totalOperations: operations },
    metrics: { operations },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
    },
  };
}

export interface ObstData {
  n: number;
  keys: string[];
  freq: number[];
  dpTable: number[][];
  rootTable: number[][];
  len: number | null;
  i: number | null;
  j: number | null;
  bestRoot: number | null;
  minCost: number | null;
}

export function traceOptimalBST(keys: string[], freq: number[]): ExecutionTrace<ObstData> {
  const steps: AlgorithmTraceStep<ObstData>[] = [];
  const n = keys.length;
  let operations = 0;

  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const root: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  // Base cases: single keys
  for (let i = 0; i < n; i++) {
    dp[i][i] = freq[i];
    root[i][i] = i;
  }

  steps.push({
    stepIndex: 0,
    description: `Optimal BST Initialization: Set diagonal base cases dp[i][i] = freq[i] for each of the ${n} keys. Single key subtrees have search cost equal to key frequency.`,
    activeLine: 4,
    phase: 'init',
    data: {
      n,
      keys: [...keys],
      freq: [...freq],
      dpTable: dp.map((r) => [...r]),
      rootTable: root.map((r) => [...r]),
      len: 1,
      i: null,
      j: null,
      bestRoot: null,
      minCost: null,
    },
    variables: { n, baseLengths: 1 },
    metrics: { operations: n },
  });

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      let sum = 0;
      for (let k = i; k <= j; k++) sum += freq[k];

      let minCost = 99999999;
      let chosenRoot = -1;

      for (let r = i; r <= j; r++) {
        operations++;
        const left = r > i ? dp[i][r - 1] : 0;
        const right = r < j ? dp[r + 1][j] : 0;
        const cost = left + sum + right;

        if (cost < minCost) {
          minCost = cost;
          chosenRoot = r;
        }
      }

      dp[i][j] = minCost;
      root[i][j] = chosenRoot;

      steps.push({
        stepIndex: steps.length,
        description: `Subtree length ${len} for keys [${keys[i]} .. ${keys[j]}]: Total freq sum = ${sum}. Tested roots; optimal root is '${keys[chosenRoot]}' with minimum search cost dp[${i}][${j}] = ${minCost}.`,
        activeLine: 15,
        phase: 'select',
        data: {
          n,
          keys: [...keys],
          freq: [...freq],
          dpTable: dp.map((r) => [...r]),
          rootTable: root.map((r) => [...r]),
          len,
          i,
          j,
          bestRoot: chosenRoot,
          minCost,
        },
        variables: { len, 'keys[i..j]': `${keys[i]}..${keys[j]}`, root: keys[chosenRoot], minCost, sum },
        metrics: { operations },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Optimal Binary Search Tree construction complete! Minimum expected search cost for all ${n} keys is dp[0][${n - 1}] = ${dp[0][n - 1]}. Tree Root is '${keys[root[0][n - 1]]}'.`,
    activeLine: 20,
    phase: 'done',
    data: {
      n,
      keys: [...keys],
      freq: [...freq],
      dpTable: dp.map((r) => [...r]),
      rootTable: root.map((r) => [...r]),
      len: n,
      i: 0,
      j: n - 1,
      bestRoot: root[0][n - 1],
      minCost: dp[0][n - 1],
    },
    variables: { minCost: dp[0][n - 1], rootKey: keys[root[0][n - 1]] },
    metrics: { operations },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
    },
  };
}
