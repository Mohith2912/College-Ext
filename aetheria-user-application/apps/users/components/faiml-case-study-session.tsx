'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Binary,
  BrainCircuit,
  Car,
  Activity,
  Home,
  GraduationCap,
  Check,
  CheckCircle2,
  Clock3,
  Layers,
  Network,
  RotateCcw,
  Sliders,
  Sparkles,
} from 'lucide-react';
import {
  faimlLearningGoals,
  faimlStages,
  incidentOptions,
  searchChallenges,
  candidateModels,
  thresholdScenarios,
  cohortClusters,
  faimlQuestions,
  faimlUnits,
  unit1Data,
  unit2Data,
  unit3Data,
  unit4Data,
  type FaimlStageId,
} from '@/lib/faiml-case-study-session';

const getStageIndex = (id: FaimlStageId) => faimlStages.findIndex(stage => stage.id === id);

interface FaimlCaseStudySessionProps {
  initialUnit?: 1 | 2 | 3 | 4 | 5;
}

export function FaimlCaseStudySession({ initialUnit = 1 }: FaimlCaseStudySessionProps) {
  const [selectedUnit, setSelectedUnit] = useState<1 | 2 | 3 | 4 | 5>(initialUnit);

  // --- UNIT 1 STATE: Autonomous Navigation & PEAS Search ---
  const [u1TrafficMultiplier, setU1TrafficMultiplier] = useState(1.6);
  const [u1Algorithm, setU1Algorithm] = useState<'A*' | 'Dijkstra' | 'DFS'>('A*');
  const [u1Answers, setU1Answers] = useState<Record<string, number>>({});
  const u1Completed = Object.keys(u1Answers).length === unit1Data.questions.length;
  const u1Score = unit1Data.questions.filter(q => u1Answers[q.id] === q.answer).length;

  // --- UNIT 2 STATE: Probabilistic Bayesian Medical Diagnostic ---
  const [patientFever, setPatientFever] = useState(true);
  const [patientCough, setPatientCough] = useState(true);
  const [patientAnosmia, setPatientAnosmia] = useState(false);
  const [patientFatigue, setPatientFatigue] = useState(true);
  const [u2Answers, setU2Answers] = useState<Record<string, number>>({});
  const u2Completed = Object.keys(u2Answers).length === unit2Data.questions.length;
  const u2Score = unit2Data.questions.filter(q => u2Answers[q.id] === q.answer).length;

  // Bayesian calculation
  const bayesCalc = useMemo(() => {
    const priorCovid = unit2Data.priorProbabilities.covid;
    const priorFlu = unit2Data.priorProbabilities.flu;
    const priorCold = unit2Data.priorProbabilities.cold;

    const likCovid =
      (patientFever ? 0.88 : 0.12) *
      (patientCough ? 0.82 : 0.18) *
      (patientAnosmia ? 0.68 : 0.32) *
      (patientFatigue ? 0.7 : 0.3);

    const likFlu =
      (patientFever ? 0.75 : 0.25) *
      (patientCough ? 0.8 : 0.2) *
      (patientAnosmia ? 0.1 : 0.9) *
      (patientFatigue ? 0.85 : 0.15);

    const likCold =
      (patientFever ? 0.2 : 0.8) *
      (patientCough ? 0.65 : 0.35) *
      (patientAnosmia ? 0.05 : 0.95) *
      (patientFatigue ? 0.25 : 0.75);

    const jointCovid = likCovid * priorCovid;
    const jointFlu = likFlu * priorFlu;
    const jointCold = likCold * priorCold;
    const totalJoint = jointCovid + jointFlu + jointCold;

    const pCovid = Math.round((jointCovid / totalJoint) * 100);
    const pFlu = Math.round((jointFlu / totalJoint) * 100);
    const pCold = Math.max(0, 100 - pCovid - pFlu);

    return { pCovid, pFlu, pCold };
  }, [patientFever, patientCough, patientAnosmia, patientFatigue]);

  // --- UNIT 3 STATE: Real Estate Multivariate Regression Pipeline ---
  const [houseArea, setHouseArea] = useState(1950);
  const [houseBedrooms, setHouseBedrooms] = useState(3);
  const [houseAge, setHouseAge] = useState(8);
  const [houseLocation, setHouseLocation] = useState<'Urban' | 'Suburban' | 'Rural'>('Suburban');
  const [ridgeLambda, setRidgeLambda] = useState(15);
  const [u3Answers, setU3Answers] = useState<Record<string, number>>({});
  const u3Completed = Object.keys(u3Answers).length === unit3Data.questions.length;
  const u3Score = unit3Data.questions.filter(q => u3Answers[q.id] === q.answer).length;

  const predictedPrice = useMemo(() => {
    const shrink = 1 - ridgeLambda / 250;
    const areaVal = houseArea * (unit3Data.weights.areaSqft * shrink);
    const bedsVal = houseBedrooms * (unit3Data.weights.bedrooms * shrink);
    const ageVal = houseAge * (Math.abs(unit3Data.weights.ageYear) * shrink);
    const locVal = unit3Data.locationPremiums[houseLocation];
    return Math.round(unit3Data.basePrice + areaVal + bedsVal - ageVal + locVal);
  }, [houseArea, houseBedrooms, houseAge, houseLocation, ridgeLambda]);

  // --- UNIT 4 STATE: Student Performance & K-Means Interventions ---
  const [clusterK, setClusterK] = useState(4);
  const [selectedClusterId, setSelectedClusterId] = useState(2);
  const [u4Answers, setU4Answers] = useState<Record<string, number>>({});
  const u4Completed = Object.keys(u4Answers).length === unit4Data.questions.length;
  const u4Score = unit4Data.questions.filter(q => u4Answers[q.id] === q.answer).length;

  const activeSilhouette = useMemo(() => {
    return unit4Data.silhouetteBenchmarks.find(b => b.k === clusterK) ?? unit4Data.silhouetteBenchmarks[2];
  }, [clusterK]);

  // --- UNIT 5 STATE: Clinical Diagnostic Sepsis-Risk Alerting Studio ---
  const [activeStage, setActiveStage] = useState<FaimlStageId>('incident');
  const [completedStages, setCompletedStages] = useState<FaimlStageId[]>([]);
  const completed = useMemo(() => new Set(completedStages), [completedStages]);
  const activeIndex = getStageIndex(activeStage);
  const progress = Math.round((completedStages.length / faimlStages.length) * 100);

  // Stage 1: Incident requirements
  const [incidentAnswers, setIncidentAnswers] = useState<string[]>([]);
  const incidentCorrect =
    incidentAnswers.length === 4 &&
    incidentOptions.filter(opt => opt.required).every(opt => incidentAnswers.includes(opt.id));

  // Stage 2: Heuristic search challenge
  const [searchAnswers, setSearchAnswers] = useState<Record<string, number>>({});
  const searchCorrect = searchChallenges.every(
    challenge => searchAnswers[challenge.id] === challenge.answer
  );

  // Stage 3: Candidate Model Architecture
  const [inspectedModelIndex, setInspectedModelIndex] = useState(0);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const modelCorrect = selectedModelId === 'gradient-boost';

  // Stage 4: Threshold Calibration
  const [selectedThresholdId, setSelectedThresholdId] = useState<string>('standard');
  const thresholdCorrect = selectedThresholdId === 'optimal';

  // Stage 5: Unsupervised Cohort Clustering
  const [inspectedCohortId, setInspectedCohortId] = useState<string>('cluster-1');
  const [flaggedDriftCohort, setFlaggedDriftCohort] = useState<string | null>(null);
  const clusteringCorrect = flaggedDriftCohort === 'cluster-3';

  // Stage 6: Debrief Questions
  const [debriefIndex, setDebriefIndex] = useState(0);
  const [debriefAnswers, setDebriefAnswers] = useState<Record<string, number>>({});
  const debriefComplete = Object.keys(debriefAnswers).length === faimlQuestions.length;
  const debriefScore = faimlQuestions.filter(q => debriefAnswers[q.id] === q.answer).length;

  const canComplete =
    activeStage === 'incident'
      ? incidentCorrect
      : activeStage === 'heuristics'
      ? searchCorrect
      : activeStage === 'pipeline'
      ? modelCorrect
      : activeStage === 'calibration'
      ? thresholdCorrect
      : activeStage === 'clustering'
      ? clusteringCorrect
      : debriefComplete;

  function openStage(id: FaimlStageId) {
    setActiveStage(id);
    document.querySelector('#faiml-case-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function completeAndAdvance() {
    setCompletedStages(prev => (prev.includes(activeStage) ? prev : [...prev, activeStage]));
    const next = faimlStages[activeIndex + 1];
    if (next) openStage(next.id);
  }

  function resetSession() {
    setActiveStage('incident');
    setCompletedStages([]);
    setIncidentAnswers([]);
    setSearchAnswers({});
    setInspectedModelIndex(0);
    setSelectedModelId(null);
    setSelectedThresholdId('standard');
    setInspectedCohortId('cluster-1');
    setFlaggedDriftCohort(null);
    setDebriefIndex(0);
    setDebriefAnswers({});
  }

  const currentThreshold =
    thresholdScenarios.find(item => item.id === selectedThresholdId) ?? thresholdScenarios[0];
  const currentModel = candidateModels[inspectedModelIndex];

  return (
    <div className="faiml-case-shell">
      {/* Hero Section */}
      <section className="faiml-case-hero" aria-labelledby="faiml-case-title">
        <div className="faiml-case-hero__copy">
          <p className="faiml-case-kicker">
            <BrainCircuit size={15} aria-hidden="true" /> Guided Systems Lab · AI & Machine Learning
          </p>
          <h1 id="faiml-case-title">Interactive Applied Case Studies Across All 5 Units</h1>
          <p>
            Explore real-world AI systems engineering: formulate autonomous vehicular search agents, calculate
            probabilistic Bayesian medical posteriors, train regularized property regression pipelines, cluster
            academic cohorts, and calibrate clinical alert decision thresholds.
          </p>
          <div className="faiml-case-hero__actions">
            <span>
              <Clock3 size={15} aria-hidden="true" /> 5 Units Available
            </span>
            <span>
              <BrainCircuit size={15} aria-hidden="true" /> 100% Interactive Simulators
            </span>
            <span>
              <CheckCircle2 size={15} aria-hidden="true" /> Complete Syllabus Coverage
            </span>
          </div>
        </div>

        {/* Live Telemetry Console */}
        <div className="faiml-case-hero__console">
          <div>
            <span></span>
            <small>FAIML-STUDIO-V2</small>
          </div>
          <code>
            <small>Active Case Study Unit</small>
            <strong>Unit {selectedUnit}</strong>
            <em>{faimlUnits[selectedUnit - 1].shortTitle}</em>
          </code>
          <dl>
            <div>
              <dt>Course Code</dt>
              <dd>2311CSC303J</dd>
            </div>
            <div>
              <dt>Core Domain</dt>
              <dd>{selectedUnit <= 2 ? 'Search & Logic' : selectedUnit <= 4 ? 'ML & Clusters' : 'Clinical Triage'}</dd>
            </div>
            <div>
              <dt>Interactive Mode</dt>
              <dd>Live Parameter Tuning</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Top 5-Unit Switcher Navigation Bar */}
      <nav className="faiml-unit-nav" aria-label="Select FAIML Case Study Unit">
        {faimlUnits.map(unit => {
          const isSelected = selectedUnit === unit.unitNumber;
          const Icon =
            unit.unitNumber === 1
              ? Car
              : unit.unitNumber === 2
              ? Activity
              : unit.unitNumber === 3
              ? Home
              : unit.unitNumber === 4
              ? GraduationCap
              : BrainCircuit;

          return (
            <button
              key={unit.unitNumber}
              type="button"
              className="faiml-unit-tab"
              aria-selected={isSelected}
              onClick={() => setSelectedUnit(unit.unitNumber)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>
                <strong>{unit.shortTitle}</strong>
                <small>Unit {unit.unitNumber} Applied Case</small>
              </span>
            </button>
          );
        })}
      </nav>

      {/* =========================================================================
          UNIT 1: AUTONOMOUS VEHICLE NAVIGATION & PEAS SEARCH
      ========================================================================= */}
      {selectedUnit === 1 && (
        <div className="space-y-6" id="faiml-unit-1-container">
          {/* Briefing Card */}
          <article className="faiml-interactive-card">
            <header>
              <div>
                <span className="faiml-case-label">
                  <Car size={15} aria-hidden="true" /> Unit 1 Applied Engineering
                </span>
                <h3>{unit1Data.title}</h3>
                <p>{unit1Data.scenario}</p>
              </div>
            </header>

            {/* PEAS Framework Grid */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                PEAS Agent Specification Matrix
              </h4>
              <div className="faiml-peas-grid">
                <div className="faiml-peas-col">
                  <h4>Performance</h4>
                  <ul>
                    {unit1Data.peas.performance.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="faiml-peas-col">
                  <h4>Environment</h4>
                  <ul>
                    {unit1Data.peas.environment.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="faiml-peas-col">
                  <h4>Actuators</h4>
                  <ul>
                    {unit1Data.peas.actuators.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="faiml-peas-col">
                  <h4>Sensors</h4>
                  <ul>
                    {unit1Data.peas.sensors.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interactive Dynamic Re-Planning Simulator */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Monsoon Flood Delay & Route Re-Planner
              </h4>

              <div className="faiml-slider-container">
                <label htmlFor="u1-delay-slider">
                  <span>Monsoon Flood Congestion Multiplier on Primary NH544:</span>
                  <span className="font-mono text-purple-600 font-bold">{u1TrafficMultiplier.toFixed(1)}x Delay</span>
                </label>
                <input
                  id="u1-delay-slider"
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.1"
                  value={u1TrafficMultiplier}
                  onChange={e => setU1TrafficMultiplier(parseFloat(e.target.value))}
                />
                <div className="faiml-slider-ticks">
                  <span>1.0x (Clear expressway)</span>
                  <span>1.4x (Branching threshold)</span>
                  <span>2.5x (Severe gridlock)</span>
                </div>
              </div>

              {/* Algorithm Selector */}
              <div className="flex gap-2">
                {(['A*', 'Dijkstra', 'DFS'] as const).map(alg => (
                  <button
                    key={alg}
                    type="button"
                    onClick={() => setU1Algorithm(alg)}
                    className={`btn ${u1Algorithm === alg ? 'btn-primary' : 'btn-secondary'} text-xs`}
                  >
                    Algorithm: {alg}
                  </button>
                ))}
              </div>

              {/* Live Routes Comparison */}
              <div className="faiml-route-grid">
                {/* Primary Route */}
                <div className={`faiml-route-card ${u1TrafficMultiplier < 1.35 ? 'recommended' : ''}`}>
                  {u1TrafficMultiplier < 1.35 && <span className="faiml-route-badge">Recommended</span>}
                  <h4>Primary NH544 Corridor</h4>
                  <p>Coimbatore → Salem → Vellore → Chennai (505 km)</p>
                  <div className="faiml-route-meta">
                    <div>
                      <small className="text-slate-400">Base Transit:</small>
                      <strong className="block">8.5 hours</strong>
                    </div>
                    <div>
                      <small className="text-slate-400">Current Delayed ETA:</small>
                      <strong className="block font-mono text-purple-600">
                        {(8.5 * u1TrafficMultiplier).toFixed(1)} hours
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Detour Route */}
                <div className={`faiml-route-card ${u1TrafficMultiplier >= 1.35 ? 'recommended' : ''}`}>
                  {u1TrafficMultiplier >= 1.35 && <span className="faiml-route-badge">A* Re-Route Selected</span>}
                  <h4>Detour A (Southern Bypass)</h4>
                  <p>Coimbatore → Dindigul → Trichy → Villupuram → Chennai (540 km)</p>
                  <div className="faiml-route-meta">
                    <div>
                      <small className="text-slate-400">Distance:</small>
                      <strong className="block">540 km (+35 km)</strong>
                    </div>
                    <div>
                      <small className="text-slate-400">Flood-Protected ETA:</small>
                      <strong className="block font-mono text-emerald-600">9.5 hours</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="faiml-case-feedback correct">
                <strong>Planner Telemetry Decision: </strong>
                {u1TrafficMultiplier >= 1.35 ? (
                  <span>
                    Because primary NH544 delay is <strong>{u1TrafficMultiplier.toFixed(1)}x</strong> (travel time ~
                    <strong>{(8.5 * u1TrafficMultiplier).toFixed(1)} hrs</strong>), the {u1Algorithm} agent
                    automatically switches to Detour A via Dindigul & Trichy (540 km, 9.5 hrs), saving{' '}
                    <strong>{(8.5 * u1TrafficMultiplier - 9.5).toFixed(1)} hours</strong> of transit time!
                  </span>
                ) : (
                  <span>
                    Primary expressway remains fastest with current ETA of {(8.5 * u1TrafficMultiplier).toFixed(1)}{' '}
                    hours compared to Detour A’s 9.5 hours.
                  </span>
                )}
              </div>
            </div>

            {/* Knowledge Check Questions */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Unit 1 Checkpoint Assessment
              </h4>
              <div className="space-y-4">
                {unit1Data.questions.map(q => {
                  const selected = u1Answers[q.id];
                  const hasAnswered = selected !== undefined;
                  return (
                    <div key={q.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="font-semibold text-xs mb-3">{q.prompt}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.answer;
                          const isChosen = selected === oIdx;
                          let btnClass = 'p-3 rounded-lg border text-xs text-left transition-all ';
                          if (hasAnswered) {
                            if (isCorrect) btnClass += 'border-purple-600 bg-purple-50 text-purple-900 font-bold';
                            else if (isChosen) btnClass += 'border-red-500 bg-red-50 text-red-900';
                            else btnClass += 'border-slate-200 bg-white text-slate-500 opacity-60';
                          } else {
                            btnClass += 'border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50/30';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => setU1Answers(prev => ({ ...prev, [q.id]: oIdx }))}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {hasAnswered && (
                        <p className="mt-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                          <strong>Explanation: </strong>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {u1Completed && (
                <div className="mt-4 flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="text-xs text-purple-900">
                    <strong>Unit 1 Completed: </strong> You scored {u1Score} / {unit1Data.questions.length}!
                  </div>
                  <button type="button" className="btn btn-primary text-xs" onClick={() => setSelectedUnit(2)}>
                    Next: Unit 2 Bayesian Diagnostic <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {/* =========================================================================
          UNIT 2: BAYESIAN MEDICAL DIAGNOSTIC NETWORK
      ========================================================================= */}
      {selectedUnit === 2 && (
        <div className="space-y-6" id="faiml-unit-2-container">
          <article className="faiml-interactive-card">
            <header>
              <div>
                <span className="faiml-case-label">
                  <Activity size={15} aria-hidden="true" /> Unit 2 Applied Reasoning
                </span>
                <h3>{unit2Data.title}</h3>
                <p>{unit2Data.scenario}</p>
              </div>
            </header>

            {/* Interactive Symptom Evidence Toggles & Live Bayes Gauge */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Patient Symptom Evidence Toggles & Live Bayes Inference
              </h4>

              <div className="faiml-bayes-grid">
                {/* Symptom Controls */}
                <div className="faiml-symptom-toggles">
                  <label className="faiml-symptom-toggle">
                    <span>Presenting Symptom: High Fever (&gt; 38.5°C)</span>
                    <input
                      type="checkbox"
                      checked={patientFever}
                      onChange={e => setPatientFever(e.target.checked)}
                    />
                  </label>
                  <label className="faiml-symptom-toggle">
                    <span>Presenting Symptom: Persistent Dry Cough</span>
                    <input
                      type="checkbox"
                      checked={patientCough}
                      onChange={e => setPatientCough(e.target.checked)}
                    />
                  </label>
                  <label className="faiml-symptom-toggle">
                    <span>Presenting Symptom: Anosmia / Loss of Smell</span>
                    <input
                      type="checkbox"
                      checked={patientAnosmia}
                      onChange={e => setPatientAnosmia(e.target.checked)}
                    />
                  </label>
                  <label className="faiml-symptom-toggle">
                    <span>Presenting Symptom: Severe Fatigue & Body Ache</span>
                    <input
                      type="checkbox"
                      checked={patientFatigue}
                      onChange={e => setPatientFatigue(e.target.checked)}
                    />
                  </label>
                </div>

                {/* Posterior Gauges */}
                <div className="faiml-posterior-card">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                    Normalized Posterior Probabilities P(Disease | Evidence)
                  </h4>

                  {/* COVID-19 */}
                  <div className="faiml-posterior-item">
                    <div className="faiml-posterior-header">
                      <span>COVID-19</span>
                      <span className="font-mono text-purple-600 font-bold">{bayesCalc.pCovid}%</span>
                    </div>
                    <div className="faiml-posterior-bar">
                      <span style={{ width: `${bayesCalc.pCovid}%`, background: '#7c3aed' }}></span>
                    </div>
                  </div>

                  {/* Influenza */}
                  <div className="faiml-posterior-item">
                    <div className="faiml-posterior-header">
                      <span>Influenza</span>
                      <span className="font-mono text-blue-600 font-bold">{bayesCalc.pFlu}%</span>
                    </div>
                    <div className="faiml-posterior-bar">
                      <span style={{ width: `${bayesCalc.pFlu}%`, background: '#2563eb' }}></span>
                    </div>
                  </div>

                  {/* Common Cold */}
                  <div className="faiml-posterior-item">
                    <div className="faiml-posterior-header">
                      <span>Common Cold</span>
                      <span className="font-mono text-emerald-600 font-bold">{bayesCalc.pCold}%</span>
                    </div>
                    <div className="faiml-posterior-bar">
                      <span style={{ width: `${bayesCalc.pCold}%`, background: '#059669' }}></span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2">
                    Prior base rates: P(COVID) = 15%, P(Flu) = 12%, P(Cold) = 30%.
                  </p>
                </div>
              </div>

              {/* Conditional Probability Table */}
              <div className="p-4 border border-slate-200 rounded-xl bg-white overflow-x-auto">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Symptom Conditional Probability Table (CPT Matrix)
                </h4>
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-mono">
                      <th className="pb-2">Symptom</th>
                      <th className="pb-2">P(S | COVID-19)</th>
                      <th className="pb-2">P(S | Influenza)</th>
                      <th className="pb-2">P(S | Common Cold)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {unit2Data.cpt.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 font-medium">{row.symptom}</td>
                        <td className="py-2 font-mono text-purple-600">{row.pCovid}</td>
                        <td className="py-2 font-mono text-blue-600">{row.pFlu}</td>
                        <td className="py-2 font-mono text-emerald-600">{row.pCold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Knowledge Check Questions */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Unit 2 Checkpoint Assessment
              </h4>
              <div className="space-y-4">
                {unit2Data.questions.map(q => {
                  const selected = u2Answers[q.id];
                  const hasAnswered = selected !== undefined;
                  return (
                    <div key={q.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="font-semibold text-xs mb-3">{q.prompt}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.answer;
                          const isChosen = selected === oIdx;
                          let btnClass = 'p-3 rounded-lg border text-xs text-left transition-all ';
                          if (hasAnswered) {
                            if (isCorrect) btnClass += 'border-purple-600 bg-purple-50 text-purple-900 font-bold';
                            else if (isChosen) btnClass += 'border-red-500 bg-red-50 text-red-900';
                            else btnClass += 'border-slate-200 bg-white text-slate-500 opacity-60';
                          } else {
                            btnClass += 'border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50/30';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => setU2Answers(prev => ({ ...prev, [q.id]: oIdx }))}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {hasAnswered && (
                        <p className="mt-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                          <strong>Explanation: </strong>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {u2Completed && (
                <div className="mt-4 flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="text-xs text-purple-900">
                    <strong>Unit 2 Completed: </strong> You scored {u2Score} / {unit2Data.questions.length}!
                  </div>
                  <button type="button" className="btn btn-primary text-xs" onClick={() => setSelectedUnit(3)}>
                    Next: Unit 3 Property Regression <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {/* =========================================================================
          UNIT 3: REAL ESTATE MULTIVARIATE REGRESSION PIPELINE
      ========================================================================= */}
      {selectedUnit === 3 && (
        <div className="space-y-6" id="faiml-unit-3-container">
          <article className="faiml-interactive-card">
            <header>
              <div>
                <span className="faiml-case-label">
                  <Home size={15} aria-hidden="true" /> Unit 3 Supervised Learning
                </span>
                <h3>{unit3Data.title}</h3>
                <p>{unit3Data.scenario}</p>
              </div>
            </header>

            {/* Regression Inputs & Live Valuation */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Multivariate Feature Parameter Controls & Ridge L2 Regularization
              </h4>

              <div className="faiml-reg-grid">
                {/* Area */}
                <div className="faiml-slider-container">
                  <label htmlFor="u3-area-slider">
                    <span>Living Area (sq ft):</span>
                    <span className="font-mono text-purple-600 font-bold">{houseArea} sq ft</span>
                  </label>
                  <input
                    id="u3-area-slider"
                    type="range"
                    min="800"
                    max="4000"
                    step="50"
                    value={houseArea}
                    onChange={e => setHouseArea(parseInt(e.target.value, 10))}
                  />
                  <div className="faiml-slider-ticks">
                    <span>800 sq ft</span>
                    <span>4,000 sq ft</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="faiml-slider-container">
                  <label htmlFor="u3-bed-slider">
                    <span>Bedrooms:</span>
                    <span className="font-mono text-purple-600 font-bold">{houseBedrooms} Rooms</span>
                  </label>
                  <input
                    id="u3-bed-slider"
                    type="range"
                    min="1"
                    max="6"
                    value={houseBedrooms}
                    onChange={e => setHouseBedrooms(parseInt(e.target.value, 10))}
                  />
                  <div className="faiml-slider-ticks">
                    <span>1</span>
                    <span>6</span>
                  </div>
                </div>

                {/* Age */}
                <div className="faiml-slider-container">
                  <label htmlFor="u3-age-slider">
                    <span>Structure Age:</span>
                    <span className="font-mono text-purple-600 font-bold">{houseAge} Years</span>
                  </label>
                  <input
                    id="u3-age-slider"
                    type="range"
                    min="0"
                    max="40"
                    value={houseAge}
                    onChange={e => setHouseAge(parseInt(e.target.value, 10))}
                  />
                  <div className="faiml-slider-ticks">
                    <span>0 (New build)</span>
                    <span>40 years</span>
                  </div>
                </div>

                {/* Location */}
                <div className="faiml-slider-container">
                  <label htmlFor="u3-loc-select">
                    <span>Location Tier:</span>
                    <span className="font-mono text-purple-600 font-bold">{houseLocation}</span>
                  </label>
                  <select
                    id="u3-loc-select"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white cursor-pointer"
                    value={houseLocation}
                    onChange={e => setHouseLocation(e.target.value as 'Urban' | 'Suburban' | 'Rural')}
                  >
                    <option value="Urban">Urban (+ $85,000)</option>
                    <option value="Suburban">Suburban (+ $35,000)</option>
                    <option value="Rural">Rural ($0)</option>
                  </select>
                </div>
              </div>

              {/* Ridge Lambda Slider */}
              <div className="faiml-slider-container">
                <label htmlFor="u3-lambda-slider">
                  <span>Ridge Regularization Penalty (λ Shrinkage):</span>
                  <span className="font-mono text-purple-600 font-bold">λ = {ridgeLambda}</span>
                </label>
                <input
                  id="u3-lambda-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={ridgeLambda}
                  onChange={e => setRidgeLambda(parseInt(e.target.value, 10))}
                />
                <div className="faiml-slider-ticks">
                  <span>λ = 0 (OLS unconstrained)</span>
                  <span>λ = 50</span>
                  <span>λ = 100 (Heavy shrinkage)</span>
                </div>
              </div>

              {/* Live Predicted Price Hero Card */}
              <div className="faiml-price-card">
                <div>
                  <small className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                    Predicted Market Collateral Valuation
                  </small>
                  <div className="faiml-price-val">${predictedPrice.toLocaleString()}</div>
                  <span className="text-xs text-slate-500 font-mono">
                    Model: Multivariate Ridge Regression · Residual Std Error: ±$18,400
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-600">Benchmark R²: 0.88</div>
                  <div className="text-xs font-mono text-slate-600">Validation MAE: $12,300</div>
                  <div className="text-xs text-emerald-600 font-bold mt-1">Zero Appraisal Bias</div>
                </div>
              </div>
            </div>

            {/* Knowledge Check Questions */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Unit 3 Checkpoint Assessment
              </h4>
              <div className="space-y-4">
                {unit3Data.questions.map(q => {
                  const selected = u3Answers[q.id];
                  const hasAnswered = selected !== undefined;
                  return (
                    <div key={q.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="font-semibold text-xs mb-3">{q.prompt}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.answer;
                          const isChosen = selected === oIdx;
                          let btnClass = 'p-3 rounded-lg border text-xs text-left transition-all ';
                          if (hasAnswered) {
                            if (isCorrect) btnClass += 'border-purple-600 bg-purple-50 text-purple-900 font-bold';
                            else if (isChosen) btnClass += 'border-red-500 bg-red-50 text-red-900';
                            else btnClass += 'border-slate-200 bg-white text-slate-500 opacity-60';
                          } else {
                            btnClass += 'border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50/30';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => setU3Answers(prev => ({ ...prev, [q.id]: oIdx }))}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {hasAnswered && (
                        <p className="mt-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                          <strong>Explanation: </strong>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {u3Completed && (
                <div className="mt-4 flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="text-xs text-purple-900">
                    <strong>Unit 3 Completed: </strong> You scored {u3Score} / {unit3Data.questions.length}!
                  </div>
                  <button type="button" className="btn btn-primary text-xs" onClick={() => setSelectedUnit(4)}>
                    Next: Unit 4 Student Clustering <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {/* =========================================================================
          UNIT 4: STUDENT PERFORMANCE & K-MEANS INTERVENTIONS
      ========================================================================= */}
      {selectedUnit === 4 && (
        <div className="space-y-6" id="faiml-unit-4-container">
          <article className="faiml-interactive-card">
            <header>
              <div>
                <span className="faiml-case-label">
                  <GraduationCap size={15} aria-hidden="true" /> Unit 4 Unsupervised Learning
                </span>
                <h3>{unit4Data.title}</h3>
                <p>{unit4Data.scenario}</p>
              </div>
            </header>

            {/* K-Means Clusters & Silhouette Analysis */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                K-Means Cluster Count (K) & Silhouette Score Analyzer
              </h4>

              <div className="faiml-slider-container">
                <label htmlFor="u4-k-slider">
                  <span>Number of Clusters (K):</span>
                  <span className="font-mono text-purple-600 font-bold">K = {clusterK}</span>
                </label>
                <input
                  id="u4-k-slider"
                  type="range"
                  min="2"
                  max="5"
                  value={clusterK}
                  onChange={e => setClusterK(parseInt(e.target.value, 10))}
                />
                <div className="faiml-slider-ticks">
                  <span>K=2 (Coarse)</span>
                  <span>K=3</span>
                  <span className="font-bold text-purple-600">K=4 (Peak Silhouette 0.74)</span>
                  <span>K=5 (Over-split)</span>
                </div>
              </div>

              {/* Silhouette Status Bar */}
              <div className="p-4 border border-slate-200 rounded-xl bg-purple-50/50 flex items-center justify-between">
                <div>
                  <small className="text-slate-400 font-mono text-[10px] uppercase">Silhouette Coefficient</small>
                  <div className="text-2xl font-bold font-mono text-purple-700">s = {activeSilhouette.score}</div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
                    {activeSilhouette.status}
                  </span>
                </div>
              </div>

              {/* 4 Student Cohorts Selection */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Behavioral Cohort Profiles (1,200 Students Monitored)
                </h4>
                <div className="faiml-cluster-tabs">
                  {unit4Data.clusters.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={`faiml-cluster-btn ${selectedClusterId === c.id ? 'active' : ''}`}
                      onClick={() => setSelectedClusterId(c.id)}
                    >
                      <strong className="block text-xs mb-1">{c.name}</strong>
                      <span className="text-[11px] text-slate-500 block mb-2">{c.percentage} of cohort</span>
                      <div className="text-[10px] text-slate-600 font-mono">
                        Att: {c.attendance} · Marks: {c.marks}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actionable Intervention Box */}
              {(() => {
                const activeCohort = unit4Data.clusters.find(c => c.id === selectedClusterId) ?? unit4Data.clusters[0];
                return (
                  <div className="p-5 border border-purple-200 rounded-xl bg-purple-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                      Targeted Institutional Intervention for {activeCohort.name}
                    </span>
                    <p className="text-xs text-purple-900 leading-relaxed mb-3">
                      <strong>Behavioral Profile: </strong>
                      {activeCohort.profile}
                    </p>
                    <div className="p-3 bg-white border border-purple-200 rounded-lg text-xs text-purple-900">
                      <strong>Action Plan: </strong>
                      {activeCohort.intervention}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Knowledge Check Questions */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Unit 4 Checkpoint Assessment
              </h4>
              <div className="space-y-4">
                {unit4Data.questions.map(q => {
                  const selected = u4Answers[q.id];
                  const hasAnswered = selected !== undefined;
                  return (
                    <div key={q.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="font-semibold text-xs mb-3">{q.prompt}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.answer;
                          const isChosen = selected === oIdx;
                          let btnClass = 'p-3 rounded-lg border text-xs text-left transition-all ';
                          if (hasAnswered) {
                            if (isCorrect) btnClass += 'border-purple-600 bg-purple-50 text-purple-900 font-bold';
                            else if (isChosen) btnClass += 'border-red-500 bg-red-50 text-red-900';
                            else btnClass += 'border-slate-200 bg-white text-slate-500 opacity-60';
                          } else {
                            btnClass += 'border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50/30';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => setU4Answers(prev => ({ ...prev, [q.id]: oIdx }))}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {hasAnswered && (
                        <p className="mt-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                          <strong>Explanation: </strong>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {u4Completed && (
                <div className="mt-4 flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="text-xs text-purple-900">
                    <strong>Unit 4 Completed: </strong> You scored {u4Score} / {unit4Data.questions.length}!
                  </div>
                  <button type="button" className="btn btn-primary text-xs" onClick={() => setSelectedUnit(5)}>
                    Next: Unit 5 Sepsis Alert Studio <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {/* =========================================================================
          UNIT 5: CLINICAL SEPSIS ALERTING & THRESHOLD CALIBRATION STUDIO
      ========================================================================= */}
      {selectedUnit === 5 && (
        <div className="space-y-6" id="faiml-unit-5-container">
          {/* Learning Objectives Bar */}
          <section className="faiml-case-objectives" aria-label="Syllabus objectives">
            <div>
              <Sparkles size={26} aria-hidden="true" />
              <span>
                <small>Unit 5 Syllabus Focus</small>
                <strong>Evaluation & Trust</strong>
              </span>
            </div>
            <ul>
              {faimlLearningGoals.map((goal, i) => (
                <li key={i}>
                  <Check size={14} aria-hidden="true" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Stepper Progress Bar */}
          <nav className="faiml-case-progress" aria-label="Incident diagnosis stages">
            <div className="faiml-case-progress__summary">
              <span>
                Checkpoint {activeIndex + 1} of {faimlStages.length} · {progress}% complete
              </span>
              <button type="button" onClick={resetSession}>
                <RotateCcw size={13} aria-hidden="true" /> Reset Studio
              </button>
            </div>
            <div className="faiml-case-progress__bar">
              <span style={{ width: `${progress}%` }}></span>
            </div>
            <ol>
              {faimlStages.map((stage, idx) => {
                const isCurrent = stage.id === activeStage;
                const isDone = completed.has(stage.id);
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      className={isCurrent ? 'active' : ''}
                      onClick={() => openStage(stage.id)}
                    >
                      <span>{isDone ? <Check size={13} aria-hidden="true" /> : idx + 1}</span>
                      <span>
                        <strong>{stage.shortLabel}</strong>
                        <small>{stage.description}</small>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Interactive Workspace Studio */}
          <section
            id="faiml-case-workspace"
            className="faiml-case-workspace"
            aria-labelledby="faiml-stage-title"
          >
            <header>
              <div>
                <span>Checkpoint {activeIndex + 1}</span>
                <h2 id="faiml-stage-title">{faimlStages[activeIndex].label}</h2>
              </div>
              <p>{faimlStages[activeIndex].description}</p>
            </header>

            {/* STAGE 1: Formulate Incident */}
            {activeStage === 'incident' && (
              <div className="faiml-case-briefing">
                <article>
                  <span className="faiml-case-label">
                    <AlertTriangle size={14} aria-hidden="true" /> System Malfunction Telemetry
                  </span>
                  <blockquote>
                    &ldquo;MediPulse-AI deployed to Emergency Room triage is misclassifying septic shock patients as low risk,
                    while triggering 165 false alarms per shift.&rdquo;
                  </blockquote>
                  <p>
                    Hospital governance requires calibrating false positive versus false negative loss asymmetries before
                    the model can be restored to the clinical EHR stream. Select all four mandatory system constraints.
                  </p>
                  <dl>
                    <div>
                      <dt>Reported Defect</dt>
                      <dd>18 Missed Severe Sepsis Admissions</dd>
                    </div>
                    <div>
                      <dt>Alert Burden</dt>
                      <dd>Severe Nurse Alarm Fatigue</dd>
                    </div>
                    <div>
                      <dt>Root Cause</dt>
                      <dd>Symmetric 0.50 Threshold + Covariate Shift</dd>
                    </div>
                    <div>
                      <dt>Mandate</dt>
                      <dd>Calibrate Asymmetric Decision Boundary</dd>
                    </div>
                  </dl>
                </article>

                <fieldset>
                  <legend>Select Safety Criteria</legend>
                  <p>Identify the four mandatory clinical engineering safeguards (4 required):</p>
                  {incidentOptions.map(option => {
                    const checked = incidentAnswers.includes(option.id);
                    return (
                      <label key={option.id} className={checked ? 'selected' : ''}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={e => {
                            if (e.target.checked) setIncidentAnswers(prev => [...prev, option.id]);
                            else setIncidentAnswers(prev => prev.filter(x => x !== option.id));
                          }}
                        />
                        <span>{option.label}</span>
                        {checked && <Check size={16} aria-hidden="true" />}
                      </label>
                    );
                  })}

                  <div className={`faiml-case-feedback ${incidentCorrect ? 'correct' : ''}`}>
                    <strong>
                      {incidentCorrect
                        ? 'Safety Envelope Verified:'
                        : `Selected ${incidentAnswers.length} of 4 required safeguards:`}
                    </strong>
                    <span>
                      {incidentCorrect
                        ? 'High sensitivity, sub-100ms inference latency, calibration error bound, and covariate shift triggers are locked.'
                        : 'Pick requirements that guarantee safety, responsiveness, and distribution shift observability without hallucinated LLMs.'}
                    </span>
                  </div>
                </fieldset>
              </div>
            )}

            {/* STAGE 2: Search Challenges */}
            {activeStage === 'heuristics' && (
              <div className="faiml-search-grid">
                <aside className="faiml-search-aside">
                  <span className="faiml-case-label">
                    <Layers size={14} aria-hidden="true" /> Search Optimization
                  </span>
                  <h3>State-Space Routing</h3>
                  <p>
                    Emergency operations rely on state-space search algorithms. Select the optimal graph search strategy
                    with admissible heuristics for each hospital operational bottleneck.
                  </p>
                </aside>

                <div className="faiml-search-body">
                  {searchChallenges.map((challenge, cIdx) => {
                    const selected = searchAnswers[challenge.id];
                    const hasAnswered = selected !== undefined;
                    return (
                      <div key={challenge.id} className="faiml-search-card">
                        <span className="faiml-case-label">Problem {cIdx + 1}</span>
                        <h4>{challenge.scenario}</h4>
                        <p>{challenge.clue}</p>
                        <div className="faiml-search-options">
                          {challenge.options.map((opt, oIdx) => {
                            const isCorrect = oIdx === challenge.answer;
                            const isChosen = selected === oIdx;
                            let btnClass = '';
                            if (hasAnswered) {
                              if (isCorrect) btnClass = 'correct';
                              else if (isChosen) btnClass = 'wrong';
                            }
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                disabled={hasAnswered}
                                className={btnClass}
                                onClick={() => setSearchAnswers(prev => ({ ...prev, [challenge.id]: oIdx }))}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {hasAnswered && (
                          <div className="faiml-case-feedback correct">
                            <strong>Resolution: </strong>
                            <span>{challenge.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STAGE 3: Model Architecture */}
            {activeStage === 'pipeline' && (
              <div className="faiml-model-grid">
                <div className="faiml-model-browser">
                  <span className="faiml-case-label">
                    <Binary size={14} aria-hidden="true" /> Architecture Selection
                  </span>
                  <h3>Candidate Pipelines</h3>
                  <p>Evaluate inductive biases, latency, and interpretability for bedside tabular telemetry.</p>
                  <div className="faiml-model-list">
                    {candidateModels.map((model, idx) => (
                      <button
                        key={model.id}
                        type="button"
                        className={`faiml-model-item ${inspectedModelIndex === idx ? 'active' : ''} ${
                          selectedModelId === model.id ? 'chosen' : ''
                        }`}
                        onClick={() => setInspectedModelIndex(idx)}
                      >
                        <strong>{model.name}</strong>
                        <small>{model.family}</small>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="faiml-model-detail">
                  <span className="faiml-case-label">{currentModel.family}</span>
                  <h3>{currentModel.name}</h3>
                  <p>{currentModel.tradeoff}</p>
                  <dl>
                    <div>
                      <dt>Inference Latency</dt>
                      <dd>{currentModel.latencyMs} ms</dd>
                    </div>
                    <div>
                      <dt>Interpretability</dt>
                      <dd>{currentModel.interpretability}</dd>
                    </div>
                    <div>
                      <dt>Hyperparameters</dt>
                      <dd>{currentModel.parameters}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    className={`btn ${selectedModelId === currentModel.id ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedModelId(currentModel.id)}
                  >
                    {selectedModelId === currentModel.id ? 'Selected Pipeline' : 'Select Architecture'}
                  </button>
                  {selectedModelId && (
                    <div className={`faiml-case-feedback ${modelCorrect ? 'correct' : ''}`}>
                      <strong>{modelCorrect ? 'Architecture Confirmed:' : 'Sub-optimal Inductive Bias:'}</strong>
                      <span>
                        {modelCorrect
                          ? 'LightGBM captures complex non-linear biomarker interactions with fast tabular inference and robust feature attribution.'
                          : 'This model either lacks non-linear interaction capacity or is too opaque and memory-heavy for real-time bedside telemetry.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 4: Threshold Calibration */}
            {activeStage === 'calibration' && (
              <div className="faiml-threshold-workspace">
                <div className="faiml-threshold-controls">
                  <span className="faiml-case-label">
                    <Sliders size={14} aria-hidden="true" /> Cost Matrix Calibration
                  </span>
                  <h3>Decision Threshold Cutoff</h3>
                  <p>
                    Because missed septic cases (False Negatives) carry mortal consequences, adjust the classification
                    operating threshold.
                  </p>
                  <div className="faiml-threshold-picker">
                    {thresholdScenarios.map(sc => (
                      <button
                        key={sc.id}
                        type="button"
                        className={selectedThresholdId === sc.id ? 'active' : ''}
                        onClick={() => setSelectedThresholdId(sc.id)}
                      >
                        <strong>{sc.label}</strong>
                        <small>Cutoff: {sc.threshold}</small>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="faiml-matrix-container">
                  <div className="faiml-matrix-metrics">
                    <div>
                      <small>Sensitivity (Recall)</small>
                      <strong>{currentThreshold.sensitivity}%</strong>
                    </div>
                    <div>
                      <small>Precision</small>
                      <strong>{currentThreshold.precision}%</strong>
                    </div>
                    <div>
                      <small>F2-Score (Recall-Weighted)</small>
                      <strong>{currentThreshold.f2Score}</strong>
                    </div>
                  </div>

                  <div className="faiml-matrix-grid">
                    <div className="faiml-matrix-cell safe">
                      <span>True Positive</span>
                      <strong>{currentThreshold.tp}</strong>
                      <small>Sepsis Detected</small>
                    </div>
                    <div className="faiml-matrix-cell warning">
                      <span>False Positive</span>
                      <strong>{currentThreshold.fp}</strong>
                      <small>False Alarm</small>
                    </div>
                    <div className="faiml-matrix-cell danger">
                      <span>False Negative</span>
                      <strong>{currentThreshold.fn}</strong>
                      <small>Missed Illness</small>
                    </div>
                    <div className="faiml-matrix-cell safe">
                      <span>True Negative</span>
                      <strong>{currentThreshold.tn}</strong>
                      <small>Correct Low Risk</small>
                    </div>
                  </div>

                  <div className={`faiml-case-feedback ${thresholdCorrect ? 'correct' : ''}`}>
                    <strong>Clinical Evaluation: </strong>
                    <span>{currentThreshold.outcome}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 5: Unsupervised Clustering */}
            {activeStage === 'clustering' && (
              <div className="faiml-cluster-workspace">
                <aside>
                  <span className="faiml-case-label">
                    <Network size={14} aria-hidden="true" /> Covariate Drift Detection
                  </span>
                  <h3>Unsupervised Cohorts</h3>
                  <p>
                    Analyze K-Means cluster partitions of 1,330 patient admissions to detect emergent biomarker shifts.
                  </p>
                  <div className="faiml-cohort-list">
                    {cohortClusters.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        className={`faiml-cohort-item ${inspectedCohortId === c.id ? 'active' : ''} ${
                          flaggedDriftCohort === c.id ? 'flagged' : ''
                        }`}
                        onClick={() => setInspectedCohortId(c.id)}
                      >
                        <strong>{c.name}</strong>
                        <small>{c.riskProfile}</small>
                      </button>
                    ))}
                  </div>
                </aside>

                {(() => {
                  const cohort = cohortClusters.find(c => c.id === inspectedCohortId) ?? cohortClusters[0];
                  return (
                    <div className="faiml-cohort-detail">
                      <span className="faiml-case-label">{cohort.riskProfile}</span>
                      <h3>{cohort.name}</h3>
                      <p>{cohort.primaryBiomarkers}</p>
                      <dl>
                        <div>
                          <dt>Cluster Size</dt>
                          <dd>{cohort.patientCount} patients</dd>
                        </div>
                        <div>
                          <dt>Recommended Protocol</dt>
                          <dd>{cohort.action}</dd>
                        </div>
                      </dl>
                      <button
                        type="button"
                        className={`btn ${flaggedDriftCohort === cohort.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFlaggedDriftCohort(cohort.id)}
                      >
                        {flaggedDriftCohort === cohort.id ? 'Flagged as Covariate Shift' : 'Flag Cohort for Drift Retraining'}
                      </button>
                      {flaggedDriftCohort && (
                        <div className={`faiml-case-feedback ${clusteringCorrect ? 'correct' : ''}`}>
                          <strong>{clusteringCorrect ? 'Covariate Drift Isolated:' : 'Normal Cohort:'}</strong>
                          <span>
                            {clusteringCorrect
                              ? 'Cluster C captures an unlabelled atypical viral surge where desaturation occurs without fever, exposing severe distribution drift.'
                              : 'This cohort adheres to standard historical distributions and does not represent novel covariate shift.'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* STAGE 6: Debrief Questions */}
            {activeStage === 'debrief' && (
              <div className="faiml-case-debrief">
                <aside>
                  <span className="faiml-case-label">
                    <Award size={14} aria-hidden="true" /> Final Defense
                  </span>
                  <h3>AI Systems Review</h3>
                  <p>
                    Demonstrate mastery of cost-sensitive learning, regularisation, data leakage prevention, and model
                    transparency.
                  </p>
                  <div className="faiml-debrief-nav">
                    {faimlQuestions.map((q, idx) => {
                      const answered = debriefAnswers[q.id] !== undefined;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          className={`${debriefIndex === idx ? 'active' : ''} ${answered ? 'answered' : ''}`}
                          onClick={() => setDebriefIndex(idx)}
                        >
                          <span>{answered ? <Check size={12} /> : idx + 1}</span>
                          <small>Question {idx + 1}</small>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {(() => {
                  const currentQ = faimlQuestions[debriefIndex];
                  const currentAnswer = debriefAnswers[currentQ.id];
                  const hasAnswered = currentAnswer !== undefined;

                  return (
                    <div className="faiml-debrief-question">
                      <span>Question {debriefIndex + 1} of {faimlQuestions.length}</span>
                      <h3>{currentQ.prompt}</h3>
                      <div>
                        {currentQ.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === currentQ.answer;
                          const isChosen = currentAnswer === oIdx;
                          let btnClass = '';
                          if (hasAnswered) {
                            if (isCorrect) btnClass = 'correct';
                            else if (isChosen) btnClass = 'wrong';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={hasAnswered}
                              className={btnClass}
                              onClick={() => setDebriefAnswers(prev => ({ ...prev, [currentQ.id]: oIdx }))}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}</span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="faiml-case-feedback correct">
                          <strong>Theoretical Justification: </strong>
                          <span>{currentQ.explanation}</span>
                        </div>
                      )}

                      <footer>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          disabled={debriefIndex === 0}
                          onClick={() => setDebriefIndex(prev => prev - 1)}
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={debriefIndex === faimlQuestions.length - 1}
                          onClick={() => setDebriefIndex(prev => prev + 1)}
                        >
                          Next Question
                        </button>
                      </footer>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Checkpoint Footer Actions */}
            <footer>
              <span>Checkpoint {activeIndex + 1} of {faimlStages.length}</span>
              <div>
                {activeIndex > 0 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => openStage(faimlStages[activeIndex - 1].id)}
                  >
                    Previous checkpoint
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!canComplete}
                  onClick={completeAndAdvance}
                >
                  {activeIndex === faimlStages.length - 1 ? 'Complete Case Study' : 'Close Checkpoint'}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </footer>
          </section>

          {/* Completion Banner */}
          {completedStages.length === faimlStages.length && (
            <section className="faiml-case-complete" aria-live="polite">
              <span>
                <Award size={32} aria-hidden="true" />
              </span>
              <div>
                <small>AI Systems Engineering Certification</small>
                <h2>MediPulse-AI is calibrated, verified, and shielded against distribution drift.</h2>
                <p>
                  You successfully navigated heuristic state search, calibrated asymmetric triage loss, isolated novel
                  phenotypes, and defended the pipeline scoring <strong>{debriefScore} / {faimlQuestions.length}</strong> in
                  the systems review.
                </p>
              </div>
              <div>
                <button type="button" className="btn btn-secondary" onClick={resetSession}>
                  <RotateCcw size={14} aria-hidden="true" /> Run again
                </button>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
