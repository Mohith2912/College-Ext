/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnitManifest, InteractiveQuizQuestion } from '../types';
import { unit1PartA, unit1PartB, unit1PartC } from './units/unit1';
import { unit2PartA, unit2PartB, unit2PartC } from './units/unit2';
import { unit3PartA, unit3PartB, unit3PartC } from './units/unit3';
import { unit4PartA, unit4PartB, unit4PartC } from './units/unit4';
import { unit5PartA, unit5PartB, unit5PartC } from './units/unit5';

export const courseManifest: {
  courseTitle: string;
  regulations: string;
  semester: string;
  branches: string;
  examinationDate: string;
  outcomes: { code: string; title: string }[];
  units: UnitManifest[];
} = {
  courseTitle: 'Fundamentals of Artificial Intelligence and Machine Learning',
  regulations: 'Regulations R2023_V1.2',
  semester: 'III Semester BE/BTECH',
  branches: 'Common to CSE, IT, CSBS, CSD',
  examinationDate: 'NOV/DEC 2026 Regular Examinations',
  outcomes: [
    { code: 'CO1', title: 'Implement Artificial Intelligence in problem solving techniques.' },
    { code: 'CO2', title: 'Interpret various knowledge representation and reasoning in AI systems.' },
    { code: 'CO3', title: 'Analyze various machine learning algorithms such as linear and logistic regression.' },
    { code: 'CO4', title: 'Apply unsupervised learning techniques and clustering algorithms to analyze unlabelled data.' },
    { code: 'CO5', title: 'Implement and evaluate supervised learning algorithms for classification and regression tasks.' }
  ],
  units: [
    {
      id: 'unit-1',
      number: 1,
      title: 'Unit I: Introduction to AI and Search Algorithms',
      shortTitle: 'Unit 1: Search & Agents',
      courseOutcome: 'CO1',
      coDescription: 'Implement Artificial Intelligence in problem solving techniques.',
      description: 'Foundations of intelligent agents, PEAS task environments, problem formulation, uninformed search (BFS, DFS, UCS), and informed heuristic search (A* search, straight-line distance, admissible heuristics).',
      estimatedHours: 9,
      imageAsset: '/src/assets/images/search_graphs_tree_1791909582006.jpg',
      topics: [
        'Definition & Foundations of Artificial Intelligence',
        'Intelligent Agents Architecture & PEAS Framework',
        'Problem Formulation & State Space Representation',
        'Uninformed Search: Breadth-First Search (BFS) & Depth-First Search (DFS)',
        'Informed Heuristic Search & A* Algorithm (f = g + h)',
        'Vacuum Cleaner World & Dynamic Urban Navigation'
      ],
      partACount: 15,
      partBCount: 8,
      partCCount: 2,
      visualizerId: 'search-algorithms',
      visualizerTitle: 'Search Algorithm Lab (BFS, DFS, UCS, A*)',
      caseStudyId: 'autonomous-navigation',
      caseStudyTitle: 'Case Study: Dynamic Urban Navigation & PEAS Agent'
    },
    {
      id: 'unit-2',
      number: 2,
      title: 'Unit II: Knowledge Representation and Reasoning',
      shortTitle: 'Unit 2: Logic & Reasoning',
      courseOutcome: 'CO2',
      coDescription: 'Interpret various knowledge representation and reasoning in AI systems.',
      description: 'Adversarial game playing, Mini-Max algorithm, Alpha-Beta pruning, Propositional Logic, Resolution theorem proving, First-Order Logic quantifiers, Forward and Backward Chaining, Wumpus World, and Bayesian Networks.',
      estimatedHours: 9,
      imageAsset: '/src/assets/images/knowledge_bayesian_1791909583378.jpg',
      topics: [
        'Adversarial Search: Two-Player Zero-Sum Games & Mini-Max',
        'Alpha-Beta (α-β) Pruning Strategy',
        'Propositional Logic & Resolution Refutation Proofs',
        'First-Order Logic (FOL) & Quantifier Inference Rules',
        'Forward Chaining vs Backward Chaining Deductions',
        'Wumpus World 4×4 Grid Knowledge Representation',
        'Probabilistic Bayesian Networks & CPT Semantics'
      ],
      partACount: 15,
      partBCount: 8,
      partCCount: 2,
      visualizerId: 'game-tree-pruning',
      visualizerTitle: 'Adversarial Game Tree & Alpha-Beta Pruning Studio',
      caseStudyId: 'bayesian-medical',
      caseStudyTitle: 'Case Study: Probabilistic Medical Diagnostic Bayesian Network'
    },
    {
      id: 'unit-3',
      number: 3,
      title: 'Unit III: Introduction to Machine Learning',
      shortTitle: 'Unit 3: ML Foundations',
      courseOutcome: 'CO3',
      coDescription: 'Analyze various machine learning algorithms such as linear and logistic regression.',
      description: 'Machine learning paradigms (Supervised, Unsupervised, Reinforcement), end-to-end ML lifecycle, Classification vs Regression, Bias-Variance trade-off, Underfitting and Overfitting diagnostics, Decision Trees, SVM, and KNN.',
      estimatedHours: 9,
      imageAsset: '/src/assets/images/ml_bias_variance_1791909583940.jpg',
      topics: [
        'Machine Learning vs Traditional Rule-Based Programming',
        'Supervised, Unsupervised, and Reinforcement Learning Taxonomy',
        'Supervised Learning Pipeline & 80:20 Train-Test Splits',
        'Classification vs Regression: Mathematical Distinctions',
        'Bias-Variance Trade-off & Learning Curve Diagnostics',
        'Generalization Techniques: Regularization, Pruning, Early Stopping',
        'Classical Classifiers: Decision Tree, Support Vector Machine (SVM), KNN'
      ],
      partACount: 15,
      partBCount: 8,
      partCCount: 2,
      visualizerId: 'bias-variance-studio',
      visualizerTitle: 'Bias-Variance & Overfitting Simulator',
      caseStudyId: 'house-price-regression',
      caseStudyTitle: 'Case Study: Real Estate House Price Prediction Regression Pipeline'
    },
    {
      id: 'unit-4',
      number: 4,
      title: 'Unit IV: Unsupervised Learning & Clustering',
      shortTitle: 'Unit 4: Clustering & PCA',
      courseOutcome: 'CO4',
      coDescription: 'Apply unsupervised learning techniques and clustering algorithms to analyze unlabelled data.',
      description: 'Clustering algorithms (K-Means, DBSCAN, Hierarchical / Dendrograms), Dimensionality Reduction (PCA, Manifold Learning, t-SNE), Normalization vs Standardization, Cluster Validation (Silhouette Coefficient, Davies-Bouldin, Calinski-Harabasz).',
      estimatedHours: 9,
      imageAsset: '/src/assets/images/clustering_pca_space_1791909583070.jpg',
      topics: [
        'Foundations of Unsupervised Pattern Discovery',
        'Feature Scaling: Min-Max Normalization vs Z-Score Standardization',
        'K-Means Partitioning vs Density-Based DBSCAN',
        'Hierarchical Agglomerative Clustering & Dendrograms',
        'Curse of Dimensionality & Principal Component Analysis (PCA)',
        'Manifold Learning: Non-linear Structure Recovery',
        'Clustering Evaluation Metrics: Silhouette Score, DBI, CHI'
      ],
      partACount: 15,
      partBCount: 8,
      partCCount: 2,
      visualizerId: 'clustering-lab',
      visualizerTitle: 'Clustering Laboratory (K-Means, DBSCAN & Silhouette)',
      caseStudyId: 'student-clustering',
      caseStudyTitle: 'Case Study: Student Performance Categorization & Academic Interventions'
    },
    {
      id: 'unit-5',
      number: 5,
      title: 'Unit V: Applied Machine Learning and Evaluation',
      shortTitle: 'Unit 5: Model Evaluation',
      courseOutcome: 'CO5',
      coDescription: 'Implement and evaluate supervised learning algorithms for classification and regression tasks.',
      description: 'Categorical feature preprocessing (One-Hot vs Label Encoding), Automatic Feature Selection (Filter, Wrapper, Embedded), Confusion Matrix computation, Classification metrics (Accuracy, Precision, Recall, F1, ROC-AUC), K-Fold Cross Validation, and Grid Search optimization.',
      estimatedHours: 9,
      imageAsset: '/src/assets/images/hero_ai_platform_1791909582073.jpg',
      topics: [
        'Categorical Variable Encoding: One-Hot vs Label Encoding',
        'Automatic Feature Selection: Filter, Wrapper, and Embedded Methods',
        'Confusion Matrix: TP, TN, FP, FN and Type I/II Errors',
        'Comprehensive Classification Metrics: Precision, Recall, F1, ROC-AUC',
        'Model Validation: Hold-Out vs K-Fold vs Stratified K-Fold CV',
        'Hyperparameter Tuning via Exhaustive Grid Search',
        'End-to-End Enterprise ML Pipelines: Loan Approval & Customer Churn'
      ],
      partACount: 15,
      partBCount: 8,
      partCCount: 2,
      visualizerId: 'confusion-matrix-lab',
      visualizerTitle: 'Confusion Matrix & Model Evaluation Lab',
      caseStudyId: 'churn-pipeline',
      caseStudyTitle: 'Case Study: End-to-End Enterprise Customer Churn Pipeline'
    }
  ]
};

export const allQuestionsByUnit: Record<number, { partA: any[]; partB: any[]; partC: any[] }> = {
  1: { partA: unit1PartA, partB: unit1PartB, partC: unit1PartC },
  2: { partA: unit2PartA, partB: unit2PartB, partC: unit2PartC },
  3: { partA: unit3PartA, partB: unit3PartB, partC: unit3PartC },
  4: { partA: unit4PartA, partB: unit4PartB, partC: unit4PartC },
  5: { partA: unit5PartA, partB: unit5PartB, partC: unit5PartC }
};

export const unitAssessments: Record<number, InteractiveQuizQuestion[]> = {
  1: [
    {
      id: 'q1-1',
      question: 'In the A* Search algorithm with evaluation function f(n) = g(n) + h(n), what does g(n) represent?',
      options: [
        'Estimated heuristic cost from node n to the goal',
        'Actual accumulated path cost from the start node to node n',
        'Total estimated cost of the cheapest solution passing through n',
        'The branching factor at depth n'
      ],
      correctIndex: 1,
      explanation: 'In A* search, g(n) measures the exact accumulated path cost incurred from the start node to the current node n, while h(n) is the heuristic estimate to the goal.',
      bloomLevel: 'K1',
      co: 'CO1'
    },
    {
      id: 'q1-2',
      question: 'In the syllabus A* graph example with candidates Node A (g=2, h=5) and Node B (g=4, h=2), which node does the algorithm expand first and why?',
      options: [
        'Node A, because its path cost g(A) = 2 is lower',
        'Node B, because its total evaluation function f(B) = 4 + 2 = 6 is lower than f(A) = 7',
        'Node A, because its heuristic h(A) = 5 is higher',
        'Both nodes simultaneously because they are at equal depth'
      ],
      correctIndex: 1,
      explanation: 'A* always selects the node in the priority queue with the minimal evaluation score f(n) = g(n) + h(n). For B, f(B) = 4 + 2 = 6, which is strictly smaller than A with f(A) = 2 + 5 = 7.',
      bloomLevel: 'K3',
      co: 'CO1',
      type: 'calculation'
    },
    {
      id: 'q1-3',
      question: 'Which of the following describes the memory space complexity of Breadth-First Search (BFS) where b is the branching factor and d is the shallowest goal depth?',
      options: ['O(b · d)', 'O(b^d)', 'O(d^b)', 'O(1)'],
      correctIndex: 1,
      explanation: 'BFS requires storing all generated nodes at depth d in its FIFO queue frontier, giving it an exponential space complexity of O(b^d).',
      bloomLevel: 'K2',
      co: 'CO1'
    },
    {
      id: 'q1-4',
      question: 'In the Vacuum Cleaner World with partial observability and stochastic cleaning actions, which agent architecture is most appropriate?',
      options: [
        'Simple Reflex Agent with direct condition-action rules',
        'Model-Based Reflex Agent with an internal memory of room cleanliness states',
        'Table-Driven Agent with hardcoded lookup rules',
        'Randomized Blind Agent'
      ],
      correctIndex: 1,
      explanation: 'A Model-Based Reflex Agent maintains an internal world model of unobserved rooms and sensor histories, allowing it to act rationally even when rooms cannot be observed directly.',
      bloomLevel: 'K4',
      co: 'CO1'
    }
  ],
  2: [
    {
      id: 'q2-1',
      question: 'Under what mathematical condition does Alpha-Beta Pruning prune subsequent branches in a game tree?',
      options: [
        'When α < β',
        'When α ≥ β',
        'When α + β = 0',
        'When both α and β are positive'
      ],
      correctIndex: 1,
      explanation: 'Alpha-Beta pruning skips inspecting further child nodes whenever α ≥ β, because MIN or MAX has already found a move that renders the branch irrelevant to the final decision.',
      bloomLevel: 'K2',
      co: 'CO2'
    },
    {
      id: 'q2-2',
      question: 'In the syllabus game tree with root A (MIN) and children B (utility 7), C (utility 5), and D (utility 9), what is the optimal Mini-Max utility chosen at the root?',
      options: ['9', '7', '5', '3'],
      correctIndex: 2,
      explanation: 'Since root A is a MIN node, it selects the minimum utility among its children: MIN(7, 5, 9) = 5, corresponding to path A → C → G.',
      bloomLevel: 'K3',
      co: 'CO2',
      type: 'calculation'
    },
    {
      id: 'q2-3',
      question: 'Which inference rule concludes (B ∨ C) from premises (A ∨ B) and (¬A ∨ C)?',
      options: [
        'Modus Ponens',
        'Modus Tollens',
        'Resolution Rule',
        'Universal Instantiation'
      ],
      correctIndex: 2,
      explanation: 'The Resolution Rule takes two clauses containing complementary literals (A and ¬A) and resolves them into a new clause containing the remaining literals (B ∨ C).',
      bloomLevel: 'K1',
      co: 'CO2'
    },
    {
      id: 'q2-4',
      question: 'In the Wumpus World, if square [1, 1] detects NO Breeze and NO Stench, what can the agent logically infer?',
      options: [
        'Both adjacent squares [1, 2] and [2, 1] are provably SAFE from Pits and the Wumpus',
        'The Gold must be located at [1, 2]',
        'A Pit is definitely located at [2, 2]',
        'The agent should immediately shoot its arrow'
      ],
      correctIndex: 0,
      explanation: 'Since breezes only emanate from adjacent pits and stenches only emanate from an adjacent Wumpus, the absence of both percepts at [1, 1] logically guarantees that both adjacent squares [1, 2] and [2, 1] are safe.',
      bloomLevel: 'K4',
      co: 'CO2'
    }
  ],
  3: [
    {
      id: 'q3-1',
      question: 'A machine learning model achieves 99% training accuracy but only 68% testing accuracy. What condition does this indicate?',
      options: [
        'Underfitting (High Bias)',
        'Overfitting (High Variance)',
        'Optimal Generalization',
        'Data Under-sampling'
      ],
      correctIndex: 1,
      explanation: 'A large gap where training accuracy is high (99%) and testing accuracy is low (68%) is the hallmark indicator of Overfitting (High Variance), where the model has memorized training noise.',
      bloomLevel: 'K2',
      co: 'CO3'
    },
    {
      id: 'q3-2',
      question: 'Which of the following supervised learning tasks is a REGRESSION problem?',
      options: [
        'Classifying emails as Spam or Not Spam',
        'Predicting whether a patient has Diabetes (Yes/No)',
        'Predicting residential real estate sale price in dollars ($)',
        'Identifying handwritten digits (0 to 9)'
      ],
      correctIndex: 2,
      explanation: 'Regression predicts continuous numerical values (such as house sale prices in dollars), whereas classification predicts discrete categorical class labels.',
      bloomLevel: 'K2',
      co: 'CO3'
    },
    {
      id: 'q3-3',
      question: 'Which classical classifier has an inference time complexity of O(log n) after tree construction?',
      options: [
        'K-Nearest Neighbors (KNN)',
        'Decision Tree',
        'Support Vector Machine with RBF Kernel',
        'Brute-force linear scan'
      ],
      correctIndex: 1,
      explanation: 'Evaluating a query in a balanced Decision Tree requires traversing from root to leaf, which takes O(depth) ≈ O(log n) comparisons.',
      bloomLevel: 'K3',
      co: 'CO3'
    }
  ],
  4: [
    {
      id: 'q4-1',
      question: 'Given point P1 with mean intra-cluster distance a(P1) = 2 and mean nearest-cluster distance b(P1) = 7.5, what is its Silhouette Coefficient S(P1)?',
      options: ['0.267', '0.500', '0.733', '0.850'],
      correctIndex: 2,
      explanation: 'S(P1) = (b(P1) - a(P1)) / max(a(P1), b(P1)) = (7.5 - 2) / 7.5 = 5.5 / 7.5 = 0.733.',
      bloomLevel: 'K3',
      co: 'CO4',
      type: 'calculation'
    },
    {
      id: 'q4-2',
      question: 'Why is DBSCAN often preferred over K-Means for datasets with noise and arbitrary cluster shapes?',
      options: [
        'DBSCAN requires defining K in advance',
        'DBSCAN identifies dense clusters of arbitrary shapes and isolates outliers as noise (-1)',
        'DBSCAN uses linear hyperplanes to bisect clusters',
        'DBSCAN runs in O(1) time complexity'
      ],
      correctIndex: 1,
      explanation: 'Unlike K-Means (which assumes convex spherical clusters and forces outliers into centroids), DBSCAN forms clusters based on point density connectivity and flags sparse points as noise.',
      bloomLevel: 'K2',
      co: 'CO4'
    },
    {
      id: 'q4-3',
      question: 'For the Davies-Bouldin Index (DBI) in clustering validation, what indicates superior cluster quality?',
      options: [
        'Higher DBI values',
        'Lower DBI values',
        'DBI values exactly equal to 1.0',
        'Negative DBI values'
      ],
      correctIndex: 1,
      explanation: 'The Davies-Bouldin Index measures the average ratio of within-cluster scatter to between-cluster separation. Smaller (lower) DBI values indicate tighter and more isolated clusters.',
      bloomLevel: 'K2',
      co: 'CO4'
    }
  ],
  5: [
    {
      id: 'q5-1',
      question: 'Given a confusion matrix with TP = 45, TN = 40, FP = 10, FN = 5, what is the classification Accuracy?',
      options: ['80.0%', '85.0%', '90.0%', '95.0%'],
      correctIndex: 1,
      explanation: 'Accuracy = (TP + TN) / (TP + TN + FP + FN) = (45 + 40) / (45 + 40 + 10 + 5) = 85 / 100 = 85.0%.',
      bloomLevel: 'K3',
      co: 'CO5',
      type: 'calculation'
    },
    {
      id: 'q5-2',
      question: 'Why is One-Hot Encoding preferred over Label Encoding for the nominal categorical variable "Color" {Red, Blue, Green}?',
      options: [
        'Because Label Encoding requires less memory',
        'Because nominal categories have no natural mathematical order, and Label Encoding would introduce spurious numeric hierarchy',
        'Because One-Hot Encoding requires fewer columns',
        'Because neural networks cannot accept binary inputs'
      ],
      correctIndex: 1,
      explanation: 'Colors have no intrinsic ranking. Assigning Red=1, Blue=2, Green=3 forces algorithms to assume Green > Red and that Blue is the average of Red and Green, which distorts distance calculations.',
      bloomLevel: 'K3',
      co: 'CO5'
    },
    {
      id: 'q5-3',
      question: 'In an imbalanced dataset where detecting cancer is critical (missing a positive case is catastrophic), which evaluation metric should be prioritized?',
      options: ['Accuracy', 'Precision', 'Recall (Sensitivity)', 'Specificity'],
      correctIndex: 2,
      explanation: 'When False Negatives carry severe costs (e.g., missing cancer diagnosis), Recall = TP / (TP + FN) must be maximized to ensure nearly all actual positive cases are detected.',
      bloomLevel: 'K4',
      co: 'CO5'
    },
    {
      id: 'q5-4',
      question: 'What is the primary advantage of Stratified K-Fold Cross Validation over standard K-Fold for classification problems?',
      options: [
        'It runs K times faster',
        'It preserves the original class ratio/distribution in each fold, preventing imbalanced folds',
        'It requires no testing data',
        'It optimizes hyperparameters without a grid search'
      ],
      correctIndex: 1,
      explanation: 'Stratified K-Fold ensures that each fold contains the same proportion of each target class as the complete dataset, which is essential for imbalanced classification tasks.',
      bloomLevel: 'K2',
      co: 'CO5'
    }
  ]
};
