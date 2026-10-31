import { AlgorithmTraceStep, ExecutionTrace } from '../types/algorithm';

export interface TraversalData {
  matrix: number[][];
  V: number;
  visited: boolean[];
  queueOrStack: number[];
  currentVertex: number | null;
  traversalOrder: number[];
  nodeNames: string[];
  isQueue: boolean;
}

export function traceBFS(matrix: number[][], start: number = 0, nodeNames?: string[]): ExecutionTrace<TraversalData> {
  const steps: AlgorithmTraceStep<TraversalData>[] = [];
  const V = matrix.length;
  const labels = nodeNames && nodeNames.length === V ? nodeNames : Array.from({ length: V }, (_, i) => `V${i}`);

  const visited: boolean[] = new Array(V).fill(false);
  const queue: number[] = [start];
  const order: number[] = [];
  let operations = 0;

  steps.push({
    stepIndex: 0,
    description: `BFS Initialization: Enqueued starting vertex ${labels[start]} into FIFO Queue. Visited array initialized to all false.`,
    activeLine: 6,
    phase: 'init',
    data: {
      matrix,
      V,
      visited: [...visited],
      queueOrStack: [...queue],
      currentVertex: null,
      traversalOrder: [],
      nodeNames: labels,
      isQueue: true,
    },
    variables: { start: labels[start], queueLength: queue.length },
    metrics: { operations: 1 },
  });

  while (queue.length > 0) {
    operations++;
    const current = queue.shift()!;

    if (!visited[current]) {
      visited[current] = true;
      order.push(current);

      steps.push({
        stepIndex: steps.length,
        description: `Dequeued vertex ${labels[current]} from front of Queue. Marked visited[${labels[current]}] = true. Appended to BFS traversal output.`,
        activeLine: 11,
        phase: 'visit',
        data: {
          matrix,
          V,
          visited: [...visited],
          queueOrStack: [...queue],
          currentVertex: current,
          traversalOrder: [...order],
          nodeNames: labels,
          isQueue: true,
        },
        variables: { current: labels[current], visited: true, order: order.map((o) => labels[o]).join(' -> ') },
        metrics: { operations },
      });

      // Enqueue unvisited neighbors
      for (let i = 0; i < V; i++) {
        if (matrix[current][i] === 1 && !visited[i]) {
          operations++;
          queue.push(i);
          steps.push({
            stepIndex: steps.length,
            description: `Edge (${labels[current]} -> ${labels[i]}) detected: Enqueued unvisited neighbor ${labels[i]} into FIFO Queue.`,
            activeLine: 14,
            phase: 'select',
            data: {
              matrix,
              V,
              visited: [...visited],
              queueOrStack: [...queue],
              currentVertex: current,
              traversalOrder: [...order],
              nodeNames: labels,
              isQueue: true,
            },
            variables: { neighbor: labels[i], queueNow: queue.map((q) => labels[q]).join(', ') },
            metrics: { operations },
          });
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Breadth-First Search complete! All connected vertices explored level-by-level. Final Traversal Order: [${order.map((o) => labels[o]).join(', ')}].`,
    activeLine: 17,
    phase: 'done',
    data: {
      matrix,
      V,
      visited: [...visited],
      queueOrStack: [],
      currentVertex: null,
      traversalOrder: [...order],
      nodeNames: labels,
      isQueue: true,
    },
    variables: { finalOrder: order.map((o) => labels[o]).join(' -> ') },
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

export function traceDFS(matrix: number[][], start: number = 0, nodeNames?: string[]): ExecutionTrace<TraversalData> {
  const steps: AlgorithmTraceStep<TraversalData>[] = [];
  const V = matrix.length;
  const labels = nodeNames && nodeNames.length === V ? nodeNames : Array.from({ length: V }, (_, i) => `V${i}`);

  const visited: boolean[] = new Array(V).fill(false);
  const stack: number[] = [start];
  const order: number[] = [];
  let operations = 0;

  steps.push({
    stepIndex: 0,
    description: `DFS Initialization: Pushed starting vertex ${labels[start]} onto LIFO Stack. Visited array initialized to all false.`,
    activeLine: 6,
    phase: 'init',
    data: {
      matrix,
      V,
      visited: [...visited],
      queueOrStack: [...stack],
      currentVertex: null,
      traversalOrder: [],
      nodeNames: labels,
      isQueue: false,
    },
    variables: { start: labels[start], stackDepth: stack.length },
    metrics: { operations: 1 },
  });

  while (stack.length > 0) {
    operations++;
    const current = stack.pop()!;

    if (!visited[current]) {
      visited[current] = true;
      order.push(current);

      steps.push({
        stepIndex: steps.length,
        description: `Popped vertex ${labels[current]} from top of Stack. Marked visited[${labels[current]}] = true. Added to DFS traversal output.`,
        activeLine: 11,
        phase: 'visit',
        data: {
          matrix,
          V,
          visited: [...visited],
          queueOrStack: [...stack],
          currentVertex: current,
          traversalOrder: [...order],
          nodeNames: labels,
          isQueue: false,
        },
        variables: { current: labels[current], visited: true, order: order.map((o) => labels[o]).join(' -> ') },
        metrics: { operations },
      });

      // Push unvisited neighbors
      for (let i = V - 1; i >= 0; i--) {
        if (matrix[current][i] === 1 && !visited[i]) {
          operations++;
          stack.push(i);
          steps.push({
            stepIndex: steps.length,
            description: `Edge (${labels[current]} -> ${labels[i]}): Pushed unvisited neighbor ${labels[i]} onto LIFO Stack.`,
            activeLine: 14,
            phase: 'select',
            data: {
              matrix,
              V,
              visited: [...visited],
              queueOrStack: [...stack],
              currentVertex: current,
              traversalOrder: [...order],
              nodeNames: labels,
              isQueue: false,
            },
            variables: { neighbor: labels[i], stackTop: labels[i] },
            metrics: { operations },
          });
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Depth-First Search complete! Final Traversal Order: [${order.map((o) => labels[o]).join(', ')}].`,
    activeLine: 17,
    phase: 'done',
    data: {
      matrix,
      V,
      visited: [...visited],
      queueOrStack: [],
      currentVertex: null,
      traversalOrder: [...order],
      nodeNames: labels,
      isQueue: false,
    },
    variables: { finalOrder: order.map((o) => labels[o]).join(' -> ') },
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

export interface HamiltonianData {
  matrix: number[][];
  V: number;
  path: number[];
  pos: number;
  candidateV: number | null;
  isCycleFound: boolean;
  cyclesList: number[][];
  nodeNames: string[];
}

export function traceHamiltonianCycle(matrix: number[][], start: number = 0, nodeNames?: string[]): ExecutionTrace<HamiltonianData> {
  const steps: AlgorithmTraceStep<HamiltonianData>[] = [];
  const V = matrix.length;
  const labels = nodeNames && nodeNames.length === V ? nodeNames : Array.from({ length: V }, (_, i) => `V${i}`);

  const path: number[] = new Array(V).fill(-1);
  path[0] = start;
  const foundCycles: number[][] = [];
  let operations = 0;
  let backtracks = 0;

  steps.push({
    stepIndex: 0,
    description: `Hamiltonian Cycle Initialization: Rooted path[0] = ${labels[start]}. Path array: [${path.map((p) => (p === -1 ? '-' : labels[p])).join(', ')}]. Beginning backtracking exploration at pos = 1.`,
    activeLine: 28,
    phase: 'init',
    data: {
      matrix,
      V,
      path: [...path],
      pos: 1,
      candidateV: null,
      isCycleFound: false,
      cyclesList: [],
      nodeNames: labels,
    },
    variables: { start: labels[start], pos: 1 },
    metrics: { operations: 1, backtracks: 0 },
  });

  function isSafe(v: number, pos: number): boolean {
    if (matrix[path[pos - 1]][v] === 0) return false;
    for (let i = 0; i < pos; i++) {
      if (path[i] === v) return false;
    }
    return true;
  }

  function solve(pos: number): boolean {
    operations++;
    if (pos === V) {
      // Check last -> first
      const closes = matrix[path[V - 1]][path[0]] === 1;
      if (closes) {
        foundCycles.push([...path]);
        steps.push({
          stepIndex: steps.length,
          description: `HAMILTONIAN CYCLE FOUND! All ${V} vertices visited, and return edge exists from ${labels[path[V - 1]]} back to start ${labels[path[0]]}. Cycle: [${path.map((p) => labels[p]).join(' -> ')} -> ${labels[path[0]]}].`,
          activeLine: 10,
          phase: 'found',
          data: {
            matrix,
            V,
            path: [...path],
            pos,
            candidateV: null,
            isCycleFound: true,
            cyclesList: JSON.parse(JSON.stringify(foundCycles)),
            nodeNames: labels,
          },
          variables: { cycle: path.map((p) => labels[p]).join(' -> ') },
          metrics: { operations, backtracks },
        });
        return true;
      } else {
        steps.push({
          stepIndex: steps.length,
          description: `All ${V} vertices visited, but no closing edge exists from ${labels[path[V - 1]]} back to ${labels[path[0]]}. Dead end: cycle closure check failed.`,
          activeLine: 11,
          phase: 'prune',
          data: {
            matrix,
            V,
            path: [...path],
            pos,
            candidateV: null,
            isCycleFound: false,
            cyclesList: JSON.parse(JSON.stringify(foundCycles)),
            nodeNames: labels,
          },
          variables: { lastVertex: labels[path[V - 1]], startVertex: labels[path[0]], edgeClosed: false },
          metrics: { operations, backtracks },
        });
        return false;
      }
    }

    for (let v = 0; v < V; v++) {
      operations++;
      const safe = isSafe(v, pos);

      steps.push({
        stepIndex: steps.length,
        description: `Inspecting candidate vertex ${labels[v]} for position pos=${pos}. isSafe check: ${safe ? 'VALID (edge exists and vertex unused)' : 'INVALID (no edge or already used)'}.`,
        activeLine: 16,
        phase: safe ? 'select' : 'compare',
        data: {
          matrix,
          V,
          path: [...path],
          pos,
          candidateV: v,
          isCycleFound: false,
          cyclesList: JSON.parse(JSON.stringify(foundCycles)),
          nodeNames: labels,
        },
        variables: { pos, candidate: labels[v], isSafe: safe },
        metrics: { operations, backtracks },
      });

      if (safe) {
        path[pos] = v;
        if (solve(pos + 1)) return true;

        // Backtrack
        backtracks++;
        path[pos] = -1;
        steps.push({
          stepIndex: steps.length,
          description: `Backtracking from pos=${pos}: Reset path[${pos}] = -1. Undoing assignment of ${labels[v]} to explore other branches.`,
          activeLine: 20,
          phase: 'backtrack',
          data: {
            matrix,
            V,
            path: [...path],
            pos,
            candidateV: v,
            isCycleFound: false,
            cyclesList: JSON.parse(JSON.stringify(foundCycles)),
            nodeNames: labels,
          },
          variables: { pos, backtrackedFrom: labels[v] },
          metrics: { operations, backtracks },
        });
      }
    }

    return false;
  }

  solve(1);

  steps.push({
    stepIndex: steps.length,
    description: `Hamiltonian search finished! ${foundCycles.length > 0 ? `Confirmed valid Hamiltonian cycle: [${foundCycles[0].map((p) => labels[p]).join(' -> ')} -> ${labels[foundCycles[0][0]]}].` : 'No Hamiltonian cycle exists for this configuration.'}`,
    activeLine: 21,
    phase: 'done',
    data: {
      matrix,
      V,
      path: [...path],
      pos: V,
      candidateV: null,
      isCycleFound: foundCycles.length > 0,
      cyclesList: foundCycles,
      nodeNames: labels,
    },
    variables: { status: foundCycles.length > 0 ? 'found' : 'none' },
    metrics: { operations, backtracks },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
      backtracks,
    },
  };
}

export interface GraphColoringData {
  matrix: number[][];
  V: number;
  m: number;
  color: number[];
  currentV: number | null;
  triedColor: number | null;
  colorSolutions: number[][];
  nodeNames: string[];
}

export function traceGraphColoring(matrix: number[][], mColors: number = 3, nodeNames?: string[]): ExecutionTrace<GraphColoringData> {
  const steps: AlgorithmTraceStep<GraphColoringData>[] = [];
  const V = matrix.length;
  const labels = nodeNames && nodeNames.length === V ? nodeNames : Array.from({ length: V }, (_, i) => `V${i}`);

  const color: number[] = new Array(V).fill(0);
  const colorSolutions: number[][] = [];
  let operations = 0;
  let backtracks = 0;

  steps.push({
    stepIndex: 0,
    description: `Graph Coloring Initialization: Graph with ${V} vertices and maximum m = ${mColors} colors. Initialized all vertex colors to 0 (uncolored).`,
    activeLine: 8,
    phase: 'init',
    data: {
      matrix,
      V,
      m: mColors,
      color: [...color],
      currentV: 0,
      triedColor: null,
      colorSolutions: [],
      nodeNames: labels,
    },
    variables: { vertices: V, maxColors: mColors },
    metrics: { operations: 1, backtracks: 0 },
  });

  function isSafe(v: number, c: number): boolean {
    for (let i = 0; i < V; i++) {
      if (matrix[v][i] === 1 && color[i] === c) return false;
    }
    return true;
  }

  function graphColor(v: number): boolean {
    operations++;
    if (v === V) {
      colorSolutions.push([...color]);
      steps.push({
        stepIndex: steps.length,
        description: `VALID COLORING CONFIGURED! All ${V} vertices colored with zero adjacent conflicts: [${color.map((c, i) => `${labels[i]}: Color ${c}`).join(', ')}].`,
        activeLine: 10,
        phase: 'found',
        data: {
          matrix,
          V,
          m: mColors,
          color: [...color],
          currentV: v,
          triedColor: null,
          colorSolutions: JSON.parse(JSON.stringify(colorSolutions)),
          nodeNames: labels,
        },
        variables: { validColoring: color.join(', ') },
        metrics: { operations, backtracks },
      });
      return true;
    }

    for (let c = 1; c <= mColors; c++) {
      operations++;
      const safe = isSafe(v, c);

      steps.push({
        stepIndex: steps.length,
        description: `Testing Color ${c} on vertex ${labels[v]}. isSafe check: ${safe ? 'NO ADJACENT CONFLICT' : 'CONFLICT! Adjacent vertex already has this color'}.`,
        activeLine: 13,
        phase: safe ? 'select' : 'compare',
        data: {
          matrix,
          V,
          m: mColors,
          color: [...color],
          currentV: v,
          triedColor: c,
          colorSolutions: JSON.parse(JSON.stringify(colorSolutions)),
          nodeNames: labels,
        },
        variables: { vertex: labels[v], color: c, isSafe: safe },
        metrics: { operations, backtracks },
      });

      if (safe) {
        color[v] = c;
        if (graphColor(v + 1)) return true;

        // Backtrack
        backtracks++;
        color[v] = 0;
        steps.push({
          stepIndex: steps.length,
          description: `Backtracking on vertex ${labels[v]}: Reset color[${labels[v]}] = 0. Attempting next color in palette.`,
          activeLine: 16,
          phase: 'backtrack',
          data: {
            matrix,
            V,
            m: mColors,
            color: [...color],
            currentV: v,
            triedColor: c,
            colorSolutions: JSON.parse(JSON.stringify(colorSolutions)),
            nodeNames: labels,
          },
          variables: { vertex: labels[v], resetColor: 0 },
          metrics: { operations, backtracks },
        });
      }
    }

    return false;
  }

  graphColor(0);

  steps.push({
    stepIndex: steps.length,
    description: `Graph coloring complete! ${colorSolutions.length > 0 ? `Successfully colored graph using ${mColors} colors.` : `Could not color graph with ${mColors} colors.`}`,
    activeLine: 17,
    phase: 'done',
    data: {
      matrix,
      V,
      m: mColors,
      color: [...color],
      currentV: null,
      triedColor: null,
      colorSolutions,
      nodeNames: labels,
    },
    variables: { success: colorSolutions.length > 0 },
    metrics: { operations, backtracks },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
      backtracks,
    },
  };
}

export interface NQueensData {
  n: number;
  board: number[][]; // n x n matrix of 0/1
  currentRow: number;
  currentCol: number | null;
  conflictLocation?: [number, number];
  solutionCount: number;
  isSolved: boolean;
}

export function traceNQueens(n: number = 4): ExecutionTrace<NQueensData> {
  const steps: AlgorithmTraceStep<NQueensData>[] = [];
  const board: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  let operations = 0;
  let backtracks = 0;
  let solutionCount = 0;

  steps.push({
    stepIndex: 0,
    description: `N-Queens Initialization: Created empty ${n}x${n} chessboard. Objective: Place ${n} non-attacking queens (no two share same row, column, or diagonal).`,
    activeLine: 3,
    phase: 'init',
    data: {
      n,
      board: board.map((r) => [...r]),
      currentRow: 0,
      currentCol: null,
      solutionCount: 0,
      isSolved: false,
    },
    variables: { n, currentRow: 0 },
    metrics: { operations: 1, backtracks: 0 },
  });

  function isSafe(row: number, col: number): { safe: boolean; conflict?: [number, number] } {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return { safe: false, conflict: [i, col] };
    }
    // Check left upper diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return { safe: false, conflict: [i, j] };
    }
    // Check right upper diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return { safe: false, conflict: [i, j] };
    }
    return { safe: true };
  }

  function solve(row: number): boolean {
    operations++;
    if (row === n) {
      solutionCount++;
      steps.push({
        stepIndex: steps.length,
        description: `N-QUEENS SOLUTION FOUND! Successfully placed all ${n} queens without conflicts. Solution #${solutionCount}.`,
        activeLine: 11,
        phase: 'found',
        data: {
          n,
          board: board.map((r) => [...r]),
          currentRow: row,
          currentCol: null,
          solutionCount,
          isSolved: true,
        },
        variables: { row, solution: solutionCount },
        metrics: { operations, backtracks },
      });
      return true;
    }

    for (let col = 0; col < n; col++) {
      operations++;
      const check = isSafe(row, col);

      steps.push({
        stepIndex: steps.length,
        description: `Inspecting Row ${row}, Col ${col}. isSafe check: ${check.safe ? 'SAFE: No column or diagonal threats.' : `ATTACK THREAT: Threatened by queen at [${check.conflict![0]}, ${check.conflict![1]}].`}`,
        activeLine: check.safe ? 14 : 3,
        phase: check.safe ? 'select' : 'compare',
        data: {
          n,
          board: board.map((r) => [...r]),
          currentRow: row,
          currentCol: col,
          conflictLocation: check.conflict,
          solutionCount,
          isSolved: false,
        },
        variables: { row, col, isSafe: check.safe },
        metrics: { operations, backtracks },
      });

      if (check.safe) {
        board[row][col] = 1;
        steps.push({
          stepIndex: steps.length,
          description: `Placed Queen at board[${row}][${col}] = 1. Advancing to Row ${row + 1}.`,
          activeLine: 14,
          phase: 'select',
          data: {
            n,
            board: board.map((r) => [...r]),
            currentRow: row,
            currentCol: col,
            solutionCount,
            isSolved: false,
          },
          variables: { row, col, queenPlaced: true },
          metrics: { operations, backtracks },
        });

        if (solve(row + 1)) return true;

        // Backtrack
        backtracks++;
        board[row][col] = 0;
        steps.push({
          stepIndex: steps.length,
          description: `Backtracking from Row ${row + 1}: Removed Queen from board[${row}][${col}] = 0. Testing next column in row.`,
          activeLine: 17,
          phase: 'backtrack',
          data: {
            n,
            board: board.map((r) => [...r]),
            currentRow: row,
            currentCol: col,
            solutionCount,
            isSolved: false,
          },
          variables: { row, col, queenRemoved: true },
          metrics: { operations, backtracks },
        });
      }
    }

    return false;
  }

  solve(0);

  steps.push({
    stepIndex: steps.length,
    description: `N-Queens solver finished! ${solutionCount > 0 ? `Solution verified for ${n}x${n} board.` : 'No solution.'}`,
    activeLine: 19,
    phase: 'done',
    data: {
      n,
      board: board.map((r) => [...r]),
      currentRow: n,
      currentCol: null,
      solutionCount,
      isSolved: solutionCount > 0,
    },
    variables: { completed: true, totalQueens: n },
    metrics: { operations, backtracks },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
      backtracks,
    },
  };
}

export interface SumOfSubsetsData {
  arr: number[];
  target: number;
  index: number;
  currentSum: number;
  currentSubset: number[];
  foundSubsets: number[][];
  branchType: 'include' | 'exclude' | 'prune' | 'match';
}

export function traceSumOfSubsets(arr: number[], target: number): ExecutionTrace<SumOfSubsetsData> {
  const steps: AlgorithmTraceStep<SumOfSubsetsData>[] = [];
  const foundSubsets: number[][] = [];
  const subset: number[] = [];
  let operations = 0;
  let backtracks = 0;

  steps.push({
    stepIndex: 0,
    description: `Sum of Subsets Initialization: Given array [${arr.join(', ')}] and target sum = ${target}. Root of state-space tree: current sum = 0, subset = [].`,
    activeLine: 2,
    phase: 'init',
    data: {
      arr: [...arr],
      target,
      index: 0,
      currentSum: 0,
      currentSubset: [],
      foundSubsets: [],
      branchType: 'include',
    },
    variables: { target, arrayLength: arr.length, sum: 0 },
    metrics: { operations: 1, backtracks: 0 },
  });

  function sumsubsets(index: number, currentSum: number) {
    operations++;
    if (currentSum === target) {
      foundSubsets.push([...subset]);
      steps.push({
        stepIndex: steps.length,
        description: `TARGET SUM ACHIEVED! Current subset [${subset.join(', ')}] sums exactly to target ${target}. Recorded solution.`,
        activeLine: 3,
        phase: 'found',
        data: {
          arr: [...arr],
          target,
          index,
          currentSum,
          currentSubset: [...subset],
          foundSubsets: JSON.parse(JSON.stringify(foundSubsets)),
          branchType: 'match',
        },
        variables: { currentSum, target, matchedSubset: subset.join(', ') },
        metrics: { operations, backtracks },
      });
      return;
    }

    if (index === arr.length || currentSum > target) {
      steps.push({
        stepIndex: steps.length,
        description: currentSum > target
          ? `Pruning branch: Current sum (${currentSum}) exceeds target (${target}). Bounding function prunes this entire subtree.`
          : `Array exhausted (index = ${index}): Elements completed without matching target.`,
        activeLine: 7,
        phase: 'prune',
        data: {
          arr: [...arr],
          target,
          index,
          currentSum,
          currentSubset: [...subset],
          foundSubsets: JSON.parse(JSON.stringify(foundSubsets)),
          branchType: 'prune',
        },
        variables: { index, currentSum, target, pruned: true },
        metrics: { operations, backtracks },
      });
      return;
    }

    // Branch 1: Include arr[index]
    subset.push(arr[index]);
    steps.push({
      stepIndex: steps.length,
      description: `Including arr[${index}] = ${arr[index]} into subset. New subset: [${subset.join(', ')}]. New sum = ${currentSum + arr[index]}.`,
      activeLine: 10,
      phase: 'select',
      data: {
        arr: [...arr],
        target,
        index,
        currentSum: currentSum + arr[index],
        currentSubset: [...subset],
        foundSubsets: JSON.parse(JSON.stringify(foundSubsets)),
        branchType: 'include',
      },
      variables: { includedElement: arr[index], sum: currentSum + arr[index] },
      metrics: { operations, backtracks },
    });

    sumsubsets(index + 1, currentSum + arr[index]);

    // Backtrack: Remove arr[index]
    backtracks++;
    subset.pop();
    steps.push({
      stepIndex: steps.length,
      description: `Backtracking: Removed arr[${index}] = ${arr[index]} from subset. Now exploring alternative branch EXCLUDING ${arr[index]} (sum remains ${currentSum}).`,
      activeLine: 12,
      phase: 'backtrack',
      data: {
        arr: [...arr],
        target,
        index,
        currentSum,
        currentSubset: [...subset],
        foundSubsets: JSON.parse(JSON.stringify(foundSubsets)),
        branchType: 'exclude',
      },
      variables: { excludedElement: arr[index], restoredSum: currentSum },
      metrics: { operations, backtracks },
    });

    sumsubsets(index + 1, currentSum);
  }

  sumsubsets(0, 0);

  steps.push({
    stepIndex: steps.length,
    description: `Sum of Subsets complete! Total matching subsets found: ${foundSubsets.length}. Solutions: ${foundSubsets.map((s) => `[${s.join(', ')}]`).join(', ')}.`,
    activeLine: 14,
    phase: 'done',
    data: {
      arr: [...arr],
      target,
      index: arr.length,
      currentSum: 0,
      currentSubset: [],
      foundSubsets,
      branchType: 'match',
    },
    variables: { totalSolutions: foundSubsets.length },
    metrics: { operations, backtracks },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: operations,
      swaps: 0,
      operations,
      backtracks,
    },
  };
}
