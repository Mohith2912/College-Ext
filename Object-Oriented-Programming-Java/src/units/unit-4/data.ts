import { ConceptNode, ConceptEdge, ExamQuestion, FillupExercise } from '../../types/concept';

export const UNIT4_NODES: ConceptNode[] = [
  {
    id: 'u4_exception_hierarchy',
    title: 'Checked vs Unchecked Exceptions',
    subtitle: 'Compile-Time Enforced vs Runtime Errors',
    unit: 'Unit-4',
    category: 'exceptions_streams',
    blooms: 'K2',
    co: 'CO4',
    x: 80,
    y: 120,
    description: 'Checked exceptions (IOException, SQLException) are checked by the compiler and must be handled or declared. Unchecked exceptions (ArithmeticException, NullPointerException) extend RuntimeException and occur during execution.',
    keyPoints: [
      'Checked: Compiler forces handling via try-catch or "throws" declaration',
      'Unchecked: Extends RuntimeException; usually represents programming bugs (null pointers, bad indices)',
      'Improves application fault tolerance and graceful error recovery'
    ],
    codeSnippet: `// Checked: Compiler forces handling
FileReader fr = new FileReader("data.txt"); // throws FileNotFoundException

// Unchecked: Runtime error
int result = 10 / 0; // throws ArithmeticException`,
    examRelevance: 'Unit 4 Part A (Q1, Q2) & Part B (Q4): Distinguish between checked and unchecked exceptions (13 Marks).',
    interactiveSimId: 'exception_stack_sim'
  },
  {
    id: 'u4_try_catch_finally',
    title: 'try, catch, finally & throws Pipeline',
    subtitle: 'Guaranteed Resource Cleanup & Propagation',
    unit: 'Unit-4',
    category: 'exceptions_streams',
    blooms: 'K3',
    co: 'CO4',
    x: 520,
    y: 120,
    description: '"try" encloses risky statements; "catch" intercepts specific errors; "finally" executes unconditionally for cleanup (closing files, releasing database connections). "throws" passes responsibility to caller.',
    keyPoints: [
      'finally block runs whether an exception occurs, is caught, or propagates',
      'Multi-catch block (catch (IOException | SQLException e)) handles multiple types cleanly',
      'Crucial for preventing resource leaks (locked file handles, open sockets)'
    ],
    codeSnippet: `try {
    readFile();
} catch (IOException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup executed.");
}`,
    examRelevance: 'Unit 4 Part A (Q4, Q8, Q9, Q12) & Part B (Q2): Analyze exception handling with try-catch-finally (13 Marks).',
    interactiveSimId: 'exception_stack_sim'
  },
  {
    id: 'u4_custom_exceptions',
    title: 'Custom User-Defined Exceptions',
    subtitle: 'Extending java.lang.Exception for Domain Logic',
    unit: 'Unit-4',
    category: 'exceptions_streams',
    blooms: 'K3',
    co: 'CO4',
    x: 520,
    y: 380,
    description: 'Creating domain-specific exceptions by extending Exception. Triggered using "throw new CustomException(msg)" when business rules fail (e.g. insufficient funds, unavailable library book).',
    keyPoints: [
      'Class extends Exception (checked) or RuntimeException (unchecked)',
      'Constructor calls super(message) to pass descriptive error details',
      'Enforces business constraints cleanly without silent corruption'
    ],
    codeSnippet: `class InsufficientBalanceException extends Exception {
    InsufficientBalanceException(String msg) { super(msg); }
}`,
    examRelevance: 'Unit 4 Part A (Q15) & Part B (Q1): Implement custom InsufficientBalanceException program (13 Marks).',
    interactiveSimId: 'exception_stack_sim'
  },
  {
    id: 'u4_autoboxing',
    title: 'Autoboxing & Wrapper Classes',
    subtitle: 'Automatic Primitive <-> Object Conversion',
    unit: 'Unit-4',
    category: 'data_structures',
    blooms: 'K2',
    co: 'CO4',
    x: 1040,
    y: 160,
    description: 'Automatic conversion between Java primitive types (int, double) and their corresponding wrapper objects (Integer, Double). Enables storing primitives inside Collections frameworks like ArrayList.',
    keyPoints: [
      'Autoboxing: int -> Integer (automatic boxing on list.add(10))',
      'Unboxing: Integer -> int (automatic unboxing on int val = list.get(0))',
      'Eliminates tedious manual wrapper calls (Integer.valueOf())'
    ],
    codeSnippet: `ArrayList<Integer> list = new ArrayList<>();
list.add(10); // Autoboxing
int val = list.get(0); // Unboxing`,
    examRelevance: 'Unit 4 Part A (Q3, Q6, Q7, Q13) & Part B (Q6): Analyze autoboxing and unboxing in collections (13 Marks).',
    interactiveSimId: 'stream_buffer_sim'
  },
  {
    id: 'u4_streams_buffering',
    title: 'Byte vs Character Streams & Buffering',
    subtitle: 'FileInputStream vs BufferedInputStream Throughput',
    unit: 'Unit-4',
    category: 'exceptions_streams',
    blooms: 'K5',
    co: 'CO4',
    x: 1040,
    y: 420,
    description: 'Byte streams (FileInputStream/FileOutputStream) read 8-bit bytes for binary data. Character streams (FileReader/BufferedReader) read 16-bit Unicode. Wrapping in Buffered streams reduces disk I/O seeks dramatically.',
    keyPoints: [
      'Byte streams: Raw binary files (images, audio, .bin, .class)',
      'Character streams: Human text files with character encoding support',
      'Buffering: Reads/writes blocks of 8192 bytes, avoiding thousands of slow disk interrupts'
    ],
    codeSnippet: `BufferedInputStream bis = new BufferedInputStream(new FileInputStream("data.bin"));
byte[] buffer = new byte[1024];
int bytesRead = bis.read(buffer);`,
    examRelevance: 'Unit 4 Part A (Q10, Q14) & Part B (Q7, Q8): Evaluate buffered I/O streams for file copying (13 Marks).',
    interactiveSimId: 'stream_buffer_sim'
  },
  {
    id: 'u4_case_library',
    title: 'Case Study: Library Management & Custom Errors',
    subtitle: 'Throwing BookNotAvailableException on Issue',
    unit: 'Unit-4',
    category: 'case_studies',
    blooms: 'K6',
    co: 'CO4',
    x: 1560,
    y: 180,
    description: 'Modular library software managing books. Throws custom BookNotAvailableException if book is already borrowed. Distinguishes checked vs unchecked errors during file persistence.',
    keyPoints: [
      'Encapsulates Book (id, title, isAvailable)',
      'issueBook() verifies state and throws BookNotAvailableException',
      'Safe file persistence with try-with-resources'
    ],
    codeSnippet: `if (!book.isAvailable) {
    throw new BookNotAvailableException("Book is already checked out!");
}`,
    examRelevance: 'Unit 4 Part C (Q1): Full 15-Mark case study on modular library management with custom exceptions.',
    interactiveSimId: 'exception_stack_sim'
  }
];

export const UNIT4_EDGES: ConceptEdge[] = [
  { from: 'u4_exception_hierarchy', to: 'u4_try_catch_finally', label: 'caught via', type: 'implements' },
  { from: 'u4_exception_hierarchy', to: 'u4_custom_exceptions', label: 'subclasses to', type: 'implements' },
  { from: 'u4_custom_exceptions', to: 'u4_case_library', label: 'guards logic in', type: 'uses' },
  { from: 'u4_streams_buffering', to: 'u4_case_library', label: 'persists state via', type: 'uses' }
];

export const UNIT4_QUESTIONS: ExamQuestion[] = [
  {
    id: 'u4_pa_q1',
    unit: 'Unit-4',
    part: 'Part A',
    questionNumber: 'Q1',
    questionText: 'Distinguish between checked and unchecked exceptions in Java?',
    co: 'CO4',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'Checked: checked at compile time, must be handled or declared', marks: 1 },
      { item: 'Unchecked: occurs at runtime, extends RuntimeException', marks: 1 }
    ],
    modelAnswer: 'Checked exceptions are verified by the compiler at compile-time (e.g. IOException, SQLException); code will not compile unless caught or declared via throws.\nUnchecked exceptions occur at runtime (e.g. NullPointerException, ArithmeticException); compiler does not force handling.'
  },
  {
    id: 'u4_pa_q3',
    unit: 'Unit-4',
    part: 'Part A',
    questionNumber: 'Q3',
    questionText: 'Define autoboxing and unboxing with one example each.',
    co: 'CO4',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Autoboxing: primitive -> wrapper class object', marks: 1 },
      { item: 'Unboxing: wrapper object -> primitive', marks: 1 }
    ],
    modelAnswer: 'Autoboxing is the automatic conversion of a primitive data type into its corresponding wrapper class object (e.g. int -> Integer).\nUnboxing is the reverse: automatic conversion of a wrapper object into its primitive type (e.g. Integer -> int).'
  },
  {
    id: 'u4_pb_q1',
    unit: 'Unit-4',
    part: 'Part B',
    questionNumber: 'Q1',
    questionText: 'Illustrate a program that throws an exception when withdrawal exceeds balance.',
    co: 'CO4',
    blooms: 'K3',
    marks: 13,
    markingScheme: [
      { item: 'Custom Exception class InsufficientBalanceException', marks: 2 },
      { item: 'BankAccount class with withdraw() checking balance', marks: 2 },
      { item: 'throw and throws usage with try-catch', marks: 3 },
      { item: 'Complete Java Program demonstration', marks: 6 }
    ],
    modelAnswer: 'Defines InsufficientBalanceException extending Exception. withdraw() throws exception when amount > balance; main method catches and prints message.'
  },
  {
    id: 'u4_pb_q7',
    unit: 'Unit-4',
    part: 'Part B',
    questionNumber: 'Q7',
    questionText: 'Illustrate a Java program to read binary data from a file using FileInputStream wrapped with BufferedInputStream. Explain the role of buffering.',
    co: 'CO4',
    blooms: 'K3',
    marks: 13,
    markingScheme: [
      { item: 'FileInputStream & BufferedInputStream concepts', marks: 4 },
      { item: 'Role of Buffering in reducing disk I/O operations', marks: 2 },
      { item: 'Complete Java Program with read buffer loop', marks: 7 }
    ],
    modelAnswer: 'BufferedInputStream wraps FileInputStream to read chunks of bytes into an in-memory buffer, drastically cutting disk read overhead and improving I/O throughput.'
  },
  {
    id: 'u4_pc_q1',
    unit: 'Unit-4',
    part: 'Part C',
    questionNumber: 'Q1',
    questionText: 'Library Management System: Implement Book and Library classes. Distinguish checked and unchecked exceptions, and create BookNotAvailableException when a user requests an unavailable book.',
    co: 'CO4',
    blooms: 'K6',
    marks: 15,
    markingScheme: [
      { item: 'Class Design & OOP encapsulation', marks: 3 },
      { item: 'Library operations (add, issue, return)', marks: 3 },
      { item: 'Checked vs Unchecked exception handling', marks: 2 },
      { item: 'Custom Exception BookNotAvailableException & complete code', marks: 7 }
    ],
    modelAnswer: 'Refer to interactive Exception Propagation Simulator for custom exception and try-catch flows.'
  }
];

export const UNIT4_FILLUPS: FillupExercise[] = [
  {
    id: 'u4_fillup_custom_exc',
    title: 'Unit 4A Q15: Custom Exception Class Definition',
    unit: 'Unit-4',
    blooms: 'K3',
    scenario: 'Create a custom checked exception named InsufficientBalanceException that forwards the error message to the parent Exception constructor.',
    instructions: 'Extend the parent Exception class and invoke super(msg).',
    codeTemplate: `// User-defined checked exception
public class InsufficientBalanceException extends {{blank_1}} {
    public InsufficientBalanceException(String msg) {
        {{blank_2}}(msg); // Pass message to java.lang.Throwable
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['Exception'], hint: 'Root checked exception class', placeholder: 'ParentClass' },
      { id: 'blank_2', expected: ['super'], hint: 'Keyword to pass argument to parent constructor', placeholder: 'keyword' }
    ],
    optionsPool: ['Exception', 'super', 'Throwable', 'this', 'RuntimeException', 'Error'],
    expectedOutput: `throw new InsufficientBalanceException("Withdrawal exceeds balance!");\n[CUSTOM EXCEPTION THROWN] InsufficientBalanceException caught with message.`,
    explanation: 'Extending Exception creates a custom checked exception. Calling super(msg) stores the failure reason in Throwable for e.getMessage().'
  },
  {
    id: 'u4_fillup_try_finally',
    title: 'Unit 4B Q2: Resource Cleanup with Finally Block',
    unit: 'Unit-4',
    blooms: 'K4',
    scenario: 'Wrap file reading logic in a try block, catch FileNotFoundException, and ensure file streams are closed inside the unconditional cleanup block.',
    instructions: 'Fill in the catch block parameter and the unconditional cleanup keyword.',
    codeTemplate: `try {
    FileReader fr = new FileReader("data.txt");
    // read contents...
} catch ({{blank_1}} e) {
    System.out.println("File not found on filesystem.");
} {{blank_2}} {
    System.out.println("Closing resources unconditionally.");
}`,
    blanks: [
      { id: 'blank_1', expected: ['FileNotFoundException', 'IOException'], hint: 'Specific checked exception for missing file', placeholder: 'ExceptionType' },
      { id: 'blank_2', expected: ['finally'], hint: 'Unconditional execution cleanup keyword', placeholder: 'block' }
    ],
    optionsPool: ['FileNotFoundException', 'finally', 'IOException', 'catch', 'throw', 'close'],
    expectedOutput: `File not found on filesystem.\nClosing resources unconditionally.\n[EXECUTION COMPLETED] finally ran successfully.`,
    explanation: 'The "finally" block is guaranteed to execute regardless of whether an exception is thrown or caught, preventing resource leaks.'
  }
];
