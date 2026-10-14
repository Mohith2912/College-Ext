/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, HelpCircle } from 'lucide-react';
import {
  syllabusAStarGraph,
  syllabusHighwayGraph,
  syllabusTreeGraph,
  runSearchAlgorithm,
  SearchGraph,
  SearchStep
} from '../../lib/algorithms/searchTrace';

export const SearchGraphVisualizer: React.FC = () => {
  const [selectedGraphId, setSelectedGraphId] = useState<'astar' | 'highway' | 'tree'>('astar');
  const [algorithm, setAlgorithm] = useState<'BFS' | 'DFS' | 'UCS' | 'ASTAR'>('ASTAR');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // ms per step
  const [predictionFeedback, setPredictionFeedback] = useState<string | null>(null);

  const activeGraph: SearchGraph =
    selectedGraphId === 'astar'
      ? syllabusAStarGraph
      : selectedGraphId === 'highway'
      ? syllabusHighwayGraph
      : syllabusTreeGraph;

  const [steps, setSteps] = useState<SearchStep[]>(() =>
    runSearchAlgorithm(algorithm, activeGraph)
  );

  // Re-run search whenever algorithm or graph changes
  useEffect(() => {
    const newSteps = runSearchAlgorithm(algorithm, activeGraph);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setPredictionFeedback(null);
  }, [algorithm, selectedGraphId]);

  // Auto-play timer
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
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handlePredict = (predictedNodeId: string) => {
    if (currentStepIndex >= steps.length - 1) {
      setPredictionFeedback('Search is already completed!');
      return;
    }
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep && nextStep.currentNode === predictedNodeId) {
      setPredictionFeedback(`Correct! Node '${predictedNodeId}' is expanded next because it has the optimal evaluation priority.`);
    } else {
      setPredictionFeedback(`Not quite. Under ${algorithm}, the priority queue selected '${nextStep?.currentNode}'. Step forward to see why!`);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Unit 1 Interactive Algorithm Visualizer
          </div>
          <h2 className="text-lg font-bold text-slate-900">{activeGraph.title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{activeGraph.description}</p>
        </div>

        {/* Algorithm & Graph Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-1 font-medium">Graph:</span>
            <button
              onClick={() => setSelectedGraphId('astar')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedGraphId === 'astar' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A* S→G Graph
            </button>
            <button
              onClick={() => setSelectedGraphId('highway')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedGraphId === 'highway' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Highway Route
            </button>
            <button
              onClick={() => setSelectedGraphId('tree')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedGraphId === 'tree' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Binary Tree
            </button>
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-1 font-medium">Algorithm:</span>
            {(['BFS', 'DFS', 'UCS', 'ASTAR'] as const).map(alg => (
              <button
                key={alg}
                onClick={() => setAlgorithm(alg)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  algorithm === alg ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {alg === 'ASTAR' ? 'A*' : alg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Zone: Visual Canvas (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
          <div className="relative w-full h-[360px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 540 300">
              {/* Grid backdrop */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Render Edges */}
              {activeGraph.edges.map((edge, idx) => {
                const fromNode = activeGraph.nodes.find(n => n.id === edge.from);
                const toNode = activeGraph.nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const isPathEdge =
                  currentStep.currentPath.includes(edge.from) &&
                  currentStep.currentPath.includes(edge.to) &&
                  Math.abs(currentStep.currentPath.indexOf(edge.from) - currentStep.currentPath.indexOf(edge.to)) === 1;

                const midX = (fromNode.x + toNode.x) / 2;
                const midY = (fromNode.y + toNode.y) / 2;

                return (
                  <g key={idx}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isPathEdge ? '#4f46e5' : '#94a3b8'}
                      strokeWidth={isPathEdge ? 3.5 : 1.5}
                      strokeDasharray={isPathEdge ? 'none' : 'none'}
                    />
                    {/* Cost pill */}
                    <circle cx={midX} cy={midY} r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    <text
                      x={midX}
                      y={midY + 3.5}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      fill="#475569"
                    >
                      {edge.cost}
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {activeGraph.nodes.map(node => {
                const isStart = node.id === activeGraph.startNode;
                const isGoal = node.id === activeGraph.goalNode;
                const isCurrent = node.id === currentStep.currentNode;
                const isVisited = currentStep.visited.includes(node.id);
                const inFrontier = currentStep.frontier.some(f => f.id === node.id);

                let fillColor = '#ffffff';
                let strokeColor = '#64748b';
                let textColor = '#1e293b';

                if (isCurrent) {
                  fillColor = '#4f46e5';
                  strokeColor = '#312e81';
                  textColor = '#ffffff';
                } else if (isGoal && currentStep.actionType === 'goal_reached') {
                  fillColor = '#059669';
                  strokeColor = '#065f46';
                  textColor = '#ffffff';
                } else if (isVisited) {
                  fillColor = '#e2e8f0';
                  strokeColor = '#94a3b8';
                  textColor = '#334155';
                } else if (inFrontier) {
                  fillColor = '#fef3c7';
                  strokeColor = '#d97706';
                  textColor = '#92400e';
                }

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handlePredict(node.id)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isCurrent ? 3 : 2}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill={textColor}
                    >
                      {node.id}
                    </text>
                    {/* Node label and heuristic */}
                    <text
                      x={node.x}
                      y={node.y + 32}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="500"
                      fill="#475569"
                    >
                      {node.name}
                    </text>
                    {algorithm === 'ASTAR' && (
                      <text
                        x={node.x}
                        y={node.y - 24}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill="#6366f1"
                      >
                        h={node.h}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Player controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentStepIndex(0)}
                disabled={currentStepIndex === 0}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reset to beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Step backward"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play Search'}</span>
              </button>
              <button
                onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStepIndex >= steps.length - 1}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Step forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Speed:</span>
              <input
                type="range"
                min="300"
                max="2000"
                step="100"
                value={playbackSpeed}
                onChange={e => setPlaybackSpeed(Number(e.target.value))}
                className="w-20 accent-indigo-600"
              />
              <span className="font-mono text-slate-700 tabular-nums">
                Step {currentStepIndex + 1}/{steps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Zone: Explanation & State Deck (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-50/30">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Execution Trace & Reasoning
            </div>

            {/* Explanation box */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg mb-4">
              <div className="text-xs font-medium text-slate-900 leading-relaxed">
                {currentStep.explanation}
              </div>
              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
                <span>Active Path:</span>
                <span className="font-mono font-semibold text-indigo-600">
                  {currentStep.currentPath.join(' → ')}
                </span>
              </div>
            </div>

            {/* Frontier Queue state */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Frontier State ({algorithm === 'BFS' ? 'FIFO Queue' : algorithm === 'DFS' ? 'LIFO Stack' : 'Priority Queue'})</span>
                <span className="font-mono text-[11px] text-slate-500">{currentStep.frontier.length} pending</span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {currentStep.frontier.length === 0 ? (
                  <div className="text-xs text-slate-400 italic">Frontier is empty</div>
                ) : (
                  currentStep.frontier.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-2.5 py-1 bg-white border border-slate-200 rounded text-xs"
                    >
                      <span className="font-semibold text-slate-800">Node {item.id}</span>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        <span>g={item.g}</span>
                        {algorithm === 'ASTAR' && (
                          <>
                            <span>h={item.h}</span>
                            <span className="font-semibold text-indigo-600">f={item.f}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Prediction Challenge box */}
            <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>Prediction Checkpoint</span>
              </div>
              <p className="text-xs text-indigo-700 mb-2">
                Click a node on the canvas to predict which node will be expanded in the next step.
              </p>
              {predictionFeedback && (
                <div className="text-xs font-medium text-indigo-950 bg-white p-2 rounded border border-indigo-200">
                  {predictionFeedback}
                </div>
              )}
            </div>
          </div>

          {/* Complexity Reference Bar */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>
              Time: <strong className="font-mono">{algorithm === 'BFS' || algorithm === 'DFS' ? 'O(b^d)' : 'O(b^d)'}</strong>
            </span>
            <span>
              Space: <strong className="font-mono">{algorithm === 'DFS' ? 'O(b·m)' : 'O(b^d)'}</strong>
            </span>
            <span>
              Optimal: <strong className="text-slate-800">{algorithm === 'ASTAR' ? 'Yes (Admissible h)' : algorithm === 'BFS' ? 'Yes (Unit Cost)' : 'No'}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
