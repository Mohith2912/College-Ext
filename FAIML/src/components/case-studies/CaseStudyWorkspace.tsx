/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Car,
  Activity,
  Home,
  GraduationCap,
  TrendingDown,
  Check,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const CaseStudyWorkspace: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  // Case Study 1: Autonomous Navigation Simulation state
  const [trafficMultiplier, setTrafficMultiplier] = useState(1.5);
  const [chosenAlgorithm, setChosenAlgorithm] = useState<'A*' | 'Dijkstra' | 'DFS'>('A*');

  // Case Study 2: Bayesian Medical Diagnostic state
  const [patientFever, setPatientFever] = useState(true);
  const [patientCough, setPatientCough] = useState(true);

  // Case Study 3: House Price Regression Simulator state
  const [houseSize, setHouseSize] = useState(1800);
  const [houseBedrooms, setHouseBedrooms] = useState(3);
  const [houseAge, setHouseAge] = useState(10);
  const [houseLocation, setHouseLocation] = useState<'Urban' | 'Suburban' | 'Rural'>('Suburban');

  // Case Study 4: Student Clustering Interventions state
  const [selectedCluster, setSelectedCluster] = useState<number>(2);

  // Case Study 5: Customer Churn Threshold state
  const [decisionThreshold, setDecisionThreshold] = useState(0.35);

  const caseStudies = [
    {
      id: 'case-1',
      unitNum: 1,
      title: 'Autonomous Vehicle Urban Navigation & PEAS Agent',
      icon: Car,
      scenario: 'An autonomous electric vehicle is navigating from Coimbatore to Chennai via Salem and Vellore (505 km highway network). Midway through transit, a sudden monsoon flood causes severe congestion on the primary expressway, requiring real-time dynamic re-routing while optimizing battery range, passenger safety, and arrival ETA.',
      problemStatement: 'Formulate the path planning problem using the PEAS framework and select an optimal graph search algorithm capable of dynamic re-planning under varying road edge weights.',
      objectives: [
        'Apply the PEAS framework to model an intelligent vehicular agent.',
        'Contrast BFS, DFS, UCS, and A* for urban road graphs.',
        'Incorporate Euclidean straight-line distance heuristics for admissible path optimization.'
      ],
      dataset: [
        { route: 'Primary: Coimbatore → Salem → Vellore → Chennai', distance: '505 km', normalEta: '8.5 hrs', floodEta: '13.0 hrs' },
        { route: 'Detour A: Coimbatore → Dindigul → Trichy → Villupuram → Chennai', distance: '540 km', normalEta: '9.2 hrs', floodEta: '9.5 hrs' }
      ]
    },
    {
      id: 'case-2',
      unitNum: 2,
      title: 'Probabilistic Bayesian Medical Diagnostic Network',
      icon: Activity,
      scenario: 'A tertiary hospital AI diagnostic system analyzes patient presenting symptoms to differentiate between COVID-19, Influenza, and Common Cold in outpatient triage. Tests may have false negatives, and clinical observations carry inherent uncertainty.',
      problemStatement: 'Construct a Bayesian Network DAG with Conditional Probability Tables (CPTs) to calculate posterior disease probabilities given evidence [Fever = True, Cough = True].',
      objectives: [
        'Formulate joint probability distributions using local CPT factorizations.',
        'Apply Bayes rule for clinical differential diagnosis under uncertainty.',
        'Demonstrate why rule-based logic alone is insufficient for probabilistic medical triage.'
      ],
      dataset: [
        { symptom: 'Fever', pTrueGivenCovid: '0.88', pTrueGivenFlu: '0.75', pTrueGivenCold: '0.20' },
        { symptom: 'Cough', pTrueGivenCovid: '0.82', pTrueGivenFlu: '0.80', pTrueGivenCold: '0.65' }
      ]
    },
    {
      id: 'case-3',
      unitNum: 3,
      title: 'Real Estate Property Value Multivariate Regression Pipeline',
      icon: Home,
      scenario: 'A housing finance corporation needs to automate residential property valuation across metropolitan areas to evaluate mortgage collateral risk and detect speculative real estate bubbles without appraisal bias.',
      problemStatement: 'Develop a multivariate linear regression pipeline predicting property sale price ($) from Area (sq ft), Number of Bedrooms, Age of Structure (years), and Location tier, evaluating model accuracy with MAE, RMSE, and R².',
      objectives: [
        'Design continuous supervised regression models.',
        'Encode categorical neighborhood locations via One-Hot vectors.',
        'Evaluate regression residuals and prevent overfitting via Ridge regularized penalties.'
      ],
      dataset: [
        { feature: 'Size (sq ft)', weight: '+ $165 / sq ft', impact: 'Primary positive continuous driver' },
        { feature: 'Bedrooms', weight: '+ $18,500 / room', impact: 'Positive discrete contributor' },
        { feature: 'Age (years)', weight: '- $1,800 / year', impact: 'Depreciation negative linear factor' },
        { feature: 'Location: Urban', weight: '+ $85,000 premium', impact: 'Categorical One-Hot intercept shift' }
      ]
    },
    {
      id: 'case-4',
      unitNum: 4,
      title: 'Student Performance Categorization & Academic Interventions',
      icon: GraduationCap,
      scenario: 'A university department monitors 1,200 enrolled undergraduate engineering students across attendance rate (%), continuous internal assessment marks (%), and assignment submission consistency (%). Rather than waiting for final semester failures, the administration wants to deploy early proactive academic support.',
      problemStatement: 'Develop an unsupervised K-Means clustering model (K=4) to categorize students into distinct behavioral cohorts and design tailored academic mentorship interventions for each group.',
      objectives: [
        'Apply feature standardization (Z-score) to prevent attendance scale skew.',
        'Determine optimal cluster count K using Silhouette Score analysis.',
        'Map unsupervised clusters to actionable institutional pedagogical interventions.'
      ],
      dataset: [
        { cluster: 'Cluster 1: Exemplars (28%)', attendance: '95%', marks: '88%', submission: '98%', intervention: 'Honors research, peer tutoring leadership' },
        { cluster: 'Cluster 2: Diligent Strugglers (32%)', attendance: '92%', marks: '45%', submission: '90%', intervention: 'Remedial coaching, concept clarification' },
        { cluster: 'Cluster 3: Disengaged At-Risk (18%)', attendance: '52%', marks: '38%', submission: '40%', intervention: 'Counseling, attendance monitoring, parent outreach' },
        { cluster: 'Cluster 4: Capable Procrastinators (22%)', attendance: '72%', marks: '82%', submission: '55%', intervention: 'Time-management training, structured milestones' }
      ]
    },
    {
      id: 'case-5',
      unitNum: 5,
      title: 'End-to-End Enterprise Customer Churn & Loan Pipeline with Grid Search',
      icon: TrendingDown,
      scenario: 'A multinational telecommunications provider with 150,000 subscribers experiences 14% annual customer churn. The executive committee mandates building an end-to-end machine learning pipeline with automated feature selection, 10-fold cross validation, and grid search hyperparameter tuning to reduce churn by 25%.',
      problemStatement: 'Design the full machine learning lifecycle: preprocessing categorical variables, performing Recursive Feature Elimination (RFE), running Grid Search across model depths, and setting cost-sensitive decision thresholds.',
      objectives: [
        'Handle imbalanced binary classification targets (86:14 ratio).',
        'Employ Stratified K-Fold Cross Validation to prevent fold distribution bias.',
        'Tune decision thresholds to optimize the Precision-Recall tradeoff.'
      ],
      dataset: [
        { metric: 'Cost of Churned Customer', value: '$650 loss', strategy: 'Prioritize Recall to catch churn early' },
        { metric: 'Cost of Retention Discount', value: '$35 offer', strategy: 'Balance Precision to avoid discount waste' },
        { metric: 'Tuned Threshold', value: '0.35 probability cutoff', strategy: 'Yields optimal F1 = 0.84' }
      ]
    }
  ];

  const currentCase = caseStudies[activeCaseIndex];

  // Dynamic calculations for Case Study 3 (Housing)
  const predictedPrice = Math.round(
    50000 +
    houseSize * 165 +
    houseBedrooms * 18500 -
    houseAge * 1800 +
    (houseLocation === 'Urban' ? 85000 : houseLocation === 'Suburban' ? 35000 : 0)
  );

  // Dynamic calculations for Case Study 2 (Bayesian)
  const pCovid = (patientFever ? 0.88 : 0.12) * (patientCough ? 0.82 : 0.18) * 0.15;
  const pFlu = (patientFever ? 0.75 : 0.25) * (patientCough ? 0.80 : 0.20) * 0.12;
  const pCold = (patientFever ? 0.20 : 0.80) * (patientCough ? 0.65 : 0.35) * 0.30;
  const totalP = pCovid + pFlu + pCold;
  const covidPosterior = Math.round((pCovid / totalP) * 100);
  const fluPosterior = Math.round((pFlu / totalP) * 100);
  const coldPosterior = Math.round((pCold / totalP) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Top Selector Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          Applied Real-World Case Studies · Regulations R2023_V1.2
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Industry Problem Solving & Architectural Decision Framework
        </h2>

        {/* 5 Case Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {caseStudies.map((cs, idx) => {
            const Icon = cs.icon;
            const isSelected = activeCaseIndex === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>Unit {cs.unitNum}: {cs.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* 1. Scenario & Problem Statement */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-2">
            <span>01. Operational Scenario & Challenge</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">{currentCase.title}</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">{currentCase.scenario}</p>
          <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
            <span className="text-xs font-bold text-slate-900">Problem Statement: </span>
            <span className="text-xs text-slate-700">{currentCase.problemStatement}</span>
          </div>
        </section>

        {/* 2. Learning Objectives */}
        <section>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            02. Syllabus Learning Objectives
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentCase.objectives.map((obj, i) => (
              <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Interactive Investigation & Decision Point */}
        <section className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>03. Interactive Investigation & Parameter Sensitivity</span>
          </h4>

          {/* Case 1 Interactive Controls */}
          {activeCaseIndex === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Flood Congestion Delay Multiplier on Highway NH544:
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="2.5"
                    step="0.1"
                    value={trafficMultiplier}
                    onChange={e => setTrafficMultiplier(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                    <span>1.0x (Clear)</span>
                    <span className="font-bold text-indigo-600">{trafficMultiplier}x Delay</span>
                    <span>2.5x (Gridlock)</span>
                  </div>
                </div>

                <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Path Planning Algorithm:
                  </label>
                  <div className="flex gap-2">
                    {(['A*', 'Dijkstra', 'DFS'] as const).map(alg => (
                      <button
                        key={alg}
                        onClick={() => setChosenAlgorithm(alg)}
                        className={`flex-1 py-1.5 text-xs rounded font-medium transition-colors cursor-pointer ${
                          chosenAlgorithm === alg ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {alg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                <strong>Planner Recommendation: </strong>
                {trafficMultiplier >= 1.4 ? (
                  <span className="text-indigo-700 font-medium">
                    Because delay multiplier is {trafficMultiplier}x on primary NH544 (travel time ~{(8.5 * trafficMultiplier).toFixed(1)} hrs), the A* agent automatically switches to Detour A via Dindigul & Trichy (540 km, 9.5 hrs), saving {(8.5 * trafficMultiplier - 9.5).toFixed(1)} hours of transit!
                  </span>
                ) : (
                  <span className="text-slate-600">
                    Primary route Coimbatore → Salem → Vellore → Chennai remains fastest (ETA: {(8.5 * trafficMultiplier).toFixed(1)} hrs).
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Case 2 Interactive Controls: Bayesian Diagnostic */}
          {activeCaseIndex === 1 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 bg-white p-4 border border-slate-200 rounded-lg">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={patientFever}
                    onChange={e => setPatientFever(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Presenting Symptom: High Fever (&gt; 38.5°C)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={patientCough}
                    onChange={e => setPatientCough(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Presenting Symptom: Persistent Dry Cough</span>
                </label>
              </div>

              {/* Posterior probabilities */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-500">P(COVID-19 | Evidence)</div>
                  <div className="text-2xl font-mono font-bold text-indigo-600 mt-1">{covidPosterior}%</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-500">P(Influenza | Evidence)</div>
                  <div className="text-2xl font-mono font-bold text-purple-600 mt-1">{fluPosterior}%</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-500">P(Common Cold | Evidence)</div>
                  <div className="text-2xl font-mono font-bold text-emerald-600 mt-1">{coldPosterior}%</div>
                </div>
              </div>
            </div>
          )}

          {/* Case 3 Interactive Controls: Real Estate Regression */}
          {activeCaseIndex === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 border border-slate-200 rounded-lg text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Area: {houseSize} sq ft</span>
                  <input
                    type="range"
                    min="800"
                    max="4000"
                    step="100"
                    value={houseSize}
                    onChange={e => setHouseSize(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Bedrooms: {houseBedrooms}</span>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={houseBedrooms}
                    onChange={e => setHouseBedrooms(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Age: {houseAge} yrs</span>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={houseAge}
                    onChange={e => setHouseAge(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Location:</span>
                  <select
                    value={houseLocation}
                    onChange={e => setHouseLocation(e.target.value as any)}
                    className="w-full border border-slate-300 rounded p-1 text-xs"
                  >
                    <option value="Urban">Urban (+ $85k)</option>
                    <option value="Suburban">Suburban (+ $35k)</option>
                    <option value="Rural">Rural ($0)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Predicted Property Market Valuation</div>
                  <div className="text-2xl font-mono font-bold text-indigo-600 mt-0.5">
                    ${predictedPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  R² Benchmark: 0.88 · RMSE: $18,400
                </div>
              </div>
            </div>
          )}

          {/* Case 4 Interactive Controls: Student Clustering */}
          {activeCaseIndex === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: 1, name: 'Cluster 1: Exemplars' },
                  { id: 2, name: 'Cluster 2: Diligent Strugglers' },
                  { id: 3, name: 'Cluster 3: Disengaged At-Risk' },
                  { id: 4, name: 'Cluster 4: Capable Procrastinators' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCluster(c.id)}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-left border transition-all cursor-pointer ${
                      selectedCluster === c.id
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800">
                <span className="font-bold text-indigo-700">Recommended Institutional Intervention: </span>
                {selectedCluster === 1 && 'Award undergraduate research fellowships, provide leadership peer-mentoring roles, and grant access to advanced honors coursework.'}
                {selectedCluster === 2 && 'Student possesses high dedication (92% attendance, 90% submissions) but low examination scores (45%). Deploy conceptual clarification clinics, remedial tutorials, and exam anxiety coaching.'}
                {selectedCluster === 3 && 'Critical dropout risk (52% attendance, 38% marks). Issue automated attendance alerts, arrange 1-on-1 counseling, engage academic advisors, and structure modular catch-up goals.'}
                {selectedCluster === 4 && 'High innate aptitude (82% test scores) but poor submission discipline (55%). Enforce milestone checkpoints, time-management workshops, and modular project sprints.'}
              </div>
            </div>
          )}

          {/* Case 5 Interactive Controls: Customer Churn Threshold */}
          {activeCaseIndex === 4 && (
            <div className="space-y-4">
              <div className="bg-white p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Decision Classification Threshold:</span>
                  <span className="font-mono text-indigo-600">{decisionThreshold} Cutoff</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={decisionThreshold}
                  onChange={e => setDecisionThreshold(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0.1 (High Recall / Catches all churners)</span>
                  <span>0.5 (Default balanced)</span>
                  <span>0.8 (High Precision / Few false alarms)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <span className="text-slate-500">Estimated Churn Recall:</span>
                  <div className="text-xl font-mono font-bold text-emerald-600 mt-1">
                    {decisionThreshold <= 0.35 ? '91.2%' : decisionThreshold <= 0.5 ? '78.5%' : '54.0%'}
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <span className="text-slate-500">Estimated Churn Precision:</span>
                  <div className="text-xl font-mono font-bold text-blue-600 mt-1">
                    {decisionThreshold <= 0.35 ? '68.0%' : decisionThreshold <= 0.5 ? '81.4%' : '92.1%'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. Architectural Analysis & Reflection */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            04. Architectural Solution & Alternative Approaches
          </h4>
          <div className="text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              <strong>Key Tradeoff Analysis: </strong>
              In production enterprise deployments, models cannot be evaluated purely on isolated theoretical benchmarks. Computational latency, memory constraints, and the asymmetric real-world costs of False Positives versus False Negatives dictate architecture selection.
            </p>
            <p>
              <strong>Reflective Question: </strong>
              What happens if sensory noise increases by 50% or data distribution experiences sudden concept drift? The system must incorporate continuous monitoring, Bayesian evidence propagation, and automated cross-validation retraining.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
