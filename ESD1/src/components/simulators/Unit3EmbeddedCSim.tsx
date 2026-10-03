import React, { useState, useEffect } from 'react';
import { Terminal, Shield, RefreshCw, AlertTriangle, Code2, Layers, Play } from 'lucide-react';

export const Unit3EmbeddedCSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registers' | 'watchdog' | 'volatile-inspector' | 'context-switch'>('registers');

  // --- Register State ---
  const [gpioaOdr, setGpioaOdr] = useState<number>(0x0000);
  const [soilMoisturePct, setSoilMoisturePct] = useState<number>(27);
  const adcValue = Math.floor((soilMoisturePct / 100) * 4095);
  const [lastExecutedC, setLastExecutedC] = useState<string>('// Select a bitwise action below or click individual register bits');

  const toggleBit = (bitIndex: number) => {
    const isSet = (gpioaOdr & (1 << bitIndex)) !== 0;
    if (isSet) {
      setGpioaOdr((prev) => prev & ~(1 << bitIndex));
      setLastExecutedC(`GPIOA->ODR &= ~(1 << ${bitIndex}); // Cleared bit ${bitIndex}`);
    } else {
      setGpioaOdr((prev) => prev | (1 << bitIndex));
      setLastExecutedC(`GPIOA->ODR |= (1 << ${bitIndex});  // Set bit ${bitIndex}`);
    }
  };

  const openValve3 = () => {
    setGpioaOdr((prev) => prev | (1 << 7));
    setLastExecutedC('GPIOA->ODR |= (1 << 7); // Opened Irrigation Valve 3 (Pin 7)');
  };

  const closeValve3 = () => {
    setGpioaOdr((prev) => prev & ~(1 << 7));
    setLastExecutedC('GPIOA->ODR &= ~(1 << 7); // Closed Irrigation Valve 3 (Pin 7)');
  };

  const toggleFan = () => {
    setGpioaOdr((prev) => prev ^ (1 << 3));
    setLastExecutedC('GPIOA->ODR ^= (1 << 3); // Toggled Exhaust Fan (Pin 3)');
  };

  // --- Watchdog Timer State ---
  const [wdtCounterMs, setWdtCounterMs] = useState<number>(1600);
  const [isWdtFrozen, setIsWdtFrozen] = useState<boolean>(false);
  const [wdtResetCount, setWdtResetCount] = useState<number>(0);
  const [wdtStatusLog, setWdtStatusLog] = useState<string>('Watchdog healthy. Ticking down from 1600 ms.');

  useEffect(() => {
    const interval = setInterval(() => {
      setWdtCounterMs((prev) => {
        if (prev <= 100) {
          setWdtResetCount((c) => c + 1);
          setWdtStatusLog('CRITICAL: WDT reached 0 ms! Hardware MCU Reset triggered! System rebooted.');
          setIsWdtFrozen(false);
          return 1600;
        }

        if (!isWdtFrozen && prev < 600) {
          setWdtStatusLog('Main loop fed the dog (IWDG_Reload -> 1600 ms).');
          return 1600;
        }

        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isWdtFrozen]);

  const feedWatchdogManual = () => {
    setWdtCounterMs(1600);
    setIsWdtFrozen(false);
    setWdtStatusLog('Manual IWDG_Reload() executed. Counter reset to 1600 ms.');
  };

  const freezeMainLoop = () => {
    setIsWdtFrozen(true);
    setWdtStatusLog('ALERT: Simulated infinite while(1) hang! Watchdog feed stopped.');
  };

  // --- Volatile Inspector ---
  const [hasVolatile, setHasVolatile] = useState<boolean>(true);

  // --- Context Switch State ---
  const [activeTask, setActiveTask] = useState<'sampling' | 'irrigation'>('sampling');
  const [stackRegisters, setStackRegisters] = useState<{ [key: string]: string }>({
    R0: '0x00000548',
    R1: '0x4001204C',
    R2: '0x00000001',
    R3: '0x20000180',
    R12: '0x00000000',
    LR: '0x080004A9',
    PC: '0x08000624',
    xPSR: '0x01000000',
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-sm">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Unit 3 Programming Lab
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Embedded C, Memory-Mapped I/O, Bitmasking & WDT</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Smart Greenhouse Embedded C Sandbox</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('registers')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'registers' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bit Manipulation & Memory I/O
          </button>
          <button
            onClick={() => setActiveTab('watchdog')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'watchdog' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Watchdog Timer (1.6s)
          </button>
          <button
            onClick={() => setActiveTab('volatile-inspector')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'volatile-inspector' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Volatile Keyword Inspector
          </button>
          <button
            onClick={() => setActiveTab('context-switch')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'context-switch' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Context Switch Stack
          </button>
        </div>
      </div>

      {/* Tab 1: Bit Manipulation & Memory-Mapped I/O */}
      {activeTab === 'registers' && (
        <div className="mt-6 space-y-6">
          {/* Top: Memory-Mapped ADC Address */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-2">
                <span>ADC1-&gt;DR @ 0x4001204C</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 font-normal">12-bit Analog-to-Digital Converter</span>
              </div>
              <div className="text-xs text-slate-700 mt-1">
                Soil Moisture Sensor Value: <strong className="text-emerald-700 font-mono font-bold">{soilMoisturePct}%</strong> ({adcValue} ADC counts, Hex: 0x{adcValue.toString(16).toUpperCase().padStart(4, '0')})
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Adjust Moisture:</span>
              <input
                type="range"
                min="10"
                max="60"
                value={soilMoisturePct}
                onChange={(e) => setSoilMoisturePct(Number(e.target.value))}
                className="w-32 accent-emerald-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-800 w-8">{soilMoisturePct}%</span>
            </div>
          </div>

          {/* Interactive 16-Bit Register: GPIOA->ODR */}
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  Port A Output Data Register: <code>GPIOA-&gt;ODR</code> (Address: 0x4001080C)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any bit to toggle pin output. Notice how neighboring pins remain completely untouched!
                </p>
              </div>

              <div className="text-xs font-mono px-3 py-1 rounded-md bg-white border border-slate-200 text-emerald-700 font-bold shadow-2xs">
                Register Value: 0x{gpioaOdr.toString(16).toUpperCase().padStart(4, '0')} (Dec: {gpioaOdr})
              </div>
            </div>

            {/* 16 Bit Blocks (Bit 15 down to Bit 0) */}
            <div className="grid grid-cols-8 md:grid-cols-16 gap-1.5 font-mono text-center">
              {Array.from({ length: 16 }).map((_, idx) => {
                const bit = 15 - idx;
                const isSet = (gpioaOdr & (1 << bit)) !== 0;
                const isValve3 = bit === 7;
                const isFan = bit === 3;

                return (
                  <button
                    key={bit}
                    onClick={() => toggleBit(bit)}
                    className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      isSet
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    } ${isValve3 ? 'ring-2 ring-amber-400' : ''} ${isFan ? 'ring-2 ring-blue-400' : ''}`}
                    title={`Pin ${bit} (${isValve3 ? 'Irrigation Valve 3' : isFan ? 'Fan' : 'General GPIO'})`}
                  >
                    <span className="text-[10px] opacity-75">b{bit}</span>
                    <span className="text-sm font-bold mt-0.5">{isSet ? '1' : '0'}</span>
                    <span className="text-[9px] mt-0.5 truncate w-full font-sans font-semibold">
                      {isValve3 ? 'V3' : isFan ? 'FAN' : `P${bit}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Code Executed Output */}
            <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Executed C: </span>
                <span>{lastExecutedC}</span>
              </div>
            </div>

            {/* Bitwise Macro Helper Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={openValve3}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs"
              >
                Open Valve 3: <code>GPIOA-&gt;ODR |= (1 &lt;&lt; 7);</code>
              </button>
              <button
                onClick={closeValve3}
                className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-800 shadow-2xs"
              >
                Close Valve 3: <code>GPIOA-&gt;ODR &amp;= ~(1 &lt;&lt; 7);</code>
              </button>
              <button
                onClick={toggleFan}
                className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-semibold text-blue-800 shadow-2xs"
              >
                Toggle Fan: <code>GPIOA-&gt;ODR ^= (1 &lt;&lt; 3);</code>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Watchdog Timer (WDT) */}
      {activeTab === 'watchdog' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  Independent Watchdog Timer (IWDG) Hardware Counter
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Clocked by an independent 32 kHz LSI oscillator. If the main loop hangs because of an electrical glitch, the counter reaches 0 ms and generates a hardware system reset in 1.6 seconds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">Total WDT Resets:</span>
                <span className="text-xs font-mono font-bold text-rose-700 px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                  {wdtResetCount}
                </span>
              </div>
            </div>

            {/* Gauge */}
            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Counter Countdown:</span>
                <span
                  className={`text-xl font-mono font-bold ${
                    wdtCounterMs < 400 ? 'text-rose-700 animate-pulse' : 'text-emerald-700'
                  }`}
                >
                  {wdtCounterMs} ms / 1600 ms
                </span>
              </div>

              <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden border border-slate-300">
                <div
                  className={`h-full transition-all duration-100 ${
                    wdtCounterMs < 400 ? 'bg-rose-600' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${(wdtCounterMs / 1600) * 100}%` }}
                />
              </div>

              {/* Status Message */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
                {wdtStatusLog}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={feedWatchdogManual}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Feed the Dog: IWDG-&gt;KR = 0xAAAA;
                </button>
                <button
                  onClick={freezeMainLoop}
                  className="px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-300 text-xs font-bold text-rose-800 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Simulate Firmware Freeze: while(1);
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Volatile Inspector */}
      {activeTab === 'volatile-inspector' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  Compiler Optimizer (-O2) Disassembly Comparison
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Toggle the volatile qualifier to see why compilers break embedded hardware polling loops without it!
                </p>
              </div>

              <button
                onClick={() => setHasVolatile(!hasVolatile)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  hasVolatile
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-rose-50 border-rose-300 text-rose-700'
                }`}
              >
                {hasVolatile ? 'WITH volatile uint16_t*' : 'WITHOUT volatile (BUGGY)'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800">
                <div className="text-slate-400 font-sans font-bold mb-2">C Source Code:</div>
                <pre className="leading-relaxed overflow-x-auto">
{hasVolatile
  ? `// Correct Embedded C:
uint16_t *reg = (volatile uint16_t*)0x4001204C;
while (*reg < 300) {
    // Waits until soil moisture updates
}`
  : `// Dangerous Missing Volatile:
uint16_t *reg = (uint16_t*)0x4001204C;
while (*reg < 300) {
    // Compiler thinks *reg never changes!
}`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 font-sans font-bold mb-2">Generated ARM Assembly:</div>
                <pre
                  className={`leading-relaxed overflow-x-auto ${
                    hasVolatile ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
{hasVolatile
  ? `loop:
    LDRH R0, [R1]      ; Re-fetches from 0x4001204C every cycle!
    CMP  R0, #300
    BLT  loop          ; Correctly loops until hardware changes`
  : `    LDRH R0, [R1]      ; Reads 0x4001204C ONCE into R0
loop:
    CMP  R0, #300      ; Compares cached stale R0
    BLT  loop          ; INFINITE LOOP! Never detects moisture!`}
                </pre>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
              <strong className="text-slate-900">Engineering Rule:</strong> If a memory location can change without the current C code writing to it (such as a hardware ADC register, DMA buffer, or variable written by an ISR), it <strong>MUST</strong> be qualified with <code>volatile</code>.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Context Switch Stack */}
      {activeTab === 'context-switch' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  RTOS Context Switch Register Stack Snapshot
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  When switching from Soil Sampling Task to Valve Control Task, PendSV pushes the CPU registers onto the Process Stack Pointer (PSP) in 2.8 microseconds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTask(activeTask === 'sampling' ? 'irrigation' : 'sampling')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Trigger PendSV Context Switch
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-emerald-800 mb-2">
                  Active Task: <span className="uppercase text-slate-900">{activeTask} Task</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 font-mono">
                  <div>Process Stack Pointer (PSP): <code>0x200003F0</code></div>
                  <div>Main Stack Pointer (MSP): <code>0x20001000</code></div>
                  <div>Interrupt Latency: <code>&lt; 12 clock cycles</code></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs font-mono text-xs">
                <div className="text-slate-500 font-sans font-bold mb-2">Saved Register Frame on Stack:</div>
                <div className="grid grid-cols-2 gap-2 text-slate-800">
                  {Object.entries(stackRegisters).map(([reg, val]) => (
                    <div key={reg} className="p-1.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                      <span className="text-emerald-700 font-bold">{reg}:</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
