import { FillupExercise } from '../types/concept';

export const FILLUP_EXERCISES: FillupExercise[] = [
  // --- EXERCISE 1: Variable Shadowing & 'this' (Unit 2A Q3) ---
  {
    id: 'fillup_this_shadowing',
    title: 'Unit 2A Q3: Variable Shadowing & The "this" Keyword',
    unit: 'Unit-2',
    blooms: 'K2',
    scenario: 'In the Person class below, the parameter "name" shadows the instance variable "name". If written as "name = name", it assigns the parameter to itself, leaving the instance variable null. Rewrite using the "this" keyword.',
    instructions: 'Assign the parameter to the instance variable using "this".',
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
      {
        id: 'blank_1',
        expected: ['this'],
        hint: 'Keyword referencing current instance',
        placeholder: 'keyword'
      },
      {
        id: 'blank_2',
        expected: ['name'],
        hint: 'Local method parameter containing string',
        placeholder: 'param'
      }
    ],
    optionsPool: ['this', 'name', 'super', 'static', 'new', 'String'],
    expectedOutput: `Person Name: Alan Turing\n[SUCCESS] Variable shadowing resolved. Instance state successfully initialized.`,
    explanation: 'Using "this.name = name;" unambiguously instructs the compiler to store the local argument "name" into the current object\'s field "name".'
  },

  // --- EXERCISE 2: Electricity Tariff Calculation (Unit 1C Q1) ---
  {
    id: 'fillup_electricity_tariff',
    title: 'Unit 1C Q1: Tiered Electricity Tariff Slab Logic',
    unit: 'Unit-1',
    blooms: 'K5',
    scenario: 'Implement the municipal tiered billing algorithm. For units between 101 and 200, the first 100 units cost Rs. 1/unit and additional units cost Rs. 2.50/unit.',
    instructions: 'Complete the slab calculation logic by supplying the unit offset and the rate multiplier.',
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
      {
        id: 'blank_1',
        expected: ['units', 'CurrReading'],
        hint: 'Consumed units variable',
        placeholder: 'variable'
      },
      {
        id: 'blank_2',
        expected: ['2.5', '2.50'],
        hint: 'Tariff rate for slab 101-200 units',
        placeholder: 'rate'
      }
    ],
    optionsPool: ['units', '2.50', 'previousReading', '1.0', '4.0', '100'],
    expectedOutput: `Units Consumed: 150\nSlab 1 (1-100 units): Rs. 100.00\nSlab 2 (50 units @ 2.50): Rs. 125.00\nTotal Bill Amount: Rs. 225.00`,
    explanation: 'For 150 units: First 100 units cost 100 * 1.0 = Rs. 100. The remaining (150 - 100 = 50) units are charged at Rs. 2.50 each = Rs. 125. Total = Rs. 225.'
  },

  // --- EXERCISE 3: Employee Payroll & Allowances (Unit 1C Q2) ---
  {
    id: 'fillup_payroll_allowances',
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
      {
        id: 'blank_1',
        expected: ['0.97', '.97'],
        hint: '97% as a decimal multiplier',
        placeholder: '0.xx'
      },
      {
        id: 'blank_2',
        expected: ['0.001', '.001'],
        hint: '0.1% as a decimal multiplier (0.1 / 100)',
        placeholder: '0.xxx'
      }
    ],
    optionsPool: ['0.97', '0.001', '0.9', '0.01', '0.12', '1.0'],
    expectedOutput: `Basic Pay: Rs. 50,000.00\nDA (97%): Rs. 48,500.00\nHRA (10%): Rs. 5,000.00\nGross Pay: Rs. 103,500.00\nPF (12%): Rs. 6,000.00\nStaff Club (0.1%): Rs. 50.00\nNet Pay: Rs. 97,450.00`,
    explanation: '97% corresponds to multiplying by 0.97. 0.1% is 0.1/100 = 0.001. A common pitfall is writing 0.01 (which is 1%).'
  },

  // --- EXERCISE 4: Iteration & Selection Control (Unit 1B Q4) ---
  {
    id: 'fillup_control_structures',
    title: 'Unit 1B Q4: Iteration (for) & Selection (switch)',
    unit: 'Unit-1',
    blooms: 'K5',
    scenario: 'Demonstrate control flow by combining a "for" loop with a "switch" statement to iterate from 1 to 3 and select corresponding action messages.',
    instructions: 'Fill in the loop continuation condition and the selection keyword.',
    codeTemplate: `public class ControlStructuresDemo {
    public static void main(String[] args) {
        for (int i = 1; i {{blank_1}} 3; i++) {
            {{blank_2}} (i) {
                case 1:
                    System.out.println("Day 1: Orientation");
                    break;
                case 2:
                    System.out.println("Day 2: Core Workshop");
                    break;
                default:
                    System.out.println("Day 3: Assessment");
            }
        }
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['<=', '=<'],
        hint: 'Relational operator for less than or equal to',
        placeholder: 'operator'
      },
      {
        id: 'blank_2',
        expected: ['switch'],
        hint: 'Multi-way selection control keyword',
        placeholder: 'keyword'
      }
    ],
    optionsPool: ['<=', 'switch', '==', 'case', 'if', '<'],
    expectedOutput: `Day 1: Orientation\nDay 2: Core Workshop\nDay 3: Assessment\n[LOOP TERMINATED]`,
    explanation: 'The "for" loop initializes i=1 and tests i <= 3 before each cycle. Inside the body, "switch(i)" tests the evaluated integer expression against matching case labels.'
  },

  // --- EXERCISE 5: Operator Precedence & Evaluation (Unit 1B Q5) ---
  {
    id: 'fillup_operator_precedence',
    title: 'Unit 1B Q5: Operator Precedence & Relational Logic',
    unit: 'Unit-1',
    blooms: 'K3',
    scenario: 'In an e-commerce billing program, compute total and apply an extra Rs. 100 discount if final amount exceeds 1000 AND purchase quantity is at least 5.',
    instructions: 'Complete the logical AND operator and compound addition assignment.',
    codeTemplate: `public class OperatorDemo {
    public static void main(String[] args) {
        int quantity = 6;
        int price = 250;
        int discount = 50;

        int total = quantity * price; // Multiplication before subtraction
        int finalAmount = total - discount;

        // Apply bonus discount if amount > 1000 AND quantity >= 5
        if (finalAmount > 1000 {{blank_1}} quantity >= 5) {
            discount {{blank_2}} 100;
        }

        System.out.println("Final Discount: " + discount);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['&&'],
        hint: 'Short-circuit logical AND operator',
        placeholder: 'op'
      },
      {
        id: 'blank_2',
        expected: ['+=', ' = discount +'],
        hint: 'Compound addition assignment operator',
        placeholder: 'op'
      }
    ],
    optionsPool: ['&&', '+=', '||', '==', '-=', '&'],
    expectedOutput: `Total: 1500\nFinal Amount: 1450\nCondition (1450 > 1000 && 6 >= 5) evaluates to TRUE\nFinal Discount: 150`,
    explanation: '&& evaluates both relational sub-expressions with short-circuit semantics. Compound operator "+=" adds 100 to the existing discount variable.'
  },

  // --- EXERCISE 6: Student Marks Calculation (Unit 1B Q7) ---
  {
    id: 'fillup_student_marks',
    title: 'Unit 1B Q7: Student Marks Total & Floating-Point Average',
    unit: 'Unit-1',
    blooms: 'K3',
    scenario: 'Accept three subject marks, calculate the total marks, and compute the floating-point average using double precision to prevent integer truncation.',
    instructions: 'Fill in the total accumulation formula and the floating-point divisor.',
    codeTemplate: `import java.util.Scanner;

public class StudentMarks {
    public static void main(String[] args) {
        int mark1 = 85, mark2 = 90, mark3 = 88;

        int total = {{blank_1}};
        // Dividing by 3.0 avoids integer truncation
        double average = total / {{blank_2}};

        System.out.println("Total: " + total + ", Average: " + average);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['mark1 + mark2 + mark3', 'mark1+mark2+mark3'],
        hint: 'Sum of the three marks variables',
        placeholder: 'mark1 + mark2 + mark3'
      },
      {
        id: 'blank_2',
        expected: ['3.0', '3.0d', '3.0f', '(double)3', '(double) 3'],
        hint: 'Floating-point literal 3.0 to preserve fractional averages',
        placeholder: '3.0'
      }
    ],
    optionsPool: ['mark1 + mark2 + mark3', '3.0', '3', 'mark1 * 3', 'total / 3', '3.5'],
    expectedOutput: `Total: 263, Average: 87.66666666666667\n[VERIFIED] Floating-point precision maintained.`,
    explanation: 'Writing "total / 3" performs integer division, discarding any fractional remainder (e.g. 263 / 3 = 87). Dividing by the double literal "3.0" promotes total to double, computing the exact average.'
  },

  // --- EXERCISE 7: Rectangle Geometry (Unit 1B Q8) ---
  {
    id: 'fillup_rectangle_geometry',
    title: 'Unit 1B Q8: Rectangle Area and Perimeter Arithmetic',
    unit: 'Unit-1',
    blooms: 'K5',
    scenario: 'Calculate the area (length * width) and perimeter (2 * (length + width)) of a rectangle using double variables.',
    instructions: 'Complete the area multiplication and perimeter formula.',
    codeTemplate: `public class Rectangle {
    public static void main(String[] args) {
        double length = 12.5;
        double width = 8.0;

        double area = {{blank_1}};
        double perimeter = {{blank_2}} * (length + width);

        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['length * width', 'length*width', 'width * length'],
        hint: 'Formula for area of a rectangle',
        placeholder: 'length * width'
      },
      {
        id: 'blank_2',
        expected: ['2', '2.0'],
        hint: 'Scalar multiplier for perimeter formula',
        placeholder: '2'
      }
    ],
    optionsPool: ['length * width', '2', 'length + width', '4', '2.0', 'length / width'],
    expectedOutput: `Area: 100.0\nPerimeter: 41.0`,
    explanation: 'Area of a rectangle is length * width. Perimeter is 2 * (length + width). Parentheses ensure addition happens prior to multiplication.'
  },

  // --- EXERCISE 8: Method Overloading Signature (Unit 2B Q1) ---
  {
    id: 'fillup_method_overloading',
    title: 'Unit 2B Q1: Method Overloading with Differing Parameter Lists',
    unit: 'Unit-2',
    blooms: 'K3',
    scenario: 'In the Calculator class, overload the "add" method to accept two doubles instead of two integers, demonstrating compile-time polymorphism.',
    instructions: 'Specify the double parameter types and return type.',
    codeTemplate: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    // Overloaded add method for double precision
    public {{blank_1}} add(double a, {{blank_2}} b) {
        return a + b;
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['double'],
        hint: 'Return type matching the double parameters',
        placeholder: 'type'
      },
      {
        id: 'blank_2',
        expected: ['double'],
        hint: 'Type of the second parameter b',
        placeholder: 'type'
      }
    ],
    optionsPool: ['double', 'int', 'void', 'float', 'Double', 'boolean'],
    expectedOutput: `Calculator calc = new Calculator();\ncalc.add(5, 10)       -> 15 (invokes int signature)\ncalc.add(5.5, 2.3)    -> 7.8 (invokes double signature)`,
    explanation: 'Method overloading requires differing parameter lists (count, types, or order). Return type alone is insufficient to overload.'
  },

  // --- EXERCISE 9: Constructor Overloading (Unit 2B Q3) ---
  {
    id: 'fillup_constructor_overloading',
    title: 'Unit 2B Q3: Constructor Overloading in Student Class',
    unit: 'Unit-2',
    blooms: 'K3',
    scenario: 'Define a parameterized constructor for the Student class that takes an integer id and a String name, initializing the instance fields.',
    instructions: 'Fill in the constructor name (matching class name) and the assignment.',
    codeTemplate: `class Student {
    int id;
    String name;

    // Default constructor
    Student() {
        this.id = 0;
        this.name = "Unknown";
    }

    // Parameterized constructor
    {{blank_1}}(int id, String name) {
        this.id = id;
        this.name = {{blank_2}};
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['Student'],
        hint: 'Constructors must match the class name exactly',
        placeholder: 'ConstructorName'
      },
      {
        id: 'blank_2',
        expected: ['name'],
        hint: 'Parameter to assign to this.name',
        placeholder: 'name'
      }
    ],
    optionsPool: ['Student', 'name', 'void', 'id', 'new', 'this'],
    expectedOutput: `Student s1 = new Student();                  // id: 0, name: Unknown\nStudent s2 = new Student(101, "Arya");        // id: 101, name: Arya`,
    explanation: 'Constructors have the exact same name as the class and do not have a return type (not even void). Overloaded constructors allow flexible initialization.'
  },

  // --- EXERCISE 10: static & final Modifiers (Unit 2B Q4) ---
  {
    id: 'fillup_static_final',
    title: 'Unit 2B Q4: Class-Shared "static" & Immutable "final"',
    unit: 'Unit-2',
    blooms: 'K5',
    scenario: 'Declare a college name variable that is shared across all objects (static), and a PI mathematical constant whose value cannot be reassigned (final).',
    instructions: 'Supply the "static" and "final" keywords in their respective declarations.',
    codeTemplate: `public class UniversityConfig {
    // Shared among all instances
    public {{blank_1}} String COLLEGE_NAME = "ABC Engineering College";

    // Value cannot be altered after initialization
    public static {{blank_2}} double PI = 3.14159;

    public static void display() {
        System.out.println(COLLEGE_NAME + " | PI: " + PI);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['static'],
        hint: 'Belongs to the class rather than individual instances',
        placeholder: 'modifier'
      },
      {
        id: 'blank_2',
        expected: ['final'],
        hint: 'Modifier preventing reassignment (creates constant)',
        placeholder: 'modifier'
      }
    ],
    optionsPool: ['static', 'final', 'private', 'const', 'public', 'volatile'],
    expectedOutput: `UniversityConfig.display();\nOutput: ABC Engineering College | PI: 3.14159\n[CONSTANT PROTECTED] PI cannot be modified.`,
    explanation: '"static" creates a single copy shared across all instances. "final" prevents modification after initialization, creating immutable constants.'
  },

  // --- EXERCISE 11: Garbage Collection & finalize() (Unit 2B Q5) ---
  {
    id: 'fillup_garbage_collection',
    title: 'Unit 2B Q5: Object Dereferencing & JVM Garbage Collection',
    unit: 'Unit-2',
    blooms: 'K4',
    scenario: 'Make an instantiated object eligible for garbage collection by severing its reference pointer, then request the JVM garbage collector to run.',
    instructions: 'Set the reference to null and invoke System.gc().',
    codeTemplate: `class MemoryDemo {
    public static void main(String[] args) {
        MemoryDemo obj = new MemoryDemo();

        // 1. Sever reference to make object unreachable in Heap
        obj = {{blank_1}};

        // 2. Request JVM to execute Garbage Collection
        System.{{blank_2}}();

        System.out.println("Garbage collection requested.");
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['null'],
        hint: 'Literal representing absence of reference',
        placeholder: 'null'
      },
      {
        id: 'blank_2',
        expected: ['gc', 'gc()'],
        hint: 'Method in System class to request garbage collection',
        placeholder: 'method'
      }
    ],
    optionsPool: ['null', 'gc', 'free', 'delete', '0', 'clear'],
    expectedOutput: `Garbage collection requested.\n[JVM Thread]: Object collected from Young generation Heap.`,
    explanation: 'Setting "obj = null" severs the reference pointer from the Stack. The unreferenced Heap object becomes eligible for GC. System.gc() explicitly requests collection.'
  },

  // --- EXERCISE 12: In-place Palindrome via StringBuilder (Unit 2B Q6) ---
  {
    id: 'fillup_stringbuilder_palindrome',
    title: 'Unit 2B Q6: O(n) Palindrome Inversion via StringBuilder',
    unit: 'Unit-2',
    blooms: 'K4',
    scenario: 'Determine if an input string is a palindrome. Utilize StringBuilder to reverse in-place in O(n) time, eliminating heap garbage.',
    instructions: 'Instantiate the StringBuilder and call the in-place reverse method.',
    codeTemplate: `public class PalindromeChecker {
    public static boolean checkPalindrome(String str) {
        StringBuilder sb = new {{blank_1}}(str);
        String reversed = sb.{{blank_2}}().toString();
        return str.equalsIgnoreCase(reversed);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['StringBuilder'],
        hint: 'Mutable character sequence buffer class',
        placeholder: 'ClassName'
      },
      {
        id: 'blank_2',
        expected: ['reverse'],
        hint: 'Method that inverts character sequence in-place',
        placeholder: 'method'
      }
    ],
    optionsPool: ['StringBuilder', 'reverse', 'StringBuffer', 'invert', 'toString', 'split'],
    expectedOutput: `Input: "MADAM"\nReversed: "MADAM"\nResult: Palindrome (Verified in O(n) time with zero intermediate Heap garbage)`,
    explanation: 'StringBuilder.reverse() modifies the internal character buffer in-place in O(n) time, unlike manual string concatenation which creates O(n) temporary String instances.'
  },

  // --- EXERCISE 13: ArrayList Dynamic Collection (Unit 2B Q7) ---
  {
    id: 'fillup_arraylist_ops',
    title: 'Unit 2B Q7: ArrayList Creation & Element Insertion',
    unit: 'Unit-2',
    blooms: 'K4',
    scenario: 'Create a resizable ArrayList of Strings from java.util, and add elements to it using the built-in collection method.',
    instructions: 'Specify the generic class name and invocation method.',
    codeTemplate: `import java.util.ArrayList;

public class ListDemo {
    public static void main(String[] args) {
        // Dynamic resizable list
        ArrayList<String> names = new {{blank_1}}<String>();

        // Add elements
        names.{{blank_2}}("Alice");
        names.add("Bob");

        System.out.println("Size: " + names.size());
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['ArrayList'],
        hint: 'Dynamic array class in java.util',
        placeholder: 'ClassName'
      },
      {
        id: 'blank_2',
        expected: ['add'],
        hint: 'Method to append element to end of list',
        placeholder: 'method'
      }
    ],
    optionsPool: ['ArrayList', 'add', 'push', 'insert', 'List', 'append'],
    expectedOutput: `Size: 2\nElements: [Alice, Bob]\n[DYNAMIC RESIZE] ArrayList expands capacity automatically.`,
    explanation: 'Unlike fixed-size primitive arrays (e.g. String[5]), ArrayList dynamically grows as elements are appended via names.add().'
  },

  // --- EXERCISE 14: Object Parameter Passing (Unit 2C Q1) ---
  {
    id: 'fillup_modularity_passing',
    title: 'Unit 2C Q1: Passing Object References to AreaCalculator',
    unit: 'Unit-2',
    blooms: 'K5',
    scenario: 'AreaCalculator does not store dimensions. Its method accepts a Rectangle instance reference as a parameter and delegates calculation.',
    instructions: 'Specify the parameter type and the delegated method call.',
    codeTemplate: `class AreaCalculator {
    void displayArea({{blank_1}} r) {
        double area = r.{{blank_2}}();
        System.out.println("Calculated Area = " + area);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['Rectangle'],
        hint: 'Type of the object being passed as argument',
        placeholder: 'ClassType'
      },
      {
        id: 'blank_2',
        expected: ['calculateArea'],
        hint: 'Method on Rectangle returning length * width',
        placeholder: 'method'
      }
    ],
    optionsPool: ['Rectangle', 'calculateArea', 'double', 'getPerimeter', 'this', 'AreaCalculator'],
    expectedOutput: `Rectangle rect = new Rectangle(10.0, 5.0);\nAreaCalculator ac = new AreaCalculator();\nac.displayArea(rect);\nOutput: Calculated Area = 50.0`,
    explanation: 'Demonstrates modularity and loose coupling: Rectangle encapsulates geometry; AreaCalculator formats presentation.'
  },

  // --- EXERCISE 15: Sentence Word Splitting & Longest Word (Unit 2C Q2) ---
  {
    id: 'fillup_sentence_processing',
    title: 'Unit 2C Q2: Sentence Word Splitting & Longest Word Search',
    unit: 'Unit-2',
    blooms: 'K5',
    scenario: 'Split a sentence string into individual word tokens using space delimiter, then iterate through words to find the longest token.',
    instructions: 'Fill in the regex split delimiter and the length comparison operator.',
    codeTemplate: `public class SentenceAnalyzer {
    public static void main(String[] args) {
        String sentence = "Object Oriented Programming in Java";
        
        // 1. Tokenize by space
        String[] words = sentence.split({{blank_1}});
        
        // 2. Find longest word
        String longest = "";
        for (String word : words) {
            if (word.length() {{blank_2}} longest.length()) {
                longest = word;
            }
        }
        
        System.out.println("Longest: " + longest);
    }
}`,
    blanks: [
      {
        id: 'blank_1',
        expected: ['" "', '"\\\\s+"', '\' \''],
        hint: 'Space delimiter string literal',
        placeholder: '" "'
      },
      {
        id: 'blank_2',
        expected: ['>'],
        hint: 'Greater than relational operator',
        placeholder: '>'
      }
    ],
    optionsPool: ['" "', '>', '<', '","', '==', 'length()'],
    expectedOutput: `Words: [Object, Oriented, Programming, in, Java]\nLongest Word: "Programming" (11 characters)`,
    explanation: 'sentence.split(" ") breaks the string at every space into an array of words. The loop tracks the longest token by comparing word.length() > longest.length().'
  }
];
