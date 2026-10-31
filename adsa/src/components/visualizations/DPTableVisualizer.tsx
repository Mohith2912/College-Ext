import React, { useState } from 'react';
import { soundFx } from '../../lib/sound';
import { Info } from 'lucide-react';

interface DPTableVisualizerProps {
  title: string;
  matrix: number[][];
  rowLabels: string[];
  colLabels: string[];
  activeCell?: [number, number] | null; // [row, col]
  dependencyCells?: [number, number][]; // cells referenced by recurrence
  cellAction?: 'take' | 'dont' | 'exceed';
  pivotIndex?: number | null; // For Floyd-Warshall pivot k
  weights?: number[];
  values?: number[];
}

export const DPTableVisualizer: React.FC<DPTableVisualizerProps> = ({
  title,
  matrix,
  rowLabels,
  colLabels,
  activeCell,
  dependencyCells = [],
  cellAction,
  pivotIndex,
  weights,
  values,
}) => {
  const [inspectedCell, setInspectedCell] = useState<[number, number] | null>(null);

  const selectedCell = inspectedCell || activeCell;

  // Compute breakdown if inspecting 0/1 Knapsack cell
  let inspectionBreakdown = null;
  if (selectedCell && weights && values && selectedCell[0] > 0 && selectedCell[1] >= 0) {
    const i = selectedCell[0];
    const w = selectedCell[1];
    const wt = weights[i - 1];
    const val = values[i - 1];

    if (wt <= w) {
      const takeVal = val + matrix[i - 1][w - wt];
      const dontVal = matrix[i - 1][w];
      const maxVal = Math.max(takeVal, dontVal);
      inspectionBreakdown = {
        i,
        w,
        wt,
        val,
        takeVal,
        dontVal,
        maxVal,
        action: takeVal > dontVal ? 'take' : 'dont',
        takeCell: [i - 1, w - wt],
        dontCell: [i - 1, w],
      };
    } else {
      inspectionBreakdown = {
        i,
        w,
        wt,
        val,
        dontVal: matrix[i - 1][w],
        maxVal: matrix[i - 1][w],
        action: 'exceed',
        dontCell: [i - 1, w],
      };
    }
  }

  return (
    <div className="flex flex-col gap-3.5 p-5 bg-white border border-slate-200 rounded-xl shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 text-xs text-slate-500">
        <span className="font-semibold uppercase tracking-wider text-slate-700">
          {title} ({matrix.length} × {matrix[0]?.length || 0})
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Click any cell to inspect mathematical derivation
          </span>
          {selectedCell && (
            <span className="font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Inspecting dp[{selectedCell[0]}][{selectedCell[1]}]
            </span>
          )}
        </div>
      </div>

      {/* Interactive Table Grid */}
      <div className="overflow-x-auto bg-slate-50/70 border border-slate-200 rounded-lg p-2 max-h-[380px]">
        <table className="w-full border-collapse text-xs font-mono select-none">
          <thead>
            <tr>
              <th className="p-2 border border-slate-200 bg-slate-100 text-slate-500 text-left font-sans font-semibold">
                State / Subproblem
              </th>
              {colLabels.map((col, cIdx) => {
                const isPivotCol = pivotIndex === cIdx;
                const isSelectedCol = selectedCell && selectedCell[1] === cIdx;

                return (
                  <th
                    key={cIdx}
                    className={`p-2 border border-slate-200 font-semibold text-center whitespace-nowrap ${
                      isSelectedCol
                        ? 'bg-sky-100 text-sky-950 ring-1 ring-sky-400'
                        : isPivotCol
                        ? 'bg-amber-100 text-amber-950'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rIdx) => {
              const isPivotRow = pivotIndex === rIdx;
              const isSelectedRow = selectedCell && selectedCell[0] === rIdx;

              return (
                <tr key={rIdx}>
                  <td
                    className={`p-2 border border-slate-200 font-semibold whitespace-nowrap ${
                      isSelectedRow
                        ? 'bg-sky-100 text-sky-950 ring-1 ring-sky-400'
                        : isPivotRow
                        ? 'bg-amber-100 text-amber-950'
                        : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    {rowLabels[rIdx]}
                  </td>
                  {row.map((val, cIdx) => {
                    const isSelected = selectedCell && selectedCell[0] === rIdx && selectedCell[1] === cIdx;
                    const isTakeCell =
                      inspectionBreakdown?.takeCell &&
                      inspectionBreakdown.takeCell[0] === rIdx &&
                      inspectionBreakdown.takeCell[1] === cIdx;
                    const isDontCell =
                      inspectionBreakdown?.dontCell &&
                      inspectionBreakdown.dontCell[0] === rIdx &&
                      inspectionBreakdown.dontCell[1] === cIdx;
                    const isDependency = dependencyCells.some(
                      (dep) => dep[0] === rIdx && dep[1] === cIdx
                    );
                    const isPivotIntersect = pivotIndex === rIdx && pivotIndex === cIdx;

                    let bgClass = 'bg-white text-slate-800 hover:bg-sky-50/60 cursor-pointer';
                    if (isSelected) {
                      bgClass = 'bg-sky-200 text-sky-950 font-bold ring-2 ring-sky-500 shadow-md';
                    } else if (isTakeCell) {
                      bgClass = 'bg-emerald-200 text-emerald-950 font-bold ring-2 ring-emerald-500 shadow-xs';
                    } else if (isDontCell) {
                      bgClass = 'bg-amber-200 text-amber-950 font-bold ring-2 ring-amber-500 shadow-xs';
                    } else if (isDependency) {
                      bgClass = 'bg-emerald-100 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                    } else if (isPivotIntersect) {
                      bgClass = 'bg-amber-200 text-amber-950 font-bold ring-2 ring-amber-500';
                    } else if (pivotIndex === rIdx || pivotIndex === cIdx) {
                      bgClass = 'bg-amber-50/70 text-amber-950';
                    }

                    const displayVal = val >= 990 ? 'INF' : val;

                    return (
                      <td
                        key={cIdx}
                        onClick={() => {
                          setInspectedCell([rIdx, cIdx]);
                          soundFx.playComparison();
                        }}
                        className={`p-2 border border-slate-200 text-center tabular-nums transition-colors ${bgClass}`}
                      >
                        {displayVal}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live Math Derivation Breakdown Box */}
      {inspectionBreakdown && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-slate-700 font-bold font-sans">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-600" />
              <span>
                Cell Derivation for dp[{inspectionBreakdown.i}][{inspectionBreakdown.w}]:
              </span>
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-sans font-semibold uppercase ${
                inspectionBreakdown.action === 'take'
                  ? 'bg-emerald-100 text-emerald-900'
                  : inspectionBreakdown.action === 'dont'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-rose-100 text-rose-900'
              }`}
            >
              Action: {inspectionBreakdown.action}
            </span>
          </div>

          {inspectionBreakdown.action !== 'exceed' && inspectionBreakdown.takeVal !== undefined ? (
            <div className="space-y-1 text-slate-600">
              <div>
                <strong className="text-emerald-700">take</strong> = value[{inspectionBreakdown.i - 1}] ({inspectionBreakdown.val}) + dp[{inspectionBreakdown.i - 1}][{inspectionBreakdown.w} - {inspectionBreakdown.wt}] ({inspectionBreakdown.takeVal - inspectionBreakdown.val}) = <span className="font-bold text-emerald-800">{inspectionBreakdown.takeVal}</span>
              </div>
              <div>
                <strong className="text-amber-700">dont</strong> = dp[{inspectionBreakdown.i - 1}][{inspectionBreakdown.w}] = <span className="font-bold text-amber-800">{inspectionBreakdown.dontVal}</span>
              </div>
              <div className="text-slate-900 font-bold pt-1 border-t border-slate-200">
                dp[{inspectionBreakdown.i}][{inspectionBreakdown.w}] = max({inspectionBreakdown.takeVal}, {inspectionBreakdown.dontVal}) = {inspectionBreakdown.maxVal}
              </div>
            </div>
          ) : (
            <div className="text-rose-700">
              Item weight ({inspectionBreakdown.wt}) &gt; current capacity ({inspectionBreakdown.w}). Item excluded: dp[{inspectionBreakdown.i}][{inspectionBreakdown.w}] = dp[{inspectionBreakdown.i - 1}][{inspectionBreakdown.w}] = {inspectionBreakdown.dontVal}.
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-sky-200 border border-sky-400" />
          <span>Active / Inspected Cell</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-200 border border-emerald-500" />
          <span>Take Predecessor (Capacity Shift)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-200 border border-amber-500" />
          <span>Dont Predecessor (Inherited Value)</span>
        </div>
      </div>
    </div>
  );
};
