import type { SeedCourse } from './content';

const units = [
  ['Introduction to AI and Search Algorithms', 'Intelligent agents, PEAS, uninformed search, informed search, heuristics, and dynamic path planning.'],
  ['Knowledge Representation and Reasoning', 'Game playing, alpha-beta pruning, logic, inference, Wumpus World, and Bayesian networks.'],
  ['Introduction to Machine Learning', 'Learning paradigms, supervised pipelines, bias-variance, generalization, and classical classifiers.'],
  ['Unsupervised Learning and Clustering', 'Scaling, K-Means, DBSCAN, hierarchical clustering, PCA, manifolds, and validation metrics.'],
  ['Applied Machine Learning and Evaluation', 'Encoding, feature selection, confusion matrices, model metrics, validation, and grid search.'],
] as const;

export const faiml: SeedCourse = {
  slug: 'fundamentals-of-artificial-intelligence-and-machine-learning',
  title: 'Fundamentals of Artificial Intelligence and Machine Learning',
  subject: 'Artificial Intelligence and Machine Learning',
  code: 'FAIML',
  term: 3,
  description: 'Study AI problem solving, knowledge representation, machine learning, clustering, and evaluation through five unit-wise interactive learning modules.',
  modules: units.map(([title, description], index) => ({
    slug: `faiml-unit-${index + 1}`,
    title: `Unit ${index + 1}: ${title}`,
    description,
    markdown: `## Unit focus\n\n${description}\n\n## Interactive companion\n\nOpen the embedded FAIML learning studio for question-bank cards, visual algorithm traces, parameter playgrounds, case studies, and unit assessments.\n\n## Exam practice\n\nUse the Learn for a Test workspace to practise source questions for this unit with quiz, written-answer, flashcard, and author modes.`,
  })),
};
