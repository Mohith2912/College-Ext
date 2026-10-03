import React, { useState } from 'react';
import { HardwarePart } from '../../types/embedded';
import { Droplets, Cpu, Zap, Radio, Shield, HelpCircle, Layers, Activity, CheckCircle2 } from 'lucide-react';

interface Unit1HardwareDiagramProps {
  parts: HardwarePart[];
  onSelectPart: (partId: string) => void;
  selectedPartId: string;
}

export const Unit1HardwareDiagram: React.FC<Unit1HardwareDiagramProps> = ({
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
            <span className="text-xs text-slate-500 font-medium">Smart Washing Machine Controller PCB & Peripherals</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Physical Hardware Architecture & Pinout Routing
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Click on any physical component or bus connection below to inspect its wiring, working physics, and embedded concepts.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          Schematic: Top-Load Inverter Controller Rev 3.2
        </div>
      </div>

      {/* Visual SVG Schematic Diagram */}
      <div className="mt-6 p-4 md:p-6 rounded-xl bg-slate-50/70 border border-slate-200 overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Signal flow legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              SENSORS (Frequency / Analog / Logic)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
              CENTRAL 32-BIT CONTROLLER (Cortex-M0+)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              HIGH-POWER ACTUATORS & CONNECTIVITY
            </span>
          </div>

          {/* Graphical Hardware Diagram */}
          <div className="grid grid-cols-12 gap-4 py-6 items-center">
            {/* Left Column: Sensors & Inputs (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Part 1: Water Level Pressure Sensor */}
              <button
                onClick={() => onSelectPart('u1-p1')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedPartId === 'u1-p1'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-blue-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    SENSOR · FREQUENCY LC
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">TIM1_ETR</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Piezo Water Pressure Sensor</div>
                <div className="text-[11px] text-slate-500 mt-1">18.2 kHz (empty) → 21.4 kHz (full)</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <span>Pin: PA12 (Timer Counter)</span>
                </div>
              </button>

              {/* Part 7: Lid Switch Safety Interlock */}
              <button
                onClick={() => onSelectPart('u1-p7')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedPartId === 'u1-p7'
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-rose-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    SAFETY INTERLOCK
                  </span>
                  <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">EXTI0_IRQ</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Lid Safety Switch Interlock</div>
                <div className="text-[11px] text-slate-500 mt-1">Hard Real-Time Dynamic Brake &lt; 24 ms</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <span>Pin: PA0 (Active-Low Interrupt)</span>
                </div>
              </button>
            </div>

            {/* Middle Column: Central Controller Board (4 cols) */}
            <div className="col-span-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-indigo-500 shadow-md relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Main System Board
                </div>

                {/* MCU Button */}
                <button
                  onClick={() => onSelectPart('u1-p2')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all mt-2 ${
                    selectedPartId === 'u1-p2'
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-indigo-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      MCU · 32-BIT CORE
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">ARM Cortex-M0+</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">Main Control MCU (STM32G0)</div>
                  <div className="text-[11px] text-slate-500 mt-1">512 KB Flash ROM · 64 KB SRAM</div>
                  <div className="mt-2 text-[10px] text-indigo-600 font-mono font-semibold">
                    Runs permanent wash cycle firmware
                  </div>
                </button>

                {/* Internal Bus & Power Architecture */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Power Management:</span>
                    <span className="text-emerald-700 font-bold">0.3 W Standby (SMPS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Firmware Security:</span>
                    <span className="text-slate-800">Locked Flash JTAG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Watchdog Timer:</span>
                    <span className="text-slate-800">Hardware IWDG (1.6s)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Actuators, Valves & Comms (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Part 3: BLDC Motor */}
              <button
                onClick={() => onSelectPart('u1-p3')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u1-p3'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-amber-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    ACTUATOR · MOTOR
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">TIM1_CH1-CH3</span>
                </div>
                <div className="text-xs font-bold text-slate-900">BLDC Drum Motor + Inverter</div>
                <div className="text-[11px] text-slate-500 mt-1">PWM 16 kHz Variable Speed (0–1200 RPM)</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <span>Pin: PB13–PB15 (Complementary PWM)</span>
                </div>
              </button>

              {/* Part 4: Solenoid Inlet Valves */}
              <button
                onClick={() => onSelectPart('u1-p4')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u1-p4'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-amber-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    ACTUATOR · SOLENOID
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">GPIO Output</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Inlet & Drain Solenoid Valves</div>
                <div className="text-[11px] text-slate-500 mt-1">Hard Real-Time 200 ms Deadline</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <span>Pin: PC6, PC7 (Opto-Isolated Triac)</span>
                </div>
              </button>

              {/* Part 5: Wi-Fi Module */}
              <button
                onClick={() => onSelectPart('u1-p5')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u1-p5'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    COMMUNICATION
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">UART 115200</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Wi-Fi Transceiver Module (ESP8266)</div>
                <div className="text-[11px] text-slate-500 mt-1">IoT Telemetry & Soft Real-Time Push</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <span>Pin: USART2 TX/RX (PA2/PA3)</span>
                </div>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400 font-mono pt-3 border-t border-slate-200">
            Optically Isolated High-Voltage Power Stage · 3.3V Logic Bus · Galvanic Barrier
          </div>
        </div>
      </div>
    </div>
  );
};
