export type FaimlStageId = 'incident' | 'heuristics' | 'pipeline' | 'calibration' | 'clustering' | 'debrief';

export type FaimlStage = {
  id: FaimlStageId;
  label: string;
  shortLabel: string;
  description: string;
};

export const faimlStages: FaimlStage[] = [
  { id: 'incident', label: 'Formulate the ML Incident', shortLabel: 'Incident', description: 'Isolate distribution shift symptoms from verified machine learning defects.' },
  { id: 'heuristics', label: 'Optimize Heuristic Search', shortLabel: 'Search', description: 'Select admissible heuristics and state-space search strategies for clinical operations.' },
  { id: 'pipeline', label: 'Select Model & Inductive Bias', shortLabel: 'Pipeline', description: 'Balance tabular explainability, model complexity, and inference latency.' },
  { id: 'calibration', label: 'Calibrate Decision Thresholds', shortLabel: 'Thresholds', description: 'Tune operating thresholds to minimize catastrophic false negatives in triage.' },
  { id: 'clustering', label: 'Diagnose Unsupervised Cohorts', shortLabel: 'Clusters', description: 'Detect emergent biomarker drift and unlabelled sub-phenotypes using clustering.' },
  { id: 'debrief', label: 'Defend the AI System Design', shortLabel: 'Debrief', description: 'Demonstrate rigorous understanding of cost asymmetry, regularization, and fairness.' },
];

export const faimlLearningGoals = [
  'Formulate high-stakes healthcare problems into testable ML objectives',
  'Select optimal state-space search and heuristic algorithms for resource routing',
  'Balance model capacity, interpretability, and risk of shortcut learning',
  'Calibrate asymmetric decision boundaries under non-uniform misclassification costs',
  'Identify covariate shift and sub-population drift using unsupervised clustering',
];

export type IncidentOption = {
  id: string;
  label: string;
  required: boolean;
};

export const incidentOptions: IncidentOption[] = [
  { id: 'recall', label: 'Maintain clinical Sensitivity (Recall) ≥ 98% for high-risk triage alerts.', required: true },
  { id: 'latency', label: 'Ensure worst-case inference latency ≤ 100 ms per telemetry sample.', required: true },
  { id: 'calibration', label: 'Keep Expected Calibration Error (ECE) ≤ 0.05 across risk bins.', required: true },
  { id: 'drift', label: 'Trigger automated covariate shift alerts when Population Stability Index (PSI) > 0.2.', required: true },
  { id: 'llm', label: 'Replace the pipeline with an unvalidated 70B parameter conversational LLM.', required: false },
  { id: 'zero-alerts', label: 'Completely silence low-confidence alerts without physician fallback.', required: false },
];

export type SearchChallenge = {
  id: string;
  scenario: string;
  clue: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const searchChallenges: SearchChallenge[] = [
  {
    id: 'ambulance',
    scenario: 'Emergency Ambulance Routing',
    clue: 'Find guaranteed shortest time path through dynamic city road networks with Euclidean distance heuristic h(n) ≤ h*(n).',
    options: ['A* Search with Admissible Heuristic', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)'],
    answer: 0,
    explanation: 'A* search guarantees finding the optimal path with minimal node expansions when using an admissible (never overestimating) heuristic function.',
  },
  {
    id: 'triage-beds',
    scenario: 'Adversarial ICU Bed Allocation',
    clue: 'Coordinate multi-department bed assignment against unpredictable adversary emergency arrival waves with bounded search depth.',
    options: ['Minimax with Alpha-Beta Pruning', 'Greedy Best-First Search', 'Bidirectional Search'],
    answer: 0,
    explanation: 'Alpha-Beta Pruning allows evaluating deep decision trees in adversarial or worst-case environments by pruning non-influential sub-trees.',
  },
  {
    id: 'scheduling',
    scenario: 'Staff Shift & Duty Scheduling',
    clue: 'Solve high-dimensional combinatorial constraint satisfaction problem with complex soft work-hour preferences.',
    options: ['Simulated Annealing / Genetic Algorithm', 'Uniform-Cost Search', 'Hill Climbing without restarts'],
    answer: 0,
    explanation: 'Stochastic meta-heuristics like Simulated Annealing escape local optima when solving dense multi-constraint scheduling problems.',
  },
];

export type CandidateModel = {
  id: string;
  name: string;
  family: 'Linear Model' | 'Ensemble Trees' | 'Deep Neural Network';
  latencyMs: number;
  interpretability: 'High (Direct Coefficients)' | 'Medium (Feature Importance)' | 'Low (Black-Box Embeddings)';
  parameters: string;
  tradeoff: string;
  bestFit: boolean;
};

export const candidateModels: CandidateModel[] = [
  {
    id: 'logistic-l1',
    name: 'L1-Regularized Logistic Regression (Lasso)',
    family: 'Linear Model',
    latencyMs: 3,
    interpretability: 'High (Direct Coefficients)',
    parameters: 'Sparse weights, L1 penalty (λ = 0.04)',
    tradeoff: 'Guarantees clinical explainability and zero non-essential feature noise; assumes monotonic log-odds relationships.',
    bestFit: false,
  },
  {
    id: 'gradient-boost',
    name: 'Calibrated Gradient Boosted Trees (LightGBM)',
    family: 'Ensemble Trees',
    latencyMs: 12,
    interpretability: 'Medium (Feature Importance)',
    parameters: '120 trees, max_depth = 4, Platt scaling',
    tradeoff: 'Captures critical non-linear biomarker interactions with fast tabular inference and robust split attribution via SHAP.',
    bestFit: true,
  },
  {
    id: 'deep-mlp',
    name: 'Deep Multilayer Perceptron (6 Layers)',
    family: 'Deep Neural Network',
    latencyMs: 84,
    interpretability: 'Low (Black-Box Embeddings)',
    parameters: '1.4M weights, Dropout 0.3, AdamW',
    tradeoff: 'Prone to overfitting tabular data with spurious correlation shortcuts; requires heavy GPU memory and opaque post-hoc probing.',
    bestFit: false,
  },
];

export type ThresholdScenario = {
  id: string;
  threshold: number;
  label: string;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  sensitivity: number;
  precision: number;
  f2Score: number;
  outcome: string;
  isOptimal: boolean;
};

export const thresholdScenarios: ThresholdScenario[] = [
  {
    id: 'standard',
    threshold: 0.50,
    label: 'Standard Default (0.50)',
    tp: 82,
    fp: 8,
    tn: 292,
    fn: 18,
    sensitivity: 82.0,
    precision: 91.1,
    f2Score: 83.7,
    outcome: 'DANGEROUS: 18 critically ill patients are misclassified as low-risk (False Negatives) causing catastrophic care delays.',
    isOptimal: false,
  },
  {
    id: 'optimal',
    threshold: 0.28,
    label: 'Calibrated Clinical Safety (0.28)',
    tp: 99,
    fp: 21,
    tn: 279,
    fn: 1,
    sensitivity: 99.0,
    precision: 82.5,
    f2Score: 95.2,
    outcome: 'OPTIMAL: Catches 99% of deteriorating patients while maintaining manageable nurse verification workload (F2-score maximized).',
    isOptimal: true,
  },
  {
    id: 'ultra-sensitive',
    threshold: 0.12,
    label: 'Ultra-Sensitive Over-Alarm (0.12)',
    tp: 100,
    fp: 165,
    tn: 135,
    fn: 0,
    sensitivity: 100.0,
    precision: 37.7,
    f2Score: 75.1,
    outcome: 'UNWORKABLE: 165 False Positives trigger severe nurse alert fatigue, causing medical staff to mute the system entirely.',
    isOptimal: false,
  },
];

export type CohortCluster = {
  id: string;
  name: string;
  patientCount: number;
  primaryBiomarkers: string;
  riskProfile: 'Low' | 'Moderate' | 'Critical Emergency' | 'Emergent Shift Variant';
  action: string;
  isDriftCohort: boolean;
};

export const cohortClusters: CohortCluster[] = [
  {
    id: 'cluster-1',
    name: 'Cluster A: Standard Seasonal Influenza',
    patientCount: 420,
    primaryBiomarkers: 'Mild elevated temperature, normal leukocyte count, SaO2 > 96%',
    riskProfile: 'Moderate',
    action: 'Standard triage protocol; model predictions remain well-calibrated.',
    isDriftCohort: false,
  },
  {
    id: 'cluster-2',
    name: 'Cluster B: Acute Cardiogenic Shock',
    patientCount: 74,
    primaryBiomarkers: 'Severe hypotension, elevated troponin, tachypnea',
    riskProfile: 'Critical Emergency',
    action: 'Immediate red-tier triage override; established clinical rules match predictions.',
    isDriftCohort: false,
  },
  {
    id: 'cluster-3',
    name: 'Cluster C: Atypical Novel Viral Surge',
    patientCount: 186,
    primaryBiomarkers: 'Rapid desaturation without fever, abnormal D-dimer, atypical CT ground-glass opacities',
    riskProfile: 'Emergent Shift Variant',
    action: 'COVARIATE DRIFT IDENTIFIED: Model fails because training data lacked this phenotype. Flag for immediate active-learning retraining.',
    isDriftCohort: true,
  },
  {
    id: 'cluster-4',
    name: 'Cluster D: Ambulatory Outpatient Care',
    patientCount: 650,
    primaryBiomarkers: 'Normal vital signs, superficial injuries, normal lactate',
    riskProfile: 'Low',
    action: 'Routine clinic queue; 99.8% precision with minimal clinical risk.',
    isDriftCohort: false,
  },
];

export type FaimlQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const faimlQuestions: FaimlQuestion[] = [
  {
    id: 'q1-cost-matrix',
    prompt: 'In clinical diagnostic AI, why is the cost of a False Negative (missed critical illness) significantly higher than a False Positive (unnecessary confirmatory blood panel)?',
    options: [
      'Because diagnostic precision is the only metric regulated by healthcare accreditation bodies.',
      'Because a False Negative delays life-saving interventions, while a False Positive incurs only minor validation testing costs.',
      'Because machine learning models cannot compute confusion matrices when costs are symmetric.',
      'Because True Negatives always outnumber True Positives in balanced training datasets.',
    ],
    answer: 1,
    explanation: 'Asymmetric misclassification loss is fundamental in medical AI: failing to detect a critical sepsis or pneumonia patient has fatal consequences, whereas a false alarm can be ruled out by quick secondary physician review.',
  },
  {
    id: 'q2-data-leakage',
    prompt: 'When preparing temporal biometric telemetry from 5,000 patients for cross-validation, how must the data be partitioned to prevent data leakage?',
    options: [
      'Perform standard random train/test split on individual 10-second telemetry window rows.',
      'Group splits strictly by unique Patient ID so no patient’s vitals appear in both training and test folds.',
      'Duplicate the most severe patient vitals across all folds to artificially balance class proportions.',
      'Apply Min-Max scaling on the entire dataset prior to splitting into validation folds.',
    ],
    answer: 1,
    explanation: 'Grouping by Patient ID (GroupKFold) prevents identity and autocorrelation leakage. Standard row-level splitting lets the model memorize specific patient physiological quirks rather than generalizable medical disease patterns.',
  },
  {
    id: 'q3-regularization',
    prompt: 'Why is L1 (Lasso) regularization preferred over L2 (Ridge) when reducing 250 blood biomarker features to a compact bedside clinical panel?',
    options: [
      'L1 regularization drives irrelevant feature weights strictly to zero, yielding sparse and explainable models.',
      'L1 regularization guarantees that the loss function will always remain strictly non-convex.',
      'L2 regularization completely eliminates the need to normalize numerical continuous features.',
      'L1 regularization replaces gradient descent with brute-force analytical matrix inversion.',
    ],
    answer: 0,
    explanation: 'The L1 norm constraint has sharp corners along coordinate axes in parameter space. Constrained optimization tends to contact these corners first, setting non-predictive biomarker coefficients exactly to zero for automated feature selection.',
  },
  {
    id: 'q4-covariate-shift',
    prompt: 'What characterizes covariate shift in a deployed machine learning model?',
    options: [
      'The label conditional distribution P(Y|X) changes while the input marginal distribution P(X) remains static.',
      'The input distribution P(X) shifts over time (e.g. seasonal patient demographics) while the underlying biological mechanism P(Y|X) remains unchanged.',
      'The model weights become randomly corrupted due to hard-drive bit rot on the server.',
      'The gradient of the cross-entropy loss function evaluates to zero during production inference.',
    ],
    answer: 1,
    explanation: 'Covariate shift occurs when P(X) drifts (such as an older or more vulnerable patient intake during a seasonal respiratory epidemic), meaning the model is operating in unobserved regions of the feature space even though the underlying disease physics hasn’t changed.',
  },
  {
    id: 'q5-shapley',
    prompt: 'How do SHAP (Shapley Additive Explanations) values support physician trust when an AI flags a patient for emergency admission?',
    options: [
      'They prove the model has 100% mathematical accuracy on all unseen future patient populations.',
      'They provide game-theoretic, locally consistent additive contributions showing how each patient vital pushed the prediction above the decision threshold.',
      'They encrypt patient identification records using quantum-resistant cryptographic hashing.',
      'They automatically retrain the neural network whenever an emergency doctor disagrees with an alert.',
    ],
    answer: 1,
    explanation: 'Rooted in cooperative game theory, SHAP decomposes the difference between the base rate and the specific patient prediction into additive feature contributions, allowing doctors to inspect exactly why oxygen saturation, respiratory rate, and lactate elevated the risk score.',
  },
];

export type FaimlUnitMeta = {
  unitNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  shortTitle: string;
  tagline: string;
  syllabusTopic: string;
};

export const faimlUnits: FaimlUnitMeta[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Autonomous Vehicle Urban Navigation & PEAS Search',
    shortTitle: 'Unit 1: Navigation & PEAS',
    tagline: 'Formulate PEAS agent models and dynamically replan paths with A* and admissible heuristics under severe monsoon congestion.',
    syllabusTopic: 'Intelligent Agents, PEAS Framework, BFS, DFS, UCS, A*, Admissible Heuristics',
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Probabilistic Bayesian Medical Diagnostic Network',
    shortTitle: 'Unit 2: Bayesian Diagnostics',
    tagline: 'Construct Bayesian DAGs, evaluate Conditional Probability Tables, and perform live posterior inference for clinical triage under uncertainty.',
    syllabusTopic: 'Adversarial Games, Propositional Logic, First-Order Quantifiers, Bayesian Networks, Bayes Rule',
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Real Estate Property Value Multivariate Regression Pipeline',
    shortTitle: 'Unit 3: Property Regression',
    tagline: 'Build continuous supervised regression models, encode categorical neighborhood tiers, evaluate residuals, and apply Ridge L2 regularisation.',
    syllabusTopic: 'Supervised Learning, Continuous Regression, Bias-Variance Tradeoff, L2 Regularization, Decision Trees, SVM',
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Student Cohorts & K-Means Academic Interventions',
    shortTitle: 'Unit 4: Student Clustering',
    tagline: 'Standardize multi-scale student telemetry, identify optimal clusters with Silhouette Analysis, and map cohorts to institutional mentorship.',
    syllabusTopic: 'Unsupervised Learning, Z-Score Scaling, K-Means Clustering, DBSCAN, Silhouette Score, PCA',
  },
  {
    unitNumber: 5,
    title: 'Unit 5: Clinical Sepsis Triage & Decision Threshold Calibration',
    shortTitle: 'Unit 5: Sepsis & Thresholds',
    tagline: 'Tackle severe class imbalance, calibrate asymmetric cost-sensitive thresholds, and detect emergent biomarker drift in safety-critical AI.',
    syllabusTopic: 'Feature Preprocessing, Confusion Matrix, ROC-AUC, Precision-Recall, Stratified K-Fold, Covariate Drift',
  },
];

// Unit 1 Data
export const unit1Data = {
  title: 'Autonomous Vehicle Urban Navigation & PEAS Agent',
  scenario:
    'An autonomous electric vehicle is navigating from Coimbatore to Chennai via Salem and Vellore (505 km highway network). Midway through transit, a sudden monsoon flood causes severe congestion on the primary expressway, requiring real-time dynamic re-routing while optimizing battery range, passenger safety, and arrival ETA.',
  problemStatement:
    'Formulate the path planning problem using the PEAS framework and select an optimal graph search algorithm capable of dynamic re-planning under varying road edge weights.',
  objectives: [
    'Apply the PEAS framework to model an intelligent vehicular agent.',
    'Contrast BFS, DFS, UCS, and A* for urban road graphs.',
    'Incorporate Euclidean straight-line distance heuristics for admissible path optimization.',
  ],
  peas: {
    performance: [
      'Minimize total travel time (ETA)',
      'Maximize battery range & energy efficiency',
      'Maintain zero collision safety record',
      'Optimize passenger comfort & reduce jerk',
    ],
    environment: [
      'Tamil Nadu arterial road network (NH544 / NH45)',
      'Sudden monsoon rainstorms & flash flood hazards',
      'Variable lane density & construction bottlenecks',
      'Charging plaza locations & fast-charger availability',
    ],
    actuators: [
      'Steering servo mechanism',
      'Electronic throttle control',
      'Regenerative braking system',
      'Dynamic GPS route recalculation engine',
    ],
    sensors: [
      '360° Solid-state LiDAR scanners',
      'Forward stereoscopic optical cameras',
      'Differential RTK-GPS receiver',
      'Real-time traffic incident telemetry feed',
    ],
  },
  routes: [
    {
      id: 'primary',
      name: 'Primary NH544 Corridor',
      corridor: 'Coimbatore → Salem → Vellore → Chennai',
      distanceKm: 505,
      baseEtaHours: 8.5,
      floodVulnerable: true,
      description: 'Standard 4-lane expressway corridor; vulnerable to monsoon flooding around Salem-Vellore bypass.',
    },
    {
      id: 'detour',
      name: 'Detour A (Southern Bypass)',
      corridor: 'Coimbatore → Dindigul → Trichy → Villupuram → Chennai',
      distanceKm: 540,
      baseEtaHours: 9.5,
      floodVulnerable: false,
      description: 'Elevated, flood-resistant secondary corridor with consistent transit times during monsoon alerts.',
    },
  ],
  questions: [
    {
      id: 'u1-admissibility',
      prompt: 'Why is an admissible heuristic h(n) guaranteed to find an optimal path in A* search?',
      options: [
        'Because an admissible heuristic never overestimates the true remaining cost h*(n) to reach the goal.',
        'Because an admissible heuristic converts graph search into Depth-First Search.',
        'Because an admissible heuristic always equals zero for all visited nodes.',
        'Because an admissible heuristic guarantees that the search graph has zero cycles.',
      ],
      answer: 0,
      explanation:
        'By never overestimating the remaining cost h*(n), an admissible heuristic guarantees that when the goal node is expanded, no remaining candidate node on the frontier could lead to a lower-cost path, preserving mathematical optimality.',
    },
    {
      id: 'u1-dynamic-replanning',
      prompt: 'When a flash flood increases transit delay on the primary highway to 2.2x, how does the A* planner respond?',
      options: [
        'It terminates immediately and flags an irrecoverable planning exception.',
        'It updates edge weights g(n) for the flooded segments and dynamically branches to Detour A where f(n) becomes lower.',
        'It switches to Breadth-First Search and ignores all distance information.',
        'It continues on the flooded road to preserve the initial static route.',
      ],
      answer: 1,
      explanation:
        'With primary route transit time escalating from 8.5h to 18.7h (8.5 * 2.2), Detour A (9.5h) exhibits a significantly lower estimated total cost f(n) = g(n) + h(n), causing the priority queue to expand Detour A and re-route the vehicle automatically.',
    },
  ],
};

// Unit 2 Data
export const unit2Data = {
  title: 'Probabilistic Bayesian Medical Diagnostic Network',
  scenario:
    'A tertiary hospital AI diagnostic system analyzes patient presenting symptoms in emergency outpatient triage to differentiate between COVID-19, Influenza, and Common Cold under noisy, uncertain clinical evidence.',
  problemStatement:
    'Construct a Bayesian Network DAG with Conditional Probability Tables (CPTs) to calculate posterior disease probabilities given evidence [Fever = True, Cough = True].',
  objectives: [
    'Formulate joint probability distributions using local CPT factorizations.',
    'Apply Bayes rule for clinical differential diagnosis under uncertainty.',
    'Demonstrate why rule-based logic alone is insufficient for probabilistic medical triage.',
  ],
  priorProbabilities: {
    covid: 0.15,
    flu: 0.12,
    cold: 0.30,
  },
  cpt: [
    { symptom: 'High Fever (> 38.5°C)', pCovid: 0.88, pFlu: 0.75, pCold: 0.20 },
    { symptom: 'Persistent Dry Cough', pCovid: 0.82, pFlu: 0.80, pCold: 0.65 },
    { symptom: 'Anosmia / Loss of Smell', pCovid: 0.68, pFlu: 0.10, pCold: 0.05 },
    { symptom: 'Severe Fatigue & Body Ache', pCovid: 0.70, pFlu: 0.85, pCold: 0.25 },
  ],
  questions: [
    {
      id: 'u2-bayes-independence',
      prompt: 'In a Naive Bayesian diagnostic network, what critical conditional independence assumption is made?',
      options: [
        'Symptoms are conditionally independent of each other given the disease state: P(S1, S2 | D) = P(S1 | D) * P(S2 | D).',
        'All diseases are assumed to have identical prior prevalence in the community.',
        'A patient can never present with more than one symptom simultaneously.',
        'Diagnostic tests are assumed to have zero false negative rate.',
      ],
      answer: 0,
      explanation:
        'Conditional independence allows the joint likelihood of multiple symptoms to be factored into simple products of individual CPT entries, reducing computational complexity from exponential to linear.',
    },
    {
      id: 'u2-bayes-rule',
      prompt: 'Why is deterministic IF-THEN rule programming inferior to Bayesian networks in medical differential diagnosis?',
      options: [
        'Deterministic rules cannot handle overlapping symptoms, partial evidence, or noisy sensor readings with calibrated confidence intervals.',
        'Deterministic rules cannot execute on modern server CPUs.',
        'Bayesian networks do not require any probability tables to make predictions.',
        'Doctors prefer systems that never give confidence percentages.',
      ],
      answer: 0,
      explanation:
        'Because COVID-19, Flu, and Cold share common symptoms like cough and fever, rigid IF-THEN rules trigger conflicting logic. Bayesian networks compute exact posterior distributions P(Disease | Evidence), enabling doctors to weigh risk probabilistically.',
    },
  ],
};

// Unit 3 Data
export const unit3Data = {
  title: 'Real Estate Property Value Multivariate Regression Pipeline',
  scenario:
    'A regional housing finance corporation automates residential property valuation across metropolitan areas to evaluate mortgage collateral risk and detect speculative real estate bubbles without appraisal bias.',
  problemStatement:
    'Develop a multivariate linear regression pipeline predicting property sale price ($) from Area (sq ft), Number of Bedrooms, Age of Structure (years), and Location tier, evaluating model accuracy with MAE, RMSE, and R².',
  objectives: [
    'Design continuous supervised regression models.',
    'Encode categorical neighborhood locations via One-Hot vectors.',
    'Evaluate regression residuals and prevent overfitting via Ridge regularized penalties.',
  ],
  basePrice: 50000,
  weights: {
    areaSqft: 165,
    bedrooms: 18500,
    ageYear: -1800,
  },
  locationPremiums: {
    Urban: 85000,
    Suburban: 35000,
    Rural: 0,
  },
  benchmarkMetrics: {
    r2: 0.88,
    rmse: 18400,
    mae: 12300,
  },
  questions: [
    {
      id: 'u3-ridge-regularization',
      prompt: 'Why is Ridge (L2) regularization introduced when predicting house prices from correlated features like area and bedroom count?',
      options: [
        'Ridge adds a squared penalty λ * Σ(w_j²) to the loss, shrinking coefficient sizes and dampening variance from multicollinearity.',
        'Ridge sets irrelevant feature weights strictly to zero for automatic sparsity.',
        'Ridge converts continuous regression into a binary classification decision tree.',
        'Ridge eliminates the need for calculating regression residuals.',
      ],
      answer: 0,
      explanation:
        'Multicollinearity between area and bedroom count inflates coefficient variance in ordinary least squares. Ridge regularization shrinks the weights toward zero, producing a more stable and generalizable predictive model.',
    },
    {
      id: 'u3-metrics',
      prompt: 'When evaluating a continuous real estate valuation model, what does an R² benchmark of 0.88 signify?',
      options: [
        '88% of the variance in property sale prices is explained by the regression features (area, bedrooms, age, and location).',
        'The model makes mistakes on exactly 12% of the properties evaluated.',
        'The maximum possible prediction error is $88,000.',
        'The learning rate for gradient descent should be set to 0.88.',
      ],
      answer: 0,
      explanation:
        'The coefficient of determination R² measures the proportion of total variation in the target variable explained by the regression model; 0.88 indicates strong predictive fidelity on validation holdout samples.',
    },
  ],
};

// Unit 4 Data
export const unit4Data = {
  title: 'Student Performance Categorization & Academic Interventions',
  scenario:
    'A university department monitors 1,200 enrolled undergraduate engineering students across attendance rate (%), continuous internal assessment marks (%), and assignment submission consistency (%). Rather than waiting for final semester failures, the administration wants to deploy early proactive academic support.',
  problemStatement:
    'Develop an unsupervised K-Means clustering model (K=4) to categorize students into distinct behavioral cohorts and design tailored academic mentorship interventions for each group.',
  objectives: [
    'Apply feature standardization (Z-score) to prevent attendance scale skew.',
    'Determine optimal cluster count K using Silhouette Score analysis.',
    'Map unsupervised clusters to actionable institutional pedagogical interventions.',
  ],
  clusters: [
    {
      id: 1,
      name: 'Cluster 1: Exemplars',
      percentage: '28%',
      attendance: '95%',
      marks: '88%',
      submission: '98%',
      profile: 'Consistent top performers with high intrinsic motivation and rigorous submission habits.',
      intervention: 'Award undergraduate research fellowships, peer tutoring leadership, and advanced honors coursework.',
    },
    {
      id: 2,
      name: 'Cluster 2: Diligent Strugglers',
      percentage: '32%',
      attendance: '92%',
      marks: '45%',
      submission: '90%',
      profile: 'High dedication and near-perfect attendance, but experiencing conceptual comprehension bottlenecks in examinations.',
      intervention: 'Deploy conceptual clarification clinics, remedial tutorials, and exam anxiety coaching.',
    },
    {
      id: 3,
      name: 'Cluster 3: Disengaged At-Risk',
      percentage: '18%',
      attendance: '52%',
      marks: '38%',
      submission: '40%',
      profile: 'Critical dropout risk with severe absenteeism and missing coursework.',
      intervention: 'Automated attendance warnings, 1-on-1 counseling, faculty advisor check-ins, and modular catch-up goals.',
    },
    {
      id: 4,
      name: 'Cluster 4: Capable Procrastinators',
      percentage: '22%',
      attendance: '72%',
      marks: '82%',
      submission: '55%',
      profile: 'High innate aptitude and exam scores, but erratic submission discipline and last-minute cramming.',
      intervention: 'Enforce milestone checkpoints, time-management workshops, and modular project sprints.',
    },
  ],
  silhouetteBenchmarks: [
    { k: 2, score: 0.58, status: 'Under-clustered (Coarse)' },
    { k: 3, score: 0.65, status: 'Sub-optimal separation' },
    { k: 4, score: 0.74, status: 'Optimal Cohort Partitioning' },
    { k: 5, score: 0.61, status: 'Over-split (Noisy boundaries)' },
  ],
  questions: [
    {
      id: 'u4-scaling',
      prompt: 'Why must student telemetry features (attendance %, marks %, submissions %) be standardized before running K-Means?',
      options: [
        'K-Means calculates Euclidean distance; unstandardized features with larger scales or variances will artificially dominate distance calculations.',
        'Standardization converts unsupervised clustering into supervised logistic regression.',
        'K-Means can only accept inputs between -1 and +1.',
        'Centroid update vectors evaluate to NaN if data is not standardized.',
      ],
      answer: 0,
      explanation:
        'Euclidean distance computes sqrt(sum((x_i - y_i)^2)). If one feature has wide dispersion or different units, it disproportionately dictates cluster assignments unless normalized with Z-scores.',
    },
    {
      id: 'u4-silhouette-optimal',
      prompt: 'In this student cohort case study, why is K=4 selected as the optimal cluster count over K=2 or K=5?',
      options: [
        'The Silhouette Score reaches its global peak at K=4 (s = 0.74), indicating maximum within-cluster cohesion and between-cluster separation.',
        'The academic department only employs 4 faculty advisors.',
        'K-Means algorithms are mathematically restricted to powers of 2.',
        'The elbow plot requires K to equal the number of input features.',
      ],
      answer: 0,
      explanation:
        'A high silhouette score (0.74) proves that K=4 forms tightly clustered, well-isolated behavioral cohorts that map naturally to specific institutional mentoring strategies.',
    },
  ],
};
