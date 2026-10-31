import { AlgorithmTraceStep, ExecutionTrace } from '../types/algorithm';

export interface LinearSearchData {
  arr: number[];
  key: number;
  currentIndex: number | null;
  foundIndex: number | null;
  isNotFound: boolean;
}

export function traceLinearSearch(arr: number[], key: number): ExecutionTrace<LinearSearchData> {
  const steps: AlgorithmTraceStep<LinearSearchData>[] = [];
  let comparisons = 0;

  // Step 0: Init
  steps.push({
    stepIndex: 0,
    description: `Read array of size ${arr.length} and target key ${key}. Initialized pos = -1.`,
    activeLine: 9,
    phase: 'init',
    data: {
      arr: [...arr],
      key,
      currentIndex: null,
      foundIndex: null,
      isNotFound: false,
    },
    variables: { n: arr.length, key, pos: -1, i: 'not started' },
    metrics: { comparisons: 0, operations: 1 },
  });

  let found = false;
  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    const isMatch = arr[i] === key;

    steps.push({
      stepIndex: steps.length,
      description: `Comparing arr[${i}] = ${arr[i]} with target key ${key}. ${isMatch ? 'Match found!' : 'No match, continue traverse.'}`,
      activeLine: 11,
      phase: isMatch ? 'found' : 'compare',
      data: {
        arr: [...arr],
        key,
        currentIndex: i,
        foundIndex: isMatch ? i : null,
        isNotFound: false,
      },
      variables: { n: arr.length, key, pos: isMatch ? i : -1, i, 'arr[i]': arr[i] },
      metrics: { comparisons, operations: comparisons + 1 },
    });

    if (isMatch) {
      found = true;
      steps.push({
        stepIndex: steps.length,
        description: `Element found at index ${i}. Recorded pos = ${i} and break search loop.`,
        activeLine: 12,
        phase: 'done',
        data: {
          arr: [...arr],
          key,
          currentIndex: i,
          foundIndex: i,
          isNotFound: false,
        },
        variables: { n: arr.length, key, pos: i, i },
        metrics: { comparisons, operations: comparisons + 2 },
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      stepIndex: steps.length,
      description: `Traversed entire array of ${arr.length} elements without finding key ${key}. Display "Element not found".`,
      activeLine: 16,
      phase: 'done',
      data: {
        arr: [...arr],
        key,
        currentIndex: null,
        foundIndex: null,
        isNotFound: true,
      },
      variables: { n: arr.length, key, pos: -1 },
      metrics: { comparisons, operations: comparisons + 2 },
    });
  }

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons,
      swaps: 0,
      operations: steps.length,
    },
  };
}

export interface MinMaxData {
  arr: number[];
  currentIndex: number | null;
  min: number;
  max: number;
  minUpdated: boolean;
  maxUpdated: boolean;
}

export function traceMinMax(arr: number[]): ExecutionTrace<MinMaxData> {
  const steps: AlgorithmTraceStep<MinMaxData>[] = [];
  if (arr.length === 0) return { steps: [], totalSteps: 0, finalMetrics: { comparisons: 0, swaps: 0, operations: 0 } };

  let min = arr[0];
  let max = arr[0];
  let comparisons = 0;

  steps.push({
    stepIndex: 0,
    description: `Initialized min = arr[0] (${min}) and max = arr[0] (${max}). Preparing single traversal from index 1 to ${arr.length - 1}.`,
    activeLine: 8,
    phase: 'init',
    data: {
      arr: [...arr],
      currentIndex: 0,
      min,
      max,
      minUpdated: false,
      maxUpdated: false,
    },
    variables: { n: arr.length, min, max, i: 0 },
    metrics: { comparisons: 0, operations: 1 },
  });

  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];
    let minUp = false;
    let maxUp = false;

    // Check min
    comparisons++;
    if (val < min) {
      min = val;
      minUp = true;
    }

    // Check max
    comparisons++;
    if (val > max) {
      max = val;
      maxUp = true;
    }

    steps.push({
      stepIndex: steps.length,
      description: `Examined arr[${i}] = ${val}. Evaluated arr[${i}] < min (${minUp ? 'NEW MIN' : 'no change'}) and arr[${i}] > max (${maxUp ? 'NEW MAX' : 'no change'}).`,
      activeLine: 10,
      phase: minUp || maxUp ? 'select' : 'compare',
      data: {
        arr: [...arr],
        currentIndex: i,
        min,
        max,
        minUpdated: minUp,
        maxUpdated: maxUp,
      },
      variables: { n: arr.length, min, max, i, 'arr[i]': val },
      metrics: { comparisons, operations: comparisons + 1 },
    });
  }

  steps.push({
    stepIndex: steps.length,
    description: `Single pass complete in Θ(n) time. Final results: Minimum = ${min}, Maximum = ${max}.`,
    activeLine: 16,
    phase: 'done',
    data: {
      arr: [...arr],
      currentIndex: null,
      min,
      max,
      minUpdated: false,
      maxUpdated: false,
    },
    variables: { min, max, totalElements: arr.length },
    metrics: { comparisons, operations: comparisons + 2 },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons,
      swaps: 0,
      operations: steps.length,
    },
  };
}

export interface CheckSortedData {
  arr: number[];
  currentIndex: number | null;
  isSorted: boolean;
  failedPair: [number, number] | null;
}

export function traceCheckSorted(arr: number[]): ExecutionTrace<CheckSortedData> {
  const steps: AlgorithmTraceStep<CheckSortedData>[] = [];
  let comparisons = 0;
  let sorted = true;

  steps.push({
    stepIndex: 0,
    description: `Read array of ${arr.length} elements. Initialized sorted = true. Beginning adjacent pair comparison loop.`,
    activeLine: 8,
    phase: 'init',
    data: {
      arr: [...arr],
      currentIndex: null,
      isSorted: true,
      failedPair: null,
    },
    variables: { n: arr.length, sorted: true, i: 'start' },
    metrics: { comparisons: 0, operations: 1 },
  });

  for (let i = 0; i < arr.length - 1; i++) {
    comparisons++;
    const a = arr[i];
    const b = arr[i + 1];

    if (a > b) {
      sorted = false;
      steps.push({
        stepIndex: steps.length,
        description: `Comparison arr[${i}] (${a}) > arr[${i + 1}] (${b}) is TRUE! Inversion detected. Set sorted = false and break early.`,
        activeLine: 11,
        phase: 'prune',
        data: {
          arr: [...arr],
          currentIndex: i,
          isSorted: false,
          failedPair: [i, i + 1],
        },
        variables: { i, 'arr[i]': a, 'arr[i+1]': b, sorted: false },
        metrics: { comparisons, operations: comparisons + 1 },
      });
      break;
    } else {
      steps.push({
        stepIndex: steps.length,
        description: `Comparison arr[${i}] (${a}) <= arr[${i + 1}] (${b}) holds true. Monotonic ordering maintained.`,
        activeLine: 9,
        phase: 'compare',
        data: {
          arr: [...arr],
          currentIndex: i,
          isSorted: true,
          failedPair: null,
        },
        variables: { i, 'arr[i]': a, 'arr[i+1]': b, sorted: true },
        metrics: { comparisons, operations: comparisons + 1 },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: sorted
      ? `Verification concluded: All adjacent pairs valid. Output: "Array is Sorted". (Time: O(n))`
      : `Verification aborted: Output: "Array is Not Sorted". ${comparisons === 1 ? 'Best-case O(1) triggered on first check!' : 'Early break.'}`,
    activeLine: 15,
    phase: 'done',
    data: {
      arr: [...arr],
      currentIndex: null,
      isSorted: sorted,
      failedPair: sorted ? null : steps[steps.length - 1]?.data.failedPair ?? null,
    },
    variables: { sorted, totalComparisons: comparisons },
    metrics: { comparisons, operations: comparisons + 2 },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons,
      swaps: 0,
      operations: steps.length,
    },
  };
}

export interface PowerRecursionFrame {
  callId: number;
  x: number;
  n: number;
  state: 'called' | 'evaluating' | 'returned';
  returnedValue?: number;
}

export interface PowerRecursionData {
  x: number;
  n: number;
  callStack: PowerRecursionFrame[];
  activeCallId: number;
  finalResult: number | null;
}

export function tracePowerRecursion(x: number, n: number): ExecutionTrace<PowerRecursionData> {
  const steps: AlgorithmTraceStep<PowerRecursionData>[] = [];
  const frames: PowerRecursionFrame[] = [];
  let callCounter = 0;
  let operations = 0;

  // Step 0: User invocation
  steps.push({
    stepIndex: 0,
    description: `Main invoked power(x=${x}, n=${n}). Recurrence relation: T(n) = T(n-1) + 1 with T(0) = 1.`,
    activeLine: 11,
    phase: 'init',
    data: {
      x,
      n,
      callStack: [],
      activeCallId: 0,
      finalResult: null,
    },
    variables: { x, n, stackDepth: 0 },
    metrics: { recursionDepth: 0, operations: 1 },
  });

  function simulatePower(currX: number, currN: number): number {
    const frameId = ++callCounter;
    operations++;

    const newFrame: PowerRecursionFrame = {
      callId: frameId,
      x: currX,
      n: currN,
      state: 'called',
    };
    frames.push(newFrame);

    steps.push({
      stepIndex: steps.length,
      description: `Pushed activation frame power(${currX}, ${currN}) onto call stack. Stack depth = ${frames.length}.`,
      activeLine: 3,
      phase: 'visit',
      data: {
        x,
        n,
        callStack: JSON.parse(JSON.stringify(frames)),
        activeCallId: frameId,
        finalResult: null,
      },
      variables: { x: currX, n: currN, stackDepth: frames.length },
      metrics: { recursionDepth: frames.length, operations },
    });

    if (currN === 0) {
      operations++;
      newFrame.state = 'returned';
      newFrame.returnedValue = 1;

      steps.push({
        stepIndex: steps.length,
        description: `Base case reached! n == 0 is TRUE. Returning 1 from frame power(${currX}, 0).`,
        activeLine: 4,
        phase: 'select',
        data: {
          x,
          n,
          callStack: JSON.parse(JSON.stringify(frames)),
          activeCallId: frameId,
          finalResult: null,
        },
        variables: { n: 0, 'return value': 1 },
        metrics: { recursionDepth: frames.length, operations },
      });

      return 1;
    }

    const subResult = simulatePower(currX, currN - 1);
    const result = currX * subResult;
    operations++;

    const frameInStack = frames.find((f) => f.callId === frameId);
    if (frameInStack) {
      frameInStack.state = 'returned';
      frameInStack.returnedValue = result;
    }

    steps.push({
      stepIndex: steps.length,
      description: `Frame power(${currX}, ${currN}) computed ${currX} * power(${currX}, ${currN - 1}) = ${currX} * ${subResult} = ${result}. Popping frame.`,
      activeLine: 6,
      phase: 'backtrack',
      data: {
        x,
        n,
        callStack: JSON.parse(JSON.stringify(frames)),
        activeCallId: frameId,
        finalResult: currN === n ? result : null,
      },
      variables: { currX, currN, subResult, result },
      metrics: { recursionDepth: frames.length, operations },
    });

    frames.pop();
    return result;
  }

  const finalVal = simulatePower(x, n);

  steps.push({
    stepIndex: steps.length,
    description: `Recursion unwind complete! Final output: ${x}^${n} = ${finalVal}. Maximum stack depth was ${n + 1} frames (O(n) auxiliary space).`,
    activeLine: 11,
    phase: 'done',
    data: {
      x,
      n,
      callStack: [],
      activeCallId: 0,
      finalResult: finalVal,
    },
    variables: { result: finalVal, totalFrames: n + 1 },
    metrics: { recursionDepth: 0, operations },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons: 0,
      swaps: 0,
      operations,
      recursionDepth: n + 1,
    },
  };
}
