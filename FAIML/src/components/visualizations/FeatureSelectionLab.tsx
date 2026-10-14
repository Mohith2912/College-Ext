/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sliders, CheckCircle, Trash2, ArrowUpRight, BarChart2, Shield } from 'lucide-react';

interface FeatureItem {
  id: string;
  name: string;
  type: 'Strong' | 'Noise';
  trueImportance: number; // 0 to 100
  selected: boolean;
}

export const FeatureSelectionLab: React.FC = () => {
  const [method, setMethod] = useState<'FILTER' | 'RFE' | 'LASSO'>('RFE');
  const [lassoLambda, setLassoLambda] = useState(0.2); // L1 penalty
  const [filterThreshold, setFilterThreshold] = useState(30);

  const [features, setFeatures] = useState<FeatureItem[]>([
    { id: 'f1', name: 'Credit Score', type: 'Strong', trueImportance: 92, selected: true },
    { id: 'f2', name: 'Annual Income', type: 'Strong', trueImportance: 85, selected: true },
    { id: 'f3', name: 'Debt-to-Income (DTI)', type: 'Strong', trueImportance: 88, selected: true },
    { id: 'f4', name: 'Employment Tenure', type: 'Strong', trueImportance: 65, selected: true },
    { id: 'f5', name: 'Loan Amount Requested', type: 'Strong', trueImportance: 60, selected: true },
    { id: 'f6', name: 'Favorite Color', type: 'Noise', trueImportance: 4, selected: true },
    { id: 'f7', name: 'Astrological Sign', type: 'Noise', trueImportance: 2, selected: true },
    { id: 'f8', name: 'Account ID Hash', type: 'Noise', trueImportance: 1, selected: true }
  ]);

  const toggleFeature = (id: string) => {
    setFeatures(prev =>
      prev.map(f => (f.id === id ? { ...f, selected: !f.selected } : f))
    );
  };

  const runAutomaticRFE = () => {
    // RFE eliminates noise features iteratively
    setFeatures(prev =>
      prev.map(f => ({
        ...f,
        selected: f.type === 'Strong'
      }))
    );
  };

  const activeFeatures = features.filter(f => {
    if (method === 'FILTER') {
      return f.trueImportance >= filterThreshold;
    } else if (method === 'LASSO') {
      // LASSO shrinks features below threshold to 0
      return f.trueImportance > lassoLambda * 100;
    }
    return f.selected;
  });

  const noiseCount = activeFeatures.filter(f => f.type === 'Noise').length;
  const strongCount = activeFeatures.filter(f => f.type === 'Strong').length;

  // Model performance simulation
  // Strong features increase accuracy; noise features increase overfitting penalty
  const simulatedTestAccuracy = Math.max(
    50,
    Math.min(92, Math.round(55 + strongCount * 7.5 - noiseCount * 4.5))
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-orange-50/60 via-amber-50/40 to-yellow-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4 text-orange-600" />
            <span>Unit 5 Dimensionality & Model Optimization</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Automatic Feature Selection: Filter vs Wrapper (RFE) vs Embedded (LASSO)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Unit 5 Part B Q3: Observe how pruning noise features improves test accuracy and eliminates model overfitting.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-xs text-xs">
          <button
            onClick={() => setMethod('FILTER')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              method === 'FILTER' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Filter (Correlation)
          </button>
          <button
            onClick={() => setMethod('RFE')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              method === 'RFE' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wrapper (RFE)
          </button>
          <button
            onClick={() => setMethod('LASSO')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              method === 'LASSO' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Embedded (LASSO L1)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Features Ranking & Selection Matrix (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Candidate Input Attributes:</span>
              <span className="font-mono text-slate-700 font-semibold">
                {activeFeatures.length}/8 Features Active
              </span>
            </div>

            {/* Feature Cards List */}
            {features.map(f => {
              const isActive = activeFeatures.some(af => af.id === f.id);

              return (
                <div
                  key={f.id}
                  onClick={() => method === 'RFE' && toggleFeature(f.id)}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    method === 'RFE' ? 'cursor-pointer hover:shadow-xs' : ''
                  } ${
                    isActive
                      ? f.type === 'Strong'
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-red-50/70 border-red-300'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        f.type === 'Strong' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{f.name}</div>
                      <div className="text-[10px] text-slate-500">
                        Signal: {f.type === 'Strong' ? 'True Predictor' : 'Spurious Noise'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Importance Bar */}
                    <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          f.type === 'Strong' ? 'bg-emerald-600' : 'bg-red-500'
                        }`}
                        style={{ width: `${f.trueImportance}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-700 w-8 text-right">
                      {f.trueImportance}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {method === 'RFE' && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Click individual cards or run auto-pruning:</span>
              <button
                onClick={runAutomaticRFE}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Execute RFE Auto-Pruning
              </button>
            </div>
          )}
        </div>

        {/* Right: Method Controls & Generalization Gauge (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Selection Tuning & Impact
            </h3>

            {/* Controls depending on Method */}
            {method === 'FILTER' && (
              <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-2 shadow-xs">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Correlation Cutoff Threshold:</span>
                  <span className="font-mono text-orange-600">{filterThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={filterThreshold}
                  onChange={e => setFilterThreshold(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  Filters evaluate statistical correlation with the target label independently, dropping features scoring below threshold.
                </p>
              </div>
            )}

            {method === 'LASSO' && (
              <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-2 shadow-xs">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>LASSO L1 Regularization Penalty (λ):</span>
                  <span className="font-mono text-orange-600">{lassoLambda}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={lassoLambda}
                  onChange={e => setLassoLambda(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  The L1 penalty drives unimportant weights to <strong>identically zero</strong>, intrinsically selecting the sparse optimal subset.
                </p>
              </div>
            )}

            {/* Model Test Accuracy Gauge */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                <span>Model Generalization Accuracy</span>
                <span className="font-mono text-slate-400">Test Split</span>
              </div>
              <div className="text-3xl font-mono font-bold text-orange-600 my-1 tabular-nums">
                {simulatedTestAccuracy}%
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${simulatedTestAccuracy}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Informative Features Retained:</span>
                  <strong className="text-emerald-700">{strongCount} / 5</strong>
                </div>
                <div className="flex justify-between">
                  <span>Harmful Noise Features Retained:</span>
                  <strong className={noiseCount > 0 ? 'text-red-600 font-bold' : 'text-emerald-600'}>
                    {noiseCount} / 3 {noiseCount > 0 ? '(Causes Overfitting)' : '(Pruned!)'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            Outcome: Eliminating noise attributes shortens training latency and increases test accuracy.
          </div>
        </div>
      </div>
    </div>
  );
};
