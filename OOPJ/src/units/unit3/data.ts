import { ConceptNode, ConceptEdge, ExamQuestion, FillupExercise } from '../../types/concept';

export const UNIT3_NODES: ConceptNode[] = [
  {
    id: 'u3_inheritance_types',
    title: 'Inheritance Types & Hierarchy',
    subtitle: 'Single, Multilevel, Hierarchical & Multiple',
    unit: 'Unit-3',
    category: 'inheritance_polymorphism',
    blooms: 'K2',
    co: 'CO3',
    x: 80,
    y: 120,
    description: 'Java supports Single, Multilevel, and Hierarchical inheritance using classes ("extends"). Multiple and Hybrid inheritance are achieved using interfaces ("implements") to prevent diamond ambiguity.',
    keyPoints: [
      'Single: Subclass derives from exactly one superclass',
      'Multilevel: Chain of derivation (Animal -> Mammal -> Dog)',
      'Hierarchical: Multiple subclasses branch from a shared parent (Employee -> Doctor / Nurse / Tech)',
      'Multiple: Disallowed for classes; fully supported via interfaces'
    ],
    codeSnippet: `class Employee { double basicPay = 40000; }
class Doctor extends Employee { double allowance = 30000; }`,
    examRelevance: 'Unit 3 Part A (Q1, Q5, Q6) & Part B (Q2): Analyze how inheritance types affect application architecture.',
    interactiveSimId: 'hierarchy_sim'
  },
  {
    id: 'u3_method_overriding',
    title: 'Method Overriding & Runtime Polymorphism',
    subtitle: 'Dynamic Method Dispatch in Action',
    unit: 'Unit-3',
    category: 'inheritance_polymorphism',
    blooms: 'K3',
    co: 'CO3',
    x: 520,
    y: 120,
    description: 'Redefining a superclass method in a subclass with the same signature. Method calls on superclass references are dynamically dispatched to the runtime concrete object type.',
    keyPoints: [
      'Same method name, parameters, and return type (covariant return allowed)',
      'Decision is made at runtime based on the actual Heap object, NOT the reference type',
      'Enables open-ended extensibility without altering client calling code'
    ],
    codeSnippet: `Animal obj = new Dog();
obj.sound(); // JVM calls Dog.sound() via Dynamic Method Dispatch`,
    examRelevance: 'Unit 3 Part A (Q2, Q7, Q8) & Part B (Q1, Q3, Q5): Runtime behavior of overriding and dispatch (13 Marks).',
    interactiveSimId: 'dynamic_dispatch_sim'
  },
  {
    id: 'u3_super_keyword',
    title: 'The "super" Keyword',
    subtitle: 'Invoking Parent Constructors, Methods & Fields',
    unit: 'Unit-3',
    category: 'inheritance_polymorphism',
    blooms: 'K2',
    co: 'CO3',
    x: 520,
    y: 380,
    description: 'Reference variable used to access immediate parent class members. Used to invoke superclass constructors using super(...), call overridden methods, and access shadowed fields.',
    keyPoints: [
      'super() must be the very first statement inside a subclass constructor',
      'super.method() executes superclass implementation before extending behavior',
      'Eliminates duplicate initialization code across subclass hierarchies'
    ],
    codeSnippet: `class Doctor extends Employee {
    Doctor(int id, String name, double bp) {
        super(id, name, bp); // Calls Employee constructor
    }
}`,
    examRelevance: 'Unit 3 Part A (Q3, Q12) & Part B (Q3): Illustrate usage of super in constructor chaining.',
    interactiveSimId: 'dynamic_dispatch_sim'
  },
  {
    id: 'u3_abstract_vs_interface',
    title: 'Abstract Classes vs Interfaces',
    subtitle: 'Partial Implementation vs Pure Contracts',
    unit: 'Unit-3',
    category: 'interfaces_packages',
    blooms: 'K4',
    co: 'CO3',
    x: 1040,
    y: 180,
    description: 'Abstract classes can hold state (instance fields) and concrete methods. Interfaces define clean behavioural contracts (default/static methods allowed since Java 8) and enable multiple inheritance.',
    keyPoints: [
      'Abstract class: "is-a" relationship, supports constructors, can have non-final fields',
      'Interface: "can-do" contract, all variables are public static final constants by default',
      'A class can extend only one abstract class, but implement multiple interfaces'
    ],
    codeSnippet: `abstract class Account {
    abstract void calculateInterest();
}
interface Transaction {
    void deposit(double amt);
    void withdraw(double amt);
}`,
    examRelevance: 'Unit 3 Part A (Q9, Q11, Q13) & Part B (Q4, Q7): Evaluate abstract classes over interfaces in design.',
    interactiveSimId: 'diamond_ambiguity_sim'
  },
  {
    id: 'u3_multiple_ambiguity',
    title: 'Interface Ambiguity & Diamond Problem',
    subtitle: 'Resolving Conflicts with Interface.super.method()',
    unit: 'Unit-3',
    category: 'interfaces_packages',
    blooms: 'K4',
    co: 'CO3',
    x: 1040,
    y: 460,
    description: 'When two implemented interfaces provide identical default methods, the compiler flags ambiguity. The subclass must override the method and explicitly call InterfaceName.super.method().',
    keyPoints: [
      'Prevents the infamous C++ Diamond Problem in Java',
      'Implementing class MUST explicitly override the colliding method signature',
      'Disambiguate inside the override using InterfaceA.super.display()'
    ],
    codeSnippet: `class Test implements A, B {
    @Override
    public void display() {
        A.super.display(); // Explicit resolution
    }
}`,
    examRelevance: 'Unit 3 Part B (Q6): Analyze how Java resolves method ambiguity in multiple inheritance (13 Marks).',
    interactiveSimId: 'diamond_ambiguity_sim'
  },
  {
    id: 'u3_case_hospital',
    title: 'Case Study: Hospital Hierarchy System',
    subtitle: 'Dynamic Salary Dispatch Across Roles',
    unit: 'Unit-3',
    category: 'case_studies',
    blooms: 'K6',
    co: 'CO3',
    x: 1560,
    y: 180,
    description: 'Enterprise healthcare payroll using hierarchical inheritance. Employee superclass with Doctor (+30k), Nurse (+15k), and Technician (+10k). JVM invokes calculateSalary() through Employee references.',
    keyPoints: [
      'Hierarchical inheritance: Employee -> Doctor, Nurse, Technician',
      'super() constructor initializes common employee details (id, name, bp)',
      'Subclasses override calculateSalary() with specialized allowance rules'
    ],
    codeSnippet: `Employee emp = new Doctor(101, "Dr. John", 60000);
emp.calculateSalary(); // Dynamically dispatches to Doctor`,
    examRelevance: 'Unit 3 Part C (Q1): 15-Mark case study on hospital employee management with dynamic dispatch.',
    interactiveSimId: 'dynamic_dispatch_sim'
  }
];

export const UNIT3_EDGES: ConceptEdge[] = [
  { from: 'u3_inheritance_types', to: 'u3_method_overriding', label: 'enables overriding', type: 'implements' },
  { from: 'u3_method_overriding', to: 'u3_super_keyword', label: 'chains parent via', type: 'uses' },
  { from: 'u3_method_overriding', to: 'u3_case_hospital', label: 'solves case study', type: 'dispatches_to' },
  { from: 'u3_abstract_vs_interface', to: 'u3_multiple_ambiguity', label: 'guards diamond via', type: 'implements' }
];

export const UNIT3_QUESTIONS: ExamQuestion[] = [
  {
    id: 'u3_pa_q2',
    unit: 'Unit-3',
    part: 'Part A',
    questionNumber: 'Q2',
    questionText: 'Define method overriding?',
    co: 'CO3',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Redefining superclass method in subclass', marks: 1 },
      { item: 'Same method name, parameters, and return type', marks: 1 }
    ],
    modelAnswer: 'Method overriding is redefining a superclass method in a subclass with the exact same name, parameter list, and return type. It enables runtime polymorphism through Dynamic Method Dispatch.'
  },
  {
    id: 'u3_pa_q4',
    unit: 'Unit-3',
    part: 'Part A',
    questionNumber: 'Q4',
    questionText: 'Discuss the concept of Dynamic Method Dispatch.',
    co: 'CO3',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'Method call resolved at runtime based on object type', marks: 1 },
      { item: 'Enables runtime polymorphism', marks: 1 }
    ],
    modelAnswer: 'Dynamic Method Dispatch is the mechanism by which a call to an overridden method is resolved at runtime rather than compile time. The decision is based on the actual object type in Heap memory, not the reference type.'
  },
  {
    id: 'u3_pa_q7',
    unit: 'Unit-3',
    part: 'Part A',
    questionNumber: 'Q7',
    questionText: 'Identify the OOP concept demonstrated in: A obj = new B(); obj.show();',
    co: 'CO3',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Runtime Polymorphism / Dynamic Method Dispatch', marks: 1 },
      { item: 'B\'s version of show() is executed at runtime', marks: 1 }
    ],
    modelAnswer: 'This demonstrates Runtime Polymorphism via Dynamic Method Dispatch. Even though obj is a reference of type A, it refers to an object of type B. At runtime, B\'s overridden show() executes.'
  },
  {
    id: 'u3_pb_q1',
    unit: 'Unit-3',
    part: 'Part B',
    questionNumber: 'Q1',
    questionText: 'Compare method overriding with method overloading in Java. Analyze runtime behavior with a program.',
    co: 'CO3',
    blooms: 'K3',
    marks: 13,
    markingScheme: [
      { item: 'Comparison (Overloading compile-time vs Overriding runtime)', marks: 5 },
      { item: 'Dynamic Method Dispatch explanation', marks: 2 },
      { item: 'Java Program (Animal / Dog) demonstration', marks: 6 }
    ],
    modelAnswer: 'Overloading: Same class, different parameters, compile-time polymorphism.\nOverriding: Super/sub class, same parameters, runtime polymorphism resolved via Dynamic Method Dispatch.'
  },
  {
    id: 'u3_pb_q6',
    unit: 'Unit-3',
    part: 'Part B',
    questionNumber: 'Q6',
    questionText: 'Analyze how Java resolves method ambiguity in multiple inheritance.',
    co: 'CO3',
    blooms: 'K4',
    marks: 13,
    markingScheme: [
      { item: 'Multiple inheritance disallowed in classes to prevent ambiguity', marks: 3 },
      { item: 'Interface default methods collision & resolution syntax', marks: 3 },
      { item: 'Java Program demonstrating InterfaceA.super.display()', marks: 7 }
    ],
    modelAnswer: 'If two interfaces have default methods with identical signatures, the implementing class must override the method and explicitly call InterfaceName.super.methodName() to eliminate ambiguity.'
  },
  {
    id: 'u3_pc_q1',
    unit: 'Unit-3',
    part: 'Part C',
    questionNumber: 'Q1',
    questionText: 'Hospital Employee Management System: Implement hierarchical inheritance with Employee and subclasses Doctor, Nurse, Technician. Override calculateSalary() and demonstrate dynamic method dispatch.',
    co: 'CO3',
    blooms: 'K6',
    marks: 15,
    markingScheme: [
      { item: 'Hierarchical Inheritance & super() usage', marks: 3 },
      { item: 'Method Overriding & Dynamic Dispatch', marks: 3 },
      { item: 'Runtime Polymorphism analysis', marks: 2 },
      { item: 'Complete Java Program implementation', marks: 7 }
    ],
    modelAnswer: 'Refer to interactive Dynamic Method Dispatch Simulator for live hospital role salary calculations.'
  }
];

export const UNIT3_FILLUPS: FillupExercise[] = [
  {
    id: 'u3_fillup_dispatch',
    title: 'Unit 3A Q7: Dynamic Method Dispatch Binding',
    unit: 'Unit-3',
    blooms: 'K2',
    scenario: 'Demonstrate dynamic method dispatch by creating a superclass Animal reference pointing to a subclass Dog instance in Heap memory.',
    instructions: 'Declare the superclass reference type and instantiate the subclass object.',
    codeTemplate: `class Animal {
    void sound() { System.out.println("Generic sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Dog barks"); }
}

public class DispatchDemo {
    public static void main(String[] args) {
        // Superclass reference holding subclass object
        {{blank_1}} ref = new {{blank_2}}();
        ref.sound(); // Dispatches dynamically at runtime
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['Animal'], hint: 'Superclass reference type', placeholder: 'ParentClass' },
      { id: 'blank_2', expected: ['Dog'], hint: 'Subclass concrete constructor', placeholder: 'SubClass' }
    ],
    optionsPool: ['Animal', 'Dog', 'Object', 'sound', 'super', 'new'],
    expectedOutput: `Dog barks\n[DYNAMIC METHOD DISPATCH] JVM executed Dog.sound() based on Heap object type.`,
    explanation: 'Although ref is declared as type Animal, the runtime object created on Heap is Dog. JVM dynamically executes Dog\'s overridden sound() method.'
  },
  {
    id: 'u3_fillup_super',
    title: 'Unit 3B Q3: Super Constructor Chaining',
    unit: 'Unit-3',
    blooms: 'K3',
    scenario: 'In the Doctor subclass constructor, pass common employee fields (id, name, basicPay) up to the parent Employee constructor.',
    instructions: 'Invoke the immediate parent constructor using the super keyword.',
    codeTemplate: `class Employee {
    int id; String name; double basicPay;
    Employee(int id, String name, double bp) {
        this.id = id; this.name = name; this.basicPay = bp;
    }
}

class Doctor extends Employee {
    Doctor(int id, String name, double bp) {
        {{blank_1}}({{blank_2}}, name, bp); // Chaining to parent
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['super'], hint: 'Keyword to invoke parent constructor', placeholder: 'keyword' },
      { id: 'blank_2', expected: ['id'], hint: 'First argument passed to Employee constructor', placeholder: 'id' }
    ],
    optionsPool: ['super', 'this', 'id', 'Employee', 'new', 'name'],
    expectedOutput: `Doctor d = new Doctor(101, "Dr. Watson", 70000);\n[SUPER CONSTRUCTOR] Initialized id=101, name="Dr. Watson", basicPay=70000.0`,
    explanation: 'super(id, name, bp) invokes Employee\'s constructor, reusing the parent initialization code.'
  }
];
