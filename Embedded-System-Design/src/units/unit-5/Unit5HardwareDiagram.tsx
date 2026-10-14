import React from 'react';
import { HardwarePart } from '../../types/embedded';
import { Heart, Activity, Cpu, Battery, Wifi, Shield, Zap, Layers } from 'lucide-react';

interface Unit5HardwareDiagramProps {
  parts: HardwarePart[];
  onSelectPart: (partId: string) => void;
  selectedPartId: string;
}

export const Unit5HardwareDiagram: React.FC<Unit5HardwareDiagramProps> = ({
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
            <span className="text-xs text-slate-500 font-medium">Medical Cardiac Smart Band (Bangalore Clinical Wearable)</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Wearable Bio-Potential AFE & Edge Neural Accelerator Matrix
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Click on any bio-sensor, NPU accelerator, or power-gated rail below to see how medical criteria translate into ultra-low-power silicon architecture.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          Grade: Class IIa Medical Device · ISO 13485
        </div>
      </div>

      {/* Visual SVG Schematic Diagram */}
      <div className="mt-6 p-4 md:p-6 rounded-xl bg-slate-50/70 border border-slate-200 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Signal flow legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              PERCEPTION LAYER (Dry Titanium Electrodes & 24-bit AFE)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
              DUAL-CORE SOC + ON-CHIP NPU ACCELERATOR
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              ACTUATOR (LRA Haptic) & BLE 5.2 ANTENNA
            </span>
          </div>

          {/* Schematic Diagram Grid */}
          <div className="grid grid-cols-12 gap-4 py-6 items-center">
            {/* Left Column: ECG Electrodes & PMIC Battery (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* Electrodes & AFE */}
              <button
                onClick={() => onSelectPart('u5-p1')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u5-p1'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-blue-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500" />
                    BIO-POTENTIAL AFE
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">250 Hz ADC</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Dry Titanium Skin Electrodes + AFE</div>
                <div className="text-[11px] text-slate-500 mt-1">Differential ECG capture (120 dB CMRR)</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Bus: SPI to 24-bit Delta-Sigma ADC
                </div>
              </button>

              {/* PMIC & LiPo Battery */}
              <button
                onClick={() => onSelectPart('u5-p5')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u5-p5'
                    ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-teal-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Battery className="w-3 h-3" />
                    ENERGY BUDGETING
                  </span>
                  <span className="bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">180 mAh LiPo</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Dynamic PMIC & Battery Management</div>
                <div className="text-[11px] text-slate-500 mt-1">15 µA Sleep · 7-Day Autonomous Life</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  I²C PMIC + Multiple Voltage Rails
                </div>
              </button>
            </div>

            {/* Middle Column: Dual Core & NPU (4 cols) */}
            <div className="col-span-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-indigo-500 shadow-md relative space-y-3">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Wearable Silicon Core
                </div>

                {/* MCU Button */}
                <button
                  onClick={() => onSelectPart('u5-p2')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all mt-1 ${
                    selectedPartId === 'u5-p2'
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-indigo-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      DUAL-CORE SOC + NPU
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">22nm CMOS</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">Cortex-M0+ & Cortex-M4F + NPU</div>
                  <div className="text-[11px] text-slate-500 mt-1">On-Device Arrhythmia Inference in 120 ms</div>
                  <div className="mt-2 text-[10px] text-indigo-600 font-mono font-semibold">
                    16x16 Parallel MAC Systolic Array
                  </div>
                </button>

                {/* UML State Machine Callout */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Firmware Model:</span>
                    <span className="text-indigo-700 font-bold">UML Hierarchical State Machine</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Edge AI Tradeoff:</span>
                    <span className="text-emerald-700 font-bold">Zero Cloud Lag · 100% Privacy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Haptic & BLE 5.2 Antenna (4 cols) */}
            <div className="col-span-4 space-y-3.5">
              {/* LRA Haptic Motor */}
              <button
                onClick={() => onSelectPart('u5-p4')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u5-p4'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-amber-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    ACTUATOR · HAPTIC
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">205 Hz LRA</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Linear Resonant Haptic Motor</div>
                <div className="text-[11px] text-slate-500 mt-1">Immediate tactile vibration alert on wrist</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Driver: DRV2605 over I²C
                </div>
              </button>

              {/* BLE 5.2 Antenna */}
              <button
                onClick={() => onSelectPart('u5-p3')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedPartId === 'u5-p3'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    CONNECTIVITY LAYER
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">BLE 5.2</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Bluetooth Low Energy Transceiver</div>
                <div className="text-[11px] text-slate-500 mt-1">Dispatches emergency alert in &lt; 90 seconds</div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  2.4 GHz Ceramic Patch Antenna
                </div>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400 font-mono pt-3 border-t border-slate-200">
            ISO 14971 Risk Management · Zero-Jitter ECG Sampling · Low-Power Bluetooth Stack
          </div>
        </div>
      </div>
    </div>
  );
};
