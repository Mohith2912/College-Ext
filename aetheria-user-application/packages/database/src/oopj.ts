import type { SeedCourse, SeedModule } from './content';

const units: Array<Omit<SeedModule, 'slug'>> = [
  {
    title: 'Unit 1: Fundamentals of OOP and Java Basics',
    description: 'OOP principles, Java features, JVM architecture, data types, operators, selection, iteration, and console input.',
    markdown: `## Syllabus focus

Understand classes and objects, abstraction, encapsulation, inheritance, polymorphism, Java platform architecture, primitive types, operators, control structures, and basic input.

## Applied learning

Connect the four OOP pillars to real systems, trace source code through JDK, JRE, and JVM, and build electricity-bill and payroll programs.

## Exam focus

Define the core concepts precisely, compare related terms, explain the Java execution pipeline, and apply operators and control structures in programs.`,
  },
  {
    title: 'Unit 2: Classes, Methods, Strings and Memory',
    description: 'Objects, constructors, method overloading, static and final members, arrays, strings, collections, and garbage collection.',
    markdown: `## Syllabus focus

Create classes and objects, use this, overload methods and constructors, work with static and final members, manipulate arrays and strings, use ArrayList, and explain heap memory and garbage collection.

## Applied learning

Inspect object creation and constructor selection, compare String, StringBuffer, and StringBuilder, and analyse how the JVM reclaims unreachable objects.

## Exam focus

Write short Java programs, justify design choices, compare data structures, and explain memory behaviour with clear examples.`,
  },
  {
    title: 'Unit 3: Inheritance, Polymorphism and Interfaces',
    description: 'Inheritance models, overriding, dynamic dispatch, abstract classes, interfaces, access control, and reusable designs.',
    markdown: `## Syllabus focus

Use inheritance, super, method overriding, runtime polymorphism, abstract classes, interfaces, packages, and access modifiers.

## Applied learning

Build extensible hierarchies, resolve interface ambiguity, and connect dynamic method dispatch to maintainable Java designs.

## Exam focus

Differentiate inheritance forms, trace overridden method calls, compare abstract classes and interfaces, and implement interface-based solutions.`,
  },
  {
    title: 'Unit 4: Exception Handling and File Streams',
    description: 'Checked and unchecked exceptions, custom exceptions, wrapper classes, collections, and byte and character streams.',
    markdown: `## Syllabus focus

Handle exceptions with try, catch, finally, throw, and throws; create custom exceptions; use wrapper classes and autoboxing; and process files with byte and character streams.

## Applied learning

Diagnose failure paths, guarantee resource cleanup, compare stream types, and choose buffered I/O for practical file operations.

## Exam focus

Classify exceptions, write robust handling code, explain wrapper conversions, and implement safe file-reading and writing programs.`,
  },
  {
    title: 'Unit 5: Multithreading, Generics and JDBC',
    description: 'Thread life cycle, synchronization, inter-thread coordination, generic programming, collections, and database connectivity.',
    markdown: `## Syllabus focus

Create and coordinate threads, prevent race conditions with synchronization, write generic classes and methods, use collections, and connect Java applications to databases with JDBC.

## Applied learning

Observe thread states and mutex behaviour, design type-safe reusable code, and trace a prepared statement from connection to result processing.

## Exam focus

Explain concurrency hazards, implement synchronized solutions, apply generics correctly, and write the JDBC execution sequence.`,
  },
];

export const oopj: SeedCourse = {
  slug: 'object-oriented-programming-using-java',
  title: 'Object Oriented Programming using Java',
  subject: 'Computer Science',
  code: '2321CSC304R',
  term: 3,
  description: 'Learn Java through concept maps, real-world case studies, interactive simulators, coding exercises, and source-locked exam practice.',
  modules: units.map((unit, index) => ({
    ...unit,
    slug: `oopj-unit-${index + 1}`,
  })),
};
