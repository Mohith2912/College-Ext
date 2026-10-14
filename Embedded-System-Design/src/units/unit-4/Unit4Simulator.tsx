import React from 'react';
import { Unit4RTOSSim } from '../../components/simulators/Unit4RTOSSim';

export const Unit4Simulator: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Interactive Simulator Studio
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">FreeRTOS Gantt Scheduler & TinyML Studio</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            FreeRTOS Preemptive Priority Scheduler & INT8 TinyML Pipeline
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Experiment with task priorities on a live Gantt execution timeline, inject an emergency stop anomaly to observe sub-microsecond preemption, and run the TinyML inference pipeline.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {['FreeRTOS Preemption', 'Priority 5 > 4 > 3 > 1', 'TinyML INT8 Quantization', 'Task IPC'].map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Unit4RTOSSim />
    </div>
  );
};
