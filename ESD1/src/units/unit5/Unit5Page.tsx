import React, { useState } from 'react';
import { UnitData } from '../../types/embedded';
import { Unit5HardwareDiagram } from './Unit5HardwareDiagram';
import { Unit5PartsExploration } from './Unit5PartsExploration';
import { Unit5Simulator } from './Unit5Simulator';
import { StoryView } from '../../components/StoryView';
import { CheckpointQuiz } from '../../components/CheckpointQuiz';
import { WhatIfLab } from '../../components/WhatIfLab';
import { BookOpen, Layers, Cpu, Zap, CheckCircle2, AlertOctagon, Trophy } from 'lucide-react';

interface Unit5PageProps {
  unit: UnitData;
  onNextUnit?: () => void;
}

export const Unit5Page: React.FC<Unit5PageProps> = ({ unit }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>(unit.hardwareArchitecture.parts[0]?.id || 'u5-p1');

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
            Unit 5 Navigator:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'u5-sec-story', label: '1. Incident Story', icon: Layers },
            { id: 'u5-sec-diagram', label: '2. Hardware Diagram', icon: Cpu },
            { id: 'u5-sec-parts', label: '3. Parts & Keywords', icon: BookOpen },
            { id: 'u5-sec-simulator', label: '4. Live Simulator', icon: Zap },
            { id: 'u5-sec-checkpoint', label: '5. Interactive Checkpoint', icon: CheckCircle2 },
            { id: 'u5-sec-whatif', label: '6. What-If? Lab', icon: AlertOctagon },
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
      <section id="u5-sec-story" className="scroll-mt-36">
        <StoryView unit={unit} />
      </section>

      {/* 2. Interactive Hardware Schematic Diagram */}
      <section id="u5-sec-diagram" className="scroll-mt-36">
        <Unit5HardwareDiagram
          parts={unit.hardwareArchitecture.parts}
          selectedPartId={selectedPartId}
          onSelectPart={(id) => {
            setSelectedPartId(id);
            const partsEl = document.getElementById('u5-sec-parts');
            if (partsEl) {
              partsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }}
        />
      </section>

      {/* 3. Detailed Parts & Concept Keywords Explanation */}
      <section id="u5-sec-parts" className="scroll-mt-36">
        <Unit5PartsExploration
          parts={unit.hardwareArchitecture.parts}
          selectedPartId={selectedPartId}
          onSelectPart={setSelectedPartId}
        />
      </section>

      {/* 4. Live Interactive Simulator Studio */}
      <section id="u5-sec-simulator" className="scroll-mt-36">
        <Unit5Simulator />
      </section>

      {/* 5. Interactive Checkpoint & Knowledge Test */}
      <section id="u5-sec-checkpoint" className="scroll-mt-36">
        <CheckpointQuiz
          checkpoint={unit.checkpoint}
          unitNumber={unit.unitNumber}
          isLastUnit={true}
        />
      </section>

      {/* 6. What-If? Fault Injection Lab */}
      <section id="u5-sec-whatif" className="scroll-mt-36">
        <WhatIfLab
          scenarios={unit.whatIfScenarios}
          unitNumber={unit.unitNumber}
        />
      </section>

      {/* Curriculum Mastery Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-800">
              Curriculum Milestone Achieved
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              Full Embedded Systems Lifecycle Mastered!
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-xl">
              You have journeyed from Unit 1’s smart home appliance hard real-time deadlines to automotive ASIL-D Harvard ABS ECUs, direct memory-mapped C pointers, FreeRTOS preemptive schedulers with TinyML, and life-critical medical wearable design.
            </p>
          </div>
        </div>

        <div className="text-center md:text-right shrink-0">
          <div className="inline-block px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-mono font-bold text-xs shadow-2xs">
            5 / 5 Units Completed (100%)
          </div>
        </div>
      </div>
    </div>
  );
};
