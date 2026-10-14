/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GitMerge, Scissors, Sliders, CheckCircle2 } from 'lucide-react';

export const HierarchicalClusteringLab: React.FC = () => {
  const [cutThreshold, setCutThreshold] = useState(22); // Height threshold slider

  // 6 entities (e.g. Student Academic Profiles: S1 to S6)
  const items = [
    { id: 'S1', name: 'Student 1', marks: 88, attendance: 95 },
    { id: 'S2', name: 'Student 2', marks: 92, attendance: 90 },
    { id: 'S3', name: 'Student 3', marks: 74, attendance: 80 },
    { id: 'S4', name: 'Student 4', marks: 70, attendance: 78 },
    { id: 'S5', name: 'Student 5', marks: 45, attendance: 50 },
    { id: 'S6', name: 'Student 6', marks: 40, attendance: 48 }
  ];

  // Determine clusters based on cut threshold:
  // Heights:
  // S1 & S2 merge at height 8
  // S3 & S4 merge at height 10
  // S5 & S6 merge at height 12
  // (S1, S2) & (S3, S4) merge at height 26
  // All merge at height 42
  let clusters: string[][] = [];
  if (cutThreshold < 8) {
    clusters = [['S1'], ['S2'], ['S3'], ['S4'], ['S5'], ['S6']];
  } else if (cutThreshold < 10) {
    clusters = [['S1', 'S2'], ['S3'], ['S4'], ['S5'], ['S6']];
  } else if (cutThreshold < 12) {
    clusters = [['S1', 'S2'], ['S3', 'S4'], ['S5'], ['S6']];
  } else if (cutThreshold < 26) {
    clusters = [['S1', 'S2'], ['S3', 'S4'], ['S5', 'S6']];
  } else if (cutThreshold < 42) {
    clusters = [['S1', 'S2', 'S3', 'S4'], ['S5', 'S6']];
  } else {
    clusters = [['S1', 'S2', 'S3', 'S4', 'S5', 'S6']];
  }

  const clusterColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  const getClusterColor = (itemId: string) => {
    const cIdx = clusters.findIndex(c => c.includes(itemId));
    return clusterColors[cIdx % clusterColors.length];
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-cyan-50/60 via-blue-50/40 to-indigo-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">
            <GitMerge className="w-4 h-4 text-cyan-600" />
            <span>Unit 4 Hierarchical Agglomerative Clustering</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Interactive Dendrogram Tree & Cut Threshold Studio
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Unit 4 Part A Q4 & Q9: Drag the horizontal distance cut threshold to dynamically form nested cluster partitions without pre-specifying K.
          </p>
        </div>

        <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-xs">
          <Scissors className="w-4 h-4 text-indigo-600" />
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Derived Clusters: </span>
            <span className="font-mono font-bold text-indigo-600 text-sm">{clusters.length} Groups</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Interactive Dendrogram SVG (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="relative w-full h-[360px] bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 460 280">
              {/* Distance Axis on Left */}
              <line x1="40" y1="20" x2="40" y2="240" stroke="#cbd5e1" strokeWidth="1.5" />
              {[0, 10, 20, 30, 40].map(h => {
                const y = 240 - (h / 45) * 210;
                return (
                  <g key={h}>
                    <line x1="36" y1={y} x2="40" y2={y} stroke="#94a3b8" />
                    <text x="30" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8 font-mono">{h}</text>
                  </g>
                );
              })}
              <text x="35" y="16" textAnchor="end" fontSize="9" fontWeight="700" fill="#64748b">Distance</text>

              {/* Leaves x positions: S1=80, S2=140, S3=200, S4=260, S5=330, S6=390 */}
              {/* Tree lines: */}
              {/* S1 & S2 merge at h=8 */}
              {(() => {
                const y8 = 240 - (8 / 45) * 210;
                return (
                  <g stroke="#64748b" strokeWidth="2">
                    <line x1="80" y1="240" x2="80" y2={y8} />
                    <line x1="140" y1="240" x2="140" y2={y8} />
                    <line x1="80" y1={y8} x2="140" y2={y8} />
                  </g>
                );
              })()}

              {/* S3 & S4 merge at h=10 */}
              {(() => {
                const y10 = 240 - (10 / 45) * 210;
                return (
                  <g stroke="#64748b" strokeWidth="2">
                    <line x1="200" y1="240" x2="200" y2={y10} />
                    <line x1="260" y1="240" x2="260" y2={y10} />
                    <line x1="200" y1={y10} x2="260" y2={y10} />
                  </g>
                );
              })()}

              {/* S5 & S6 merge at h=12 */}
              {(() => {
                const y12 = 240 - (12 / 45) * 210;
                return (
                  <g stroke="#64748b" strokeWidth="2">
                    <line x1="330" y1="240" x2="330" y2={y12} />
                    <line x1="390" y1="240" x2="390" y2={y12} />
                    <line x1="330" y1={y12} x2="390" y2={y12} />
                  </g>
                );
              })()}

              {/* (S1, S2) & (S3, S4) merge at h=26 */}
              {(() => {
                const y8 = 240 - (8 / 45) * 210;
                const y10 = 240 - (10 / 45) * 210;
                const y26 = 240 - (26 / 45) * 210;
                return (
                  <g stroke="#64748b" strokeWidth="2">
                    <line x1="110" y1={y8} x2="110" y2={y26} />
                    <line x1="230" y1={y10} x2="230" y2={y26} />
                    <line x1="110" y1={y26} x2="230" y2={y26} />
                  </g>
                );
              })()}

              {/* Master Root merges at h=42 */}
              {(() => {
                const y26 = 240 - (26 / 45) * 210;
                const y12 = 240 - (12 / 45) * 210;
                const y42 = 240 - (42 / 45) * 210;
                return (
                  <g stroke="#64748b" strokeWidth="2">
                    <line x1="170" y1={y26} x2="170" y2={y42} />
                    <line x1="360" y1={y12} x2="360" y2={y42} />
                    <line x1="170" y1={y42} x2="360" y2={y42} />
                  </g>
                );
              })()}

              {/* Horizontal Cut Threshold Line */}
              {(() => {
                const cutY = 240 - (cutThreshold / 45) * 210;
                return (
                  <g>
                    <line
                      x1="35"
                      y1={cutY}
                      x2="430"
                      y2={cutY}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                    <polygon points={`430,${cutY} 440,${cutY - 4} 440,${cutY + 4}`} fill="#ef4444" />
                    <text x="445" y={cutY + 3} fontSize="9" fontWeight="800" fill="#dc2626 font-mono">
                      Cut: {cutThreshold}
                    </text>
                  </g>
                );
              })()}

              {/* Leaf Nodes */}
              {[
                { id: 'S1', x: 80, name: 'S1' },
                { id: 'S2', x: 140, name: 'S2' },
                { id: 'S3', x: 200, name: 'S3' },
                { id: 'S4', x: 260, name: 'S4' },
                { id: 'S5', x: 330, name: 'S5' },
                { id: 'S6', x: 390, name: 'S6' }
              ].map(lf => {
                const col = getClusterColor(lf.id);
                return (
                  <g key={lf.id}>
                    <circle cx={lf.x} cy="242" r="10" fill={col} />
                    <text x={lf.x} y="245" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff font-mono">
                      {lf.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Dendrogram leaves colored by active partition assignment.</span>
            <span className="font-mono text-indigo-600 font-semibold">Agglomerative Bottom-Up Merge</span>
          </div>
        </div>

        {/* Right: Cut Slider & Active Clusters (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Threshold Control
            </h3>

            {/* Slider */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Dendrogram Cut Height:</span>
                <span className="font-mono text-indigo-600">Threshold = {cutThreshold}</span>
              </div>
              <input
                type="range"
                min="4"
                max="44"
                value={cutThreshold}
                onChange={e => setCutThreshold(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>4 (6 Clusters)</span>
                <span>22 (3 Clusters)</span>
                <span>44 (1 Cluster)</span>
              </div>
            </div>

            {/* Dynamic Clusters Display */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
              <div className="text-xs font-bold text-slate-900 mb-1">
                Active Cluster Formations:
              </div>
              {clusters.map((group, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border text-xs flex items-center justify-between"
                  style={{
                    backgroundColor: `${clusterColors[idx % clusterColors.length]}10`,
                    borderColor: `${clusterColors[idx % clusterColors.length]}40`
                  }}
                >
                  <span className="font-bold" style={{ color: clusterColors[idx % clusterColors.length] }}>
                    Cluster {idx + 1}:
                  </span>
                  <span className="font-mono text-slate-700">
                    [{group.join(', ')}] ({group.length} members)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            Key Benefit: <strong className="text-slate-800">No need to fix K upfront</strong>; cut the dendrogram at any desired similarity distance.
          </div>
        </div>
      </div>
    </div>
  );
};
