import React, { useState } from 'react';
import { UnitData } from '../../types/embedded';
import { Unit4HardwareDiagram } from './Unit4HardwareDiagram';
import { Unit4PartsExploration } from './Unit4PartsExploration';
import { Unit4Simulator } from './Unit4Simulator';
import { StoryView } from '../../components/StoryView';
import { CheckpointQuiz } from '../../components/CheckpointQuiz';
import { WhatIfLab } from '../../components/WhatIfLab';
import { ArrowRight, BookOpen, Layers, Cpu, Zap, CheckCircle2, AlertOctagon } from 'lucide-react';

interface Unit4PageProps {
  unit: UnitData;
  onNextUnit?: () => void;
}

export const Unit4Page: React.FC<Unit4PageProps> = ({ unit, onNextUnit }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>(unit.hardwareArchitecture.parts[0]?.id || 'u4-p1');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12">
      {/* In-Page Quick Jump Sticky Header */}
      <div className="unit-page-nav sticky top-[89px] z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-2.5 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            Unit 4 Navigator:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'u4-sec-story', label: '1. Incident Story', icon: Layers },
            { id: 'u4-sec-diagram', label: '2. Hardware Diagram', icon: Cpu },
            { id: 'u4-sec-parts', label: '3. Parts & Keywords', icon: BookOpen },
            { id: 'u4-sec-simulator', label: '4. Live Simulator', icon: Zap },
            { id: 'u4-sec-checkpoint', label: '5. Interactive Checkpoint', icon: CheckCircle2 },
            { id: 'u4-sec-whatif', label: '6. What-If? Lab', icon: AlertOctagon },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Real-Life Incident Story & Concept Mapping */}
      <section id="u4-sec-story" className="scroll-mt-36">
        <StoryView unit={unit} />
      </section>

      {/* 2. Interactive Hardware Schematic Diagram */}
      <section id="u4-sec-diagram" className="scroll-mt-36">
        <Unit4HardwareDiagram
          parts={unit.hardwareArchitecture.parts}
          selectedPartId={selectedPartId}
          onSelectPart={(id) => {
            setSelectedPartId(id);
            const partsEl = document.getElementById('u4-sec-parts');
            if (partsEl) {
              partsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }}
        />
      </section>

      {/* 3. Detailed Parts & Concept Keywords Explanation */}
      <section id="u4-sec-parts" className="scroll-mt-36">
        <Unit4PartsExploration
          parts={unit.hardwareArchitecture.parts}
          selectedPartId={selectedPartId}
          onSelectPart={setSelectedPartId}
        />
      </section>

      {/* 4. Live Interactive Simulator Studio */}
      <section id="u4-sec-simulator" className="scroll-mt-36">
        <Unit4Simulator />
      </section>

      {/* 5. Interactive Checkpoint & Knowledge Test */}
      <section id="u4-sec-checkpoint" className="scroll-mt-36">
        <CheckpointQuiz
          checkpoint={unit.checkpoint}
          unitNumber={unit.unitNumber}
          onNextUnit={onNextUnit}
        />
      </section>

      {/* 6. What-If? Fault Injection Lab */}
      <section id="u4-sec-whatif" className="scroll-mt-36">
        <WhatIfLab
          scenarios={unit.whatIfScenarios}
          unitNumber={unit.unitNumber}
        />
      </section>

      {/* Bottom Unit Switcher */}
      {onNextUnit && <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-xs font-mono uppercase text-slate-400 font-bold">Next Case Study</span>
          <div className="text-base font-bold text-slate-900 mt-0.5">Unit 5: Embedded System Design and Development</div>
          <p className="text-xs text-slate-500 mt-0.5">
            “The Smart Band That Caught an Arrhythmia Before the Patient Felt It” · UML State Machine & Edge vs Cloud AI
          </p>
        </div>

        <button
          onClick={onNextUnit}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <span>Continue to Unit 5</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>}
    </div>
  );
};
