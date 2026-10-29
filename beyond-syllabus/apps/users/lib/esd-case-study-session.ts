export type EsdStageId = 'mission' | 'interfaces' | 'timing' | 'state-machine' | 'power' | 'debrief';

export type EsdStage = {
  id: EsdStageId;
  label: string;
  shortLabel: string;
  description: string;
};

export const esdStages: EsdStage[] = [
  { id: 'mission', label: 'Define the safety mission', shortLabel: 'Mission', description: 'Separate measurable system requirements from implementation guesses.' },
  { id: 'interfaces', label: 'Wire the sensing path', shortLabel: 'Interfaces', description: 'Match each peripheral to the interface that fits its timing and role.' },
  { id: 'timing', label: 'Schedule the real-time work', shortLabel: 'Timing', description: 'Protect hard deadlines by classifying and prioritising periodic tasks.' },
  { id: 'state-machine', label: 'Repair the control logic', shortLabel: 'States', description: 'Build a deterministic state machine for normal and unsafe temperatures.' },
  { id: 'power', label: 'Close the energy budget', shortLabel: 'Power', description: 'Choose a duty cycle that reaches the required field runtime.' },
  { id: 'debrief', label: 'Defend the embedded design', shortLabel: 'Review', description: 'Connect sensing, timing, control, and power decisions into one design.' },
];

export const esdLearningGoals = [
  'Translate a field incident into testable embedded requirements',
  'Choose interfaces using bandwidth, distance, and device constraints',
  'Reason about deadlines, interrupts, and deterministic state transitions',
  'Estimate battery life from an explicit operating duty cycle',
];

export const missionOptions = [
  { id: 'range', label: 'Maintain medicine between 2 °C and 8 °C.', required: true },
  { id: 'sample', label: 'Sample temperature at least once every 2 seconds.', required: true },
  { id: 'alarm', label: 'Raise a local alarm within 500 ms of a confirmed breach.', required: true },
  { id: 'runtime', label: 'Operate for at least 24 hours from one charge.', required: true },
  { id: 'blue', label: 'Use a blue dashboard background.', required: false },
  { id: 'mcu', label: 'Use a particular microcontroller before measuring the workload.', required: false },
];

export const interfaceChallenges = [
  { id: 'temperature', device: 'Digital temperature sensor', clue: 'Two-wire bus, addressed device, moderate speed', options: ['I²C', 'UART', 'PWM'], answer: 0, explanation: 'I²C supports addressed peripherals on a short shared two-wire bus and is a natural fit for a digital sensor.' },
  { id: 'gps', device: 'GPS receiver', clue: 'Continuous framed serial sentences from one module', options: ['SPI', 'UART', 'ADC'], answer: 1, explanation: 'UART handles the GPS module’s asynchronous point-to-point serial stream with minimal wiring.' },
  { id: 'buzzer', device: 'Piezo alarm', clue: 'Tone frequency and duty cycle control', options: ['PWM', 'I²C', 'CAN'], answer: 0, explanation: 'A timer-driven PWM output generates the buzzer tone without tying up the processor in a delay loop.' },
];

export const timingTasks = [
  { id: 'alarm', name: 'Assert safety alarm', period: 'event driven', deadlineMs: 500, executionMs: 8, priority: 'Highest', critical: true },
  { id: 'sensor', name: 'Sample temperature', period: '2 s', deadlineMs: 2000, executionMs: 12, priority: 'High', critical: true },
  { id: 'log', name: 'Write audit record', period: '10 s', deadlineMs: 10000, executionMs: 45, priority: 'Medium', critical: false },
  { id: 'display', name: 'Refresh display', period: '1 s', deadlineMs: 1000, executionMs: 18, priority: 'Low', critical: false },
];

export const stateTransitions = [
  { id: 'boot-selftest', from: 'BOOT', event: 'self-test passes', to: 'MONITORING' },
  { id: 'monitor-breach', from: 'MONITORING', event: '2 consecutive unsafe samples', to: 'ALARM' },
  { id: 'alarm-safe', from: 'ALARM', event: '5 consecutive safe samples', to: 'RECOVERY' },
  { id: 'recovery-ack', from: 'RECOVERY', event: 'operator acknowledges log', to: 'MONITORING' },
];

export const powerProfiles = [
  { id: 'always-on', name: 'Always-on polling', averageMa: 82, runtimeHours: 24.4, note: 'Barely reaches the target and leaves no reserve for cold-weather battery loss.' },
  { id: 'balanced', name: 'Timed sampling + sleep', averageMa: 31, runtimeHours: 64.5, note: 'Wakes for sensor, alarm, and logging tasks; keeps comfortable runtime reserve.', correct: true },
  { id: 'deep-sleep', name: 'Deep sleep for 30 seconds', averageMa: 9, runtimeHours: 222, note: 'Long runtime, but violates the 2-second sampling requirement.' },
];

export const esdQuestions = [
  { id: 'interrupt', prompt: 'What belongs inside the temperature-ready interrupt service routine?', options: ['Read, format, save, and upload the full record', 'Set a flag and capture only the time-critical value', 'Wait until the display finishes refreshing', 'Run a blocking two-second delay'], answer: 1, explanation: 'An ISR should finish quickly: capture essential state, signal deferred work, and let scheduled code handle slower processing.' },
  { id: 'deadline', prompt: 'Why does the alarm task receive the highest priority?', options: ['It uses the most lines of code', 'Its missed deadline has the greatest safety consequence', 'It runs least often', 'It controls the screen colour'], answer: 1, explanation: 'Real-time priority follows deadline and consequence, not code size or visual importance.' },
  { id: 'states', prompt: 'Why require consecutive samples before entering and leaving ALARM?', options: ['To make the state diagram larger', 'To add hysteresis and reject noisy threshold crossings', 'To remove the sensor interface', 'To avoid recording timestamps'], answer: 1, explanation: 'Confirmation counts prevent chatter when a noisy reading sits close to a threshold.' },
  { id: 'power', prompt: 'Why is the lowest-current profile not the correct design?', options: ['Low current always damages sensors', 'It misses the required sampling deadline', 'Sleep modes cannot wake from timers', 'Battery estimates never matter'], answer: 1, explanation: 'Optimisation is valid only after functional and timing constraints are satisfied.' },
];
