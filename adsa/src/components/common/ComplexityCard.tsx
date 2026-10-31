import React from 'react';
import { ComplexitySpec } from '../../types/algorithm';
import { Activity } from 'lucide-react';

interface ComplexityCardProps {
  complexity: ComplexitySpec;
  syllabusRef: string;
}

export const ComplexityCard: React.FC<ComplexityCardProps> = ({
  complexity,
  syllabusRef,
}) => {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Complexity & Academic Bounds
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">{syllabusRef}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
          <div className="text-[11px] text-slate-500">Best Case Time</div>
          <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
            {complexity.timeBest}
          </div>
        </div>
        <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
          <div className="text-[11px] text-slate-500">Average Case Time</div>
          <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
            {complexity.timeAvg}
          </div>
        </div>
        <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
          <div className="text-[11px] text-slate-500">Worst Case Time</div>
          <div className="text-sm font-bold text-rose-700 font-mono mt-0.5">
            {complexity.timeWorst}
          </div>
        </div>
        <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
          <div className="text-[11px] text-slate-500">Auxiliary Space</div>
          <div className="text-sm font-bold text-sky-700 font-mono mt-0.5">
            {complexity.space}
          </div>
        </div>
      </div>

      {complexity.recurrence && (
        <div className="p-2.5 bg-sky-50/60 border border-sky-100 rounded text-xs text-sky-950 mb-3">
          <span className="font-semibold text-sky-900">Recurrence Relation: </span>
          <span className="font-mono text-sky-800">{complexity.recurrence}</span>
        </div>
      )}

      <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
        <span className="font-semibold text-slate-800">Mathematical Justification: </span>
        {complexity.justification}
      </div>
    </div>
  );
};
