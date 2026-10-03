import React, { useState } from 'react';
import { HardwarePart } from '../types/embedded';
import { Cpu, Zap, Radio, Shield, Layers, HelpCircle, ChevronRight, Activity } from 'lucide-react';

interface HardwareDiagramViewProps {
  diagramTitle: string;
  description: string;
  parts: HardwarePart[];
  unitNumber: number;
}

export const HardwareDiagramView: React.FC<HardwareDiagramViewProps> = ({
  diagramTitle,
  description,
  parts,
  unitNumber,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>(parts[0]?.id || '');

  const selectedPart = parts.find((p) => p.id === selectedPartId) || parts[0];

  const getPartTypeBadge = (type: HardwarePart['type']) => {
    switch (type) {
      case 'Sensor':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Microcontroller / SoC':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Actuator':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Memory':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Communication':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Safety / Interlock':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Power':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Hardware Architecture & Exploded Pinout
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Unit {unitNumber} System Schematic</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{diagramTitle}</h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-3xl">{description}</p>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          Click any component to inspect keywords
        </div>
      </div>

      {/* Schematic Bus Canvas */}
      <div className="mt-6 p-6 rounded-xl bg-slate-50 border border-slate-200 overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Schematic Header Label */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-slate-200">
            <span>INPUT STAGE (SENSORS)</span>
            <span className="text-indigo-600 font-bold">CENTRAL PROCESSING & MEMORY MATRIX</span>
            <span>OUTPUT STAGE (ACTUATORS & COMMS)</span>
          </div>

          {/* Interactive Block Diagram Nodes */}
          <div className="grid grid-cols-3 gap-6 py-6 items-center">
            {/* Column 1: Sensors */}
            <div className="space-y-3">
              {parts
                .filter((p) => p.type === 'Sensor' || p.type === 'Safety / Interlock')
                .map((p) => {
                  const isSelected = p.id === selectedPartId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPartId(p.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md border-blue-600 ring-2 ring-blue-300'
                          : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className={isSelected ? 'text-blue-100' : 'text-blue-600 font-semibold'}>
                          {p.type.toUpperCase()}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </div>
                      <div className="text-xs font-bold leading-tight">{p.name}</div>
                    </button>
                  );
                })}
            </div>

            {/* Column 2: Central MCU & Memory Core */}
            <div className="space-y-3">
              {parts
                .filter((p) => p.type === 'Microcontroller / SoC' || p.type === 'Memory')
                .map((p) => {
                  const isSelected = p.id === selectedPartId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPartId(p.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md border-indigo-600 ring-2 ring-indigo-300'
                          : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className={isSelected ? 'text-indigo-100' : 'text-indigo-600 font-semibold'}>
                          {p.type.toUpperCase()}
                        </span>
                        <Cpu className="w-4 h-4 opacity-70" />
                      </div>
                      <div className="text-xs font-bold leading-tight">{p.name}</div>
                    </button>
                  );
                })}
            </div>

            {/* Column 3: Actuators, Power & Comms */}
            <div className="space-y-3">
              {parts
                .filter((p) => p.type === 'Actuator' || p.type === 'Communication' || p.type === 'Power')
                .map((p) => {
                  const isSelected = p.id === selectedPartId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPartId(p.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-md border-amber-600 ring-2 ring-amber-300'
                          : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className={isSelected ? 'text-amber-100' : 'text-amber-600 font-semibold'}>
                          {p.type.toUpperCase()}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </div>
                      <div className="text-xs font-bold leading-tight">{p.name}</div>
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400 font-mono pt-2 border-t border-slate-200">
            Internal 32-bit Bus Matrix · Peripheral Bridges (APB/AHB) · Isolated Power Rails
          </div>
        </div>
      </div>

      {/* Selected Part Deep-Dive Inspector (Concepts & Keywords) */}
      {selectedPart && (
        <div className="mt-6 p-6 rounded-xl bg-slate-50/80 border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getPartTypeBadge(selectedPart.type)}`}>
                  {selectedPart.type}
                </span>
                <span className="text-xs text-slate-500 font-mono">Pinout: {selectedPart.pinoutOrBus}</span>
              </div>
              <h4 className="text-base md:text-lg font-bold text-slate-900 mt-1">{selectedPart.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{selectedPart.role}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
              {selectedPart.keyConcepts.map((kc) => (
                <span
                  key={kc}
                  className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-2xs"
                >
                  {kc}
                </span>
              ))}
            </div>
          </div>

          {/* How It Works in Hardware */}
          <div className="mt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">How this hardware operates: </strong>
            {selectedPart.howItWorks}
          </div>

          {/* Keywords & Concepts Mapped Specifically to this Part */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Keywords & Concepts Anchored to this Component:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {selectedPart.associatedKeywords.map((kw, i) => (
                <div key={i} className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{kw.keyword}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">{kw.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
