import { ConceptNode, ConceptEdge } from '../types/concept';

export const CONCEPT_NODES: ConceptNode[] = [
  // ==========================================
  // LANE 1: PARADIGMS & ARCHITECTURAL FOUNDATION (X: 80)
  // ==========================================
  {
    id: 'oop_paradigm',
    title: 'Object-Oriented Programming',
    subtitle: 'Modularity, Encapsulated State & Clean Boundaries',
    unit: 'Unit-1',
    category: 'foundations',
    blooms: 'K1',
    co: 'CO1',
    x: 80,
    y: 120,
    description: 'Programming paradigm organized around objects containing attributes (data) and procedures (methods). Promotes modularity, maintainability, and enterprise reusability.',
    keyPoints: [
      'Models software around domain entities rather than loose functions',
      'Data and methods are packaged together for security and state integrity',
      'Foundation for the 4 core pillars: Abstraction, Encapsulation, Inheritance, Polymorphism'
    ],
    codeSnippet: `// Blueprint & Object Creation
class Car {
    String model;
    void ignite() { System.out.println("Engine running..."); }
}`,
    examRelevance: 'Unit 1 Part A (Q1): Define OOP, its purpose, and architectural advantages.',
    realWorldExample: 'Automobile dashboard: controls represent discrete objects collaborating seamlessly.'
  },
  {
    id: 'jvm_architecture',
    title: 'Java Architecture (JDK / JRE / JVM)',
    subtitle: 'The 3-Layer WORA Execution Engine',
    unit: 'Unit-1',
    category: 'jvm_architecture',
    blooms: 'K3',
    co: 'CO1',
    x: 80,
    y: 500,
    description: 'The execution foundation of Java: JDK provides developer tools (javac), JRE provides runtime libraries, and JVM verifies bytecode and compiles hot paths to machine code.',
    keyPoints: [
      'JDK contains compiler (javac), debugger, javadoc, and full JRE package',
      'JRE contains Java Class Libraries (rt.jar) and JVM runtime support files',
      'JVM executes bytecode (.class) and translates to native OS instructions via JIT',
      'ClassLoader -> Bytecode Verifier -> JIT Compiler / Interpreter pipeline'
    ],
    codeSnippet: `// Compilation and Execution Cycle
// 1. App.java --(javac)--> App.class (Bytecode)
// 2. ClassLoader loads bytecode into JVM memory
// 3. JIT compiler converts hot loops to native assembly`,
    examRelevance: 'Unit 1 Part A (Q10, Q11, Q12) & Part B (Q3): Illustrate JVM, JRE, JDK interaction diagram (13 Marks).',
    realWorldExample: 'Universal musical sheet (bytecode): playable on a grand piano in Tokyo or violin in Vienna without altering notes.'
  },
  {
    id: 'class_vs_object',
    title: 'Class vs Object & new Keyword',
    subtitle: 'Logical Blueprint vs Heap Memory Entity',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K2',
    co: 'CO2',
    x: 80,
    y: 880,
    description: 'A class is a logical blueprint declared using the "class" keyword without memory consumption until instantiated. An object is a concrete physical entity allocated in Heap memory via the "new" keyword.',
    keyPoints: [
      'Class: Logical template specifying member variables and behaviors',
      'Object: Concrete runtime instance occupying memory on the JVM Heap',
      'Instantiated dynamically via "new" keyword which invokes the constructor'
    ],
    codeSnippet: `// Blueprint declaration (no memory allocated)
class Student { int id; String name; }

// Runtime instantiation (allocated on Heap memory)
Student s1 = new Student();`,
    examRelevance: 'Unit 2 Part A (Q1) & Part B (Q2): Compare object vs class and demonstrate creation (13 Marks).',
    realWorldExample: 'Architectural blueprint of a bridge (Class) vs the actual physical suspension bridge built across a bay (Object).'
  },

  // ==========================================
  // LANE 2: THE 4 PILLARS & INSTANCE MECHANICS (X: 560)
  // ==========================================
  {
    id: 'abstraction',
    title: 'Abstraction',
    subtitle: 'Pillar 1: Hiding Implementation Details',
    unit: 'Unit-1',
    category: 'oop_pillars',
    blooms: 'K2',
    co: 'CO1',
    x: 560,
    y: 60,
    description: 'Abstraction hides internal implementation complexities and reveals only essential, high-level functionality to the caller or user.',
    keyPoints: [
      'Focuses on what an object does, rather than how it works internally',
      'Implemented in Java using abstract classes and interfaces',
      'Prevents client code from being tightly coupled to volatile internal logic'
    ],
    codeSnippet: `abstract class Vehicle {
    abstract void drive(); // Hidden mechanism
}
class ElectricCar extends Vehicle {
    void drive() { System.out.println("Inverter drives dual motors."); }
}`,
    examRelevance: 'Unit 1 Part B (Q1): Outline Abstraction with real-world examples (3 Marks).',
    realWorldExample: 'Driving a modern car with gas and brake pedals without needing to know electronic fuel injection thermodynamics.'
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    subtitle: 'Pillar 2: Data Hiding & State Defense',
    unit: 'Unit-1',
    category: 'oop_pillars',
    blooms: 'K1',
    co: 'CO1',
    x: 560,
    y: 240,
    description: 'Wrapping data (fields) and methods into a single protective class unit, restricting direct access using private modifiers and public getters/setters.',
    keyPoints: [
      'Data members declared private to protect state from corruption',
      'Public getter and setter methods enforce validation and access control',
      'Enables refactoring internal structure without breaking callers'
    ],
    codeSnippet: `public class BankAccount {
    private double balance; // Data hidden
    public void deposit(double amt) {
        if (amt > 0) balance += amt;
    }
    public double getBalance() { return balance; }
}`,
    examRelevance: 'Unit 1 Part A (Q3) & Part B (Q1): State Encapsulation and TV remote control analogy (3 Marks).',
    realWorldExample: 'Television remote control: user manipulates channels and volume without touching delicate circuit boards inside.'
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    subtitle: 'Pillar 3: Reusability via IS-A Hierarchy',
    unit: 'Unit-1',
    category: 'oop_pillars',
    blooms: 'K1',
    co: 'CO1',
    x: 560,
    y: 420,
    description: 'Mechanism where a child class acquires fields and methods of a parent class using the "extends" keyword, establishing a formal IS-A relationship.',
    keyPoints: [
      'Eliminates duplicate boilerplate and promotes code reusability',
      'Establishes an IS-A semantic hierarchy (e.g., Manager IS-A Employee)',
      'Subclasses can specialize behaviors or override inherited methods'
    ],
    codeSnippet: `class Employee {
    double basicPay;
}
class Manager extends Employee {
    double incentive = 7500;
}`,
    examRelevance: 'Unit 1 Part A (Q5) & Part B (Q1): Recall inheritance definition and extends keyword (3 Marks).',
    realWorldExample: 'Vehicle superclass inherited by Car and FreightTruck, sharing steering and wheel properties.'
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    subtitle: 'Pillar 4: One Interface, Multiple Behaviors',
    unit: 'Unit-1',
    category: 'oop_pillars',
    blooms: 'K1',
    co: 'CO1',
    x: 560,
    y: 600,
    description: 'Enables a single method identifier to exhibit different behaviors depending on parameters (compile-time overloading) or runtime instance type (overriding).',
    keyPoints: [
      'Compile-time: Method Overloading (differing parameter count/types)',
      'Run-time: Method Overriding (subclass redefines superclass method)',
      'Supports high flexibility, extensibility, and loose coupling'
    ],
    codeSnippet: `class Shape {
    void draw() { System.out.println("Generic shape"); }
}
class Circle extends Shape {
    void draw() { System.out.println("Drawing circle"); } // Overriding
}`,
    examRelevance: 'Unit 1 Part A (Q6) & Part B (Q1): Explain how polymorphism enables code flexibility with draw() (3 Marks).',
    realWorldExample: 'Smartphone power button: quick tap turns off screen; long press shows power-down dialog; double press launches camera.'
  },
  {
    id: 'this_keyword',
    title: 'The "this" Keyword',
    subtitle: 'Current Instance Reference & Shadowing Resolution',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K2',
    co: 'CO2',
    x: 560,
    y: 840,
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
    realWorldExample: 'A speaker pointing to themselves and stating "my name is..." when someone in the audience shares the same name.'
  },
  {
    id: 'static_and_final',
    title: 'static & final Modifiers',
    subtitle: 'Class-Level Sharing & Immutability',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K5',
    co: 'CO2',
    x: 560,
    y: 1040,
    description: '"static" denotes a member belonging to the class itself and shared among all instances without creating an object. "final" enforces immutability on variables, prevents overriding on methods, and prohibits subclass inheritance.',
    keyPoints: [
      'static: Shared across all objects, loaded once in Method Area',
      'final variable: Value cannot be reassigned after initialization (constant)',
      'final method: Prohibits overriding; final class: Prohibits inheritance'
    ],
    codeSnippet: `class University {
    static String college = "Anna University"; // Shared
    final double PI = 3.14159;                 // Constant
}`,
    examRelevance: 'Unit 2 Part A (Q7) & Part B (Q4): Assess significance of static and final keywords (13 Marks).',
    realWorldExample: 'Government tax rate: static to all citizens, final during the fiscal budget year.'
  },

  // ==========================================
  // LANE 3: MEMORY, ENGINES & COLLECTIONS (X: 1080)
  // ==========================================
  {
    id: 'scanner_vs_bufferedreader',
    title: 'Scanner vs BufferedReader',
    subtitle: 'Token Parsing vs High-Throughput Buffering',
    unit: 'Unit-1',
    category: 'data_structures',
    blooms: 'K4',
    co: 'CO1',
    x: 1080,
    y: 180,
    description: 'Comparing user input mechanisms: Scanner parses primitive tokens directly with higher CPU overhead; BufferedReader reads large character streams efficiently with an 8KB buffer.',
    keyPoints: [
      'Scanner: java.util, slower, parses primitives directly (nextInt), uses 1KB buffer',
      'BufferedReader: java.io, faster, reads strings (readLine), synchronized, uses 8KB buffer',
      'Memory & speed: BufferedReader preferred for high-volume inputs'
    ],
    codeSnippet: `// Scanner (Beginner friendly)
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();

// BufferedReader (High throughput)
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int n = Integer.parseInt(br.readLine());`,
    examRelevance: 'Unit 1 Part B (Q6): Compare Scanner and BufferedReader in performance and ease of use (13 Marks).',
    realWorldExample: 'High-frequency telemetry log ingesters parse text via BufferedReader; quick console prompts use Scanner.'
  },
  {
    id: 'method_overloading',
    title: 'Method & Constructor Overloading',
    subtitle: 'Compile-Time Signature Differentiation',
    unit: 'Unit-2',
    category: 'classes_objects',
    blooms: 'K3',
    co: 'CO2',
    x: 1080,
    y: 500,
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
    realWorldExample: 'Coffee machine buttons: one button, but pressing with 1 coin brews espresso, 2 coins brews cappuccino.'
  },
  {
    id: 'garbage_collection',
    title: 'JVM Garbage Collection',
    subtitle: 'Generational Heap, Mark-Sweep-Compact',
    unit: 'Unit-2',
    category: 'memory_management',
    blooms: 'K4',
    co: 'CO2',
    x: 1080,
    y: 780,
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
    realWorldExample: 'City recycling trucks automatically scanning neighborhoods for tagged discarded waste receptacles.'
  },
  {
    id: 'arrays_vs_arraylist',
    title: 'Arrays vs ArrayList',
    subtitle: 'Fixed Primitive Blocks vs Dynamic Collections',
    unit: 'Unit-2',
    category: 'data_structures',
    blooms: 'K4',
    co: 'CO2',
    x: 1080,
    y: 1020,
    description: 'Java arrays are fixed-size low-level memory blocks supporting primitives and objects. ArrayList (java.util) is a resizable dynamic array holding object references with built-in manipulation methods.',
    keyPoints: [
      'Array: Fixed size, lower memory overhead, stores primitives (int[]) directly',
      'ArrayList: Dynamically expands by 50%, stores objects/wrappers (Integer), provides add(), remove(), get()',
      'Jagged Arrays: 2D arrays with unequal row column dimensions (int[][] arr = {{1,2},{3,4,5}})'
    ],
    codeSnippet: `// Array (Fixed size)
int[] arr = new int[5];

// ArrayList (Dynamic resizable)
ArrayList<String> list = new ArrayList<>();
list.add("Java");
list.add("OOP");`,
    examRelevance: 'Unit 2 Part A (Q8, Q9, Q14, Q15) & Part B (Q7): Compare Array vs ArrayList with code snippet (13 Marks).',
    realWorldExample: 'Fixed 7-day calendar row (Array) vs dynamic online shopping cart items added and removed at will (ArrayList).'
  },
  {
    id: 'string_stringbuffer_builder',
    title: 'String vs StringBuffer vs StringBuilder',
    subtitle: 'Mutability, Thread Safety & O(n) Reversal',
    unit: 'Unit-2',
    category: 'data_structures',
    blooms: 'K5',
    co: 'CO2',
    x: 1080,
    y: 1240,
    description: 'Fundamental difference in string representation: String is immutable (constant pool); StringBuffer is mutable and thread-safe (synchronized); StringBuilder is mutable, non-synchronized, and offers maximum speed in single threads.',
    keyPoints: [
      'String: Immutable. Concatenation creates new objects on Heap, slow in loops',
      'StringBuffer: Mutable, thread-safe, synchronized methods, safe for multi-threading',
      'StringBuilder: Mutable, non-synchronized, fastest performance for single-threaded processing'
    ],
    codeSnippet: `// StringBuilder is preferred for single-threaded mutation:
StringBuilder sb = new StringBuilder("RADAR");
String reversed = sb.reverse().toString();
boolean isPal = "RADAR".equalsIgnoreCase(reversed);`,
    examRelevance: 'Unit 2 Part A (Q11, Q12, Q13) & Part B (Q6, Q8): Compare thread safety, mutability, and Palindrome efficiency (13 Marks).',
    realWorldExample: 'High-speed messaging feed using StringBuilder to assemble chat text without triggering memory fragmentation.'
  },

  // ==========================================
  // LANE 4: APPLIED REAL-WORLD CASE STUDIES (X: 1600)
  // ==========================================
  {
    id: 'case_study_electricity',
    title: 'Case Study: Electricity Tariff',
    subtitle: 'Tiered Slab Non-Linear Billing Engine',
    unit: 'Unit-1',
    category: 'case_studies',
    blooms: 'K5',
    co: 'CO1',
    x: 1600,
    y: 120,
    description: 'Real-world municipal utility billing engine that takes consumer number, name, previous & current meter readings, calculates consumed units, and computes tariff across 4 tiered slabs.',
    keyPoints: [
      'Slab 1 (0-100 units): Rs. 1.00 per unit',
      'Slab 2 (101-200 units): 100*1 + (units-100)*2.50',
      'Slab 3 (201-500 units): 100*1 + 100*2.50 + (units-200)*4.00',
      'Slab 4 (>501 units): 100*1 + 100*2.50 + 300*4.00 + (units-500)*6.00'
    ],
    codeSnippet: `double calculateBill(int units) {
    if (units <= 100) return units * 1.0;
    if (units <= 200) return (100 * 1) + (units - 100) * 2.50;
    if (units <= 500) return (100 * 1) + (100 * 2.50) + (units - 200) * 4.0;
    return (100 * 1) + (100 * 2.50) + (300 * 4.0) + (units - 500) * 6.0;
}`,
    examRelevance: 'Unit 1 Part C (Q1): Full 15-Mark case study question on tiered electricity computation.',
    relatedCaseStudyId: 'electricity_bill'
  },
  {
    id: 'case_study_payroll',
    title: 'Case Study: Employee Payroll',
    subtitle: 'Automated Pay Slip & Statutory Computation',
    unit: 'Unit-1',
    category: 'case_studies',
    blooms: 'K5',
    co: 'CO1',
    x: 1600,
    y: 360,
    description: 'Corporate payroll software evaluating Gross and Net salary: DA (97% of BP), HRA (10% of BP), PF deduction (12% of BP), and Staff Club Fund (0.1% of BP).',
    keyPoints: [
      'Allowances: DA = BP * 0.97, HRA = BP * 0.10',
      'Gross Salary = BP + DA + HRA',
      'Deductions: PF = BP * 0.12, Staff Club Fund = BP * 0.001',
      'Net Salary = Gross - PF - StaffClub'
    ],
    codeSnippet: `double da = bp * 0.97;
double hra = bp * 0.10;
double pf = bp * 0.12;
double staffClub = bp * 0.001;
double gross = bp + da + hra;
double net = gross - pf - staffClub;`,
    examRelevance: 'Unit 1 Part C (Q2): Full 15-Mark case study on Employee class and pay slip generation.',
    relatedCaseStudyId: 'employee_payroll'
  },
  {
    id: 'case_study_modularity',
    title: 'Case Study: Rectangle & AreaCalculator',
    subtitle: 'Decoupled Architecture & Object Passing',
    unit: 'Unit-2',
    category: 'case_studies',
    blooms: 'K5',
    co: 'CO2',
    x: 1600,
    y: 740,
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
    relatedCaseStudyId: 'oop_modularity'
  },
  {
    id: 'case_study_sentence',
    title: 'Case Study: Sentence String Processor',
    subtitle: 'Token Split, Longest Token & StringBuilder Inversion',
    unit: 'Unit-2',
    category: 'case_studies',
    blooms: 'K5',
    co: 'CO2',
    x: 1600,
    y: 1100,
    description: 'Comprehensive string analysis application: takes input sentence, parses tokens via split(" "), determines longest word through iterative comparison, and reverses entire string in O(n) via StringBuilder.',
    keyPoints: [
      'Word Counting: sentence.split(" ").length separates tokens cleanly',
      'Longest Word: Compares token lengths iteratively in O(n)',
      'Sentence Reversal: StringBuilder.reverse() modifies in-place without object explosion'
    ],
    codeSnippet: `String[] words = sentence.split(" ");
int wordCount = words.length;
String longest = "";
for (String w : words) {
    if (w.length() > longest.length()) longest = w;
}
String reversed = new StringBuilder(sentence).reverse().toString();`,
    examRelevance: 'Unit 2 Part C (Q2): 15-Mark case study on advanced string manipulation techniques.',
    relatedCaseStudyId: 'string_processor'
  }
];

export const CONCEPT_EDGES: ConceptEdge[] = [
  // Paradigms to Pillars
  { from: 'oop_paradigm', to: 'abstraction', label: 'implements pillar', type: 'implements' },
  { from: 'oop_paradigm', to: 'encapsulation', label: 'implements pillar', type: 'implements' },
  { from: 'oop_paradigm', to: 'inheritance', label: 'implements pillar', type: 'implements' },
  { from: 'oop_paradigm', to: 'polymorphism', label: 'implements pillar', type: 'implements' },

  // Architecture links
  { from: 'oop_paradigm', to: 'jvm_architecture', label: 'executes on', type: 'executes_on' },
  { from: 'jvm_architecture', to: 'garbage_collection', label: 'manages heap memory', type: 'manages' },
  { from: 'oop_paradigm', to: 'class_vs_object', label: 'structures code as', type: 'implements' },

  // Class mechanics
  { from: 'class_vs_object', to: 'this_keyword', label: 'binds instance with', type: 'implements' },
  { from: 'class_vs_object', to: 'method_overloading', label: 'enables overload in', type: 'implements' },
  { from: 'class_vs_object', to: 'static_and_final', label: 'modifies members with', type: 'implements' },

  // IO & Pillars to Case Studies
  { from: 'encapsulation', to: 'case_study_electricity', label: 'solves case study', type: 'uses' },
  { from: 'encapsulation', to: 'case_study_payroll', label: 'solves case study', type: 'uses' },
  { from: 'scanner_vs_bufferedreader', to: 'case_study_electricity', label: 'accepts input', type: 'uses' },
  { from: 'scanner_vs_bufferedreader', to: 'case_study_payroll', label: 'accepts input', type: 'uses' },

  // Advanced structures to Case Studies
  { from: 'class_vs_object', to: 'case_study_modularity', label: 'collaborates in', type: 'uses' },
  { from: 'string_stringbuffer_builder', to: 'case_study_sentence', label: 'processes strings in', type: 'uses' },
  { from: 'arrays_vs_arraylist', to: 'case_study_sentence', label: 'stores split tokens in', type: 'uses' },
  { from: 'garbage_collection', to: 'string_stringbuffer_builder', label: 'reclaims immutable instances', type: 'manages' }
];
