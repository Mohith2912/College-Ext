import { ExamQuestion } from '../types/concept';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // --- UNIT 1 PART A ---
  {
    id: 'u1_pa_q1',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q1',
    questionText: 'Define Object-Oriented Programming (OOP)?',
    co: 'CO1',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Definition based on objects & data', marks: 1 },
      { item: 'Properties: modularity, reusability, maintainability', marks: 1 }
    ],
    modelAnswer: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which contain data in the form of fields (attributes) and code in the form of procedures (methods). It promotes modularity, reusability, extensibility, and maintainability.'
  },
  {
    id: 'u1_pa_q2',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q2',
    questionText: 'Compare Object and Class.',
    co: 'CO1',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'Object: Instance, physical entity, occupies memory', marks: 1 },
      { item: 'Class: Blueprint/template, logical entity, no memory until instantiated', marks: 1 }
    ],
    modelAnswer: 'Class: A logical entity that serves as a blueprint/template from which objects are created. Declared using "class" keyword; does not occupy memory until objects are instantiated.\n\nObject: A physical runtime entity that is an instance of a class. Created using the "new" keyword and occupies memory on the Heap.'
  },
  {
    id: 'u1_pa_q3',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q3',
    questionText: 'State "Encapsulation".',
    co: 'CO1',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Wrapping data and methods into a single unit', marks: 1 },
      { item: 'Data hiding using access modifiers (private)', marks: 1 }
    ],
    modelAnswer: 'Encapsulation is the wrapping up of data (variables) and methods into a single protective unit (class). It provides data hiding by declaring variables as private and exposing public getter/setter methods to regulate access.'
  },
  {
    id: 'u1_pa_q4',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q4',
    questionText: 'Outline the concept of "Abstraction" with an example.',
    co: 'CO1',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'Hiding implementation details & showing essentials', marks: 1 },
      { item: 'Real-world example (Car, ATM, Remote)', marks: 1 }
    ],
    modelAnswer: 'Abstraction is the principle of hiding complex internal implementation details and exposing only the essential features to the outside world. Example: Driving a car using accelerator, brake, and steering without needing to know internal engine fuel combustion mechanics.'
  },
  {
    id: 'u1_pa_q5',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q5',
    questionText: 'Recall the meaning of inheritance in Java.',
    co: 'CO1',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Subclass acquiring properties of superclass', marks: 1 },
      { item: 'Promotes code reusability via "extends" keyword', marks: 1 }
    ],
    modelAnswer: 'Inheritance is a mechanism in Java where one class (subclass/child) acquires all the properties and behaviors of another class (superclass/parent). It promotes code reusability and creates an IS-A relationship using the "extends" keyword.'
  },
  {
    id: 'u1_pa_q6',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q6',
    questionText: 'Show how does "Polymorphism" enable code flexibility?',
    co: 'CO1',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'One interface, multiple implementations', marks: 1 },
      { item: 'Same method behaves differently for different objects', marks: 1 }
    ],
    modelAnswer: 'Polymorphism ("many forms") allows one interface to control multiple underlying implementations. A single method call (e.g. shape.draw()) behaves differently depending on the runtime object (Circle, Rectangle), enabling dynamic extensibility without rewriting calling code.'
  },
  {
    id: 'u1_pa_q10',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q10',
    questionText: 'Compare JDK and JRE.',
    co: 'CO1',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'JDK: Java Development Kit (javac, tools, JRE)', marks: 1 },
      { item: 'JRE: Java Runtime Environment (JVM, core libraries)', marks: 1 }
    ],
    modelAnswer: 'JDK (Java Development Kit): Contains development tools like the javac compiler, debugger, javadoc, along with the JRE. Used to write and compile Java programs.\n\nJRE (Java Runtime Environment): Provides libraries, JVM, and runtime support files. Used to execute compiled bytecode (.class files).'
  },
  {
    id: 'u1_pa_q14',
    unit: 'Unit-1',
    part: 'Part A',
    questionNumber: 'Q14',
    questionText: 'Compare the difference between == and .equals() operator for objects in Java.',
    co: 'CO1',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: '== compares memory reference addresses', marks: 1 },
      { item: '.equals() compares object contents/values', marks: 1 }
    ],
    modelAnswer: '== compares reference addresses in memory (whether both pointers refer to the exact same heap memory location).\n\n.equals() compares the actual values/content stored within the objects (when overridden, as in String class).'
  },

  // --- UNIT 1 PART B ---
  {
    id: 'u1_pb_q1',
    unit: 'Unit-1',
    part: 'Part B',
    questionNumber: 'Q1',
    questionText: 'Apply the four pillars of Object-Oriented Programming in designing a real-world application. Explain each concept with suitable examples.',
    co: 'CO1',
    blooms: 'K3',
    marks: 13,
    markingScheme: [
      { item: 'Introduction to OOP', marks: 1 },
      { item: 'Abstraction with real-world car example', marks: 3 },
      { item: 'Encapsulation with TV remote / Bank example', marks: 3 },
      { item: 'Inheritance with Vehicle -> Car hierarchy', marks: 3 },
      { item: 'Polymorphism with Shape.draw() overloading/overriding', marks: 3 }
    ],
    modelAnswer: 'Detailed design outlining Abstraction (abstract class Vehicle), Encapsulation (private double balance with getBalance/deposit), Inheritance (class Car extends Vehicle), and Polymorphism (compile-time overloading and runtime overriding).'
  },
  {
    id: 'u1_pb_q3',
    unit: 'Unit-1',
    part: 'Part B',
    questionNumber: 'Q3',
    questionText: 'Illustrate the Java architecture by explaining the roles of the JVM, JRE, and JDK. Demonstrate how these components interact during execution using a neat diagram.',
    co: 'CO1',
    blooms: 'K3',
    marks: 13,
    markingScheme: [
      { item: 'Introduction & WORA principle', marks: 1 },
      { item: 'JVM: Bytecode loading, verifier, JIT, GC', marks: 3 },
      { item: 'JRE: Runtime environment & class libraries', marks: 2 },
      { item: 'JDK: Compiler javac and dev tools', marks: 2 },
      { item: 'Architecture Diagram & Interaction Flow', marks: 4 },
      { item: 'Conclusion', marks: 1 }
    ],
    modelAnswer: 'Source code (.java) -> javac (JDK) -> Bytecode (.class) -> ClassLoader (JVM) -> Bytecode Verifier -> JIT Compiler & Interpreter -> Machine Code on Native OS.'
  },

  // --- UNIT 1 PART C (CASE STUDIES) ---
  {
    id: 'u1_pc_q1',
    unit: 'Unit-1',
    part: 'Part C',
    questionNumber: 'Q1',
    questionText: 'Develop a Java application to generate Electricity bill. Create a class with Consumer no., consumer name, previous month reading, current month reading. Compute bill using tiered tariff: First 100 @ Rs 1; 101-200 @ Rs 2.50; 201-500 @ Rs 4; >501 @ Rs 6.',
    co: 'CO1',
    blooms: 'K5',
    marks: 15,
    markingScheme: [
      { item: 'Import Statement & Scanner setup', marks: 2 },
      { item: 'Class Declaration & Data Members', marks: 2 },
      { item: 'Accepting Input (Scanner)', marks: 2 },
      { item: 'Units Calculation (current - previous)', marks: 1 },
      { item: 'Tiered Tariff Logic (4 slabs with offsets)', marks: 5 },
      { item: 'Display Output & Formatting', marks: 2 },
      { item: 'Syntax & Coding Standards', marks: 1 }
    ],
    modelAnswer: 'See interactive Electricity Tariff Lab for the complete runnable implementation and test cases.'
  },
  {
    id: 'u1_pc_q2',
    unit: 'Unit-1',
    part: 'Part C',
    questionNumber: 'Q2',
    questionText: 'Create a Java program with Employee class with Emp_name, Emp_id, Address, Mail_id, Mobile_no. Add Basic Pay (BP) with 97% DA, 10% HRA, 12% PF, 0.1% staff club fund. Generate pay slips with gross and net salary.',
    co: 'CO1',
    blooms: 'K5',
    marks: 15,
    markingScheme: [
      { item: 'Import & Scanner Setup', marks: 1 },
      { item: 'Employee Class & Data Members', marks: 2 },
      { item: 'Input Statements', marks: 2 },
      { item: 'Salary Calculation (DA, HRA, PF, Club, Gross, Net)', marks: 7 },
      { item: 'Pay Slip Formatted Output', marks: 1 },
      { item: 'Syntax & Coding Standards', marks: 2 }
    ],
    modelAnswer: 'See interactive Employee Payroll Lab for complete calculation breakdown and payslip generator.'
  },

  // --- UNIT 2 PART A ---
  {
    id: 'u2_pa_q2',
    unit: 'Unit-2',
    part: 'Part A',
    questionNumber: 'Q2',
    questionText: 'Summarize the purpose of "this" keyword.',
    co: 'CO2',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'Differentiate instance variables from local parameters', marks: 1 },
      { item: 'Invoke current constructor this() or return current object', marks: 1 }
    ],
    modelAnswer: '1. Differentiates instance variables from shadowed local parameters (this.name = name).\n2. Invokes an overloaded constructor of the current class (this()).\n3. Passes or returns the current object reference.'
  },
  {
    id: 'u2_pa_q4',
    unit: 'Unit-2',
    part: 'Part A',
    questionNumber: 'Q4',
    questionText: 'Define Method Overloading.',
    co: 'CO2',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Same method name, different parameter lists', marks: 1 },
      { item: 'Return type alone cannot overload a method', marks: 1 }
    ],
    modelAnswer: 'Method Overloading allows a class to have multiple methods with the same name, provided their parameter lists are different (in number, data type, or sequence). Return type alone is insufficient to overload a method.'
  },
  {
    id: 'u2_pa_q7',
    unit: 'Unit-2',
    part: 'Part A',
    questionNumber: 'Q7',
    questionText: 'Infer the purpose of the static keyword?',
    co: 'CO2',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'Belongs to the class rather than individual instances', marks: 1 },
      { item: 'Shared among all objects; accessed via ClassName.member', marks: 1 }
    ],
    modelAnswer: 'The static keyword indicates that a member (variable, method, block) belongs to the class itself rather than any individual object instance. It is shared across all objects and can be accessed without creating an instance.'
  },
  {
    id: 'u2_pa_q8',
    unit: 'Unit-2',
    part: 'Part A',
    questionNumber: 'Q8',
    questionText: 'Summarize what is a jagged array, with an example?',
    co: 'CO2',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: '2D array with unequal row sizes (varying columns)', marks: 1 },
      { item: 'Example snippet: int[][] arr = {{1,2}, {3,4,5}, {6}};', marks: 1 }
    ],
    modelAnswer: 'A jagged array in Java is a multi-dimensional array where each row has a different number of columns. Example:\nint[][] arr = { {1, 2}, {3, 4, 5}, {6} };'
  },
  {
    id: 'u2_pa_q12',
    unit: 'Unit-2',
    part: 'Part A',
    questionNumber: 'Q12',
    questionText: 'State the main difference between String, StringBuffer, and StringBuilder?',
    co: 'CO2',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'String: Immutable; modifications create new objects', marks: 1 },
      { item: 'StringBuffer: Mutable & Synchronized (thread-safe); StringBuilder: Mutable & Non-synchronized (fastest)', marks: 1 }
    ],
    modelAnswer: 'String: Immutable (contents cannot change after creation).\nStringBuffer: Mutable and thread-safe (synchronized methods).\nStringBuilder: Mutable and non-synchronized (faster in single-threaded environments).'
  },

  // --- UNIT 2 PART B & C ---
  {
    id: 'u2_pb_q5',
    unit: 'Unit-2',
    part: 'Part B',
    questionNumber: 'Q5',
    questionText: 'Analyze how Garbage Collection contributes to efficient memory management in Java applications. Develop a program and justify its impact.',
    co: 'CO2',
    blooms: 'K4',
    marks: 13,
    markingScheme: [
      { item: 'Garbage Collection definition & JVM role', marks: 2 },
      { item: 'Working: Heap, Mark, Sweep, Compact, Generational (Eden/Old)', marks: 4 },
      { item: 'Impact: Prevents memory leaks, optimizes heap', marks: 2 },
      { item: 'Program demonstration: obj = null; System.gc();', marks: 5 }
    ],
    modelAnswer: 'Garbage Collection reclaims memory from unreachable heap objects. Uses GC Roots to trace live references during Mark phase, sweeps dead objects, and compacts remaining memory.'
  },
  {
    id: 'u2_pc_q1',
    unit: 'Unit-2',
    part: 'Part C',
    questionNumber: 'Q1',
    questionText: 'Evaluate the effectiveness of object-oriented design by developing two Java classes, Rectangle and AreaCalculator. Analyze class interaction and justify modularity.',
    co: 'CO2',
    blooms: 'K5',
    marks: 15,
    markingScheme: [
      { item: 'OOP Design Concepts & Separation of Concerns', marks: 3 },
      { item: 'Interaction: AreaCalculator accepts Rectangle parameter', marks: 4 },
      { item: 'Java Program Implementation (Rectangle & AreaCalculator)', marks: 8 }
    ],
    modelAnswer: 'See interactive Modularity Lab for interactive class coupling visualizer.'
  },
  {
    id: 'u2_pc_q2',
    unit: 'Unit-2',
    part: 'Part C',
    questionNumber: 'Q2',
    questionText: 'Choose different string manipulation techniques by designing a Java program that processes a sentence to count words, identify longest word, and reverse the entire sentence using StringBuilder.',
    co: 'CO2',
    blooms: 'K5',
    marks: 15,
    markingScheme: [
      { item: 'String Manipulation Concepts (split, length, reverse)', marks: 3 },
      { item: 'Analysis & Justification of StringBuilder.reverse() O(n)', marks: 3 },
      { item: 'Complete Java Program Implementation', marks: 9 }
    ],
    modelAnswer: 'See interactive Sentence String Processor Lab for live token inspection.'
  }
];
