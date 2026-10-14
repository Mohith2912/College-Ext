/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RotateCcw, Play, CheckCircle, Calculator } from 'lucide-react';
import {
  generateSampleDataset,
  runKMeansStep,
  runDBSCAN,
  calculateSilhouetteCoefficient,
  DataPoint,
  Centroid,
  CLUSTER_COLORS
} from '../../lib/algorithms/clusteringEngine';

export const ClusteringVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'KMEANS' | 'DBSCAN' | 'SILHOUETTE'>('KMEANS');
  const [points, setPoints] = useState<DataPoint[]>(() => generateSampleDataset('three_blobs'));

  // K-Means states
  const [kCount, setKCount] = useState(3);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [iteration, setIteration] = useState(0);
  const [inertia, setInertia] = useState(0);
  const [converged, setConverged] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initialize centroids and step through iterations.');

  // DBSCAN states
  const [eps, setEps] = useState(18);
  const [minPts, setMinPts] = useState(4);

  // Silhouette Calculator states (Unit 4 Part A Q15 preset)
  const [calcA, setCalcA] = useState(2.0);
  const [calcB, setCalcB] = useState(7.5);

  const initKMeans = () => {
    const rawPoints = generateSampleDataset('three_blobs');
    setPoints(rawPoints);
    const initialCentroids: Centroid[] = [];
    for (let i = 0; i < kCount; i++) {
      initialCentroids.push({
        id: i,
        x: 20 + i * 28 + Math.random() * 10,
        y: 20 + i * 25 + Math.random() * 10,
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length]
      });
    }
    setCentroids(initialCentroids);
    setIteration(0);
    setInertia(0);
    setConverged(false);
    setStatusMessage(`Initialized K=${kCount} centroids. Click 'Step Next Iteration' to assign points.`);
  };

  useEffect(() => {
    initKMeans();
  }, [kCount]);

  const stepKMeans = () => {
    if (converged || centroids.length === 0) return;
    const stepResult = runKMeansStep(points, centroids, iteration);
    setPoints(stepResult.points);
    setCentroids(stepResult.centroids);
    setIteration(stepResult.iteration);
    setInertia(stepResult.inertia);
    setConverged(stepResult.hasConverged);
    setStatusMessage(stepResult.description);
  };

  // Run DBSCAN whenever points, eps, or minPts change
  const dbscanPoints = React.useMemo(() => {
    if (mode !== 'DBSCAN') return points;
    return runDBSCAN(points, eps, minPts);
  }, [points, eps, minPts, mode]);

  const silhouetteScore = calculateSilhouetteCoefficient(calcA, calcB);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Unit 4 Unsupervised Learning & Clustering
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Clustering Laboratory (K-Means, DBSCAN & Silhouette Score)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test partitioning vs density algorithms and verify the Silhouette formula: S(P1) = (b - a)/max(a, b).
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 text-xs">
          <button
            onClick={() => setMode('KMEANS')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
              mode === 'KMEANS' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            K-Means Centroids
          </button>
          <button
            onClick={() => setMode('DBSCAN')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
              mode === 'DBSCAN' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            DBSCAN Density
          </button>
          <button
            onClick={() => setMode('SILHOUETTE')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              mode === 'SILHOUETTE' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Silhouette Lab (0.733)</span>
          </button>
        </div>
      </div>

      {mode === 'SILHOUETTE' ? (
        /* Silhouette Score Calculation Studio */
        <div className="p-6 max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Unit 4 Part A Question 15: Compute Silhouette Coefficient for Point P1
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Given intra-cluster average distance a(P1) = 2.0 and neighboring cluster average distance b(P1) = (7 + 8)/2 = 7.5.
            </p>
            <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg font-mono text-sm text-indigo-700">
              S(P1) = [ b(P1) - a(P1) ] / max( a(P1), b(P1) )
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Intra-Cluster Distance a(P1) [Compactness]:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={calcA}
                    onChange={e => setCalcA(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={calcA}
                    onChange={e => setCalcA(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Average distance to points in same cluster.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nearest-Cluster Distance b(P1) [Separation]:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="15"
                    step="0.1"
                    value={calcB}
                    onChange={e => setCalcB(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={calcB}
                    onChange={e => setCalcB(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Average distance to points in closest neighboring cluster.</p>
              </div>

              <button
                onClick={() => { setCalcA(2.0); setCalcB(7.5); }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
              >
                Reset to Syllabus Preset (a=2.0, b=7.5)
              </button>
            </div>

            {/* Live Calculation Output Card */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Computed Silhouette Score
                </div>
                <div className="text-3xl font-mono font-bold text-indigo-600 my-2 tabular-nums">
                  {silhouetteScore}
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Numerator: {calcB} - {calcA} = <strong>{(calcB - calcA).toFixed(2)}</strong></div>
                  <div>• Denominator: max({calcA}, {calcB}) = <strong>{Math.max(calcA, calcB).toFixed(2)}</strong></div>
                </div>
              </div>

              <div className="mt-4 p-2.5 bg-white border border-slate-200 rounded text-xs text-slate-700">
                {silhouetteScore > 0.5 ? (
                  <span className="text-emerald-700 font-medium">
                    ✓ Strong clustering: Point P1 is cohesive with its cluster and distinctly separated from neighbors.
                  </span>
                ) : silhouetteScore > 0 ? (
                  <span className="text-amber-700 font-medium">
                    ⚠ Moderate clustering: Point P1 is near cluster boundary.
                  </span>
                ) : (
                  <span className="text-red-700 font-medium">
                    ✕ Poor clustering: Negative score suggests point P1 belongs to the neighboring cluster!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2D Spatial Scatter Plot */
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
            <div className="relative w-full h-[360px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Render points */}
                {(mode === 'DBSCAN' ? dbscanPoints : points).map((p, idx) => {
                  let fill = '#94a3b8';
                  if (mode === 'KMEANS') {
                    fill = p.cluster >= 0 ? CLUSTER_COLORS[p.cluster % CLUSTER_COLORS.length] : '#94a3b8';
                  } else {
                    if (p.cluster === -1) fill = '#ef4444'; // noise
                    else fill = CLUSTER_COLORS[p.cluster % CLUSTER_COLORS.length];
                  }

                  return (
                    <g key={idx}>
                      {mode === 'DBSCAN' && p.cluster === -1 ? (
                        // Cross for noise
                        <g stroke="#ef4444" strokeWidth="0.8">
                          <line x1={p.x - 1.2} y1={p.y - 1.2} x2={p.x + 1.2} y2={p.y + 1.2} />
                          <line x1={p.x - 1.2} y1={p.y + 1.2} x2={p.x + 1.2} y2={p.y - 1.2} />
                        </g>
                      ) : (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={mode === 'DBSCAN' && p.type === 'core' ? 2 : 1.5}
                          fill={fill}
                          stroke="#ffffff"
                          strokeWidth="0.3"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Render Centroids if K-Means */}
                {mode === 'KMEANS' &&
                  centroids.map((c, idx) => (
                    <g key={idx} className="cursor-pointer">
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="4"
                        fill={c.color}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <polygon
                        points={`${c.x},${c.y - 2.5} ${c.x + 2.5},${c.y + 2.5} ${c.x - 2.5},${c.y + 2.5}`}
                        fill="#ffffff"
                      />
                    </g>
                  ))}
              </svg>
            </div>

            {/* Bottom bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              {mode === 'KMEANS' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={stepKMeans}
                    disabled={converged}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Step Next Iteration</span>
                  </button>
                  <button
                    onClick={initKMeans}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Reset centroids"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-slate-500">
                  DBSCAN density active with radius ε={eps} and MinPts={minPts}.
                </div>
              )}

              <div className="text-xs text-slate-500">
                Total Samples: <strong className="font-mono text-slate-800">{points.length}</strong>
              </div>
            </div>
          </div>

          {/* Right: Controls & Meters (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-50/30">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Algorithm Diagnostics
              </div>

              {/* Status Message */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg mb-4 text-xs font-medium text-slate-800 leading-relaxed">
                {statusMessage}
              </div>

              {mode === 'KMEANS' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <div className="text-[11px] text-slate-500">Iteration Counter</div>
                      <div className="text-xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
                        {iteration}
                      </div>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <div className="text-[11px] text-slate-500">Inertia (WCSS)</div>
                      <div className="text-xl font-mono font-bold text-indigo-600 mt-1 tabular-nums">
                        {inertia}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 border border-slate-200 rounded-lg">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Number of Clusters (K):</span>
                      <span className="font-mono text-indigo-600">K = {kCount}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="5"
                      value={kCount}
                      onChange={e => setKCount(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white p-3.5 border border-slate-200 rounded-lg">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Neighborhood Radius (Eps):</span>
                      <span className="font-mono text-indigo-600">ε = {eps}</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="35"
                      value={eps}
                      onChange={e => setEps(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="bg-white p-3.5 border border-slate-200 rounded-lg">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>MinPts (Core Threshold):</span>
                      <span className="font-mono text-indigo-600">{minPts} points</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={minPts}
                      onChange={e => setMinPts(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="text-slate-600 flex items-center justify-between">
                      <span>Core Points:</span>
                      <strong className="font-mono text-emerald-600">
                        {dbscanPoints.filter(p => p.type === 'core').length}
                      </strong>
                    </div>
                    <div className="text-slate-600 flex items-center justify-between">
                      <span>Border Points:</span>
                      <strong className="font-mono text-blue-600">
                        {dbscanPoints.filter(p => p.type === 'border').length}
                      </strong>
                    </div>
                    <div className="text-slate-600 flex items-center justify-between">
                      <span>Noise Outliers:</span>
                      <strong className="font-mono text-red-600">
                        {dbscanPoints.filter(p => p.cluster === -1).length}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
              Metric: <code className="font-mono text-slate-700">Silhouette ∈ [-1, +1] · Lower DBI = Better</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
