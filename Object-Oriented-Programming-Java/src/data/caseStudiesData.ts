import { CaseStudy } from '../types/concept';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'electricity_bill',
    title: 'Electricity Tariff Billing Engine',
    courseOutcome: 'CO1',
    blooms: 'K5',
    unit: 'Unit-1',
    realWorldScenario: 'Municipal electrical utility automated tariff assessment. Consumers receive monthly bills calculated through progressive non-linear consumption slabs to encourage conservation.',
    problemStatement: 'Develop a Java application with consumer number, consumer name, previous month reading, and current month reading. Compute the bill amount using tiered tariff: First 100 units @ Rs. 1/unit; 101-200 units @ Rs. 2.50/unit; 201-500 units @ Rs. 4/unit; >501 units @ Rs. 6/unit.',
    keyOOPConcepts: [
      'Encapsulation of consumer meter readings',
      'Non-linear conditional branching (if-else-if)',
      'Arithmetic operators & floating-point precision',
      'Scanner input validation'
    ],
    markingDistribution: [
      { criterion: 'Import Statement (java.util.Scanner)', marks: 1 },
      { criterion: 'Class Declaration & Data Members', marks: 2 },
      { criterion: 'Scanner Object & Accepting Input', marks: 3 },
      { criterion: 'Units Calculation (current - previous)', marks: 1 },
      { criterion: 'Tiered Tariff Logic (4 Slabs)', marks: 5 },
      { criterion: 'Display Output & Formatting', marks: 2 },
      { criterion: 'Syntax & Coding Standards', marks: 1 }
    ],
    totalMarks: 15,
    type: 'electricity_bill'
  },
  {
    id: 'employee_payroll',
    title: 'Enterprise Payroll & Pay Slip System',
    courseOutcome: 'CO1',
    blooms: 'K5',
    unit: 'Unit-1',
    realWorldScenario: 'Enterprise HR resource management software for salary processing. Calculates statutory deductions (PF, Staff Club) and standard allowances (DA, HRA) from employee Basic Pay.',
    problemStatement: 'Create an Employee class with Emp_name, Emp_id, Address, Mail_id, Mobile_no as members. Add Basic Pay (BP) as member with 97% of BP as DA, 10% of BP as HRA, 12% of BP as PF, and 0.1% of BP for staff club fund. Generate pay slips with gross and net salary.',
    keyOOPConcepts: [
      'Data modeling with class attributes',
      'Financial percentage calculations',
      'Separation of Gross (BP+DA+HRA) vs Net salary',
      'Formatted tabular console presentation'
    ],
    markingDistribution: [
      { criterion: 'Import Statement & Scanner setup', marks: 1 },
      { criterion: 'Employee Class & Data Members', marks: 2 },
      { criterion: 'Accepting Input (ID, Name, BP)', marks: 2 },
      { criterion: 'Allowance Calculation (DA 97%, HRA 10%)', marks: 3 },
      { criterion: 'Deductions Calculation (PF 12%, Club 0.1%)', marks: 2 },
      { criterion: 'Gross & Net Salary Computation', marks: 2 },
      { criterion: 'Pay Slip Formatting & Output', marks: 1 },
      { criterion: 'Syntax, Class Structure & Standards', marks: 2 }
    ],
    totalMarks: 15,
    type: 'employee_payroll'
  },
  {
    id: 'oop_modularity',
    title: 'Modular Architecture: Rectangle & AreaCalculator',
    courseOutcome: 'CO2',
    blooms: 'K5',
    unit: 'Unit-2',
    realWorldScenario: 'Software engineering decoupled architectural pattern. Demonstrates Single Responsibility Principle by decoupling geometric dimension storage from external presentation consumers.',
    problemStatement: 'Develop two Java classes: Rectangle (with length, width, constructor, calculateArea()) and AreaCalculator (which accepts a Rectangle object and displays the calculated area). Analyze their interaction and justify how the design promotes modularity and code reusability.',
    keyOOPConcepts: [
      'Class & Object separation of concerns',
      'Passing objects as parameters by reference',
      'Constructor initialization with "this" keyword',
      'Encapsulation and loose coupling'
    ],
    markingDistribution: [
      { criterion: 'OOP Design Concepts & Justification', marks: 3 },
      { criterion: 'Interaction Between Classes (Parameter Passing)', marks: 4 },
      { criterion: 'Rectangle Class Implementation', marks: 4 },
      { criterion: 'AreaCalculator Class Implementation', marks: 2 },
      { criterion: 'Main Method & Object Instantiation', marks: 2 }
    ],
    totalMarks: 15,
    type: 'oop_modularity'
  },
  {
    id: 'string_processor',
    title: 'Sentence String Processing Engine',
    courseOutcome: 'CO2',
    blooms: 'K5',
    unit: 'Unit-2',
    realWorldScenario: 'Natural Language Processing tokenization and text analysis utility. Processes natural prose for word token frequency, longest token discovery, and memory-efficient in-place inversion.',
    problemStatement: 'Design and implement a Java program that processes a given sentence to count the number of words, identify the longest word, and reverse the entire sentence. Analyze output and justify StringBuilder efficiency over manual concatenation.',
    keyOOPConcepts: [
      'String splitting with regex tokenizer split(" ")',
      'Iterative maximum search algorithm',
      'StringBuilder mutable buffer & reverse() method',
      'Time complexity O(n) vs immutable String churn'
    ],
    markingDistribution: [
      { criterion: 'String Concepts & Method Analysis', marks: 3 },
      { criterion: 'Efficiency Justification (StringBuilder vs String)', marks: 3 },
      { criterion: 'Input & Word Tokenization (split)', marks: 3 },
      { criterion: 'Longest Word Iterative Logic', marks: 3 },
      { criterion: 'Sentence Reversal & Output Display', marks: 3 }
    ],
    totalMarks: 15,
    type: 'string_processor'
  },
  {
    id: 'jvm_garbage_collection',
    title: 'JVM Generational Memory & Garbage Collection',
    courseOutcome: 'CO2',
    blooms: 'K4',
    unit: 'Unit-2',
    realWorldScenario: 'Enterprise JVM performance tuning. Simulating heap object allocation, GC roots reachability, Eden space filling, minor GC object promotion to survivor/tenured spaces, and manual System.gc() invocation.',
    problemStatement: 'Analyze how Garbage Collection contributes to efficient memory management. Trace Mark, Sweep, and Compact phases across Young and Old generations, and verify finalize() deprecation behavior.',
    keyOOPConcepts: [
      'Heap Memory structure (Eden, S0, S1, Tenured)',
      'Reachability via active GC Roots',
      'Mark-Sweep-Compact compaction phases',
      'System.gc() execution request'
    ],
    markingDistribution: [
      { criterion: 'Garbage Collection Definition & Overview', marks: 2 },
      { criterion: 'Generational Working (Eden, Survivor, Old)', marks: 4 },
      { criterion: 'Mark, Sweep, Compact Phases', marks: 2 },
      { criterion: 'Application Reliability & Leaks Prevention', marks: 2 },
      { criterion: 'Code Demonstration & finalize() Analysis', marks: 5 }
    ],
    totalMarks: 15,
    type: 'jvm_garbage_collection'
  }
];
