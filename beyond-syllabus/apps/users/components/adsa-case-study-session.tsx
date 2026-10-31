'use client';

import { useState } from 'react';
import {
  Activity,
  Binary,
  Cpu,
  Layers,
  Network,
  Sliders,
  Sparkles
} from 'lucide-react';
import {
  adsaCaseUnits,
  u1Questions,
  u2Questions,
  u3Questions,
  u4Questions,
  type AdsaUnitId
} from '@/lib/adsa-case-study-session';
import '@/app/adsa-case-study.css';

interface AdsaCaseStudySessionProps {
  initialUnit?: AdsaUnitId;
}

export function AdsaCaseStudySession({ initialUnit = 1 }: AdsaCaseStudySessionProps) {
  const [selectedUnit, setSelectedUnit] = useState<AdsaUnitId>(initialUnit);

  // --- UNIT 1 STATE: IoT Telemetry & Master Recurrence ---
  const [u1BatchSize, setU1BatchSize] = useState<number>(2000);
  const [u1InjectInversion, setU1InjectInversion] = useState<boolean>(false);
  const [u1Answers, setU1Answers] = useState<Record<string, number>>({});

  const u1NaiveComparisons = 2 * u1BatchSize - 2;
  const u1DualExtremaComparisons = Math.ceil((3 * u1BatchSize) / 2) - 2;
  const u1SavingsPercent = Math.round(
    ((u1NaiveComparisons - u1DualExtremaComparisons) / u1NaiveComparisons) * 100
  );

  // --- UNIT 2 STATE: Trading Ledger Divide & Conquer ---
  const [u2Records, setU2Records] = useState<number>(10000);
  const [u2Distribution, setU2Distribution] = useState<'random' | 'presorted' | 'reverse'>('random');
  const [u2Answers, setU2Answers] = useState<Record<string, number>>({});

  const u2MergeSortOps = Math.round(u2Records * Math.log2(u2Records));
  const u2QuickSortOps =
    u2Distribution === 'presorted' || u2Distribution === 'reverse'
      ? Math.round(u2Records * u2Records * 0.5)
      : Math.round(u2Records * Math.log2(u2Records) * 1.38);

  // --- UNIT 3 STATE: Autonomous Fleet Greedy Routing ---
  const [u3DronePayload, setU3DronePayload] = useState<number>(45);
  const [u3WaypointCount, setU3WaypointCount] = useState<number>(12);
  const [u3Answers, setU3Answers] = useState<Record<string, number>>({});

  const u3DijkstraOps = Math.round(u3WaypointCount * Math.log2(u3WaypointCount) * 4);
  const u3ProfitEarned = Math.round(u3DronePayload * 82.5);

  // --- UNIT 4 STATE: Multi-Tenant DP Resource Matrix ---
  const [u4MemCap, setU4MemCap] = useState<number>(64);
  const [u4ServerCount, setU4ServerCount] = useState<number>(8);
  const [u4Answers, setU4Answers] = useState<Record<string, number>>({});

  const u4FloydWarshallOps = Math.pow(u4ServerCount, 3);
  const u4KnapsackTableCells = u4ServerCount * u4MemCap;

  const handleAnswer = (
    unitId: AdsaUnitId,
    questionId: string,
    optionIndex: number
  ) => {
    if (unitId === 1) setU1Answers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (unitId === 2) setU2Answers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (unitId === 3) setU3Answers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (unitId === 4) setU4Answers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  return (
    <div className="adsa-case-shell">
      {/* Hero Banner */}
      <section className="adsa-case-hero">
        <div>
          <div className="adsa-case-kicker">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Algorithmic Design & Optimization Studio</span>
          </div>
          <h1>High-Scale Algorithm Engineering & Invariant Profiling</h1>
          <p>
            Investigate real-world algorithmic challenges in IoT telemetry streaming, trading ledger sorting,
            autonomous drone fleet networks, and cloud compute state-space exploration.
          </p>
        </div>

        <div className="adsa-case-hero__console">
          <div className="adsa-case-hero__console-top">
            <div className="flex items-center gap-2">
              <span />
              <small>ALGO-ENGINE // KERNEL</small>
            </div>
            <Binary className="w-4 h-4 text-amber-400" />
          </div>
          <div className="adsa-case-hero__console-body">
            <code>
              &gt; Recurrence: T(n) = aT(n/b) + f(n)<br />
              &gt; Master Thm: Critical log_b(a)<br />
              &gt; Dual Extrema: 3*floor(n/2) - 2<br />
              &gt; Status: ASYMPTOTICALLY BOUNDED
            </code>
          </div>
        </div>
      </section>

      {/* 4 Unit Navigation Strip */}
      <nav className="adsa-unit-nav" aria-label="Choose ADSA Unit Investigation">
        {adsaCaseUnits.map(unit => {
          const isSelected = selectedUnit === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              className="adsa-unit-tab"
              aria-selected={isSelected}
            >
              <Cpu className="w-5 h-5" />
              <span>
                <strong>{unit.title.split(':')[0]}</strong>
                <small>{unit.badge}</small>
              </span>
            </button>
          );
        })}
      </nav>

      {/* UNIT 1: IoT Stream Invariants & Master Recurrences */}
      {selectedUnit === 1 && (
        <section className="adsa-lab-card">
          <header>
            <div>
              <div className="adsa-case-kicker">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Unit 1 Exploration</span>
              </div>
              <h2>High-Throughput IoT Invariant Verification Engine</h2>
              <p>
                An edge gateway ingests telemetry packets at 100,000 packets/sec. Compare naive sequential checking
                against single-pass sliding verification and pairwise dual extremum extraction.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="adsa-control-box">
              <label>
                <span>Telemetry Ingestion Batch Size (n)</span>
                <span className="font-mono text-amber-600 font-bold">{u1BatchSize.toLocaleString()} packets</span>
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={u1BatchSize}
                onChange={e => setU1BatchSize(Number(e.target.value))}
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Simulate Sequence Inversion:</span>
                <button
                  onClick={() => setU1InjectInversion(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    u1InjectInversion ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {u1InjectInversion ? 'INVERSION INJECTED (FAIL)' : 'CLEAN STREAM (PASS)'}
                </button>
              </div>
            </div>

            <div className="adsa-metrics-row">
              <div className="adsa-metric-box">
                <label>Naive Comparisons (2n - 2)</label>
                <strong>{u1NaiveComparisons.toLocaleString()}</strong>
                <small>Two independent linear passes</small>
              </div>
              <div className="adsa-metric-box">
                <label>Pairwise Dual Extrema</label>
                <strong className="text-amber-600">{u1DualExtremaComparisons.toLocaleString()}</strong>
                <small>{u1SavingsPercent}% fewer comparison cycles</small>
              </div>
            </div>
          </div>

          <div className="adsa-questions-grid">
            <h3 className="text-sm font-bold tracking-tight text-slate-800">Unit 1 Verification Checklist:</h3>
            {u1Questions.map(q => {
              const selectedOpt = u1Answers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.answer;

              return (
                <div key={q.id} className="adsa-question-card">
                  <h3>{q.prompt}</h3>
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(1, q.id, idx)}
                      disabled={isAnswered}
                      className={`adsa-option-btn ${
                        isAnswered ? (idx === q.answer ? 'correct' : idx === selectedOpt ? 'wrong' : '') : ''
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                  {isAnswered && (
                    <div className={`adsa-feedback ${isCorrect ? 'correct' : ''}`}>
                      <strong>{isCorrect ? '✓ Correct Verification' : '✗ Review Asymptotic Concept:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* UNIT 2: Trading Ledger Divide & Conquer */}
      {selectedUnit === 2 && (
        <section className="adsa-lab-card">
          <header>
            <div>
              <div className="adsa-case-kicker">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>Unit 2 Exploration</span>
              </div>
              <h2>High-Volume Order Matching Ledger: Divide & Conquer</h2>
              <p>
                A financial matching engine sorts incoming trade orders by timestamp and price. Analyze stable Merge Sort
                vs in-place Hoare Partition Quick Sort under varied input distributions.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="adsa-control-box">
              <label>
                <span>Ledger Record Count (n)</span>
                <span className="font-mono text-amber-600 font-bold">{u2Records.toLocaleString()} orders</span>
              </label>
              <input
                type="range"
                min="1000"
                max="30000"
                step="1000"
                value={u2Records}
                onChange={e => setU2Records(Number(e.target.value))}
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Input Order Distribution:</span>
                <div className="flex gap-1.5">
                  {(['random', 'presorted', 'reverse'] as const).map(dist => (
                    <button
                      key={dist}
                      onClick={() => setU2Distribution(dist)}
                      className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                        u2Distribution === dist ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="adsa-metrics-row">
              <div className="adsa-metric-box">
                <label>Merge Sort Ops (O(n log n))</label>
                <strong className="text-emerald-600">{u2MergeSortOps.toLocaleString()}</strong>
                <small>Guaranteed stable across all orders</small>
              </div>
              <div className="adsa-metric-box">
                <label>Quick Sort Ops</label>
                <strong className={u2Distribution === 'presorted' || u2Distribution === 'reverse' ? 'text-rose-600' : 'text-amber-600'}>
                  {u2QuickSortOps.toLocaleString()}
                </strong>
                <small>
                  {u2Distribution === 'presorted' || u2Distribution === 'reverse'
                    ? 'O(n²) DEGRADATION TRIGGERED'
                    : 'Cache-optimal in-place'}
                </small>
              </div>
            </div>
          </div>

          <div className="adsa-questions-grid">
            <h3 className="text-sm font-bold tracking-tight text-slate-800">Unit 2 Verification Checklist:</h3>
            {u2Questions.map(q => {
              const selectedOpt = u2Answers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.answer;

              return (
                <div key={q.id} className="adsa-question-card">
                  <h3>{q.prompt}</h3>
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(2, q.id, idx)}
                      disabled={isAnswered}
                      className={`adsa-option-btn ${
                        isAnswered ? (idx === q.answer ? 'correct' : idx === selectedOpt ? 'wrong' : '') : ''
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                  {isAnswered && (
                    <div className={`adsa-feedback ${isCorrect ? 'correct' : ''}`}>
                      <strong>{isCorrect ? '✓ Correct Verification' : '✗ Review Divide & Conquer Invariant:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* UNIT 3: Autonomous Fleet Greedy Routing */}
      {selectedUnit === 3 && (
        <section className="adsa-lab-card">
          <header>
            <div>
              <div className="adsa-case-kicker">
                <Network className="w-3.5 h-3.5 text-amber-500" />
                <span>Unit 3 Exploration</span>
              </div>
              <h2>Autonomous Cargo Drone Fleet: Greedy Optimization</h2>
              <p>
                Dispatch delivery drones through weather-impacted aerial corridors using Dijkstra SSSP edge relaxation,
                construct minimum spanning communication networks via Prim’s cut property, and pack payloads greedily.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="adsa-control-box">
              <label>
                <span>Cargo Drone Payload (kg)</span>
                <span className="font-mono text-amber-600 font-bold">{u3DronePayload} kg</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={u3DronePayload}
                onChange={e => setU3DronePayload(Number(e.target.value))}
              />

              <div className="mt-4">
                <label>
                  <span>Aerial Waypoints Count (|V|)</span>
                  <span className="font-mono text-amber-600 font-bold">{u3WaypointCount} nodes</span>
                </label>
                <input
                  type="range"
                  min="6"
                  max="30"
                  step="2"
                  value={u3WaypointCount}
                  onChange={e => setU3WaypointCount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="adsa-metrics-row">
              <div className="adsa-metric-box">
                <label>Dijkstra Edge Relaxations</label>
                <strong>{u3DijkstraOps} ops</strong>
                <small>Min-heap priority routing</small>
              </div>
              <div className="adsa-metric-box">
                <label>Fractional Value Packed</label>
                <strong className="text-amber-600">${u3ProfitEarned.toLocaleString()}</strong>
                <small>Value-to-weight ratio sorted</small>
              </div>
            </div>
          </div>

          <div className="adsa-questions-grid">
            <h3 className="text-sm font-bold tracking-tight text-slate-800">Unit 3 Verification Checklist:</h3>
            {u3Questions.map(q => {
              const selectedOpt = u3Answers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.answer;

              return (
                <div key={q.id} className="adsa-question-card">
                  <h3>{q.prompt}</h3>
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(3, q.id, idx)}
                      disabled={isAnswered}
                      className={`adsa-option-btn ${
                        isAnswered ? (idx === q.answer ? 'correct' : idx === selectedOpt ? 'wrong' : '') : ''
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                  {isAnswered && (
                    <div className={`adsa-feedback ${isCorrect ? 'correct' : ''}`}>
                      <strong>{isCorrect ? '✓ Correct Verification' : '✗ Review Greedy Strategy:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* UNIT 4: Multi-Tenant Cloud Cluster Resource Matrix */}
      {selectedUnit === 4 && (
        <section className="adsa-lab-card">
          <header>
            <div>
              <div className="adsa-case-kicker">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Unit 4 Exploration</span>
              </div>
              <h2>Cloud Datacenter Cluster: Dynamic Programming & Backtracking</h2>
              <p>
                Allocate multi-tenant VM resources with 0/1 Knapsack DP state tables, compute all-pairs inter-region network
                latencies via Floyd-Warshall intermediate pivots, and prune state space trees for Hamiltonian server rings.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="adsa-control-box">
              <label>
                <span>Memory Capacity Constraint (GB)</span>
                <span className="font-mono text-amber-600 font-bold">{u4MemCap} GB</span>
              </label>
              <input
                type="range"
                min="16"
                max="256"
                step="16"
                value={u4MemCap}
                onChange={e => setU4MemCap(Number(e.target.value))}
              />

              <div className="mt-4">
                <label>
                  <span>Regional Datacenters (|V|)</span>
                  <span className="font-mono text-amber-600 font-bold">{u4ServerCount} regions</span>
                </label>
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="2"
                  value={u4ServerCount}
                  onChange={e => setU4ServerCount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="adsa-metrics-row">
              <div className="adsa-metric-box">
                <label>Floyd-Warshall Pivots (|V|³)</label>
                <strong>{u4FloydWarshallOps.toLocaleString()} ops</strong>
                <small>Triple-loop all-pairs DP table</small>
              </div>
              <div className="adsa-metric-box">
                <label>0/1 DP State Cells (n * W)</label>
                <strong className="text-amber-600">{u4KnapsackTableCells.toLocaleString()}</strong>
                <small>Memoized optimal subproblems</small>
              </div>
            </div>
          </div>

          <div className="adsa-questions-grid">
            <h3 className="text-sm font-bold tracking-tight text-slate-800">Unit 4 Verification Checklist:</h3>
            {u4Questions.map(q => {
              const selectedOpt = u4Answers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.answer;

              return (
                <div key={q.id} className="adsa-question-card">
                  <h3>{q.prompt}</h3>
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(4, q.id, idx)}
                      disabled={isAnswered}
                      className={`adsa-option-btn ${
                        isAnswered ? (idx === q.answer ? 'correct' : idx === selectedOpt ? 'wrong' : '') : ''
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                  {isAnswered && (
                    <div className={`adsa-feedback ${isCorrect ? 'correct' : ''}`}>
                      <strong>{isCorrect ? '✓ Correct Verification' : '✗ Review Dynamic Programming Recurrence:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
