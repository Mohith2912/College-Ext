import { UnitMeta, LabMeta, UnitId, LabId } from '../types/algorithm';

export const UNITS: UnitMeta[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Foundations & Performance Analysis',
    subtitle: 'Asymptotic Notations, Recurrences, and Space-Time Tradeoffs',
    description:
      'Rigorous mathematical analysis of algorithmic resources, order-of-growth behaviors (O, Ω, Θ, o), single-pass invariants, and divide-and-conquer recurrence equations.',
    labCount: 5,
    labs: ['linear-search', 'min-max', 'check-sorted', 'power-recursion', 'asymptotic-analysis'],
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Divide and Conquer Algorithms',
    subtitle: 'Recursive Decomposition, Partition Invariants, and Subproblem Merging',
    description:
      'Divide, Conquer, and Combine paradigm. Logarithmic interval reduction, external-sorting stable merges, and Hoare in-place partitioning mechanics.',
    labCount: 3,
    labs: ['binary-search', 'merge-sort', 'quick-sort'],
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Greedy Optimization & Networks',
    subtitle: 'Locally Optimal Choices, Minimum Spanning Trees, and Scheduling',
    description:
      'Greedy choice property and optimal substructure. SSSP edge relaxation, Prim MST cut property, deadline slot assignment, and continuous fractional density packing.',
    labCount: 4,
    labs: ['dijkstra-sssp', 'prim-mst', 'job-sequencing', 'fractional-knapsack'],
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Dynamic Programming Paradigms',
    subtitle: 'Memoization, Tabulation Invariants, and Optimal Substructure',
    description:
      'Overlapping subproblems resolved through systematic state tables. 0/1 decision surfaces, Floyd-Warshall all-pairs triple pivots, and optimal search tree root selections.',
    labCount: 3,
    labs: ['knapsack-01-dp', 'all-pairs-shortest-path', 'optimal-bst'],
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'Graph Traversal & Backtracking',
    subtitle: 'Systematic State Space Trees, Pruning Invariants, and Chromatic Bounds',
    description:
      'Exhaustive state-space navigation. Level-order FIFO vs deep LIFO traversals, constraint-satisfaction pruning, Hamiltonian circuits, chromatic coloring, and N-Queens attack elimination.',
    labCount: 6,
    labs: ['bfs-traversal', 'dfs-traversal', 'hamiltonian-cycle', 'graph-coloring', 'n-queens', 'sum-of-subsets'],
  },
];

export const LAB_METADATA: Record<LabId, LabMeta> = {
  'linear-search': {
    id: 'linear-search',
    unitId: 'unit-1',
    title: 'Linear Search & Asymptotic Bounds',
    category: 'Sequential Search',
    paradigm: 'Iterative Scan',
    badge: 'O(n) Worst · O(1) Best',
    summary:
      'Inspect each array cell sequentially until target key matches. Demonstrates why Big O bounds the worst case when key is at the end or absent.',
    syllabusReference: 'Part-A Q1-3, Part-B Q1 · LinearSearch.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      justification:
        'Best case occurs when key matches arr[0] on the first comparison (1 step). Worst case occurs when key is at index n-1 or absent entirely (n comparisons). Auxiliary space is constant O(1).',
    },
    keyInvariants: [
      'Subarray arr[0 .. i-1] has been verified to contain no target key.',
      'Active search terminates immediately on first occurrence, achieving early exit.',
    ],
    caseStudy: {
      title: 'Real-Time Sensor Telemetry Audit',
      industry: 'Automotive Embedded Systems',
      scenario: 'An in-vehicle CAN bus log stream receives unsorted diagnostic status codes from 50 sensors.',
      problem: 'Detect whether a critical fault code (e.g. 0xFA) occurred in the recent flight telemetry buffer.',
      algorithmicSolution:
        'A single linear pass inspects each raw sensor register. On unsorted streaming records, linear scanning provides zero-overhead in-place inspection without preprocessing cost.',
      realWorldImpact: 'Guarantees deterministic worst-case latency of exactly N cycles with zero heap allocation.',
    },
    defaultInputDescription: 'Array of integers and target key to search for.',
  },

  'min-max': {
    id: 'min-max',
    unitId: 'unit-1',
    title: 'Min-Max Single Traversal',
    category: 'Extremum Search',
    paradigm: 'Simultaneous Scan',
    badge: 'Θ(n) Tight Bound · O(1) Space',
    summary:
      'Simultaneously tracks the running minimum and maximum values across an array using exactly one pass, achieving a strict Θ(n) tight bound regardless of input order.',
    syllabusReference: 'Part-B Q2 · MinMax.java',
    complexity: {
      timeBest: 'Θ(n)',
      timeAvg: 'Θ(n)',
      timeWorst: 'Θ(n)',
      space: 'O(1)',
      justification:
        'Every element from index 1 to n-1 is inspected unconditionally to verify both lower and upper bounds. Because loop iterations are fixed at n-1, running time is bounded strictly from above and below by n: Θ(n).',
    },
    keyInvariants: [
      'min <= arr[k] and max >= arr[k] for all indices 0 <= k <= i.',
      'Memory consumption remains strictly 2 integer registers throughout.',
    ],
    caseStudy: {
      title: 'Power Grid Voltage Surge & Dip Monitoring',
      industry: 'Smart Grid Energy Systems',
      scenario: 'Substation telemetry feeds a stream of AC voltage samples every millisecond.',
      problem: 'Identify peak over-voltage spike and lowest sag voltage across the sample window.',
      algorithmicSolution:
        'Single-pass dual comparison tracks instantaneous envelope without buffering or sorting the signal.',
      realWorldImpact: 'Provides sub-microsecond envelope detection to trigger emergency breakers.',
    },
    defaultInputDescription: 'Array of numerical values to extract minimum and maximum from.',
  },

  'check-sorted': {
    id: 'check-sorted',
    unitId: 'unit-1',
    title: 'Array Sorted Order Verifier',
    category: 'Monotonicity Verification',
    paradigm: 'Pairwise Inversion Scan',
    badge: 'O(1) Best · O(n) Worst',
    summary:
      'Compares adjacent elements arr[i] and arr[i+1]. Exhibits extreme best-case O(1) performance via instant short-circuiting on the first inverted pair.',
    syllabusReference: 'Part-B Q3 · CheckSorted.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      justification:
        'Best case O(1) occurs when arr[0] > arr[1], aborting immediately. Worst case O(n) occurs when the array is sorted or the only inversion is at the last pair.',
    },
    keyInvariants: [
      'For all j < i, arr[j] <= arr[j+1] (prefix is monotonically ascending).',
      'First violation arr[i] > arr[i+1] is sufficient to reject sortedness globally.',
    ],
    caseStudy: {
      title: 'High-Frequency Trading Order Book Validation',
      industry: 'FinTech Exchanges',
      scenario: 'Exchange matching engines receive incoming limit orders that must remain strictly ordered by price.',
      problem: 'Verify if incoming batches violate monotonicity before feeding into the matching pipeline.',
      algorithmicSolution:
        'Fast short-circuiting check detects pipeline corruptions in the first comparison before allocating index trees.',
      realWorldImpact: 'Prevents corrupted trade executions with average check latency under 5 nanoseconds.',
    },
    defaultInputDescription: 'Array of numbers to test for ascending order.',
  },

  'power-recursion': {
    id: 'power-recursion',
    unitId: 'unit-1',
    title: 'Recursive Power & Call Stack',
    category: 'Mathematical Recursion',
    paradigm: 'Divide & Conquer (Linear)',
    badge: 'T(n) = T(n-1) + 1 · O(n) Space',
    summary:
      'Computes x^n recursively by evaluating x * power(x, n-1). Models call stack expansion down to base condition n=0 and unwind multiplication.',
    syllabusReference: 'Part-B Q4 · PowerRecursion.java',
    complexity: {
      timeBest: 'O(n)',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(n)',
      recurrence: 'T(n) = T(n-1) + 1, with T(0) = 1',
      justification:
        'Generates a recursion tree of height n. Each frame requires O(1) constant time for multiplication. The active call stack grows to depth n+1, requiring O(n) auxiliary frame memory.',
    },
    keyInvariants: [
      'power(x, k) correctly returns x^k for all k >= 0.',
      'Call stack depth at invocation power(x, k) is exactly (n - k) active activation frames.',
    ],
    caseStudy: {
      title: 'Compound Interest & Depreciation Engine',
      industry: 'Actuarial Banking Systems',
      scenario: 'Computing multi-period compounding multiplier (1 + r)^n for longevity annuity payouts.',
      problem: 'Demonstrate recursion stack safety and analyze memory footprint on deep fiscal periods.',
      algorithmicSolution:
        'Provides exact recurrence decomposition showing stack footprint vs tail-call iteration.',
      realWorldImpact: 'Ensures system engineers understand memory limits on resource-constrained embedded microcontrollers.',
    },
    defaultInputDescription: 'Base x and non-negative integer exponent n.',
  },

  'asymptotic-analysis': {
    id: 'asymptotic-analysis',
    unitId: 'unit-1',
    title: 'Asymptotic Notations & Master Recurrences',
    category: 'Theoretical Rigor',
    paradigm: 'Master Theorem / Recurrences',
    badge: 'T(n) = aT(n/b) + f(n)',
    summary:
      'Interactive mathematical playground for Big O, Big Omega, Big Theta, and Little o, paired with a live Divide-and-Conquer Recurrence solver.',
    syllabusReference: 'Part-A Q1-7 · General Divide & Conquer Recurrence',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      recurrence: 'T(n) = a*T(n/b) + f(n)',
      justification:
        'Master Theorem partitions recurrence behaviors into 3 cases depending on whether f(n) is polynomially smaller, equal to, or larger than n^(log_b a).',
    },
    keyInvariants: [
      'f(n) = O(g(n)) means c*g(n) upper-bounds f(n) for all n >= n0.',
      'f(n) = Ω(g(n)) means c*g(n) lower-bounds f(n) for all n >= n0.',
      'f(n) = Θ(g(n)) means c1*g(n) <= f(n) <= c2*g(n) for all n >= n0.',
    ],
    caseStudy: {
      title: 'Cloud Infrastructure Capacity Sizing',
      industry: 'Cloud Architecture & DevOps',
      scenario: 'Architects choosing between O(n log n) distributed merge processing and O(n^2) nested joins.',
      problem: 'Predict CPU cluster hours as dataset scales from 1,000 to 10,000,000 transactions.',
      algorithmicSolution:
        'Applies asymptotic mathematical modeling to predict server billing without expensive physical trial runs.',
      realWorldImpact: 'Saves millions of dollars annually by rejecting quadratic scaling architectures early.',
    },
    defaultInputDescription: 'Parameters a, b, and f(n) exponent k to solve Master Theorem.',
  },

  'binary-search': {
    id: 'binary-search',
    unitId: 'unit-2',
    title: 'Binary Search Divide & Conquer',
    category: 'Sorted Search',
    paradigm: 'Interval Bisection',
    badge: 'O(log n) · O(1) Space',
    summary:
      'Repeatedly bisects a sorted search space into equal halves, comparing the midpoint element against target key and discarding half the remaining interval.',
    syllabusReference: 'Part-A Q9, Part-B Q5 · BinarySearch.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(log n)',
      timeWorst: 'O(log n)',
      space: 'O(1)',
      recurrence: 'T(n) = T(n/2) + O(1), with T(1) = O(1)',
      justification:
        'At each step, search range (high - low + 1) is halved. Total comparisons bounded by ⌊log2 n⌋ + 1. Best case is O(1) when arr[mid] == key on first test.',
    },
    keyInvariants: [
      'If key is present in original array, it is guaranteed to reside within arr[low .. high].',
      'All elements to left of low are strictly smaller than key; all to right of high are strictly larger.',
    ],
    caseStudy: {
      title: 'Database B-Tree Page Index Lookup',
      industry: 'High-Performance Relational Databases',
      scenario: 'A PostgreSQL index page contains 1,024 sorted 64-bit integer keys in contiguous memory.',
      problem: 'Locate target row pointer with maximum speed and zero memory overhead.',
      algorithmicSolution:
        'Binary search resolves any key in at most 10 CPU cache line checks, outperforming linear scanning by 100x.',
      realWorldImpact: 'Powers sub-millisecond query execution on multi-terabyte financial datasets.',
    },
    defaultInputDescription: 'Monotonically sorted array of numbers and search target.',
  },

  'merge-sort': {
    id: 'merge-sort',
    unitId: 'unit-2',
    title: 'Merge Sort Divide & Conquer',
    category: 'Comparison Sorting',
    paradigm: 'Divide, Conquer & Combine',
    badge: 'Θ(n log n) All Cases · Stable',
    summary:
      'Recursively splits the array into single-element subarrays, then merges pairs of sorted subarrays into a temporary buffer in monotonically ascending order.',
    syllabusReference: 'Part-A Q10, Part-B Q6, Part-C Q3 · Mergesort2.java',
    complexity: {
      timeBest: 'O(n log n)',
      timeAvg: 'O(n log n)',
      timeWorst: 'O(n log n)',
      space: 'O(n)',
      recurrence: 'T(n) = 2T(n/2) + O(n), with T(1) = 0',
      justification:
        'The recursion tree depth is ⌈log2 n⌉. At each level of the tree, merging requires exactly O(n) element comparisons and copy operations. Space is O(n) for auxiliary merge buffer.',
    },
    keyInvariants: [
      'After divide(arr, left, right) returns, subarray arr[left .. right] is sorted.',
      'Stability: Relative order of identical elements is preserved because arr[a] <= arr[b] picks left first.',
    ],
    caseStudy: {
      title: 'External Sorting on Magnetic & SSD Drives',
      industry: 'Big Data Processing Pipelines',
      scenario: 'Sorting a 500 GB transaction ledger on a worker node with only 16 GB of RAM.',
      problem: 'Perform predictable sorting without relying on random in-memory access.',
      algorithmicSolution:
        'Merge Sort is ideal for streaming sequential disk runs, producing sorted multi-gigabyte chunks and merging them.',
      realWorldImpact: 'Guarantees reliable O(n log n) sorting without worst-case degradation on adversarial inputs.',
    },
    defaultInputDescription: 'Arbitrary array of integers to sort.',
  },

  'quick-sort': {
    id: 'quick-sort',
    unitId: 'unit-2',
    title: 'Quick Sort Partitioning',
    category: 'Comparison Sorting',
    paradigm: 'In-Place Partitioning',
    badge: 'O(n log n) Avg · O(n²) Worst',
    summary:
      'Selects a pivot element, partitions the array such that all smaller elements reside to the left and larger elements to the right, then recurses on subarrays.',
    syllabusReference: 'Part-A Q10, Part-C Q1 · quicksort1.java',
    complexity: {
      timeBest: 'O(n log n)',
      timeAvg: 'O(n log n)',
      timeWorst: 'O(n²)',
      space: 'O(log n)',
      recurrence: 'Avg: T(n) = 2T(n/2) + O(n); Worst: T(n) = T(n-1) + O(n)',
      justification:
        'When partitions are balanced, recursion depth is log2 n yielding O(n log n). If array is already sorted and first/last element chosen as pivot, partition size decreases by only 1 per step, causing O(n²) comparisons.',
    },
    keyInvariants: [
      'After partition(arr, lb, ub) completes, pivot is at its final sorted position loc.',
      'All elements in arr[lb .. loc-1] <= pivot <= all elements in arr[loc+1 .. ub].',
    ],
    caseStudy: {
      title: 'In-Memory C++ / Java Library Sorting',
      industry: 'Core System Runtimes',
      scenario: 'Implementing high-performance primitive sorting in the standard runtime library.',
      problem: 'Minimize memory allocation overhead and optimize CPU cache locality.',
      algorithmicSolution:
        'Quick Sort operates strictly in-place with small constant factors and high cache locality compared to Merge Sort.',
      realWorldImpact: 'Powers standard library sorting primitives for millions of applications worldwide.',
    },
    defaultInputDescription: 'Array of integers to partition and sort in-place.',
  },

  'dijkstra-sssp': {
    id: 'dijkstra-sssp',
    unitId: 'unit-3',
    title: "Dijkstra's Shortest Path (SSSP)",
    category: 'Graph Optimization',
    paradigm: 'Greedy Relaxation',
    badge: 'O(V²) / O((V+E)log V) · Non-Negative',
    summary:
      'Solves the Single Source Shortest Path problem on weighted graphs with non-negative edge weights. Greedily selects the closest unvisited vertex and relaxes neighbor distances.',
    syllabusReference: 'Part-A Q8, Part-B Q7 · Edsger W. Dijkstra 1956',
    complexity: {
      timeBest: 'O(V²)',
      timeAvg: 'O(V²)',
      timeWorst: 'O(V²)',
      space: 'O(V)',
      justification:
        'Using an adjacency matrix, the algorithm performs V outer iterations. In each iteration, it scans V vertices to find the minimum distance vertex and updates V neighbors: O(V²). With adjacency lists & min-heap, it runs in O((V + E) log V).',
    },
    keyInvariants: [
      'Once a vertex u is marked visited, its recorded distance dist[u] is guaranteed to be the true optimal shortest path.',
      'Greedy property holds strictly only when edge weights are non-negative.',
    ],
    caseStudy: {
      title: 'Autonomous Vehicle GPS Turn-by-Turn Navigation',
      industry: 'Transportation & Telematics',
      scenario: 'Routing an autonomous delivery van across a city street graph with non-negative travel times.',
      problem: 'Find the quickest route from the dispatch hub to all destination customer nodes.',
      algorithmicSolution:
        'Dijkstra explores roads by cumulative travel duration, locking in finalized shortest travel times node by node.',
      realWorldImpact: 'Computes guaranteed shortest routes avoiding unnecessary detour miles and reducing fleet fuel consumption.',
    },
    defaultInputDescription: 'Graph adjacency matrix with edge weights and source vertex.',
  },

  'prim-mst': {
    id: 'prim-mst',
    unitId: 'unit-3',
    title: "Prim's Minimum Spanning Tree (MST)",
    category: 'Graph Optimization',
    paradigm: 'Greedy Cut Property',
    badge: 'V - 1 Edges · No Cycles · Min Weight',
    summary:
      'Builds a Minimum Spanning Tree by starting from a seed vertex and greedily adding the minimum-weight edge connecting the growing tree to a new vertex until all V vertices are connected.',
    syllabusReference: 'Part-B Q8 · Minimum Spanning Tree (MST)',
    complexity: {
      timeBest: 'O(V²)',
      timeAvg: 'O(V²)',
      timeWorst: 'O(V²)',
      space: 'O(V)',
      justification:
        'With adjacency matrix, Prim examines V vertices to select the minimum key node, then updates keys of adjacent unvisited vertices: V * V = O(V²). MST strictly contains exactly V - 1 edges.',
    },
    keyInvariants: [
      'The tree constructed at step k contains k vertices and k - 1 edges with no cycles.',
      'Cut Property: The minimum-weight edge crossing the cut between vertices in MST and vertices outside MST must belong to the global MST.',
    ],
    caseStudy: {
      title: 'Fiber-Optic Telecom Grid Infrastructure',
      industry: 'Telecommunications & Utilities',
      scenario: 'Connecting 8 regional data centers with high-speed optical fiber cables.',
      problem: 'Minimize total trench digging cost while ensuring every data center can reach any other data center.',
      algorithmicSolution:
        'Prim builds the minimum-cost connected network with exactly 7 links and zero redundant cycles.',
      realWorldImpact: 'Saves millions in civil engineering costs while preserving full network reachability.',
    },
    defaultInputDescription: 'Weighted undirected graph adjacency matrix.',
  },

  'job-sequencing': {
    id: 'job-sequencing',
    unitId: 'unit-3',
    title: 'Job Scheduling with Deadlines',
    category: 'Greedy Scheduling',
    paradigm: 'Descending Profit Greedy',
    badge: 'O(n × d) · Maximize Profit',
    summary:
      'Given jobs with deadlines and profits, sort jobs descending by profit. Greedily schedule each job in the latest available time slot before its deadline.',
    syllabusReference: 'Part-C Q2 · Jobsequence.java',
    complexity: {
      timeBest: 'O(n log n)',
      timeAvg: 'O(n × d)',
      timeWorst: 'O(n²)',
      space: 'O(n)',
      justification:
        'Sorting n jobs by profit requires O(n log n). For each job, searching backwards from its deadline across d slots takes O(d) time. When d ≈ n, scheduling takes O(n²). Space is O(n) for slot boolean tracking.',
    },
    keyInvariants: [
      'Each time slot contains at most one job requiring 1 unit of execution time.',
      'Assigning a job to the latest available slot leaves earlier slots open for jobs with tighter deadlines.',
    ],
    caseStudy: {
      title: 'Cloud Batch Compute Job Prioritization',
      industry: 'Cloud Infrastructure & High-Performance Computing',
      scenario: 'A Kubernetes cluster has unit-hour GPU slots and incoming AI training jobs with strict client deadlines and billing rewards.',
      problem: 'Schedule jobs to maximize revenue without violating customer SLA deadlines.',
      algorithmicSolution:
        'Greedy deadline slotting locks in high-value jobs at their latest permissible time, leaving early slots flexible.',
      realWorldImpact: 'Increases data center compute monetization by up to 35% compared to naive FIFO queues.',
    },
    defaultInputDescription: 'Set of jobs with Job ID, Deadline, and Profit values.',
  },

  'fractional-knapsack': {
    id: 'fractional-knapsack',
    unitId: 'unit-3',
    title: 'Fractional Knapsack Optimization',
    category: 'Resource Allocation',
    paradigm: 'Value-to-Weight Ratio Greedy',
    badge: 'O(n log n) Sort · O(n) Fill',
    summary:
      'Divisible items with weights and values. Greedily chooses items with the highest value-to-weight ratio (v/w). Takes entire item when possible, or exact remaining fraction to max capacity.',
    syllabusReference: 'Part-C Q4 · Knapsack.java',
    complexity: {
      timeBest: 'O(n log n)',
      timeAvg: 'O(n log n)',
      timeWorst: 'O(n log n)',
      space: 'O(n)',
      justification:
        'Sorting items by ratio takes O(n log n). The single greedy fill scan takes O(n) iterations. Overall time complexity is dominated by sorting: O(n log n). Auxiliary space is O(n) for ratio arrays.',
    },
    keyInvariants: [
      'Knapsack capacity is fully saturated (or all items consumed).',
      'Items included have ratio >= any item excluded, guaranteeing global mathematical optimality.',
    ],
    caseStudy: {
      title: 'Air Cargo Fuel & Payload Maximization',
      industry: 'Aviation Logistics & Freight',
      scenario: 'A cargo plane has a strict remaining payload capacity limit before takeoff.',
      problem: 'Pack containers of high-density valuable cargo (raw metals, liquid concentrates, bulk pharmaceuticals) to maximize cargo value.',
      algorithmicSolution:
        'Because liquids and grains are divisible, greedy ratio packing fills the exact payload capacity to the gram.',
      realWorldImpact: 'Guarantees maximum revenue per flight while keeping aircraft strictly within FAA weight limits.',
    },
    defaultInputDescription: 'Items with weight, value, and knapsack carrying capacity.',
  },

  'knapsack-01-dp': {
    id: 'knapsack-01-dp',
    unitId: 'unit-4',
    title: '0/1 Knapsack Dynamic Programming',
    category: 'Dynamic Programming',
    paradigm: '2D State Tabulation',
    badge: 'dp[n+1][cap+1] · O(n · W) Pseudo-polynomial',
    summary:
      'Indivisible items (either taken 100% or excluded 0%). Fills a 2D DP matrix dp[i][w] = max(take, dont) to overcome the greedy choice failure on discrete items.',
    syllabusReference: 'Unit-3 Java Programs · knadum.java',
    complexity: {
      timeBest: 'O(n · W)',
      timeAvg: 'O(n · W)',
      timeWorst: 'O(n · W)',
      space: 'O(n · W)',
      justification:
        'The algorithm systematically populates an (n+1) x (W+1) grid where each cell computation takes O(1) comparison between take (value + dp[i-1][w-weight]) and dont (dp[i-1][w]). Time and table space are both O(n · W).',
    },
    keyInvariants: [
      'dp[i][w] represents the absolute maximum profit obtainable using a subset of the first i items with weight limit w.',
      'Optimal Substructure: The optimal solution for capacity w either contains item i (reducing capacity by weight[i-1]) or does not.',
    ],
    caseStudy: {
      title: 'Satellite Launch Scientific Payload Optimization',
      industry: 'Aerospace Engineering',
      scenario: 'NASA/ESA smallsat payload bay with a hard mass limit of 15 kg.',
      problem: 'Choose which scientific instruments (spectrometer, infrared imager, radar antenna) to launch to maximize scientific return score.',
      algorithmicSolution:
        'Since instruments cannot be cut in half, 0/1 DP evaluates all optimal sub-capacities to find the mathematically optimal combination.',
      realWorldImpact: 'Extracts the absolute maximum science output possible within unforgiving rocketry mass budgets.',
    },
    defaultInputDescription: 'Discrete items with weights, values, and knapsack capacity.',
  },

  'all-pairs-shortest-path': {
    id: 'all-pairs-shortest-path',
    unitId: 'unit-4',
    title: 'All-Pairs Shortest Path (Floyd-Warshall)',
    category: 'Dynamic Programming',
    paradigm: 'Intermediate Pivot Relaxation',
    badge: 'O(V³) · Triple Loop DP · INF = 999',
    summary:
      'Computes the shortest paths between every pair of vertices in a weighted graph using dynamic programming across intermediate pivot vertices k from 0 to n-1.',
    syllabusReference: 'Unit-3 Java Programs · Apsp.java',
    complexity: {
      timeBest: 'O(V³)',
      timeAvg: 'O(V³)',
      timeWorst: 'O(V³)',
      space: 'O(V²)',
      justification:
        'Three tightly nested loops run from 0 to n-1: outer loop picks intermediate pivot k, middle loop picks source i, inner loop picks destination j. Number of steps is exactly V * V * V = O(V³). Distance matrix consumes O(V²) memory.',
    },
    keyInvariants: [
      'After the k-th iteration of outer loop, dp[i][j] holds the length of the shortest path from i to j using only vertices from {0 .. k} as intermediate waypoints.',
      'dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]).',
    ],
    caseStudy: {
      title: 'Global Internet Router Transit Distance Matrix',
      industry: 'Networking & Telecommunications',
      scenario: 'An Autonomous System (AS) internet exchange calculates shortest peering hops between all internal border routers.',
      problem: 'Produce a complete routing table enabling any router to forward traffic to any destination via the optimal transit path.',
      algorithmicSolution:
        'Floyd-Warshall computes the all-pairs matrix once in memory, pre-populating lookup tables for wire-speed forwarding.',
      realWorldImpact: 'Eliminates routing loops and minimizes end-to-end packet latency across wide-area backbone networks.',
    },
    defaultInputDescription: 'Graph adjacency matrix with INF (999) representing lack of direct edge.',
  },

  'optimal-bst': {
    id: 'optimal-bst',
    unitId: 'unit-4',
    title: 'Optimal Binary Search Tree (OBST)',
    category: 'Dynamic Programming',
    paradigm: 'Chain Length & Root Optimization',
    badge: 'O(n³) · Minimum Expected Search Cost',
    summary:
      'Given keys and their search access frequencies, constructs a binary search tree that minimizes the total expected search cost. Solves subproblems by increasing tree length len=2..n.',
    syllabusReference: 'Unit-3 Java Programs · Obst.java',
    complexity: {
      timeBest: 'O(n³)',
      timeAvg: 'O(n³)',
      timeWorst: 'O(n³)',
      space: 'O(n²)',
      justification:
        'Considers subproblems of length len from 2 to n (O(n)), starting index i (O(n)), and tests each root r in [i..j] (O(n)), yielding O(n³) operations. The 2D cost table dp[n][n] uses O(n²) space.',
    },
    keyInvariants: [
      'dp[i][j] contains the minimum search cost for keys i through j.',
      'Cost = cost(left subtree) + cost(right subtree) + sum of frequencies (because choosing root pushes all subtrees down 1 level).',
    ],
    caseStudy: {
      title: 'Compiler Keyword & Identifier Symbol Table',
      industry: 'Compiler Design & Language Runtimes',
      scenario: 'A programming language compiler tokenizes source code, frequently looking up reserved words like if, for, while, return, class.',
      problem: 'Arrange keywords in a binary search tree such that keywords appearing millions of times (e.g. if, return) reside closest to the root.',
      algorithmicSolution:
        'OBST weights tree depth by empirical keyword frequency, minimizing total CPU cycles spent during lexical analysis.',
      realWorldImpact: 'Dramatically speeds up source code compilation times on multi-million line codebases.',
    },
    defaultInputDescription: 'Number of keys and their corresponding search access frequencies.',
  },

  'bfs-traversal': {
    id: 'bfs-traversal',
    unitId: 'unit-5',
    title: 'Breadth First Search (BFS)',
    category: 'Graph Traversal',
    paradigm: 'Queue-Based Level-Order',
    badge: 'FIFO Queue · O(V + E) / O(V²)',
    summary:
      'Explores a graph level by level starting from a chosen vertex using a FIFO Queue and a boolean visited array. Guarantees finding shortest unweighted paths.',
    syllabusReference: 'Unit-3 Java Programs · BFS.java',
    complexity: {
      timeBest: 'O(V + E)',
      timeAvg: 'O(V²)',
      timeWorst: 'O(V²)',
      space: 'O(V)',
      justification:
        'With adjacency matrix, every vertex inspects all V neighbors in a row, taking O(V²) total time. With adjacency lists, each vertex and edge is visited once: O(V + E). Space is O(V) for the queue and visited array.',
    },
    keyInvariants: [
      'Vertices are processed in strictly non-decreasing order of distance (hop count) from the start vertex.',
      'No vertex is ever enqueued more than once because visited[v] prevents re-processing.',
    ],
    caseStudy: {
      title: 'Social Network Degree of Separation (LinkedIn/Meta)',
      industry: 'Social Graphs & Recommendation Systems',
      scenario: 'Finding 1st, 2nd, and 3rd degree connections for a user profile in a social network.',
      problem: 'Display mutual connections and discover shortest connection chains without getting trapped in infinite loops.',
      algorithmicSolution:
        'BFS fans outward layer by layer, cleanly grouping friends into degree 1, mutual friends into degree 2, etc.',
      realWorldImpact: 'Powers real-time "People You May Know" recommendations across billions of network edges.',
    },
    defaultInputDescription: 'Graph adjacency matrix and starting vertex index.',
  },

  'dfs-traversal': {
    id: 'dfs-traversal',
    unitId: 'unit-5',
    title: 'Depth First Search (DFS)',
    category: 'Graph Traversal',
    paradigm: 'Stack-Based Deep Exploration',
    badge: 'LIFO Stack · O(V + E) / O(V²)',
    summary:
      'Explores deeply along each branch as far as possible before backtracking, using a LIFO Stack and visited boolean array.',
    syllabusReference: 'Unit-3 Java Programs · Dffs.java',
    complexity: {
      timeBest: 'O(V + E)',
      timeAvg: 'O(V²)',
      timeWorst: 'O(V²)',
      space: 'O(V)',
      justification:
        'With adjacency matrix, scans V entries per vertex for O(V²) time. With adjacency list, O(V + E). Auxiliary space is O(V) for visited array and call stack/explicit stack.',
    },
    keyInvariants: [
      'Fully traverses connected components before retreating.',
      'Provides foundation for topological sorting, cycle detection, and strongly connected components.',
    ],
    caseStudy: {
      title: 'Build System Dependency Cycle Detection',
      industry: 'DevOps & Build Tooling (Bazel/Webpack/Vite)',
      scenario: 'Compiling 500 interdependent software packages with import statements.',
      problem: 'Detect if any cyclic dependency exists (e.g. Package A -> B -> C -> A) that would cause infinite compile loops.',
      algorithmicSolution:
        'DFS discovers back-edges pointing to vertices currently active on the recursion stack, reliably flagging cycles.',
      realWorldImpact: 'Prevents broken build pipelines and deadlocks in automated continuous integration servers.',
    },
    defaultInputDescription: 'Graph adjacency matrix and starting vertex index.',
  },

  'hamiltonian-cycle': {
    id: 'hamiltonian-cycle',
    unitId: 'unit-5',
    title: 'Hamiltonian Cycle Backtracking',
    category: 'Backtracking',
    paradigm: 'Exhaustive Permutation Search',
    badge: 'isSafe Check · Backtrack path[pos]=-1',
    summary:
      'Finds a closed loop that visits every vertex in a graph exactly once and returns to the starting vertex. Employs isSafe pruning and state restoration.',
    syllabusReference: 'Unit-4 Java Programs · Main.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(n!)',
      timeWorst: 'O(n!)',
      space: 'O(n)',
      justification:
        'In the worst case on a dense graph, exploring all possible vertex permutations requires O(n!) trial sequences. Pruning invalid edges via isSafe eliminates infeasible branches early. Call stack depth and path array use O(n) space.',
    },
    keyInvariants: [
      'path[0 .. pos-1] contains pos distinct vertices with valid edges between successive pairs.',
      'A complete path of length n is a Hamiltonian cycle if and only if an edge exists between path[n-1] and path[0].',
    ],
    caseStudy: {
      title: 'Printed Circuit Board (PCB) Drill Path Optimization',
      industry: 'Electronics Manufacturing & Robotics',
      scenario: 'A CNC robotic head must drill 30 micro-via holes on a motherboard and return to home position.',
      problem: 'Find a single continuous round-trip circuit visiting all drilling coordinates with zero redundant passes.',
      algorithmicSolution:
        'Hamiltonian cycle models the exact requirement of visiting every coordinate once in a closed loop.',
      realWorldImpact: 'Reduces robotic spindle movement time by 40%, increasing factory manufacturing throughput.',
    },
    defaultInputDescription: 'Undirected graph adjacency matrix and starting vertex.',
  },

  'graph-coloring': {
    id: 'graph-coloring',
    unitId: 'unit-5',
    title: 'Graph Coloring Backtracking',
    category: 'Backtracking',
    paradigm: 'Constraint Satisfaction',
    badge: 'm Colors · isSafe Non-Adjacent Conflict',
    summary:
      'Assigns colors from a palette of size m to vertices such that no two adjacent vertices share the same color. Backtracks when chromatic conflicts arise.',
    syllabusReference: 'Unit-4 Java Programs · GraphColoring.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(m^V)',
      timeWorst: 'O(m^V)',
      space: 'O(V)',
      justification:
        'At each of the V vertices, there are m potential color choices, forming a state-space tree of size m^V. isSafe checks neighbors in O(V) time and prunes conflicting branches. Call stack and color array consume O(V) memory.',
    },
    keyInvariants: [
      'For every assigned vertex v, no adjacent neighbor u (with graph[v][u] == 1) has color[u] == color[v].',
      'If assigning all m colors to vertex v fails isSafe, algorithm rolls back color[v] = 0 and backtracks to v - 1.',
    ],
    caseStudy: {
      title: 'Cellular Tower Radio Spectrum Allocation',
      industry: 'Wireless Telecommunications (5G/LTE)',
      scenario: 'Cellular base stations with overlapping coverage zones cannot transmit on the same radio frequency without mutual interference.',
      problem: 'Assign available frequency bands (m channels) to cellular towers with zero adjacent interference.',
      algorithmicSolution:
        'Graph coloring assigns frequencies (colors) to towers (vertices), ensuring adjacent towers get distinct channels.',
      realWorldImpact: 'Eliminates dropped calls and cross-tower radio frequency degradation in dense urban environments.',
    },
    defaultInputDescription: 'Graph adjacency matrix and maximum allowed colors m.',
  },

  'n-queens': {
    id: 'n-queens',
    unitId: 'unit-5',
    title: 'N-Queens Backtracking',
    category: 'Backtracking',
    paradigm: '2D Spatial Constraint Elimination',
    badge: 'Row by Row · Diagonal & Col Checks',
    summary:
      'Places N chess queens on an N x N chessboard such that no two queens attack each other (sharing no row, column, or diagonal). Backtracks whenever a row has no safe column.',
    syllabusReference: 'Unit-4 Java Programs · NQueens.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(N!)',
      timeWorst: 'O(N!)',
      space: 'O(N²)',
      justification:
        'Each row can place 1 queen among N columns. Since no two queens share columns, search space is bounded by N!. Diagonal conflict checks prune majority of branches early. Board uses O(N²) space; call stack is O(N).',
    },
    keyInvariants: [
      'Exactly one queen is placed per row in board[0 .. row-1].',
      'isSafe checks only previously placed rows (row - 1 down to 0) along column, upper-left diagonal, and upper-right diagonal.',
    ],
    caseStudy: {
      title: 'VLSI Silicon Chip Parallel Interconnect Routing',
      industry: 'Semiconductor Hardware Design',
      scenario: 'Routing high-speed clock bus lines on a silicon substrate without capacitive cross-talk interference.',
      problem: 'Distribute signal emitters such that no two lines align along parallel paths or cross-talk diagonal corridors.',
      algorithmicSolution:
        'N-Queens constraint satisfaction models spatial isolation requirements across orthogonal routing channels.',
      realWorldImpact: 'Prevents signal electromagnetic interference and clock drift in high-density multi-core CPUs.',
    },
    defaultInputDescription: 'Board dimension N (e.g. 4 for 4x4, 8 for 8x8).',
  },

  'sum-of-subsets': {
    id: 'sum-of-subsets',
    unitId: 'unit-5',
    title: 'Sum of Subsets Backtracking',
    category: 'Backtracking',
    paradigm: 'Binary Inclusion/Exclusion Branching',
    badge: '2^n State Tree · Prune sum > target',
    summary:
      'Given an array of numbers, finds all unique subsets whose elements sum to a target value. Prunes branches whenever current sum exceeds target or elements are exhausted.',
    syllabusReference: 'Unit-4 Java Programs · SumOfSubset.java',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(2^n)',
      timeWorst: 'O(2^n)',
      space: 'O(n)',
      justification:
        'Every element has two binary choices: either included in the subset or excluded, generating a binary state space tree of size 2^n. Bounding condition (sum > target) prunes oversized branches. Stack and subset list use O(n) space.',
    },
    keyInvariants: [
      'Current subset elements sum exactly to the tracked parameter sum.',
      'If sum == target, subset is emitted as a valid solution without exploring deeper.',
      'If sum > target, immediately returns, pruning 2^(n - index) downstream redundant states.',
    ],
    caseStudy: {
      title: 'Portfolio Cash Rebalancing & Collateral Matching',
      industry: 'Treasury Banking & Asset Management',
      scenario: 'A corporate treasury has discrete accounts with varying cash balances and must fund a $500,000 margin payment.',
      problem: 'Find exact combinations of accounts that sum precisely to the target obligation without breaking account balances.',
      algorithmicSolution:
        'Sum of subsets identifies all exact cash matches, pruning candidate groups whose running total exceeds the required margin.',
      realWorldImpact: 'Eliminates liquidity friction and minimizes bank transaction fees on multi-million dollar bond settlements.',
    },
    defaultInputDescription: 'Array of positive integers and target sum value.',
  },
};
