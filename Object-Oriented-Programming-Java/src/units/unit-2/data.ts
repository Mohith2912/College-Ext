import { ConceptNode, ConceptEdge, ExamQuestion, FillupExercise } from '../../types/concept';

export const UNIT2_NODES: ConceptNode[] = [
  {
    id: 'u2_class_object',
    title: 'Class vs Object & new Keyword',
    subtitle: 'Blueprint vs Heap Memory Allocation',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K2',
    co: 'CO2',
    x: 80,
    y: 120,
    description: 'A class is a logical blueprint declared using the "class" keyword without memory consumption until instantiated. An object is a concrete physical entity allocated in Heap memory via the "new" keyword.',
    keyPoints: [
      'Class: Logical template specifying member variables and behaviors',
      'Object: Concrete runtime instance occupying memory on the JVM Heap',
      'Instantiated dynamically via "new" keyword which invokes the constructor'
    ],
    codeSnippet: `class Student { int id; String name; }
Student s1 = new Student(); // Allocated on Heap`,
    examRelevance: 'Unit 2 Part A (Q1) & Part B (Q2): Compare object vs class and demonstrate creation (13 Marks).',
    interactiveSimId: 'heap_instance_sim'
  },
  {
    id: 'u2_this_keyword',
    title: 'The "this" Keyword',
    subtitle: 'Current Instance Pointer & Shadowing Resolver',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K2',
    co: 'CO2',
    x: 520,
    y: 120,
    description: 'Refers directly to the current class instance. Differentiates instance variables from shadowed parameter names, chains constructors, and passes current object.',
    keyPoints: [
      'Differentiates instance fields from local parameters (this.name = name)',
      'Invokes overloaded constructors within the same class using this(...)',
      'Passes or returns the current object reference to other methods'
    ],
    codeSnippet: `public class Person {
    String name;
    void setName(String name) {
        this.name = name; // Resolves variable shadowing
    }
}`,
    examRelevance: 'Unit 2 Part A (Q2, Q3): Summarize purpose of this keyword and rewrite erroneous snippet (2 Marks).',
    interactiveSimId: 'this_pointer_sim'
  },
  {
    id: 'u2_overloading',
    title: 'Method & Constructor Overloading',
    subtitle: 'Compile-Time Signature Differentiation',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K3',
    co: 'CO2',
    x: 520,
    y: 380,
    description: 'Defining multiple methods or constructors in the same class with identical names but differing parameter lists (count, types, or order). Return type alone CANNOT overload a method.',
    keyPoints: [
      'Must have different parameter lists (count, type, or sequence)',
      'Return type alone does NOT participate in signature resolution',
      'Constructor overloading provides flexible object initialization pathways'
    ],
    codeSnippet: `class Calculator {
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
    double add(double a, double b) { return a + b; }
}`,
    examRelevance: 'Unit 2 Part A (Q4, Q5, Q6) & Part B (Q1, Q3): Calculator and Student overloading (13 Marks).',
    interactiveSimId: 'overload_matcher_sim'
  },
  {
    id: 'u2_gc_memory',
    title: 'JVM Garbage Collection',
    subtitle: 'Generational Heap, Mark-Sweep-Compact',
    unit: 'Unit-2',
    category: 'memory_management',
    blooms: 'K4',
    co: 'CO2',
    x: 1040,
    y: 200,
    description: 'Automatic memory management executed by the JVM to reclaim unreachable heap objects. Involves Mark (detect active GC roots), Sweep (free memory), and Compact (defragment). Divided into Young (Eden, S0, S1) and Old generations.',
    keyPoints: [
      'GC Roots: Local stack references, active threads, static variables',
      'Mark Phase: Traverses reference tree from roots and flags reachable instances',
      'Sweep Phase: Reclaims memory allocated to unreferenced instances',
      'Generational Hypothesis: Most objects die young (cleared from Eden space)'
    ],
    codeSnippet: `Demo obj = new Demo();
obj = null; // Unreferenced object becomes eligible for GC
System.gc(); // Explicit request to JVM Garbage Collector`,
    examRelevance: 'Unit 2 Part A (Q10) & Part B (Q5): Analyze GC impact on application reliability and memory efficiency (13 Marks).',
    interactiveSimId: 'generational_gc_sim'
  },
  {
    id: 'u2_case_modularity',
    title: 'Case Study: Rectangle & AreaCalculator',
    subtitle: 'Decoupled Architecture & Object Passing',
    unit: 'Unit-2',
    category: 'case_studies',
    blooms: 'K5',
    co: 'CO2',
    x: 1560,
    y: 180,
    description: 'Designing two interacting classes: Rectangle encapsulates length and width with calculateArea(), while AreaCalculator accepts a Rectangle object and displays the computed area, proving clean separation of concerns.',
    keyPoints: [
      'Encapsulation: Rectangle protects its dimensional attributes',
      'Interaction: AreaCalculator accepts Rectangle object as a parameter',
      'Loose coupling: Calculation logic belongs to Rectangle, presentation belongs to Calculator'
    ],
    codeSnippet: `class Rectangle {
    double length, width;
    Rectangle(double l, double w) { this.length = l; this.width = w; }
    double calculateArea() { return length * width; }
}
class AreaCalculator {
    void displayArea(Rectangle r) {
        System.out.println("Area = " + r.calculateArea());
    }
}`,
    examRelevance: 'Unit 2 Part C (Q1): 15-Mark case study evaluating modular object-oriented design.',
    interactiveSimId: 'modularity_sim'
  }
];

export const UNIT2_EDGES: ConceptEdge[] = [
  { from: 'u2_class_object', to: 'u2_this_keyword', label: 'binds instance with', type: 'implements' },
  { from: 'u2_class_object', to: 'u2_overloading', label: 'enables overload in', type: 'implements' },
  { from: 'u2_class_object', to: 'u2_case_modularity', label: 'collaborates in', type: 'uses' },
  { from: 'u2_class_object', to: 'u2_gc_memory', label: 'allocates on heap for', type: 'manages' }
];

export const UNIT2_QUESTIONS: ExamQuestion[] = [
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
    id: 'u2_pb_q1',
    unit: 'Unit-2',
    part: 'Part B',
    questionNumber: 'Q1',
    questionText: 'Implement a Java program that demonstrates method overloading by implementing multiple add() methods with different parameter lists.',
    co: 'CO2',
    blooms: 'K3',
    marks: 13,
    markingScheme: [
      { item: 'Method Overloading concept & compile-time polymorphism', marks: 3 },
      { item: 'Key Rules (parameters count, type, order)', marks: 3 },
      { item: 'Complete Java Program with Calculator add()', marks: 7 }
    ],
    modelAnswer: 'Demonstrates add(int, int), add(int, int, int), and add(double, double) with distinct signatures.'
  },
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
    modelAnswer: 'Encapsulates length/width inside Rectangle, while AreaCalculator receives a Rectangle object reference and displays output.'
  }
];

export const UNIT2_FILLUPS: FillupExercise[] = [
  {
    id: 'u2_fillup_this',
    title: 'Unit 2A Q3: Variable Shadowing & The "this" Keyword',
    unit: 'Unit-2',
    blooms: 'K2',
    scenario: 'In the Person class below, parameter "name" shadows the instance variable "name". If written as "name = name", it assigns the parameter to itself, leaving the instance variable null. Fix the setter using the appropriate keyword.',
    instructions: 'Fill in the blanks to correctly bind the incoming argument to the object instance variable.',
    codeTemplate: `public class Person {
    String name;

    void setName(String name) {
        {{blank_1}}.name = {{blank_2}};
    }

    void display() {
        System.out.println("Person Name: " + this.name);
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['this'], hint: 'Reference keyword pointing to current object instance', placeholder: 'keyword' },
      { id: 'blank_2', expected: ['name'], hint: 'Local method parameter containing new string', placeholder: 'parameter' }
    ],
    optionsPool: ['this', 'name', 'super', 'static', 'new', 'String'],
    expectedOutput: `Person Name: Alan Turing\n[SUCCESS] Variable shadowing resolved. Instance state successfully initialized.`,
    explanation: 'Using "this.name = name;" unambiguously tells the Java compiler to store the local parameter "name" into the current object\'s field "name".'
  },
  {
    id: 'u2_fillup_overloading',
    title: 'Unit 2B Q1: Method Overloading Signature Differentiation',
    unit: 'Unit-2',
    blooms: 'K3',
    scenario: 'In the Calculator class, overload the "add" method to accept two doubles instead of two integers, demonstrating compile-time polymorphism.',
    instructions: 'Specify the double parameter types and return type.',
    codeTemplate: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public {{blank_1}} add(double a, {{blank_2}} b) {
        return a + b;
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['double'], hint: 'Return type matching double parameters', placeholder: 'type' },
      { id: 'blank_2', expected: ['double'], hint: 'Type of the second parameter b', placeholder: 'type' }
    ],
    optionsPool: ['double', 'int', 'void', 'float', 'Double', 'boolean'],
    expectedOutput: `Calculator calc = new Calculator();\ncalc.add(5, 10)       -> 15 (invokes int signature)\ncalc.add(5.5, 2.3)    -> 7.8 (invokes double signature)`,
    explanation: 'Method overloading requires differing parameter lists (count, types, or order). Return type alone is insufficient to overload.'
  }
];
