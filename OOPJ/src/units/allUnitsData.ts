import { ConceptNode, ConceptEdge, ExamQuestion, FillupExercise } from '../types/concept';
import { UNIT1_NODES, UNIT1_EDGES, UNIT1_QUESTIONS, UNIT1_FILLUPS } from './unit1/data';
import { UNIT2_NODES, UNIT2_EDGES, UNIT2_QUESTIONS, UNIT2_FILLUPS } from './unit2/data';
import { UNIT3_NODES, UNIT3_EDGES, UNIT3_QUESTIONS, UNIT3_FILLUPS } from './unit3/data';
import { UNIT4_NODES, UNIT4_EDGES, UNIT4_QUESTIONS, UNIT4_FILLUPS } from './unit4/data';
import { UNIT5_NODES, UNIT5_EDGES, UNIT5_QUESTIONS, UNIT5_FILLUPS } from './unit5/data';

export const ALL_CONCEPT_NODES: ConceptNode[] = [
  ...UNIT1_NODES,
  ...UNIT2_NODES,
  ...UNIT3_NODES,
  ...UNIT4_NODES,
  ...UNIT5_NODES
];

export const ALL_CONCEPT_EDGES: ConceptEdge[] = [
  ...UNIT1_EDGES,
  ...UNIT2_EDGES,
  ...UNIT3_EDGES,
  ...UNIT4_EDGES,
  ...UNIT5_EDGES
];

export const ALL_EXAM_QUESTIONS: ExamQuestion[] = [
  ...UNIT1_QUESTIONS,
  ...UNIT2_QUESTIONS,
  ...UNIT3_QUESTIONS,
  ...UNIT4_QUESTIONS,
  ...UNIT5_QUESTIONS
];

export const ALL_FILLUPS: FillupExercise[] = [
  ...UNIT1_FILLUPS,
  ...UNIT2_FILLUPS,
  ...UNIT3_FILLUPS,
  ...UNIT4_FILLUPS,
  ...UNIT5_FILLUPS
];

export const UNITS_METADATA = [
  {
    id: 'Unit-1' as const,
    title: 'Unit 1: Fundamentals of OOP & Java Basic',
    co: 'CO1',
    description: 'OOP 4 Pillars, WORA architecture, JVM/JRE/JDK, Scanner vs BufferedReader, Operators & Tiered Tariff.',
    accentColor: 'indigo'
  },
  {
    id: 'Unit-2' as const,
    title: 'Unit 2: Classes, Memory & Method Overloading',
    co: 'CO2',
    description: 'Class vs Object, Heap & this pointer, Method/Constructor Overloading, Generational GC, Strings.',
    accentColor: 'sky'
  },
  {
    id: 'Unit-3' as const,
    title: 'Unit 3: Inheritance, Polymorphism & Interfaces',
    co: 'CO3',
    description: 'Inheritance hierarchies, Method Overriding, Dynamic Method Dispatch, super, Abstract classes & Diamond resolution.',
    accentColor: 'emerald'
  },
  {
    id: 'Unit-4' as const,
    title: 'Unit 4: Exception Handling & File Streams',
    co: 'CO4',
    description: 'Checked vs Unchecked, try-catch-finally, Custom Exceptions, Autoboxing, Byte vs Character buffered streams.',
    accentColor: 'amber'
  },
  {
    id: 'Unit-5' as const,
    title: 'Unit 5: Multithreading, Generics & JDBC',
    co: 'CO5',
    description: 'Thread Life Cycle, Concurrency Race Conditions, Mutex Synchronization, Generics & JDBC PreparedStatement.',
    accentColor: 'rose'
  }
];
