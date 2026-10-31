import React from 'react';
import { Layers } from 'lucide-react';

interface VariableInspectorProps {
  variables: Record<string, string | number | boolean | null>;
  metrics: {
    comparisons?: number;
    swaps?: number;
    operations?: number;
    recursionDepth?: number;
    backtracks?: number;
  };
}

export const VariableInspector: React.FC<VariableInspectorProps> = ({
  variables,
  metrics,
}) => {
  const entries = Object.entries(variables);

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-lg p-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          <span>Execution State & Metrics</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Live Registers</span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {metrics.operations !== undefined && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Operations</div>
            <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
              {metrics.operations}
            </div>
          </div>
        )}
        {metrics.comparisons !== undefined && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Comparisons</div>
            <div className="text-base font-bold text-sky-700 font-mono tabular-nums">
              {metrics.comparisons}
            </div>
          </div>
        )}
        {metrics.swaps !== undefined && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Swaps / Copies</div>
            <div className="text-base font-bold text-amber-700 font-mono tabular-nums">
              {metrics.swaps}
            </div>
          </div>
        )}
        {metrics.recursionDepth !== undefined && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Call Stack Depth</div>
            <div className="text-base font-bold text-purple-700 font-mono tabular-nums">
              {metrics.recursionDepth}
            </div>
          </div>
        )}
        {metrics.backtracks !== undefined && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Backtracks</div>
            <div className="text-base font-bold text-rose-700 font-mono tabular-nums">
              {metrics.backtracks}
            </div>
          </div>
        )}
      </div>

      {/* Live Variable Map */}
      <div className="text-xs font-medium text-slate-500 mb-1.5">Runtime Variables:</div>
      {entries.length === 0 ? (
        <div className="text-xs text-slate-400 italic">No variables tracked at this step.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {entries.map(([key, val]) => (
            <div
              key={key}
              className="flex items-center justify-between px-2.5 py-1.5 bg-slate-50 rounded border border-slate-200/80 text-xs"
            >
              <span className="font-mono text-slate-600 font-medium truncate mr-2">{key}</span>
              <span className="font-mono text-slate-900 font-semibold truncate tabular-nums">
                {val === null ? 'null' : String(val)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
