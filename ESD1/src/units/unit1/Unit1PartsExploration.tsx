import React from 'react';
import { HardwarePart } from '../../types/embedded';
import { Cpu, Zap, Radio, Shield, Layers, HelpCircle, ChevronRight, Droplets, CheckCircle2 } from 'lucide-react';

interface Unit1PartsExplorationProps {
  parts: HardwarePart[];
  selectedPartId: string;
  onSelectPart: (partId: string) => void;
}

export const Unit1PartsExploration: React.FC<Unit1PartsExplorationProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
}) => {
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
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Component Deep-Dive & Keyword Anchor
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Concept-to-Hardware Part Mapping</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Washing Machine Parts & Associated Theoretical Concepts
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Every textbook embedded concept lives in a physical electronic component inside the machine.
          </p>
        </div>

        <span className="text-xs font-mono text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200 self-start md:self-auto">
          {parts.length} Core Parts Annotated
        </span>
      </div>

      {/* Part selector pills */}
      <div className="flex flex-wrap gap-2">
        {parts.map((part) => {
          const isSelected = part.id === selectedPartId;
          return (
            <button
              key={part.id}
              onClick={() => onSelectPart(part.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{part.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Part Detailed Inspector */}
      {selectedPart && (
        <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200 space-y-5">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getPartTypeBadge(selectedPart.type)}`}>
                  {selectedPart.type}
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">Interface: {selectedPart.pinoutOrBus}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mt-1.5">{selectedPart.name}</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">{selectedPart.role}</p>
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

          {/* How this hardware operates */}
          <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed shadow-2xs">
            <span className="font-bold text-slate-900 block mb-1">Hardware Operation & Physics:</span>
            {selectedPart.howItWorks}
          </div>

          {/* Keywords & Concepts anchored specifically to this part */}
          <div>
            <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Keywords & Concepts Anchored to this Part:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedPart.associatedKeywords.map((kw, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{kw.keyword}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-normal">{kw.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
