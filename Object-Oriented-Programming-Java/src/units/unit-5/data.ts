import { ConceptNode, ConceptEdge, ExamQuestion, FillupExercise } from '../../types/concept';

export const UNIT5_NODES: ConceptNode[] = [
  {
    id: 'u5_threads_intro',
    title: 'Multithreading & Thread Creation',
    subtitle: 'Extending Thread vs Implementing Runnable',
    unit: 'Unit-5',
    category: 'multithreading_concurrency',
    blooms: 'K2',
    co: 'CO5',
    x: 80,
    y: 120,
    description: 'Multithreading executes multiple lightweight threads concurrently within a single process, sharing common heap memory. Threads are created either by extending Thread or implementing Runnable (preferred for OOP design).',
    keyPoints: [
      'Process: Separate memory space managed by OS. Thread: Lightweight path within process sharing heap',
      'Runnable interface separates task execution from Thread object, allowing class inheritance',
      't.start() allocates a new native execution stack and invokes run() concurrently'
    ],
    codeSnippet: `class MyTask implements Runnable {
    public void run() { System.out.println("Concurrent task"); }
}
Thread t = new Thread(new MyTask());
t.start(); // Spawns new thread`,
    examRelevance: 'Unit 5 Part A (Q1, Q3, Q4, Q5, Q6, Q7) & Part B (Q1): Thread creation and concurrent execution.',
    interactiveSimId: 'lifecycle_sim'
  },
  {
    id: 'u5_thread_lifecycle',
    title: 'Thread Life Cycle & State Transitions',
    subtitle: 'New -> Runnable -> Running -> Blocked -> Dead',
    unit: 'Unit-5',
    category: 'multithreading_concurrency',
    blooms: 'K4',
    co: 'CO5',
    x: 520,
    y: 120,
    description: 'The JVM Thread Scheduler moves threads between states: New (instantiated), Runnable (start() called), Running (executing on CPU), Blocked/Waiting (waiting for lock, sleep, or join), and Terminated.',
    keyPoints: [
      'start() moves thread from New to Runnable',
      'sleep(ms) pauses thread and transitions it to Timed Waiting without releasing locks',
      'wait() releases object lock monitor and waits for notify()/notifyAll()',
      'join() causes calling thread to wait until target thread completes'
    ],
    codeSnippet: `Thread t = new Thread(task); // NEW
t.start(); // RUNNABLE
Thread.sleep(1000); // TIMED_WAITING
t.join(); // Waits until TERMINATED`,
    examRelevance: 'Unit 5 Part A (Q8, Q9) & Part B (Q2, Q4): Analyze the life cycle of a thread with state diagram (13 Marks).',
    interactiveSimId: 'lifecycle_sim'
  },
  {
    id: 'u5_synchronization',
    title: 'Synchronization & Race Condition Defense',
    subtitle: 'Mutual Exclusion (Mutex) & Critical Sections',
    unit: 'Unit-5',
    category: 'multithreading_concurrency',
    blooms: 'K4',
    co: 'CO5',
    x: 520,
    y: 380,
    description: 'When multiple threads concurrently read and write shared data, race conditions corrupt state. The "synchronized" keyword establishes mutual exclusion: only one thread holds the intrinsic lock at any time.',
    keyPoints: [
      'Race condition occurs when non-atomic read-modify-write sequences interleave',
      'synchronized method locks on "this" instance; synchronized(obj) locks on explicit monitor',
      'Guarantees thread-safety and data consistency across deposit/withdrawal operations'
    ],
    codeSnippet: `public synchronized void deposit(int amt) {
    balance += amt; // Protected critical section
}`,
    examRelevance: 'Unit 5 Part A (Q10, Q11, Q12) & Part B (Q3) & Part C (Q1): Bank transaction race condition simulation (15 Marks).',
    interactiveSimId: 'race_condition_sim'
  },
  {
    id: 'u5_generics',
    title: 'Java Generics & Bounded Type Parameters',
    subtitle: 'Compile-Time Type Safety & <T extends Number>',
    unit: 'Unit-5',
    category: 'generics_jdbc',
    blooms: 'K4',
    co: 'CO5',
    x: 1040,
    y: 160,
    description: 'Generics introduce parameterized types (e.g. Box<T>, Pair<K,V>), providing compile-time type checking and eliminating dangerous ClassCastExceptions. Bounded types restrict parameters (<T extends Comparable<T>>).',
    keyPoints: [
      'Enables polymorphic container classes without casting from Object',
      'Generic methods (<T> void print(T[] arr)) operate on diverse types',
      'Bounded parameters enforce upper bounds (<T extends Number> allows int/double math)'
    ],
    codeSnippet: `class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}`,
    examRelevance: 'Unit 5 Part A (Q13, Q14) & Part B (Q6): Analyze generic classes, methods, and bounds (13 Marks).',
    interactiveSimId: 'race_condition_sim'
  },
  {
    id: 'u5_jdbc_architecture',
    title: 'JDBC Architecture & PreparedStatement',
    subtitle: 'Type 4 Thin Driver & SQL Injection Prevention',
    unit: 'Unit-5',
    category: 'generics_jdbc',
    blooms: 'K5',
    co: 'CO5',
    x: 1040,
    y: 420,
    description: 'Java Database Connectivity (JDBC) links applications to relational databases. PreparedStatement precompiles SQL with "?" parameter placeholders, delivering high performance and total immunity against SQL Injection attacks.',
    keyPoints: [
      '5 Core Steps: Load Driver -> DriverManager.getConnection() -> PreparedStatement -> executeQuery/Update -> Close',
      'Type 4 Thin Driver: Pure Java driver converting JDBC directly into database network protocol',
      'PreparedStatement precompiles query plans and sanitizes inputs, preventing SQL injection'
    ],
    codeSnippet: `PreparedStatement ps = con.prepareStatement("INSERT INTO Student VALUES(?, ?)");
ps.setInt(1, 101);
ps.setString(2, "John");
ps.executeUpdate();`,
    examRelevance: 'Unit 5 Part A (Q15) & Part B (Q7, Q8) & Part C (Q2): JDBC architecture and PreparedStatement evaluation (13 Marks).',
    interactiveSimId: 'race_condition_sim'
  },
  {
    id: 'u5_case_bank_concurrency',
    title: 'Case Study: Bank Account Concurrency',
    subtitle: 'Simulating Race Conditions & Mutex Resolution',
    unit: 'Unit-5',
    category: 'case_studies',
    blooms: 'K6',
    co: 'CO5',
    x: 1560,
    y: 200,
    description: 'Shared BankAccount accessed by concurrent Depositor and Withdrawer threads. Demonstrates lost updates and negative balances without synchronization, then resolves with synchronized methods.',
    keyPoints: [
      'Without synchronization: read-modify-write overlaps cause balance corruption',
      'With synchronized methods: threads acquire monitor lock, ensuring serial safety',
      'join() coordinates thread completion before displaying final audited balance'
    ],
    codeSnippet: `public synchronized void withdraw(int amt) {
    if (balance >= amt) balance -= amt;
}`,
    examRelevance: 'Unit 5 Part C (Q1): 15-Mark case study simulating shared bank account and race conditions.',
    interactiveSimId: 'race_condition_sim'
  }
];

export const UNIT5_EDGES: ConceptEdge[] = [
  { from: 'u5_threads_intro', to: 'u5_thread_lifecycle', label: 'governed by', type: 'implements' },
  { from: 'u5_thread_lifecycle', to: 'u5_synchronization', label: 'synchronized via', type: 'manages' },
  { from: 'u5_synchronization', to: 'u5_case_bank_concurrency', label: 'solves race condition in', type: 'uses' },
  { from: 'u5_generics', to: 'u5_jdbc_architecture', label: 'structures DAO for', type: 'uses' }
];

export const UNIT5_QUESTIONS: ExamQuestion[] = [
  {
    id: 'u5_pa_q1',
    unit: 'Unit-5',
    part: 'Part A',
    questionNumber: 'Q1',
    questionText: 'Define multithreading. How does it differ from multitasking?',
    co: 'CO5',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Multithreading: Multiple threads within single process sharing memory', marks: 1 },
      { item: 'Multitasking: Multiple independent processes with separate memory spaces', marks: 1 }
    ],
    modelAnswer: 'Multithreading is the concurrent execution of multiple threads within a single program/process sharing the same memory space.\nMultitasking is the concurrent execution of multiple independent processes, each allocated its own isolated memory address space by the OS.'
  },
  {
    id: 'u5_pa_q7',
    unit: 'Unit-5',
    part: 'Part A',
    questionNumber: 'Q7',
    questionText: 'Distinguish between start() and run() methods of Thread class.',
    co: 'CO5',
    blooms: 'K2',
    marks: 2,
    markingScheme: [
      { item: 'start(): Creates a new native thread and invokes run()', marks: 1 },
      { item: 'run(): Just executes normal method code on current thread without spawning', marks: 1 }
    ],
    modelAnswer: 'start() creates a new call stack in JVM memory and instructs the thread scheduler to execute run() asynchronously in a separate thread.\nCalling run() directly simply invokes the method on the current calling thread without concurrency.'
  },
  {
    id: 'u5_pa_q10',
    unit: 'Unit-5',
    part: 'Part A',
    questionNumber: 'Q10',
    questionText: 'Define thread synchronization, and why is it required?',
    co: 'CO5',
    blooms: 'K1',
    marks: 2,
    markingScheme: [
      { item: 'Controls access to shared resources by multiple threads', marks: 1 },
      { item: 'Prevents race conditions and ensures data consistency', marks: 1 }
    ],
    modelAnswer: 'Thread synchronization is the capability to control the access of multiple threads to any shared resource using locks/monitors. It prevents race conditions and ensures data consistency during concurrent updates.'
  },
  {
    id: 'u5_pb_q2',
    unit: 'Unit-5',
    part: 'Part B',
    questionNumber: 'Q2',
    questionText: 'Analyze the life cycle of a thread in Java by developing a program demonstrating state transitions (start, sleep, wait, join).',
    co: 'CO5',
    blooms: 'K4',
    marks: 13,
    markingScheme: [
      { item: 'Thread Life Cycle States (New, Runnable, Running, Waiting, Dead)', marks: 3 },
      { item: 'State Transition Diagram', marks: 3 },
      { item: 'Effects of start(), sleep(), wait(), join()', marks: 3 },
      { item: 'Complete Java Program demonstration', marks: 4 }
    ],
    modelAnswer: 'New -> (start()) -> Runnable -> (CPU dispatch) -> Running -> (sleep/wait) -> Waiting/Blocked -> (notify/timer) -> Runnable -> (finish run()) -> Terminated.'
  },
  {
    id: 'u5_pb_q8',
    unit: 'Unit-5',
    part: 'Part B',
    questionNumber: 'Q8',
    questionText: 'Evaluate database insertion and retrieval in JDBC using PreparedStatement. Justify why PreparedStatement is preferred over Statement.',
    co: 'CO5',
    blooms: 'K5',
    marks: 13,
    markingScheme: [
      { item: 'Complete JDBC Program with PreparedStatement INSERT/SELECT', marks: 10 },
      { item: 'Security (SQL injection defense), performance (precompilation), maintainability', marks: 3 }
    ],
    modelAnswer: 'PreparedStatement compiles the SQL template once with "?" placeholders. It neutralizes SQL injection attacks by escaping parameters and runs significantly faster for repeated executions.'
  },
  {
    id: 'u5_pc_q1',
    unit: 'Unit-5',
    part: 'Part C',
    questionNumber: 'Q1',
    questionText: 'Shared Bank Account Simulation: Demonstrate race conditions without synchronization, then resolve using synchronized methods. Explain with sample output.',
    co: 'CO5',
    blooms: 'K6',
    marks: 15,
    markingScheme: [
      { item: 'Race condition analysis without synchronization', marks: 3 },
      { item: 'Unsynchronized Program showing balance corruption', marks: 3 },
      { item: 'Synchronized Program with mutex locks', marks: 6 },
      { item: 'Explanation & Output justification', marks: 3 }
    ],
    modelAnswer: 'Refer to interactive Concurrency Race Condition Simulator for live thread interleaving and mutex comparisons.'
  }
];

export const UNIT5_FILLUPS: FillupExercise[] = [
  {
    id: 'u5_fillup_sync',
    title: 'Unit 5A Q11: Declaring Synchronized Methods',
    unit: 'Unit-5',
    blooms: 'K2',
    scenario: 'Protect a shared bank deposit method against concurrent thread race conditions using the Java keyword for mutual exclusion.',
    instructions: 'Specify the synchronization modifier in the method signature.',
    codeTemplate: `public class BankAccount {
    private int balance = 1000;

    // Critical section protected by object monitor
    public {{blank_1}} void deposit(int amount) {
        balance += amount;
    }
}`,
    blanks: [
      { id: 'blank_1', expected: ['synchronized'], hint: 'Keyword ensuring mutual exclusion', placeholder: 'modifier' }
    ],
    optionsPool: ['synchronized', 'volatile', 'static', 'final', 'transient', 'atomic'],
    expectedOutput: `public synchronized void deposit(int amount) { ... }\n[THREAD SAFE] Only one thread can execute deposit() concurrently.`,
    explanation: 'The synchronized keyword prevents multiple threads from executing the critical section at the same time, preventing race conditions.'
  },
  {
    id: 'u5_fillup_preparedstmt',
    title: 'Unit 5B Q8: JDBC PreparedStatement Placeholders',
    unit: 'Unit-5',
    blooms: 'K3',
    scenario: 'Create a precompiled SQL query with parameter placeholders to prevent SQL injection and set the integer parameter.',
    instructions: 'Use the standard parameter placeholder symbol and the setter method.',
    codeTemplate: `String sql = "INSERT INTO Student VALUES({{blank_1}}, ?)";
PreparedStatement ps = con.prepareStatement(sql);
ps.{{blank_2}}(1, 101);
ps.setString(2, "John");
ps.executeUpdate();`,
    blanks: [
      { id: 'blank_1', expected: ['?'], hint: 'Parameter placeholder in prepared statements', placeholder: '?' },
      { id: 'blank_2', expected: ['setInt'], hint: 'Method to bind integer parameter to index 1', placeholder: 'setInt' }
    ],
    optionsPool: ['?', 'setInt', 'setInteger', 'param', 'setString', 'add'],
    expectedOutput: `ps.setInt(1, 101);\n[SQL PRECOMPILED] Query parameterized safely against SQL injection attacks.`,
    explanation: 'PreparedStatement uses "?" placeholders and type-specific setters like setInt() and setString() to sanitize and bind values safely.'
  }
];
