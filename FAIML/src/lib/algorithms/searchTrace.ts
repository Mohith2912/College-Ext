/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GraphNode {
  id: string;
  name: string;
  x: number;
  y: number;
  h: number; // Heuristic straight-line estimate to goal
}

export interface GraphEdge {
  from: string;
  to: string;
  cost: number;
}

export interface SearchGraph {
  id: string;
  title: string;
  startNode: string;
  goalNode: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  description: string;
}

export interface SearchStep {
  step: number;
  currentNode: string;
  frontier: { id: string; g: number; h: number; f: number; path: string[] }[];
  visited: string[];
  currentPath: string[];
  explanation: string;
  codeLine: number;
  actionType: 'start' | 'expand' | 'evaluate' | 'goal_reached' | 'prune';
}

// Syllabus Pre-set Graph 1: A* Example Graph from Unit 1 Part B Q6
export const syllabusAStarGraph: SearchGraph = {
  id: 'astar-syllabus',
  title: 'Unit 1 Part B Q6: A* Evaluation Graph (S → A, B → G)',
  startNode: 'S',
  goalNode: 'G',
  description: 'The exact search graph from Unit 1 Part B Question 6 comparing Node A (f=7) vs Node B (f=6) to evaluate A* efficiency.',
  nodes: [
    { id: 'S', name: 'Start S', x: 80, y: 150, h: 7 },
    { id: 'A', name: 'Node A', x: 240, y: 80, h: 5 },
    { id: 'B', name: 'Node B', x: 240, y: 220, h: 2 },
    { id: 'C', name: 'Node C', x: 400, y: 80, h: 2 },
    { id: 'G', name: 'Goal G', x: 420, y: 220, h: 0 }
  ],
  edges: [
    { from: 'S', to: 'A', cost: 2 },
    { from: 'S', to: 'B', cost: 4 },
    { from: 'A', to: 'C', cost: 3 },
    { from: 'C', to: 'G', cost: 2 },
    { from: 'B', to: 'G', cost: 3 }
  ]
};

// Syllabus Pre-set Graph 2: Tamil Nadu Highway Route Finding from Unit 1 Part B Q3 & Q7
export const syllabusHighwayGraph: SearchGraph = {
  id: 'highway-syllabus',
  title: 'Unit 1 Part B Q3 & Q7: Route Finding (Madurai → Chennai)',
  startNode: 'Madurai',
  goalNode: 'Chennai',
  description: 'The Tamil Nadu route-finding problem formulated in Unit 1 Part B Questions 3 and 7 using straight-line distance heuristics.',
  nodes: [
    { id: 'Madurai', name: 'Madurai', x: 60, y: 240, h: 420 },
    { id: 'Dindigul', name: 'Dindigul', x: 140, y: 190, h: 360 },
    { id: 'Trichy', name: 'Trichy', x: 220, y: 150, h: 290 },
    { id: 'Salem', name: 'Salem', x: 200, y: 80, h: 310 },
    { id: 'Villupuram', name: 'Villupuram', x: 340, y: 130, h: 150 },
    { id: 'Vellore', name: 'Vellore', x: 360, y: 60, h: 130 },
    { id: 'Chennai', name: 'Chennai', x: 480, y: 100, h: 0 }
  ],
  edges: [
    { from: 'Madurai', to: 'Trichy', cost: 135 },
    { from: 'Madurai', to: 'Dindigul', cost: 65 },
    { from: 'Dindigul', to: 'Trichy', cost: 100 },
    { from: 'Trichy', to: 'Villupuram', cost: 195 },
    { from: 'Dindigul', to: 'Salem', cost: 165 },
    { from: 'Salem', to: 'Vellore', cost: 205 },
    { from: 'Villupuram', to: 'Chennai', cost: 160 },
    { from: 'Vellore', to: 'Chennai', cost: 140 }
  ]
};

// Syllabus Pre-set Graph 3: Tree Search from Unit 1 Part B Q4
export const syllabusTreeGraph: SearchGraph = {
  id: 'tree-syllabus',
  title: 'Unit 1 Part B Q4: Tree Search (A → B, C → D, E, F, G)',
  startNode: 'A',
  goalNode: 'G',
  description: 'The canonical binary tree from Unit 1 Part B Question 4 illustrating level-by-level BFS queue traversal.',
  nodes: [
    { id: 'A', name: 'Root A', x: 260, y: 50, h: 4 },
    { id: 'B', name: 'Child B', x: 140, y: 130, h: 3 },
    { id: 'C', name: 'Child C', x: 380, y: 130, h: 2 },
    { id: 'D', name: 'Leaf D', x: 80, y: 220, h: 3 },
    { id: 'E', name: 'Leaf E', x: 200, y: 220, h: 2 },
    { id: 'F', name: 'Leaf F', x: 320, y: 220, h: 1 },
    { id: 'G', name: 'Goal G', x: 440, y: 220, h: 0 }
  ],
  edges: [
    { from: 'A', to: 'B', cost: 1 },
    { from: 'A', to: 'C', cost: 1 },
    { from: 'B', to: 'D', cost: 1 },
    { from: 'B', to: 'E', cost: 1 },
    { from: 'C', to: 'F', cost: 1 },
    { from: 'C', to: 'G', cost: 1 }
  ]
};

export function runSearchAlgorithm(
  algorithm: 'BFS' | 'DFS' | 'UCS' | 'ASTAR',
  graph: SearchGraph
): SearchStep[] {
  const steps: SearchStep[] = [];
  const nodeMap = new Map(graph.nodes.map(n => [n.id, n]));

  // Adjacency list
  const adj = new Map<string, { to: string; cost: number }[]>();
  graph.nodes.forEach(n => adj.set(n.id, []));
  graph.edges.forEach(e => {
    adj.get(e.from)?.push({ to: e.to, cost: e.cost });
    // Directed graph by default for predictable trace
  });

  interface FrontierItem {
    id: string;
    g: number;
    h: number;
    f: number;
    path: string[];
  }

  const startH = nodeMap.get(graph.startNode)?.h || 0;
  let frontier: FrontierItem[] = [
    {
      id: graph.startNode,
      g: 0,
      h: startH,
      f: startH,
      path: [graph.startNode]
    }
  ];

  const visited = new Set<string>();
  let stepCount = 1;

  steps.push({
    step: stepCount++,
    currentNode: graph.startNode,
    frontier: JSON.parse(JSON.stringify(frontier)),
    visited: Array.from(visited),
    currentPath: [graph.startNode],
    explanation: `Initialized search at Start Node '${graph.startNode}'. Placed into frontier queue.`,
    codeLine: 1,
    actionType: 'start'
  });

  while (frontier.length > 0) {
    let currentItem: FrontierItem;

    if (algorithm === 'BFS') {
      // FIFO
      currentItem = frontier.shift()!;
    } else if (algorithm === 'DFS') {
      // LIFO
      currentItem = frontier.pop()!;
    } else if (algorithm === 'UCS') {
      // Min g(n)
      frontier.sort((a, b) => a.g - b.g);
      currentItem = frontier.shift()!;
    } else {
      // A*: Min f(n) = g(n) + h(n)
      frontier.sort((a, b) => a.f - b.f || a.h - b.h);
      currentItem = frontier.shift()!;
    }

    const { id: currId, g: currG, path: currPath } = currentItem;

    if (visited.has(currId)) {
      continue;
    }
    visited.add(currId);

    steps.push({
      step: stepCount++,
      currentNode: currId,
      frontier: JSON.parse(JSON.stringify(frontier)),
      visited: Array.from(visited),
      currentPath: currPath,
      explanation: `Dequeued Node '${currId}' (g=${currG}, h=${nodeMap.get(currId)?.h}, f=${currentItem.f}). Performing Goal Test.`,
      codeLine: 4,
      actionType: 'evaluate'
    });

    if (currId === graph.goalNode) {
      steps.push({
        step: stepCount++,
        currentNode: currId,
        frontier: JSON.parse(JSON.stringify(frontier)),
        visited: Array.from(visited),
        currentPath: currPath,
        explanation: `Goal Test Passed! Destination '${currId}' reached. Optimal Path: ${currPath.join(' → ')} with total cost ${currG}.`,
        codeLine: 5,
        actionType: 'goal_reached'
      });
      break;
    }

    const neighbors = adj.get(currId) || [];
    const addedNeighbors: string[] = [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        const nextG = currG + neighbor.cost;
        const nextH = nodeMap.get(neighbor.to)?.h || 0;
        const nextF = nextG + nextH;
        const nextPath = [...currPath, neighbor.to];

        frontier.push({
          id: neighbor.to,
          g: nextG,
          h: nextH,
          f: algorithm === 'UCS' ? nextG : nextF,
          path: nextPath
        });
        addedNeighbors.push(`${neighbor.to}(f=${nextF})`);
      }
    }

    steps.push({
      step: stepCount++,
      currentNode: currId,
      frontier: JSON.parse(JSON.stringify(frontier)),
      visited: Array.from(visited),
      currentPath: currPath,
      explanation: `Expanded neighbors of '${currId}': [${addedNeighbors.join(', ')}]. Added to frontier.`,
      codeLine: 8,
      actionType: 'expand'
    });
  }

  return steps;
}
