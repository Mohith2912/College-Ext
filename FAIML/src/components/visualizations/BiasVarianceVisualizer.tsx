/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import {
  generateRegressionData,
  fitPolynomialModel,
  SimulationPoint
} from '../../lib/algorithms/biasVarianceEngine';

export const BiasVarianceVisualizer: React.FC = () => {
  const [degree, setDegree] = useState(1);
  const [noise, setNoise] = useState(0.25);
  const [regularization, setRegularization] = useState(0);

  // Generate deterministic points based on noise
  const points: SimulationPoint[] = useMemo(() => {
    return generateRegressionData(24, noise, 0.75);
  }, [noise]);

  // Fit model
  const result = useMemo(() => {
    return fitPolynomialModel(points, degree, regularization);
  }, [points, degree, regularization]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Unit 3 Supervised Learning Generalization
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Polynomial Bias–Variance & Overfitting Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate mathematical indicators of overfitting: Training Error ≪ Testing Error.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs">
          <button
            onClick={() => { setDegree(1); setRegularization(0); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              degree === 1 ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Underfitting (Deg 1)
          </button>
          <button
            onClick={() => { setDegree(3); setRegularization(0); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              degree === 3 && regularization === 0 ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Optimal Fit (Deg 3)
          </button>
          <button
            onClick={() => { setDegree(8); setRegularization(0); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              degree >= 7 && regularization === 0 ? 'bg-red-100 text-red-800' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overfitting (Deg 8)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Coordinate Plane (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
          <div className="relative w-full h-[360px] bg-slate-50 border border-slate-200 rounded-lg p-2 overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 520 320">
              {/* Axes */}
              <line x1="40" y1="160" x2="480" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
              <line x1="260" y1="20" x2="260" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
              <text x="475" y="155" fontSize="10" fill="#94a3b8">X</text>
              <text x="265" y="30" fontSize="10" fill="#94a3b8">Y</text>

              {/* Fitted Polynomial Curve */}
              {(() => {
                const pathD = result.fittedCurve.map((pt, idx) => {
                  // Map x: [-2.2, 2.2] to [40, 480], y: [-2, 2] to [300, 20]
                  const svgX = 260 + (pt.x / 2.2) * 210;
                  const svgY = 160 - (pt.y / 2.0) * 130;
                  return `${idx === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
                }).join(' ');

                return (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={
                      result.diagnosis.startsWith('Optimal')
                        ? '#059669'
                        : result.diagnosis.startsWith('Under')
                        ? '#d97706'
                        : '#dc2626'
                    }
                    strokeWidth="3"
                  />
                );
              })()}

              {/* Scatter Points */}
              {points.map((p, idx) => {
                const svgX = 260 + (p.x / 2.2) * 210;
                const svgY = 160 - (p.y / 2.0) * 130;

                return (
                  <g key={idx}>
                    {p.isTrain ? (
                      <circle
                        cx={svgX}
                        cy={svgY}
                        r="5"
                        fill="#3b82f6"
                        stroke="#1e3a8a"
                        strokeWidth="1.5"
                      />
                    ) : (
                      <rect
                        x={svgX - 5}
                        y={svgY - 5}
                        width="10"
                        height="10"
                        fill="#f97316"
                        stroke="#9a3412"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span>Training Samples (75%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-orange-500 inline-block" />
                <span>Unseen Testing Samples (25%)</span>
              </div>
            </div>

            <button
              onClick={() => { setDegree(1); setNoise(0.25); setRegularization(0); }}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Right: Controls & Generalization Metrics (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-50/30">
          <div>
            {/* Diagnosis Banner */}
            <div
              className={`p-3.5 rounded-lg border mb-4 flex items-start gap-2.5 ${
                result.diagnosis.startsWith('Optimal')
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : result.diagnosis.startsWith('Under')
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {result.diagnosis.startsWith('Optimal') ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="text-xs font-bold">{result.diagnosis}</div>
                <div className="text-xs mt-1 leading-relaxed opacity-90">{result.explanation}</div>
              </div>
            </div>

            {/* Error Meters: Train vs Test */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Training MSE Error</div>
                <div className="text-xl font-mono font-bold text-blue-600 mt-1 tabular-nums">
                  {result.trainError}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Empirical loss on training set</div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Testing MSE Error</div>
                <div className="text-xl font-mono font-bold text-orange-600 mt-1 tabular-nums">
                  {result.testError}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Generalization loss on unseen set</div>
              </div>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-4 bg-white p-4 border border-slate-200 rounded-lg">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Polynomial Degree (Complexity):</span>
                  <span className="font-mono text-indigo-600">Degree {degree}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={degree}
                  onChange={e => setDegree(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>1 (Linear)</span>
                  <span>3 (Cubic)</span>
                  <span>10 (High Variance)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>L2 Regularization Penalty (λ):</span>
                  <span className="font-mono text-indigo-600">{regularization}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={regularization}
                  onChange={e => setRegularization(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Ridge penalty constrains weight magnitudes to curb overfitting.
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Dataset Noise Level:</span>
                  <span className="font-mono text-indigo-600">{noise}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.6"
                  step="0.05"
                  value={noise}
                  onChange={e => setNoise(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
            Mathematical Indicator: <code className="font-mono font-semibold text-slate-700">Train Error ≪ Test Error → Overfitting</code>
          </div>
        </div>
      </div>
    </div>
  );
};
