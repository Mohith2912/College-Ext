/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from '../../types';

export const unit1PartA: QuestionItem[] = [
  {
    id: 'u1-pa-01',
    qNo: 1,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define Artificial Intelligence (AI).',
    answer: 'Artificial Intelligence is the branch of computer science that develops systems capable of performing tasks that normally require human intelligence, such as learning, reasoning, and decision-making.',
    keyTakeaways: [
      'Branch of computer science simulating human cognitive abilities',
      'Core capabilities: learning from data, logical reasoning, and autonomous decision-making'
    ]
  },
  {
    id: 'u1-pa-02',
    qNo: 2,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State an intelligent agent.',
    answer: 'An intelligent agent is an entity that perceives its environment through sensors and acts upon it using actuators to achieve its goals.',
    keyTakeaways: [
      'Perception cycle: Environment → Sensors → Agent Decision → Actuators → Environment',
      'Goal-directed autonomous behavior'
    ]
  },
  {
    id: 'u1-pa-03',
    qNo: 3,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between informed and uninformed search.',
    answer: '• Uninformed search (Blind search): Uses no additional domain knowledge except the problem definition itself (e.g., BFS, DFS).\n• Informed search (Heuristic search): Uses problem-specific heuristic information h(n) to guide the search toward the goal more efficiently (e.g., A*, Greedy Best-First Search).',
    tableData: {
      headers: ['Feature', 'Uninformed Search', 'Informed Search'],
      rows: [
        ['Knowledge Used', 'Only problem definition', 'Heuristic function h(n)'],
        ['Search Speed', 'Slower, blind traversal', 'Faster, goal-directed'],
        ['Node Expansions', 'High (expands irrelevant nodes)', 'Low (prunes unpromising paths)'],
        ['Examples', 'BFS, DFS, Uniform Cost Search', 'A* Search, Greedy Best-First Search']
      ]
    }
  },
  {
    id: 'u1-pa-04',
    qNo: 4,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define the environment in Artificial Intelligence.',
    answer: 'The environment is everything outside the agent that it can perceive through sensors and interact with using actuators while performing tasks.',
    keyTakeaways: [
      'Properties: Observable vs Partially Observable, Deterministic vs Stochastic, Episodic vs Sequential, Static vs Dynamic, Discrete vs Continuous'
    ]
  },
  {
    id: 'u1-pa-05',
    qNo: 5,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State the definition of a search algorithm.',
    answer: 'A search algorithm is a systematic method used by problem-solving agents to find a sequence of actions (a path or solution) that leads from an initial state to a desired goal state.',
    keyTakeaways: [
      'Input: Problem definition (Initial state, Actions, Transition model, Goal test)',
      'Output: Solution path and sequence of actions'
    ]
  },
  {
    id: 'u1-pa-06',
    qNo: 6,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain the limitations of the Depth-First Search (DFS) algorithm.',
    answer: 'Limitations of DFS:\n1. Infinite Paths: DFS may get stuck exploring an infinite or cyclical branch and never terminate if no depth limit is enforced.\n2. Non-optimal: DFS does not guarantee finding the shortest or lowest-cost solution path.',
    keyTakeaways: [
      'Not complete in infinite-depth state spaces without cycle checking',
      'Not optimal: finds the leftmost path first, even if a much shallower goal exists on another branch'
    ]
  },
  {
    id: 'u1-pa-07',
    qNo: 7,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Identify the purpose of goal testing in the problem-solving process.',
    answer: 'Goal testing evaluates whether the current state satisfies the desired goal condition, signaling the search algorithm to terminate and return the solution path.',
    keyTakeaways: [
      'Terminates node expansion upon meeting target state criteria',
      'Can be an explicit state check (e.g., State == Chennai) or an implicit property test (e.g., Checkmate)'
    ]
  },
  {
    id: 'u1-pa-08',
    qNo: 8,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define A* search.',
    answer: 'A* search is an informed, best-first search algorithm that finds the optimal path from start to goal by evaluating nodes using the cost function: f(n) = g(n) + h(n), where g(n) is the exact cost from start to node n, and h(n) is an admissible heuristic estimate from node n to the goal.',
    formula: 'f(n) = g(n) + h(n)',
    keyTakeaways: [
      'g(n): Exact accumulated path cost from initial state to node n',
      'h(n): Estimated cost to goal from node n (must be admissible: h(n) <= h*(n))',
      'Guarantees completeness and optimality under admissible heuristics'
    ]
  },
  {
    id: 'u1-pa-09',
    qNo: 9,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State the definition of a heuristic function.',
    answer: 'A heuristic is a domain-specific rule, shortcut, or cost estimate h(n) that evaluates the promise of a state, guiding the search process toward the goal with reduced computational overhead.',
    keyTakeaways: [
      'Admissible heuristic: Never overestimates the true remaining cost to the goal',
      'Consistent heuristic: Satisfies the triangle inequality h(n) <= c(n, a, n\') + h(n\')'
    ]
  },
  {
    id: 'u1-pa-10',
    qNo: 10,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Classify any two uninformed search strategies.',
    answer: '1. Breadth-First Search (BFS): Explores nodes level by level using a First-In, First-Out (FIFO) queue data structure.\n2. Depth-First Search (DFS): Explores one branch completely down to its deepest node before backtracking, using a Last-In, First-Out (LIFO) stack data structure.',
    keyTakeaways: [
      'BFS: FIFO Queue, Complete, Optimal for uniform edge costs, Memory O(b^d)',
      'DFS: LIFO Stack, Space-efficient O(b*m), Incomplete for infinite depth'
    ]
  },
  {
    id: 'u1-pa-11',
    qNo: 11,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe a real-world problem that can be solved using Artificial Intelligence.',
    answer: 'Autonomous self-driving vehicles (e.g., Tesla Autopilot, Waymo) solve perception, localization, routing, and real-time obstacle avoidance by continuously processing sensor streams (cameras, LiDAR, radar) to execute safe driving controls. Other examples include medical diagnostic systems and speech recognition.',
    keyTakeaways: [
      'Multi-agent perception and decision making in real-time dynamic environments',
      'Integration of computer vision, path planning, and deep reinforcement learning'
    ]
  },
  {
    id: 'u1-pa-12',
    qNo: 12,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State Constraint Satisfaction Problem (CSP).',
    answer: 'A Constraint Satisfaction Problem (CSP) is a mathematical formulation where a problem is defined by a set of variables, each with a domain of possible values, and a set of constraints that specify allowable combinations of values. The goal is to find an assignment that satisfies all constraints simultaneously.',
    keyTakeaways: [
      'Triad representation: X (Variables), D (Domains), C (Constraints)',
      'Examples: Sudoku, Map Coloring, Timetabling, N-Queens'
    ]
  },
  {
    id: 'u1-pa-13',
    qNo: 13,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Identify the problem formulation.',
    answer: 'Problem formulation is the process of deciding what actions and states to consider, given a goal. It defines five formal components: Initial State, Actions, Transition Model, Goal Test, and Path Cost.',
    keyTakeaways: [
      '1. Initial State: Starting condition',
      '2. Actions: Legal moves available to the agent',
      '3. Transition Model: Result of taking an action in a state Result(s, a)',
      '4. Goal Test: Condition determining goal achievement',
      '5. Path Cost: Cumulative cost assigned to the path'
    ]
  },
  {
    id: 'u1-pa-14',
    qNo: 14,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'List the components of a rational agent.',
    answer: 'The components of a rational agent are captured by the PEAS framework:\n1. Performance measure: The external criteria for success.\n2. Environment: The task surroundings in which the agent operates.\n3. Actuators: The mechanism through which the agent performs actions.\n4. Sensors: The devices through which the agent perceives environmental states.',
    keyTakeaways: [
      'Rationality maximizes expected performance measure given the percept sequence and built-in knowledge'
    ]
  },
  {
    id: 'u1-pa-15',
    qNo: 15,
    part: 'A',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define the state space in Artificial Intelligence.',
    answer: 'The state space is the set of all possible physical or abstract states that can be reached from the initial state through any sequence of valid actions, forming a graph where nodes are states and edges are transitions.',
    keyTakeaways: [
      'Defines the entire universe of configurations explored by search algorithms',
      'State space size dictates computational complexity'
    ]
  }
];

export const unit1PartB: QuestionItem[] = [
  {
    id: 'u1-pb-01',
    qNo: 1,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply the concepts of intelligent agents to classify the agent operating in a self-driving car scenario, using suitable examples to support your classification.',
    answer: `1. Structure of an Intelligent Agent:
An intelligent agent perceives its environment through sensors and performs actions using actuators to achieve a specified goal.
Architecture flow:
Environment → Sensors → Agent (Decision Making Core) → Actuators → Environment

• Sensors: Collect raw contextual information (Cameras, LiDAR, Radar, GPS, Wheel odometry).
• Agent: Processes sensory inputs, tracks world states, plans trajectories, and makes real-time decisions.
• Actuators: Execute planned actions (Steering mechanism, Throttle/Accelerator, Braking system, Signal lights).

2. Types of Intelligent Agents:
• Simple Reflex Agent: Acts solely on current percept without history (Condition-Action rules). Example: Automatic sliding door.
• Model-Based Reflex Agent: Maintains internal world state to handle partial observability. Example: Robot vacuum cleaner.
• Goal-Based Agent: Evaluates sequences of actions to achieve an explicit destination or target. Example: Route navigation GPS.
• Utility-Based Agent: Balances competing tradeoffs to maximize a utility function (comfort, fuel, speed). Example: Algorithmic stock trading system.
• Learning Agent: Analyzes its past performance, discovers patterns, and improves policies over time. Example: Personalized content recommender.

3. Self-Driving Car Agent Classification:
A self-driving car represents an advanced Learning Agent integrated with Goal-Based and Utility-Based components:
• Goal-Based: Safely reach the selected drop-off coordinate without violating traffic laws.
• Utility-Based: Optimizes a multi-objective utility function (minimize transit time, minimize fuel/battery usage, maximize passenger ride comfort, minimize collision risk).
• Learning Agent: Learns from petabytes of autonomous driving logs, continuously improving lane detection, edge-case object recognition, and driver intention prediction.

4. Conclusion:
Autonomous vehicles combine Learning, Goal-Based, and Utility-Based agent architectures to navigate dynamic, non-deterministic urban environments reliably.`,
    keyTakeaways: [
      'Self-driving car = Goal-based + Utility-based + Learning Agent',
      'PEAS specified for safety, fuel efficiency, passenger comfort, and speed',
      'Continuous closed-loop sensor-actuator feedback cycle'
    ]
  },
  {
    id: 'u1-pb-02',
    qNo: 2,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply the concept of a problem-solving agent to demonstrate its operation in a route-finding GPS system with a suitable example.',
    answer: `1. Introduction:
A problem-solving agent is an intelligent entity that formulates a goal and search problem, finding an optimal sequence of actions to transition from an initial state to a goal state.

2. Steps in Problem Solving:
• Step 1: Goal Formulation
Defines the final objective. Example: Reach Chennai from Coimbatore.

• Step 2: Problem Formulation
Specifies the mathematical abstractions:
- Initial State: Coimbatore
- Goal State: Chennai
- Actions: Drive along connected highways (NH544, NH48)
- Path Cost: Total driving distance (km) or estimated travel time (hours)

• Step 3: Search
The agent evaluates candidate road sequences using search algorithms:
- Uninformed: Breadth-First Search (BFS), Depth-First Search (DFS), Uniform Cost Search (UCS)
- Informed: A* Search with straight-line distance heuristic

• Step 4: Solution
The search algorithm returns an optimal sequence of waypoints:
Coimbatore → Salem → Vellore → Chennai

• Step 5: Execution
The agent executes the plan step-by-step, providing turn-by-turn navigation instructions. If dynamic traffic congestion or road closures occur, it re-plans a route.

3. Example Route Diagram:
Coimbatore
    │ (NH544, 160 km)
Salem
    │ (NH48, 205 km)
Vellore
    │ (NH48, 140 km)
Chennai (Goal Reached! Total: 505 km)

4. Conclusion:
Problem-solving agents abstract physical road topologies into state spaces, using graph search techniques to optimize travel routes.`,
    diagramAscii: `Coimbatore ──(160 km)──> Salem ──(205 km)──> Vellore ──(140 km)──> Chennai`
  },
  {
    id: 'u1-pb-03',
    qNo: 3,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze the formulation of an AI problem by identifying its key components and illustrating them with a suitable example.',
    answer: `1. Introduction:
Problem formulation is the rigorous process of defining a search problem prior to invoking a search algorithm. A well-formulated problem enables the agent to discover optimal solutions with minimal computational cost.

2. Five Key Components of Problem Formulation:
1. Initial State: The starting condition where the agent begins its search.
   Example: Current city = Madurai.
2. Actions: Set of applicable actions available at state s: Actions(s).
   Example: Travel to connected neighboring cities {Trichy, Dindigul, Virudhunagar}.
3. Transition Model: Formal description of the outcome of action a taken in state s: Result(s, a).
   Example: Result(Madurai, GoToTrichy) = Trichy.
4. Goal Test: Boolean check determining if the state satisfies target criteria.
   Example: State == Chennai.
5. Path Cost: Function c(s, a, s') assigning numerical cost to taking action a from state s to state s'. Total path cost is the sum of step costs.
   Example: Total distance (km) or toll fees from Madurai to Chennai.

3. Route-Finding Problem Example:
Route Pathway:
Madurai ──(135 km)──> Trichy ──(195 km)──> Villupuram ──(160 km)──> Chennai

• Initial State: Madurai
• Goal State: Chennai
• Actions: Drive to neighboring connected cities
• Transition Model: Result(Madurai, DriveToTrichy) = Trichy
• Goal Test: Is current city == Chennai?
• Path Cost: Sum of road distances = 135 + 195 + 160 = 490 km.

4. Conclusion:
Explicit problem formulation allows algorithms (BFS, UCS, A*) to operate systematically over the state space without domain-specific hardcoding.`,
    diagramAscii: `Madurai ──(135 km)──> Trichy ──(195 km)──> Villupuram ──(160 km)──> Chennai`
  },
  {
    id: 'u1-pb-04',
    qNo: 4,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze the execution of the Breadth-First Search (BFS) algorithm in solving a given problem and illustrate the search process.',
    answer: `1. Introduction:
Breadth-First Search (BFS) is an uninformed search algorithm that explores nodes level-by-level. It expands the shallowest unexpanded node first, utilizing a First-In, First-Out (FIFO) Queue.

2. Example Tree:
        A (Level 0)
       / \\
      B   C (Level 1)
     / \\ / \\
    D  E F  G (Level 2)

3. BFS Traversal Order:
A → B → C → D → E → F → G

4. Step-by-Step FIFO Queue Operations:
Step 1: Enqueue Root A. Queue = [A]. Visited = [A].
Step 2: Dequeue A. Expand children B, C. Queue = [B, C]. Visited = [A].
Step 3: Dequeue B. Expand children D, E. Queue = [C, D, E]. Visited = [A, B].
Step 4: Dequeue C. Expand children F, G. Queue = [D, E, F, G]. Visited = [A, B, C].
Step 5: Dequeue D (leaf). Queue = [E, F, G]. Visited = [A, B, C, D].
Step 6: Dequeue E (leaf). Queue = [F, G]. Visited = [A, B, C, D, E].
Step 7: Dequeue F (leaf). Queue = [G]. Visited = [A, B, C, D, E, F].
Step 8: Dequeue G (leaf). Queue = []. Visited = [A, B, C, D, E, F, G].

5. Algorithmic Properties:
• Completeness: Yes, if the branching factor b is finite.
• Optimality: Yes, guaranteed to find the shallowest goal state when all edge costs are identical (c = 1).
• Time Complexity: O(b^d), where b is branching factor and d is depth of shallowest solution.
• Space Complexity: O(b^d), high memory overhead because every node at depth d must be retained in the frontier queue.`,
    tableData: {
      headers: ['Step', 'Frontier Queue', 'Dequeued Node', 'Visited Sequence'],
      rows: [
        [1, '[A]', '—', 'A'],
        [2, '[B, C]', 'A', 'A'],
        [3, '[C, D, E]', 'B', 'A, B'],
        [4, '[D, E, F, G]', 'C', 'A, B, C'],
        [5, '[E, F, G]', 'D', 'A, B, C, D'],
        [6, '[F, G]', 'E', 'A, B, C, D, E'],
        [7, '[G]', 'F', 'A, B, C, D, E, F'],
        [8, '[]', 'G', 'A, B, C, D, E, F, G']
      ]
    }
  },
  {
    id: 'u1-pb-05',
    qNo: 5,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Evaluate the effectiveness of Depth-First Search (DFS) and Breadth-First Search (BFS) for maze navigation, justifying which algorithm is more suitable in different scenarios.',
    answer: `1. Introduction:
BFS and DFS represent fundamental uninformed search strategies for graph traversal and maze solving. BFS explores outward uniformly across levels, whereas DFS plunges down individual paths until a dead end forces backtracking.

2. Comparative Matrix:
• Data Structure: BFS uses FIFO Queue; DFS uses LIFO Stack (or recursion).
• Search Pattern: BFS explores level-by-level; DFS explores deep first along branches.
• Shortest Path: BFS guarantees shortest path (for equal step costs); DFS does not guarantee shortest path.
• Space Complexity: BFS requires O(b^d) memory (high); DFS requires O(b*m) memory (low, where m is maximum depth).
• Completeness: BFS is complete for finite b; DFS is incomplete in infinite-depth spaces with cycles.

3. Example Tree Traversal:
        A
       / \\
      B   C
     / \\   \\
    D   E   F

• BFS Traversal: A → B → C → D → E → F
• DFS Traversal: A → B → D → E → C → F

4. Memory Efficiency Justification:
DFS is substantially more memory efficient than BFS:
In a tree with branching factor b = 10 and depth d = 5:
- BFS must store b^d = 100,000 nodes simultaneously in its queue.
- DFS stores only the current path plus unexpanded siblings: b * m = 10 * 5 = 50 nodes.

5. Maze Navigation Recommendation:
• Use BFS when finding the guaranteed shortest escape path is critical, or when the goal is known to be near the starting point.
• Use DFS when memory is heavily constrained, all paths lead to acceptable solutions, or in deep mazes where exploring whole corridors quickly is required.`,
    tableData: {
      headers: ['Feature', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)'],
      rows: [
        ['Data Structure', 'FIFO Queue', 'LIFO Stack / Recursion'],
        ['Search Strategy', 'Level-by-level exhaustive', 'Deepest unexplored path first'],
        ['Shortest Path', 'Guaranteed (for uniform edge cost)', 'Not guaranteed'],
        ['Memory Consumption', 'O(b^d) — High', 'O(b·m) — Low'],
        ['Completeness', 'Complete (finite b)', 'Incomplete (in infinite trees)']
      ]
    }
  },
  {
    id: 'u1-pb-06',
    qNo: 6,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Evaluate the effectiveness of A* Search Algorithm with a suitable example.',
    answer: `1. Introduction:
A* (A-Star) search is an informed, best-first search algorithm combining actual accumulated path cost g(n) with an estimated heuristic cost h(n). It selects the node in the priority queue with the lowest overall evaluation score f(n).

2. Evaluation Formula:
f(n) = g(n) + h(n)
• g(n): Cost incurred from the start node to current node n.
• h(n): Admissible heuristic estimate from node n to the goal state.
• f(n): Estimated total cost of the cheapest solution passing through n.

3. Example Search Graph:
        S (Start)
       / \\
 (2)  A   B  (4)
      |    \\
 (3)  C ──  G (Goal, cost 7 from S via B, or via C)

Node Evaluation Table:
• Start Node S: g(S) = 0, h(S) = 7, f(S) = 0 + 7 = 7
• Node A: g(A) = 2, h(A) = 5, f(A) = 2 + 5 = 7
• Node B: g(B) = 4, h(B) = 2, f(B) = 4 + 2 = 6
• Goal Node G: g(G) = 7, h(G) = 0, f(G) = 7 + 0 = 7

Execution Step:
Among candidate frontiers {A, B}, Node B has the lowest f(n) = 6 compared to Node A with f(n) = 7. Thus, the algorithm prioritizes expanding Node B, reaching Goal G directly with optimal evaluation.

4. Advantages of A* Search:
• Completeness: Guaranteed to find a solution if one exists.
• Optimality: Provably optimal when h(n) is admissible (for tree search) or consistent/monotonic (for graph search).
• Efficiency: Heuristic pruning eliminates large swaths of suboptimal branches.`,
    tableData: {
      headers: ['Node', 'g(n) Actual Cost', 'h(n) Heuristic', 'f(n) = g(n) + h(n)', 'Decision'],
      rows: [
        ['S', 0, 7, 7, 'Start Node expanded'],
        ['A', 2, 5, 7, 'Candidate'],
        ['B', 4, 2, 6, 'Selected! Lowest f(n)=6'],
        ['G', 7, 0, 7, 'Goal Reached']
      ]
    }
  },
  {
    id: 'u1-pb-07',
    qNo: 7,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply heuristic functions in an informed search algorithm to solve a given problem, using a suitable example.',
    answer: `1. Introduction:
A heuristic function h(n) injects domain-specific knowledge into informed search algorithms. It computes an estimate of the remaining path cost from node n to the nearest goal state, transforming an uninformed blind search into an efficient, directed traversal.

2. Purpose and Impact:
• Guides Search: Prioritizes expansion toward nodes closer to the destination.
• Prunes Search Space: Reduces unnecessary node expansions along unpromising detours.
• Accelerates Convergence: Reaches goal states significantly faster than blind algorithms.

3. Route-Finding Example (Madurai to Chennai):
Route Topology:
Madurai ──> Trichy ──> Villupuram ──> Chennai

• Initial State: Madurai
• Goal State: Chennai
• Heuristic Function h(n): Straight-Line Euclidean Distance (SLD) to Chennai.
Because a straight line is the shortest possible physical distance between two geographical points, SLD is guaranteed never to overestimate real road distance, making it strictly admissible.
• Algorithm Execution: A* uses f(n) = g(n) + h_SLD(n), consistently guiding the search northeast toward Chennai.

4. Uninformed vs Informed Search Comparison:
• Uninformed: Discovers nodes uniformly in all directions regardless of destination.
• Informed: Guided directly toward the goal node, expanding only a focused corridor.`,
    tableData: {
      headers: ['Dimension', 'Uninformed Search', 'Informed Search'],
      rows: [
        ['Heuristic Knowledge', 'None (blind)', 'Uses h(n) cost estimation'],
        ['Nodes Explored', 'Explores widely in all directions', 'Focused along promising path'],
        ['Search Speed', 'Slow on large state spaces', 'Rapid convergence to goal'],
        ['Memory Pressure', 'Can exhaust memory frontiers', 'Significantly lower queue footprint']
      ]
    }
  },
  {
    id: 'u1-pb-08',
    qNo: 1,
    part: 'B',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Illustrate the application of the PEAS framework for modeling an intelligent agent in a Smart Home Energy Management System.',
    answer: `1. Introduction:
The PEAS framework (Performance measure, Environment, Actuators, Sensors) is the standard AI methodology used to formally specify the task environment of an intelligent rational agent.

2. PEAS Specification for Smart Home Energy Agent:
• Performance Measure (P):
  - Minimize electricity consumption (kWh) and utility costs.
  - Maintain optimal resident thermal and lighting comfort levels.
  - Maximize equipment lifespan and peak-load grid shaving.
• Environment (E):
  - House floorplan, rooms, corridors.
  - Electrical appliances (HVAC, water heater, refrigerator, smart plugs).
  - External weather conditions (ambient temperature, solar irradiance).
  - Time-of-use variable electricity tariff rates.
• Actuators (A):
  - Smart thermostat temperature controller.
  - Solid-state appliance relays and smart plug on/off switches.
  - Motorized window blinds and LED dimmer controllers.
• Sensors (S):
  - PIR motion/occupancy sensors in every room.
  - Temperature and humidity sensors.
  - Ambient lux light sensors.
  - Smart bidirectional digital energy meters.

3. Agent Operation Workflow:
1. Sense: Detects that Room 3 has had zero occupancy for 15 minutes, temperature is 24°C, and electricity tariff is at peak rate.
2. Decide: Compares current state against comfort policy; infers that maintaining AC in unoccupied room wastes energy.
3. Act: Dispatches signal via actuator to toggle AC to eco-mode and turn off ambient lighting.
4. Result: 28% reduction in hourly energy consumption without compromising user convenience.`,
    tableData: {
      headers: ['PEAS Dimension', 'Smart Home Energy Management System Specification'],
      rows: [
        ['Performance Measure', 'Minimize electricity bills, minimize kWh usage, maintain comfort levels (22–24°C)'],
        ['Environment', 'Residential dwelling, appliances, seasonal weather, dynamic electricity pricing'],
        ['Actuators', 'Smart switches, HVAC thermostat, smart plugs, motorized window blinds'],
        ['Sensors', 'Motion sensors, temperature sensors, lux light sensors, smart energy meters']
      ]
    }
  }
];

export const unit1PartC: QuestionItem[] = [
  {
    id: 'u1-pc-01',
    qNo: 1,
    part: 'C',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Design an intelligent agent to operate in the Vacuum Cleaner World environment. Clearly outline the agent\'s percepts, actions, and internal architecture. Justify your choice of agent type and explain how it adapts to partially observable or stochastic environments.',
    answer: `1. Problem Specification:
The Vacuum Cleaner World is a canonical AI testbed consisting of two discrete rooms [A, B] that may be either Clean or Dirty. The agent's goal is to keep both rooms clean while minimizing total moves and energy expended.

2. Percepts & Actions:
• Percepts: Tuple [Location, Dirt Status]
  Example: [Room A, Dirty]
• Actions: {Move Left, Move Right, Suck (Clean), No-Operation (NoOp)}

3. Internal Agent Architecture:
The optimal design is a Model-Based Reflex Agent:
Environment → Sensors → Percept [Loc, Status]
Agent maintains an Internal State:
- WorldModel: {Room_A: Clean/Dirty/Unknown, Room_B: Clean/Dirty/Unknown, CurrentLoc: A/B}
- Update State Rule: When Suck executed in current location, set WorldModel[CurrentLoc] = Clean.
- Decision Policy:
  If current room is Dirty → Return Suck
  Else if other room is Dirty or Unknown → Move to other room
  Else if both rooms are Clean → Return NoOp

4. Adapting to a Partially Observable Environment:
In a partially observable setting, the agent cannot perceive the status of unvisited rooms simultaneously.
• Memory Mechanism: The agent retains internal state representations of past room observations.
• Belief State Maintenance: If Room B was observed Clean 3 minutes ago, it maintains a belief probability that it remains clean unless dirt generation rates suggest re-inspection.

5. Adapting to a Stochastic Environment:
In stochastic conditions:
1. Suck action fails 10% of the time (leaves dirt behind).
2. Dirt randomly reappears in previously cleaned rooms.
• Closed-Loop Verification: The agent does not blindly assume Suck succeeded; it re-senses the current room status immediately post-action. If status remains Dirty, it re-applies Suck.
• Periodic Patrol: When both rooms are believed Clean, the agent schedules low-frequency exploratory sweeps to detect newly deposited dirt.`,
    keyTakeaways: [
      'Model-Based Reflex Agent handles partial observability through internal world state',
      'Stochastic resilience requires closed-loop post-action sensing and probabilistic belief updating',
      'Eliminates infinite oscillatory cleaning loops'
    ]
  },
  {
    id: 'u1-pc-02',
    qNo: 2,
    part: 'C',
    unitNumber: 1,
    courseOutcome: 'CO1',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Develop a goal of finding the shortest path in a dynamic urban environment (e.g., autonomous car navigation), compare and critically evaluate the effectiveness of BFS, DFS, UCS, and A* search.',
    answer: `1. Urban Navigation Problem Formulation:
Autonomous vehicle pathfinding in an urban street grid requires navigating from an Origin to a Destination through dynamic intersections with varying road segment lengths, variable traffic congestion, speed limits, and sudden roadblocks.

2. Comparative Evaluation Matrix of Candidate Search Algorithms:
• Breadth-First Search (BFS):
  - Data Structure: FIFO Queue
  - Strategy: Level-by-level outward expansion
  - Time: O(b^d), Space: O(b^d)
  - Critical Assessment: Optimal ONLY if all road segments have identical cost. In urban grids where avenues are 5 km and alleys are 200 m, BFS chooses routes with fewer intersections even if total distance is vastly higher. Unviable for urban road networks.

• Depth-First Search (DFS):
  - Data Structure: LIFO Stack
  - Strategy: Plunges along one corridor until reaching a dead end
  - Time: O(b^m), Space: O(b*m)
  - Critical Assessment: Non-optimal. Will guide a vehicle into a 50 km circuitous rural detour if explored first, completely missing a direct 3 km arterial avenue. Severe risk of getting trapped in cyclical road networks.

• Uniform Cost Search (UCS / Dijkstra):
  - Data Structure: Min-Priority Queue ordered by path cost g(n)
  - Strategy: Expands frontier node with lowest cumulative travel cost g(n)
  - Time & Space: O(b^(1 + C*/epsilon))
  - Critical Assessment: Provably optimal for arbitrary positive edge costs. However, it expands search frontiers radially in all directions (including away from the destination), causing excessive memory consumption and high computational latency in large urban street graphs.

• A* Search Algorithm:
  - Data Structure: Min-Priority Queue ordered by f(n) = g(n) + h(n)
  - Strategy: Directs search toward the destination using Euclidean straight-line distance heuristic h_SLD(n).
  - Critical Assessment: Provably optimal when h(n) is admissible (h(n) <= true distance). Focuses search within an elliptical cone directly toward the destination. Reduces examined intersections by over 80% compared to UCS while guaranteeing the globally optimal route.

3. Adaptation to Dynamic Urban Environments:
In dynamic navigation, edge weights change in real time due to traffic accidents or signal timings. A* adapts via:
• Dynamic Re-planning (e.g., D* Lite): Reuses previously computed search trees, updating only edges affected by congestion rather than recalculating the entire graph from scratch.

4. Final Conclusion:
A* Search is the unequivocally superior algorithm for autonomous urban navigation, offering the ideal balance of mathematical optimality and computational efficiency.`,
    tableData: {
      headers: ['Algorithm', 'Data Structure', 'Time Complexity', 'Space Complexity', 'Optimality', 'Urban Suitability'],
      rows: [
        ['BFS', 'FIFO Queue', 'O(b^d)', 'O(b^d)', 'Only for equal edge weights', 'Unsuitable (ignores distances)'],
        ['DFS', 'LIFO Stack', 'O(b^m)', 'O(b·m)', 'Not optimal', 'Dangerous (finds long detours)'],
        ['UCS', 'Min-Priority Queue', 'O(b^(1 + C*/ε))', 'O(b^(1 + C*/ε))', 'Optimal for arbitrary costs', 'Moderate (expands in all directions)'],
        ['A* Search', 'Min-Priority Queue', 'O(b^d) (heuristic bound)', 'O(b^d)', 'Provably Optimal (admissible h)', 'Superior (directed, fast, optimal)']
      ]
    }
  }
];
