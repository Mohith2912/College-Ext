'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Binary,
  BrainCircuit,
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
  type FaimlStageId,
} from '@/lib/faiml-case-study-session';

const getStageIndex = (id: FaimlStageId) => faimlStages.findIndex(stage => stage.id === id);

export function FaimlCaseStudySession() {
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
          <h1 id="faiml-case-title">One critical scan. Three competing models. High distribution shift.</h1>
          <p>
            Rescue an emergency clinical diagnostic pipeline (MediPulse-AI) by formulating safety requirements,
            optimizing state-space heuristics, calibrating decision thresholds, and diagnosing hidden cohort drift.
          </p>
          <div className="faiml-case-hero__actions">
            <button type="button" className="btn btn-primary" onClick={() => openStage('incident')}>
              Start the investigation <ArrowRight size={16} aria-hidden="true" />
            </button>
            <span>
              <Clock3 size={15} aria-hidden="true" /> 25–30 minutes
            </span>
            <span>
              <BrainCircuit size={15} aria-hidden="true" /> 6 checkpoints
            </span>
          </div>
        </div>

        {/* Live Telemetry Console */}
        <aside className="faiml-case-hero__console" aria-label="AI triage telemetry monitor">
          <div>
            <span aria-hidden="true" />
            <small>MEDIPULSE-AI // V3.2</small>
          </div>
          <code>
            <small>Active Telemetry Stream</small>
            <strong>98.4% Recall</strong>
            <em>Target sensitivity on critical triage cohorts</em>
          </code>
          <dl>
            <div>
              <dt>Latency (p95)</dt>
              <dd>42 ms</dd>
            </div>
            <div>
              <dt>ROC-AUC</dt>
              <dd>0.962</dd>
            </div>
            <div>
              <dt>Covariate Shift</dt>
              <dd>DRIFT FLAGGED</dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Learning Outcomes */}
      <section className="faiml-case-objectives" aria-labelledby="faiml-objectives-title">
        <div>
          <Sparkles size={22} aria-hidden="true" />
          <span>
            <small>Learning Outcomes</small>
            <strong id="faiml-objectives-title">Architectural Skills</strong>
          </span>
        </div>
        <ul>
          {faimlLearningGoals.map(goal => (
            <li key={goal}>
              <Check size={14} aria-hidden="true" />
              {goal}
            </li>
          ))}
        </ul>
      </section>

      {/* Progress Bar & Stepper */}
      <nav className="faiml-case-progress" aria-label="FAIML Case study checkpoints">
        <div className="faiml-case-progress__summary">
          <span aria-live="polite">{progress}% complete</span>
          <button type="button" onClick={resetSession}>
            <RotateCcw size={13} aria-hidden="true" /> Reset session
          </button>
        </div>
        <div
          className="faiml-case-progress__bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <ol>
          {faimlStages.map((stage, index) => (
            <li key={stage.id}>
              <button
                type="button"
                className={activeStage === stage.id ? 'active' : ''}
                aria-current={activeStage === stage.id ? 'step' : undefined}
                onClick={() => openStage(stage.id)}
              >
                <span>
                  {completed.has(stage.id) ? (
                    <Check size={14} aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span>
                  <strong>{stage.shortLabel}</strong>
                  <small>{stage.description}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Active Workspace */}
      <section
        id="faiml-case-workspace"
        className={`faiml-case-workspace faiml-stage-${activeStage}`}
        aria-labelledby="faiml-stage-title"
      >
        <header>
          <div>
            <span>Checkpoint {activeIndex + 1} of {faimlStages.length}</span>
            <h2 id="faiml-stage-title">{faimlStages[activeIndex].label}</h2>
          </div>
          <p>{faimlStages[activeIndex].description}</p>
        </header>

        {/* Checkpoint 1: Incident Briefing & Requirements */}
        {activeStage === 'incident' && (
          <div className="faiml-case-briefing">
            <article>
              <span className="faiml-case-label">
                <AlertTriangle size={14} aria-hidden="true" /> Incident 04 · Seasonal Respiratory Surge
              </span>
              <blockquote>
                “When hospital admissions tripled during flu season, the automated triage model began missing 18% of
                critical sepsis cases. Clinicians halted deployment.”
              </blockquote>
              <p>
                The hospital data science team hastily blamed 'model decay.' As the AI systems engineer, you must
                establish objective, testable ML operational requirements before retraining.
              </p>
              <dl>
                <div>
                  <dt>Production Workload</dt>
                  <dd>1,200 bedside streams</dd>
                </div>
                <div>
                  <dt>Baseline Accuracy</dt>
                  <dd>Collapsed from 94% to 68%</dd>
                </div>
                <div>
                  <dt>Missed Critical Triage</dt>
                  <dd>18 False Negatives</dd>
                </div>
                <div>
                  <dt>Inference Constraint</dt>
                  <dd>&le; 100 ms latency</dd>
                </div>
              </dl>
            </article>

            <fieldset>
              <legend>Select the four measurable ML systems requirements.</legend>
              <p>Separate mathematically verifiable safety constraints from unsubstantiated architectural guesses.</p>
              {incidentOptions.map(option => {
                const selected = incidentAnswers.includes(option.id);
                return (
                  <label key={option.id} className={selected ? 'selected' : ''}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        setIncidentAnswers(curr =>
                          selected ? curr.filter(id => id !== option.id) : [...curr, option.id]
                        )
                      }
                    />
                    <span>{option.label}</span>
                    {selected &&
                      (option.required ? (
                        <CheckCircle2 aria-label="Valid measurable requirement" />
                      ) : (
                        <AlertTriangle aria-label="Subjective or dangerous option" />
                      ))}
                  </label>
                );
              })}

              {incidentAnswers.length >= 4 && (
                <div className={`faiml-case-feedback ${incidentCorrect ? 'correct' : ''}`} role="status">
                  <strong>{incidentCorrect ? 'Requirements properly formulated.' : 'Some selections are traps.'}</strong>
                  <span>
                    {incidentCorrect
                      ? 'Sensitivity, latency bounds, calibration error (ECE), and population drift index (PSI) establish rigorous engineering gates.'
                      : 'Never deploy opaque 70B parameter models without clinical validation, nor mute alerts without doctor fallback.'}
                  </span>
                </div>
              )}
            </fieldset>
          </div>
        )}

        {/* Checkpoint 2: Heuristics & State-Space Search */}
        {activeStage === 'heuristics' && (
          <div className="faiml-search-grid">
            <aside className="faiml-search-aside">
              <span className="faiml-case-label">
                <Network size={14} aria-hidden="true" /> Heuristic Engine
              </span>
              <h3>State-Space Search Strategy</h3>
              <p>
                AI agents must make optimal routing and allocation decisions under time pressure. Match each clinical
                operational problem to its mathematically optimal heuristic search algorithm.
              </p>
            </aside>

            <div className="faiml-search-cards">
              {searchChallenges.map((challenge, index) => {
                const selectedAnswer = searchAnswers[challenge.id];
                return (
                  <fieldset key={challenge.id}>
                    <legend>
                      <span>{index + 1}</span>
                      {challenge.scenario}
                    </legend>
                    <p>{challenge.clue}</p>
                    <div className="faiml-search-options">
                      {challenge.options.map((option, optIdx) => {
                        const isChosen = selectedAnswer === optIdx;
                        const isCorrect = optIdx === challenge.answer;
                        const btnClass = selectedAnswer !== undefined ? (isCorrect ? 'correct' : isChosen ? 'wrong' : '') : '';
                        return (
                          <button
                            key={option}
                            type="button"
                            className={btnClass}
                            disabled={selectedAnswer !== undefined}
                            onClick={() =>
                              setSearchAnswers(curr => ({ ...curr, [challenge.id]: optIdx }))
                            }
                          >
                            <span>{String.fromCharCode(65 + optIdx)}</span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {selectedAnswer !== undefined && (
                      <div
                        className={`faiml-case-feedback ${selectedAnswer === challenge.answer ? 'correct' : ''}`}
                        role="status"
                      >
                        <strong>
                          {selectedAnswer === challenge.answer ? 'Optimal algorithm selected.' : 'Sub-optimal heuristic.'}
                        </strong>
                        <span>{challenge.explanation}</span>
                      </div>
                    )}
                  </fieldset>
                );
              })}
            </div>
          </div>
        )}

        {/* Checkpoint 3: Model Architecture & Inductive Bias */}
        {activeStage === 'pipeline' && (
          <div className="faiml-model-grid">
            <aside className="faiml-model-browser">
              <div>
                <span className="faiml-case-label">
                  <Layers size={14} aria-hidden="true" /> Estimator Candidates
                </span>
                <strong>Inspect all 3 candidates</strong>
              </div>
              <div>
                {candidateModels.map((model, idx) => (
                  <button
                    key={model.id}
                    type="button"
                    className={inspectedModelIndex === idx ? 'active' : ''}
                    onClick={() => {
                      setInspectedModelIndex(idx);
                    }}
                  >
                    <span>{model.family}</span>
                    <strong>{model.name}</strong>
                    <small>Latency: {model.latencyMs} ms · {model.interpretability.split(' ')[0]}</small>
                  </button>
                ))}
              </div>
            </aside>

            <article className="faiml-model-detail">
              <div>
                <span>Candidate {inspectedModelIndex + 1} of 3</span>
                <code>{currentModel.parameters}</code>
              </div>
              <h3>{currentModel.name}</h3>
              <p>{currentModel.tradeoff}</p>

              <dl>
                <div>
                  <dt>Inference Latency</dt>
                  <dd>{currentModel.latencyMs} ms</dd>
                </div>
                <div>
                  <dt>Clinical Interpretability</dt>
                  <dd>{currentModel.interpretability}</dd>
                </div>
                <div>
                  <dt>Algorithm Family</dt>
                  <dd>{currentModel.family}</dd>
                </div>
              </dl>
            </article>

            <fieldset className="faiml-model-decision">
              <legend>Select the deployable model architecture.</legend>
              <p>Choose the model that handles non-linear biomarker interactions while maintaining low latency and SHAP explainability.</p>
              {candidateModels.map(model => (
                <label key={model.id} className={selectedModelId === model.id ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="model-candidate"
                    checked={selectedModelId === model.id}
                    onChange={() => setSelectedModelId(model.id)}
                  />
                  <span>{model.name.split(' ')[0]} {model.name.split(' ')[1]}</span>
                </label>
              ))}

              {selectedModelId && (
                <div
                  className={`faiml-case-feedback ${modelCorrect ? 'correct' : ''}`}
                  role="status"
                >
                  <strong>{modelCorrect ? 'Optimal inductive bias selected.' : 'Revisit model tradeoffs.'}</strong>
                  <span>
                    {modelCorrect
                      ? 'Calibrated Tree Ensembles (LightGBM) provide superior accuracy on tabular clinical labs, fast 12ms inference, and robust SHAP feature attributions.'
                      : 'Linear models miss non-linear organ failure thresholds, while deep networks are opaque and prone to shortcut memorization.'}
                  </span>
                </div>
              )}
            </fieldset>
          </div>
        )}

        {/* Checkpoint 4: Decision Threshold Calibration */}
        {activeStage === 'calibration' && (
          <div className="faiml-threshold-workspace">
            <div className="faiml-threshold-panel">
              <fieldset>
                <legend>Calibrate the Clinical Operating Threshold.</legend>
                <p>
                  In medical triage, missing a deteriorating patient (False Negative) has catastrophic clinical costs.
                  Select the decision threshold that optimizes safety and minimizes missed sepsis alerts.
                </p>
                <div className="faiml-threshold-options">
                  {thresholdScenarios.map(scen => (
                    <label key={scen.id} className={selectedThresholdId === scen.id ? 'selected' : ''}>
                      <input
                        type="radio"
                        name="threshold-option"
                        checked={selectedThresholdId === scen.id}
                        onChange={() => setSelectedThresholdId(scen.id)}
                      />
                      <div>
                        <strong>{scen.label}</strong>
                        <p>{scen.outcome}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="faiml-threshold-viz">
              <h4>Live Confusion Matrix Simulation (N = 400 Test Cohort)</h4>
              <div className="faiml-matrix-grid">
                <div className="faiml-matrix-cell safe">
                  <small>True Positives (Caught)</small>
                  <strong>{currentThreshold.tp}</strong>
                </div>
                <div className="faiml-matrix-cell">
                  <small>False Positives (Extra Tests)</small>
                  <strong>{currentThreshold.fp}</strong>
                </div>
                <div className="faiml-matrix-cell">
                  <small>True Negatives (Discharged)</small>
                  <strong>{currentThreshold.tn}</strong>
                </div>
                <div className={`faiml-matrix-cell ${currentThreshold.fn > 0 ? 'danger' : 'safe'}`}>
                  <small>False Negatives (Missed Deaths!)</small>
                  <strong>{currentThreshold.fn}</strong>
                </div>
              </div>

              <div className="faiml-meter">
                <span>
                  <b>Sensitivity / Recall (Safety Target &ge; 98%)</b>
                  <strong>{currentThreshold.sensitivity}%</strong>
                </span>
                <div className="faiml-meter-bar">
                  <div style={{ width: `${currentThreshold.sensitivity}%` }} />
                </div>
              </div>

              <div className="faiml-meter">
                <span>
                  <b>Precision (Workload Reliability)</b>
                  <strong>{currentThreshold.precision}%</strong>
                </span>
                <div className="faiml-meter-bar">
                  <div style={{ width: `${currentThreshold.precision}%` }} />
                </div>
              </div>

              <div className="faiml-meter">
                <span>
                  <b>F2-Score (Recall-Weighted Metric)</b>
                  <strong>{currentThreshold.f2Score}</strong>
                </span>
                <div className="faiml-meter-bar">
                  <div style={{ width: `${currentThreshold.f2Score}%` }} />
                </div>
              </div>

              <div
                className={`faiml-case-feedback ${thresholdCorrect ? 'correct' : ''}`}
                style={{ marginTop: '16px' }}
                role="status"
              >
                <strong>{thresholdCorrect ? 'Threshold is safely calibrated.' : 'Threshold violates safety target.'}</strong>
                <span>
                  {thresholdCorrect
                    ? 'Operating at 0.28 delivers 99% sensitivity, dropping missed cases to just 1 while keeping alert volume practical.'
                    : 'A standard 0.50 threshold causes 18 catastrophic false negatives, while 0.12 overwhelms the department with 165 false alarms.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Checkpoint 5: Unsupervised Cohort Clustering */}
        {activeStage === 'clustering' && (
          <div>
            <div style={{ padding: '24px 28px 0' }}>
              <span className="faiml-case-label">
                <Sliders size={14} aria-hidden="true" /> Unsupervised Discovery
              </span>
              <h3 style={{ margin: '8px 0 4px', fontSize: '22px' }}>
                Detect the Covariate Shift Anomaly
              </h3>
              <p style={{ margin: '0 0 16px', color: 'var(--faiml-muted)', fontSize: '11px' }}>
                K-Means clustering and PCA projection partitioned the 1,330 seasonal surge patient records into four distinct
                phenotypes. Inspect each cohort to identify which group caused the unexpected distribution shift.
              </p>
            </div>

            <div className="faiml-cohort-grid">
              {cohortClusters.map(cohort => {
                const isSelected = inspectedCohortId === cohort.id;
                const isFlagged = flaggedDriftCohort === cohort.id;
                return (
                  <div
                    key={cohort.id}
                    className={`faiml-cohort-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setInspectedCohortId(cohort.id);
                      setFlaggedDriftCohort(cohort.id);
                    }}
                  >
                    <header>
                      <span className={cohort.isDriftCohort ? 'drift' : ''}>
                        {cohort.riskProfile}
                      </span>
                      <small style={{ color: 'var(--faiml-muted)', fontSize: '8px', fontWeight: 700 }}>
                        {cohort.patientCount} patients
                      </small>
                    </header>
                    <h4>{cohort.name}</h4>
                    <p><strong>Biomarkers:</strong> {cohort.primaryBiomarkers}</p>
                    <p style={{ marginTop: '6px' }}><strong>Diagnosis:</strong> {cohort.action}</p>
                    {isFlagged && (
                      <div
                        className={`faiml-case-feedback ${cohort.isDriftCohort ? 'correct' : ''}`}
                        style={{ marginTop: '8px' }}
                      >
                        <strong>
                          {cohort.isDriftCohort ? 'Covariate shift root cause identified!' : 'Normal operational cohort.'}
                        </strong>
                        <span>
                          {cohort.isDriftCohort
                            ? 'Cluster C exhibits novel atypical biomarker interactions unseen during original model training. Flagged for priority active learning!'
                            : 'This group aligns with expected seasonal admission distributions.'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Checkpoint 6: Architectural Debrief */}
        {activeStage === 'debrief' && (
          <div className="faiml-case-debrief">
            <aside>
              <span className="faiml-case-label">
                <Binary size={14} aria-hidden="true" /> Architectural Review
              </span>
              <h3>Defend the AI Pipeline</h3>
              <p>Answer all 5 questions to demonstrate complete command of AI/ML deployment principles.</p>
              <ol>
                {faimlQuestions.map((q, index) => {
                  const answered = debriefAnswers[q.id] !== undefined;
                  const isCorrect = debriefAnswers[q.id] === q.answer;
                  return (
                    <li key={q.id} className={debriefIndex === index ? 'active' : ''}>
                      <button
                        type="button"
                        onClick={() => setDebriefIndex(index)}
                        aria-label={`Open FAIML debrief question ${index + 1}`}
                      >
                        <span>
                          {!answered ? index + 1 : isCorrect ? <Check size={14} /> : '!'}
                        </span>
                        <small>Q{index + 1}</small>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </aside>

            <div className="faiml-debrief-question">
              <span>Question {debriefIndex + 1} of {faimlQuestions.length}</span>
              <h3>{faimlQuestions[debriefIndex].prompt}</h3>

              <div>
                {faimlQuestions[debriefIndex].options.map((opt, optIndex) => {
                  const currentAnswer = debriefAnswers[faimlQuestions[debriefIndex].id];
                  const answered = currentAnswer !== undefined;
                  const isCorrectChoice = optIndex === faimlQuestions[debriefIndex].answer;
                  const isChosen = currentAnswer === optIndex;
                  const btnClass = answered ? (isCorrectChoice ? 'correct' : isChosen ? 'wrong' : '') : '';

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={btnClass}
                      disabled={answered}
                      onClick={() =>
                        setDebriefAnswers(curr => ({
                          ...curr,
                          [faimlQuestions[debriefIndex].id]: optIndex,
                        }))
                      }
                    >
                      <span>{String.fromCharCode(65 + optIndex)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {debriefAnswers[faimlQuestions[debriefIndex].id] !== undefined && (
                <div
                  className={`faiml-case-feedback ${
                    debriefAnswers[faimlQuestions[debriefIndex].id] ===
                    faimlQuestions[debriefIndex].answer
                      ? 'correct'
                      : ''
                  }`}
                  role="status"
                >
                  <strong>
                    {debriefAnswers[faimlQuestions[debriefIndex].id] ===
                    faimlQuestions[debriefIndex].answer
                      ? 'Sound engineering justification.'
                      : 'Review the underlying machine learning principle.'}
                  </strong>
                  <span>{faimlQuestions[debriefIndex].explanation}</span>
                </div>
              )}

              <footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={debriefIndex === 0}
                  onClick={() => setDebriefIndex(i => i - 1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={debriefIndex === faimlQuestions.length - 1}
                  onClick={() => setDebriefIndex(i => i + 1)}
                >
                  Next question
                </button>
              </footer>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <footer>
          <span role="status">
            {canComplete ? 'Checkpoint completed. Proceed to next step.' : 'Solve the current checkpoint activity to advance.'}
          </span>
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
  );
}
