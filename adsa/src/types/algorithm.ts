export type UnitId = 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5';

export type LabId =
  // Unit 1
  | 'linear-search'
  | 'min-max'
  | 'check-sorted'
  | 'power-recursion'
  | 'asymptotic-analysis'
  // Unit 2
  | 'binary-search'
  | 'merge-sort'
  | 'quick-sort'
  // Unit 3
  | 'dijkstra-sssp'
  | 'prim-mst'
  | 'job-sequencing'
  | 'fractional-knapsack'
  // Unit 4
  | 'knapsack-01-dp'
  | 'all-pairs-shortest-path'
  | 'optimal-bst'
  // Unit 5
  | 'bfs-traversal'
  | 'dfs-traversal'
  | 'hamiltonian-cycle'
  | 'graph-coloring'
  | 'n-queens'
  | 'sum-of-subsets';

export type OperationPhase =
  | 'init'
  | 'compare'
  | 'swap'
  | 'visit'
  | 'select'
  | 'relax'
  | 'backtrack'
  | 'found'
  | 'prune'
  | 'done';

export interface ComplexitySpec {
  timeBest: string;
  timeAvg: string;
  timeWorst: string;
  space: string;
  recurrence?: string;
  justification: string;
}

export interface CaseStudySpec {
  title: string;
  industry: string;
  scenario: string;
  problem: string;
  algorithmicSolution: string;
  realWorldImpact: string;
}

export interface LabMeta {
  id: LabId;
  unitId: UnitId;
  title: string;
  category: string;
  paradigm: string;
  badge: string;
  summary: string;
  syllabusReference: string;
  complexity: ComplexitySpec;
  keyInvariants: string[];
  caseStudy: CaseStudySpec;
  defaultInputDescription: string;
}

export interface UnitMeta {
  id: UnitId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  labCount: number;
  labs: LabId[];
}

export interface AlgorithmTraceStep<T = unknown> {
  stepIndex: number;
  description: string;
  activeLine: number; // 1-based index in the Java snippet
  phase: OperationPhase;
  data: T;
  variables: Record<string, string | number | boolean | null>;
  metrics: {
    comparisons?: number;
    swaps?: number;
    operations?: number;
    recursionDepth?: number;
    backtracks?: number;
  };
}

export interface ExecutionTrace<T = unknown> {
  steps: AlgorithmTraceStep<T>[];
  totalSteps: number;
  finalMetrics: {
    comparisons: number;
    swaps: number;
    operations: number;
    recursionDepth?: number;
    backtracks?: number;
  };
}
