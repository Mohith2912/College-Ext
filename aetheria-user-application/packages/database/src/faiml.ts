import type { SeedCourse, SeedModule } from './content';

const units: Array<Omit<SeedModule, 'slug'>> = [
  {
    title: 'Unit 1: Introduction to Artificial Intelligence',
    description: 'Intelligent agents, problem formulation, search strategies, heuristics, CSPs, and game playing.',
    markdown: `## Syllabus focus

Define Artificial Intelligence, intelligent agents, environments, rationality, and problem-solving agents. Compare BFS, DFS, UCS, and A* search, then connect heuristics and constraint satisfaction to practical AI systems.

## Applied learning

Model a self-driving car as a learning, goal-based, and utility-based agent. Trace a GPS route from initial state to goal state, then choose a search strategy based on path cost, memory, and optimality.

## Practice case: The safer campus route

A campus shuttle must reach the hospital gate while avoiding a blocked road and a crowded pedestrian zone. Formulate the initial state, actions, transition model, goal test, and path cost. Compare BFS with A* and justify which one should guide the live route update.

## Key takeaways

- Agents perceive through sensors and act through actuators.
- A problem definition makes search measurable.
- A* combines actual cost g(n) with heuristic estimate h(n).
`,
  },
  {
    title: 'Unit 2: Knowledge Representation and Reasoning',
    description: 'Logic, inference, semantic networks, frames, expert systems, uncertainty, and knowledge-based agents.',
    markdown: `## Syllabus focus

Represent facts and relationships with propositional and predicate logic, semantic networks, frames, and production rules. Explain forward and backward chaining, expert systems, and reasoning under uncertainty.

## Applied learning

Build a small diagnosis knowledge base for a campus help desk. Separate facts from rules, trace an inference chain, and identify where incomplete or uncertain evidence changes the recommendation.

## Practice case: A rule-based support desk

The help desk knows that a device with no power and a lit adapter indicator may have a loose cable. Convert the observation into facts and rules, then explain why a conclusion should include its supporting evidence instead of appearing as an unexplained label.

## Key takeaways

- Representation determines what an AI system can ask and infer.
- Forward chaining starts from known facts; backward chaining starts from a goal.
- Uncertainty should be made visible when evidence is incomplete.
`,
  },
  {
    title: 'Unit 3: Introduction to Machine Learning',
    description: 'Learning types, data preparation, regression, classification, training, testing, and generalization.',
    markdown: `## Syllabus focus

Distinguish supervised, unsupervised, and reinforcement learning. Prepare datasets, split training and test data, and explain linear regression, logistic regression, classification, overfitting, underfitting, and the bias-variance trade-off.

## Applied learning

Design a loan-approval pipeline: inspect missing values, encode categorical attributes, scale numerical features when required, train a model, and evaluate predictions on data that was not used for fitting.

## Practice case: A fairer loan screen

A bank wants to predict eligibility using income, credit score, employment type, and loan amount. Identify possible leakage, choose an encoding method for each variable, and explain why a strong training score alone does not prove reliable generalization.

## Key takeaways

- Features describe inputs; labels describe the target in supervised learning.
- A test set estimates performance on unseen examples.
- Preprocessing and evaluation choices shape the model as much as the algorithm does.
`,
  },
  {
    title: 'Unit 4: Unsupervised Learning',
    description: 'Clustering, K-means, hierarchical methods, dimensionality reduction, and unlabeled data analysis.',
    markdown: `## Syllabus focus

Explain why unlabeled data is useful, compare K-means and hierarchical clustering, choose distance measures, interpret centroids and dendrograms, and introduce dimensionality reduction for visualization and compact representations.

## Applied learning

Segment campus services by usage patterns. Normalize measurements where scale would dominate distance, select a defensible number of clusters, and describe what each group means before acting on it.

## Practice case: Finding library communities

The library has anonymized visit frequency, borrowing count, and average session length but no labels. Use clustering to propose service groups, then test whether the clusters are stable and useful instead of treating every centroid as a real human category.

## Key takeaways

- Clusters are interpretations of structure, not automatically ground truth.
- K-means depends on initialization, scale, and the chosen k.
- Visual summaries help explain patterns but do not replace validation.
`,
  },
  {
    title: 'Unit 5: Applied Machine Learning and Evaluation',
    description: 'End-to-end pipelines, feature selection, validation, metrics, hyperparameter tuning, and responsible deployment.',
    markdown: `## Syllabus focus

Build complete classification and regression pipelines with feature selection, hold-out validation, K-fold and stratified K-fold cross-validation, confusion matrices, accuracy, precision, recall, F1-score, ROC-AUC, and Grid Search.

## Applied learning

Evaluate a customer-churn model where false negatives are costly. Compare metrics, inspect class imbalance, tune a model without leaking test data, and write a deployment decision that includes uncertainty and monitoring.

## Practice case: Churn before renewal day

A subscription service wants to contact customers likely to leave. Design preprocessing, choose a validation scheme, justify the primary metric, and explain how Grid Search can improve a model while increasing computation and the risk of tuning to the validation process.

## Key takeaways

- No single metric answers every decision question.
- Stratified K-fold is useful when class proportions matter.
- Reproducible pipelines make model comparisons safer and easier to audit.
`,
  },
];

export const faiml: SeedCourse = {
  slug: 'fundamentals-of-artificial-intelligence-and-machine-learning',
  title: 'Fundamentals of Artificial Intelligence and Machine Learning',
  subject: 'Artificial Intelligence and Machine Learning',
  code: '2311CSC303J',
  term: 3,
  description: 'Study AI problem solving, knowledge representation, machine learning, clustering, and evaluation through guided cases and source-aligned revision.',
  modules: units.map((unit, index) => ({ ...unit, slug: `faiml-unit-${index + 1}` })),
};

