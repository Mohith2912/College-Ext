import React from 'react';
import { FractionalKnapsackItem } from '../../engines/greedy';

interface KnapsackVisualizerProps {
  items: FractionalKnapsackItem[];
  capacity: number;
  remainingCapacity: number;
  totalValue: number;
  currentItemIndex: number | null;
}

export const KnapsackVisualizer: React.FC<KnapsackVisualizerProps> = ({
  items,
  capacity,
  remainingCapacity,
  totalValue,
  currentItemIndex,
}) => {
  const usedCapacity = capacity - remainingCapacity;
  const fillPercentage = Math.min((usedCapacity / capacity) * 100, 100);

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium uppercase tracking-wider text-slate-700">
          Continuous Knapsack Capacity Chamber (Max: {capacity} Units)
        </span>
        <div className="font-mono text-emerald-700 font-bold">
          Total Gained Profit: ${totalValue.toFixed(2)}
        </div>
      </div>

      {/* Progress Capacity Gauge */}
      <div className="p-3 bg-white border border-slate-200 rounded-md">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span>
            Used: {usedCapacity.toFixed(2)} / {capacity} ({fillPercentage.toFixed(1)}%)
          </span>
          <span>Remaining: {remainingCapacity.toFixed(2)} Units</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>

      {/* Items Breakdown Table */}
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-md p-2">
        <table className="w-full border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-center">Weight</th>
              <th className="p-2 text-center">Value</th>
              <th className="p-2 text-center">Ratio (V / W)</th>
              <th className="p-2 text-center">Fraction Taken</th>
              <th className="p-2 text-right">Profit Contributed</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const isEvaluating = currentItemIndex === idx;
              const hasTaken = it.fractionTaken > 0;
              const contributedVal = it.value * it.fractionTaken;

              return (
                <tr
                  key={it.id}
                  className={`border-b border-slate-100 transition-colors ${
                    isEvaluating
                      ? 'bg-sky-50 font-semibold'
                      : hasTaken
                      ? 'bg-emerald-50/50'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="p-2 font-bold text-slate-900">{it.id}</td>
                  <td className="p-2 text-center">{it.weight}</td>
                  <td className="p-2 text-center">${it.value}</td>
                  <td className="p-2 text-center font-bold text-sky-700">
                    {it.ratio.toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        it.fractionTaken === 1.0
                          ? 'bg-emerald-100 text-emerald-900 font-bold'
                          : it.fractionTaken > 0
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {(it.fractionTaken * 100).toFixed(0)}% ({it.fractionTaken.toFixed(2)})
                    </span>
                  </td>
                  <td className="p-2 text-right font-bold text-emerald-800">
                    +${contributedVal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
