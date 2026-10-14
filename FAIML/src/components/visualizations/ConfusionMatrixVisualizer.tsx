/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RotateCcw, Layers, Sliders, CheckCircle } from 'lucide-react';
import {
  calculateClassificationMetrics,
  simulateKFoldCrossValidation,
  ConfusionMatrixValues
} from '../../lib/algorithms/evaluationMetricsEngine';

export const ConfusionMatrixVisualizer: React.FC = () => {
  const [tab, setTab] = useState<'MATRIX' | 'KFOLD'>('MATRIX');

  // Confusion matrix values (Unit 5 Part A Q15 syllabus question preset)
  const [cm, setCm] = useState<ConfusionMatrixValues>({
    tp: 45,
    tn: 40,
    fp: 10,
    fn: 5
  });

  // K-Fold states
  const [kValue, setKValue] = useState(5);
  const [isStratified, setIsStratified] = useState(true);

  const metrics = calculateClassificationMetrics(cm);
  const kfoldResult = simulateKFoldCrossValidation(kValue, isStratified);

  const resetToExamQuestion = () => {
    setCm({ tp: 45, tn: 40, fp: 10, fn: 5 });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Unit 5 Applied Machine Learning & Evaluation
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Confusion Matrix & Cross Validation Lab
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit 5 Part A Q15 Benchmark: TP=45, TN=40, FP=10, FN=5 → Accuracy = 85.0%.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 text-xs">
          <button
            onClick={() => setTab('MATRIX')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              tab === 'MATRIX' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>2×2 Confusion Matrix</span>
          </button>
          <button
            onClick={() => setTab('KFOLD')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              tab === 'KFOLD' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>K-Fold CV Partitioner</span>
          </button>
        </div>
      </div>

      {tab === 'MATRIX' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Left: 2x2 Interactive Matrix (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Interactive 2×2 Contingency Table
                </span>
                <button
                  onClick={resetToExamQuestion}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Q15 (85%)</span>
                </button>
              </div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                {/* TP */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                    <span>True Positive (TP)</span>
                    <span className="text-[10px] text-emerald-600">Correct Positive</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={cm.tp}
                    onChange={e => setCm({ ...cm, tp: Math.max(0, Number(e.target.value)) })}
                    className="w-full text-2xl font-mono font-bold text-emerald-900 bg-white border border-emerald-300 rounded-lg p-2 text-center"
                  />
                  <div className="mt-2 text-[11px] text-emerald-700">Actual: Positive · Pred: Positive</div>
                </div>

                {/* FP */}
                <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-red-800 font-semibold mb-1">
                    <span>False Positive (FP)</span>
                    <span className="text-[10px] text-red-600">Type I Error</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={cm.fp}
                    onChange={e => setCm({ ...cm, fp: Math.max(0, Number(e.target.value)) })}
                    className="w-full text-2xl font-mono font-bold text-red-900 bg-white border border-red-300 rounded-lg p-2 text-center"
                  />
                  <div className="mt-2 text-[11px] text-red-700">Actual: Negative · Pred: Positive</div>
                </div>

                {/* FN */}
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
                    <span>False Negative (FN)</span>
                    <span className="text-[10px] text-amber-600">Type II Error</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={cm.fn}
                    onChange={e => setCm({ ...cm, fn: Math.max(0, Number(e.target.value)) })}
                    className="w-full text-2xl font-mono font-bold text-amber-900 bg-white border border-amber-300 rounded-lg p-2 text-center"
                  />
                  <div className="mt-2 text-[11px] text-amber-700">Actual: Positive · Pred: Negative</div>
                </div>

                {/* TN */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                    <span>True Negative (TN)</span>
                    <span className="text-[10px] text-emerald-600">Correct Negative</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={cm.tn}
                    onChange={e => setCm({ ...cm, tn: Math.max(0, Number(e.target.value)) })}
                    className="w-full text-2xl font-mono font-bold text-emerald-900 bg-white border border-emerald-300 rounded-lg p-2 text-center"
                  />
                  <div className="mt-2 text-[11px] text-emerald-700">Actual: Negative · Pred: Negative</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Total Evaluations: <strong className="font-mono text-slate-800">{metrics.total}</strong></span>
              <span>Total Misclassifications: <strong className="font-mono text-red-600">{cm.fp + cm.fn}</strong></span>
            </div>
          </div>

          {/* Right: Real-time Metric Cards (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-50/30">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Calculated Classification Metrics
              </div>

              {/* Primary Accuracy Metric */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Overall Accuracy</span>
                  <span className="text-[11px] font-mono text-slate-400">(TP + TN) / Total</span>
                </div>
                <div className="text-3xl font-mono font-bold text-indigo-600 my-1 tabular-nums">
                  {(metrics.accuracy * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-slate-500">
                  Formula: ({cm.tp} + {cm.tn}) / {metrics.total} = <strong>{metrics.accuracy}</strong>
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[11px] text-slate-500 font-medium">Precision (PPV)</div>
                  <div className="text-xl font-mono font-bold text-slate-900 mt-0.5 tabular-nums">
                    {(metrics.precision * 100).toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-400">TP / (TP + FP)</div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[11px] text-slate-500 font-medium">Recall (Sensitivity)</div>
                  <div className="text-xl font-mono font-bold text-slate-900 mt-0.5 tabular-nums">
                    {(metrics.recall * 100).toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-400">TP / (TP + FN)</div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[11px] text-slate-500 font-medium">Specificity (TNR)</div>
                  <div className="text-xl font-mono font-bold text-slate-900 mt-0.5 tabular-nums">
                    {(metrics.specificity * 100).toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-400">TN / (TN + FP)</div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[11px] text-slate-500 font-medium">F1-Score</div>
                  <div className="text-xl font-mono font-bold text-indigo-600 mt-0.5 tabular-nums">
                    {(metrics.f1Score * 100).toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-400">Harmonic Mean</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
              Exam Benchmark: <code className="font-mono text-slate-800">TP=45, TN=40, FP=10, FN=5 → Acc = 85.0%</code>
            </div>
          </div>
        </div>
      ) : (
        /* K-Fold Cross Validation Studio */
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Cross-Validation Simulation (Hold-Out vs K-Fold vs Stratified K-Fold)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate fold partitioning across K subsets to evaluate stability and generalization variance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600">K-Folds:</span>
                <select
                  value={kValue}
                  onChange={e => setKValue(Number(e.target.value))}
                  className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-medium"
                >
                  <option value={3}>3 Folds</option>
                  <option value={5}>5 Folds (Standard)</option>
                  <option value={10}>10 Folds (Rigorous)</option>
                </select>
              </div>

              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStratified}
                  onChange={e => setIsStratified(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Stratified (Preserve Class Ratio)</span>
              </label>
            </div>
          </div>

          {/* Folds Visualization */}
          <div className="space-y-3 mb-6">
            {kfoldResult.folds.map(fold => (
              <div
                key={fold.foldNumber}
                className="p-3 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Fold {fold.foldNumber}:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: kValue }).map((_, fIdx) => (
                      <span
                        key={fIdx}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          fIdx + 1 === fold.foldNumber
                            ? 'bg-orange-100 text-orange-800 font-bold border border-orange-300'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                        }`}
                      >
                        {fIdx + 1 === fold.foldNumber ? 'VAL (Test)' : 'TRAIN'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px] text-slate-600">
                  <span>Train Acc: <strong>{(fold.trainAccuracy * 100).toFixed(1)}%</strong></span>
                  <span>Val Acc: <strong className="text-indigo-600">{(fold.validationAccuracy * 100).toFixed(1)}%</strong></span>
                  <span>F1: <strong>{(fold.f1Score * 100).toFixed(1)}%</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary KPI Banner */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">Cross-Validation Mean Accuracy</div>
              <div className="text-2xl font-mono font-bold text-slate-900 mt-0.5">
                {(kfoldResult.meanValAccuracy * 100).toFixed(1)}%
                <span className="text-xs font-normal text-slate-500 ml-2">
                  ± {(kfoldResult.stdDev * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="text-right text-xs text-slate-600 max-w-xs leading-relaxed">
              {isStratified ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1 justify-end">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Stratification reduces variance across minority classes.
                </span>
              ) : (
                <span className="text-slate-500">
                  Standard random partitions may result in slightly higher fold variance.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
