/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Scissors } from 'lucide-react';
import {
  getSyllabusAlphaBetaTree,
  traceAlphaBeta,
  TreeNode,
  TreeStep
} from '../../lib/algorithms/gameTreeEngine';

export const GameTreeVisualizer: React.FC = () => {
  const [usePruning, setUsePruning] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1200);

  const [steps, setSteps] = useState<TreeStep[]>(() => {
    const root = getSyllabusAlphaBetaTree();
    return traceAlphaBeta(root, usePruning);
  });

  useEffect(() => {
    const root = getSyllabusAlphaBetaTree();
    const newSteps = traceAlphaBeta(root, usePruning);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [usePruning]);

  const timerRef = useRef<any>(null);
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  const currentStep = steps[currentStepIndex] || steps[0];
  const treeRoot = currentStep.treeSnapshot;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Unit 2 Game Theory & Adversarial Search
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Mini-Max & Alpha-Beta (α-β) Pruning Studio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit 2 Part B Q2 Syllabus Tree with leaf payoffs D(2,3), E(5,9), F(0,1), G(7,5).
          </p>
        </div>

        {/* Toggle Pruning vs Standard Minimax */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setUsePruning(true)}
              className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                usePruning ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Alpha-Beta Pruning (α ≥ β)</span>
            </button>
            <button
              onClick={() => setUsePruning(false)}
              className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                !usePruning ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard Mini-Max (Exhaustive)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Tree Canvas (7 cols) + State Details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
          <div className="w-full h-[380px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 540 340">
              {/* Level Labels */}
              <text x="20" y="45" fontSize="10" fill="#94a3b8" fontWeight="600">Level 0: MAX (Root A)</text>
              <text x="20" y="125" fontSize="10" fill="#94a3b8" fontWeight="600">Level 1: MIN (B, C)</text>
              <text x="20" y="205" fontSize="10" fill="#94a3b8" fontWeight="600">Level 2: MAX (D, E, F, G)</text>
              <text x="20" y="285" fontSize="10" fill="#94a3b8" fontWeight="600">Level 3: Terminal Leaves</text>

              {/* Coordinates Mapping */}
              {/* Root A: (270, 40) */}
              {/* Node B: (150, 120), Node C: (390, 120) */}
              {/* Node D: (90, 200), Node E: (210, 200), Node F: (330, 200), Node G: (450, 200) */}
              {/* Leaves: D1(65, 280), D2(115, 280), E1(185, 280), E2(235, 280), F1(305, 280), F2(355, 280), G1(425, 280), G2(475, 280) */}

              {/* Branches */}
              <g stroke="#cbd5e1" strokeWidth="1.5">
                {/* A to B, C */}
                <line x1="270" y1="55" x2="150" y2="105" />
                <line x1="270" y1="55" x2="390" y2="105" />
                {/* B to D, E */}
                <line x1="150" y1="135" x2="90" y2="185" />
                <line x1="150" y1="135" x2="210" y2="185" />
                {/* C to F, G */}
                <line x1="390" y1="135" x2="330" y2="185" />
                <line x1="390" y1="135" x2="450" y2="185" stroke={currentStep.prunedNodeIds?.includes('G') ? '#f87171' : '#cbd5e1'} strokeDasharray={currentStep.prunedNodeIds?.includes('G') ? '4' : 'none'} />

                {/* Leaves */}
                <line x1="90" y1="215" x2="65" y2="265" />
                <line x1="90" y1="215" x2="115" y2="265" />
                <line x1="210" y1="215" x2="185" y2="265" />
                <line x1="210" y1="215" x2="235" y2="265" stroke={currentStep.prunedNodeIds?.includes('E2') ? '#f87171' : '#cbd5e1'} strokeDasharray={currentStep.prunedNodeIds?.includes('E2') ? '4' : 'none'} />
                <line x1="330" y1="215" x2="305" y2="265" />
                <line x1="330" y1="215" x2="355" y2="265" />
                <line x1="450" y1="215" x2="425" y2="265" stroke={currentStep.prunedNodeIds?.includes('G') ? '#f87171' : '#cbd5e1'} strokeDasharray={currentStep.prunedNodeIds?.includes('G') ? '4' : 'none'} />
                <line x1="450" y1="215" x2="475" y2="265" stroke={currentStep.prunedNodeIds?.includes('G') ? '#f87171' : '#cbd5e1'} strokeDasharray={currentStep.prunedNodeIds?.includes('G') ? '4' : 'none'} />
              </g>

              {/* Render Node Helper */}
              {(() => {
                const nodesList = [
                  { id: 'A', name: 'A', type: 'MAX', x: 270, y: 40 },
                  { id: 'B', name: 'B', type: 'MIN', x: 150, y: 120 },
                  { id: 'C', name: 'C', type: 'MIN', x: 390, y: 120 },
                  { id: 'D', name: 'D', type: 'MAX', x: 90, y: 200 },
                  { id: 'E', name: 'E', type: 'MAX', x: 210, y: 200 },
                  { id: 'F', name: 'F', type: 'MAX', x: 330, y: 200 },
                  { id: 'G', name: 'G', type: 'MAX', x: 450, y: 200 },
                  // Leaves
                  { id: 'D1', name: '2', type: 'LEAF', x: 65, y: 275, val: 2 },
                  { id: 'D2', name: '3', type: 'LEAF', x: 115, y: 275, val: 3 },
                  { id: 'E1', name: '5', type: 'LEAF', x: 185, y: 275, val: 5 },
                  { id: 'E2', name: '9', type: 'LEAF', x: 235, y: 275, val: 9 },
                  { id: 'F1', name: '0', type: 'LEAF', x: 305, y: 275, val: 0 },
                  { id: 'F2', name: '1', type: 'LEAF', x: 355, y: 275, val: 1 },
                  { id: 'G1', name: '7', type: 'LEAF', x: 425, y: 275, val: 7 },
                  { id: 'G2', name: '5', type: 'LEAF', x: 475, y: 275, val: 5 }
                ];

                return nodesList.map(n => {
                  const isActive = currentStep.activeNodeId === n.id;
                  const isPruned = currentStep.prunedNodeIds?.includes(n.id);

                  let fill = '#ffffff';
                  let stroke = '#64748b';
                  let textFill = '#0f172a';

                  if (isActive) {
                    fill = '#4f46e5';
                    stroke = '#312e81';
                    textFill = '#ffffff';
                  } else if (isPruned) {
                    fill = '#fee2e2';
                    stroke = '#ef4444';
                    textFill = '#991b1b';
                  } else if (n.type === 'MAX') {
                    fill = '#eff6ff';
                    stroke = '#3b82f6';
                  } else if (n.type === 'MIN') {
                    fill = '#fef2f2';
                    stroke = '#ef4444';
                  }

                  return (
                    <g key={n.id}>
                      {n.type === 'LEAF' ? (
                        <rect
                          x={n.x - 14}
                          y={n.y - 12}
                          width="28"
                          height="24"
                          rx="4"
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isActive ? 2.5 : 1.5}
                        />
                      ) : n.type === 'MAX' ? (
                        // Up triangle for MAX
                        <polygon
                          points={`${n.x},${n.y - 14} ${n.x + 16},${n.y + 14} ${n.x - 16},${n.y + 14}`}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isActive ? 2.5 : 1.5}
                        />
                      ) : (
                        // Inverted triangle for MIN
                        <polygon
                          points={`${n.x},${n.y + 14} ${n.x + 16},${n.y - 14} ${n.x - 16},${n.y - 14}`}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isActive ? 2.5 : 1.5}
                        />
                      )}
                      <text
                        x={n.x}
                        y={n.y + (n.type === 'LEAF' ? 4 : n.type === 'MAX' ? 6 : -1)}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fill={textFill}
                      >
                        {n.name}
                      </text>
                      {isPruned && (
                        <text
                          x={n.x}
                          y={n.y + 24}
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="700"
                          fill="#dc2626"
                        >
                          PRUNED
                        </text>
                      )}
                    </g>
                  );
                });
              })()}
            </svg>
          </div>

          {/* Stepper controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentStepIndex(0)}
                disabled={currentStepIndex === 0}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Previous step"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play Tree'}</span>
              </button>
              <button
                onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStepIndex >= steps.length - 1}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Next step"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-500 font-mono tabular-nums">
              Step {currentStepIndex + 1}/{steps.length}
            </div>
          </div>
        </div>

        {/* Right Zone: Explanations, α/β gauges */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-50/30">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Pruning Logic & State
            </div>

            {/* Explanation box */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg mb-4">
              <div className="text-xs font-medium text-slate-900 leading-relaxed">
                {currentStep.description}
              </div>
            </div>

            {/* Alpha / Beta Gauge Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Alpha (α) — MAX best</div>
                <div className="text-lg font-mono font-bold text-indigo-600 mt-1">
                  {currentStep.alpha === -Infinity ? '-∞' : currentStep.alpha}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Guaranteed minimum for MAX</div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Beta (β) — MIN best</div>
                <div className="text-lg font-mono font-bold text-red-600 mt-1">
                  {currentStep.beta === Infinity ? '+∞' : currentStep.beta}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Guaranteed maximum for MIN</div>
              </div>
            </div>

            {/* Pruning condition banner */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
              <div className="font-semibold mb-1">Pruning Criterion: α ≥ β</div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Whenever α meets or exceeds β, the parent node already possesses an alternative branch guaranteed to be superior. Additional child exploration is guaranteed not to alter the minimax decision!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>
              Final Decision: <strong className="text-slate-900 font-mono">A → B → D</strong>
            </span>
            <span>
              Root Utility: <strong className="text-indigo-600 font-mono">3</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
