const note = (
  slug: string,
  title: string,
  description: string,
  focus: string,
  takeaways: string[],
  caseStudyTitle: string,
  caseStudyContent: string
) => ({
  slug,
  title,
  description,
  markdown: `## Learning objectives\n\n${description}\n\n## Syllabus focus\n\n${focus}\n\n## Revision checklist\n\n${takeaways.map((item) => `- ${item}`).join('\n')}\n\n## Case study: ${caseStudyTitle}\n\n${caseStudyContent}\n\n## Practice prompt\n\nExplain the central algorithmic idea in your own words, derive the recurrence or closed-form bound by hand, and trace one non-trivial test case. Contrast with an alternative paradigm and note any space-time tradeoffs.`,
});

export const adsa = {
  slug: 'advanced-data-structures-and-algorithms',
  title: 'Advanced Data Structures and Algorithms',
  subject: 'Computer Science and Engineering',
  code: '2311CSC205J',
  term: 2,
  description:
    'A rigorous, interactive laboratory-backed curriculum on algorithmic design: asymptotic growth, divide-and-conquer recurrences, greedy network optimization, dynamic programming tables, and backtracking search.',
  modules: [
    note(
      'adsa-unit-1',
      'Unit 1: Foundations & Performance Analysis',
      'Establish rigorous mathematical foundations for measuring algorithmic complexity, asymptotic bounds, recursive stack memory, and divide-and-conquer recurrences.',
      'Order of growth and formal asymptotic notations ($O, \\Omega, \\Theta, o, \\omega$); limit definitions and dominance rankings; linear scanning and single-pass invariants; simultaneous minimum and maximum extraction; recursive power evaluation and call-stack activation frames; Master Theorem for divide-and-conquer recurrences $T(n) = aT(n/b) + f(n)$.',
      [
        'Formally define Big-O, Big-Omega, and Big-Theta using constants $c, c_1, c_2$ and threshold $n_0$.',
        'Compare growth rates using limits: $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)}$ for polynomial, logarithmic, exponential, and factorial curves.',
        'Analyze the call-stack memory footprint of recursive algorithms: activation record creation and unwinding.',
        'Apply the three cases of the Master Theorem to solve recurrences including $T(n) = 2T(n/2) + O(n)$ and $T(n) = 4T(n/2) + O(n)$.',
        'Trace simultaneous min-max search and explain why pairwise comparisons reduce total operations from $2n-2$ to $\\lceil 3n/2 \\rceil - 2$.'
      ],
      'High-Throughput Telemetry Stream Invariant Checker & Recurrence Engine',
      `An ultra-low-latency IoT telemetry aggregator processes high-frequency sensor streams (100,000 packets/sec). The ingestion pipeline requires real-time validation of monotonically increasing timestamps, instantaneous min-max value detection, and sub-millisecond asymptotic profiling under sudden burst loads.

**Algorithmic Architecture:**
1. **Sorted Invariant Verification**: A single-pass sliding pairwise comparator verifies sortedness in $O(n)$ worst-case time with early short-circuit termination ($O(1)$ best-case on early inversion detection).
2. **Dual-Extremum Invariant Scan**: Instead of two independent passes ($2n-2$ comparisons), elements are compared in adjacent pairs before checking against running minimum and maximum values, reducing hardware comparison cycles by $25\\%$:
   $$\\text{Comparisons} = 3 \\cdot \\left\\lfloor \\frac{n}{2} \\right\\rfloor + (n \\bmod 2)$$
3. **Master Recurrence Engine**: For batch-splitting data processors with recurrence $T(n) = 3T(n/2) + \\Theta(n)$, the critical exponent is $\\log_2 3 \\approx 1.585$. Since $f(n) = O(n^{1.585 - \\epsilon})$ for $\\epsilon \\approx 0.585$, Case 1 of the Master Theorem proves the execution time is strictly $\\Theta(n^{\\log_2 3}) = \\Theta(n^{1.585})$.

**Call Stack Memory Bounds:**
For recursive evaluation $x^n = x \\cdot x^{n-1}$, stack space scales linearly $O(n)$ with risk of memory overflow. Transforming the recurrence to repeated squaring $x^n = (x^{n/2})^2$ yields $T(n) = T(n/2) + O(1)$, compressing stack frames to $O(\\log n)$ depth and execution time to $O(\\log n)$.`
    ),
    note(
      'adsa-unit-2',
      'Unit 2: Divide and Conquer Algorithms',
      'Deconstruct complex computational problems by recursively partitioning into disjoint subproblems, solving each subproblem, and combining their results efficiently.',
      'Divide, Conquer, and Combine paradigm; Binary Search on sorted ranges with invariant maintenance; Merge Sort with stable external merging and auxiliary buffer management; Quick Sort with Hoare and Lomuto partitioning, pivot selection policies, in-place swapping mechanics, best/average case $O(n \\log n)$, and worst-case $O(n^2)$ degeneration.',
      [
        'Formulate the divide-and-conquer paradigm: problem division, base case resolution, and combine phase.',
        'Trace Binary Search bounds $[low, high]$ with midpoint calculation $mid = low + \\lfloor(high - low)/2\\rfloor$ avoiding arithmetic overflow.',
        'Derive the recurrence for Merge Sort: $T(n) = 2T(n/2) + \\Theta(n) \\implies \\Theta(n \\log n)$ time and $O(n)$ auxiliary space.',
        'Explain Hoare partition mechanics with converging two-pointer scans and prove why it performs up to $3\\times$ fewer swaps than Lomuto.',
        'Analyze Quick Sort pivot selection strategies (first, random, median-of-three) to neutralize adversary input permutations.'
      ],
      'Financial Order Book Matching & Large-Scale Trade Reconciliation',
      `An electronic financial exchange matches limit orders across millions of concurrent equity transactions. Incoming buy and sell orders must be matched against a sorted price-time priority ladder within sub-microsecond latency windows.

**Divide-and-Conquer Implementation:**
1. **Logarithmic Order Matching (Binary Search)**:
   - For an order book containing $n = 1,048,576$ live orders, binary search pinpoints the exact price bracket in $\\lceil \\log_2 n \\rceil = 20$ comparisons.
   - Using the overflow-safe midpoint calculation:
     $$\\text{mid} = low + \\frac{high - low}{2}$$
2. **Reconciliation Batch Sorting (Merge Sort vs Quick Sort)**:
   - Daily trade audit logs require stable sorting by secondary timestamps. Merge Sort guarantees strict $O(n \\log n)$ time predictability with zero vulnerability to market volatility patterns, operating in $2T(n/2) + cn$ work per split.
   - For in-memory caching queues, Dual-Pivot Quick Sort with randomized pivot selection partitions arrays in place, achieving $1.386 n \\ln n$ average comparisons while keeping auxiliary memory at $O(\\log n)$ stack frames.`
    ),
    note(
      'adsa-unit-3',
      'Unit 3: Greedy Optimization & Networks',
      'Solve optimization problems by making a sequence of locally optimal choices that lead to a globally optimal solution, verifying the greedy choice property and optimal substructure.',
      'Greedy choice property versus dynamic programming; Dijkstra single-source shortest path (SSSP) algorithm with priority queue relaxation; Prim algorithm for Minimum Spanning Trees (MST) and the Cut Property; Job Sequencing with deadlines and profit maximization; Fractional Knapsack problem using value-to-weight density greedy selection.',
      [
        'Distinguish between problems solvable by greedy methods and those requiring dynamic programming.',
        'Trace Dijkstra algorithm step-by-step: distance array initialization, unvisited vertex extraction, and edge relaxation $d[v] > d[u] + w(u,v)$.',
        'Demonstrate why Dijkstra fails on graphs containing negative-weight edges.',
        'Prove the Cut Property for Minimum Spanning Trees and trace Prim algorithm using an expanding tree set.',
        'Formulate the Job Sequencing problem with disjoint-set or deadline slot arrays to achieve maximal revenue under deadline constraints.'
      ],
      'Autonomous Drone Fleet Routing & Delivery Scheduling Mesh',
      `A logistics provider orchestrates a metropolitan drone delivery network with 50 recharging vertiports and 200 point-to-point flight corridors. Each corridor has variable energy costs due to prevailing head-winds and altitude variances. Concurrently, package dispatch centers must allocate limited drone flight slots before client guaranteed delivery deadlines.

**Greedy Solution Architecture:**
1. **Shortest Recharging Corridor (Dijkstra SSSP)**:
   - Edge weights represent kilowatt-hour expenditure $w(u, v) > 0$.
   - A Min-Indexed Priority Queue extracts the lowest-cost unvisited waypoint in $O(\\log V)$ time.
   - Relaxation condition:
     $$\\text{if } \\text{dist}[u] + w(u, v) < \\text{dist}[v] \\implies \\text{dist}[v] \\leftarrow \\text{dist}[u] + w(u, v)$$
   - Total runtime is bounded by $O((V + E) \\log V)$, computing the optimal energy flight path across the city in under 2 milliseconds.
2. **Infrastructure Cabling Optimization (Prim MST)**:
   - Connecting sensor ground stations with minimal fiber cabling. Prim algorithm iteratively adds the minimum-weight edge connecting the tree to a non-tree vertex, guaranteeing global optimality via the Cut Property in $O(E \\log V)$ time.
3. **Delivery Slot Allocation (Job Sequencing)**:
   - Jobs sorted by descending profit $P_1 \\ge P_2 \\ge \\dots \\ge P_n$. Each delivery is assigned to the latest available time slot before its deadline $d_i$, preventing slot contention and maximizing total delivered revenue.`
    ),
    note(
      'adsa-unit-4',
      'Unit 4: Dynamic Programming Paradigms',
      'Deconstruct optimization problems exhibiting overlapping subproblems and optimal substructure into memoized recursive engines or iterative bottom-up state tables.',
      'Principles of dynamic programming: memoization (top-down) versus tabulation (bottom-up); 0/1 Knapsack problem state recurrence and decision matrix derivation; Floyd-Warshall all-pairs shortest paths algorithm using intermediate vertex stages; Optimal Binary Search Tree (OBST) construction with root decision surfaces and search cost minimization.',
      [
        'Identify optimal substructure and overlapping subproblems in recurrence equations.',
        'Construct the 2D DP decision table for 0/1 Knapsack: $dp[i][w] = \\max(dp[i-1][w], v_i + dp[i-1][w - w_i])$.',
        'Backtrack through a completed dynamic programming table to recover the exact subset of chosen items.',
        'Derive the Floyd-Warshall recurrence $D^{(k)}[i][j] = \\min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])$ and justify its $O(V^3)$ complexity.',
        'Formulate the Optimal Binary Search Tree (OBST) subproblem cost table $e[i, j] = \\min_{i \\le r \\le j} \\{ e[i, r-1] + e[r+1, j] + w(i, j) \\}$.'
      ],
      'Mission-Critical Satellite Payload Optimization & Inter-Station Mesh Routing',
      `An aerospace deployment team is configuring the instrumentation bay of an orbital satellite with a strict payload capacity of $W = 150\\text{ kg}$. Scientists have submitted 8 scientific instruments, each with distinct mass and mission value. Simultaneously, ground control must maintain an All-Pairs Shortest Path communication latency matrix between all 12 orbital relay stations.

**Dynamic Programming Engines:**
1. **0/1 Payload Allocation (0/1 Knapsack)**:
   - Fractional splitting is prohibited (an instrument cannot be partially launched).
   - State Definition: $dp[i][w]$ represents the maximum mission yield obtainable using a subset of instruments $1..i$ within mass limit $w$.
   - Recurrence:
     $$dp[i][w] = \\begin{cases} dp[i-1][w] & \\text{if } w_i > w \\\\ \\max(dp[i-1][w], \\text{value}_i + dp[i-1][w - w_i]) & \\text{if } w_i \\le w \\end{cases}$$
   - Space Optimization: The table is compressed from $O(n \\cdot W)$ to a single 1D row of size $W+1$ traversed in reverse, saving $87\\%$ RAM.
2. **Satellite Mesh Routing (Floyd-Warshall)**:
   - For $V = 12$ relay satellites, Floyd-Warshall computes shortest latencies across all pairs using 3 nested loops in $V^3 = 1,728$ operations:
     $$D[i][j] = \\min(D[i][j], D[i][k] + D[k][j])$$
   - The algorithm gracefully identifies negative-weight cycles if any $D[i][i] < 0$ develops along the main diagonal.`
    ),
    note(
      'adsa-unit-5',
      'Unit 5: Graph Traversal & Backtracking',
      'Explore discrete state-space trees exhaustively using systematic depth-first and breadth-first search, augmented with bounding functions and pruning invariants to eliminate unpromising branches.',
      'Graph traversal fundamentals: Breadth-First Search (BFS) with FIFO queue, Depth-First Search (DFS) with LIFO stack/recursion; state-space tree formulation; backtracking paradigm; Hamiltonian Cycle detection; Graph Coloring problem with chromatic bounds; N-Queens puzzle with diagonal and column conflict matrices; Sum of Subsets with sorted weight pruning.',
      [
        'Trace BFS level-by-level using a FIFO queue and explain its shortest-path property in unweighted graphs.',
        'Trace DFS recursively, identifying tree edges, back edges, forward edges, and cross edges.',
        'Define the backtracking paradigm: live nodes, dead nodes, and bounding/pruning criteria.',
        'Formulate the N-Queens problem and write the safety check condition: $x[i] == x[k] \\lor |x[i] - x[k]| == |i - k|$.',
        'Trace Graph Coloring with $m$ colors and show how backtracking prunes illegal adjacent vertex colorings.',
        'Implement Sum of Subsets pruning: terminate search when running sum plus remaining total is strictly less than target $S$.'
      ],
      'Telecommunications Spectrum Allocation & Automated Microchip Placement',
      `A cellular communications provider must allocate non-interfering frequency channels across 25 overlapping cell towers such that adjacent towers never share the same channel (Graph Coloring). Concurrently, a hardware layout compiler places critical VLSI processor modules on an $N \\times N$ grid with zero diagonal bus interference (N-Queens constraint satisfaction).

**Backtracking & Pruning System:**
1. **Cellular Spectrum Allocation (Graph Coloring)**:
   - Model towers as vertices and overlapping coverage zones as edges.
   - For $m = 4$ available frequency bands, the backtracking algorithm explores color assignments recursively:
     $$\\text{promising}(v, c) \\iff \\forall u \\in \\text{Adj}(v), \\; \\text{color}[u] \\ne c$$
   - Whenever an adjacent tower already uses frequency $c$, the branch is immediately pruned, reducing search space from $4^{25} \\approx 1.12 \\times 10^{15}$ states to under 1,200 visited nodes.
2. **VLSI Module Placement (N-Queens Constraint Satisfaction)**:
   - To place $N = 8$ non-interfering components on an $8 \\times 8$ routing matrix:
   - A placement in row $k$, column $j$ is safe if and only if no previous row $i < k$ shares:
     $$\\text{Column conflict: } x[i] = j \\qquad \\text{Diagonal conflict: } |x[i] - j| = |i - k|$$
   - Backtracking systematically discovers all 92 valid configurations while inspecting only a tiny fraction of the $8^8 = 16,777,216$ theoretical combinations.`
    ),
  ],
};

