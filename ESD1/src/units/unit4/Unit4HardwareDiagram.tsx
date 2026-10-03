import React from 'react';
import { HardwarePart } from '../../types/embedded';
import { Cpu, Zap, Radio, Shield, HelpCircle, Layers, Activity } from 'lucide-react';

interface Unit4HardwareDiagramProps {
  parts: HardwarePart[];
  onSelectPart: (partId: string) => void;
  selectedPartId: string;
}

export const Unit4HardwareDiagram: React.FC<Unit4HardwareDiagramProps> = ({
  parts,
  onSelectPart,
  selectedPartId,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Interactive Hardware Schematic
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Motor Vibration & Predictive Maintenance Node</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            FreeRTOS Dual-Core & TinyML Edge Inference Architecture
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Click on any task block, accelerometer interface, or INT8 model weight segment to explore how RTOS determinism and on-device machine learning work together.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          RTOS: FreeRTOS v10.4 · 1 ms SysTick
        </div>
      </div>

      {/* Visual SVG Schematic Diagram */}
      <div className="mt-6 p-4 md:p-6 rounded-xl bg-slate-50/70 border border-slate-200 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Signal flow legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              SENSORS (3-Axis High-Rate Accelerometer via SPI @ 10 MHz)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
              FREERTOS PREEMPTIVE SCHEDULER & INT8 TINYML CNN
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              ACTUATOR (Emergency 415V Contactor) & MQTT
            </span>
          </div>

          {/* Schematic Diagram Grid */}
          <div className="grid grid-cols-12 gap-4 py-6 items-center">
            {/* Left Column: Accelerometer Sensor & IPC Queue (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Accelerometer */}
              <button
                onClick={() => onSelectPart('u4-p1')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u4-p1'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-blue-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    SPI ACCELEROMETER
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">6.4 kHz ODR</span>
                </div>
                <div className="text-xs font-bold text-slate-900">3-Axis Piezo Accelerometer (ADXL357)</div>
                <div className="text-[11px] text-slate-500 mt-1">Samples ±40g bearing vibration via SPI</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Bus: SPI1 (10 MHz DMA Transfer)
                </div>
              </button>

              {/* FreeRTOS Queue & Semaphore */}
              <button
                onClick={() => onSelectPart('u4-p3')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u4-p3'
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-purple-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    THREAD-SAFE IPC
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">Queue FIFO</span>
                </div>
                <div className="text-xs font-bold text-slate-900">FreeRTOS Queue & Mutex Buffer</div>
                <div className="text-[11px] text-slate-500 mt-1">Zero-copy ring buffer with priority inheritance</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  SRAM Ring Buffer + Binary Semaphore
                </div>
              </button>
            </div>

            {/* Middle Column: Dual-Core CPU & INT8 Model (4 cols) */}
            <div className="col-span-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-indigo-500 shadow-md relative space-y-3">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Edge Intelligence Core
                </div>

                {/* MCU Button */}
                <button
                  onClick={() => onSelectPart('u4-p2')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all mt-1 ${
                    selectedPartId === 'u4-p2'
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-indigo-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      DUAL-CORE RTOS MCU
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">ESP32-S3 / M4</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">FreeRTOS Preemptive Core</div>
                  <div className="text-[11px] text-slate-500 mt-1">Strict priority scheduler (Priority 5 &gt; 4 &gt; 3 &gt; 1)</div>
                  <div className="mt-2 text-[10px] text-indigo-600 font-mono font-semibold">
                    Sub-3 µs context switch latency
                  </div>
                </button>

                {/* TinyML Weights in Flash */}
                <button
                  onClick={() => onSelectPart('u4-p4')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPartId === 'u4-p4'
                      ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-teal-700 font-semibold">
                    <span>TINYML INT8 CNN</span>
                    <span className="bg-teal-100 text-teal-800 px-1 py-0.5 rounded text-[9px]">62 KB Flash</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">Quantized Neural Network</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Detects bearing inner race micro-flaws</div>
                </button>

                {/* Scheduling Rule Callout */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 flex justify-between">
                  <span>Scheduler Policy:</span>
                  <span className="text-indigo-700 font-bold">Preemptive Priority + Round-Robin</span>
                </div>
              </div>
            </div>

            {/* Right Column: Emergency Contactor & Cloud Upload (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Emergency Contactor Relay */}
              <button
                onClick={() => onSelectPart('u4-p5')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u4-p5'
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-rose-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    HARD REAL-TIME ACTUATOR
                  </span>
                  <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">Priority 5</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Emergency Shutdown Contactor</div>
                <div className="text-[11px] text-slate-500 mt-1">Trips 415V 3-phase power in &lt; 15 ms</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Pin: PB12 (High-Side Contactor Coil Driver)
                </div>
              </button>

              {/* Cloud / RS485 Upload */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-left">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    LOW-PRIORITY TELEMETRY
                  </span>
                  <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">Priority 1</span>
                </div>
                <div className="text-xs font-bold text-slate-900">MQTT Cloud Telemetry Task</div>
                <div className="text-[11px] text-slate-500 mt-1">Preempted instantly whenever motor anomaly occurs</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Wi-Fi / Ethernet / RS-485 Modbus
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400 font-mono pt-3 border-t border-slate-200">
            FreeRTOS Task Control Blocks (TCB) · Nested Interrupt Vector Controller · Direct Memory Access (DMA)
          </div>
        </div>
      </div>
    </div>
  );
};
