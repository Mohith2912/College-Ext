import type { SeedCourse } from './content';

const note = (title: string, description: string, focus: string, takeaways: string[]) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title,
  description,
  markdown: `## Learning objectives\n\n${description}\n\n## Syllabus focus\n\n${focus}\n\n## Revision checklist\n\n${takeaways.map((item) => `- ${item}`).join('\n')}\n\n## Practice prompt\n\nExplain the central idea in your own words, work one small example by hand, and connect it to a real system. Then state one assumption or limitation that could change the result.`,
});

export const faiml: SeedCourse = {
  slug: 'fundamentals-of-artificial-intelligence-and-machine-learning',
  title: 'Fundamentals of Artificial Intelligence and Machine Learning',
  subject: 'Artificial Intelligence and Machine Learning',
  code: '2311CSC303J',
  term: 3,
  description: 'A course-note edition of the FAIML syllabus: intelligent agents, reasoning, machine learning, clustering, preprocessing, and trustworthy evaluation.',
  modules: [
    note('Unit 1: Introduction to AI and Search Algorithms', 'Build a formal vocabulary for intelligent agents and problem solving.', 'Intelligent agents and the PEAS framework; state-space problem formulation; breadth-first search, depth-first search, and uniform-cost search; A* with f(n) = g(n) + h(n); admissible heuristics; vacuum-world and navigation examples.', ['Differentiate acting humanly, thinking rationally, and acting rationally.', 'Write a PEAS specification for an autonomous system.', 'Compare BFS, DFS, UCS, and A* on completeness, optimality, time, and space.', 'Trace A* and justify why an admissible heuristic preserves optimality.']),
    note('Unit 2: Knowledge Representation and Reasoning', 'Represent facts, uncertainty, and goals so an agent can derive useful conclusions.', 'Mini-Max for two-player zero-sum games; alpha-beta pruning when alpha is greater than or equal to beta; propositional logic and resolution; first-order quantifiers; forward versus backward chaining; Wumpus World deductions; Bayesian networks and conditional probability.', ['Evaluate a small Mini-Max tree and mark pruned branches.', 'Convert an implication into clauses and complete a resolution proof.', 'Contrast universal and existential instantiation and generalisation.', 'Show how a percept in Wumpus World narrows possible hazards.', 'Explain how a Bayesian network represents conditional dependencies.']),
    note('Unit 3: Introduction to Machine Learning', 'Move from hand-written rules to models that learn patterns from data.', 'Machine learning versus traditional programming; supervised, unsupervised, and reinforcement learning; train-test splits and the end-to-end pipeline; classification versus regression; bias-variance trade-off; underfitting, overfitting, regularisation, pruning, early stopping, decision trees, SVM, and KNN.', ['Select a learning paradigm for a stated problem.', 'Separate classification targets from continuous regression targets.', 'Interpret a training-versus-testing error gap.', 'Explain how regularisation and validation improve generalisation.', 'Compare decision trees, SVM, and KNN by assumptions and use cases.']),
    note('Unit 4: Unsupervised Learning and Clustering', 'Discover structure in unlabelled data and check whether the structure is useful.', 'Feature scaling with min-max normalisation and z-scores; K-Means centroid updates; DBSCAN core, border, and noise points; hierarchical clustering and dendrograms; the curse of dimensionality; PCA and manifold learning; silhouette, Davies-Bouldin, and Calinski-Harabasz validation.', ['Run one K-Means assignment and centroid-update step.', 'Explain when DBSCAN is preferable to K-Means.', 'Read a dendrogram and describe an appropriate cut.', 'Describe the main stages of PCA from scaling to projection.', 'Interpret higher or lower values for common clustering metrics.']),
    note('Unit 5: Applied Machine Learning and Evaluation', 'Prepare features, tune models, and report performance without hiding important errors.', 'One-hot versus label encoding; filter, wrapper, and embedded feature selection; confusion-matrix counts; accuracy, precision, recall, F1, ROC-AUC; hold-out, K-Fold, and stratified K-Fold validation; data leakage; Grid Search; loan approval and customer churn pipelines.', ['Choose encoding based on whether a category is nominal or ordinal.', 'Calculate metrics from TP, TN, FP, and FN.', 'Explain why accuracy can mislead on imbalanced data.', 'Compare hold-out, K-Fold, and stratified validation.', 'Separate learned parameters from hyperparameters and describe Grid Search.', 'Select a metric that reflects the cost of false positives and false negatives.']),
  ],
};
