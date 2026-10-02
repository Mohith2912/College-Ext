import { DragDropChallenge } from '../types/concept';

export const DRAG_DROP_CHALLENGES: DragDropChallenge[] = [
  {
    id: 'dd_jvm_pipeline',
    title: 'Architectural Pipeline: Java Compilation to Execution',
    description: 'Map each component of the Java platform architecture to its exact sequential position in the WORA (Write Once, Run Anywhere) execution lifecycle.',
    unit: 'Unit-1',
    blooms: 'K3',
    targetSlots: [
      { id: 'slot_source', label: '1. Human-Readable Code', hint: 'File created by engineer', category: 'Source Stage', acceptId: 'item_source' },
      { id: 'slot_compiler', label: '2. Translation Tool (JDK)', hint: 'Translates source to bytecode', category: 'Compilation', acceptId: 'item_compiler' },
      { id: 'slot_bytecode', label: '3. Intermediate Format', hint: 'Platform-neutral .class file', category: 'Intermediate', acceptId: 'item_bytecode' },
      { id: 'slot_loader', label: '4. Memory Ingestion', hint: 'Loads class into JVM method area', category: 'JVM Runtime', acceptId: 'item_loader' },
      { id: 'slot_jit', label: '5. Machine Code Translation', hint: 'Compiles hot spots to native code', category: 'JVM Execution', acceptId: 'item_jit' },
      { id: 'slot_memory', label: '6. Runtime Data Area', hint: 'Heap objects and Stack frames', category: 'Hardware/OS', acceptId: 'item_memory' }
    ],
    draggableItems: [
      { id: 'item_compiler', label: 'javac Compiler', sublabel: 'Part of JDK package' },
      { id: 'item_source', label: 'App.java (Source)', sublabel: 'High-level Java syntax' },
      { id: 'item_bytecode', label: 'App.class (Bytecode)', sublabel: 'Interpreted by any JVM' },
      { id: 'item_jit', label: 'JIT Compiler & Interpreter', sublabel: 'Native OS execution engine' },
      { id: 'item_loader', label: 'JVM ClassLoader', sublabel: 'Loads, links, initializes' },
      { id: 'item_memory', label: 'JVM Heap & Stack', sublabel: 'Runtime allocation space' }
    ],
    explanation: 'The developer authors App.java -> javac compiles it into platform-independent bytecode (App.class) -> JVM ClassLoader loads it into memory -> JIT Compiler and Interpreter convert bytecode into host CPU machine instructions!'
  },
  {
    id: 'dd_four_pillars',
    title: 'The Four Pillars: Real-World Metaphors & Mechanisms',
    description: 'Associate each core OOP pillar with its foundational mechanism and real-world engineering analogy.',
    unit: 'Unit-1',
    blooms: 'K3',
    targetSlots: [
      { id: 'slot_abs', label: 'Abstraction', hint: 'Hiding internal implementation details', category: 'Pillar 1', acceptId: 'item_abs' },
      { id: 'slot_enc', label: 'Encapsulation', hint: 'Data hiding with access modifiers', category: 'Pillar 2', acceptId: 'item_enc' },
      { id: 'slot_inh', label: 'Inheritance', hint: 'Code reusability via IS-A hierarchy', category: 'Pillar 3', acceptId: 'item_inh' },
      { id: 'slot_poly', label: 'Polymorphism', hint: 'One interface, multiple implementations', category: 'Pillar 4', acceptId: 'item_poly' }
    ],
    draggableItems: [
      { id: 'item_enc', label: 'Private fields + Getters/Setters', sublabel: 'TV Remote analogy: hides internal circuitry' },
      { id: 'item_abs', label: 'Abstract Classes & Interfaces', sublabel: 'Car pedals: driver drives without engine internals' },
      { id: 'item_poly', label: 'Overloading & Overriding', sublabel: 'Shape.draw(): circle, square behave distinctively' },
      { id: 'item_inh', label: 'extends keyword (IS-A)', sublabel: 'Employee -> Manager / Programmer' }
    ],
    explanation: 'Abstraction exposes "what" not "how" (Car pedal); Encapsulation bundles state with behavior and protects attributes (TV remote); Inheritance provides structural code reusability (Employee -> Manager); Polymorphism allows dynamic dispatch (Shape.draw()).'
  },
  {
    id: 'dd_string_matrix',
    title: 'Text Processing: String vs StringBuilder vs StringBuffer',
    description: 'Classify performance, mutability, and thread safety characteristics into their corresponding Java text handling classes.',
    unit: 'Unit-2',
    blooms: 'K4',
    targetSlots: [
      { id: 'slot_str', label: 'java.lang.String', hint: 'Standard text literal container', category: 'String Class', acceptId: 'item_str' },
      { id: 'slot_sbuf', label: 'java.lang.StringBuffer', hint: 'Safe for concurrent multi-thread writes', category: 'StringBuffer', acceptId: 'item_sbuf' },
      { id: 'slot_sbuild', label: 'java.lang.StringBuilder', hint: 'Fastest single-threaded text modifier', category: 'StringBuilder', acceptId: 'item_sbuild' }
    ],
    draggableItems: [
      { id: 'item_str', label: 'Immutable & Constant Pool', sublabel: 'Modifications create new objects; thread-safe by immutability' },
      { id: 'item_sbuf', label: 'Mutable & Synchronized', sublabel: 'Thread-safe methods with synchronization overhead' },
      { id: 'item_sbuild', label: 'Mutable & Non-Synchronized', sublabel: 'Highest throughput for single-threaded string algorithms' }
    ],
    explanation: 'String is immutable (cannot be altered once created in pool); StringBuffer is mutable and synchronized for multi-threaded safety; StringBuilder is mutable and unsynchronized, making it significantly faster for single-threaded processing.'
  },
  {
    id: 'dd_input_comparison',
    title: 'Console Input: Scanner vs BufferedReader',
    description: 'Categorize attributes between Java Scanner (utility) and BufferedReader (streaming IO) based on performance and API features.',
    unit: 'Unit-1',
    blooms: 'K4',
    targetSlots: [
      { id: 'slot_sc_pkg', label: 'Scanner: Package & API', hint: 'Origin and ease of primitive reading', category: 'Scanner', acceptId: 'item_sc_pkg' },
      { id: 'slot_sc_perf', label: 'Scanner: Buffer & Speed', hint: 'Parsing cost and memory buffer', category: 'Scanner', acceptId: 'item_sc_perf' },
      { id: 'slot_br_pkg', label: 'BufferedReader: Package & API', hint: 'Origin and string parsing requirements', category: 'BufferedReader', acceptId: 'item_br_pkg' },
      { id: 'slot_br_perf', label: 'BufferedReader: Buffer & Speed', hint: 'Throughput and buffer sizing', category: 'BufferedReader', acceptId: 'item_br_perf' }
    ],
    draggableItems: [
      { id: 'item_sc_pkg', label: 'java.util package & nextInt()', sublabel: 'Reads and directly parses primitives without casting' },
      { id: 'item_sc_perf', label: '1 KB Buffer & Slower parsing', sublabel: 'Uses regex tokenization; higher CPU overhead' },
      { id: 'item_br_pkg', label: 'java.io package & readLine()', sublabel: 'Reads strings only; requires Integer.parseInt() conversion' },
      { id: 'item_br_perf', label: '8 KB Buffer & High throughput', sublabel: 'Fast character streaming; ideal for large input volumes' }
    ],
    explanation: 'Scanner belongs to java.util, is easier for beginners, parses primitives automatically, but uses a 1KB buffer with regex tokenization. BufferedReader belongs to java.io, uses an 8KB buffer, reads raw strings synchronously, and is much faster for competitive programming and heavy IO.'
  }
];
