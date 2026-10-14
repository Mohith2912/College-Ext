/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Grid, Sparkles, CheckCircle2, Sliders, Layers } from 'lucide-react';

export const GridSearchLab: React.FC = () => {
  const depths = [3, 5, 8, 12];
  const learningRates = [0.01, 0.05, 0.1, 0.2];

  // Pre-computed 4x4 Cross-Validation Validation Accuracies (%)
  const gridScores: number[][] = [
    // depth 3 (underfits slightly)
    [76.2, 79.5, 82.1, 80.4],
    // depth 5 (optimal sweetspot!)
    [81.4, 85.8, 88.4, 86.2],
    // depth 8 (beginning to overfit)
    [82.0, 84.2, 85.5, 81.3],
    // depth 12 (high variance overfitting)
    [78.5, 80.1, 81.2, 75.8]
  ];

  const [selectedCoord, setSelectedCoord] = useState<{ dIdx: number; lrIdx: number }>({
    dIdx: 1,
    lrIdx: 2
  }); // defaults to optimal: depth 5, lr 0.1 (88.4%)

  const selectedDepth = depths[selectedCoord.dIdx];
  const selectedLR = learningRates[selectedCoord.lrIdx];
  const selectedScore = gridScores[selectedCoord.dIdx][selectedCoord.lrIdx];

  const isOptimal = selectedCoord.dIdx === 1 && selectedCoord.lrIdx === 2;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-emerald-50/60 via-teal-50/40 to-blue-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
            <Grid className="w-4 h-4 text-teal-600" />
            <span>Unit 5 Hyperparameter Tuning & Cross-Validation</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Grid Search 2D Hyperparameter Optimization Matrix
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Unit 5 Part B Q6: Exhaustively evaluate combinations of Tree Max Depth vs Learning Rate using 5-Fold Cross Validation.
          </p>
        </div>

        <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Optimal Combination: </span>
            <span className="font-mono font-bold text-emerald-700 text-sm">Depth 5 · LR 0.1 (88.4%)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: 2D Heatmap Matrix (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span>Click any cell to inspect cross-validation folds:</span>
              <span className="font-mono text-slate-400">16 Combinations Evaluated</span>
            </div>

            {/* Heatmap Matrix Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold font-mono">
                    <th className="p-3 text-left">Max Depth \ LR</th>
                    {learningRates.map(lr => (
                      <th key={lr} className="p-3">
                        η = {lr}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {depths.map((d, dIdx) => (
                    <tr key={d}>
                      <td className="p-3 bg-slate-50 font-bold text-slate-800 text-left font-mono">
                        Depth {d}
                      </td>
                      {learningRates.map((lr, lrIdx) => {
                        const score = gridScores[dIdx][lrIdx];
                        const isSelected = selectedCoord.dIdx === dIdx && selectedCoord.lrIdx === lrIdx;
                        const isGlobalBest = dIdx === 1 && lrIdx === 2;

                        // Heatmap color scale (75% to 88.4%)
                        let bgClass = 'bg-slate-50 text-slate-700';
                        if (score >= 88) bgClass = 'bg-emerald-500 text-white font-bold';
                        else if (score >= 85) bgClass = 'bg-emerald-100 text-emerald-900 font-semibold';
                        else if (score >= 80) bgClass = 'bg-teal-50 text-teal-900';
                        else bgClass = 'bg-amber-50 text-amber-900';

                        return (
                          <td
                            key={lr}
                            onClick={() => setSelectedCoord({ dIdx, lrIdx })}
                            className={`p-3 transition-all cursor-pointer relative ${bgClass} ${
                              isSelected ? 'ring-3 ring-indigo-600 ring-inset' : 'hover:opacity-80'
                            }`}
                          >
                            <span className="text-xs">{score}%</span>
                            {isGlobalBest && (
                              <span className="absolute top-1 right-1 text-[8px] bg-yellow-300 text-slate-900 px-1 rounded-full font-sans font-bold">
                                BEST
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300" /> Lower
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Optimal Score
              </span>
            </div>
            <span className="font-semibold text-emerald-700">5-Fold Cross Validation Benchmarked</span>
          </div>
        </div>

        {/* Right: Selected Configuration Diagnostics (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Fold-by-Fold Performance Breakdown
            </h3>

            {/* Selected Card */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold">Active Hyperparameters:</div>
                  <div className="text-base font-bold text-slate-900 font-mono">
                    Depth: {selectedDepth} · LR: {selectedLR}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 font-semibold">Mean CV Score:</div>
                  <div className="text-xl font-mono font-bold text-emerald-600">
                    {selectedScore}%
                  </div>
                </div>
              </div>

              {/* 5-Fold Scores */}
              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs font-mono">
                {[
                  { fold: 1, val: (selectedScore + 0.6).toFixed(1) },
                  { fold: 2, val: (selectedScore - 0.4).toFixed(1) },
                  { fold: 3, val: (selectedScore + 0.2).toFixed(1) },
                  { fold: 4, val: (selectedScore - 0.5).toFixed(1) },
                  { fold: 5, val: (selectedScore + 0.1).toFixed(1) }
                ].map(f => (
                  <div key={f.fold} className="flex justify-between text-slate-600">
                    <span>Fold {f.fold} Validation Score:</span>
                    <strong className="text-slate-900">{f.val}%</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Note */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              isOptimal
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : selectedDepth >= 8
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}>
              {isOptimal ? (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Globally Optimal Hyperparameters Found!</strong>
                    <p className="mt-0.5">
                      Max Depth 5 provides sufficient expressive capacity without overfitting training noise. Learning rate 0.1 yields rapid, stable gradient descent convergence.
                    </p>
                  </div>
                </div>
              ) : selectedDepth >= 8 ? (
                <div>
                  <strong>Overfitting Warning:</strong> Max Depth {selectedDepth} allows trees to grow too deep, memorizing sample noise and reducing hold-out validation scores.
                </div>
              ) : (
                <div>
                  <strong>Underfitting Warning:</strong> Max Depth 3 is overly constrained, preventing the model from capturing non-linear interactions.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            Grid Search tests the Cartesian product of hyperparameter ranges automatically.
          </div>
        </div>
      </div>
    </div>
  );
};
