import { AlgorithmTraceStep, ExecutionTrace } from '../types/algorithm';

export interface BinarySearchData {
  arr: number[];
  key: number;
  low: number;
  high: number;
  mid: number | null;
  foundIndex: number | null;
  isNotFound: boolean;
}

export function traceBinarySearch(arr: number[], key: number): ExecutionTrace<BinarySearchData> {
  const steps: AlgorithmTraceStep<BinarySearchData>[] = [];
  let comparisons = 0;
  let low = 0;
  let high = arr.length - 1;
  let found = false;

  steps.push({
    stepIndex: 0,
    description: `Initialized search window [low = 0, high = ${high}]. Searching for target key ${key} in sorted array of ${arr.length} elements.`,
    activeLine: 9,
    phase: 'init',
    data: {
      arr: [...arr],
      key,
      low,
      high,
      mid: null,
      foundIndex: null,
      isNotFound: false,
    },
    variables: { low, high, key, n: arr.length },
    metrics: { comparisons: 0, operations: 1 },
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    const midVal = arr[mid];

    steps.push({
      stepIndex: steps.length,
      description: `Divide step: Computed midpoint mid = (${low} + ${high}) / 2 = ${mid}. Inspecting arr[${mid}] = ${midVal}.`,
      activeLine: 11,
      phase: 'compare',
      data: {
        arr: [...arr],
        key,
        low,
        high,
        mid,
        foundIndex: null,
        isNotFound: false,
      },
      variables: { low, high, mid, 'arr[mid]': midVal, key },
      metrics: { comparisons, operations: comparisons + 1 },
    });

    if (midVal === key) {
      found = true;
      steps.push({
        stepIndex: steps.length,
        description: `Conquer: Match confirmed! arr[${mid}] == ${key}. Output: "Element found at index ${mid}".`,
        activeLine: 13,
        phase: 'found',
        data: {
          arr: [...arr],
          key,
          low,
          high,
          mid,
          foundIndex: mid,
          isNotFound: false,
        },
        variables: { mid, key, status: 'found' },
        metrics: { comparisons, operations: comparisons + 2 },
      });
      break;
    } else if (key < midVal) {
      steps.push({
        stepIndex: steps.length,
        description: `Key ${key} < arr[mid] ${midVal}. Discarding right half. Subproblem narrowed to left half: set high = mid - 1 (${mid - 1}).`,
        activeLine: 18,
        phase: 'select',
        data: {
          arr: [...arr],
          key,
          low,
          high: mid - 1,
          mid,
          foundIndex: null,
          isNotFound: false,
        },
        variables: { low, oldHigh: high, newHigh: mid - 1, mid },
        metrics: { comparisons, operations: comparisons + 2 },
      });
      high = mid - 1;
    } else {
      steps.push({
        stepIndex: steps.length,
        description: `Key ${key} > arr[mid] ${midVal}. Discarding left half. Subproblem narrowed to right half: set low = mid + 1 (${mid + 1}).`,
        activeLine: 20,
        phase: 'select',
        data: {
          arr: [...arr],
          key,
          low: mid + 1,
          high,
          mid,
          foundIndex: null,
          isNotFound: false,
        },
        variables: { oldLow: low, newLow: mid + 1, high, mid },
        metrics: { comparisons, operations: comparisons + 2 },
      });
      low = mid + 1;
    }
  }

  if (!found) {
    steps.push({
      stepIndex: steps.length,
      description: `Search interval exhausted (low > high). Target key ${key} is absent from array. Output: "Element not found".`,
      activeLine: 23,
      phase: 'done',
      data: {
        arr: [...arr],
        key,
        low,
        high,
        mid: null,
        foundIndex: null,
        isNotFound: true,
      },
      variables: { low, high, key, result: 'not found' },
      metrics: { comparisons, operations: comparisons + 3 },
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

export interface MergeSortData {
  arr: number[];
  left: number;
  right: number;
  mid?: number;
  mergeBuffer?: number[];
  phaseDesc: string;
  activeSubarray?: [number, number];
}

export function traceMergeSort(initialArr: number[]): ExecutionTrace<MergeSortData> {
  const steps: AlgorithmTraceStep<MergeSortData>[] = [];
  const arr = [...initialArr];
  let comparisons = 0;
  let operations = 0;

  steps.push({
    stepIndex: 0,
    description: `Starting Merge Sort on array of ${arr.length} elements. Invoking divide(arr, 0, ${arr.length - 1}).`,
    activeLine: 21,
    phase: 'init',
    data: {
      arr: [...arr],
      left: 0,
      right: arr.length - 1,
      phaseDesc: 'Initial unsorted array',
      activeSubarray: [0, arr.length - 1],
    },
    variables: { left: 0, right: arr.length - 1, n: arr.length },
    metrics: { comparisons: 0, operations: 1 },
  });

  function divide(left: number, right: number) {
    operations++;
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      stepIndex: steps.length,
      description: `Divide step: Subarray [${left} .. ${right}] split at mid = ${mid} into [${left} .. ${mid}] and [${mid + 1} .. ${right}].`,
      activeLine: 24,
      phase: 'select',
      data: {
        arr: [...arr],
        left,
        right,
        mid,
        phaseDesc: `Splitting subarray [${left}..${right}]`,
        activeSubarray: [left, right],
      },
      variables: { left, right, mid },
      metrics: { comparisons, operations },
    });

    divide(left, mid);
    divide(mid + 1, right);
    conquer(left, mid, right);
  }

  function conquer(left: number, mid: number, right: number) {
    const merge: number[] = [];
    let a = left;
    let b = mid + 1;

    steps.push({
      stepIndex: steps.length,
      description: `Conquer step: Merging sorted halves [${left}..${mid}] and [${mid + 1}..${right}] into temporary buffer.`,
      activeLine: 2,
      phase: 'visit',
      data: {
        arr: [...arr],
        left,
        right,
        mid,
        mergeBuffer: [],
        phaseDesc: `Starting merge of [${left}..${mid}] and [${mid + 1}..${right}]`,
        activeSubarray: [left, right],
      },
      variables: { left, mid, right, a, b },
      metrics: { comparisons, operations },
    });

    while (a <= mid && b <= right) {
      comparisons++;
      operations++;
      if (arr[a] <= arr[b]) {
        merge.push(arr[a]);
        steps.push({
          stepIndex: steps.length,
          description: `arr[${a}] (${arr[a]}) <= arr[${b}] (${arr[b]}): Appended ${arr[a]} from left half into merge buffer.`,
          activeLine: 8,
          phase: 'compare',
          data: {
            arr: [...arr],
            left,
            right,
            mid,
            mergeBuffer: [...merge],
            phaseDesc: `Buffering smaller element ${arr[a]}`,
            activeSubarray: [left, right],
          },
          variables: { 'arr[a]': arr[a], 'arr[b]': arr[b], bufferSize: merge.length },
          metrics: { comparisons, operations },
        });
        a++;
      } else {
        merge.push(arr[b]);
        steps.push({
          stepIndex: steps.length,
          description: `arr[${b}] (${arr[b]}) < arr[${a}] (${arr[a]}): Appended ${arr[b]} from right half into merge buffer.`,
          activeLine: 10,
          phase: 'compare',
          data: {
            arr: [...arr],
            left,
            right,
            mid,
            mergeBuffer: [...merge],
            phaseDesc: `Buffering smaller element ${arr[b]}`,
            activeSubarray: [left, right],
          },
          variables: { 'arr[a]': arr[a], 'arr[b]': arr[b], bufferSize: merge.length },
          metrics: { comparisons, operations },
        });
        b++;
      }
    }

    while (a <= mid) {
      merge.push(arr[a]);
      operations++;
      a++;
    }
    while (b <= right) {
      merge.push(arr[b]);
      operations++;
      b++;
    }

    // Copy back
    for (let i = 0; i < merge.length; i++) {
      arr[left + i] = merge[i];
    }

    steps.push({
      stepIndex: steps.length,
      description: `Copied merged buffer back to arr[${left} .. ${right}]: [${merge.join(', ')}]. Subarray is now fully sorted.`,
      activeLine: 18,
      phase: 'swap',
      data: {
        arr: [...arr],
        left,
        right,
        mid,
        mergeBuffer: [...merge],
        phaseDesc: `Merged subarray [${left}..${right}] finalized`,
        activeSubarray: [left, right],
      },
      variables: { left, right, mergedRange: `arr[${left}..${right}]` },
      metrics: { comparisons, operations },
    });
  }

  divide(0, arr.length - 1);

  steps.push({
    stepIndex: steps.length,
    description: `Merge Sort complete! Array sorted in Θ(n log n) time across all levels. Result: [${arr.join(', ')}].`,
    activeLine: 26,
    phase: 'done',
    data: {
      arr: [...arr],
      left: 0,
      right: arr.length - 1,
      phaseDesc: 'Final sorted array',
      activeSubarray: [0, arr.length - 1],
    },
    variables: { totalElements: arr.length, totalComparisons: comparisons },
    metrics: { comparisons, operations },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons,
      swaps: operations,
      operations: steps.length,
    },
  };
}

export interface QuickSortData {
  arr: number[];
  lb: number;
  ub: number;
  pivotIndex: number | null;
  pivotValue: number | null;
  start: number | null;
  end: number | null;
  swappedPair?: [number, number];
  pivotFinalIndex?: number;
  statusText: string;
}

export function traceQuickSort(initialArr: number[]): ExecutionTrace<QuickSortData> {
  const steps: AlgorithmTraceStep<QuickSortData>[] = [];
  const arr = [...initialArr];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    description: `Starting Quick Sort on array of ${arr.length} elements. Invoking quicksort(arr, lb=0, ub=${arr.length - 1}).`,
    activeLine: 2,
    phase: 'init',
    data: {
      arr: [...arr],
      lb: 0,
      ub: arr.length - 1,
      pivotIndex: null,
      pivotValue: null,
      start: null,
      end: null,
      statusText: 'Initial array state',
    },
    variables: { lb: 0, ub: arr.length - 1 },
    metrics: { comparisons: 0, swaps: 0, operations: 1 },
  });

  function quicksort(lb: number, ub: number) {
    if (lb < ub) {
      const loc = partition(lb, ub);
      quicksort(lb, loc - 1);
      quicksort(loc + 1, ub);
    }
  }

  function partition(lb: number, ub: number): number {
    const pivot = arr[lb];
    let start = lb;
    let end = ub;

    steps.push({
      stepIndex: steps.length,
      description: `Partitioning subarray [${lb} .. ${ub}]. Selected first element arr[${lb}] = ${pivot} as pivot. Setting start = ${start}, end = ${end}.`,
      activeLine: 9,
      phase: 'select',
      data: {
        arr: [...arr],
        lb,
        ub,
        pivotIndex: lb,
        pivotValue: pivot,
        start,
        end,
        statusText: `Pivot selected: ${pivot}`,
      },
      variables: { lb, ub, pivot, start, end },
      metrics: { comparisons, swaps, operations: steps.length },
    });

    while (start < end) {
      while (start < ub && arr[start] <= pivot) {
        comparisons++;
        start++;
      }
      while (end > lb && arr[end] > pivot) {
        comparisons++;
        end--;
      }

      steps.push({
        stepIndex: steps.length,
        description: `Pointer scans stopped: start = ${start} (arr[start]=${arr[start]}), end = ${end} (arr[end]=${arr[end]}). ${start < end ? 'start < end: will swap arr[start] and arr[end].' : 'Pointers crossed.'}`,
        activeLine: 16,
        phase: 'compare',
        data: {
          arr: [...arr],
          lb,
          ub,
          pivotIndex: lb,
          pivotValue: pivot,
          start,
          end,
          statusText: start < end ? `Found out-of-order elements at ${start} and ${end}` : 'Pointers crossed',
        },
        variables: { start, end, pivot, 'arr[start]': arr[start], 'arr[end]': arr[end] },
        metrics: { comparisons, swaps, operations: steps.length },
      });

      if (start < end) {
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        swaps++;

        steps.push({
          stepIndex: steps.length,
          description: `Swapped arr[${start}] (${arr[start]}) and arr[${end}] (${arr[end]}) so smaller elements move left and larger right.`,
          activeLine: 18,
          phase: 'swap',
          data: {
            arr: [...arr],
            lb,
            ub,
            pivotIndex: lb,
            pivotValue: pivot,
            start,
            end,
            swappedPair: [start, end],
            statusText: `Swapped indices ${start} and ${end}`,
          },
          variables: { start, end, swapped: `${arr[start]} <-> ${arr[end]}` },
          metrics: { comparisons, swaps, operations: steps.length },
        });
      }
    }

    // Place pivot
    const temp = arr[lb];
    arr[lb] = arr[end];
    arr[end] = temp;
    swaps++;

    steps.push({
      stepIndex: steps.length,
      description: `Pointers crossed! Swapped pivot arr[${lb}] (${temp}) with arr[${end}] (${arr[lb]}). Pivot ${pivot} is now at its final sorted index ${end}.`,
      activeLine: 23,
      phase: 'found',
      data: {
        arr: [...arr],
        lb,
        ub,
        pivotIndex: end,
        pivotValue: pivot,
        start,
        end,
        pivotFinalIndex: end,
        statusText: `Pivot ${pivot} finalized at index ${end}`,
      },
      variables: { pivot, finalIndex: end, leftSubarray: `[${lb}..${end - 1}]`, rightSubarray: `[${end + 1}..${ub}]` },
      metrics: { comparisons, swaps, operations: steps.length },
    });

    return end;
  }

  quicksort(0, arr.length - 1);

  steps.push({
    stepIndex: steps.length,
    description: `Quick Sort complete! Entire array sorted in-place: [${arr.join(', ')}].`,
    activeLine: 26,
    phase: 'done',
    data: {
      arr: [...arr],
      lb: 0,
      ub: arr.length - 1,
      pivotIndex: null,
      pivotValue: null,
      start: null,
      end: null,
      statusText: 'Sorting finished',
    },
    variables: { totalComparisons: comparisons, totalSwaps: swaps },
    metrics: { comparisons, swaps, operations: steps.length },
  });

  return {
    steps,
    totalSteps: steps.length,
    finalMetrics: {
      comparisons,
      swaps,
      operations: steps.length,
    },
  };
}
