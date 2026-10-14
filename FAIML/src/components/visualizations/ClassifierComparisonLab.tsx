/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GitBranch, Shield, Users, Sliders, CheckCircle2 } from 'lucide-react';

interface Point2D {
  x: number;
  y: number;
  label: 0 | 1;
}

export const ClassifierComparisonLab: React.FC = () => {
  const [selectedClassifier, setSelectedClassifier] = useState<'DT' | 'SVM' | 'KNN'>('SVM');
  const [knnK, setKnnK] = useState(3);
  const [treeDepth, setTreeDepth] = useState(2);
  const [svmMargin, setSvmMargin] = useState(25);

  // Deterministic 2D dataset with two classes (Red: 0, Blue: 1)
  const dataset: Point2D[] = [
    // Class 0 (Red)
    { x: 25, y: 30, label: 0 },
    { x: 30, y: 45, label: 0 },
    { x: 20, y: 60, label: 0 },
    { x: 35, y: 70, label: 0 },
    { x: 40, y: 35, label: 0 },
    { x: 45, y: 55, label: 0 },
    // Class 1 (Blue)
    { x: 65, y: 40, label: 1 },
    { x: 70, y: 65, label: 1 },
    { x: 80, y: 50, label: 1 },
    { x: 75, y: 80, label: 1 },
    { x: 60, y: 75, label: 1 },
    { x: 85, y: 30, label: 1 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-blue-50/60 via-indigo-50/40 to-cyan-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <GitBranch className="w-4 h-4 text-blue-600" />
            <span>Unit 3 Supervised Classification Comparison</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Decision Boundaries: Decision Tree vs SVM vs KNN
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Unit 3 Part B Q8: Evaluate decision boundaries, support vectors, Voronoi neighborhoods, and computational complexities.
          </p>
        </div>

        {/* Classifier Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-xs text-xs">
          <button
            onClick={() => setSelectedClassifier('DT')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedClassifier === 'DT' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Decision Tree</span>
          </button>
          <button
            onClick={() => setSelectedClassifier('SVM')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedClassifier === 'SVM' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>SVM (Max Margin)</span>
          </button>
          <button
            onClick={() => setSelectedClassifier('KNN')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedClassifier === 'KNN' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>K-Nearest Neighbors</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: 2D Feature Space Boundary Canvas (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="relative w-full h-[360px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Background Color Regions representing the decision space */}
              {selectedClassifier === 'SVM' && (
                <>
                  {/* Left Region (Class 0: Red) */}
                  <polygon points="0,0 52,0 52,100 0,100" fill="#fee2e2" fillOpacity="0.4" />
                  {/* Right Region (Class 1: Blue) */}
                  <polygon points="52,0 100,0 100,100 52,100" fill="#dbeafe" fillOpacity="0.4" />

                  {/* Maximum Margin Hyperplane */}
                  <line x1="52" y1="0" x2="52" y2="100" stroke="#4f46e5" strokeWidth="1.5" />

                  {/* Margin Gutters */}
                  <line
                    x1={52 - svmMargin * 0.4}
                    y1="0"
                    x2={52 - svmMargin * 0.4}
                    y2="100"
                    stroke="#818cf8"
                    strokeWidth="0.8"
                    strokeDasharray="2"
                  />
                  <line
                    x1={52 + svmMargin * 0.4}
                    y1="0"
                    x2={52 + svmMargin * 0.4}
                    y2="100"
                    stroke="#818cf8"
                    strokeWidth="0.8"
                    strokeDasharray="2"
                  />
                </>
              )}

              {selectedClassifier === 'DT' && (
                <>
                  {/* Orthogonal axis-aligned boundary splits */}
                  <rect x="0" y="0" width="53" height="100" fill="#fee2e2" fillOpacity="0.4" />
                  <rect x="53" y="0" width="47" height="100" fill="#dbeafe" fillOpacity="0.4" />

                  {/* Split 1: X1 <= 53 */}
                  <line x1="53" y1="0" x2="53" y2="100" stroke="#059669" strokeWidth="1.5" />

                  {treeDepth >= 2 && (
                    <>
                      {/* Secondary Split: In left child, if Y <= 40 */}
                      <rect x="0" y="0" width="53" height="40" fill="#fecaca" fillOpacity="0.4" />
                      <line x1="0" y1="40" x2="53" y2="40" stroke="#059669" strokeWidth="1.2" strokeDasharray="2" />
                    </>
                  )}
                </>
              )}

              {selectedClassifier === 'KNN' && (
                <>
                  {/* Non-linear smooth boundary approximation based on K */}
                  {knnK === 1 ? (
                    // Wobbly boundary for K=1 (High Variance)
                    <path
                      d="M 50,0 Q 40,25 55,50 T 48,75 T 53,100 L 100,100 L 100,0 Z"
                      fill="#dbeafe"
                      fillOpacity="0.4"
                    />
                  ) : (
                    // Smooth boundary for K >= 3
                    <path
                      d="M 52,0 Q 50,50 53,100 L 100,100 L 100,0 Z"
                      fill="#dbeafe"
                      fillOpacity="0.4"
                    />
                  )}
                  <path
                    d="M 0,0 L 52,0 Q 50,50 53,100 L 0,100 Z"
                    fill="#fee2e2"
                    fillOpacity="0.4"
                  />
                  <path
                    d={knnK === 1 ? "M 50,0 Q 40,25 55,50 T 48,75 T 53,100" : "M 52,0 Q 50,50 53,100"}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {/* Data Points */}
              {dataset.map((pt, i) => {
                const isSupportVector =
                  selectedClassifier === 'SVM' &&
                  (Math.abs(pt.x - 52) < svmMargin * 0.45);

                return (
                  <g key={i}>
                    {/* Ring for support vector */}
                    {isSupportVector && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="0.8"
                        strokeDasharray="1.5"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="2"
                      fill={pt.label === 0 ? '#ef4444' : '#3b82f6'}
                      stroke="#ffffff"
                      strokeWidth="0.4"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Class 0
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Class 1
              </span>
              {selectedClassifier === 'SVM' && (
                <span className="text-indigo-600 font-semibold">• Dotted Rings = Support Vectors</span>
              )}
            </div>
            <span className="font-mono text-slate-700">12 Samples Evaluated</span>
          </div>
        </div>

        {/* Right: Controls & Complexity Matrix (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Classifier Controls
            </h3>

            {/* Slider Controls based on selected algorithm */}
            {selectedClassifier === 'SVM' && (
              <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Margin Width (Regularization C):</span>
                  <span className="font-mono text-indigo-600">Margin = {svmMargin}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={svmMargin}
                  onChange={e => setSvmMargin(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  SVM finds the optimal separating hyperplane maximizing the geometric margin between classes. Points on the margin boundaries are <strong>Support Vectors</strong>.
                </p>
              </div>
            )}

            {selectedClassifier === 'DT' && (
              <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Decision Tree Max Depth:</span>
                  <span className="font-mono text-emerald-600">Depth = {treeDepth}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={treeDepth}
                  onChange={e => setTreeDepth(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  Decision Trees recursively create axis-aligned orthogonal partitions. Notice splits are strictly horizontal and vertical lines in feature space.
                </p>
              </div>
            )}

            {selectedClassifier === 'KNN' && (
              <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>K Nearest Neighbors:</span>
                  <span className="font-mono text-blue-600">K = {knnK}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="2"
                  value={knnK}
                  onChange={e => setKnnK(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  K=1 yields complex wobbly boundaries (risk of overfitting). Larger K smooths the decision boundary via majority voting among neighbors.
                </p>
              </div>
            )}

            {/* Syllabus Complexity Comparison Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-slate-900 mb-2">
                Unit 3 Syllabus Complexity Reference:
              </div>
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="py-1">Algorithm</th>
                    <th className="py-1">Training</th>
                    <th className="py-1">Inference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-mono text-slate-700">
                  <tr className={selectedClassifier === 'DT' ? 'bg-indigo-50 font-bold' : ''}>
                    <td className="py-1.5 font-sans font-medium">Decision Tree</td>
                    <td className="py-1.5">O(n · d · log n)</td>
                    <td className="py-1.5 text-emerald-600">O(log n)</td>
                  </tr>
                  <tr className={selectedClassifier === 'SVM' ? 'bg-indigo-50 font-bold' : ''}>
                    <td className="py-1.5 font-sans font-medium">SVM</td>
                    <td className="py-1.5">O(n² · d)</td>
                    <td className="py-1.5 text-blue-600">O(n_sv · d)</td>
                  </tr>
                  <tr className={selectedClassifier === 'KNN' ? 'bg-indigo-50 font-bold' : ''}>
                    <td className="py-1.5 font-sans font-medium">KNN</td>
                    <td className="py-1.5 text-emerald-600">O(1) (Lazy)</td>
                    <td className="py-1.5 text-red-600">O(n · d) (Slow)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            Selected: <strong className="text-slate-800">{selectedClassifier === 'DT' ? 'Decision Tree (White-box rules)' : selectedClassifier === 'SVM' ? 'Support Vector Machine (Maximum margin)' : 'K-Nearest Neighbors (Instance-based)'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
