import React from 'react';
import { HardwarePart } from '../../types/embedded';
import { Cpu, Zap, Radio, Shield, HelpCircle, Layers, Activity, Gauge } from 'lucide-react';

interface Unit2HardwareDiagramProps {
  parts: HardwarePart[];
  onSelectPart: (partId: string) => void;
  selectedPartId: string;
}

export const Unit2HardwareDiagram: React.FC<Unit2HardwareDiagramProps> = ({
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
            <span className="text-xs text-slate-500 font-medium">Automotive ABS Electronic Control Unit (ECU)</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            ABS ECU Dual-Bus Harvard Architecture & Sensor/Actuator Matrix
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Click on any chip, bus line, or actuator below to inspect its operational role, pinout, and key embedded concepts.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          Automotive Grade: ASIL-D ISO 26262
        </div>
      </div>

      {/* Visual SVG Schematic Diagram */}
      <div className="mt-6 p-4 md:p-6 rounded-xl bg-slate-50/70 border border-slate-200 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Signal flow legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              SENSORS (4x Magnetic Wheel Pickups + SPI Pressure)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
              HARVARD DUAL-BUS 32-BIT MCU + FPGA ACCELERATOR
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              ACTUATORS (8-Valve Modulator) & CAN BUS
            </span>
          </div>

          {/* Schematic Diagram Grid */}
          <div className="grid grid-cols-12 gap-4 py-6 items-center">
            {/* Left Column: 4 Wheel Sensors & SPI Pressure (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Wheel Speed Sensors */}
              <button
                onClick={() => onSelectPart('u2-p2')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u2-p2'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-blue-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    MAGNETIC RELUCTANCE SENSORS
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">4x TIM_IC</span>
                </div>
                <div className="text-xs font-bold text-slate-900">4x Active Wheel Speed Pickups</div>
                <div className="text-[11px] text-slate-500 mt-1">FL, FR, RL, RR (100 kHz input capture)</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Busses: Timer 2/3 Input Capture Channels
                </div>
              </button>

              {/* Memory: Flash vs SRAM */}
              <button
                onClick={() => onSelectPart('u2-p4')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u2-p4'
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-purple-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    DUAL MEMORY ARCHITECTURE
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">ECC Hardware</span>
                </div>
                <div className="text-xs font-bold text-slate-900">2 MB ECC Flash (ROM) & 256 KB SRAM</div>
                <div className="text-[11px] text-slate-500 mt-1">Immutable Firmware ROM vs Scratchpad RAM</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Separate Address & Data Buses
                </div>
              </button>
            </div>

            {/* Middle Column: Central Dual-Bus Core & FPGA (4 cols) */}
            <div className="col-span-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-indigo-500 shadow-md relative space-y-3">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Automotive ABS ECU Core
                </div>

                {/* MCU Button */}
                <button
                  onClick={() => onSelectPart('u2-p1')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all mt-1 ${
                    selectedPartId === 'u2-p1'
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-indigo-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      HARVARD DUAL-BUS MCU
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Infineon AURIX</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">32-bit Automotive MCU</div>
                  <div className="text-[11px] text-slate-500 mt-1">Dual-Bus Matrix: Simultaneous Code Fetch & Data Access</div>
                  <div className="mt-2 text-[10px] text-indigo-600 font-mono font-semibold">
                    Calculates slip & triggers ABS &lt; 50 ms
                  </div>
                </button>

                {/* FPGA Accelerator */}
                <button
                  onClick={() => onSelectPart('u2-p6')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPartId === 'u2-p6'
                      ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-teal-700 font-semibold">
                    <span>FPGA DSP CO-PROCESSOR</span>
                    <span className="bg-teal-100 text-teal-800 px-1 py-0.5 rounded text-[9px]">Parallel Hardware</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">4x Parallel Digital Filters</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Offloads wheel noise from main CPU</div>
                </button>

                {/* Bus Indicator */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 flex justify-between">
                  <span>Bus Protocol:</span>
                  <span className="text-indigo-700 font-bold">Harvard Dual-Bus (I-Bus + D-Bus)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hydraulic Solenoids & CAN Bus (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Hydraulic Modulator */}
              <button
                onClick={() => onSelectPart('u2-p5')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u2-p5'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-amber-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    ACTUATOR · HYDRAULIC
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">15 Hz Pulsing</span>
                </div>
                <div className="text-xs font-bold text-slate-900">8-Valve Hydraulic Modulator</div>
                <div className="text-[11px] text-slate-500 mt-1">Dump, Hold & Reapply brake pressure</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Driver: High-Current MOSFET Stage
                </div>
              </button>

              {/* CAN Bus Transceiver */}
              <button
                onClick={() => onSelectPart('u2-p3')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u2-p3'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    AUTOMOTIVE BUS
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">CAN_H / CAN_L</span>
                </div>
                <div className="text-xs font-bold text-slate-900">High-Speed CAN Transceiver</div>
                <div className="text-[11px] text-slate-500 mt-1">Priority 0x010 (Brake overrides Climate)</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Differential Twisted Pair @ 500 kbps
                </div>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400 font-mono pt-3 border-t border-slate-200">
            ISO 11898 CAN Bus Interface · Redundant Lockstep Cores · Automotive Hydraulic Manifold
          </div>
        </div>
      </div>
    </div>
  );
};
