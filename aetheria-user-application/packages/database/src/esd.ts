import type { SeedCourse, SeedModule } from './content';

const units: Array<Omit<SeedModule, 'slug'>> = [
  {
    title: 'Unit 1: Introduction to Embedded Systems',
    description: 'Embedded-system characteristics, classifications, components, reliability, low power, and hard versus soft real-time operation.',
    markdown: `## Syllabus focus

Define embedded systems, identify their characteristics and components, classify embedded products, and distinguish hard and soft real-time requirements.

## Applied learning

Use a smart washing machine to trace the Sense → Compute → Actuate loop. Connect pressure sensing, the MCU, solenoid valves, motor control, safety interrupts, standby power, and optional Wi-Fi telemetry.

## Exam focus

Explain why embedded systems are application-specific, compare real-time deadline types, classify the washing machine, and justify fail-safe hardware and firmware choices.`,
  },
  {
    title: 'Unit 2: Embedded System Architecture',
    description: 'Processor and memory architecture, buses, communication protocols, interrupts, ADC, timers, and automotive control.',
    markdown: `## Syllabus focus

Understand microcontroller architecture, memory organization, I/O interfaces, timers, interrupts, ADC operation, and serial communication protocols.

## Applied learning

Study an automotive ABS ECU that reads wheel-speed sensors, computes wheel slip, exchanges data over CAN, and controls hydraulic valves under strict timing constraints.

## Exam focus

Compare architecture choices, explain interrupt-driven control, map buses and peripherals to their roles, and trace the ABS feedback loop from sensor input to braking action.`,
  },
  {
    title: 'Unit 3: Embedded C and Programming Concepts',
    description: 'Embedded C, registers, bit operations, volatile data, interrupts, timers, watchdogs, and reliable firmware structure.',
    markdown: `## Syllabus focus

Apply Embedded C constructs to hardware control, including register access, bitwise operations, volatile variables, interrupt routines, timers, and watchdog recovery.

## Applied learning

Use a smart greenhouse to connect sensor sampling, irrigation control, environmental thresholds, state logic, and watchdog protection to practical firmware.

## Exam focus

Read and explain hardware-oriented C, justify volatile and bit masking, distinguish polling from interrupts, and show how watchdogs recover a failed controller.`,
  },
  {
    title: 'Unit 4: Embedded OS and RTOS',
    description: 'RTOS tasks, scheduling, priorities, synchronization, communication, timing, and deterministic industrial control.',
    markdown: `## Syllabus focus

Understand RTOS tasks and states, pre-emptive scheduling, priorities, queues, semaphores, mutexes, timing, and inter-task communication.

## Applied learning

Explore an industrial motor controller where sensing, protection, control, communication, and TinyML monitoring must share the processor without missing deadlines.

## Exam focus

Trace task scheduling, explain priority inversion and synchronization, select communication primitives, and relate determinism to safe motor operation.`,
  },
  {
    title: 'Unit 5: Embedded System Design and Development',
    description: 'Design flow, abstraction, UML, verification, hardware acceleration, Edge AI, and connected embedded products.',
    markdown: `## Syllabus focus

Follow the embedded design flow from requirements to verification, understand abstraction levels, apply UML models, and examine testing, IoT layering, and hardware acceleration.

## Applied learning

Study a medical wearable that detects arrhythmia locally, models behaviour with UML, uses an on-device accelerator, and sends only necessary alerts through a connected healthcare stack.

## Exam focus

Differentiate verification and validation, compare Edge and Cloud AI, explain UML diagrams and abstraction levels, and justify rigorous medical-device testing.`,
  },
];

export const esd: SeedCourse = {
  slug: 'embedded-system-design',
  title: 'Embedded System Design',
  subject: 'Embedded Systems',
  code: 'ESD',
  term: 3,
  description: 'Learn embedded systems through five real-world case studies, hardware maps, concept explanations, interactive simulators, and source-backed test practice.',
  modules: units.map((unit, index) => ({ ...unit, slug: `esd-unit-${index + 1}` })),
};
