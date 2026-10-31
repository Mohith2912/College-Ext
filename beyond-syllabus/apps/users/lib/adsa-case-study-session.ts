export type AdsaUnitId = 1 | 2 | 3 | 4;

export interface AdsaCaseUnit {
  id: AdsaUnitId;
  title: string;
  tagline: string;
  badge: string;
  summary: string;
}

export const adsaCaseUnits: AdsaCaseUnit[] = [
  {
    id: 1,
    title: 'Unit 1: High-Frequency Telemetry Invariant Verification',
    tagline: 'IoT Stream Ingestion & Asymptotic Master Recurrences',
    badge: 'Foundations & Analysis',
    summary: 'Profile streaming data packets in real-time. Verify monotonicity invariants in O(n) single pass, compute simultaneous dual extrema with 25% fewer comparisons (3*floor(n/2)), and solve divide-and-conquer recurrences with the Master Theorem.'
  },
  {
    id: 2,
    title: 'Unit 2: High-Volume Trading Ledger Order Sorter',
    tagline: 'Divide & Conquer Stability vs In-Place Hoare Partitioning',
    badge: 'Divide & Conquer',
    summary: 'Evaluate order-book matching engines. Contrast Merge Sort’s guaranteed O(n log n) stability with Quick Sort’s in-place cache locality, analyzing pivot selection strategies to mitigate O(n²) degradation on pre-sorted ledger streams.'
  },
  {
    id: 3,
    title: 'Unit 3: Autonomous Fleet Routing & Greedy Allocation',
    tagline: 'Single-Source Shortest Path, Spanning Trees & Deadline Scheduling',
    badge: 'Greedy Optimization',
    summary: 'Dispatch cargo drones across charging waypoint networks using Dijkstra’s non-negative edge relaxation, construct minimum spanning power grids via Prim’s cut property, and optimize flight payloads using fractional density packing.'
  },
  {
    id: 4,
    title: 'Unit 4: Multi-Tenant Cloud Cluster Resource Matrix',
    tagline: 'Dynamic Programming State Tables & Backtracking Search',
    badge: 'Dynamic Programming',
    summary: 'Maximize compute cluster profits under strict memory limits using 0/1 Knapsack DP state tables, determine all-pairs inter-datacenter latencies with Floyd-Warshall triple pivots, and prune state space trees for Hamiltonian server ring routing.'
  }
];

export interface CaseQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const u1Questions: CaseQuestion[] = [
  {
    id: 'u1-q1',
    prompt: 'Why does the dual-extremum algorithm require only ceil(3n/2) - 2 comparisons instead of 2n - 2 comparisons in naive scanning?',
    options: [
      'It compares elements in adjacent pairs first, comparing the smaller against the minimum and the larger against the maximum.',
      'It sorts the array in O(1) time prior to extraction.',
      'It ignores odd-positioned array indices.',
      'It eliminates recursive call stack frames using tail recursion.'
    ],
    answer: 0,
    explanation: 'By comparing elements in pairs (1 comparison per pair), the smaller candidate only needs to compete against the running min and the larger against the running max (2 comparisons for the pair). This yields 3 comparisons per 2 elements (3n/2 comparisons total).'
  },
  {
    id: 'u1-q2',
    prompt: 'For an ingestion batch processor with recurrence T(n) = 3T(n/2) + O(n), what is the asymptotic runtime bound derived from the Master Theorem?',
    options: [
      'Theta(n^1.585) via Master Theorem Case 1',
      'Theta(n log n) via Master Theorem Case 2',
      'Theta(n^2) via Master Theorem Case 3',
      'Theta(log n) via Master Theorem Case 1'
    ],
    answer: 0,
    explanation: 'Here a = 3, b = 2, so the critical exponent is log_b(a) = log_2(3) ≈ 1.585. Since f(n) = O(n) = O(n^{1.585 - 0.585}), Case 1 applies, yielding T(n) = Theta(n^{log_2 3}) ≈ Theta(n^1.585).'
  }
];

export const u2Questions: CaseQuestion[] = [
  {
    id: 'u2-q1',
    prompt: 'Under what circumstance does the classical Quick Sort algorithm degrade to its worst-case runtime of O(n²)?',
    options: [
      'When the input array is already sorted and the first or last element is chosen as the pivot.',
      'When the array contains completely random elements.',
      'When the merge step requires auxiliary buffer space.',
      'When the recursion depth is strictly limited to log2(n).'
    ],
    answer: 0,
    explanation: 'When the array is already sorted (or reverse sorted) and the first/last element is picked as pivot, the partition splits into unbalanced subproblems of sizes 0 and n - 1 at every level, yielding T(n) = T(n - 1) + O(n) = O(n²).'
  },
  {
    id: 'u2-q2',
    prompt: 'Why is Merge Sort strictly preferred over Quick Sort for sorting external data streams stored on persistent disk drives?',
    options: [
      'Merge Sort performs sequential sequential access patterns and guarantees O(n log n) comparisons regardless of distribution.',
      'Merge Sort operates with O(1) auxiliary memory.',
      'Merge Sort eliminates all recursive call stack frames.',
      'Quick Sort requires O(n²) space on disk.'
    ],
    answer: 0,
    explanation: 'Merge Sort reads and writes contiguous blocks sequentially during its 2-way merge phase, making it optimal for sequential disk I/O and tape drives, with guaranteed O(n log n) worst-case time.'
  }
];

export const u3Questions: CaseQuestion[] = [
  {
    id: 'u3-q1',
    prompt: 'Why does Dijkstra’s Single Source Shortest Path algorithm fail or yield incorrect results on graphs containing negative edge weights?',
    options: [
      'Greedy choice property assumes once a vertex is marked visited, its distance is finalized and can never be shortened.',
      'Dijkstra\'s algorithm cannot traverse directed edges.',
      'Negative edge weights cause division by zero during relaxation.',
      'Priority queues cannot store negative numerical values.'
    ],
    answer: 0,
    explanation: 'Dijkstra assumes optimal substructure with monotonic non-decreasing path costs. Once a node is popped from the min-heap and marked visited, it is never re-examined. A subsequent negative edge could create a shorter path to a previously finalized node.'
  },
  {
    id: 'u3-q2',
    prompt: 'In Fractional Knapsack, which greedy sorting criterion is mathematically proven to maximize the total profit without exceeding capacity?',
    options: [
      'Descending order of Value-to-Weight ratio (v[i] / w[i]).',
      'Ascending order of item weights (w[i]).',
      'Descending order of absolute profit values (v[i]).',
      'Random priority permutation.'
    ],
    answer: 0,
    explanation: 'Sorting items by profit density (v[i] / w[i]) ensures each unit of knapsack capacity consumed yields the highest marginal increase in total value.'
  }
];

export const u4Questions: CaseQuestion[] = [
  {
    id: 'u4-q1',
    prompt: 'What is the state transition recurrence for the 0/1 Knapsack problem when evaluating item i with weight w[i-1] and value v[i-1] for capacity c?',
    options: [
      'dp[i][c] = max(v[i-1] + dp[i-1][c - w[i-1]], dp[i-1][c]) when w[i-1] <= c.',
      'dp[i][c] = dp[i-1][c] + dp[i][c - 1].',
      'dp[i][c] = min(dp[i-1][c], dp[i-1][c - w[i-1]]).',
      'dp[i][c] = (v[i-1] / w[i-1]) * c.'
    ],
    answer: 0,
    explanation: 'For each item i and capacity c, we choose the maximum of either including item i (adding its value v[i-1] to the optimal solution for remaining capacity c - w[i-1]) or excluding item i (retaining dp[i-1][c]).'
  },
  {
    id: 'u4-q2',
    prompt: 'How does Floyd-Warshall’s all-pairs shortest path algorithm achieve O(n³) runtime using dynamic programming?',
    options: [
      'It systematically updates dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]) across every intermediate pivot vertex k.',
      'It performs Dijkstra\'s algorithm with an unweighted BFS queue.',
      'It builds a tree of all 2^n subsets.',
      'It sorts all n² edge weights using Quick Sort.'
    ],
    answer: 0,
    explanation: 'Floyd-Warshall tests whether path i -> j can be improved by routing through an intermediate vertex k in {0, 1, ..., n - 1}. With 3 nested loops from 0 to n - 1, the total runtime is strictly Theta(n³).'
  }
];

