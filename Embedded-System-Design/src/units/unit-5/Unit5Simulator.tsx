import React from 'react';
import { Unit5DesignSim } from '../../components/simulators/Unit5DesignSim';

export const Unit5Simulator: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Interactive Simulator Studio
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">UML State Machine & Edge AI Tradeoff Lab</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Wearable UML State Machine & Edge vs Cloud AI Calculator
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Step through deterministic UML state transitions from 15 µA Sleep to 4 mA Arrhythmia Analysis, and calculate real-time battery life and latency tradeoffs.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {['UML State Machine', 'Edge vs Cloud AI', 'Power-Gating 15 µA', 'Medical Reliability'].map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Unit5DesignSim />
    </div>
  );
};
