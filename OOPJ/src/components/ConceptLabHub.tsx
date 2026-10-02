import React, { useState } from 'react';
import { ConceptSim1 } from '../units/unit1/ConceptSim1';
import { ConceptSim2 } from '../units/unit2/ConceptSim2';
import { ConceptSim3 } from '../units/unit3/ConceptSim3';
import { ConceptSim4 } from '../units/unit4/ConceptSim4';
import { ConceptSim5 } from '../units/unit5/ConceptSim5';
import { UnitId } from '../types/concept';
import { 
  Sparkles, 
  GitBranch, 
  Layers, 
  ShieldAlert, 
  Cpu, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ConceptLabHubProps {
  currentUnit: UnitId | 'all';
  onSelectUnit: (unit: UnitId | 'all') => void;
  onOpenFillups?: () => void;
  lockedUnit?: UnitId;
}

export const ConceptLabHub: React.FC<ConceptLabHubProps> = ({
  currentUnit,
  onSelectUnit,
  onOpenFillups,
  lockedUnit
}) => {
  // If 'all' is selected, default to Unit-1 for the lab
  const [activeUnitLab, setActiveUnitLab] = useState<UnitId>(
    currentUnit === 'all' ? 'Unit-1' : currentUnit
  );

  // Sync if parent changes unit directly
  React.useEffect(() => {
    if (currentUnit !== 'all') {
      setActiveUnitLab(currentUnit);
    }
  }, [currentUnit]);

  const unitMetadata: Record<UnitId, { title: string; desc: string; icon: any }> = {
    'Unit-1': {
      title: 'Unit 1: Fundamentals of OOP & Java Basic',
      desc: 'Interactive 4 Pillars Metaphors, JVM WORA Architecture & Tiered Electricity Tariff.',
      icon: Layers
    },
    'Unit-2': {
      title: 'Unit 2: Classes, Memory & Method Overloading',
      desc: 'Memory address "this" resolver, compile-time signature matcher & generational GC.',
      icon: Cpu
    },
    'Unit-3': {
      title: 'Unit 3: Inheritance, Polymorphism & Interfaces',
      desc: 'Dynamic Method Dispatch runtime visualizer, hospital hierarchy & diamond resolver.',
      icon: GitBranch
    },
    'Unit-4': {
      title: 'Unit 4: Exception Handling & File Streams',
      desc: 'Call stack frame unwinding, checked vs unchecked errors & buffered I/O throughput.',
      icon: ShieldAlert
    },
    'Unit-5': {
      title: 'Unit 5: Multithreading, Generics & Concurrency',
      desc: 'Thread life cycle state machine, concurrent bank race conditions & mutex synchronization.',
      icon: Sparkles
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Unit Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Anna University 2321CSC304R</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{lockedUnit ? `${lockedUnit.replace('-', ' ')} Case Study` : 'Units 1 – 5 Labs'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-rose-600 font-medium">Concept Understanding Simulator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {unitMetadata[activeUnitLab].title}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              {unitMetadata[activeUnitLab].desc}
            </p>
          </div>

          {/* Unit Switcher Tabs */}
          {!lockedUnit && <div className="flex items-center gap-1.5 flex-wrap bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {(['Unit-1', 'Unit-2', 'Unit-3', 'Unit-4', 'Unit-5'] as const).map((unit) => {
              const isSelected = activeUnitLab === unit;
              return (
                <button
                  key={unit}
                  onClick={() => {
                    setActiveUnitLab(unit);
                    onSelectUnit(unit);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {unit.replace('-', ' ')}
                </button>
              );
            })}
          </div>}
        </div>

        {/* Active Concept Simulator View */}
        <div className="space-y-6">
          {activeUnitLab === 'Unit-1' && <ConceptSim1 />}
          {activeUnitLab === 'Unit-2' && <ConceptSim2 />}
          {activeUnitLab === 'Unit-3' && <ConceptSim3 />}
          {activeUnitLab === 'Unit-4' && <ConceptSim4 />}
          {activeUnitLab === 'Unit-5' && <ConceptSim5 />}
        </div>
      </div>
    </div>
  );
};
