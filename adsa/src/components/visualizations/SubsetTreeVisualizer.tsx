import React, { useState } from 'react';
import { Target, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { soundFx } from '../../lib/sound';

interface SubsetTreeVisualizerProps {
  arr: number[];
  target: number;
  currentSum: number;
  currentSubset: number[];
  foundSubsets: number[][];
  branchType: 'include' | 'exclude' | 'prune' | 'match';
}

export const SubsetTreeVisualizer: React.FC<SubsetTreeVisualizerProps> = ({
  arr,
  target,
  currentSum: autoSum,
  currentSubset: autoSubset,
  foundSubsets,
  branchType,
}) => {
  // Manual Interactive Mode
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [manualSelectedIndices, setManualSelectedIndices] = useState<Set<number>>(new Set());

  const toggleManualIndex = (idx: number) => {
    const next = new Set(manualSelectedIndices);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setManualSelectedIndices(next);
    soundFx.playStep();

    // Check if new sum matches target
    const newSum = Array.from(next).reduce((sum, i) => sum + arr[i], 0);
    if (newSum === target) {
      soundFx.playSuccess();
    } else if (newSum > target) {
      soundFx.playConflict();
    }
  };

  const manualSum = Array.from(manualSelectedIndices).reduce((sum, idx) => sum + arr[idx], 0);
  const activeSum = manualMode ? manualSum : autoSum;
  const sumPercent = Math.min((activeSum / target) * 100, 100);
  const isOver = activeSum > target;

  return (
    <div className="flex flex-col gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 text-xs text-slate-500">
        <span className="font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-sky-600" />
          <span>Sum of Subsets State-Space Tree Exploration</span>
        </span>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md text-xs">
            <button
              onClick={() => setManualMode(false)}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                !manualMode
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Algorithm Tracing
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                manualMode
                  ? 'bg-white text-sky-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Interactive Set Builder</span>
            </button>
          </div>

          {manualMode && (
            <button
              onClick={() => {
                setManualSelectedIndices(new Set());
                soundFx.playStep();
              }}
              title="Reset Selection"
              className="p-1 rounded bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Target Progress Meter */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span>
            Current Subset Sum: <strong className="text-slate-900">{activeSum}</strong> / Target: <strong className="text-sky-700">{target}</strong>
          </span>
          <span
            className={`font-semibold ${
              isOver
                ? 'text-rose-600'
                : activeSum === target
                ? 'text-emerald-600'
                : 'text-slate-500'
            }`}
          >
            {isOver ? 'PRUNED: Exceeds Target' : activeSum === target ? 'MATCH: Target Met!' : 'Branch Searching...'}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden border border-slate-300/80">
          <div
            className={`h-full transition-all duration-200 ${
              isOver ? 'bg-rose-500' : activeSum === target ? 'bg-emerald-500' : 'bg-sky-500'
            }`}
            style={{ width: `${sumPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Number Elements Cards */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span>
            {manualMode
              ? 'Click elements below to toggle inclusion in your manual subset:'
              : 'Active Exploration Trail (subset.add / subset.remove):'}
          </span>
          {!manualMode && (
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                branchType === 'match'
                  ? 'bg-emerald-100 text-emerald-900'
                  : branchType === 'prune'
                  ? 'bg-rose-100 text-rose-900'
                  : branchType === 'include'
                  ? 'bg-sky-100 text-sky-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {branchType}
            </span>
          )}
        </div>

        {manualMode ? (
          <div className="flex flex-wrap gap-2.5">
            {arr.map((val, idx) => {
              const isSelected = manualSelectedIndices.has(idx);
              return (
                <button
                  key={idx}
                  onClick={() => toggleManualIndex(idx)}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-700 shadow-xs scale-105'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[10px] ml-1.5 opacity-70">
                    {isSelected ? '✓ In' : '+ Add'}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {autoSubset.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Empty subset [] (Root of state space tree)</span>
            ) : (
              autoSubset.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-sky-50 border border-sky-300 rounded text-xs font-mono font-bold text-sky-950 flex items-center gap-1 shadow-2xs"
                >
                  <span>+{item}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Solutions Gallery */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Valid Subsets Found Summing Exactly to {target} ({foundSubsets.length}):</span>
        </div>

        {foundSubsets.length === 0 ? (
          <div className="text-xs text-slate-400 italic">No matching subsets detected yet.</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {foundSubsets.map((sub, sIdx) => (
              <div
                key={sIdx}
                className="px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded text-xs font-mono text-emerald-950 font-bold shadow-2xs"
              >
                [{sub.join(', ')}] = {target}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
