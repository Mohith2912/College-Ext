import React, { useState, useEffect } from 'react';
import { LabId } from '../../types/algorithm';
import { LAB_METADATA } from '../../data/curriculum';
import { PlaybackControls } from '../common/PlaybackControls';
import { CodeViewer } from '../common/CodeViewer';
import { VariableInspector } from '../common/VariableInspector';
import { ComplexityCard } from '../common/ComplexityCard';
import { CaseStudyPanel } from '../common/CaseStudyPanel';
import { ArrayVisualizer } from '../visualizations/ArrayVisualizer';
import { GraphVisualizer } from '../visualizations/GraphVisualizer';
import { DPTableVisualizer } from '../visualizations/DPTableVisualizer';
import { ChessboardVisualizer } from '../visualizations/ChessboardVisualizer';
import { TimelineVisualizer } from '../visualizations/TimelineVisualizer';
import { KnapsackVisualizer } from '../visualizations/KnapsackVisualizer';
import { CallStackVisualizer } from '../visualizations/CallStackVisualizer';
import { SubsetTreeVisualizer } from '../visualizations/SubsetTreeVisualizer';
import { soundFx } from '../../lib/sound';

// Trace engines
import {
  traceLinearSearch,
  traceMinMax,
  traceCheckSorted,
  tracePowerRecursion,
  LinearSearchData,
  MinMaxData,
  CheckSortedData,
  PowerRecursionData,
} from '../../engines/foundations';

import {
  traceBinarySearch,
  traceMergeSort,
  traceQuickSort,
  BinarySearchData,
  MergeSortData,
  QuickSortData,
} from '../../engines/divideConquer';

import {
  traceDijkstra,
  tracePrimMST,
  traceJobSequencing,
  traceFractionalKnapsack,
  DijkstraData,
  PrimMSTData,
  JobSequencingData,
  FractionalKnapsackData,
} from '../../engines/greedy';

import {
  trace01Knapsack,
  traceAllPairsShortestPath,
  traceOptimalBST,
  Knapsack01Data,
  APSPData,
  ObstData,
} from '../../engines/dynamicProg';

import {
  traceBFS,
  traceDFS,
  traceHamiltonianCycle,
  traceGraphColoring,
  traceNQueens,
  traceSumOfSubsets,
  TraversalData,
  HamiltonianData,
  GraphColoringData,
  NQueensData,
  SumOfSubsetsData,
} from '../../engines/backtracking';

import { Sliders, RefreshCw, CheckCircle2, ArrowRight, Shuffle } from 'lucide-react';

interface LabWorkspaceProps {
  labId: LabId;
  onMarkComplete: (labId: LabId) => void;
  isCompleted: boolean;
}

export const LabWorkspace: React.FC<LabWorkspaceProps> = ({
  labId,
  onMarkComplete,
  isCompleted,
}) => {
  const meta = LAB_METADATA[labId];

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(650);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'theory' | 'casestudy'>('visual');

  // Input States for configurable labs
  const [linearArr, setLinearArr] = useState<number[]>([15, 42, 8, 23, 99, 16]);
  const [linearKey, setLinearKey] = useState<number>(23);
  const [rawArrayInput, setRawArrayInput] = useState<string>('15, 42, 8, 23, 99, 16');

  const [minMaxArr, setMinMaxArr] = useState<number[]>([28, 12, 74, 5, 63, 89, 34]);
  const [checkSortedArr, setCheckSortedArr] = useState<number[]>([10, 20, 35, 30, 50, 70]);

  const [powerX, setPowerX] = useState<number>(2);
  const [powerN, setPowerN] = useState<number>(4);

  const [binaryArr, setBinaryArr] = useState<number[]>([4, 9, 15, 23, 38, 45, 59, 72, 88]);
  const [binaryKey, setBinaryKey] = useState<number>(45);

  const [mergeArr, setMergeArr] = useState<number[]>([5, 44, 3, 2, 1]); // From syllabus Mergesort2.java!
  const [quickArr, setQuickArr] = useState<number[]>([38, 12, 75, 4, 90, 53, 27]);

  // Graph Presets (From syllabus: 6 vertices weighted graph for Dijkstra / Prim)
  const defaultGraphMatrix = [
    [0, 10, 0, 30, 0, 0],
    [10, 0, 50, 0, 0, 25],
    [0, 50, 0, 20, 10, 0],
    [30, 0, 20, 0, 60, 0],
    [0, 0, 10, 60, 0, 15],
    [0, 25, 0, 0, 15, 0],
  ];
  const defaultGraphNodes = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [graphStartNode, setGraphStartNode] = useState<number>(0);

  // Job Sequencing preset from syllabus
  const defaultJobs = [
    { id: 'J1', deadline: 2, profit: 100 },
    { id: 'J2', deadline: 1, profit: 19 },
    { id: 'J3', deadline: 2, profit: 27 },
    { id: 'J4', deadline: 1, profit: 25 },
    { id: 'J5', deadline: 3, profit: 15 },
  ];

  // Fractional knapsack preset
  const [fracItems, setFracItems] = useState([
    { id: 'I1', weight: 10, value: 60 },
    { id: 'I2', weight: 20, value: 100 },
    { id: 'I3', weight: 30, value: 120 },
  ]);
  const [fracCapacity, setFracCapacity] = useState<number>(50);

  // 0/1 knapsack preset
  const [knap01Weights, setKnap01Weights] = useState<number[]>([2, 3, 4, 5]);
  const [knap01Values, setKnap01Values] = useState<number[]>([3, 4, 5, 6]);
  const [knap01Cap, setKnap01Cap] = useState<number>(5);

  // APSP (Floyd-Warshall) preset
  const defaultAPSPMatrix = [
    [0, 3, 999, 7],
    [8, 0, 2, 999],
    [5, 999, 0, 1],
    [2, 999, 999, 0],
  ];
  const defaultAPSPNodes = ['1', '2', '3', '4'];

  // Optimal BST preset
  const defaultObstKeys = ['10', '20', '30', '40'];
  const defaultObstFreq = [4, 2, 6, 3];

  // N-Queens preset
  const [nQueensSize, setNQueensSize] = useState<number>(4);

  // Sum of Subsets preset
  const [subsetsArr, setSubsetsArr] = useState<number[]>([10, 7, 5, 18, 12, 20, 15]);
  const [subsetsTarget, setSubsetsTarget] = useState<number>(35);

  // Graph Coloring preset
  const [mColors, setMColors] = useState<number>(3);

  // Apply custom array input handler
  const handleApplyCustomArray = () => {
    try {
      const parsed = rawArrayInput
        .split(',')
        .map((s) => Number(s.trim()))
        .filter((n) => !isNaN(n));
      if (parsed.length > 0) {
        if (labId === 'linear-search') setLinearArr(parsed);
        else if (labId === 'min-max') setMinMaxArr(parsed);
        else if (labId === 'check-sorted') setCheckSortedArr(parsed);
        else if (labId === 'binary-search') setBinaryArr([...parsed].sort((a, b) => a - b));
        else if (labId === 'merge-sort') setMergeArr(parsed);
        else if (labId === 'quick-sort') setQuickArr(parsed);
        soundFx.playSuccess();
      }
    } catch {
      // Ignored
    }
  };

  const handleRandomizeArray = () => {
    const randoms = Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10);
    setRawArrayInput(randoms.join(', '));
    if (labId === 'linear-search') {
      setLinearArr(randoms);
      setLinearKey(randoms[Math.floor(Math.random() * randoms.length)]);
    } else if (labId === 'min-max') {
      setMinMaxArr(randoms);
    } else if (labId === 'check-sorted') {
      setCheckSortedArr(randoms);
    } else if (labId === 'binary-search') {
      const sorted = [...randoms].sort((a, b) => a - b);
      setBinaryArr(sorted);
      setBinaryKey(sorted[Math.floor(sorted.length / 2)]);
    } else if (labId === 'merge-sort') {
      setMergeArr(randoms);
    } else if (labId === 'quick-sort') {
      setQuickArr(randoms);
    }
    soundFx.playStep();
  };

  // Compute the current execution trace based on labId
  const trace = React.useMemo(() => {
    switch (labId) {
      case 'linear-search':
        return traceLinearSearch(linearArr, linearKey);
      case 'min-max':
        return traceMinMax(minMaxArr);
      case 'check-sorted':
        return traceCheckSorted(checkSortedArr);
      case 'power-recursion':
        return tracePowerRecursion(powerX, powerN);
      case 'asymptotic-analysis':
        return traceLinearSearch([1, 2, 3, 4, 5, 6, 7, 8], 6);
      case 'binary-search':
        return traceBinarySearch(binaryArr, binaryKey);
      case 'merge-sort':
        return traceMergeSort(mergeArr);
      case 'quick-sort':
        return traceQuickSort(quickArr);
      case 'dijkstra-sssp':
        return traceDijkstra(defaultGraphMatrix, graphStartNode, defaultGraphNodes);
      case 'prim-mst':
        return tracePrimMST(defaultGraphMatrix, defaultGraphNodes);
      case 'job-sequencing':
        return traceJobSequencing(defaultJobs);
      case 'fractional-knapsack':
        return traceFractionalKnapsack(fracItems, fracCapacity);
      case 'knapsack-01-dp':
        return trace01Knapsack(knap01Weights, knap01Values, knap01Cap);
      case 'all-pairs-shortest-path':
        return traceAllPairsShortestPath(defaultAPSPMatrix, defaultAPSPNodes);
      case 'optimal-bst':
        return traceOptimalBST(defaultObstKeys, defaultObstFreq);
      case 'bfs-traversal':
        return traceBFS(defaultGraphMatrix, graphStartNode, defaultGraphNodes);
      case 'dfs-traversal':
        return traceDFS(defaultGraphMatrix, graphStartNode, defaultGraphNodes);
      case 'hamiltonian-cycle':
        return traceHamiltonianCycle(
          [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 1, 1],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
          ],
          graphStartNode % 5,
          ['0', '1', '2', '3', '4']
        );
      case 'graph-coloring':
        return traceGraphColoring(
          [
            [0, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 1],
            [1, 0, 1, 0],
          ],
          mColors,
          ['0', '1', '2', '3']
        );
      case 'n-queens':
        return traceNQueens(nQueensSize);
      case 'sum-of-subsets':
        return traceSumOfSubsets(subsetsArr, subsetsTarget);
      default:
        return traceLinearSearch([1, 2, 3], 2);
    }
  }, [
    labId,
    linearArr,
    linearKey,
    minMaxArr,
    checkSortedArr,
    powerX,
    powerN,
    binaryArr,
    binaryKey,
    mergeArr,
    quickArr,
    graphStartNode,
    fracItems,
    fracCapacity,
    knap01Weights,
    knap01Values,
    knap01Cap,
    nQueensSize,
    subsetsArr,
    subsetsTarget,
    mColors,
  ]);

  // Reset step index whenever labId or trace changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [labId, trace]);

  // Playback timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= trace.totalSteps - 1) {
            setIsPlaying(false);
            soundFx.playSuccess();
            return prev;
          }
          soundFx.playStep();
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playbackSpeed, trace.totalSteps]);

  // Active step
  const activeStep = trace.steps[currentStepIndex] || trace.steps[0];

  // Mark completion if user reaches end of steps
  useEffect(() => {
    if (currentStepIndex >= trace.totalSteps - 1 && !isCompleted) {
      onMarkComplete(labId);
    }
  }, [currentStepIndex, trace.totalSteps, isCompleted, onMarkComplete, labId]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 min-h-screen">
      {/* Lab Header & Navigation Strip */}
      <div className="px-6 py-5 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{meta.category}</span>
              <span aria-hidden="true">·</span>
              <span>{meta.paradigm}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-sky-700 font-semibold">{meta.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {meta.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-4xl mt-1 leading-relaxed">
              {meta.summary}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lab Completed</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onMarkComplete(labId);
                  soundFx.playSuccess();
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>

        {/* View Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-1 mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'visual'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Interactive Simulation Lab
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Java Code Execution Tracing
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'theory'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Complexity & Recurrence Invariants
          </button>
          <button
            onClick={() => setActiveTab('casestudy')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'casestudy'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Industry Case Study
          </button>
        </div>
      </div>

      {/* Main Workspace Body - 100% full width layout */}
      <div className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Interactive Lab Input Configurator Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-semibold shrink-0">
            <Sliders className="w-4 h-4 text-sky-600" />
            <span>Interactive Input Configurator:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Array Labs custom input */}
            {[
              'linear-search',
              'min-max',
              'check-sorted',
              'binary-search',
              'merge-sort',
              'quick-sort',
            ].includes(labId) && (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={rawArrayInput}
                  onChange={(e) => setRawArrayInput(e.target.value)}
                  placeholder="e.g. 15, 42, 8, 23"
                  className="px-2.5 py-1 border border-slate-300 rounded font-mono text-xs w-44 sm:w-56"
                />
                <button
                  onClick={handleApplyCustomArray}
                  className="px-2.5 py-1 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition-colors"
                >
                  Apply Array
                </button>
                <button
                  onClick={handleRandomizeArray}
                  title="Generate Random Array"
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>
            )}

            {labId === 'linear-search' && (
              <div className="flex items-center gap-1.5 ml-2">
                <span>Key:</span>
                <input
                  type="number"
                  value={linearKey}
                  onChange={(e) => setLinearKey(Number(e.target.value))}
                  className="w-14 px-1.5 py-1 border border-slate-300 rounded font-mono text-center"
                />
              </div>
            )}

            {labId === 'binary-search' && (
              <div className="flex items-center gap-1.5 ml-2">
                <span>Key:</span>
                <input
                  type="number"
                  value={binaryKey}
                  onChange={(e) => setBinaryKey(Number(e.target.value))}
                  className="w-14 px-1.5 py-1 border border-slate-300 rounded font-mono text-center"
                />
              </div>
            )}

            {labId === 'power-recursion' && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span>Base x:</span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={powerX}
                    onChange={(e) => setPowerX(Number(e.target.value))}
                    className="w-14 px-1.5 py-1 border border-slate-300 rounded font-mono text-center"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Exponent n:</span>
                  <input
                    type="number"
                    min={0}
                    max={6}
                    value={powerN}
                    onChange={(e) => setPowerN(Number(e.target.value))}
                    className="w-14 px-1.5 py-1 border border-slate-300 rounded font-mono text-center"
                  />
                </div>
              </div>
            )}

            {[
              'dijkstra-sssp',
              'prim-mst',
              'bfs-traversal',
              'dfs-traversal',
              'hamiltonian-cycle',
            ].includes(labId) && (
              <div className="flex items-center gap-2">
                <span>Source / Starting Node:</span>
                <select
                  value={graphStartNode}
                  onChange={(e) => {
                    setGraphStartNode(Number(e.target.value));
                    soundFx.playStep();
                  }}
                  className="px-2.5 py-1 border border-slate-300 rounded font-mono font-semibold"
                >
                  {defaultGraphNodes.map((n, idx) => (
                    <option key={idx} value={idx}>
                      Vertex {n}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {labId === 'fractional-knapsack' && (
              <div className="flex items-center gap-3">
                <span>Knapsack Capacity W:</span>
                <input
                  type="range"
                  min={10}
                  max={70}
                  step={5}
                  value={fracCapacity}
                  onChange={(e) => setFracCapacity(Number(e.target.value))}
                  className="accent-sky-600"
                />
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {fracCapacity} units
                </span>
              </div>
            )}

            {labId === 'n-queens' && (
              <div className="flex items-center gap-2">
                <span>Board Dimension N:</span>
                <select
                  value={nQueensSize}
                  onChange={(e) => {
                    setNQueensSize(Number(e.target.value));
                    soundFx.playStep();
                  }}
                  className="px-2.5 py-1 border border-slate-300 rounded font-mono font-semibold"
                >
                  <option value={4}>4 × 4 Board</option>
                  <option value={5}>5 × 5 Board</option>
                  <option value={6}>6 × 6 Board</option>
                  <option value={7}>7 × 7 Board</option>
                  <option value={8}>8 × 8 Board</option>
                </select>
              </div>
            )}

            {labId === 'graph-coloring' && (
              <div className="flex items-center gap-2">
                <span>Colors (m):</span>
                <select
                  value={mColors}
                  onChange={(e) => setMColors(Number(e.target.value))}
                  className="px-2.5 py-1 border border-slate-300 rounded font-mono font-semibold"
                >
                  <option value={2}>m = 2 Colors</option>
                  <option value={3}>m = 3 Colors (Valid)</option>
                  <option value={4}>m = 4 Colors</option>
                </select>
              </div>
            )}

            {labId === 'sum-of-subsets' && (
              <div className="flex items-center gap-2">
                <span>Target Sum:</span>
                <input
                  type="number"
                  min={10}
                  max={60}
                  value={subsetsTarget}
                  onChange={(e) => setSubsetsTarget(Number(e.target.value))}
                  className="w-18 px-2 py-1 border border-slate-300 rounded font-mono text-center font-bold"
                />
              </div>
            )}
          </div>
        </div>

        {/* Playback Scrubbing Toolbar */}
        <PlaybackControls
          currentStep={currentStepIndex}
          totalSteps={trace.totalSteps}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onStepNext={() => setCurrentStepIndex((p) => Math.min(p + 1, trace.totalSteps - 1))}
          onStepPrev={() => setCurrentStepIndex((p) => Math.max(p - 1, 0))}
          onReset={() => {
            setIsPlaying(false);
            setCurrentStepIndex(0);
          }}
          onJumpToEnd={() => {
            setIsPlaying(false);
            setCurrentStepIndex(trace.totalSteps - 1);
          }}
          onChangeSpeed={(s) => setPlaybackSpeed(s)}
          onSeek={(idx) => {
            setIsPlaying(false);
            setCurrentStepIndex(idx);
          }}
        />

        {/* Tab 1: Visual Interactive Stage & Code Tracing */}
        {(activeTab === 'visual' || activeTab === 'code') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Canvas (7 cols on large desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Specialized visualizers */}
              {labId === 'linear-search' && (
                <ArrayVisualizer
                  arr={(activeStep.data as LinearSearchData).arr}
                  currentIndex={(activeStep.data as LinearSearchData).currentIndex}
                  foundIndex={(activeStep.data as LinearSearchData).foundIndex}
                  pointers={[
                    ...(activeStep.data as LinearSearchData).currentIndex !== null
                      ? [{ label: 'i', index: (activeStep.data as LinearSearchData).currentIndex!, color: 'sky' }]
                      : [],
                  ]}
                />
              )}

              {labId === 'min-max' && (
                <ArrayVisualizer
                  arr={(activeStep.data as MinMaxData).arr}
                  currentIndex={(activeStep.data as MinMaxData).currentIndex}
                  pointers={[
                    ...(activeStep.data as MinMaxData).currentIndex !== null
                      ? [{ label: 'i', index: (activeStep.data as MinMaxData).currentIndex!, color: 'sky' }]
                      : [],
                  ]}
                />
              )}

              {labId === 'check-sorted' && (
                <ArrayVisualizer
                  arr={(activeStep.data as CheckSortedData).arr}
                  currentIndex={(activeStep.data as CheckSortedData).currentIndex}
                  failedIndices={(activeStep.data as CheckSortedData).failedPair}
                  pointers={[
                    ...(activeStep.data as CheckSortedData).currentIndex !== null
                      ? [
                          { label: 'i', index: (activeStep.data as CheckSortedData).currentIndex!, color: 'sky' },
                          { label: 'i+1', index: (activeStep.data as CheckSortedData).currentIndex! + 1, color: 'amber' },
                        ]
                      : [],
                  ]}
                />
              )}

              {labId === 'power-recursion' && (
                <CallStackVisualizer
                  x={(activeStep.data as PowerRecursionData).x}
                  n={(activeStep.data as PowerRecursionData).n}
                  callStack={(activeStep.data as PowerRecursionData).callStack}
                  activeCallId={(activeStep.data as PowerRecursionData).activeCallId}
                  finalResult={(activeStep.data as PowerRecursionData).finalResult}
                />
              )}

              {labId === 'asymptotic-analysis' && (
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Asymptotic Notation Visual Reference Matrix:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="font-bold text-slate-900">Big O (O)</div>
                      <div className="text-[11px] text-slate-500">Worst Case Upper Bound</div>
                      <div className="font-mono text-rose-700 mt-1 font-bold">f(n) ≤ c · g(n)</div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="font-bold text-slate-900">Big Omega (Ω)</div>
                      <div className="text-[11px] text-slate-500">Best Case Lower Bound</div>
                      <div className="font-mono text-emerald-700 mt-1 font-bold">f(n) ≥ c · g(n)</div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="font-bold text-slate-900">Big Theta (Θ)</div>
                      <div className="text-[11px] text-slate-500">Tight Asymptotic Bound</div>
                      <div className="font-mono text-sky-700 mt-1 font-bold">c1·g ≤ f ≤ c2·g</div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="font-bold text-slate-900">Little o (o)</div>
                      <div className="text-[11px] text-slate-500">Strict Non-Tight Upper</div>
                      <div className="font-mono text-purple-700 mt-1 font-bold">f(n) &lt; c · g(n)</div>
                    </div>
                  </div>
                </div>
              )}

              {labId === 'binary-search' && (
                <ArrayVisualizer
                  arr={(activeStep.data as BinarySearchData).arr}
                  activeRange={[
                    (activeStep.data as BinarySearchData).low,
                    (activeStep.data as BinarySearchData).high,
                  ]}
                  foundIndex={(activeStep.data as BinarySearchData).foundIndex}
                  pointers={[
                    { label: 'low', index: (activeStep.data as BinarySearchData).low, color: 'sky' },
                    ...(activeStep.data as BinarySearchData).mid !== null
                      ? [{ label: 'mid', index: (activeStep.data as BinarySearchData).mid!, color: 'amber' }]
                      : [],
                    { label: 'high', index: (activeStep.data as BinarySearchData).high, color: 'purple' },
                  ]}
                />
              )}

              {labId === 'merge-sort' && (
                <ArrayVisualizer
                  arr={(activeStep.data as MergeSortData).arr}
                  activeRange={(activeStep.data as MergeSortData).activeSubarray}
                  mergeBuffer={(activeStep.data as MergeSortData).mergeBuffer}
                  pointers={[
                    { label: 'left', index: (activeStep.data as MergeSortData).left, color: 'sky' },
                    ...(activeStep.data as MergeSortData).mid !== undefined
                      ? [{ label: 'mid', index: (activeStep.data as MergeSortData).mid!, color: 'amber' }]
                      : [],
                    { label: 'right', index: (activeStep.data as MergeSortData).right, color: 'purple' },
                  ]}
                />
              )}

              {labId === 'quick-sort' && (
                <ArrayVisualizer
                  arr={(activeStep.data as QuickSortData).arr}
                  pivotIndex={(activeStep.data as QuickSortData).pivotIndex}
                  pointers={[
                    ...(activeStep.data as QuickSortData).pivotIndex !== null
                      ? [{ label: 'pivot', index: (activeStep.data as QuickSortData).pivotIndex!, color: 'purple' }]
                      : [],
                    ...(activeStep.data as QuickSortData).start !== null
                      ? [{ label: 'start', index: (activeStep.data as QuickSortData).start!, color: 'sky' }]
                      : [],
                    ...(activeStep.data as QuickSortData).end !== null
                      ? [{ label: 'end', index: (activeStep.data as QuickSortData).end!, color: 'amber' }]
                      : [],
                  ]}
                />
              )}

              {labId === 'dijkstra-sssp' && (
                <GraphVisualizer
                  matrix={(activeStep.data as DijkstraData).matrix}
                  nodeNames={(activeStep.data as DijkstraData).nodeNames}
                  visited={(activeStep.data as DijkstraData).visited}
                  currentNode={(activeStep.data as DijkstraData).currentNode}
                  relaxingEdge={(activeStep.data as DijkstraData).relaxingEdge}
                  distances={(activeStep.data as DijkstraData).dist}
                  onSelectNode={(nIdx) => setGraphStartNode(nIdx)}
                />
              )}

              {labId === 'prim-mst' && (
                <GraphVisualizer
                  matrix={(activeStep.data as PrimMSTData).matrix}
                  nodeNames={(activeStep.data as PrimMSTData).nodeNames}
                  visited={(activeStep.data as PrimMSTData).inMST}
                  currentNode={(activeStep.data as PrimMSTData).currentNode}
                  mstEdges={(activeStep.data as PrimMSTData).mstEdges}
                  onSelectNode={(nIdx) => setGraphStartNode(nIdx)}
                />
              )}

              {labId === 'job-sequencing' && (
                <TimelineVisualizer
                  timelineSlots={(activeStep.data as JobSequencingData).timelineSlots}
                  totalProfit={(activeStep.data as JobSequencingData).totalProfit}
                  sortedJobs={(activeStep.data as JobSequencingData).sortedJobs}
                  currentJobIndex={(activeStep.data as JobSequencingData).currentJobIndex}
                />
              )}

              {labId === 'fractional-knapsack' && (
                <KnapsackVisualizer
                  items={(activeStep.data as FractionalKnapsackData).items}
                  capacity={(activeStep.data as FractionalKnapsackData).capacity}
                  remainingCapacity={(activeStep.data as FractionalKnapsackData).remainingCapacity}
                  totalValue={(activeStep.data as FractionalKnapsackData).totalValue}
                  currentItemIndex={(activeStep.data as FractionalKnapsackData).currentItemIndex}
                />
              )}

              {labId === 'knapsack-01-dp' && (
                <DPTableVisualizer
                  title="0/1 Knapsack DP Matrix dp[i][w]"
                  matrix={(activeStep.data as Knapsack01Data).dpTable}
                  weights={knap01Weights}
                  values={knap01Values}
                  rowLabels={Array.from({ length: (activeStep.data as Knapsack01Data).weights.length + 1 }, (_, i) =>
                    i === 0 ? '0 (No Item)' : `Item ${i} (W${(activeStep.data as Knapsack01Data).weights[i - 1]}, V$${(activeStep.data as Knapsack01Data).values[i - 1]})`
                  )}
                  colLabels={Array.from({ length: (activeStep.data as Knapsack01Data).capacity + 1 }, (_, w) => `W=${w}`)}
                  activeCell={
                    (activeStep.data as Knapsack01Data).currentI !== null
                      ? [(activeStep.data as Knapsack01Data).currentI!, (activeStep.data as Knapsack01Data).currentW!]
                      : null
                  }
                  cellAction={(activeStep.data as Knapsack01Data).cellAction}
                />
              )}

              {labId === 'all-pairs-shortest-path' && (
                <DPTableVisualizer
                  title="Floyd-Warshall All-Pairs Matrix dp[i][j]"
                  matrix={(activeStep.data as APSPData).dpMatrix}
                  rowLabels={(activeStep.data as APSPData).nodeNames.map((n) => `From ${n}`)}
                  colLabels={(activeStep.data as APSPData).nodeNames.map((n) => `To ${n}`)}
                  pivotIndex={(activeStep.data as APSPData).k}
                  activeCell={
                    (activeStep.data as APSPData).i !== null
                      ? [(activeStep.data as APSPData).i!, (activeStep.data as APSPData).j!]
                      : null
                  }
                />
              )}

              {labId === 'optimal-bst' && (
                <DPTableVisualizer
                  title="Optimal BST Subproblem Cost Matrix dp[i][j]"
                  matrix={(activeStep.data as ObstData).dpTable}
                  rowLabels={(activeStep.data as ObstData).keys.map((k) => `Key ${k}`)}
                  colLabels={(activeStep.data as ObstData).keys.map((k) => `Key ${k}`)}
                  activeCell={
                    (activeStep.data as ObstData).i !== null
                      ? [(activeStep.data as ObstData).i!, (activeStep.data as ObstData).j!]
                      : null
                  }
                />
              )}

              {labId === 'bfs-traversal' && (
                <GraphVisualizer
                  matrix={(activeStep.data as TraversalData).matrix}
                  nodeNames={(activeStep.data as TraversalData).nodeNames}
                  visited={(activeStep.data as TraversalData).visited}
                  currentNode={(activeStep.data as TraversalData).currentVertex}
                  queueOrStack={(activeStep.data as TraversalData).queueOrStack}
                  isQueue={true}
                  onSelectNode={(nIdx) => setGraphStartNode(nIdx)}
                />
              )}

              {labId === 'dfs-traversal' && (
                <GraphVisualizer
                  matrix={(activeStep.data as TraversalData).matrix}
                  nodeNames={(activeStep.data as TraversalData).nodeNames}
                  visited={(activeStep.data as TraversalData).visited}
                  currentNode={(activeStep.data as TraversalData).currentVertex}
                  queueOrStack={(activeStep.data as TraversalData).queueOrStack}
                  isQueue={false}
                  onSelectNode={(nIdx) => setGraphStartNode(nIdx)}
                />
              )}

              {labId === 'hamiltonian-cycle' && (
                <GraphVisualizer
                  matrix={(activeStep.data as HamiltonianData).matrix}
                  nodeNames={(activeStep.data as HamiltonianData).nodeNames}
                  pathTrail={(activeStep.data as HamiltonianData).path.filter((p) => p !== -1)}
                  currentNode={(activeStep.data as HamiltonianData).candidateV}
                  onSelectNode={(nIdx) => setGraphStartNode(nIdx)}
                />
              )}

              {labId === 'graph-coloring' && (
                <GraphVisualizer
                  matrix={(activeStep.data as GraphColoringData).matrix}
                  nodeNames={(activeStep.data as GraphColoringData).nodeNames}
                  nodeColors={(activeStep.data as GraphColoringData).color}
                  currentNode={(activeStep.data as GraphColoringData).currentV}
                />
              )}

              {labId === 'n-queens' && (
                <ChessboardVisualizer
                  n={(activeStep.data as NQueensData).n}
                  board={(activeStep.data as NQueensData).board}
                  currentRow={(activeStep.data as NQueensData).currentRow}
                  currentCol={(activeStep.data as NQueensData).currentCol}
                  conflictLocation={(activeStep.data as NQueensData).conflictLocation}
                  solutionCount={(activeStep.data as NQueensData).solutionCount}
                  isSolved={(activeStep.data as NQueensData).isSolved}
                />
              )}

              {labId === 'sum-of-subsets' && (
                <SubsetTreeVisualizer
                  arr={(activeStep.data as SumOfSubsetsData).arr}
                  target={(activeStep.data as SumOfSubsetsData).target}
                  currentSum={(activeStep.data as SumOfSubsetsData).currentSum}
                  currentSubset={(activeStep.data as SumOfSubsetsData).currentSubset}
                  foundSubsets={(activeStep.data as SumOfSubsetsData).foundSubsets}
                  branchType={(activeStep.data as SumOfSubsetsData).branchType}
                />
              )}

              {/* State & Metrics Inspector */}
              <VariableInspector
                variables={activeStep.variables}
                metrics={activeStep.metrics}
              />
            </div>

            {/* Code Companion & Theoretical Cards (5 cols on large desktop) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <CodeViewer
                labId={labId}
                activeLine={activeStep.activeLine}
                explanation={activeStep.description}
              />

              <ComplexityCard
                complexity={meta.complexity}
                syllabusRef={meta.syllabusReference}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Theory & Invariants */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <ComplexityCard
              complexity={meta.complexity}
              syllabusRef={meta.syllabusReference}
            />

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Fundamental Loop Invariants & Mathematical Guarantees:
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 list-disc list-inside">
                {meta.keyInvariants.map((inv, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="font-semibold text-slate-800">Invariant #{idx + 1}: </span>
                    {inv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Case Study */}
        {activeTab === 'casestudy' && (
          <div className="space-y-6">
            <CaseStudyPanel caseStudy={meta.caseStudy} />
          </div>
        )}
      </div>
    </div>
  );
};
