import { AlgorithmTraceStep, ExecutionTrace } from '../types/algorithm';

export interface DijkstraData {
  matrix: number[][];
  V: number;
  src: number;
  dist: number[];
  visited: boolean[];
  currentNode: number | null;
  relaxingEdge: [number, number] | null;
  nodeNames: string[];
  explanation: string;
}

export function traceDijkstra(matrix: number[][], src: number = 0, nodeNames?: string[]): ExecutionTrace<DijkstraData> {
  const steps: AlgorithmTraceStep<DijkstraData>[] = [];
  const V = matrix.length;
  const labels = nodeNames && nodeNames.length === V ? nodeNames : Array.from({ length: V }, (_, i) => `V${i}`);

  const INF = 999999;
  const dist: number[] = new Array(V).fill(INF);
  const visited: boolean[] = new Array(V).fill(false);
  dist[src] = 0;
  let operations = 0;

  steps.push({
    stepIndex: 0,
    description: `Dijkstra Initialization: Set distance to source vertex ${labels[src]} = 0. Set all other vertex distances to ∞. All ${V} vertices marked unvisited.`,
    activeLine: 6,
    phase: 'init',
    data: {
      matrix,
      V,
      src,
      dist: [...dist],
      visited: [...visited],
      currentNode: src,
      relaxingEdge: null,
      nodeNames: labels,
      explanation: `Source is ${labels[src]} with dist=0.`,
    },
    variables: { src: labels[src], 'dist[src]': 0, unvisitedCount: V },
    metrics: { operations: 1 },
  });

  for (let count = 0; count < V; count++) {
    // Pick min distance vertex from unvisited
    let minVal = INF;
    let u = -1;
    for (let v = 0; v < V; v++) {
      if (!visited[v] && dist[v] < minVal) {
        minVal = dist[v];
        u = v;
      }
    }

    if (u === -1 || minVal === INF) break;

    visited[u] = true;
    operations++;

    steps.push({
      stepIndex: steps.length,
      description: `Greedy Choice: Picked vertex ${labels[u]} with smallest tentative distance (${dist[u]}). Marked ${labels[u]} as visited.`,
      activeLine: 10,
      phase: 'select',
      data: {
        matrix,
        V,
        src,
        dist: [...dist],
        visited: [...visited],
        currentNode: u,
        relaxingEdge: null,
        nodeNames: labels,
        explanation: `Locked shortest distance for ${labels[u]} = ${dist[u]}.`,
      },
      variables: { u: labels[u], 'dist[u]': dist[u], visited: true },
      metrics: { operations },
    });

    // Relax neighbors
    for (let v = 0; v < V; v++) {
      const weight = matrix[u][v];
      if (!visited[v] && weight > 0 && weight < 999) {
        operations++;
        const newDist = dist[u] + weight;
        const improved = newDist < dist[v];

        steps.push({
          stepIndex: steps.length,
          description: `Inspecting edge (${labels[u]} -> ${labels[v]}, weight=${weight}). New distance = dist[${labels[u]}] (${dist[u]}) + ${weight} = ${newDist}. Previous dist[${labels[v]}] = ${dist[v] === INF ? '∞' : dist[v]}. ${improved ? 'Distance RELAXED and updated!' : 'No improvement.'}`,
          activeLine: 13,
          phase: improved ? 'relax' : 'compare',
          data: {
            matrix,
            V,
            src,
            dist: [...dist],
            visited: [...visited],
            currentNode: u,
            relaxingEdge: [u, v],
            nodeNames: labels,
            explanation: improved
              ? `dist[${labels[v]}] updated from ${dist[v] === INF ? '∞' : dist[v]} to ${newDist}`
              : `Current path through ${labels[u]} is not shorter.`,
          },
          variables: { u: labels[u], v: labels[v], weight, oldDist: dist[v] === INF ? '∞' : dist[v], newDist },
          metrics: { operations },
        });

        if (improved) {
          dist[v] = newDist;
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Dijkstra complete! All reachable vertices finalized. Shortest path distances from source ${labels[src]}: ${labels.map((l, i) => `${l}: ${dist[i] === INF ? '∞' : dist[i]}`).join(', ')}.`,
    activeLine: 16,
    phase: 'done',
    data: {
      matrix,
      V,
      src,
      dist: [...dist],
      visited: [...visited],
      currentNode: null,
      relaxingEdge: null,
      nodeNames: labels,
      explanation: 'All single-source shortest path routes established.',
    },
    variables: { completed: true, totalVertices: V },
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

export interface PrimMSTData {
  matrix: number[][];
  V: number;
  inMST: boolean[];
  key: number[];
  parent: number[];
  mstEdges: [number, number, number][]; // [u, v, weight]
  currentNode: number | null;
  totalWeight: number;
  nodeNames: string[];
}

export function tracePrimMST(matrix: number[][], nodeNames?: string[]): ExecutionTrace<PrimMSTData> {
  const steps: AlgorithmTraceStep<PrimMSTData>[] = [];
  const V = matrix.length;
  const labels = nodeNames && nodeNames.length === V ? nodeNames : Array.from({ length: V }, (_, i) => `V${i}`);

  const INF = 999999;
  const key: number[] = new Array(V).fill(INF);
  const parent: number[] = new Array(V).fill(-1);
  const inMST: boolean[] = new Array(V).fill(false);
  const mstEdges: [number, number, number][] = [];

  key[0] = 0;
  let operations = 0;

  steps.push({
    stepIndex: 0,
    description: `Prim's MST Initialization: Seed vertex ${labels[0]} key set to 0. All other vertices set to key=∞. MST currently empty (0 edges). Target is V - 1 = ${V - 1} edges.`,
    activeLine: 8,
    phase: 'init',
    data: {
      matrix,
      V,
      inMST: [...inMST],
      key: [...key],
      parent: [...parent],
      mstEdges: [],
      currentNode: 0,
      totalWeight: 0,
      nodeNames: labels,
    },
    variables: { seed: labels[0], totalVertices: V, edgesNeeded: V - 1 },
    metrics: { operations: 1 },
  });

  for (let count = 0; count < V; count++) {
    let minKey = INF;
    let u = -1;
    for (let v = 0; v < V; v++) {
      if (!inMST[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }

    if (u === -1 || minKey === INF) break;

    inMST[u] = true;
    operations++;

    if (parent[u] !== -1) {
      mstEdges.push([parent[u], u, matrix[parent[u]][u]]);
    }

    const currentTotalWeight = mstEdges.reduce((sum, e) => sum + e[2], 0);

    steps.push({
      stepIndex: steps.length,
      description: `Greedy Cut Choice: Selected vertex ${labels[u]} with minimum connecting key weight (${minKey}). Added to MST tree. ${parent[u] !== -1 ? `Added edge (${labels[parent[u]]} - ${labels[u]}, weight=${matrix[parent[u]][u]}).` : 'Root seed vertex.'}`,
      activeLine: 11,
      phase: 'select',
      data: {
        matrix,
        V,
        inMST: [...inMST],
        key: [...key],
        parent: [...parent],
        mstEdges: [...mstEdges],
        currentNode: u,
        totalWeight: currentTotalWeight,
        nodeNames: labels,
      },
      variables: { u: labels[u], key: minKey, mstEdgeCount: mstEdges.length, currentMSTCost: currentTotalWeight },
      metrics: { operations },
    });

    // Update keys of adjacent vertices
    for (let v = 0; v < V; v++) {
      const weight = matrix[u][v];
      if (weight > 0 && weight < 999 && !inMST[v] && weight < key[v]) {
        operations++;
        key[v] = weight;
        parent[v] = u;

        steps.push({
          stepIndex: steps.length,
          description: `Updated neighbor ${labels[v]}: Key reduced to ${weight} via parent vertex ${labels[u]}.`,
          activeLine: 14,
          phase: 'relax',
          data: {
            matrix,
            V,
            inMST: [...inMST],
            key: [...key],
            parent: [...parent],
            mstEdges: [...mstEdges],
            currentNode: u,
            totalWeight: currentTotalWeight,
            nodeNames: labels,
          },
          variables: { neighbor: labels[v], parent: labels[u], newKey: weight },
          metrics: { operations },
        });
      }
    }
  }

  const finalCost = mstEdges.reduce((sum, e) => sum + e[2], 0);

  steps.push({
    stepIndex: steps.length,
    description: `Prim's Minimum Spanning Tree constructed! Contains exactly ${mstEdges.length} edges connecting all ${V} vertices with no cycles. Total Minimum Spanning Tree Weight = ${finalCost}.`,
    activeLine: 16,
    phase: 'done',
    data: {
      matrix,
      V,
      inMST: [...inMST],
      key: [...key],
      parent: [...parent],
      mstEdges: [...mstEdges],
      currentNode: null,
      totalWeight: finalCost,
      nodeNames: labels,
    },
    variables: { totalEdges: mstEdges.length, totalCost: finalCost },
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

export interface JobItem {
  id: string;
  deadline: number;
  profit: number;
}

export interface JobSequencingData {
  jobs: JobItem[];
  sortedJobs: JobItem[];
  maxDeadline: number;
  timelineSlots: (JobItem | null)[];
  currentJobIndex: number | null;
  totalProfit: number;
  scheduledJobIds: string[];
}

export function traceJobSequencing(inputJobs: JobItem[]): ExecutionTrace<JobSequencingData> {
  const steps: AlgorithmTraceStep<JobSequencingData>[] = [];
  const jobs = [...inputJobs];
  let operations = 0;

  // Step 1: Sort by profit desc
  const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);
  const maxDeadline = Math.max(...jobs.map((j) => j.deadline), 1);
  const timelineSlots: (JobItem | null)[] = new Array(maxDeadline).fill(null);
  let totalProfit = 0;
  const scheduledJobIds: string[] = [];

  steps.push({
    stepIndex: 0,
    description: `Read ${jobs.length} jobs. Sorted all jobs in descending order of profit: [${sortedJobs.map((j) => `${j.id}: P${j.profit}/D${j.deadline}`).join(', ')}]. Max deadline = ${maxDeadline}. Created empty slot array [1 .. ${maxDeadline}].`,
    activeLine: 3,
    phase: 'init',
    data: {
      jobs,
      sortedJobs,
      maxDeadline,
      timelineSlots: [...timelineSlots],
      currentJobIndex: null,
      totalProfit: 0,
      scheduledJobIds: [],
    },
    variables: { n: jobs.length, maxDeadline, sorted: true },
    metrics: { operations: 1 },
  });

  for (let i = 0; i < sortedJobs.length; i++) {
    const job = sortedJobs[i];
    operations++;
    let assignedSlot = -1;

    // Search latest available slot from min(deadline, maxDeadline) - 1 down to 0
    const startSlot = Math.min(job.deadline, maxDeadline) - 1;

    steps.push({
      stepIndex: steps.length,
      description: `Examining Job ${job.id} (Profit=${job.profit}, Deadline=${job.deadline}). Searching backwards from slot ${startSlot + 1} down to 1 for the latest free time slot.`,
      activeLine: 6,
      phase: 'compare',
      data: {
        jobs,
        sortedJobs,
        maxDeadline,
        timelineSlots: [...timelineSlots],
        currentJobIndex: i,
        totalProfit,
        scheduledJobIds: [...scheduledJobIds],
      },
      variables: { 'job.id': job.id, 'job.profit': job.profit, 'job.deadline': job.deadline, startSearchSlot: startSlot + 1 },
      metrics: { operations },
    });

    for (let s = startSlot; s >= 0; s--) {
      operations++;
      if (timelineSlots[s] === null) {
        timelineSlots[s] = job;
        assignedSlot = s;
        totalProfit += job.profit;
        scheduledJobIds.push(job.id);

        steps.push({
          stepIndex: steps.length,
          description: `Assigned Job ${job.id} to free slot ${s + 1} (time ${s}-${s + 1}). Accumulated Profit += ${job.profit} (Total: ${totalProfit}).`,
          activeLine: 9,
          phase: 'select',
          data: {
            jobs,
            sortedJobs,
            maxDeadline,
            timelineSlots: [...timelineSlots],
            currentJobIndex: i,
            totalProfit,
            scheduledJobIds: [...scheduledJobIds],
          },
          variables: { 'job.id': job.id, assignedSlot: s + 1, currentProfit: totalProfit },
          metrics: { operations },
        });
        break;
      }
    }

    if (assignedSlot === -1) {
      steps.push({
        stepIndex: steps.length,
        description: `Job ${job.id} could not be scheduled: All permissible time slots prior to deadline ${job.deadline} are already occupied. Dropping job.`,
        activeLine: 12,
        phase: 'prune',
        data: {
          jobs,
          sortedJobs,
          maxDeadline,
          timelineSlots: [...timelineSlots],
          currentJobIndex: i,
          totalProfit,
          scheduledJobIds: [...scheduledJobIds],
        },
        variables: { 'job.id': job.id, reason: 'slots saturated' },
        metrics: { operations },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Job Scheduling complete! Scheduled Jobs: [${scheduledJobIds.join(', ')}]. Maximum Total Profit = ${totalProfit}.`,
    activeLine: 15,
    phase: 'done',
    data: {
      jobs,
      sortedJobs,
      maxDeadline,
      timelineSlots: [...timelineSlots],
      currentJobIndex: null,
      totalProfit,
      scheduledJobIds: [...scheduledJobIds],
    },
    variables: { totalProfit, scheduledCount: scheduledJobIds.length },
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

export interface FractionalKnapsackItem {
  id: string;
  weight: number;
  value: number;
  ratio: number;
  fractionTaken: number;
}

export interface FractionalKnapsackData {
  items: FractionalKnapsackItem[];
  capacity: number;
  remainingCapacity: number;
  totalValue: number;
  currentItemIndex: number | null;
}

export function traceFractionalKnapsack(
  rawItems: { id: string; weight: number; value: number }[],
  capacity: number
): ExecutionTrace<FractionalKnapsackData> {
  const steps: AlgorithmTraceStep<FractionalKnapsackData>[] = [];
  let operations = 0;

  const items: FractionalKnapsackItem[] = rawItems.map((it) => ({
    ...it,
    ratio: Math.round((it.value / it.weight) * 100) / 100,
    fractionTaken: 0,
  }));

  // Sort descending by ratio
  items.sort((a, b) => b.ratio - a.ratio);

  let currentCap = capacity;
  let totalValue = 0;

  steps.push({
    stepIndex: 0,
    description: `Calculated Value/Weight ratio for ${items.length} items. Sorted descending by ratio: [${items.map((it) => `${it.id}: R=${it.ratio}`).join(', ')}]. Initial capacity W = ${capacity}.`,
    activeLine: 4,
    phase: 'init',
    data: {
      items: JSON.parse(JSON.stringify(items)),
      capacity,
      remainingCapacity: currentCap,
      totalValue: 0,
      currentItemIndex: null,
    },
    variables: { capacity, itemCount: items.length },
    metrics: { operations: 1 },
  });

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    operations++;

    if (currentCap <= 0) break;

    if (it.weight <= currentCap) {
      it.fractionTaken = 1.0;
      totalValue += it.value;
      currentCap -= it.weight;

      steps.push({
        stepIndex: steps.length,
        description: `Item ${it.id} (wt=${it.weight}, val=${it.value}, ratio=${it.ratio}) fits fully! Took 100% (fraction 1.0). Remaining capacity = ${currentCap.toFixed(2)}, total profit = ${totalValue.toFixed(2)}.`,
        activeLine: 8,
        phase: 'select',
        data: {
          items: JSON.parse(JSON.stringify(items)),
          capacity,
          remainingCapacity: currentCap,
          totalValue,
          currentItemIndex: i,
        },
        variables: { item: it.id, fraction: 1.0, addedValue: it.value, remainingCap: currentCap },
        metrics: { operations },
      });
    } else {
      const frac = currentCap / it.weight;
      const valGained = it.ratio * currentCap;
      it.fractionTaken = Math.round(frac * 100) / 100;
      totalValue += valGained;
      const oldCap = currentCap;
      currentCap = 0;

      steps.push({
        stepIndex: steps.length,
        description: `Item ${it.id} weight (${it.weight}) exceeds remaining capacity (${oldCap.toFixed(2)}). Taking fractional slice: ${(frac * 100).toFixed(1)}% (${it.fractionTaken}). Gained value = ${valGained.toFixed(2)}. Knapsack is now 100% full!`,
        activeLine: 12,
        phase: 'found',
        data: {
          items: JSON.parse(JSON.stringify(items)),
          capacity,
          remainingCapacity: 0,
          totalValue,
          currentItemIndex: i,
        },
        variables: { item: it.id, fraction: it.fractionTaken, addedValue: valGained, remainingCap: 0 },
        metrics: { operations },
      });
      break;
    }
  }

  steps.push({
    stepIndex: steps.length,
    description: `Fractional Knapsack greedy packing complete! Total maximized profit = ${totalValue.toFixed(2)}.`,
    activeLine: 16,
    phase: 'done',
    data: {
      items: JSON.parse(JSON.stringify(items)),
      capacity,
      remainingCapacity: currentCap,
      totalValue,
      currentItemIndex: null,
    },
    variables: { totalProfit: totalValue.toFixed(2), capacityUsed: (capacity - currentCap).toFixed(2) },
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
