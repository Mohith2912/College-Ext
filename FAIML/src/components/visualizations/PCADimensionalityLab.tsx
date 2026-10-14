/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, RotateCw, BarChart2, Layers, Sliders } from 'lucide-react';

export const PCADimensionalityLab: React.FC = () => {
  const [scalingMethod, setScalingMethod] = useState<'RAW' | 'STANDARDIZED' | 'NORMALIZED'>('STANDARDIZED');
  const [pcAngle, setPcAngle] = useState(38); // degrees of principal axis

  // Correlated 2D dataset representing e.g. Customer Purchase Frequency vs Total Spending
  const rawPoints = [
    { x: 12, y: 1500 },
    { x: 18, y: 2200 },
    { x: 25, y: 3100 },
    { x: 30, y: 4000 },
    { x: 35, y: 4200 },
    { x: 42, y: 5600 },
    { x: 48, y: 6100 },
    { x: 55, y: 7200 },
    { x: 62, y: 7900 },
    { x: 70, y: 9100 }
  ];

  // Scale points according to chosen method
  const scaledPoints = rawPoints.map(p => {
    if (scalingMethod === 'RAW') {
      // Unscaled: Y (thousands) dominates X (tens)
      return { x: p.x, y: p.y / 100 };
    } else if (scalingMethod === 'NORMALIZED') {
      // Min-Max into [10, 90]
      const nx = 10 + ((p.x - 12) / (70 - 12)) * 80;
      const ny = 10 + ((p.y - 1500) / (9100 - 1500)) * 80;
      return { x: nx, y: ny };
    } else {
      // Standardized Z-Score mapped to canvas coordinates [20, 80]
      const meanX = 39.7;
      const stdX = 18.5;
      const meanY = 5090;
      const stdY = 2450;
      const zx = 50 + ((p.x - meanX) / stdX) * 22;
      const zy = 50 + ((p.y - meanY) / stdY) * 22;
      return { x: zx, y: zy };
    }
  });

  // Calculate projected variance onto candidate PC1 angle
  const rad = (pcAngle * Math.PI) / 180;
  const u1 = [Math.cos(rad), Math.sin(rad)];

  // Compute variance of projected 1D points
  let sumProjSq = 0;
  scaledPoints.forEach(p => {
    const centeredX = p.x - 50;
    const centeredY = p.y - 50;
    const proj = centeredX * u1[0] + centeredY * u1[1];
    sumProjSq += proj * proj;
  });
  const explainedVariancePct = Math.min(96, Math.max(15, Math.round((sumProjSq / 2200) * 100)));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-teal-50/60 via-emerald-50/40 to-cyan-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Unit 4 Dimensionality Reduction & PCA</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Principal Component Analysis (PCA) & Feature Scaling Studio
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Unit 4 Part B Q2 & Q7: Rotate the eigenvector projection axis to maximize explained variance and compare Normalization vs Standardization.
          </p>
        </div>

        {/* Scaling Mode Selector */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-xs text-xs">
          <span className="text-slate-400 font-semibold px-2">Scaling:</span>
          {(['STANDARDIZED', 'NORMALIZED', 'RAW'] as const).map(m => (
            <button
              key={m}
              onClick={() => setScalingMethod(m)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                scalingMethod === m ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {m === 'STANDARDIZED' ? 'Z-Score (Standard)' : m === 'NORMALIZED' ? 'Min-Max [0,1]' : 'Unscaled (Raw)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: 2D Spatial Cloud & Eigenvector Axis (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="relative w-full h-[360px] bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Center Coordinate Crosshair */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="2" />

              {/* Orthogonal PC2 Axis (dashed lavender) */}
              {(() => {
                const orthAngle = pcAngle + 90;
                const oRad = (orthAngle * Math.PI) / 180;
                const ox1 = 50 - Math.cos(oRad) * 45;
                const oy1 = 50 - Math.sin(oRad) * 45;
                const ox2 = 50 + Math.cos(oRad) * 45;
                const oy2 = 50 + Math.sin(oRad) * 45;
                return (
                  <line
                    x1={ox1}
                    y1={oy1}
                    x2={ox2}
                    y2={oy2}
                    stroke="#a855f7"
                    strokeWidth="1.2"
                    strokeDasharray="2"
                  />
                );
              })()}

              {/* Primary PC1 Axis (Solid Emerald) */}
              {(() => {
                const x1 = 50 - Math.cos(rad) * 45;
                const y1 = 50 - Math.sin(rad) * 45;
                const x2 = 50 + Math.cos(rad) * 45;
                const y2 = 50 + Math.sin(rad) * 45;
                return (
                  <g>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#0d9488"
                      strokeWidth="2.2"
                    />
                    <text x={x2} y={y2 - 2} fontSize="4" fontWeight="800" fill="#0f766e font-mono">
                      PC1 (Principal Axis)
                    </text>
                  </g>
                );
              })()}

              {/* Projections of points onto PC1 axis */}
              {scaledPoints.map((p, i) => {
                const cx = p.x - 50;
                const cy = p.y - 50;
                const dot = cx * u1[0] + cy * u1[1];
                const projX = 50 + dot * u1[0];
                const projY = 50 + dot * u1[1];

                return (
                  <g key={i}>
                    {/* Projection drop line */}
                    <line
                      x1={p.x}
                      y1={p.y}
                      x2={projX}
                      y2={projY}
                      stroke="#94a3b8"
                      strokeWidth="0.6"
                      strokeDasharray="1.5"
                    />
                    {/* Projected point on 1D manifold */}
                    <circle cx={projX} cy={projY} r="1" fill="#0f766e" />
                    {/* Original 2D point */}
                    <circle cx={p.x} cy={p.y} r="1.8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="0.5" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Original 2D Data Points
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 ml-2" /> 1D Projection Coordinates
            </span>
            <span className="font-mono text-teal-700 font-semibold">
              Eigenvector Angle: {pcAngle}°
            </span>
          </div>
        </div>

        {/* Right: Eigenvector Rotation Slider & Variance Chart (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Principal Component Controls
            </h3>

            {/* Rotation Slider */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Rotate Candidate PC1 Eigenvector:</span>
                <span className="font-mono text-teal-700">{pcAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={pcAngle}
                onChange={e => setPcAngle(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0° (Horizontal)</span>
                <span className="font-bold text-teal-600">~38° (Optimal Covariance Axis)</span>
                <span>90° (Vertical)</span>
              </div>
            </div>

            {/* Scree Plot / Variance Explained Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Retained Variance (Energy Preserved):</span>
                <span className="font-mono text-sm text-teal-700 font-bold">{explainedVariancePct}%</span>
              </div>

              {/* Stacked Bar Chart */}
              <div className="w-full bg-slate-100 rounded-lg h-4 overflow-hidden flex shadow-inner">
                <div
                  className="bg-teal-600 h-full transition-all flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${explainedVariancePct}%` }}
                >
                  PC1 ({explainedVariancePct}%)
                </div>
                <div
                  className="bg-purple-400 h-full transition-all flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${100 - explainedVariancePct}%` }}
                >
                  PC2 ({100 - explainedVariancePct}%)
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 leading-relaxed">
                {scalingMethod === 'RAW' ? (
                  <span className="text-amber-800">
                    ⚠ <strong>Unscaled Warning:</strong> In raw data, Annual Spending (thousands) dominates variance over Frequency (tens). Feature scaling is essential prior to PCA!
                  </span>
                ) : (
                  <span className="text-emerald-800">
                    ✓ <strong>Scaled Properly:</strong> Standardization ensures both features have zero mean and unit variance, allowing PCA to find true multivariate correlation axes.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
            Σ = (1/n) X^T X · Eigenvalues det(Σ - λI) = 0
          </div>
        </div>
      </div>
    </div>
  );
};
