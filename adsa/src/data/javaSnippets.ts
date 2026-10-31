import { LabId } from '../types/algorithm';

export interface CodeDefinition {
  className: string;
  sourceFile: string;
  code: string;
  lineMapping: Record<number, string>; // Line number -> human explanation
}

export const JAVA_SNIPPETS: Record<LabId, CodeDefinition> = {
  'linear-search': {
    className: 'LinearSearch',
    sourceFile: 'LinearSearch.java',
    code: `import java.util.Scanner;
public class LinearSearch {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int key = sc.nextInt();
    int pos = -1;
    for(int i = 0; i < n; i++) {
      if(arr[i] == key) {
        pos = i;
        break;
      }
    }
    if(pos == -1) System.out.println("Element not found");
    else System.out.println("Element found at index " + pos);
    sc.close();
  }
}`,
    lineMapping: {
      10: 'Traversing the array from index 0 to n-1',
      11: 'Comparing current array element arr[i] with target key',
      12: 'Match found! Recording index pos = i',
      13: 'Breaking early from search loop',
      16: 'Determining if element was found or absent',
    },
  },

  'min-max': {
    className: 'MinMax',
    sourceFile: 'MinMax.java',
    code: `import java.util.Scanner;
public class MinMax {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int min = arr[0];
    int max = arr[0];
    for(int i = 1; i < n; i++) {
      if(arr[i] < min)
        min = arr[i];
      if(arr[i] > max)
        max = arr[i];
    }
    System.out.println("Minimum = " + min);
    System.out.println("Maximum = " + max);
    sc.close();
  }
}`,
    lineMapping: {
      8: 'Initializing min = arr[0] and max = arr[0]',
      10: 'Single linear traversal through array from index 1 to n-1',
      11: 'Checking if arr[i] is strictly less than current min',
      12: 'Updating min = arr[i]',
      13: 'Checking if arr[i] is strictly greater than current max',
      14: 'Updating max = arr[i]',
    },
  },

  'check-sorted': {
    className: 'CheckSorted',
    sourceFile: 'CheckSorted.java',
    code: `import java.util.Scanner;
public class CheckSorted {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
    boolean sorted = true;
    for(int i = 0; i < n - 1; i++) {
      if(arr[i] > arr[i + 1]) {
        sorted = false;
        break;
      }
    }
    if(sorted) System.out.println("Array is Sorted");
    else System.out.println("Array is Not Sorted");
    sc.close();
  }
}`,
    lineMapping: {
      8: 'Initializing sorted flag to true',
      9: 'Comparing every adjacent pair (i, i+1)',
      10: 'Condition arr[i] > arr[i+1] checks for inversion violation',
      11: 'Marking sorted = false on first inversion violation',
      12: 'Early break: Best case is O(1) if first pair fails',
    },
  },

  'power-recursion': {
    className: 'PowerRecursion',
    sourceFile: 'PowerRecursion.java',
    code: `import java.util.Scanner;
public class PowerRecursion {
  static long power(long x, int n) {
    if(n == 0)
      return 1;
    return x * power(x, n - 1);
  }
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    long x = sc.nextLong();
    int n = sc.nextInt();
    System.out.println(power(x, n));
    sc.close();
  }
}`,
    lineMapping: {
      4: 'Base case check: if exponent n == 0, return 1',
      6: 'Recursive step: T(n) = T(n-1) + 1; compute x * power(x, n-1)',
    },
  },

  'asymptotic-analysis': {
    className: 'AsymptoticTheory',
    sourceFile: 'RecurrenceMaster.java',
    code: `// General Divide and Conquer Recurrence Relation:
// T(n) = a * T(n / b) + f(n)
// where:
// a = number of subproblems generated (a >= 1)
// n/b = size of each subproblem (b > 1)
// f(n) = cost of dividing and combining subproblems
public class RecurrenceRelation {
  public static double solveComplexity(int a, int b, int k) {
    // Compares log_b(a) with polynomial degree k of f(n) = O(n^k)
    double logBOfA = Math.log(a) / Math.log(b);
    return logBOfA;
  }
}`,
    lineMapping: {
      2: 'General recurrence formula T(n) = a*T(n/b) + f(n)',
      9: 'Evaluating critical exponent log_b(a) vs polynomial power k',
    },
  },

  'binary-search': {
    className: 'BinarySearch',
    sourceFile: 'BinarySearch.java',
    code: `import java.util.Scanner;
public class BinarySearch {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int key = sc.nextInt();
    int low = 0, high = n - 1;
    boolean found = false;
    while(low <= high) {
      int mid = (low + high) / 2;
      if(arr[mid] == key) {
        System.out.println("Element found at index " + mid);
        found = true;
        break;
      }
      else if(key < arr[mid])
        high = mid - 1;
      else
        low = mid + 1;
    }
    if(!found) System.out.println("Element not found");
    sc.close();
  }
}`,
    lineMapping: {
      9: 'Initial search bounds: low = 0, high = n - 1',
      11: 'Divide step: calculate midpoint mid = (low + high) / 2',
      12: 'Conquer: check if middle element matches key',
      18: 'If key < arr[mid], search left half: high = mid - 1',
      20: 'If key > arr[mid], search right half: low = mid + 1',
    },
  },

  'merge-sort': {
    className: 'Mergesort2',
    sourceFile: 'Mergesort2.java',
    code: `public class Mergesort2 {
  public static void conquer(int arr[], int left, int mid, int right) {
    int merge[] = new int[right - left + 1];
    int a = left;
    int b = mid + 1;
    int x = 0;
    while(a <= mid && b <= right) {
      if(arr[a] <= arr[b]) {
        merge[x++] = arr[a++];
      } else {
        merge[x++] = arr[b++];
      }
    }
    while(a <= mid) merge[x++] = arr[a++];
    while(b <= right) merge[x++] = arr[b++];
    for(int i = 0, j = left; i < merge.length; i++, j++) {
      arr[j] = merge[i];
    }
  }
  public static void divide(int arr[], int left, int right) {
    if(left >= right) return;
    int mid = (left + right) / 2;
    divide(arr, left, mid);
    divide(arr, mid + 1, right);
    conquer(arr, left, mid, right);
  }
}`,
    lineMapping: {
      3: 'Allocate temporary merge buffer of size (right - left + 1)',
      7: 'Compare elements from left and right subarrays (arr[a] <= arr[b])',
      8: 'Copy smaller element into merge buffer (preserving stability)',
      15: 'Copy remaining elements from left or right half',
      17: 'Write merged elements back into original array',
      23: 'Divide step: split array into left and right halves around mid',
      26: 'Conquer step: merge the two sorted halves into one',
    },
  },

  'quick-sort': {
    className: 'quicksort1',
    sourceFile: 'quicksort1.java',
    code: `public class quicksort1 {
  public static void quicksort(int arr[], int lb, int ub) {
    if(lb < ub) {
      int loc = partition(arr, lb, ub);
      quicksort(arr, lb, loc - 1);
      quicksort(arr, loc + 1, ub);
    }
  }
  static int partition(int arr[], int lb, int ub) {
    int pivot = arr[lb];
    int start = lb;
    int end = ub;
    while(start < end) {
      while(start < ub && arr[start] <= pivot) start++;
      while(end > lb && arr[end] > pivot) end--;
      if(start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
      }
    }
    int temp = arr[lb];
    arr[lb] = arr[end];
    arr[end] = temp;
    return end;
  }
}`,
    lineMapping: {
      4: 'Partitioning array around pivot element and obtaining pivot index loc',
      5: 'Recursive quicksort on left partition [lb .. loc-1]',
      6: 'Recursive quicksort on right partition [loc+1 .. ub]',
      9: 'Selecting first element arr[lb] as pivot',
      14: 'Scan right until finding element strictly greater than pivot',
      15: 'Scan left until finding element less than or equal to pivot',
      17: 'Swap arr[start] and arr[end] when pointers have not crossed',
      22: 'Swap pivot arr[lb] with arr[end] into its correct final sorted position',
    },
  },

  'dijkstra-sssp': {
    className: 'Dijkstra',
    sourceFile: 'Dijkstra.java',
    code: `public class Dijkstra {
  // Single Source Shortest Path for non-negative edge weights
  public static void dijkstra(int[][] graph, int src, int V) {
    int[] dist = new int[V];
    boolean[] visited = new boolean[V];
    for (int i = 0; i < V; i++) dist[i] = Integer.MAX_VALUE;
    dist[src] = 0;
    for (int count = 0; count < V - 1; count++) {
      int u = minDistance(dist, visited, V);
      visited[u] = true;
      for (int v = 0; v < V; v++) {
        if (!visited[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE
            && dist[u] + graph[u][v] < dist[v]) {
          dist[v] = dist[u] + graph[u][v]; // Relaxation
        }
      }
    }
  }
}`,
    lineMapping: {
      6: 'Initialize all distances to infinity, source distance to 0',
      9: 'Greedy choice: select unvisited vertex u with minimum tentative distance',
      10: 'Mark vertex u as visited (finalized shortest path)',
      13: 'Relaxation: if path through u to v is shorter, update dist[v] = dist[u] + weight',
    },
  },

  'prim-mst': {
    className: 'PrimMST',
    sourceFile: 'PrimMST.java',
    code: `public class PrimMST {
  // Minimum Spanning Tree with V vertices and V - 1 edges
  public static void primMST(int[][] graph, int V) {
    int[] key = new int[V];
    int[] parent = new int[V];
    boolean[] inMST = new boolean[V];
    for (int i = 0; i < V; i++) key[i] = Integer.MAX_VALUE;
    key[0] = 0; parent[0] = -1;
    for (int count = 0; count < V - 1; count++) {
      int u = minKey(key, inMST, V);
      inMST[u] = true;
      for (int v = 0; v < V; v++) {
        if (graph[u][v] != 0 && !inMST[v] && graph[u][v] < key[v]) {
          parent[v] = u;
          key[v] = graph[u][v]; // Update minimum connecting edge weight
        }
      }
    }
  }
}`,
    lineMapping: {
      8: 'Start with initial vertex 0 with key weight 0',
      10: 'Greedy choice: pick vertex u with minimum key edge connecting to MST',
      11: 'Add vertex u to the Minimum Spanning Tree',
      14: 'Update key values of adjacent vertices not yet in MST',
    },
  },

  'job-sequencing': {
    className: 'Jobsequence',
    sourceFile: 'Jobsequence.java',
    code: `public class Jobsequence {
  public static void main(String[] args) {
    // Sort jobs descending by profit
    // Find maximum deadline
    boolean slot[] = new boolean[n];
    int profit = 0;
    for(int i = 0; i < n; i++) {
      for(int j = Math.min(d[i], n) - 1; j >= 0; j--) {
        if(!slot[j]) {
          slot[j] = true;
          System.out.print(id[i] + " ");
          profit += p[i];
          break;
        }
      }
    }
    System.out.println("Profit = " + profit);
  }
}`,
    lineMapping: {
      6: 'Iterate through jobs sorted in descending order of profit',
      7: 'Greedy strategy: inspect latest available slot before job deadline',
      8: 'If slot j is free, assign the job to this slot',
      10: 'Accumulate job profit into total profit and break to next job',
    },
  },

  'fractional-knapsack': {
    className: 'Knapsack',
    sourceFile: 'Knapsack.java',
    code: `public class Knapsack {
  public static void main(String[] args) {
    // Ratio = Value / Weight
    // Sort items in descending order of ratio
    double cap = sc.nextDouble();
    double max = 0;
    for(int i = 0; i < n; i++) {
      if(w[i] <= cap) {
        max += v[i];
        cap -= w[i];
      } else {
        max += r[i] * cap; // Take fraction
        break;
      }
    }
    System.out.println(max);
  }
}`,
    lineMapping: {
      7: 'Examine items in descending order of Value / Weight ratio',
      8: 'If entire item fits in remaining capacity, include it 100%',
      12: 'Otherwise, take the remaining fraction (r[i] * cap) to fill knapsack completely',
    },
  },

  'knapsack-01-dp': {
    className: 'knadum',
    sourceFile: 'knadum.java',
    code: `public class knadum {
  public static void main(String[] args) {
    int dp[][] = new int[n + 1][cap + 1];
    for (int i = 1; i <= n; i++) {
      for (int w = 1; w <= cap; w++) {
        if (weight[i - 1] <= w) {
          int take = value[i - 1] + dp[i - 1][w - weight[i - 1]];
          int dont = dp[i - 1][w];
          dp[i][w] = Math.max(take, dont);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
    System.out.println("Profit = " + dp[n][cap]);
  }
}`,
    lineMapping: {
      3: 'Initialize (n+1) x (cap+1) DP matrix with zeros',
      6: 'Item fits: compute value if included (take) vs excluded (dont)',
      8: 'dp[i][w] = max(take, dont) stores optimal profit for subproblem',
      10: 'Item exceeds current capacity w: must inherit dp[i-1][w]',
    },
  },

  'all-pairs-shortest-path': {
    className: 'Apsp',
    sourceFile: 'Apsp.java',
    code: `public class Apsp {
  public static void main(String[] args) {
    int INF = 999;
    // dp[i][j] holds shortest distance from i to j
    for (int k = 0; k < n; k++) {
      for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
          if (dp[i][j] > dp[i][k] + dp[k][j]) {
            // New path via intermediate vertex k is strictly smaller
            dp[i][j] = dp[i][k] + dp[k][j];
          }
        }
      }
    }
  }
}`,
    lineMapping: {
      5: 'Outer pivot loop: consider vertex k as intermediate waypoint',
      8: 'Relaxation check: is path i -> k -> j shorter than direct path i -> j?',
      10: 'Update dp[i][j] with shorter distance via vertex k',
    },
  },

  'optimal-bst': {
    className: 'Obst',
    sourceFile: 'Obst.java',
    code: `public class Obst {
  public static void main(String[] args) {
    int dp[][] = new int[n][n];
    for (int i = 0; i < n; i++) dp[i][i] = freq[i];
    for (int len = 2; len <= n; len++) {
      for (int i = 0; i <= n - len; i++) {
        int j = i + len - 1;
        int sum = 0;
        for (int k = i; k <= j; k++) sum += freq[k];
        dp[i][j] = Integer.MAX_VALUE;
        for (int r = i; r <= j; r++) {
          int left = (r > i) ? dp[i][r - 1] : 0;
          int right = (r < j) ? dp[r + 1][j] : 0;
          int cost = left + sum + right;
          if (cost < dp[i][j]) dp[i][j] = cost;
        }
      }
    }
    System.out.println("Minimum cost is: " + dp[0][n - 1]);
  }
}`,
    lineMapping: {
      4: 'Base cases: single key subtrees have search cost equal to their frequency',
      5: 'Iterate over subproblem lengths len from 2 to n',
      11: 'Try each key r in [i..j] as root of optimal subtree',
      14: 'Cost = cost(left subtree) + cost(right subtree) + sum of frequencies',
      15: 'Store minimum search cost among all root choices in dp[i][j]',
    },
  },

  'bfs-traversal': {
    className: 'BFS',
    sourceFile: 'BFS.java',
    code: `import java.util.*;
public class BFS {
  public static void main(String[] args) {
    boolean[] visited = new boolean[n];
    Queue<Integer> q = new LinkedList<>();
    q.add(start);
    while (!q.isEmpty()) {
      int current = q.remove();
      if (visited[current] == false) {
        System.out.print(current + " ");
        visited[current] = true;
        for (int i = 0; i < n; i++) {
          if (graph[current][i] == 1) {
            q.add(i);
          }
        }
      }
    }
  }
}`,
    lineMapping: {
      6: 'Enqueue start vertex into FIFO queue',
      8: 'Dequeue current vertex from front of queue',
      9: 'Check if current vertex is not yet visited',
      11: 'Mark vertex as visited and print it to traversal sequence',
      13: 'Scan adjacency matrix: enqueue all unvisited neighbors',
    },
  },

  'dfs-traversal': {
    className: 'Dffs',
    sourceFile: 'Dffs.java',
    code: `import java.util.*;
public class Dffs {
  public static void main(String[] args) {
    boolean[] visited = new boolean[n];
    Stack<Integer> s = new Stack<>();
    s.push(start);
    while (!s.isEmpty()) {
      int current = s.pop();
      if (visited[current] == false) {
        System.out.print(current + " ");
        visited[current] = true;
        for (int i = 0; i < n; i++) {
          if (graph[current][i] == 1) {
            s.push(i);
          }
        }
      }
    }
  }
}`,
    lineMapping: {
      6: 'Push start vertex onto LIFO stack',
      8: 'Pop top vertex from stack',
      9: 'Check if current vertex has not been visited',
      11: 'Mark vertex visited and record in depth-first order',
      13: 'Inspect adjacency matrix and push adjacent neighbors to stack',
    },
  },

  'hamiltonian-cycle': {
    className: 'Main',
    sourceFile: 'Main.java',
    code: `public class Main {
  static boolean isSafe(int v, int pos) {
    if (graph[path[pos - 1]][v] == 0) return false;
    for (int i = 0; i < pos; i++) {
      if (path[i] == v) return false;
    }
    return true;
  }
  static void hamiltonian(int pos) {
    if (pos == n) {
      if (graph[path[n - 1]][path[0]] == 1) {
        // Valid Hamiltonian Cycle found!
        return;
      }
    }
    for (int v = 1; v < n; v++) {
      if (isSafe(v, pos)) {
        path[pos] = v;
        hamiltonian(pos + 1);
        path[pos] = -1; // Backtracking
      }
    }
  }
}`,
    lineMapping: {
      3: 'isSafe: verifies an edge exists between path[pos-1] and candidate vertex v',
      4: 'isSafe: verifies candidate vertex v is not already in current path',
      10: 'Base condition: all n vertices visited; check if edge connects last vertex back to first',
      17: 'Try candidate vertex v; if safe, advance to pos + 1',
      20: 'Backtracking step: reset path[pos] = -1 to try alternative branches',
    },
  },

  'graph-coloring': {
    className: 'GraphColoring',
    sourceFile: 'GraphColoring.java',
    code: `public class GraphColoring {
  static boolean isSafe(int v, int c) {
    for (int i = 0; i < n; i++) {
      if (graph[v][i] == 1 && color[i] == c) return false;
    }
    return true;
  }
  static void graphColor(int v) {
    if (v == n) {
      // Valid coloring configuration found!
      return;
    }
    for (int c = 1; c <= m; c++) {
      if (isSafe(v, c)) {
        color[v] = c;
        graphColor(v + 1);
        color[v] = 0; // Backtracking
      }
    }
  }
}`,
    lineMapping: {
      3: 'isSafe: check that no adjacent neighbor of v already shares color c',
      9: 'Base case: all n vertices have been assigned colors legally',
      13: 'Try each color c from 1 to m for vertex v',
      16: 'Backtracking step: reset color[v] = 0 if child branch leads to conflict',
    },
  },

  'n-queens': {
    className: 'NQueens',
    sourceFile: 'NQueens.java',
    code: `public class NQueens {
  static boolean isSafe(int row, int col) {
    for (int i = 0; i < row; i++)
      if (board[i][col] == 1) return false;
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] == 1) return false;
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
      if (board[i][j] == 1) return false;
    return true;
  }
  static boolean solve(int row) {
    if (row == n) return true;
    for (int col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 1;
        if (solve(row + 1)) return true;
        board[row][col] = 0; // Backtracking
      }
    }
    return false;
  }
}`,
    lineMapping: {
      3: 'Check column attack conflict in previous rows',
      5: 'Check upper-left diagonal attack ray',
      7: 'Check upper-right diagonal attack ray',
      11: 'Base condition: row == n means all queens safely placed',
      15: 'Tentatively place queen at board[row][col] = 1',
      17: 'Backtracking step: remove queen board[row][col] = 0 on conflict',
    },
  },

  'sum-of-subsets': {
    className: 'SumOfSubset',
    sourceFile: 'SumOfSubset.java',
    code: `public class SumOfSubset {
  static void sumsubsets(int arr[], int index, int sum, int target, ArrayList<Integer> subset) {
    if (sum == target) {
      System.out.println(subset);
      return;
    }
    if (index == arr.length || sum > target) {
      return; // Prune branch
    }
    subset.add(arr[index]);
    sumsubsets(arr, index + 1, sum + arr[index], target, subset);
    subset.remove(subset.size() - 1); // Backtracking
    sumsubsets(arr, index + 1, sum, target, subset);
  }
}`,
    lineMapping: {
      3: 'Goal check: if current sum equals target, record valid subset',
      7: 'Pruning / Bounding condition: if sum exceeds target or elements exhausted',
      10: 'Include arr[index] in subset and recurse to index + 1',
      12: 'Backtracking step: remove arr[index] to explore branch excluding it',
      13: 'Recurse exploring exclusion branch with sum unchanged',
    },
  },
};
