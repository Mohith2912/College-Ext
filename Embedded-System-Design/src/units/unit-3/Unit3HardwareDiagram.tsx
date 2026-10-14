import React from 'react';
import { HardwarePart } from '../../types/embedded';
import { Cpu, Zap, Radio, Shield, HelpCircle, Layers, Droplets, Clock } from 'lucide-react';

interface Unit3HardwareDiagramProps {
  parts: HardwarePart[];
  onSelectPart: (partId: string) => void;
  selectedPartId: string;
}

export const Unit3HardwareDiagram: React.FC<Unit3HardwareDiagramProps> = ({
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
            <span className="text-xs text-slate-500 font-medium">Smart Greenhouse Irrigation Node (Nashik Rose Farm)</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            STM32 Controller & Memory-Mapped Peripheral Bus Architecture
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Click on any register address, sensor probe, or driver stage to see how Embedded C code directly drives real silicon.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          Memory Map: APB2 @ 0x40012000
        </div>
      </div>

      {/* Visual SVG Schematic Diagram */}
      <div className="mt-6 p-4 md:p-6 rounded-xl bg-slate-50/70 border border-slate-200 overflow-x-auto">
        <div className="min-w-[780px]">
          {/* Signal flow legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              SENSORS (Analog Soil Moisture Probe · ADC3)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
              STM32 CORTEX-M4 (Registers: 0x4001204C &amp; GPIOA-&gt;ODR)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              VALVE RELAYS & 1.6S WATCHDOG RESET
            </span>
          </div>

          {/* Schematic Diagram Grid */}
          <div className="grid grid-cols-12 gap-4 py-6 items-center">
            {/* Left Column: Soil Sensor & Hardware Timer (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Soil Probe */}
              <button
                onClick={() => onSelectPart('u3-p1')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u3-p1'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-blue-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    CAPACITIVE SOIL PROBE
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">ADC1_IN3</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Zone 3 Capacitive Moisture Sensor</div>
                <div className="text-[11px] text-slate-500 mt-1">Directly read via register 0x4001204C</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Pin: PA3 (12-bit SAR ADC Channel 3)
                </div>
              </button>

              {/* Hardware Timer TIM2 */}
              <button
                onClick={() => onSelectPart('u3-p6')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u3-p6'
                    ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-indigo-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    HARDWARE TIMER
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">TIM2 (IRQ 28)</span>
                </div>
                <div className="text-xs font-bold text-slate-900">16-Bit Hardware Timer (TIM2)</div>
                <div className="text-[11px] text-slate-500 mt-1">2.000s Quartz-Accurate ISR Interval</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Prescaler: 15999 · Reload: 1999
                </div>
              </button>
            </div>

            {/* Middle Column: Central STM32 Core & Watchdog (4 cols) */}
            <div className="col-span-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-indigo-500 shadow-md relative space-y-3">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Greenhouse ECU Node
                </div>

                {/* MCU Button */}
                <button
                  onClick={() => onSelectPart('u3-p2')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all mt-1 ${
                    selectedPartId === 'u3-p2'
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-indigo-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      MCU · STM32F401
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">ARM Cortex-M4</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">STM32 32-Bit Microcontroller</div>
                  <div className="text-[11px] text-slate-500 mt-1">Memory-Mapped Peripheral Registers</div>
                  <div className="mt-2 text-[10px] text-indigo-600 font-mono font-semibold">
                    ADC3 @ 0x4001204C · GPIOA @ 0x40020014
                  </div>
                </button>

                {/* Independent Watchdog */}
                <button
                  onClick={() => onSelectPart('u3-p5')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPartId === 'u3-p5'
                      ? 'bg-rose-50 border-rose-600 ring-2 ring-rose-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-rose-700 font-semibold">
                    <span>INDEPENDENT WATCHDOG</span>
                    <span className="bg-rose-100 text-rose-800 px-1 py-0.5 rounded text-[9px]">1.6s Timeout</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">Hardware IWDG Safety Counter</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Auto-reboots MCU if loop hangs at 3 a.m.</div>
                </button>

                {/* Volatile Callout */}
                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[10px] font-mono text-amber-900">
                  <span className="font-bold">Volatile Qualifier:</span> Prevents compiler optimization from caching sensor register reads in CPU registers!
                </div>
              </div>
            </div>

            {/* Right Column: Valve Actuator & Modem (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Valve 3 Relay */}
              <button
                onClick={() => onSelectPart('u3-p3')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u3-p3'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-amber-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    ACTUATOR · SOLENOID VALVE
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">GPIOA Bit 7</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Zone 3 Irrigation Solenoid Valve</div>
                <div className="text-[11px] text-slate-500 mt-1">Controlled via GPIOA-&gt;ODR |= (1 &lt;&lt; 7)</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Driver: Optocoupler + Power MOSFET
                </div>
              </button>

              {/* GSM / WhatsApp Modem */}
              <button
                onClick={() => onSelectPart('u3-p4')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u3-p4'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    CELLULAR MODEM
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">USART1 AT</span>
                </div>
                <div className="text-xs font-bold text-slate-900">SIM800 GSM / GPRS Module</div>
                <div className="text-[11px] text-slate-500 mt-1">Transmits alert: “Zone 3 irrigated – 18 litres”</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Baud: 115200 (Non-blocking queue)
                </div>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400 font-mono pt-3 border-t border-slate-200">
            Memory-Mapped Peripheral Space · Hardware Prescaler / Reload Registers · Galvanic Optical Isolation
          </div>
        </div>
      </div>
    </div>
  );
};
