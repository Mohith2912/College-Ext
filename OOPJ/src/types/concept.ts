export type BloomsLevel = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';
export type UnitId = 'Unit-1' | 'Unit-2' | 'Unit-3' | 'Unit-4' | 'Unit-5';
export type CourseOutcome = 'CO1' | 'CO2' | 'CO3' | 'CO4' | 'CO5';

export type ConceptCategory = 
  | 'foundations' 
  | 'oop_pillars' 
  | 'jvm_architecture' 
  | 'memory_management' 
  | 'classes_objects' 
  | 'inheritance_polymorphism'
  | 'interfaces_packages'
  | 'exceptions_streams'
  | 'multithreading_concurrency'
  | 'generics_jdbc'
  | 'data_structures' 
  | 'case_studies';

export interface ConceptNode {
  id: string;
  title: string;
  subtitle: string;
  unit: UnitId;
  category: ConceptCategory;
  blooms: BloomsLevel;
  co: CourseOutcome;
  x: number;
  y: number;
  description: string;
  keyPoints: string[];
  codeSnippet?: string;
  outputSnippet?: string;
  realWorldExample?: string;
  examRelevance: string;
  interactiveSimId?: string;
  relatedCaseStudyId?: string;
}

export interface ConceptEdge {
  from: string;
  to: string;
  label: string;
  type: 'inherits' | 'encapsulates' | 'compiles_to' | 'executes_on' | 'manages' | 'implements' | 'uses' | 'dispatches_to';
}

export interface ExamQuestion {
  id: string;
  unit: UnitId;
  part: 'Part A' | 'Part B' | 'Part C';
  questionNumber: string;
  questionText: string;
  co: CourseOutcome;
  blooms: BloomsLevel;
  marks: number;
  markingScheme: { item: string; marks: number }[];
  modelAnswer: string;
  codeExample?: string;
}

export interface FillupExercise {
  id: string;
  title: string;
  unit: UnitId;
  blooms: BloomsLevel;
  scenario: string;
  instructions: string;
  codeTemplate: string;
  blanks: {
    id: string;
    expected: string[];
    hint: string;
    placeholder: string;
  }[];
  optionsPool: string[];
  expectedOutput: string;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  courseOutcome: CourseOutcome;
  blooms: BloomsLevel;
  unit: UnitId;
  realWorldScenario: string;
  problemStatement: string;
  keyOOPConcepts: string[];
  markingDistribution: { criterion: string; marks: number }[];
  totalMarks: number;
  type: 'electricity_bill' | 'employee_payroll' | 'oop_modularity' | 'jvm_garbage_collection' | 'string_processor';
}

export interface DragDropChallenge {
  id: string;
  title: string;
  description: string;
  unit: UnitId;
  blooms: BloomsLevel;
  targetSlots: {
    id: string;
    label: string;
    hint: string;
    category: string;
    acceptId: string;
  }[];
  draggableItems: {
    id: string;
    label: string;
    sublabel?: string;
    badge?: string;
  }[];
  explanation: string;
}
