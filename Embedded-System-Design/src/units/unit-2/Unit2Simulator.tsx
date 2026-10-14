import React from 'react';
import { Unit2ArchitectureSim } from '../../components/simulators/Unit2ArchitectureSim';

export const Unit2Simulator: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Interactive Simulator Studio
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Silicon Architecture & Bus Arbitration</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Harvard vs Von Neumann Bus Race & Live CAN Bus Arbitration
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Simulate high-speed emergency braking on a wet highway. Compare dual-bus Harvard latency against Von Neumann bottleneck, and step through CAN bitwise dominant/recessive arbitration.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {['Harvard vs Von Neumann', 'CAN Arbitration', 'Hydraulic Pulsing', 'ASIL-D Safety'].map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Unit2ArchitectureSim />
    </div>
  );
};
