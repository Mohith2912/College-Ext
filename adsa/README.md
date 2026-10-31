# Algorithmic Workbench: Interactive DAA Virtual Laboratory

A production-grade, interactive educational laboratory and workbench for **Design and Analysis of Algorithms (DAA)**, covering the complete academic syllabus without static question-and-answer fillers.

---

## 1. Curriculum Architecture & Syllabus Coverage

Every unit and algorithm corresponds directly to the source syllabus:

### **Unit 1: Foundations & Performance Analysis**
- **Linear Search & Asymptotic Bounds**: Sequential probe, best-case $O(1)$, worst-case $O(n)$, space $O(1)$ (`LinearSearch.java`).
- **Min-Max Single Traversal**: Simultaneous extremum scan, strict tight bound $\Theta(n)$, space $O(1)$ (`MinMax.java`).
- **Array Sorted Order Verifier**: Pairwise inversion test, instant short-circuiting best-case $O(1)$ vs worst-case $O(n)$ (`CheckSorted.java`).
- **Recursive Power & Call Stack**: Activation frame stack explorer for $x^n$, recurrence $T(n) = T(n-1) + 1 \implies O(n)$ time & $O(n)$ frame memory (`PowerRecursion.java`).
- **Asymptotic Theory & Master Theorem Workbench**: Live solver for the general divide-and-conquer recurrence $T(n) = a T(n/b) + f(n)$ comparing $\log_b a$ against polynomial degree $k$.

### **Unit 2: Divide and Conquer Algorithms**
- **Binary Search Divide & Conquer**: Halving search window $[low..high]$, midpoint comparison, $T(n) = T(n/2) + O(1) \implies O(\log n)$ (`BinarySearch.java`).
- **Merge Sort Divide & Conquer**: Recursive split tree, stable merge into temporary buffer, $T(n) = 2T(n/2) + O(n) \implies \Theta(n \log n)$ (`Mergesort2.java`).
- **Quick Sort Partitioning**: Tony Hoare in-place partition, pivot selection, start/end pointer scans, average $O(n \log n)$ vs worst-case $O(n^2)$ (`quicksort1.java`).

### **Unit 3: Greedy Optimization & Networks**
- **Dijkstra's Single Source Shortest Path (SSSP)**: Greedy relaxation on non-negative edge weighted graphs, tentative distance table, visited set lock-in.
- **Prim's Minimum Spanning Tree (MST)**: Greedy cut property, minimum key edge connecting to growing tree, cycle prevention, exactly $V - 1$ edges.
- **Job Scheduling with Deadlines**: Greedy descending profit ranking, latest free slot search prior to deadline, total profit maximization (`Jobsequence.java`).
- **Fractional Knapsack Optimization**: Continuous resource allocation, Value/Weight ratio sorting, fractional slice packing (`Knapsack.java`).

### **Unit 4: Dynamic Programming Paradigms**
- **0/1 Knapsack Dynamic Programming**: Indivisible items, 2D state matrix $dp[i][w] = \max(take, dont)$, cell derivation arrows, backtracking chosen items (`knadum.java`).
- **All-Pairs Shortest Path (Floyd-Warshall)**: Triple loop pivot exploration $k=0..n-1$, intermediate detour relaxation $dp[i][j] = \min(dp[i][j], dp[i][k] + dp[k][j])$ (`Apsp.java`).
- **Optimal Binary Search Tree (OBST)**: Key frequency weighting, subproblem lengths $len=2..n$, root candidate cost minimizer (`Obst.java`).

### **Unit 5: Graph Traversal & Backtracking**
- **Breadth-First Search (BFS)**: Level-order FIFO Queue buffer, boolean visited array, adjacency matrix exploration (`BFS.java`).
- **Depth-First Search (DFS)**: Deep branch LIFO Stack buffer, backtracking retreat, component traversal (`Dffs.java`).
- **Hamiltonian Cycle Backtracking**: Permutation exploration, `isSafe` edge check, state restoration `path[pos] = -1`, return cycle closure check (`Main.java`).
- **Graph Coloring Backtracking**: Chromatic constraint satisfaction, $m$ colors palette, adjacent vertex conflict avoidance, rollback `color[v] = 0` (`GraphColoring.java`).
- **N-Queens Backtracking**: $N \times N$ chessboard, column and diagonal attack ray elimination, recursive row placement (`NQueens.java`).
- **Sum of Subsets Backtracking**: Binary inclusion/exclusion state-space tree, bounding prune condition `sum > target`, subset backtracking (`SumOfSubset.java`).

---

## 2. Interactive Features

1. **Step-by-Step Execution Engine**:
   - Play, Pause, Step Next, Step Backward, Reset, Run to Completion.
   - Variable scrub slider with instant state jumping.
   - 4-speed control: $0.5\times$, $1\times$, $2\times$, $5\times$.

2. **Synchronized Java Code Highlighting**:
   - Displays the exact Java source code from the syllabus.
   - Active line highlighted in real-time matching the current operation.
   - Natural language description explaining the active line execution context.

3. **Live Register & Metrics Inspector**:
   - Live variable map (`i`, `j`, `k`, `low`, `high`, `mid`, `pivot`, `u`, `v`, `weight`, `profit`, etc.).
   - Exact counts for comparisons, swaps, operations, and call stack depth.

4. **Dedicated Visualizer Stages**:
   - **Array Visualizer**: Card heights, multi-pointer arrows (`i`, `pivot`, `start`, `end`, `low`, `mid`, `high`), active subarray highlighting, temporary merge buffer.
   - **Graph Visualizer**: Dynamic SVG canvas with nodes and weighted edges, Dijkstra tentative distance table, BFS queue / DFS stack buffers, MST edge highlights.
   - **DP Table Visualizer**: 2D tabulation grid with row/column headers, active cell coordinates, referenced subproblem cell tracking, Floyd-Warshall intermediate pivot indicator.
   - **Chessboard Visualizer**: Interactive $4 \times 4$ to $8 \times 8$ board with royal queen markers, attack ray diagnostics, solutions gallery.
   - **Timeline Visualizer**: Discrete 1-unit time slots with occupied jobs and descending profit candidate queue.
   - **Knapsack Visualizer**: Continuous capacity chamber gauge with fill percentages and item ratio breakdowns.
   - **Call Stack Visualizer**: Activation frames growing with depth, base condition detection, and returned value unwinding.
   - **Subset Tree Visualizer**: State-space branch trail with sum progress meter and matching subset list.

5. **Integrated Workbench Tools**:
   - **Master Theorem Recurrence Solver**: Visualizes $T(n) = a T(n/b) + f(n)$ with interactive sliders for $a$, $b$, and $k$.
   - **Asymptotic Growth Laboratory**: Sliders for $n \in [2..64]$ comparing $O(1), O(\log n), O(n), O(n \log n), O(n^2), O(n^3), O(2^n), O(n!)$.
   - **Quick Search Modal**: Keyboard-accessible ($\text{Cmd+K}$) instant search across all 17 labs.
   - **Industry Case Studies**: Real-world engineering scenarios for each algorithm (Automotive CAN bus, High-Frequency Trading, Satellite payloads, Autonomous vehicle GPS, Cellular radio spectrum).

---

## 3. Technology Stack

- **Framework**: React 19 + TypeScript
- **Build System**: Vite 8 + `@tailwindcss/vite` (Tailwind CSS v4)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans (Display), DM Sans (Prose), JetBrains Mono (Code/Tabular Numbers)
- **Verification**: Built-in automated test suite covering all 19 algorithm trace engines (`npm run build`, `npm run lint`).
