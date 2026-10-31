import React, { useState } from 'react';
import { soundFx } from '../../lib/sound';

export interface ArrayPointer {
  label: string;
  index: number;
  color?: string; // e.g., 'sky', 'amber', 'purple', 'emerald', 'rose'
}

interface ArrayVisualizerProps {
  arr: number[];
  currentIndex?: number | null;
  highlightedIndices?: number[];
  foundIndex?: number | null;
  secondaryIndices?: number[];
  failedIndices?: [number, number] | null;
  pointers?: ArrayPointer[];
  activeRange?: [number, number] | null; // e.g. [low, high] or [left, right]
  pivotIndex?: number | null;
  mergeBuffer?: number[];
  onElementClick?: (index: number, value: number) => void;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  arr,
  currentIndex,
  highlightedIndices = [],
  foundIndex,
  secondaryIndices = [],
  failedIndices,
  pointers = [],
  activeRange,
  pivotIndex,
  mergeBuffer,
  onElementClick,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxVal = Math.max(...arr, 1);

  return (
    <div className="flex flex-col gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-2xs">
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
        <span className="font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <span>Array Memory Buffer ({arr.length} elements)</span>
        </span>
        {activeRange && (
          <span className="font-mono text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            Active Subarray Window: [{activeRange[0]} .. {activeRange[1]}]
          </span>
        )}
      </div>

      {/* Primary Array Elements Display */}
      <div className="flex flex-wrap items-end justify-center gap-2.5 sm:gap-3.5 min-h-[170px] pt-4 pb-10 relative">
        {arr.map((val, idx) => {
          const isCurrent = currentIndex === idx;
          const isFound = foundIndex === idx;
          const isPivot = pivotIndex === idx;
          const isHighlighted = highlightedIndices.includes(idx);
          const isSecondary = secondaryIndices.includes(idx);
          const isFailed = failedIndices && (failedIndices[0] === idx || failedIndices[1] === idx);
          const isInActiveRange = activeRange ? idx >= activeRange[0] && idx <= activeRange[1] : true;
          const isHovered = hoveredIdx === idx;

          // Determine cell styling
          let borderClass = 'border-slate-200 bg-white text-slate-900 shadow-2xs';
          if (isFound) {
            borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 shadow-sm';
          } else if (isFailed) {
            borderClass = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500 shadow-sm';
          } else if (isPivot) {
            borderClass = 'border-purple-500 bg-purple-50 text-purple-950 ring-2 ring-purple-400 shadow-sm';
          } else if (isCurrent) {
            borderClass = 'border-sky-500 bg-sky-50 text-sky-950 ring-2 ring-sky-400 shadow-md scale-105';
          } else if (isHighlighted) {
            borderClass = 'border-amber-500 bg-amber-50 text-amber-950 ring-1 ring-amber-400';
          } else if (isSecondary) {
            borderClass = 'border-indigo-400 bg-indigo-50 text-indigo-900';
          } else if (!isInActiveRange) {
            borderClass = 'border-slate-200 bg-slate-100/70 text-slate-400 opacity-35';
          }

          // Calculate height relative to values for bar representation
          const heightPercent = Math.max(Math.min((val / maxVal) * 90, 90), 30);

          // Find pointers pointing at this index
          const activePointers = pointers.filter((p) => p.index === idx);

          return (
            <div
              key={idx}
              className="flex flex-col items-center group relative min-w-[46px] cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => {
                soundFx.playComparison();
                if (onElementClick) onElementClick(idx, val);
              }}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md whitespace-nowrap z-30 pointer-events-none animate-in fade-in duration-100">
                  Index [{idx}] = {val}
                </div>
              )}

              {/* Element Box */}
              <div
                className={`w-12 sm:w-13 rounded-lg border flex flex-col items-center justify-between py-2.5 transition-all duration-200 ${borderClass} group-hover:border-sky-400`}
                style={{ minHeight: `${heightPercent + 55}px` }}
              >
                <span className="text-[10px] font-mono opacity-50 font-semibold">#{idx}</span>
                <span className="font-mono text-base sm:text-lg font-bold tabular-nums">
                  {val}
                </span>
                <div className="w-5 h-1 rounded-full bg-slate-200 group-hover:bg-sky-500 transition-colors" />
              </div>

              {/* Pointers Below Element */}
              <div className="absolute top-[102%] flex flex-col items-center gap-0.5 mt-1.5 z-10">
                {activePointers.map((p, pIdx) => {
                  const badgeColor =
                    p.color === 'emerald'
                      ? 'bg-emerald-600 text-white'
                      : p.color === 'amber'
                      ? 'bg-amber-600 text-white'
                      : p.color === 'purple'
                      ? 'bg-purple-600 text-white'
                      : p.color === 'rose'
                      ? 'bg-rose-600 text-white'
                      : 'bg-sky-600 text-white';

                  return (
                    <span
                      key={pIdx}
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap ${badgeColor}`}
                    >
                      ▲ {p.label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auxiliary Merge Buffer if Merge Sort is active */}
      {mergeBuffer && mergeBuffer.length > 0 && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span>Temporary Merge Buffer (O(n) auxiliary allocation):</span>
            <span className="font-mono text-slate-500">[{mergeBuffer.join(', ')}]</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {mergeBuffer.map((bVal, bIdx) => (
              <div
                key={bIdx}
                className="px-3 py-1.5 bg-white border border-sky-300 rounded-md text-xs font-mono font-bold text-sky-900 shadow-2xs"
              >
                {bVal}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
