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
