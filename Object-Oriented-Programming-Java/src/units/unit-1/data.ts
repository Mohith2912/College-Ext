import { ConceptNode, ConceptEdge, ExamQuestion, FillupExercise } from '../../types/concept';

export const UNIT1_NODES: ConceptNode[] = [
  {
    id: 'u1_oop_paradigm',
    title: 'Object-Oriented Programming (OOP)',
    subtitle: 'Objects, Data & Modularity',
    unit: 'Unit-1',
    category: 'foundations',
    blooms: 'K1',
    co: 'CO1',
    x: 80,
    y: 120,
    description: 'Programming paradigm based on objects containing data (attributes) and methods (behaviors). Promotes modularity, reusability, and maintainability.',
    keyPoints: [
      'Focuses on real-world entities rather than raw procedural functions',
      'Data and methods are packaged together for state integrity and security',
      'Provides code reusability through inheritance and dynamic polymorphism'
    ],
    codeSnippet: `class Car {
    String brand;
    void start() { System.out.println("Engine running..."); }
}`,
    examRelevance: 'Unit 1 Part A (Q1): Define OOP, its purpose, and architectural advantages.',
    realWorldExample: 'Automobile dashboard: components represent discrete collaborating objects.',
    interactiveSimId: 'pillars_sim'
  },
  {
    id: 'u1_abstraction',
    title: 'Abstraction',
    subtitle: 'Hiding Implementation & Exposing Essentials',
    unit: 'Unit-1',
    category: 'oop_pillars',
    blooms: 'K2',
    co: 'CO1',
    x: 520,
    y: 80,
    description: 'Hides internal implementation complexities and reveals only essential, high-level functionality to the user or client system.',
    keyPoints: [
      'Focuses on what an object does, not how it works internally',
      'Implemented using abstract classes and interfaces in Java',
      'Reduces cognitive overhead and prevents tight coupling'
    ],
    codeSnippet: `abstract class Vehicle {
    abstract void drive(); // Hidden mechanism
}
class Tesla extends Vehicle {
    void drive() { System.out.println("Electric motor engages."); }
}`,
    examRelevance: 'Unit 1 Part B (Q1): Outline Abstraction with real-world examples (3 Marks).',
    realWorldExample: 'Driving a car using accelerator, brake, and steering without knowing internal combustion thermodynamics.',
    interactiveSimId: 'pillars_sim'
  },
  {
    id: 'u1_encapsulation',
    title: 'Encapsulation',
    subtitle: 'Data Hiding & State Defense',
    unit: 'Unit-1',
    category: 'oop_pillars',
    blooms: 'K1',
    co: 'CO1',
    x: 520,
    y: 280,
    description: 'Wrapping data (attributes) and methods into a single protective unit, restricting direct unauthorized access using private modifiers and public getters/setters.',
    keyPoints: [
      'Data members declared private to protect state integrity',
      'Public getter/setter methods enforce validation rules',
      'Improves code security and maintenance independence'
    ],
    codeSnippet: `public class BankAccount {
    private double balance; // Hidden data
    public void deposit(double amt) {
        if (amt > 0) balance += amt;
    }
    public double getBalance() { return balance; }
}`,
    examRelevance: 'Unit 1 Part A (Q3) & Part B (Q1): State Encapsulation and TV remote control analogy (3 Marks).',
    realWorldExample: 'TV remote control: operates internal channels without touching delicate microchips.',
    interactiveSimId: 'pillars_sim'
  },
  {
    id: 'u1_jvm_architecture',
    title: 'JVM / JRE / JDK Architecture',
    subtitle: 'Write Once, Run Anywhere (WORA)',
    unit: 'Unit-1',
    category: 'jvm_architecture',
    blooms: 'K3',
    co: 'CO1',
    x: 80,
    y: 520,
    description: 'The three-layer foundation of Java: JDK contains compiler and dev tools; JRE provides runtime libraries and JVM; JVM loads bytecode, verifies security, and executes machine code via JIT.',
    keyPoints: [
      'JDK: Development Kit containing javac, debugger, javadoc, and JRE',
      'JRE: Runtime Environment containing JVM, core class libraries, and support files',
      'JVM: Virtual Machine executing bytecode (.class) and translating to OS machine code',
      'Execution Pipeline: ClassLoader -> Bytecode Verifier -> JIT Compiler / Interpreter'
    ],
    codeSnippet: `// 1. App.java --(javac)--> App.class (Bytecode)
// 2. ClassLoader loads bytecode into JVM memory
// 3. JIT compiler compiles hot spots to machine instructions`,
    examRelevance: 'Unit 1 Part A (Q10, Q11, Q12) & Part B (Q3): Illustrate JVM, JRE, JDK interaction diagram (13 Marks).',
    realWorldExample: 'Universal musical sheet (bytecode): playable on piano in Tokyo or cello in London without rewriting notes.',
    interactiveSimId: 'wora_sim'
  },
  {
    id: 'u1_scanner_bufferedreader',
    title: 'Scanner vs BufferedReader',
    subtitle: 'Token Parsing vs Buffered Streaming',
    unit: 'Unit-1',
    category: 'data_structures',
    blooms: 'K4',
    co: 'CO1',
    x: 1040,
    y: 200,
    description: 'Comparison of input mechanisms: Scanner parses primitive tokens directly with higher overhead; BufferedReader reads large character streams with high efficiency and minimal buffering delay.',
    keyPoints: [
      'Scanner: java.util, slower, parses primitives directly (nextInt), 1KB buffer',
      'BufferedReader: java.io, faster, reads raw strings (readLine), synchronized, 8KB buffer',
      'Memory: BufferedReader preferred for high-volume inputs and competitive programming'
    ],
    codeSnippet: `// Scanner
Scanner sc = new Scanner(System.in);
int num = sc.nextInt();

// BufferedReader
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int n = Integer.parseInt(br.readLine());`,
    examRelevance: 'Unit 1 Part B (Q6): Compare Scanner and BufferedReader in performance and ease of use (13 Marks).',
    realWorldExample: 'Streaming flight radar data parses via BufferedReader; simple terminal prompts use Scanner.'
  },
  {
    id: 'u1_case_electricity',
    title: 'Case Study: Electricity Tariff',
    subtitle: 'Tiered Non-Linear Slab Computation',
    unit: 'Unit-1',
    category: 'case_studies',
    blooms: 'K5',
    co: 'CO1',
    x: 1560,
    y: 180,
    description: 'Real-world utility billing engine that takes consumer number, name, previous & current meter readings, calculates consumed units, and computes tariff across 4 tiered slabs.',
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
    interactiveSimId: 'tariff_sim'
  }
];

export const UNIT1_EDGES: ConceptEdge[] = [
  { from: 'u1_oop_paradigm', to: 'u1_abstraction', label: 'implements pillar', type: 'implements' },
  { from: 'u1_oop_paradigm', to: 'u1_encapsulation', label: 'implements pillar', type: 'implements' },
  { from: 'u1_oop_paradigm', to: 'u1_jvm_architecture', label: 'executes on', type: 'executes_on' },
  { from: 'u1_encapsulation', to: 'u1_case_electricity', label: 'solves case study', type: 'uses' },
  { from: 'u1_scanner_bufferedreader', to: 'u1_case_electricity', label: 'accepts input', type: 'uses' }
];

export const UNIT1_QUESTIONS: ExamQuestion[] = [
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
    questionText: 'Compare object and Class.',
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
  {
    id: 'u1_pc_q1',
    unit: 'Unit-1',
    part: 'Part C',
    questionNumber: 'Q1',
    questionText: 'Develop a Java application to generate Electricity bill using tiered tariff.',
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
    modelAnswer: 'Refer to interactive Electricity Tariff Simulator for running model and calculations.'
  }
];

export const UNIT1_FILLUPS: FillupExercise[] = [
  {
    id: 'u1_fillup_tariff',
    title: 'Unit 1C Q1: Tiered Electricity Tariff Slab Logic',
    unit: 'Unit-1',
    blooms: 'K5',
    scenario: 'Implement the municipal tiered billing algorithm. For units between 101 and 200, the first 100 units cost Rs. 1/unit and additional units cost Rs. 2.50/unit.',
    instructions: 'Complete the slab calculation logic by supplying the unit offset and rate multiplier.',
    codeTemplate: `public class ElectricityBill {
    double calculateBill(int units) {
        double bill = 0.0;
        if (units <= 100) {
            bill = units * 1.0;
        } else if (units <= 200) {
            bill = (100 * 1.0) + ({{blank_1}} - 100) * {{blank_2}};
        } else if (units <= 500) {
            bill = (100 * 1.0) + (100 * 2.50) + (units - 200) * 4.0;
        } else {
            bill = (100 * 1.0) + (100 * 2.50) + (300 * 4.0) + (units - 500) * 6.0;
        }
        return bill;
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['units', 'CurrReading'], hint: 'Consumed units variable', placeholder: 'variable' },
      { id: 'blank_2', expected: ['2.5', '2.50'], hint: 'Tariff rate for slab 101-200 units', placeholder: 'rate' }
    ],
    optionsPool: ['units', '2.50', 'previousReading', '1.0', '4.0', '100'],
    expectedOutput: `Units Consumed: 150\nSlab 1 (1-100 units): Rs. 100.00\nSlab 2 (50 units @ 2.50): Rs. 125.00\nTotal Bill Amount: Rs. 225.00`,
    explanation: 'For 150 units: First 100 units cost 100 * 1.0 = Rs. 100. The remaining (150 - 100 = 50) units are charged at Rs. 2.50 each = Rs. 125. Total = Rs. 225.'
  },
  {
    id: 'u1_fillup_payroll',
    title: 'Unit 1C Q2: Employee Pay Slip Allowances & Deductions',
    unit: 'Unit-1',
    blooms: 'K5',
    scenario: 'Calculate DA (97% of BP), HRA (10% of BP), PF (12% of BP), and Staff Club Fund (0.1% of BP) to determine Gross and Net salary.',
    instructions: 'Supply the correct percentage decimal coefficients for DA (97%) and Staff Club Fund (0.1%).',
    codeTemplate: `public class EmployeePayroll {
    void processSalary(double bp) {
        double da = bp * {{blank_1}};        // 97% of BP
        double hra = bp * 0.10;              // 10% of BP
        double pf = bp * 0.12;               // 12% of BP
        double staffClub = bp * {{blank_2}}; // 0.1% of BP

        double gross = bp + da + hra;
        double net = gross - pf - staffClub;
        
        System.out.println("Gross: " + gross + " | Net: " + net);
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['0.97', '.97'], hint: '97% as a decimal multiplier', placeholder: '0.xx' },
      { id: 'blank_2', expected: ['0.001', '.001'], hint: '0.1% as a decimal multiplier (0.1 / 100)', placeholder: '0.xxx' }
    ],
    optionsPool: ['0.97', '0.001', '0.9', '0.01', '0.12', '1.0'],
    expectedOutput: `Basic Pay: Rs. 50,000.00\nDA (97%): Rs. 48,500.00\nHRA (10%): Rs. 5,000.00\nGross Pay: Rs. 103,500.00\nPF (12%): Rs. 6,000.00\nStaff Club (0.1%): Rs. 50.00\nNet Pay: Rs. 97,450.00`,
    explanation: '97% corresponds to multiplying by 0.97. 0.1% is 0.1/100 = 0.001. A common pitfall is writing 0.01 (which is 1%).'
  }
];
