import { UnitData } from '../types/embedded';

export const UNITS_DATA: UnitData[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Introduction to Embedded Systems',
    subtitle: 'From Everyday Appliances to Mission-Critical Hard Real-Time Logic',
    realLifeStory: {
      title: 'The Smart Washing Machine That Saved a Family’s Weekend',
      persona: 'Priya',
      location: 'Suburban Apartment, Pune',
      timeframe: 'Late Friday night (11:15 PM)',
      scenario:
        'Priya comes home late on Friday. She throws clothes into her new smart washing machine, selects "Quick Wash + Eco", closes the lid, and leaves. Exactly 38 minutes later she receives a notification on her phone: "Clothes ready. 1.2 units of electricity used." What appears to be a mundane household chore is actually an orchestration of real-time deadlines, micro-watt standby power management, and tightly coupled sensor-actuator loops.',
      keyMetric: '< 200 ms',
      keyMetricLabel: 'Hard Real-Time Valve Cutoff Deadline',
      quote: 'If water shutoff is delayed by even 500 ms, the inlet pressure floods the chassis.',
    },
    hardwareArchitecture: {
      diagramTitle: 'Smart Washing Machine Electronic Architecture & Wiring',
      description: 'Physical block diagram showing how sensors, MCU, power management, actuators, and communication link together in a closed-loop system.',
      parts: [
        {
          id: 'u1-p1',
          name: 'Water Pressure Sensor (Diaphragm + LC Oscillator)',
          type: 'Sensor',
          role: 'Measures hydrostatic water pressure in the outer tub and converts it to a clean digital frequency pulse train.',
          keyConcepts: ['Sensor Input', 'Hard Real-Time', 'Frequency Modulation (18–24 kHz)'],
          howItWorks: 'As water fills the tub, air trapped in the compression dome pushes against a flexible silicone diaphragm. This shifts a ferrite core inside an inductor, changing an LC resonant frequency from 18.2 kHz (empty) to 21.4 kHz (full). The MCU timer input capture measures this frequency with quartz precision.',
          pinoutOrBus: 'Timer 1 Input Capture Pin (TIM1_CH1 / PA8)',
          associatedKeywords: [
            { keyword: 'Sensor', explanation: 'A hardware transducer that converts a physical variable (pressure) into an electrical signal (frequency).' },
            { keyword: 'Hard Real-Time Deadline', explanation: 'When 21.4 kHz is detected, the inlet valve must close in < 200 ms to avoid catastrophic flooding.' },
          ],
        },
        {
          id: 'u1-p2',
          name: '32-Bit Main Control Board MCU (STM32 / Renesas)',
          type: 'Microcontroller / SoC',
          role: 'The digital brain executing the wash cycle state machine, motor PID algorithm, and safety interlocks.',
          keyConcepts: ['Embedded System Definition', 'Application-Specific', 'High Reliability'],
          howItWorks: 'Contains an ARM Cortex-M core, 512 KB on-chip NOR Flash, and 64 KB SRAM. Runs deterministic bare-metal firmware that boots in under 40 milliseconds without any general-purpose OS bloat.',
          pinoutOrBus: 'System Bus Matrix + APB1/APB2 Peripherals',
          associatedKeywords: [
            { keyword: 'Application-Specific', explanation: 'Hardware and firmware designed purely for washing cycles; no web browsers or third-party apps can run.' },
            { keyword: 'High Reliability', explanation: 'Engineered with brown-out reset circuits and watchdog timers to run for 10 years without freezing.' },
          ],
        },
        {
          id: 'u1-p3',
          name: 'Dual AC Water Inlet Solenoid Valves',
          type: 'Actuator',
          role: 'Electromechanical valves switching 230V AC pressurized mains water into the detergent drawer.',
          keyConcepts: ['Actuator', 'Hard Real-Time Actuation', 'Triac Switching'],
          howItWorks: 'The MCU energizes an opto-triac circuit that conducts AC line current through a copper solenoid coil. The electromagnetic field lifts a spring-loaded plunger. De-energizing the pin cuts the field, snapping the valve shut in under 18 ms.',
          pinoutOrBus: 'GPIO Output Pin PB4 driving MOC3041 Optotriac',
          associatedKeywords: [
            { keyword: 'Actuator', explanation: 'A hardware device that converts electrical control signals into physical mechanical motion (water flow).' },
            { keyword: 'Deterministic Cutoff', explanation: 'Missing the de-energize timing by 1 second spills liters of water onto the bathroom floor.' },
          ],
        },
        {
          id: 'u1-p4',
          name: '3-Phase BLDC Inverter Motor & IPM',
          type: 'Actuator',
          role: 'Drives the drum smoothly from gentle 45 RPM tumble to 1200 RPM high-speed spin extraction.',
          keyConcepts: ['Low Power Consumption', 'PWM (Pulse Width Modulation)', 'Space Vector Modulation'],
          howItWorks: 'Rather than using an inefficient AC motor with a mechanical transmission, a 3-phase Intelligent Power Module (IPM) switches high-voltage IGBTs using variable-frequency PWM, consuming only 1.2 kWh total.',
          pinoutOrBus: 'TIM8 6-Channel Complementary PWM with Dead-Time',
          associatedKeywords: [
            { keyword: 'Pulse Width Modulation (PWM)', explanation: 'Rapidly chopping DC voltage to deliver variable torque and speed without resistive heat losses.' },
            { keyword: 'Low Power Design', explanation: 'Eliminates mechanical clutches and friction brakes, maximizing Energy Star efficiency.' },
          ],
        },
        {
          id: 'u1-p5',
          name: 'Standby Switch-Mode Power Supply (SMPS)',
          type: 'Power',
          role: 'Supplies isolated 12V and 3.3V DC rails while maintaining sub-0.5W standby sleep power.',
          keyConcepts: ['Low Power Standby', '0.3 W Sleep Mode', 'Clock Gating'],
          howItWorks: 'When the machine is idle, the MCU enters STOP mode: high-speed crystals are shut off, and only the 32.768 kHz RTC and touch-sensor pins remain active, drawing only 0.3 W from the wall.',
          pinoutOrBus: '3.3V VDD Rail + Standby Wakeup Pin (WKUP)',
          associatedKeywords: [
            { keyword: 'Quiescent Current', explanation: 'The minimal electrical current drawn by the system when all primary functions are asleep.' },
          ],
        },
        {
          id: 'u1-p6',
          name: 'Wi-Fi / BLE Telemetry Co-Processor (ESP32)',
          type: 'Communication',
          role: 'Sends wash completion notifications and energy statistics to Priya’s smartphone app.',
          keyConcepts: ['Communication Protocol', 'Networked / IoT-Enabled', 'Standalone Resilience'],
          howItWorks: 'Communicates with the main MCU over a UART serial bridge. Formats cycle status into JSON MQTT packets sent over 2.4 GHz Wi-Fi. If Wi-Fi is lost, the machine runs perfectly in standalone mode.',
          pinoutOrBus: 'USART2 (TX/RX) @ 115200 Baud',
          associatedKeywords: [
            { keyword: 'Standalone Embedded System', explanation: 'Core real-time operations function 100% autonomously without requiring an active internet connection.' },
            { keyword: 'Networked / IoT System', explanation: 'Adds cloud visibility and user notifications as a non-blocking convenience layer.' },
          ],
        },
        {
          id: 'u1-p7',
          name: 'Lid Safety Switch Interlock',
          type: 'Safety / Interlock',
          role: 'Detects door opening during spin cycle and triggers immediate hardware dynamic braking.',
          keyConcepts: ['Hard Real-Time Interrupt (EXTI)', 'Dynamic Braking', 'Fail-Safe Safety'],
          howItWorks: 'A physical microswitch wired to an External Interrupt line (EXTI0). If forced open at 1200 RPM, the MCU immediately switches the motor driver into dynamic brake mode within 24 ms to protect user safety.',
          pinoutOrBus: 'EXTI0 Pin (PA0, Active-Low Edge Triggered)',
          associatedKeywords: [
            { keyword: 'Hardware Interrupt (ISR)', explanation: 'An asynchronous hardware signal that forces the CPU to pause current tasks and run a critical safety routine.' },
          ],
        },
      ],
    },
    concepts: [
      {
        id: 'u1-c1',
        number: 1,
        title: 'Embedded System Definition',
        tagline: 'Dedicated purpose, not general-purpose computing',
        realLocation: 'The entire washing machine control board and internal wiring',
        deepDive:
          'Unlike a desktop PC or smartphone designed to run arbitrary user applications, an embedded system is a computer system designed for a dedicated purpose. The washing machine’s mainboard has no keyboard, no monitor output, and cannot run office spreadsheets. Its single, immutable reason for existence is to cycle through water filling, heating, drum agitation, rinsing, and high-speed spin extraction safely and predictably.',
        hardwareAnchor: 'Main Control PCB (32-bit MCU + relay drive stage + snubber circuits)',
        keyTakeaway: 'Hardware and software are co-designed for one dedicated task with zero bloat.',
        category: 'Hardware',
      },
      {
        id: 'u1-c2',
        number: 2,
        title: 'Application-Specific',
        tagline: 'Fixed firmware ROM with zero general multitasking bloat',
        realLocation: 'The firmware burned into on-chip NOR Flash',
        deepDive:
          'You cannot install WhatsApp or play games on this machine. There is no package manager or dynamic runtime loader. The flash memory contains a bare-metal or lightweight RTOS image with fixed wash profile state machines (Eco, Delicates, Heavy Duty, Spin Only). Every byte of flash is dedicated to motor profiles, water calibration, and safety fault trees.',
        hardwareAnchor: '512 KB Internal Flash ROM (Locked JTAG read-out protection)',
        keyTakeaway: 'Application-specific design drastically slashes silicon cost, power draw, and attack surface.',
        category: 'Software',
      },
      {
        id: 'u1-c3',
        number: 3,
        title: 'Real-Time Operation (Hard vs Soft)',
        tagline: 'Missing a hard deadline means flooding; missing a soft deadline is merely inconvenient',
        realLocation: 'Water-level frequency counter ISR & 7-segment UI task',
        deepDive:
          'Real-time does not mean "ultra-fast"; it means logically correct within a bounded time window. When the water pressure sensor triggers the "full" threshold frequency (21.4 kHz), the 230V AC inlet solenoid valve must be de-energized within 200 ms. A delay of 1 second leads to chassis overflow and apartment flooding (Hard Real-Time). Conversely, updating the remaining minutes on the front LED display or sending the phone push notification can lag by 1 to 2 seconds without consequence (Soft Real-Time).',
        hardwareAnchor: 'Optical/Piezo Water Pressure Sensor + Triac Solenoid Driver',
        codeSnippet: `// Hard Real-Time ISR: Water level threshold reached
void EXTI0_IRQHandler(void) {
    if (WATER_PRESSURE_REG >= TANK_FULL_THRESHOLD) {
        SOLENOID_GPIO->ODR &= ~(1 << SOLENOID_PIN); // Closes in < 18 microseconds!
        water_overflow_timer_stop();
    }
    EXTI->PR |= (1 << 0); // Clear interrupt flag
}`,
        keyTakeaway: 'Hard real-time failure causes system destruction; soft real-time failure causes minor degraded service.',
        category: 'Real-Time',
      },
      {
        id: 'u1-c4',
        number: 4,
        title: 'High Reliability & Harsh Environments',
        tagline: '8 to 10 years without a single reboot or PCB failure',
        realLocation: 'Conformal-coated PCB near the drum vibration zone',
        deepDive:
          'Consumer washing machines operate in extreme conditions: 95% relative humidity, hot water steam up to 90°C, and violent 1200 RPM mechanical vibrations. The PCB is potted in silicone resin, electrolytic capacitors are rated for 105°C, and the firmware uses Watchdog Timers and brown-out detectors to run flawlessly for a decade without human maintenance.',
        hardwareAnchor: 'Potted Appliance Grade FR4 PCB with TVS Diodes',
        keyTakeaway: 'Reliability is engineered through environmental hardening and fail-safe firmware design.',
        category: 'Hardware',
      },
      {
        id: 'u1-c5',
        number: 5,
        title: 'Low Power & Energy Efficiency',
        tagline: '0.3 W standby sleep mode + Variable PWM BLDC motor drive',
        realLocation: 'Switch-mode power supply (SMPS) & 3-phase inverter bridge',
        deepDive:
          'Energy Star regulations require the machine to consume under 0.5 W in standby. When Priya goes to bed, the MCU enters deep sleep (clock gated, peripherals disabled, waking only via lid switch or touch button). During washing, rather than running an AC motor at full throttle against a mechanical clutch, a 3-Phase Inverter uses Space Vector PWM to adjust motor speed continuously, using 1.2 kWh total.',
        hardwareAnchor: 'Buck Converter SMPS (12V to 3.3V) + IPM (Intelligent Power Module)',
        keyTakeaway: 'Micro-watt sleep modes combined with algorithmic PWM motor control maximize electrical efficiency.',
        category: 'Hardware',
      },
      {
        id: 'u1-c6',
        number: 6,
        title: 'Components in Action (Closed-Loop Sense-Compute-Act)',
        tagline: 'Sensors feed the Microcontroller, which commands Actuators and Comms',
        realLocation: 'Sensors, MCU brain, Relays/Inverters, and Wi-Fi Transceiver',
        deepDive:
          '1. Sensors: Frequency-output pressure sensor (water level), NTC thermistor (drum temperature), Hall effect sensor (motor tachometer), 3-axis accelerometer (unbalanced load detection).\n2. Microcontroller: Processes ADC readings, computes PID loops, checks interlocks.\n3. Actuators: Dual water solenoid valves, 2000W heating element, 3-phase BLDC motor, electromagnetic door safety lock.\n4. Communication: 2.4 GHz Wi-Fi SoC reporting telemetry to cloud broker.\n5. Firmware: Immutable ROM state machine executing control loops.',
        hardwareAnchor: 'System-wide wiring harness and sensor bus',
        keyTakeaway: 'The essence of any embedded system is the Sense → Compute → Actuate closed-loop.',
        category: 'Hardware',
      },
      {
        id: 'u1-c7',
        number: 7,
        title: 'Classification of Embedded Systems',
        tagline: 'Standalone, Networked/IoT, and Medium-Scale embedded',
        realLocation: 'Dual-processor architecture (Host MCU + Wi-Fi module)',
        deepDive:
          '• Standalone: If Priya’s home Wi-Fi router catches fire or the internet dies, the wash cycle finishes without hesitation. The core safety system requires zero cloud connection.\n• Networked / IoT-enabled: When connected, an onboard ESP32 or telemetry chip publishes MQTT packets containing cycle status, energy stats, and fault codes.\n• Scale: Medium-scale system (32-bit MCU with 64KB RAM, RTOS, multiple peripheral buses). More complex than a quartz digital watch, but less complex than a 6-axis industrial robotic arm.',
        hardwareAnchor: 'Host MCU (STM32/Renesas) + Wi-Fi Co-processor (ESP32/Realtek)',
        keyTakeaway: 'Modern appliances combine standalone failsafe determinism with cloud-connected convenience.',
        category: 'Networking',
      },
    ],
    checkpoint: {
      id: 'u1-chk',
      question:
        'If the washing machine lid is forced open while the drum is spinning at 1200 RPM, which type of real-time response is required, and what must the embedded system do?',
      contextScenario:
        'A child opens the door latch while the heavy metallic drum is rotating at 1200 RPM during the spin cycle.',
      options: [
        {
          id: 'opt-a',
          text: 'Soft Real-Time: Display an error code on the LCD within 2 seconds, then slowly coast the motor to a stop when convenient.',
          isCorrect: false,
          explanation:
            'A 2-second delay at 1200 RPM allows hands to enter the high-speed drum, causing severe lacerations or amputation. Soft real-time is never acceptable for life-critical safety hazards.',
        },
        {
          id: 'opt-b',
          text: 'Hard Real-Time: Immediately trigger a hardware brake / inverter dynamic braking and cut motor power within tens of milliseconds.',
          isCorrect: true,
          explanation:
            'This is a Hard Real-Time deadline! Missing this deadline results in catastrophic injury. The lid switch triggers a high-priority hardware interrupt (EXTI) that instantly puts the 3-phase inverter into dynamic brake mode to halt drum momentum.',
        },
        {
          id: 'opt-c',
          text: 'Firm Real-Time: Send a notification to the smartphone app first to confirm whether the user intended to open the lid.',
          isCorrect: false,
          explanation:
            'A cloud roundtrip takes 200–2000 ms and depends on network connectivity. Critical safety interlocks can never wait on external network communication.',
        },
        {
          id: 'opt-d',
          text: 'Non-Real-Time: Schedule a FreeRTOS background task with lowest priority to ramp down the motor over 30 seconds.',
          isCorrect: false,
          explanation:
            'Lowest-priority scheduling means a spinning drum might keep running while other UI or heating tasks execute, completely defeating the safety interlock.',
        },
      ],
      engineeringTakeaway:
        'In safety-critical embedded systems, physical safety interlocks are ALWAYS Hard Real-Time, implemented directly via hardware interrupts or fail-safe mechanical cutoff relays.',
      misconceptionAlert:
        'Students often think "hard real-time" means gigahertz speed. It actually means determinism: a missed deadline equals total system failure or bodily harm.',
    },
    whatIfScenarios: [
      {
        id: 'u1-wi1',
        title: 'What if water shutoff was treated as a Soft Real-Time task?',
        change: 'Water level monitoring runs in a low-priority background thread with a 5-second polling delay.',
        catastrophicOutcome: 'Water overflows the drum, damages the floor, causes electrical short circuits, and triggers 230V shock risk.',
        rootCause: 'Soft real-time allows task starvation if higher-priority UI or Wi-Fi communications monopolize the CPU.',
        engineeringRemedy: 'Assign water level sensor reading to a dedicated Hardware Timer Input Capture ISR with hard 200 ms timeout.',
      },
      {
        id: 'u1-wi2',
        title: 'What if the system used a general-purpose OS (e.g., standard desktop Linux)?',
        change: 'Replacing the 32-bit bare-metal MCU with a Raspberry Pi running full desktop Ubuntu.',
        catastrophicOutcome: 'Boot time increases from 50 ms to 45 seconds; power draw jumps from 0.3W to 4W; un-journaled SD card corrupts on sudden power pull; non-deterministic kernel scheduling misses 200ms solenoid deadline.',
        rootCause: 'Desktop OS introduces non-deterministic thread preemption, swap file thrashing, and high quiescent current.',
        engineeringRemedy: 'Keep appliance control on a bare-metal microcontroller or deterministically scheduled RTOS.',
      },
    ],
    simulatorInfo: {
      title: 'Smart Washing Machine Cycle & Real-Time Engine',
      description: 'Interact with water valves, drum RPM, PWM duty cycles, and trigger hard vs soft real-time events to see millisecond determinism in action.',
      tags: ['Hard vs Soft Real-Time', 'PWM Motor Drive', 'Sensor-Actuator Loop', '0.3W Standby'],
    },
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Embedded System Architecture',
    subtitle: 'Inside the ABS ECU: Harvard Dual-Bus, CAN Bus Arbitration & Memory Subsystems',
    realLifeStory: {
      title: 'The Car That Refused to Skid on a Rainy Highway',
      persona: 'Rahul',
      location: 'Mumbai-Pune Expressway (Monsoon Downpour)',
      timeframe: 'Sunday evening (7:42 PM)',
      scenario:
        'Rahul is driving at 90 km/h on a wet, oil-slicked highway when a truck suddenly brakes. Rahul stomps on the brake pedal. Under ordinary hydraulic braking, all four wheels would lock immediately, sending the 1.5-ton car spinning out of control. Instead, in less than 50 milliseconds, the Anti-lock Braking System (ABS) Electronic Control Unit (ECU) takes command, pulsing the brake pressure 15 times per second to stop the car in a straight line.',
      keyMetric: '< 50 ms',
      keyMetricLabel: 'ABS Closed-Loop Wheel Speed to Solenoid Reaction Time',
      quote: 'At 90 km/h, every 10 ms of delay translates to an extra 25 cm of unguided skid distance.',
    },
    hardwareArchitecture: {
      diagramTitle: 'Automotive Anti-Lock Braking System (ABS) ECU Block Diagram',
      description: 'Architecture diagram showing the dual-bus Harvard CPU core, 4 wheel speed sensors, CAN bus transceiver, memory subsystems, and hydraulic solenoid valves.',
      parts: [
        {
          id: 'u2-p1',
          name: 'Harvard Dual-Bus Automotive Microcontroller (Infineon AURIX / NXP S32K)',
          type: 'Microcontroller / SoC',
          role: 'High-performance 32-bit automotive brain executing wheel slip math in deterministic clock cycles.',
          keyConcepts: ['Harvard Architecture', 'Dual Bus (I-Code & D-Code)', 'Microcontroller Integration'],
          howItWorks: 'Has physically separate instruction and data buses. While the arithmetic logic unit (ALU) calculates wheel slip using RAM data, the instruction bus simultaneously fetches the next brake valve control opcode from Flash, eliminating the Von Neumann bus bottleneck.',
          pinoutOrBus: 'Dual Bus Matrix (32-bit I-Bus + 32-bit D-Bus)',
          associatedKeywords: [
            { keyword: 'Harvard Architecture', explanation: 'Separate memory buses for code and data that allow parallel instruction fetching and data read/writes.' },
            { keyword: 'Microcontroller vs Microprocessor', explanation: 'All components (CPU, Flash, RAM, CAN, ADC) on one single die to resist automotive vibration and heat.' },
          ],
        },
        {
          id: 'u2-p2',
          name: '4x Active Wheel Speed Magnetic Sensors (FL, FR, RL, RR)',
          type: 'Sensor',
          role: 'Detects the rotational angular velocity of all 4 wheels individually at 100 kHz pulse rates.',
          keyConcepts: ['Sensor Input', 'Wheel Speed Capture', 'Hall Effect / Magnetoresistive'],
          howItWorks: 'Mounted adjacent to magnetic toothed tone rings on wheel hubs. Each tooth passing produces a current pulse. The MCU Timer Input Capture channels measure period between pulses to calculate velocity.',
          pinoutOrBus: 'Timer 2 & Timer 3 Input Capture Pins (TIM2_CH1..CH4)',
          associatedKeywords: [
            { keyword: 'Wheel Slip Ratio', explanation: 'The relative speed difference between vehicle chassis speed and wheel rotation: (V_veh - V_wheel) / V_veh.' },
          ],
        },
        {
          id: 'u2-p3',
          name: 'High-Speed CAN Bus Transceiver (TJA1051)',
          type: 'Communication',
          role: 'Connects the ABS ECU to the Engine ECU, Transmission, and Dashboard over twisted-pair CAN lines.',
          keyConcepts: ['CAN Bus Protocol', 'Bitwise Arbitration', 'Dominant vs Recessive Bits'],
          howItWorks: 'Converts MCU digital UART/CAN RX/TX signals into differential voltage on CAN_H and CAN_L lines. Uses non-destructive bitwise arbitration where critical brake frames (ID 0x010) overwrite low-priority frames without collision.',
          pinoutOrBus: 'Differential 2-wire twisted pair (CAN_H, CAN_L) @ 500 kbps',
          associatedKeywords: [
            { keyword: 'Controller Area Network (CAN)', explanation: 'A robust automotive bus standard for reliable multi-master communication in noisy environments.' },
            { keyword: 'Bitwise Arbitration', explanation: 'Dominant 0 bits physically pull down recessive 1 bits; lower numeric CAN ID wins the bus with zero latency.' },
          ],
        },
        {
          id: 'u2-p4',
          name: '2 MB ECC Flash (ROM) & 256 KB ECC SRAM',
          type: 'Memory',
          role: 'Flash stores immutable safety algorithms; SRAM holds live wheel speeds and slip variables.',
          keyConcepts: ['Flash (ROM) vs RAM', 'Non-Volatile Storage', 'Error Correcting Code (ECC)'],
          howItWorks: 'Flash memory retains the compiled control firmware permanently without battery power. High-speed SRAM allows microsecond reads/writes of dynamic sensor arrays. ECC circuitry detects and corrects single-bit flips caused by electrical noise.',
          pinoutOrBus: 'Internal High-Speed Memory Bus with MPU',
          associatedKeywords: [
            { keyword: 'Non-Volatile Memory', explanation: 'Flash ROM that permanently stores code firmware across vehicle battery disconnections.' },
            { keyword: 'Volatile Memory', explanation: 'Ultra-fast SRAM used for real-time scratchpad calculations that vanishes when power is lost.' },
          ],
        },
        {
          id: 'u2-p5',
          name: 'Hydraulic ABS Modulator & Solenoid Valves (8 Valves)',
          type: 'Actuator',
          role: 'Modulates brake fluid pressure to each wheel caliper 15 times per second to prevent wheel lockup.',
          keyConcepts: ['Actuator', 'High-Speed Pulsing (15 Hz)', 'Hydraulic Modulation'],
          howItWorks: 'Each wheel has an inlet and an outlet solenoid. During heavy braking, the ECU pulses the solenoids: 1) Dump pressure (wheel unlocks), 2) Hold pressure, 3) Reapply pressure, maintaining optimal 18% tire slip.',
          pinoutOrBus: 'High-Current MOSFET Low-Side Drivers with Current Feedback',
          associatedKeywords: [
            { keyword: 'Closed-Loop Control', explanation: 'Continuously measuring wheel speed feedback to modulate hydraulic actuator pressure.' },
          ],
        },
        {
          id: 'u2-p6',
          name: 'On-Chip FPGA / DSP Filter Block (Premium Vehicles)',
          type: 'Microcontroller / SoC',
          role: 'Executes parallel digital FIR noise filtering for all 4 wheels simultaneously in hardware.',
          keyConcepts: ['FPGA Acceleration', 'Hardware Parallelism', 'DSP Co-Processor'],
          howItWorks: 'Operates in silicon hardware alongside the main CPU. Performs digital filtering concurrently on all 4 wheel streams, so the main CPU only reads clean speed values without burning CPU clock cycles.',
          pinoutOrBus: 'Direct Silicon Bus Matrix / Dual-Port Shared Registers',
          associatedKeywords: [
            { keyword: 'Hardware Acceleration', explanation: 'Offloading repetitive mathematical filtering to dedicated digital logic circuits.' },
          ],
        },
      ],
    },
    concepts: [
      {
        id: 'u2-c1',
        number: 1,
        title: 'Harvard Architecture vs. Von Neumann',
        tagline: 'Simultaneous instruction fetch and data operand access',
        realLocation: 'The silicon CPU core inside the Bosch ABS ECU',
        deepDive:
          'In a pure Von Neumann architecture, code instructions and sensor data share the exact same physical bus. The CPU must first fetch the instruction ("READ SENSOR"), wait for the bus to clear, then fetch the sensor data, creating the famous "Von Neumann Bottleneck". In contrast, the ABS MCU uses a Harvard (or modified Harvard) architecture with separate program and data buses. While the CPU is executing the slip calculation and reading the current wheel-speed from RAM, it is simultaneously fetching the next PWM instruction from Flash. This dual-bus parallel flow is why the ECU easily meets the 50 ms latency requirement.',
        hardwareAnchor: 'Dual Bus Silicon Matrix (Instruction Bus + Data Bus / I-Code & D-Code)',
        keyTakeaway: 'Harvard architecture eliminates bus contention, guaranteeing predictable clock cycles for mission-critical math.',
        category: 'Architecture',
      },
      {
        id: 'u2-c2',
        number: 2,
        title: 'Microcontroller vs. Microprocessor',
        tagline: 'Single-chip SoC vs bulky multi-chip desktop processor',
        realLocation: 'The single automotive-grade ABS MCU (e.g. Infineon AURIX or NXP S32K)',
        deepDive:
          'Why not use an Intel Core i7 or standard microprocessor? A microprocessor chip only contains the CPU arithmetic core; it requires external RAM chips, external Flash chips, external bus transceivers, external clock generators, and external ADC chips. Under 40G road vibrations and -40°C to +125°C under-hood temperatures, dozens of external solder joints would crack and fail. A Microcontroller integrates CPU, Flash, SRAM, CAN Controllers, High-Speed ADCs, and Timers onto a single silicon die, maximizing vibration resilience, lowering cost, and cutting boot time to microseconds.',
        hardwareAnchor: 'Single Monolithic Silicon Die (AEC-Q100 Grade 0 Certified)',
        keyTakeaway: 'Microcontrollers provide all-in-one integration, ultra-high vibration durability, and deterministic timing.',
        category: 'Hardware',
      },
      {
        id: 'u2-c3',
        number: 3,
        title: 'Memory Roles: Flash (ROM) vs. RAM',
        tagline: 'Permanent safety algorithms vs live wheel-speed slip variables',
        realLocation: 'On-chip Non-Volatile Flash and High-Speed Static RAM (SRAM)',
        deepDive:
          '• Flash (ROM): Non-volatile memory that retains data without power. Stores the compiled ABS control algorithm, lookup tables for tire friction coefficients, and vehicle dynamic parameters. It is read-only during vehicle operation to prevent code corruption.\n• RAM (SRAM): Volatile, ultra-fast memory. Holds the live state: 4 wheel speeds (FL, FR, RL, RR), estimated vehicle speed, wheel acceleration/deceleration, target brake pressure, and CAN bus transmit buffers. When the ignition is turned off, RAM contents disappear.',
        hardwareAnchor: '2 MB ECC Flash + 256 KB ECC SRAM (Error-Correcting Code Memory)',
        keyTakeaway: 'Code lives immutably in Flash; dynamic sensor variables and calculations mutate in RAM.',
        category: 'Hardware',
      },
      {
        id: 'u2-c4',
        number: 4,
        title: 'Vehicle Communication Protocols',
        tagline: 'CAN Bus, SPI, I²C, and UART — the nervous system of an automobile',
        realLocation: 'Twisted pair wiring harness & internal PCB traces',
        deepDive:
          '1. CAN Bus (Controller Area Network): Differential 2-wire twisted pair (CAN_H, CAN_L). Connects ABS ECU, Engine ECU, Transmission, and Instrument Cluster at 500 kbps / 2 Mbps (CAN-FD). Uses bitwise arbitration: lower identifier number = higher priority. Brake commands (ID 0x010) always beat radio volume (ID 0x520) without packet collision!\n2. SPI (Serial Peripheral Interface): Synchronous 4-wire high-speed bus (MOSI, MISO, SCK, CS) communicating with internal high-pressure hydraulic transducers at 10 MHz.\n3. I²C (Inter-Integrated Circuit): 2-wire bus (SDA, SCL) reading board temperature sensors.\n4. UART (Universal Asynchronous Receiver/Transmitter): Used via the OBD-II diagnostic port by workshop mechanics to read DTC fault codes.',
        hardwareAnchor: 'CAN Transceiver IC (TJA1051) with ISO 11898-2 physical layer',
        codeSnippet: `// CAN Frame Structure (Standard 2.0A):
// [SOF: 1 bit] [ID: 11 bits] [RTR: 1 bit] [Control: 6 bits]
// [Data: 0-8 Bytes] [CRC: 15 bits] [ACK: 2 bits] [EOF: 7 bits]
// Dominant (0) overwrites Recessive (1) on the physical bus!`,
        keyTakeaway: 'Different protocols balance speed, wire count, noise immunity, and bus arbitration priorities.',
        category: 'Networking',
      },
      {
        id: 'u2-c5',
        number: 5,
        title: 'Address Bus & Memory-Mapped Registers',
        tagline: 'How the CPU selects which wheel sensor register to read',
        realLocation: 'Internal 32-bit Address Bus lines inside the MCU',
        deepDive:
          'When the CPU executing the ABS loop needs the Front-Left wheel pulse count, it places the hexadecimal address (e.g. 0x40003010) on the 32-bit address bus. Address decoder circuitry inside the MCU activates the chip-select for Timer 2 Input Capture Channel 1. The data lines then return the 32-bit wheel pulse count into CPU register R0. Without the address bus, the CPU cannot distinguish between wheel speed, brake pedal position, or battery voltage.',
        hardwareAnchor: '32-bit Internal Parallel Bus with Memory Protection Unit (MPU)',
        keyTakeaway: 'The address bus selects the target memory or peripheral register; the data bus transports the actual value.',
        category: 'Architecture',
      },
      {
        id: 'u2-c6',
        number: 6,
        title: 'FPGA Hardware Acceleration (Premium Vehicles)',
        tagline: 'True parallel digital filtering for all 4 wheels simultaneously',
        realLocation: 'Co-processor FPGA/ASIC fabric inside high-performance ECUs',
        deepDive:
          'In high-end sports sedans and electric vehicles, raw magnetic wheel speed sensors generate high-frequency pulses prone to electromagnetic noise from high-voltage inverters. Rather than bogging down the main CPU with 4 separate software FIR digital filtering loops, a small FPGA block processes all 4 wheel signals in pure parallel hardware every microsecond. The main CPU only receives pre-filtered, pristine speed values from dual-port RAM.',
        hardwareAnchor: 'Embedded FPGA / Dedicated DSP Coprocessor Core',
        keyTakeaway: 'FPGAs execute parallel operations concurrently in silicon hardware, freeing the CPU for supervisory control.',
        category: 'Architecture',
      },
    ],
    checkpoint: {
      id: 'u2-chk',
      question:
        'Why can’t a safety-critical automotive ABS ECU rely on a pure Von Neumann architecture with a single shared memory bus? What could go wrong on a rainy day?',
      contextScenario:
        'A vehicle experiences sudden hydroplaning at 100 km/h, requiring instant slip computation and high-frequency solenoid cycling.',
      options: [
        {
          id: 'opt-a',
          text: 'Von Neumann processors consume too much electrical power, which drains the 12V car battery during braking.',
          isCorrect: false,
          explanation:
            'While power consumption is important, the primary failure mode is architectural latency and bus contention, not battery capacity.',
        },
        {
          id: 'opt-b',
          text: 'The shared bus creates the "Von Neumann Bottleneck": instruction fetches stall while wheel data is being read, introducing non-deterministic latency that can delay brake release, causing wheel lockup and skidding.',
          isCorrect: true,
          explanation:
            'Correct! On a single shared bus, instruction fetches and data transfers must take turns sequentially. Under heavy bus traffic (calculating 4 wheel speeds + executing control loops), CPU wait states accumulate unpredictably. In an ABS cycle where 5 milliseconds matters, this non-deterministic delay can prevent the hydraulic valve from releasing in time, locking the wheel and initiating a fatal skid.',
        },
        {
          id: 'opt-c',
          text: 'Von Neumann architecture cannot connect to the CAN bus because CAN bus requires two wires while Von Neumann requires three.',
          isCorrect: false,
          explanation:
            'Communication protocols like CAN bus are independent of the CPU’s internal memory bus architecture.',
        },
        {
          id: 'opt-d',
          text: 'Von Neumann computers cannot run C code, forcing automotive engineers to write the entire ABS system in binary machine code.',
          isCorrect: false,
          explanation:
            'Von Neumann machines execute C and compiled machine code natively; all modern PCs are modified Von Neumann systems.',
        },
      ],
      engineeringTakeaway:
        'Harvard architecture provides dedicated, non-interfering instruction and data pathways, ensuring deterministic instruction execution times essential for life-critical automotive control.',
      misconceptionAlert:
        'Students often believe bus architecture is just an academic diagram. In hard real-time automotive ECUs, bus contention directly translates to braking distance in meters on wet asphalt.',
    },
    whatIfScenarios: [
      {
        id: 'u2-wi1',
        title: 'What if CAN Bus used random arbitration instead of bitwise priority?',
        change: 'All ECUs transmit packets using standard Ethernet CSMA/CD or random backoff when the bus is busy.',
        catastrophicOutcome: 'Emergency ABS brake status packets collide with car air-conditioning temperature telemetry, backing off for random milliseconds. Rahul’s brakes fail to coordinate with engine deceleration.',
        rootCause: 'Lack of deterministic priority-based non-destructive arbitration.',
        engineeringRemedy: 'CAN Bus standard: Dominant "0" bits physically overwrite Recessive "1" bits. Message 0x010 (ABS) wins without losing a single clock bit over 0x480 (AC).',
      },
      {
        id: 'u2-wi2',
        title: 'What if Flash memory suffered a 1-bit flip due to cosmic radiation?',
        change: 'A cosmic ray strikes an unshielded Flash memory transistor, changing a branch instruction from BNE (Branch if Not Equal) to BEQ.',
        catastrophicOutcome: 'The ABS algorithm skips the wheel-slip release branch, keeping hydraulic pressure locked at maximum, causing severe spinout.',
        rootCause: 'Lack of hardware Error Correcting Code (ECC) in automotive memory.',
        engineeringRemedy: 'Automotive microcontrollers use ECC Flash and Lockstep dual-core CPUs where two CPU cores execute identical code and compare registers every clock cycle.',
      },
    ],
    simulatorInfo: {
      title: 'Harvard vs Von Neumann Bus Race & CAN Arbitration Studio',
      description: 'Run the dual-bus vs single-bus memory race during a 90 km/h braking emergency, inspect CAN frame bit arbitration, and watch ABS slip ratio pulsing.',
      tags: ['Harvard Dual-Bus', 'Von Neumann Bottleneck', 'CAN Bus Arbitration', 'ABS Slip Ratio'],
    },
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Embedded C and Programming Concepts',
    subtitle: 'Inside the Smart Greenhouse: Direct Memory-Mapped I/O, Bit Manipulation & Watchdog Timers',
    realLifeStory: {
      title: 'The Greenhouse That Watered Itself at 3 a.m.',
      persona: 'Anand (Agritech Engineer)',
      location: 'Commercial Rose Farm, Nashik',
      timeframe: 'Tuesday early morning (3:17 AM)',
      scenario:
        'In a commercial greenhouse growing export-grade Dutch roses, midnight soil moisture drops below the critical 28% threshold due to ambient dry winds. No human is awake. At 3:17:02 AM, the microcontroller detects the drop, opens solenoid valve Zone 3 within 4 seconds, monitors the volume counter, and at 3:19:15 AM cuts the flow and dispatches a cellular WhatsApp/MQTT alert: "Zone 3 irrigated – 18 litres used." Every line of this reliable autonomy is governed by rigorous Embedded C idioms.',
      keyMetric: '3:17:02 AM',
      keyMetricLabel: 'Autonomous Sensor Detection & Valve Trigger Event',
      quote: 'If a sensor loop hangs and there is no Watchdog, 50,000 rose bushes drown by sunrise.',
    },
    hardwareArchitecture: {
      diagramTitle: 'Smart Greenhouse Embedded Controller & Sensor Interface',
      description: 'Block diagram illustrating the memory-mapped ADC peripheral, GPIO Port A output buffer, optocoupled relay stage, hardware timers, and the Independent Watchdog Timer.',
      parts: [
        {
          id: 'u3-p1',
          name: 'Capacitive Soil Moisture Probe (Zone 3)',
          type: 'Sensor',
          role: 'Measures soil dielectric permittivity (proportional to water content) without galvanic corrosion.',
          keyConcepts: ['Sensor Input', 'Analog Voltage (0–3.3V)', 'Capacitive Sensing'],
          howItWorks: 'An onboard NE555 timer generates high-frequency pulses across capacitive PCB traces buried in soil. Water increases soil capacitance, altering the filtered analog voltage output fed into MCU ADC Channel 4.',
          pinoutOrBus: 'ADC1 Channel 4 / Pin PA4',
          associatedKeywords: [
            { keyword: 'Analog-to-Digital Converter (ADC)', explanation: 'Converts continuous real-world voltage into discrete integer values (e.g., 0 to 4095 for 12-bit resolution).' },
          ],
        },
        {
          id: 'u3-p2',
          name: '12-Bit SAR ADC Peripheral (Address: 0x4001204C)',
          type: 'Microcontroller / SoC',
          role: 'Silicon peripheral converting analog soil voltage into a digital register value.',
          keyConcepts: ['Memory-Mapped I/O', 'Volatile Keyword', 'Direct Pointer Dereference'],
          howItWorks: 'The ADC result is stored in memory-mapped data register ADC1->DR at address 0x4001204C. In Embedded C, the firmware reads it via a volatile pointer: *(volatile uint16_t*)0x4001204C.',
          pinoutOrBus: 'APB2 Peripheral Bus Bridge',
          associatedKeywords: [
            { keyword: 'Memory-Mapped I/O', explanation: 'Hardware peripherals assigned addresses in the CPU memory space, accessible using standard memory pointers.' },
            { keyword: 'Volatile Keyword', explanation: 'Forbids the compiler optimizer from caching stale values, forcing fresh hardware register reads every time.' },
          ],
        },
        {
          id: 'u3-p3',
          name: 'GPIO Port A Output Register (GPIOA->ODR at 0x4001080C)',
          type: 'Microcontroller / SoC',
          role: 'Controls voltage levels on 16 individual microcontroller pins without disturbing neighboring pins.',
          keyConcepts: ['Bit Manipulation', 'Bitmasking', 'Bitwise Operators (|=, &= ~)'],
          howItWorks: 'Zone 3 valve is mapped to Pin 7. Writing GPIOA->ODR |= (1 << 7) sets bit 7 high (3.3V) to open the valve, while GPIOA->ODR &= ~(1 << 7) clears bit 7 low (0V) to close it, leaving pins 0-6 and 8-15 untouched.',
          pinoutOrBus: 'Port A Output Data Register (GPIOA_ODR)',
          associatedKeywords: [
            { keyword: 'Bitmasking', explanation: 'Using binary masks to isolate and modify individual bits in hardware control registers.' },
            { keyword: 'Atomic Bit Setting', explanation: 'Ensuring modifying one GPIO pin does not unintentionally toggle pumps or fans on adjacent pins.' },
          ],
        },
        {
          id: 'u3-p4',
          name: 'Optocoupled Solid-State Relay & 24V DC Valve',
          type: 'Actuator',
          role: 'Electrically isolates sensitive 3.3V MCU silicon from 24V high-current hydraulic solenoids.',
          keyConcepts: ['Actuator', 'Galvanic Isolation', 'Inductive Kickback Protection'],
          howItWorks: 'When GPIOA Pin 7 goes HIGH, current illuminates an internal infrared LED in the PC817 optocoupler. A phototransistor turns on, switching the 24V solenoid valve with zero electrical noise reaching the MCU.',
          pinoutOrBus: 'Optocoupler Driver Output to 24V Solenoid Coil',
          associatedKeywords: [
            { keyword: 'Galvanic Isolation', explanation: 'Preventing electrical transients from heavy inductive loads from damaging fragile digital logic.' },
          ],
        },
        {
          id: 'u3-p5',
          name: 'Independent Watchdog Timer (IWDG)',
          type: 'Safety / Interlock',
          role: 'Free-running hardware countdown counter that reboots the microcontroller if code freezes.',
          keyConcepts: ['Hardware Safety', '1.6s Hardware Timeout', 'Autonomous LSI Clock'],
          howItWorks: 'Clocked by an internal 32 kHz Low-Speed Internal (LSI) oscillator completely separate from the main CPU crystal. If the main loop hangs in an infinite while-loop, the counter hits 0 ms at 1.6s, pulsing the MCU NRST pin.',
          pinoutOrBus: 'Internal Hardware Reset Line (NRST)',
          associatedKeywords: [
            { keyword: 'Watchdog Timer (WDT)', explanation: 'A safety mechanism that automatically reboots the system if the software fails to periodically refresh it.' },
          ],
        },
        {
          id: 'u3-p6',
          name: '16-Bit Hardware Timer (TIM2 with Prescaler)',
          type: 'Microcontroller / SoC',
          role: 'Generates quartz-accurate 2.000-second interrupt intervals for periodic soil sampling.',
          keyConcepts: ['Hardware Timers', 'ISR Latency', 'No CPU Busy-Waiting'],
          howItWorks: 'Driven by the 16 MHz CPU crystal divided by a prescaler (PSC = 15999) and reload register (ARR = 1999). Counts autonomously without wasting CPU instructions, firing an interrupt when the count overflows.',
          pinoutOrBus: 'TIM2 Overflow Interrupt Vector (IRQ 28)',
          associatedKeywords: [
            { keyword: 'Interrupt Service Routine (ISR)', explanation: 'A compact, high-priority function executed immediately when hardware events occur.' },
          ],
        },
      ],
    },
    concepts: [
      {
        id: 'u3-c1',
        number: 1,
        title: 'Memory-Mapped I/O',
        tagline: 'Hardware registers mapped directly into CPU memory addresses',
        realLocation: 'ADC Peripheral Data Register (ADC1->DR at 0x4001204C)',
        deepDive:
          'In desktop programming, reading a sensor might involve an OS API or file descriptor. In Embedded C on a microcontroller, hardware peripherals are wired directly to the system memory bus. Reading the soil moisture sensor is simply reading a 16-bit integer from a specific memory address: uint16_t moisture = *(volatile uint16_t*)0x4001204C;. Writing to a register sets voltage pins high or low in real physical silicon.',
        hardwareAnchor: 'Peripheral Bus APB2 bridge connected to 12-bit SAR ADC',
        codeSnippet: `// Direct Memory-Mapped Register Access:
#define ADC1_BASE       0x40012000
#define ADC_DR_OFFSET   0x4C
#define SOIL_ADC_DR     (*(volatile uint16_t*)(ADC1_BASE + ADC_DR_OFFSET))

uint16_t read_soil_moisture(void) {
    return SOIL_ADC_DR; // Reads directly from physical ADC silicon register!
}`,
        keyTakeaway: 'Hardware pins and peripherals are manipulated directly through pointers to memory addresses.',
        category: 'Software',
      },
      {
        id: 'u3-c2',
        number: 2,
        title: 'Bit Manipulation & Bitmasking',
        tagline: 'Surgical control of single GPIO pins without touching neighboring pins',
        realLocation: 'General Purpose I/O Output Data Register (GPIOA->ODR)',
        deepDive:
          'A GPIO port has 16 or 32 pins sharing a single register. If Valve 3 is wired to Pin 7 of GPIOA, writing GPIOA->ODR = 0x80; would turn Valve 3 ON, but accidentally shut down the fans, heaters, and water pumps on Pins 0 through 6! Embedded C relies on bitwise operations: GPIOA->ODR |= (1 << 7); sets bit 7 without altering any other pin. Later, GPIOA->ODR &= ~(1 << 7); clears bit 7 safely.',
        hardwareAnchor: 'GPIOA Pin 7 Output Buffer driving Optocoupler + Solid State Relay',
        codeSnippet: `// Turn Irrigation Valve 3 ON (Pin 7):
GPIOA->ODR |= (1 << 7);   // Bitwise OR sets bit 7

// Turn Irrigation Valve 3 OFF (Pin 7):
GPIOA->ODR &= ~(1 << 7);  // Bitwise AND with complement clears bit 7

// Toggle Valve 3:
GPIOA->ODR ^= (1 << 7);   // Bitwise XOR toggles bit 7`,
        keyTakeaway: 'Always use bitwise OR (|=) to set and bitwise AND with NOT (&= ~) to clear specific bits safely.',
        category: 'Software',
      },
      {
        id: 'u3-c3',
        number: 3,
        title: 'Hardware Timers vs. Software Delays',
        tagline: 'Why for(volatile int i=0; i<10000; i++) is an engineering sin',
        realLocation: 'General-Purpose 16-bit Hardware Timer (TIM2)',
        deepDive:
          'Novice programmers use empty loop delays like delay_ms(2000). In embedded production, this is unacceptable: 1) The CPU is 100% pegged burning energy; 2) If the compiler optimizer flag (-O3) is turned on, it deletes the empty loop entirely; 3) Clock frequency changes or temperature variations cause delay drift. Instead, hardware timers use an independent quartz crystal oscillator and prescaler to count clock cycles, firing an interrupt exactly every 2.000 seconds without wasting CPU cycles.',
        hardwareAnchor: 'TIM2 Peripheral clocked by 16 MHz Quartz Crystal with Prescaler',
        keyTakeaway: 'Hardware timers run autonomously in silicon, liberating the CPU and guaranteeing quartz accuracy.',
        category: 'Real-Time',
      },
      {
        id: 'u3-c4',
        number: 4,
        title: 'Watchdog Timer (WDT) — The Lifesaver',
        tagline: 'Hardware countdown timer that reboots the MCU if code hangs',
        realLocation: 'Independent Watchdog (IWDG) silicon peripheral',
        deepDive:
          'At 3 a.m. in the greenhouse, an electrostatic discharge from a pump contactor or an I²C bus lockup causes the firmware while-loop to freeze. Without human presence, the greenhouse could remain frozen forever. The Independent Watchdog Timer is a free-running hardware counter clocked by a separate internal low-speed oscillator (LSI 32 kHz). The main loop must "feed the dog" (IWDG_Reload()) every 1.5 seconds. If the code hangs, the counter hits zero at 1.6s and generates a hard system reset, recovering the greenhouse in 15 milliseconds.',
        hardwareAnchor: 'Dedicated on-chip silicon counter with independent clock source',
        codeSnippet: `void main_loop(void) {
    while(1) {
        sample_sensors();
        control_valves();
        IWDG->KR = 0xAAAA; // Feed the Watchdog timer (reload counter)!
        // If code hangs above, Watchdog hits 0 and reboots MCU automatically
    }
}`,
        keyTakeaway: 'The Watchdog timer is the ultimate fail-safe against unexpected infinite loops and hardware stalls.',
        category: 'Hardware',
      },
      {
        id: 'u3-c5',
        number: 5,
        title: 'Interrupt Service Routine (ISR) Architecture',
        tagline: 'Keep ISRs ultra-lean: Read, Flag, and Get Out',
        realLocation: 'Vector Table & Timer 2 Interrupt Handler',
        deepDive:
          'When the 2-second timer triggers, the CPU suspends current execution and jumps to TIM2_IRQHandler(). Golden rule of Embedded C: Never do slow operations (floating-point division, delays, printf, string formatting, or cellular uploads) inside an ISR! An ISR that takes 50 milliseconds blocks other urgent interrupts. Instead, the ISR performs 3 atomic steps: 1) Reads the ADC value, 2) Sets a volatile flag moisture_ready = 1;, and 3) Clears the interrupt flag and exits immediately in < 2 microseconds. The main loop or RTOS task does the heavy math.',
        hardwareAnchor: 'Nested Vectored Interrupt Controller (NVIC)',
        keyTakeaway: 'ISRs must execute in microseconds to prevent interrupt starvation and maintain system responsiveness.',
        category: 'Software',
      },
      {
        id: 'u3-c6',
        number: 6,
        title: 'Mutexes and Race Conditions',
        tagline: 'Preventing corrupted multi-task writes to shared variables',
        realLocation: 'RTOS Mutex primitive guarding global_moisture_level',
        deepDive:
          'In a multi-tasking greenhouse controller, Task A (Sampling) reads the 32-bit moisture variable, while Task B (Irrigation Logic) updates calibration offsets, and Task C (Cellular Alert) reads it to format an MQTT payload. If Task A is interrupted halfway through writing the upper 16 bits of a 32-bit integer, Task C will read a half-updated corrupted value (a classic race condition). A Mutex (Mutual Exclusion) lock ensures only one task can access the shared memory block at any instant.',
        hardwareAnchor: 'ARM LDREX / STREX atomic exclusive-access hardware instructions',
        keyTakeaway: 'Any memory shared between multiple tasks or between an ISR and main loop must be protected against race conditions.',
        category: 'Software',
      },
      {
        id: 'u3-c7',
        number: 7,
        title: 'Context Switching in RTOS',
        tagline: 'Saving and restoring CPU registers R0-R15 in under 3 microseconds',
        realLocation: 'CPU Stack Memory and Process Stack Pointer (PSP)',
        deepDive:
          'When switching from the low-priority Cellular Upload Task to the urgent Irrigation Valve Task, the RTOS triggers the PendSV interrupt. The CPU hardware and RTOS push registers R0-R3, R12, LR, PC, and xPSR onto the current task’s stack, save the stack pointer, load the stack pointer of the irrigation task, and pop its saved registers. The irrigation task resumes seamlessly exactly where it left off. This entire context switch takes under 3 microseconds.',
        hardwareAnchor: 'PendSV Interrupt + Process Stack Pointer (PSP) / Main Stack Pointer (MSP)',
        keyTakeaway: 'A context switch is the mechanical magic of swapping CPU register snapshots between independent tasks.',
        category: 'Architecture',
      },
      {
        id: 'u3-c8',
        number: 8,
        title: 'Field Debugging with JTAG / SWD',
        tagline: 'Non-intrusive silicon debugging without disassembling sealed enclosures',
        realLocation: 'SWD (Serial Wire Debug) 2-pin interface on the PCB header',
        deepDive:
          'When troubleshooting a strange valve behavior in the Nashik greenhouse, an engineer does not print debug statements over serial (which alters timing). Instead, they attach a JTAG/SWD probe (SWDIO, SWCLK). They can halt the CPU core, inspect memory address 0x4001204C in real time, set hardware watchpoints on the valve GPIO bit, and step through assembly instructions while the board remains powered in the field.',
        hardwareAnchor: 'ARM CoreSight On-Chip Debug Module with SWD header',
        keyTakeaway: 'Hardware debuggers (JTAG/SWD) grant transparent, real-time introspection into registers and memory.',
        category: 'Hardware',
      },
    ],
    checkpoint: {
      id: 'u3-chk',
      question:
        'Why is the "volatile" keyword mandatory when declaring a pointer to a hardware sensor register in Embedded C (e.g., *(volatile uint16_t*)0x4001204C)?',
      contextScenario:
        'An engineer writes: while(*(uint16_t*)0x4001204C < 300) { /* wait for moisture */ } without the volatile qualifier, compiled with gcc -O2.',
      options: [
        {
          id: 'opt-a',
          text: 'The volatile keyword stores the variable in high-speed CPU cache rather than slow external Flash.',
          isCorrect: false,
          explanation:
            'Volatile does not control cache placement; in fact, memory-mapped peripherals must bypass CPU cache entirely.',
        },
        {
          id: 'opt-b',
          text: 'Without volatile, the optimizing compiler notices the memory address is never modified by code within the loop, reads it ONCE into a CPU register, and reuses that stale value forever, creating an infinite loop that never detects when moisture changes in the real world!',
          isCorrect: true,
          explanation:
            'Exactly! Compilers assume ordinary variables only change when code in the current scope writes to them. Since the hardware ADC updates the memory register asynchronously, the compiler does not know the physical world has changed. Marking it volatile forces the compiler to re-fetch the value from physical hardware on EVERY single read access.',
        },
        {
          id: 'opt-c',
          text: 'Volatile encrypts the memory contents to protect the greenhouse code from hacker theft.',
          isCorrect: false,
          explanation:
            'Volatile has nothing to do with cryptography or memory encryption.',
        },
        {
          id: 'opt-d',
          text: 'It is simply a legacy C89 syntax rule that modern C11/C23 compilers ignore.',
          isCorrect: false,
          explanation:
            'Volatile remains an active, critical keyword in all C/C++ standards for embedded systems and concurrency.',
        },
      ],
      engineeringTakeaway:
        'Always qualify memory-mapped hardware peripheral registers, variables shared with ISRs, and DMA buffers with "volatile" to forbid dangerous compiler optimizations.',
      misconceptionAlert:
        'Many students assume volatile makes code "thread-safe" or "atomic". It does neither! It only prevents the compiler from optimizing away reads and writes.',
    },
    whatIfScenarios: [
      {
        id: 'u3-wi1',
        title: 'What if software delay_ms(2000) was used instead of a Hardware Timer?',
        change: 'The developer writes for(volatile int i=0; i<8000000; i++) to delay 2 seconds between sensor readings.',
        catastrophicOutcome: 'When the MCU switches from 16 MHz internal RC oscillator to 80 MHz external crystal during high-speed cellular transmission, the delay shrinks to 400 milliseconds, flooding the roses with 5x excess water.',
        rootCause: 'Software delays are tightly coupled to CPU clock frequency and burn 100% active power during wait states.',
        engineeringRemedy: 'Use an autonomous Hardware Timer with fixed prescaler and interrupt triggering.',
      },
      {
        id: 'u3-wi2',
        title: 'What if the Watchdog Timer was disabled in production firmware?',
        change: 'To prevent nuisance resets during a buggy firmware release, the developer comments out the Watchdog initialization.',
        catastrophicOutcome: 'An electromagnetic pulse from the 3-phase pump contactor causes an I²C bus collision; the firmware enters a while(!I2C_Flag); infinite loop. 40,000 rose bushes wilt and die over 48 hours without water.',
        rootCause: 'A trapped CPU cannot recover without an independent hardware reset mechanism.',
        engineeringRemedy: 'Keep Independent Watchdog (IWDG) permanently active; set timeout window to 1.5x worst-case loop latency.',
      },
    ],
    simulatorInfo: {
      title: 'Embedded C Bit Manipulation & Watchdog Sandbox',
      description: 'Interact with memory-mapped ADC registers (0x4001204C), execute bitwise operations on GPIOA->ODR, test Watchdog freeze recovery, and view context switch register stacks.',
      tags: ['Memory-Mapped I/O', 'Bitmasking', 'Watchdog 1.6s Reset', 'Register Stack'],
    },
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'RTOS and Task Management + TinyML',
    subtitle: 'Inside the Textile Motor: FreeRTOS Preemptive Priority Scheduling & On-Device Predictive Maintenance',
    realLifeStory: {
      title: 'The Factory Motor That Predicted Its Own Death',
      persona: 'Kavitha (Chief Reliability Engineer)',
      location: 'Lakshmi Spinning Mill, Coimbatore',
      timeframe: 'Tuesday afternoon (2:45 PM)',
      scenario:
        'In a massive textile mill running 120 spinning frames 24x7, motor M-17 is vibrating imperceptibly. A human walking past feels nothing unusual. Yet at 2:45 PM, Kavitha receives an automated alert on the factory SCADA dashboard: "Motor M-17: Outer bearing race micro-flaking detected. Predicted catastrophic seizure in 11 to 14 days." They schedule bearing replacement during the planned Sunday maintenance window. Zero downtime, zero snapped yarn, saving ₹4.2 Lakhs in lost production.',
      keyMetric: '11–14 Days',
      keyMetricLabel: 'Early Failure Prediction Horizon before Mechanical Seizure',
      quote: 'Waiting for a bearing to scream means the shaft has already warped. TinyML hears the microscopic whisper.',
    },
    hardwareArchitecture: {
      diagramTitle: 'Industrial Motor TinyML Vibration Node Block Diagram',
      description: 'Schematic illustrating the 3-axis SPI accelerometer, FreeRTOS dual-core microcontroller, quantized INT8 neural model memory, and preemptive emergency cutoff relays.',
      parts: [
        {
          id: 'u4-p1',
          name: '3-Axis MEMS High-Frequency Accelerometer (ADXL355)',
          type: 'Sensor',
          role: 'Samples motor mechanical vibration signatures up to 1660 Hz with 16-bit low-noise resolution.',
          keyConcepts: ['Sensor Input', 'High-Rate SPI Bus (10 MHz)', 'Vibration Profiling'],
          howItWorks: 'Directly bolted to motor M-17’s cast-iron drive-end bearing housing. Detects microscopic impacts as bearing balls roll over micro-flaked outer races.',
          pinoutOrBus: '4-Wire SPI (MOSI, MISO, SCK, CS)',
          associatedKeywords: [
            { keyword: 'Feature Extraction', explanation: 'Transforming raw time-domain vibration into frequency spectra (FFT), Kurtosis, and RMS energy.' },
          ],
        },
        {
          id: 'u4-p2',
          name: 'FreeRTOS Dual-Core Microcontroller (ESP32-S3 / STM32F4)',
          type: 'Microcontroller / SoC',
          role: 'Executes FreeRTOS preemptive scheduler, sensor DMA, and TensorFlow Lite Micro inference.',
          keyConcepts: ['RTOS Kernel', 'Preemptive Priority Scheduling', 'Context Switching'],
          howItWorks: 'FreeRTOS prioritizes tasks deterministically: Priority 5 (Emergency Cutoff) immediately preempts Priority 4 (TinyML Inference) in under 3 microseconds when vibration surges.',
          pinoutOrBus: 'Dual Xtensa / ARM Cortex-M4 Cores @ 240 MHz',
          associatedKeywords: [
            { keyword: 'Real-Time Operating System (RTOS)', explanation: 'Guarantees time determinism where the highest-priority ready task always runs immediately.' },
            { keyword: 'Preemptive Scheduling', explanation: 'The CPU switches context instantly when an urgent task unblocks, without waiting for the current task.' },
          ],
        },
        {
          id: 'u4-p3',
          name: 'FreeRTOS Queue & Binary Semaphore (SRAM)',
          type: 'Memory',
          role: 'Thread-safe inter-process communication transferring vibration buffers between sampling and inference tasks.',
          keyConcepts: ['Inter-Process Communication (IPC)', 'Queue FIFO', 'Binary Semaphore'],
          howItWorks: 'The sampling task fills a 1024-sample array via DMA and fires a binary semaphore. The TinyML task unblocks, takes the queue data, and computes inference without race conditions.',
          pinoutOrBus: 'Thread-Safe Memory Ring Buffer in SRAM',
          associatedKeywords: [
            { keyword: 'Inter-Process Communication (IPC)', explanation: 'Safe mechanism allowing independent tasks to exchange data without race conditions.' },
            { keyword: 'Mutex with Priority Inheritance', explanation: 'Prevents priority inversion when a low-priority task shares a resource with a high-priority task.' },
          ],
        },
        {
          id: 'u4-p4',
          name: 'Quantized INT8 CNN Model Weights (Flash ROM)',
          type: 'Memory',
          role: 'Stores the neural network weights compressed from 32-bit float to 8-bit integer.',
          keyConcepts: ['TinyML', 'INT8 Quantization', '62 KB Model Footprint'],
          howItWorks: 'Offline-trained TensorFlow CNN model was converted to INT8. Weight size was reduced by 74.2% from 240 KB to 62 KB, fitting comfortably in microcontroller SRAM with 99.2% accuracy retained.',
          pinoutOrBus: 'Static Constant Array in NOR Flash Memory',
          associatedKeywords: [
            { keyword: 'Post-Training Quantization', explanation: 'Converting 32-bit floating point weights to 8-bit integers, drastically slashing memory and compute cost.' },
          ],
        },
        {
          id: 'u4-p5',
          name: 'Emergency Thermal / Vibration Shutdown Contactor Relay',
          type: 'Actuator',
          role: 'Trips motor power immediately if gross mechanical seizure or 8G vibration surge occurs.',
          keyConcepts: ['Actuator', 'Hard Real-Time Priority 5', 'Equipment Protection'],
          howItWorks: 'Controlled by the Priority 5 Emergency Stop task. Cuts 415V AC 3-phase power to the motor winding contactor in < 15 ms, preventing shaft snapping.',
          pinoutOrBus: 'GPIO Pin PB12 driving 24V Contactor Coil',
          associatedKeywords: [
            { keyword: 'Safety Interlock', explanation: 'The absolute highest priority response dedicated to preserving physical machinery and human lives.' },
          ],
        },
      ],
    },
    concepts: [
      {
        id: 'u4-c1',
        number: 1,
        title: 'Real-Time Operating System (RTOS)',
        tagline: 'Deterministic task scheduling where correctness depends on time as well as logic',
        realLocation: 'FreeRTOS kernel running on the ESP32 / Cortex-M4 node attached to Motor M-17',
        deepDive:
          'Unlike Windows or Android, which prioritize high average user throughput, an RTOS (like FreeRTOS or Zephyr) prioritizes deterministic latency guarantees. If the vibration sensor generates a full 1024-sample FFT buffer, the DSP task must process it before the next buffer overruns. The FreeRTOS scheduler guarantees that the highest-priority ready task always possesses the CPU immediately.',
        hardwareAnchor: 'FreeRTOS Kernel in Flash; SysTick timer ticking every 1 millisecond',
        keyTakeaway: 'An RTOS guarantees worst-case execution deadlines, ensuring time determinism.',
        category: 'Real-Time',
      },
      {
        id: 'u4-c2',
        number: 2,
        title: 'Priority-Based Preemptive Scheduling',
        tagline: 'Higher-priority tasks instantly preempt lower-priority tasks',
        realLocation: 'The FreeRTOS Task Control Blocks (TCB) in RAM',
        deepDive:
          'Tasks on the motor node are assigned strict priorities:\n• Priority 5 (Highest): Emergency Thermal / Vibration Cutoff Task (must stop motor if amplitude exceeds 8G)\n• Priority 4: TinyML Neural Inference Task (runs classification model every 30s)\n• Priority 3: Vibration High-Rate Sampling Task (reads SPI accelerometer at 1 kHz)\n• Priority 1 (Lowest): Cloud MQTT / Wi-Fi Upload Task\nIf the CPU is midway through calculating complex floating-point numbers in the Cloud Task and an Emergency Cutoff condition triggers, FreeRTOS preempts the Cloud Task in under 3 microseconds.',
        hardwareAnchor: 'ARM Cortex-M NVIC and PendSV Interrupt Controller',
        keyTakeaway: 'In preemptive scheduling, the CPU never waits for a low-priority task to finish.',
        category: 'Real-Time',
      },
      {
        id: 'u4-c3',
        number: 3,
        title: 'Round-Robin Scheduling',
        tagline: 'Fair time-slicing among tasks of equal priority',
        realLocation: 'FreeRTOS Ready List for identical priority levels',
        deepDive:
          'What happens when two background tasks have the same priority (e.g. Task A: Internal temperature logging, Task B: Wi-Fi signal strength monitoring, both at Priority 2)? The RTOS employs Round-Robin scheduling. Every SysTick interrupt (e.g. 10 ms time-slice), the scheduler pauses Task A and gives the CPU to Task B for 10 ms, alternating fairly so neither task starves.',
        hardwareAnchor: 'SysTick Timer configured to 100 Hz / 1000 Hz',
        keyTakeaway: 'Tasks of equal priority share CPU time slices in a round-robin rotation.',
        category: 'Real-Time',
      },
      {
        id: 'u4-c4',
        number: 4,
        title: 'Binary Semaphores vs. Mutexes',
        tagline: 'Signaling event completion vs protecting shared data structures',
        realLocation: 'FreeRTOS Synchronization Primitives',
        deepDive:
          '• Binary Semaphore (Signaling): Used when an event occurs. The SPI accelerometer DMA finishes filling a 1024-byte buffer and "gives" the semaphore (xSemaphoreGiveFromISR). The Feature Extraction task, which was blocked waiting on xSemaphoreTake, unblocks instantly and processes the buffer.\n• Mutex (Mutual Exclusion): Has "Priority Inheritance" to solve priority inversion! Used to protect the shared feature vector array so the inference task and cloud reporting task don’t read partially updated statistics simultaneously.',
        hardwareAnchor: 'Thread-safe FreeRTOS Semaphore and Mutex structures in SRAM',
        keyTakeaway: 'Use Semaphores for task synchronization/signaling; use Mutexes with priority inheritance for resource locking.',
        category: 'Software',
      },
      {
        id: 'u4-c5',
        number: 5,
        title: 'Inter-Process Communication (IPC) via Queues',
        tagline: 'Thread-safe, race-free FIFO data transfer between tasks',
        realLocation: 'FreeRTOS Message Queue buffer in heap memory',
        deepDive:
          'Passing raw vibration arrays via raw global pointers invites bugs and data corruption. Instead, FreeRTOS Queues provide thread-safe, FIFO buffers with built-in blocking. When the Sampling Task finishes a 1-second vibration batch, it sends a pointer into xVibrationQueue. If the queue is empty, the Inference Task sleeps without burning CPU. The moment data arrives, the Inference Task wakes up.',
        hardwareAnchor: 'Queue Control Block with Circular Buffer in SRAM',
        codeSnippet: `// Thread-Safe FreeRTOS Queue Transfer:
QueueHandle_t xVibrationQueue;

// Sampling Task (Producer):
xQueueSend(xVibrationQueue, &vibration_sample_block, portMAX_DELAY);

// TinyML Inference Task (Consumer):
if (xQueueReceive(xVibrationQueue, &received_block, portMAX_DELAY) == pdPASS) {
    run_tinyml_inference(&received_block);
}`,
        keyTakeaway: 'Queues decouple producers from consumers with automatic task blocking and unblocking.',
        category: 'Software',
      },
      {
        id: 'u4-c6',
        number: 6,
        title: 'Complete TinyML Pipeline in Action',
        tagline: 'From 3-axis analog vibration to 62 KB quantized INT8 inference in RAM',
        realLocation: 'TensorFlow Lite for Microcontrollers (TFLite Micro) on the MCU',
        deepDive:
          '1. Data Collection: 3-axis accelerometer sampled at 1660 Hz via SPI.\n2. Preprocessing: High-pass DC offset removal and Hanning windowing.\n3. Feature Extraction: Fast Fourier Transform (FFT), Kurtosis, Root Mean Square (RMS), Peak-to-Peak acceleration.\n4. Offline Training: Convolutional Neural Network (CNN) trained in TensorFlow on cloud server with 6 months of historical bearing vibration datasets.\n5. Quantization: Weights converted from 32-bit floating point to 8-bit integers (INT8). Model size drops from 240 KB to 62 KB with < 0.8% loss in accuracy!\n6. Deployment: TensorFlow Lite Micro C++ runtime statically linked into MCU firmware.\n7. Inference: Runs locally every 30 seconds in 48 milliseconds, outputting class probabilities: Healthy (98.4%), Early Wear (1.5%), Critical Failure (0.1%).\n8. Action: When Early Wear > 85%, dispatches MQTT packet to factory maintenance dashboard.',
        hardwareAnchor: 'ARM CMSIS-NN DSP acceleration library utilizing SIMD instructions',
        keyTakeaway: 'Quantization enables sophisticated deep learning neural nets to execute inside microcontrollers with < 64KB RAM.',
        category: 'AI / Edge',
      },
    ],
    checkpoint: {
      id: 'u4-chk',
      question:
        'If the TinyML Inference Task (Priority 4) and the Emergency Thermal/Vibration Stop Task (Priority 5) become ready to execute at the exact same microsecond, which task runs first, and why?',
      contextScenario:
        'Motor M-17 hits a dangerous vibration surge while the TinyML neural network is halfway through evaluating layer 2 convolutions.',
      options: [
        {
          id: 'opt-a',
          text: 'The TinyML task runs first because neural network math cannot be interrupted without corrupting the weight matrices.',
          isCorrect: false,
          explanation:
            'All task context (CPU registers, accumulator, pointers) is safely preserved on the task stack during preemption; neural networks can be paused and resumed without any loss of accuracy.',
        },
        {
          id: 'opt-b',
          text: 'The Emergency Stop Task (Priority 5) runs first because FreeRTOS is a strictly preemptive priority scheduler: the highest-priority ready task ALWAYS preempts lower-priority tasks immediately.',
          isCorrect: true,
          explanation:
            'Correct! In a preemptive RTOS like FreeRTOS, Priority 5 > Priority 4. The scheduler instantly context-switches the CPU to the Emergency Stop task. Protecting physical equipment and human life from catastrophic mechanical seizure takes absolute precedence over analytical inference.',
        },
        {
          id: 'opt-c',
          text: 'They share the CPU in 50/50 alternating 1-millisecond round-robin time slices.',
          isCorrect: false,
          explanation:
            'Round-Robin scheduling is ONLY used between tasks of IDENTICAL priority. Different priorities enforce strict preemption.',
        },
        {
          id: 'opt-d',
          text: 'The task that has been waiting the longest in the ready list executes first, regardless of priority number.',
          isCorrect: false,
          explanation:
            'That describes First-Come First-Served (FCFS) scheduling, which is not how real-time preemptive kernels operate.',
        },
      ],
      engineeringTakeaway:
        'In safety-critical RTOS architectures, safety shutdown tasks must always sit at the highest priority levels to preempt computational analytics in sub-millisecond time.',
      misconceptionAlert:
        'Students sometimes confuse FreeRTOS priority numbering with interrupt NVIC numbering: in FreeRTOS, higher numbers mean HIGHER priority (Priority 5 > Priority 1), whereas in ARM NVIC hardware interrupts, lower numbers mean higher priority (IRQ 0 > IRQ 15).',
    },
    whatIfScenarios: [
      {
        id: 'u4-wi1',
        title: 'What if Priority Inversion occurred between Emergency Stop and Low-Priority Logging?',
        change: 'Low-priority Logging task acquires the SPI bus mutex; mid-priority TinyML task preempts it; high-priority Emergency Stop task needs the SPI bus and blocks.',
        catastrophicOutcome: 'Emergency Stop task is indirectly blocked by mid-priority TinyML task! Motor continues shaking violently for 500 ms until bearing disintegrates.',
        rootCause: 'Classic Priority Inversion without Priority Inheritance.',
        engineeringRemedy: 'Enable FreeRTOS Priority Inheritance: while Low-Priority task holds the mutex that High-Priority task needs, its priority is temporarily elevated to match High-Priority, finishing quickly and yielding.',
      },
      {
        id: 'u4-wi2',
        title: 'What if the TinyML model was deployed as Float32 without INT8 Quantization?',
        change: 'Compiling the 240 KB unquantized float32 neural network onto an MCU with only 128 KB internal SRAM.',
        catastrophicOutcome: 'Linker error region SRAM overflowed by 112 KB, or runtime stack overflow crashing the microcontroller on boot.',
        rootCause: 'Floating point tensors require 4 bytes per weight and require slow software emulation if no hardware FPU exists.',
        engineeringRemedy: 'Post-training INT8 quantization compresses weights by 75% (to 62 KB) and leverages fast 8-bit integer SIMD instructions.',
      },
    ],
    simulatorInfo: {
      title: 'FreeRTOS Preemptive Priority Scheduler & TinyML Studio',
      description: 'Drag and drop task priorities, trigger preemption events, observe timeline Gantt charts, inspect FreeRTOS queues, and trace the 8-stage TinyML predictive maintenance pipeline.',
      tags: ['FreeRTOS Preemption', 'Gantt Timeline', 'Queue IPC', 'INT8 Quantization'],
    },
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Embedded System Design & Applications',
    subtitle: 'Inside the Medical Smart Band: Design Process, UML State Machines, Edge AI & HW Verification',
    realLifeStory: {
      title: 'The Smart Band That Called the Ambulance',
      persona: 'Mr. Sharma (67-year-old retired school principal)',
      location: 'Kamla Nehru Park, South Mumbai',
      timeframe: 'Thursday morning (6:35 AM)',
      scenario:
        'Mr. Sharma is on his daily morning walk when his heart rhythm enters Atrial Fibrillation (AFib). He feels slightly dizzy but intends to keep walking. Suddenly, his smart band vibrates with urgency: "Irregular heart rhythm detected – possible AFib. Notifying emergency contacts." Inside the band, a tiny neural accelerator has analyzed a 30-second single-lead ECG trace. Within 90 seconds, the band transmits his GPS coordinates and encrypted ECG strip to his daughter and the hospital cardiology triage. He is admitted before a stroke can occur.',
      keyMetric: '< 90 sec',
      keyMetricLabel: 'From Autonomous On-Wrist AFib Detection to Emergency Dispatch',
      quote: 'If this band had to stream raw ECG continuously to the cloud over cellular, the battery would be dead in 12 hours.',
    },
    hardwareArchitecture: {
      diagramTitle: 'Medical Smart Band Wearable Hardware Block Diagram',
      description: 'Architecture diagram showing the perception layer (PPG + dry ECG electrodes), low-power dual-core SoC, on-chip NPU hardware accelerator, BLE radio, and power management.',
      parts: [
        {
          id: 'u5-p1',
          name: 'Dry Titanium Skin Electrodes + ECG Analog Front-End (AFE)',
          type: 'Sensor',
          role: 'Measures microvolt-level cardiac biopotentials across the wearer’s wrists at 250 Hz.',
          keyConcepts: ['Perception Layer', 'Biopotential Amplifier', 'Motion Artifact Rejection'],
          howItWorks: 'Differential dry-contact titanium electrodes capture cardiac electrical polarization. An ultra-low-noise instrumentation amplifier removes 50 Hz mains hum before 24-bit delta-sigma ADC digitization.',
          pinoutOrBus: 'SPI Bus to Analog Devices ADAS1000 AFE',
          associatedKeywords: [
            { keyword: 'Perception Layer', explanation: 'The physical hardware tier capturing real-world physiological signals (ECG & PPG).' },
            { keyword: 'Analog Front-End (AFE)', explanation: 'Specialized analog conditioning circuitry that amplifies microvolt signals before ADC conversion.' },
          ],
        },
        {
          id: 'u5-p2',
          name: 'Dual-Core Ultra-Low-Power SoC + On-Chip NPU Accelerator',
          type: 'Microcontroller / SoC',
          role: 'Dual cores: Cortex-M0+ handles continuous 24/7 background tasks; Cortex-M4 + NPU executes on-wrist AFib AI classification.',
          keyConcepts: ['Edge AI', 'Hardware Accelerator', 'Behavioral → RTL → Gate Level'],
          howItWorks: 'The dedicated Neural Processing Unit (NPU) accelerator contains a systolic array of 16x16 integer MAC units. It executes the 1D-CNN convolution layers in 18 ms while drawing only 1.2 mW.',
          pinoutOrBus: 'Silicon Internal AXI Bus Matrix @ 22nm CMOS',
          associatedKeywords: [
            { keyword: 'Edge AI', explanation: 'Executing machine learning models directly on localized embedded silicon without cloud dependency.' },
            { keyword: 'Hardware Accelerator', explanation: 'Specialized silicon logic computing mathematical convolution layers in parallel at 1/10th CPU power.' },
          ],
        },
        {
          id: 'u5-p3',
          name: 'Bluetooth Low Energy (BLE 5.2) Transceiver',
          type: 'Communication',
          role: 'Connects to Mr. Sharma’s phone to send emergency dispatch alerts and encrypted ECG data.',
          keyConcepts: ['Connectivity Layer', 'Bluetooth Low Energy', 'Asynchronous Wakeup'],
          howItWorks: 'Remains in micro-power sleep mode until an arrhythmia event is confirmed. Awakens to establish a secure encrypted BLE link to forward coordinates to emergency services in under 90 seconds.',
          pinoutOrBus: '2.4 GHz Ceramic Patch Antenna with Balun Filter',
          associatedKeywords: [
            { keyword: 'Connectivity Layer', explanation: 'The network transport tier bridging on-device edge decisions to mobile networks and cloud hospitals.' },
          ],
        },
        {
          id: 'u5-p4',
          name: 'Linear Resonant Actuator (LRA Haptic Motor)',
          type: 'Actuator',
          role: 'Delivers sharp, tactile wrist vibrations to alert Mr. Sharma of irregular heart rhythms immediately.',
          keyConcepts: ['Actuator', 'Haptic Feedback', 'Immediate Sensory Alarm'],
          howItWorks: 'A voice coil vibrates a spring-suspended tungsten mass at its 205 Hz mechanical resonance frequency, producing crisp tactile alerts while consuming minimal milliwatt power.',
          pinoutOrBus: 'DRV2605 Haptic Driver IC over I²C',
          associatedKeywords: [
            { keyword: 'Immediate User Warning', explanation: 'Sensory alert that informs the patient to sit down and touch the secondary electrode.' },
          ],
        },
        {
          id: 'u5-p5',
          name: 'Power Management IC (PMIC) & 180 mAh LiPo Battery',
          type: 'Power',
          role: 'Regulates system voltages and preserves 7-day battery life through aggressive dynamic power gating.',
          keyConcepts: ['Low Power Budget', '7-Day Battery Life', '15 µA Sleep Mode'],
          howItWorks: 'Delivers multiple regulated rails (1.8V digital, 3.0V analog, 1.1V NPU core). Gates clocks to high-power blocks, maintaining a 15 µA baseline current when resting.',
          pinoutOrBus: 'I²C PMIC Interface + Fuel Gauge Coloumb Counter',
          associatedKeywords: [
            { keyword: 'Energy Budgeting', explanation: 'Balancing micro-amp sleep states with millisecond compute bursts to achieve multi-day wearable autonomy.' },
          ],
        },
      ],
    },
    concepts: [
      {
        id: 'u5-c1',
        number: 1,
        title: 'Embedded Design Process Stages',
        tagline: 'Requirements → Specification → Architecture → Component Design → Verification',
        realLocation: 'The 18-month engineering lifecycle documentation of the medical wearable',
        deepDive:
          '1. Requirements: User & medical criteria: "Detect Atrial Fibrillation with > 97% sensitivity, < 3% false alarm, IP68 water resistance, battery life > 7 days on 180 mAh LiPo."\n2. Specification: Exact electrical parameters: ECG sampling rate 250 Hz, 24-bit ADC resolution, maximum inference latency < 2.0 seconds, BLE 5.2 transmit power +4 dBm.\n3. Architecture: Dual-core architecture: Ultra-low-power Cortex-M0+ for continuous 24/7 PPG heart rate monitoring; Cortex-M4F + Neural Hardware Accelerator for on-demand ECG inference.\n4. Component Design: Analog Front-End (AFE) circuit design, differential dry-contact electrodes, antenna impedance matching.\n5. Integration & Testing: Hardware-in-the-loop (HIL) testing and clinical trials with 400 hospital patients.',
        hardwareAnchor: 'Systems Engineering V-Model Development Workflow',
        keyTakeaway: 'Rigorous staged design ensures medical-grade safety before cutting silicon or writing firmware.',
        category: 'Software',
      },
      {
        id: 'u5-c2',
        number: 2,
        title: 'Levels of Abstraction in Embedded Design',
        tagline: 'Behavioral → RTL (Register Transfer Level) → Gate Level',
        realLocation: 'From C/C++ firmware down to silicon logic gates in the wearable SoC',
        deepDive:
          '• Behavioral Level: High-level algorithmic code: "If R-R peak interval variability exceeds threshold for 30 consecutive seconds, raise AFib alarm flag."\n• RTL (Register Transfer Level): Written in Verilog or VHDL describing data movement between registers: always @(posedge clk) begin if (sample_valid) q_reg <= d_in; end.\n• Gate Level: The physical silicon layout generated by synthesis tools, composed of actual NAND, NOR, and D-flip-flop logic gates etched in 22nm silicon.',
        hardwareAnchor: '22nm Ultra-Low-Power CMOS Silicon Die Layout',
        keyTakeaway: 'Abstraction allows engineers to design complex million-transistor systems without placing individual gates manually.',
        category: 'Architecture',
      },
      {
        id: 'u5-c3',
        number: 3,
        title: 'UML in Real Embedded Projects',
        tagline: 'Class, State, and Sequence diagrams modeling asynchronous physical behavior',
        realLocation: 'Firmware Architecture Blueprint',
        deepDive:
          '• UML State Diagram: Models the wearable’s power-saving modes: Sleep (15 µA) → Sensing PPG (80 µA) → Suspect Arrhythmia → Prompts ECG touch → Analysing (4 mA) → Alerting (15 mA vibration + BLE) → Return to Sleep.\n• UML Sequence Diagram: Shows precise millisecond event timelines: Electrode contact ISR → AFE ADC DMA transfer → FreeRTOS Queue → Neural Inference → BLE Alert notification.\n• UML Class Diagram: Encapsulates hardware drivers (ECG_AFE_Driver, BLE_Stack, Power_Manager, Inference_Engine).',
        hardwareAnchor: 'UML Hierarchical State Machine (QP / Statechart Engine)',
        keyTakeaway: 'UML statecharts eliminate race conditions and deadlocks in complex multi-state embedded firmware.',
        category: 'Software',
      },
      {
        id: 'u5-c4',
        number: 4,
        title: 'Edge AI vs. Cloud AI',
        tagline: 'Why life-critical diagnosis must execute locally on the wrist',
        realLocation: 'The on-device TinyML classifier running inside the smart band',
        deepDive:
          'Why didn’t the smart band upload raw ECG data to AWS or Google Cloud for deep analysis? Three critical reasons:\n1. Connectivity Independence: Mr. Sharma was walking in a park with tree cover and spotty cellular connectivity. An edge device works in an underground metro, airplane, or remote mountain without internet.\n2. Latency: Edge inference executes in 120 ms. Cloud roundtrips over cellular take 1500–5000 ms or fail completely.\n3. Battery Life & Privacy: Streaming 250 Hz continuous analog data over 4G/BLE consumes 45 mW of RF power, killing a 180 mAh battery in under 14 hours. Local edge inference uses micro-joules, preserving a 7-day battery life while keeping medical ECG private.',
        hardwareAnchor: 'On-chip Neural Processing Unit (NPU) accelerator running INT8 weights',
        keyTakeaway: 'Edge AI delivers zero latency, absolute privacy, and works reliably when cloud connectivity is unavailable.',
        category: 'AI / Edge',
      },
      {
        id: 'u5-c5',
        number: 5,
        title: 'Hardware Accelerators in Modern SoCs',
        tagline: 'Silicon MAC units executing 2D convolutions in parallel at 1/10th the power of a CPU',
        realLocation: 'Dedicated Neural Accelerator block on the silicon die',
        deepDive:
          'A general-purpose CPU core computes neural network matrix multiplications sequentially (Fetch instruction → Fetch weight → Multiply → Accumulate → Store). A dedicated Hardware Accelerator contains a 16x16 grid of physical Multiply-Accumulate (MAC) circuits operating in parallel on a single clock cycle. It processes the 1D-CNN ECG filter in 18 ms while drawing only 1.2 mW, allowing the main CPU core to remain in low-power sleep mode.',
        hardwareAnchor: 'Dedicated Systolic Array / NPU hardware accelerator on SoC',
        keyTakeaway: 'Dedicated silicon accelerators provide 10x to 50x higher energy efficiency than software running on a general CPU.',
        category: 'Hardware',
      },
      {
        id: 'u5-c6',
        number: 6,
        title: 'Software Testing & Verification in Medical Systems',
        tagline: 'Verification vs Validation, Regression testing, and Cyclomatic Complexity',
        realLocation: 'Automated CI/CD Hardware-in-the-Loop (HIL) test farm',
        deepDive:
          '• Verification: "Did we build the system right?" Checked using static analysis (MISRA C:2012 compliance) and unit tests verifying the firmware matches the specification.\n• Validation: "Did we build the right system?" Evaluated in clinical trials against calibrated 12-lead hospital ECG machines with cardiologists.\n• Regression Testing: Every Git commit automatically runs 500 recorded ECG traces through the simulated firmware to ensure bug fixes don’t break existing arrhythmia detection.\n• Cyclomatic Complexity: Every C function is analyzed. Any function with McCabe complexity > 15 (too many nested if/else branches) is rejected and refactored to prevent untestable execution paths.',
        hardwareAnchor: 'Automated Jenkins CI/CD rig with National Instruments PXI HIL tester',
        keyTakeaway: 'Medical firmware requires mathematical verification, strict MISRA C compliance, and rigorous regression testing.',
        category: 'Software',
      },
      {
        id: 'u5-c7',
        number: 7,
        title: 'Industrial IoT (IIoT) Layer Mapping',
        tagline: 'From physical skin electrodes to hospital cardiology dispatch',
        realLocation: 'The 4-layer architecture of modern connected healthcare',
        deepDive:
          '• Perception Layer: Dry titanium skin electrodes + photoplethysmography (PPG) optical sensor measuring blood volume pulses.\n• Edge Layer: On-wrist dual-core MCU + NPU running TinyML AFib inference and digital notch filtering (50 Hz / 60 Hz hum removal).\n• Connectivity Layer: Bluetooth Low Energy 5.2 link to smartphone companion app, which routes via 5G cellular network.\n• Application Layer: Daughter’s emergency mobile app and the hospital emergency department cardiology triage console.',
        hardwareAnchor: 'End-to-End IoT stack spanning wearable silicon to cloud dashboard',
        keyTakeaway: 'Connected embedded devices fit into structured 4-layer IoT architectures bridging physical sensors to cloud analytics.',
        category: 'Networking',
      },
    ],
    checkpoint: {
      id: 'u5-chk',
      question:
        'Why did the medical wearable design team strictly refuse to send raw continuous ECG waveforms to the cloud for real-time AFib analysis? Which core embedded constraints forced this decision?',
      contextScenario:
        'A product manager proposes: "Let\'s keep the band cheap by removing the on-device AI chip and streaming all ECG data directly to AWS Cloud."',
      options: [
        {
          id: 'opt-a',
          text: 'Because AWS Cloud and Azure do not have servers in India, so network packets cannot cross international borders.',
          isCorrect: false,
          explanation:
            'Cloud data centers exist in Mumbai and Pune; geographic server presence was not the engineering reason.',
        },
        {
          id: 'opt-b',
          text: 'Streaming continuous raw ECG over cellular/Bluetooth exhausts the 180 mAh battery in under 14 hours, introduces fatal communication lag in parks or elevators with no signal, and exposes unencrypted continuous biometric medical data.',
          isCorrect: true,
          explanation:
            'Spot on! Streaming raw 250 Hz 24-bit data non-stop keeps the RF radio transmitter active 100% of the time, dropping battery life from 7 days to 14 hours. Furthermore, cellular coverage is never 100% guaranteed: an arrhythmia event in an underground parking lot, elevator, or dense park would be missed completely. Edge AI executes deterministically on-wrist with zero internet dependency.',
        },
        {
          id: 'opt-c',
          text: 'Because microcontrollers are legally forbidden by the FDA from transmitting Bluetooth data.',
          isCorrect: false,
          explanation:
            'Thousands of FDA-cleared medical devices use Bluetooth; transmission is entirely legal when encrypted.',
        },
        {
          id: 'opt-d',
          text: 'Because Python code cannot be compiled onto Amazon Web Services servers.',
          isCorrect: false,
          explanation:
            'Cloud servers run Python, C++, and any machine learning framework with virtually unlimited computing power.',
        },
      ],
      engineeringTakeaway:
        'Edge AI solves the three fundamental bottlenecks of IoT: Battery life (RF radio power), Network unreliability (offline autonomy), and Latency/Privacy.',
      misconceptionAlert:
        'Students often believe "Cloud AI is always superior because the cloud has unlimited GPU power." In life-critical edge devices, a lightweight 62 KB model running locally is vastly safer than a 100-billion parameter cloud model with an unstable Wi-Fi connection.',
    },
    whatIfScenarios: [
      {
        id: 'u5-wi1',
        title: 'What if continuous raw ECG was streamed over 4G LTE instead of Edge AI?',
        change: 'Replacing the on-device NPU with a cellular modem transmitting continuous 250 Hz ECG telemetry.',
        catastrophicOutcome: 'Battery drains from 100% to 0% in 11 hours. During Mr. Sharma’s walk in the park, cellular signal drops to 1 bar; packet loss masks the irregular rhythm, delaying the emergency alert by 40 minutes.',
        rootCause: 'Continuous RF transmission burns orders of magnitude more energy than on-device DSP/NPU computation.',
        engineeringRemedy: 'Compute inference locally at the Edge (0.02 mJ per inference); turn on the high-power radio ONLY when an alert or periodic sync is required.',
      },
      {
        id: 'u5-wi2',
        title: 'What if the firmware had a Cyclomatic Complexity of 48 in the alert handler?',
        change: 'The developer wrote a 600-line monolithic function with 14 nested switch/case and if-else branches to handle all alert combinations.',
        catastrophicOutcome: 'An untested combination of "low battery + incoming phone call + simultaneous AFib detection" enters an unhandled branch, leaving the screen blank and dropping the emergency call.',
        rootCause: 'High cyclomatic complexity creates an exponential number of test paths that cannot be completely verified.',
        engineeringRemedy: 'Enforce static analysis rule: Max Cyclomatic Complexity < 15 per function. Decompose complex logic into formal UML state machines.',
      },
    ],
    simulatorInfo: {
      title: 'Wearable UML State Machine & Edge vs Cloud Lab',
      description: 'Step through the medical wearable UML state engine (Sleep → Sense → Analyse → Alert), explore Behavioral vs RTL vs Gate abstraction, and compare Edge AI vs Cloud AI power and latency trade-offs.',
      tags: ['UML Statechart', 'Edge vs Cloud Calculator', 'Abstraction Zoom', 'MISRA Verification'],
    },
  },
];
