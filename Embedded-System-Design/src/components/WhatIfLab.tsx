import React, { useState } from 'react';
import { WhatIfScenario } from '../types/embedded';
import { ShieldAlert, Wrench, Zap } from 'lucide-react';

interface WhatIfLabProps {
  scenarios: WhatIfScenario[];
  unitNumber: number;
}

export const WhatIfLab: React.FC<WhatIfLabProps> = ({ scenarios, unitNumber }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [faultInjected, setFaultInjected] = useState<boolean>(false);

  const selectedScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Unit {unitNumber} Fault Injection Lab
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">“What-If?” Failure Mode Analysis & Engineering Fixes</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Break the Embedded System to Understand Why the Rules Exist
          </h3>
        </div>

        {/* Toggle Fault Button */}
        <button
          onClick={() => setFaultInjected(!faultInjected)}
          className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all shadow-xs ${
            faultInjected
              ? 'bg-rose-600 border-rose-600 text-white animate-pulse'
              : 'bg-emerald-50 border-emerald-300 text-emerald-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{faultInjected ? 'Fault Injected (System Broken!)' : 'Normal Operation (Safe)'}</span>
        </button>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2 mt-6">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setActiveScenarioId(sc.id);
              setFaultInjected(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center gap-2 ${
              activeScenarioId === sc.id
                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <span className="font-mono text-indigo-600 font-bold">#{idx + 1}</span>
            <span>{sc.title}</span>
          </button>
        ))}
      </div>

      {/* Main Comparison Area */}
      {selectedScenario && (
        <div className="mt-6 space-y-6">
          {/* Scenario Overview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-bold">
              Hypothetical Architectural Deviation
            </div>
            <p className="text-sm text-slate-900 font-bold mt-1">
              "{selectedScenario.change}"
            </p>
          </div>

          {/* Fault Simulation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: Catastrophic Outcome */}
            <div
              className={`p-5 rounded-xl border transition-all ${
                faultInjected
                  ? 'bg-rose-50/70 border-rose-300 shadow-xs'
                  : 'bg-slate-50/50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Catastrophic Real-World Outcome</span>
              </div>
              <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                {selectedScenario.catastrophicOutcome}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Root Cause Mechanism:</div>
                <div className="text-xs text-rose-800 font-semibold mt-1">
                  {selectedScenario.rootCause}
                </div>
              </div>
            </div>

            {/* Right Card: Engineering Remedy */}
            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                <Wrench className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Production Engineering Remedy</span>
              </div>
              <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                {selectedScenario.engineeringRemedy}
              </p>

              <div className="mt-4 pt-3 border-t border-emerald-200/80">
                <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">Why It Prevents Disaster:</div>
                <div className="text-xs text-emerald-900 font-medium mt-1">
                  Enforces hardware determinism, watchdogs, and isolated buses to eliminate non-deterministic failure states.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
