const note = (
  slug: string,
  title: string,
  description: string,
  focus: string,
  takeaways: string[],
  caseStudyTitle: string,
  caseStudyContent: string
) => ({
  slug,
  title,
  description,
  markdown: `## Learning objectives\n\n${description}\n\n## Syllabus focus\n\n${focus}\n\n## Revision checklist\n\n${takeaways.map((item) => `- ${item}`).join('\n')}\n\n## Case study: ${caseStudyTitle}\n\n${caseStudyContent}\n\n## Practice prompt\n\nExplain the central idea in your own words, work one small example by hand, and connect it to a real system. Then state one assumption or limitation that could change the result.`,
});

export const faiml = {
  slug: 'fundamentals-of-artificial-intelligence-and-machine-learning',
  title: 'Fundamentals of Artificial Intelligence and Machine Learning',
  subject: 'Artificial Intelligence and Machine Learning',
  code: '2311CSC303J',
  term: 3,
  description: 'A course-note edition of the FAIML syllabus: intelligent agents, reasoning, machine learning, clustering, preprocessing, and trustworthy evaluation.',
  modules: [
    note(
      'faiml-unit-1',
      'Unit 1: Introduction to AI and Search Algorithms',
      'Build a formal vocabulary for intelligent agents and problem solving.',
      'Intelligent agents and the PEAS framework; state-space problem formulation; breadth-first search, depth-first search, and uniform-cost search; A* with f(n) = g(n) + h(n); admissible heuristics; vacuum-world and navigation examples.',
      [
        'Differentiate acting humanly, thinking rationally, and acting rationally.',
        'Write a PEAS specification for an autonomous system.',
        'Compare BFS, DFS, UCS, and A* on completeness, optimality, time, and space.',
        'Trace A* and justify why an admissible heuristic preserves optimality.'
      ],
      'Autonomous Vehicle Urban Navigation & PEAS Agent',
      `An autonomous electric vehicle navigates an intercity arterial network between Coimbatore, Salem, Vellore, and Chennai (505 km). During transit, sudden monsoon rainfall induces flash flooding on the primary NH544 expressway, tripling edge transit costs.

**PEAS Specification:**
- **Performance Measure**: Minimize total travel time (ETA), maximize battery remaining capacity, maintain zero collisions, and optimize passenger comfort.
- **Environment**: Dynamic highway network, variable weather, traffic congestion, and alternate toll roads.
- **Actuators**: Steering servo, throttle actuator, regenerative braking, dynamic GPS re-routing subsystem.
- **Sensors**: Long-range LiDAR, stereo optical cameras, wheel encoders, RTK-GPS, and connected vehicle traffic APIs.

**Search Strategy Formulation:**
The navigation engine models nodes as road intersections and edge weights as estimated transit minutes $g(n)$. Using straight-line Euclidean distance to the destination as an admissible heuristic $h(n) \\le h^*(n)$, the $A^*$ search algorithm computes $f(n) = g(n) + h(n)$. When the flood delay multiplier exceeds $1.4\\times$ on the primary corridor, $A^*$ dynamically branches to Detour A via Dindigul and Trichy (540 km, 9.5 hours), guaranteeing an optimal path while saving up to 3.5 hours compared to the gridlocked primary route.`
    ),
    note(
      'faiml-unit-2',
      'Unit 2: Knowledge Representation and Reasoning',
      'Represent facts, uncertainty, and goals so an agent can derive useful conclusions.',
      'Mini-Max for two-player zero-sum games; alpha-beta pruning when alpha is greater than or equal to beta; propositional logic and resolution; first-order quantifiers; forward versus backward chaining; Wumpus World deductions; Bayesian networks and conditional probability.',
      [
        'Evaluate a small Mini-Max tree and mark pruned branches.',
        'Convert an implication into clauses and complete a resolution proof.',
        'Contrast universal and existential instantiation and generalisation.',
        'Show how a percept in Wumpus World narrows possible hazards.',
        'Explain how a Bayesian network represents conditional dependencies.'
      ],
      'Probabilistic Bayesian Medical Diagnostic Network',
      `An emergency outpatient triage system analyzes presenting symptoms to differentiate between COVID-19, Influenza, and Common Cold under noisy clinical observations.

**Bayesian Network Topology:**
The disease hypothesis node $D \\in \\{\\text{COVID-19}, \\text{Flu}, \\text{Cold}\\}$ acts as a common parent to conditionally independent symptom evidence nodes $E_1 = \\text{Fever}$ and $E_2 = \\text{Cough}$.
- Prior distribution: $P(\\text{COVID}) = 0.15$, $P(\\text{Flu}) = 0.12$, $P(\\text{Cold}) = 0.30$.
- Conditional Probability Table (CPT):
  - $P(\\text{Fever} = \\text{true} \\mid \\text{COVID}) = 0.88$, $P(\\text{Fever} = \\text{true} \\mid \\text{Flu}) = 0.75$, $P(\\text{Fever} = \\text{true} \\mid \\text{Cold}) = 0.20$.
  - $P(\\text{Cough} = \\text{true} \\mid \\text{COVID}) = 0.82$, $P(\\text{Cough} = \\text{true} \\mid \\text{Flu}) = 0.80$, $P(\\text{Cough} = \\text{true} \\mid \\text{Cold}) = 0.65$.

**Posterior Inference via Bayes Rule:**
Given patient evidence $E = [\\text{Fever}=\\text{true}, \\text{Cough}=\\text{true}]$:
$$P(D_i \\mid E) = \\frac{P(\\text{Fever} \\mid D_i) P(\\text{Cough} \\mid D_i) P(D_i)}{\\sum_j P(\\text{Fever} \\mid D_j) P(\\text{Cough} \\mid D_j) P(D_j)}$$
Calculating the normalized posterior yields $P(\\text{COVID} \\mid E) \\approx 50.8\\%$, $P(\\text{Flu} \\mid E) \\approx 36.3\\%$, and $P(\\text{Cold} \\mid E) \\approx 12.9\\%$. Unlike deterministic rule engines that fail on overlapping symptoms, the Bayesian network provides calibrated confidence intervals that justify triaging the patient for rapid PCR confirmation.`
    ),
    note(
      'faiml-unit-3',
      'Unit 3: Introduction to Machine Learning',
      'Move from hand-written rules to models that learn patterns from data.',
      'Machine learning versus traditional programming; supervised, unsupervised, and reinforcement learning; train-test splits and the end-to-end pipeline; classification versus regression; bias-variance trade-off; underfitting, overfitting, regularisation, pruning, early stopping, decision trees, SVM, and KNN.',
      [
        'Select a learning paradigm for a stated problem.',
        'Separate classification targets from continuous regression targets.',
        'Interpret a training-versus-testing error gap.',
        'Explain how regularisation and validation improve generalisation.',
        'Compare decision trees, SVM, and KNN by assumptions and use cases.'
      ],
      'Real Estate Property Value Multivariate Regression Pipeline',
      `A regional housing finance corporation automates residential valuation to audit property appraisals and compute fair collateral loan-to-value (LTV) limits.

**Multivariate Feature Formulation:**
Target variable: Continuous Sale Price $\\hat{y}$ ($USD).
- $x_1$: Living Area (sq ft) - Weight: $+\\$165 / \\text{sq ft}$
- $x_2$: Number of Bedrooms - Weight: $+\\$18,500 / \\text{room}$
- $x_3$: Structure Age (years) - Weight: $-\\$1,800 / \\text{year}$
- $x_4$: Neighborhood Location (One-Hot Encoded): Urban ($+\\$85,000$), Suburban ($+\\$35,000$), Rural ($+\\$0$)

**Predictive Model & Regularization:**
$$\\hat{y} = 50000 + 165 \\cdot x_1 + 18500 \\cdot x_2 - 1800 \\cdot x_3 + \\text{LocationPremium}$$
To prevent overfitting caused by collinearity between property area and bedroom count, the pipeline trains a Ridge ($L_2$) regularized regression minimizing:
$$\\mathcal{L}_{\\text{Ridge}} = \\frac{1}{2n}\\sum_{i=1}^n (y_i - \\hat{y}_i)^2 + \\lambda \\sum_{j=1}^p w_j^2$$
Validation across an 80/20 train-test split yields $R^2 = 0.88$ with an $\\text{RMSE}$ of $\\$18,400$, successfully eliminating human appraiser bias while maintaining explainable feature coefficients.`
    ),
    note(
      'faiml-unit-4',
      'Unit 4: Unsupervised Learning and Clustering',
      'Discover structure in unlabelled data and check whether the structure is useful.',
      'Feature scaling with min-max normalisation and z-scores; K-Means centroid updates; DBSCAN core, border, and noise points; hierarchical clustering and dendrograms; the curse of dimensionality; PCA and manifold learning; silhouette, Davies-Bouldin, and Calinski-Harabasz validation.',
      [
        'Run one K-Means assignment and centroid-update step.',
        'Explain when DBSCAN is preferable to K-Means.',
        'Read a dendrogram and describe an appropriate cut.',
        'Describe the main stages of PCA from scaling to projection.',
        'Interpret higher or lower values for common clustering metrics.'
      ],
      'Student Performance Categorization & Academic Interventions',
      `An engineering university analyzes behavioral telemetry across 1,200 undergraduate students to identify at-risk learners early in the semester without relying solely on final examination grades.

**Clustering Methodology:**
Input features are standardized using Z-score normalisation: $z = (x - \\mu) / \\sigma$ across:
1. Lecture attendance rate (%)
2. Midterm internal marks (%)
3. Continuous assignment submission cadence (%)

Using the $K$-Means clustering algorithm, the administration evaluates $K \\in [2, 5]$. The Silhouette Score peaks at $K=4$ ($s = 0.74$), revealing 4 distinct behavioral clusters:
- **Cluster 1 (28%): Exemplars** (95% attendance, 88% marks, 98% submissions) $\\to$ Mentorship leadership, honors coursework.
- **Cluster 2 (32%): Diligent Strugglers** (92% attendance, 45% marks, 90% submissions) $\\to$ Remedial concept clinics and peer tutoring.
- **Cluster 3 (18%): Disengaged At-Risk** (52% attendance, 38% marks, 40% submissions) $\\to$ Immediate academic counselor intervention and attendance contracts.
- **Cluster 4 (22%): Capable Procrastinators** (72% attendance, 82% marks, 55% submissions) $\\to$ Milestone checkpoint deadlines and structured project sprints.`
    ),
    note(
      'faiml-unit-5',
      'Unit 5: Applied Machine Learning and Evaluation',
      'Prepare features, tune models, and report performance without hiding important errors.',
      'One-hot versus label encoding; filter, wrapper, and embedded feature selection; confusion-matrix counts; accuracy, precision, recall, F1, ROC-AUC; hold-out, K-Fold, and stratified K-Fold validation; data leakage; Grid Search; loan approval and customer churn pipelines.',
      [
        'Choose encoding based on whether a category is nominal or ordinal.',
        'Calculate metrics from TP, TN, FP, and FN.',
        'Explain why accuracy can mislead on imbalanced data.',
        'Compare hold-out, K-Fold, and stratified validation.',
        'Separate learned parameters from hyperparameters and describe Grid Search.',
        'Select a metric that reflects the cost of false positives and false negatives.'
      ],
      'Clinical Diagnostic Sepsis-Risk Alerting & Decision Threshold Calibration',
      `An emergency hospital network monitors patient vital sign streams to detect early septic shock. The raw dataset is severely class-imbalanced, with only 5% of patients developing septic shock.

**Cost-Sensitive Evaluation & Threshold Tuning:**
Standard classification models using a default threshold of $0.50$ achieve 95% raw accuracy by predicting "No Sepsis", yet miss 18 out of 100 septic cases—an unacceptable clinical outcome.
- **Cost Asymmetry**: A False Negative (missed sepsis) leads to patient fatality. A False Positive (unnecessary alert) requires only a quick 2-minute nurse check.
- **Decision Threshold Calibration**: Lowering the classification decision threshold from $0.50$ to $0.28$ shifts the confusion matrix:
  - True Positives increase from 82 to 99 (Sensitivity / Recall $= 99.0\\%$).
  - False Negatives drop from 18 to 1.
  - $F_2$-score, which weights recall twice as high as precision, peaks at $95.2\\%$.

**Production Pipeline Validation:**
The model uses Stratified 10-Fold Cross Validation to maintain class proportions across folds, and incorporates an automated Population Stability Index (PSI) drift monitor to trigger retraining when new viral variants or demographic shifts alter sensor baseline distributions.`
    ),
  ],
};
