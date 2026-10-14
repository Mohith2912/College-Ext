/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from '../../types';

export const unit3PartA: QuestionItem[] = [
  {
    id: 'u3-pa-01',
    qNo: 1,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define Machine Learning. How does it differ from traditional programming?',
    answer: 'Machine Learning (ML) is a branch of Artificial Intelligence that enables computer systems to learn patterns autonomously from empirical data and improve performance through experience without explicit rule programming.\nDifference:\n• Traditional Programming: Takes Data + Rules (code written by humans) → Produces Answers.\n• Machine Learning: Takes Data + Answers (labels/outcomes) → Automatically Learns the Rules/Model.',
    tableData: {
      headers: ['Dimension', 'Traditional Programming', 'Machine Learning'],
      rows: [
        ['Rule Origin', 'Engineers handcraft explicit if-then rules', 'Algorithms learn patterns automatically from data'],
        ['Evolution', 'Static until human modifies code', 'Continuously improves as new data is ingested'],
        ['Best Suited For', 'Deterministic logic, accounting, CRUD', 'Perception, NLP, complex predictive modeling']
      ]
    }
  },
  {
    id: 'u3-pa-02',
    qNo: 2,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe any two types of machine learning with one suitable example for each.',
    answer: '1. Supervised Learning: The algorithm is trained using labeled datasets where both input features (X) and ground-truth targets (y) are provided.\n   Example: Email Spam Detection (features: email text/headers; label: Spam or Not Spam).\n2. Unsupervised Learning: The algorithm discovers latent structures, groupings, or patterns in unlabeled datasets with no predefined outputs.\n   Example: Customer Segmentation in e-commerce based on purchasing frequency and total expenditure.',
    keyTakeaways: [
      'Supervised: Maps inputs to known outputs',
      'Unsupervised: Discovers hidden geometry and density clusters'
    ]
  },
  {
    id: 'u3-pa-03',
    qNo: 3,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain the role of a training dataset in supervised learning.',
    answer: 'A training dataset contains pairs of input features and corresponding ground-truth target labels. During training, the machine learning algorithm iteratively adjusts its internal parameters (weights and biases) to minimize empirical loss between predictions and true labels, learning the underlying mapping function f(X) ≈ y.',
    keyTakeaways: [
      'Provides empirical evidence for parameter optimization',
      'Guides gradient descent or rule splitting during model fit'
    ]
  },
  {
    id: 'u3-pa-04',
    qNo: 4,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'List any two real-life applications of Machine Learning.',
    answer: '1. Email Spam Filtering: Automatically classifies incoming emails as legitimate or junk based on token probabilities.\n2. Facial Recognition: Identifies or verifies human faces in digital images and video surveillance streams for biometric authentication.',
    keyTakeaways: [
      'Ubiquitous across telecommunications, mobile security, and web services'
    ]
  },
  {
    id: 'u3-pa-05',
    qNo: 5,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define supervised learning with an example.',
    answer: 'Supervised Learning is a paradigm of machine learning where models are trained on datasets containing labeled input-output pairs (X, y). The model learns an inductive function that can accurately predict outputs for new, unseen input instances.\nExample: Predicting house prices given square footage, number of bedrooms, age, and location.',
    keyTakeaways: [
      'Requires verified ground truth labels',
      'Subdivided into Classification and Regression'
    ]
  },
  {
    id: 'u3-pa-06',
    qNo: 6,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'List any two algorithms used in supervised learning.',
    answer: '1. Decision Tree: Hierarchical rule-based tree model that partitions feature space based on Information Gain or Gini Impurity.\n2. K-Nearest Neighbors (KNN): Non-parametric instance-based algorithm that classifies queries based on the majority label among k nearest neighbors in feature space.',
    keyTakeaways: [
      'Decision Tree: Parametric/rule-based, fast inference',
      'KNN: Lazy learner, relies on distance metrics'
    ]
  },
  {
    id: 'u3-pa-07',
    qNo: 7,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between supervised and unsupervised learning.',
    answer: 'Supervised learning trains on labeled data (inputs mapped to ground-truth targets) to predict future outputs. Unsupervised learning processes unlabeled data to identify natural clusters, latent dimensions, or underlying statistical distributions without human feedback.',
    tableData: {
      headers: ['Feature', 'Supervised Learning', 'Unsupervised Learning'],
      rows: [
        ['Dataset Nature', 'Labeled (X, y pairs)', 'Unlabeled (only features X)'],
        ['Goal', 'Predict discrete class or continuous value', 'Discover clusters, patterns, density'],
        ['Feedback', 'Direct error loss between prediction and label', 'No external ground truth feedback'],
        ['Examples', 'Linear Regression, SVM, Decision Tree', 'K-Means, PCA, Hierarchical Clustering']
      ]
    }
  },
  {
    id: 'u3-pa-08',
    qNo: 8,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain the role of labeled data in supervised learning.',
    answer: 'Labeled data acts as the supervisory ground truth. It establishes the mathematical benchmark against which the loss function computes model error, directing the optimization algorithm (e.g., gradient descent) to adjust model parameters until predictions match the true labels closely.',
    keyTakeaways: [
      'Enables loss calculation and backpropagation',
      'Determines generalization ceiling of trained models'
    ]
  },
  {
    id: 'u3-pa-09',
    qNo: 9,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Discuss any two real-life applications of supervised learning.',
    answer: '1. Medical Disease Diagnosis: Classifying patient electronic health records and diagnostic scans as Benign or Malignant to assist oncologists.\n2. Credit Card Fraud Detection: Classifying financial transactions as Legitimate or Fraudulent in real-time based on spending velocity, geographical anomalies, and transaction amount.',
    keyTakeaways: [
      'High-stakes decision systems with clear binary or multi-class targets'
    ]
  },
  {
    id: 'u3-pa-10',
    qNo: 10,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State the purpose of training data in supervised learning.',
    answer: 'The primary purpose of training data is to allow the algorithm to learn mathematical representations of patterns and relationships between input variables and outputs, enabling the resulting model to generalize accurately to unseen future data.',
    keyTakeaways: [
      'Provides empirical sample distribution of the domain',
      'Forms the foundation of inductive learning'
    ]
  },
  {
    id: 'u3-pa-11',
    qNo: 11,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define classification in the context of supervised learning.',
    answer: 'Classification is a supervised machine learning task where the target output variable is qualitative and categorical (discrete class labels). The model maps input features to one of several mutually exclusive or multi-label classes.\nExample: Classifying email as {Spam, Not Spam}.',
    keyTakeaways: [
      'Output space Y is discrete: Y ∈ {0, 1} or {C_1, C_2, ..., C_k}'
    ]
  },
  {
    id: 'u3-pa-12',
    qNo: 12,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Summarize the purpose of regression in machine learning with an appropriate example.',
    answer: 'Regression is a supervised learning technique used to model relationships between continuous independent features and a continuous numerical target variable. Its purpose is to predict real-valued quantities.\nExample: Predicting the continuous market value ($) of residential real estate based on square footage, location coordinates, and construction year.',
    keyTakeaways: [
      'Output space Y is continuous: Y ∈ ℝ'
    ]
  },
  {
    id: 'u3-pa-13',
    qNo: 13,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'List two key differences between classification and regression.',
    answer: '1. Target Variable Type: Classification predicts discrete categorical class labels (e.g., Cat vs Dog, Yes vs No), whereas Regression predicts continuous quantitative numerical values (e.g., Temperature, Price).\n2. Evaluation Metrics: Classification models are evaluated using Accuracy, Precision, Recall, and F1-Score; Regression models are evaluated using Mean Absolute Error (MAE), Mean Squared Error (MSE), and R² Score.',
    tableData: {
      headers: ['Attribute', 'Classification', 'Regression'],
      rows: [
        ['Target Variable', 'Discrete categorical labels', 'Continuous numerical quantities'],
        ['Decision Boundary', 'Separating hyperplanes between classes', 'Continuous trend curve or surface fitting points'],
        ['Evaluation Metrics', 'Accuracy, Precision, Recall, F1, ROC-AUC', 'MAE, MSE, RMSE, R² Score']
      ]
    }
  },
  {
    id: 'u3-pa-14',
    qNo: 14,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between underfitting and overfitting with respect to model performance.',
    answer: '• Underfitting: Occurs when a model is excessively simple (high bias) and fails to capture the underlying data patterns, resulting in poor performance on both training and testing datasets.\n• Overfitting: Occurs when a model is excessively complex (high variance) and memorizes noise and idiosyncrasies in the training set, achieving near-perfect training accuracy but degrading sharply on unseen test data.',
    tableData: {
      headers: ['Condition', 'Model Complexity', 'Training Error', 'Testing Error', 'Underlying Issue'],
      rows: [
        ['Underfitting', 'Too low (too simple)', 'High', 'High', 'High Bias (cannot learn pattern)'],
        ['Overfitting', 'Too high (too complex)', 'Very Low (memorized)', 'High', 'High Variance (memorized noise)']
      ]
    }
  },
  {
    id: 'u3-pa-15',
    qNo: 15,
    part: 'A',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe generalization in machine learning and explain its significance in model performance.',
    answer: 'Generalization is the capability of a trained machine learning model to make accurate predictions on novel, previously unseen data drawn from the same underlying distribution. Its significance is paramount because the ultimate objective of machine learning is not memorizing historical training samples, but making reliable inferences on future real-world inputs.',
    keyTakeaways: [
      'Separates true pattern extraction from trivial data memorization',
      'Measured directly via validation and hold-out test datasets'
    ]
  }
];

export const unit3PartB: QuestionItem[] = [
  {
    id: 'u3-pb-01',
    qNo: 1,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply the concepts of Machine Learning to illustrate its overall workflow using a suitable diagram, and classify different types of Machine Learning by identifying their appropriate applications, advantages, and disadvantages.',
    answer: `1. Definition:
Machine Learning (ML) is an engineering and scientific discipline within AI that develops algorithms capable of learning empirical relationships from data. Rather than adhering to fixed procedural routines, ML models adapt parameter weights to optimize predictive performance.

2. Machine Learning Workflow:
Raw Data ──> Data Preprocessing ──> Split (Train/Test) ──> ML Algorithm Selection ──> Model Training ──> Model Evaluation ──> Deployment & Inference

• Data Collection: Sourcing tabular, image, or text records from operational databases.
• Data Preprocessing: Imputing missing values, removing duplicates, scaling features, encoding categorical attributes.
• Model Training: Optimizing parameter weights to minimize loss on training splits.
• Evaluation: Measuring generalization using validation metrics on hold-out testing data.
• Deployment: Serving predictions via REST APIs or batch inference pipelines.

3. Taxonomy of Machine Learning:
1. Supervised Learning:
   - Nature: Trains on labeled inputs (X) paired with ground truth (y).
   - Applications: Fraud detection, medical diagnosis, housing price prediction.
   - Advantages: High predictive accuracy, straightforward metric evaluation.
   - Disadvantages: Labeling datasets is manual, expensive, and time-consuming.

2. Unsupervised Learning:
   - Nature: Discovers latent clusters, associations, and projections from unlabeled data.
   - Applications: Customer market segmentation, anomaly detection, genomic clustering.
   - Advantages: Requires no expensive data labeling; reveals unexpected structures.
   - Disadvantages: Subjective evaluation; susceptible to noise.

3. Reinforcement Learning:
   - Nature: Software agent learns optimal behavioral policies through trial-and-error interaction with a dynamic environment via rewards and penalties.
   - Applications: Autonomous vehicle control, robotic dexterity, game-playing AI (AlphaGo).
   - Advantages: Excels in sequential decision-making without human demonstrations.
   - Disadvantages: Sample-inefficient; computationally expensive simulation requirements.`,
    tableData: {
      headers: ['Type', 'Data Input', 'Learning Signal', 'Core Applications'],
      rows: [
        ['Supervised', 'Labeled pairs (X, y)', 'Direct ground truth error', 'Spam filter, House price prediction'],
        ['Unsupervised', 'Unlabeled features X', 'Internal density & variance', 'Customer segmentation, PCA'],
        ['Reinforcement', 'States & Actions', 'Reward / Penalty feedback', 'Robotics, Self-driving car control, Chess']
      ]
    }
  },
  {
    id: 'u3-pb-02',
    qNo: 2,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Illustrate how to apply supervised learning techniques to a dataset for developing and evaluating a predictive model.',
    answer: `1. Systematic Development Methodology:
Developing an enterprise-grade predictive supervised learning model requires a structured sequence of engineering stages to safeguard against data leakage and overfitting.

2. Step-by-Step Implementation Pipeline:
• Step 1: Data Collection & Audit
  Acquire relevant historical tabular records (e.g., Housing dataset containing Area, Bedrooms, Age, Location, Sale Price).
• Step 2: Data Preprocessing
  - Clean missing values using median/mode imputation.
  - Remove duplicate observations.
  - Scale numerical features via Min-Max or Standard scaling.
  - One-hot encode nominal categorical features (e.g., Location).
• Step 3: Dataset Splitting
  Partition dataset into 80% Training Set and 20% Testing Set. The testing set is quarantined to evaluate unbiased generalization.
• Step 4: Algorithm Selection
  Select candidate model class based on problem topology:
  - Regression: Linear Regression, Decision Tree Regressor, Random Forest.
  - Classification: Logistic Regression, Support Vector Machine (SVM), XGBoost.
• Step 5: Model Training
  Fit model parameters on the 80% training set using cost optimization (e.g., Ordinary Least Squares or Gradient Descent).
• Step 6: Validation & Hyperparameter Tuning
  Apply K-Fold Cross Validation (e.g., K=5) and Grid Search to tune hyperparameters without test-set contamination.
• Step 7: Performance Evaluation
  Evaluate the finalized model against the quarantined 20% test set using rigorous metrics:
  - Classification: Accuracy, Precision, Recall, F1-Score, ROC-AUC.
  - Regression: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), R² Score.
• Step 8: Deployment & Monitoring
  Containerize the model for production API scoring, logging drift over time.`,
    tableData: {
      headers: ['Stage', 'Input', 'Action', 'Output Artifact'],
      rows: [
        ['1. Preprocessing', 'Raw messy CSV', 'Impute, encode, scale', 'Clean numerical matrix'],
        ['2. Split', 'Clean matrix', '80:20 train-test split', 'X_train, y_train, X_test, y_test'],
        ['3. Training', 'X_train, y_train', 'Parameter weight optimization', 'Fitted Model'],
        ['4. Evaluation', 'Fitted Model + X_test', 'Predict and compare with y_test', 'Metrics Report (MAE, R² / F1)']
      ]
    }
  },
  {
    id: 'u3-pb-03',
    qNo: 3,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Differentiate Classification and Regression techniques by analyzing their characteristics, use cases, and limitations with suitable examples.',
    answer: `1. Introduction:
Supervised machine learning bifurcates into Classification and Regression based on the mathematical domain of the target dependent variable y.

2. Classification Analysis:
• Definition: Predicts discrete categorical class labels Y ∈ {C_1, C_2, ..., C_k}.
• Output: Discrete probability distribution over classes or discrete class assignment.
• Canonical Algorithms: Decision Trees (CART), Support Vector Machines (SVM), K-Nearest Neighbors (KNN), Naive Bayes, Logistic Regression.
• Practical Use Cases: Spam email filtering, credit card fraud detection, tumor classification (Benign vs Malignant).
• Evaluation Metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix.
• Limitations: Susceptible to severe performance collapse on imbalanced class distributions if improper metrics are evaluated.

3. Regression Analysis:
• Definition: Predicts continuous numerical real-valued quantities Y ∈ ℝ.
• Output: Infinite continuous range of numeric scalar values.
• Canonical Algorithms: Simple/Multiple Linear Regression, Ridge/Lasso Regularized Regression, Support Vector Regression (SVR), Random Forest Regressor.
• Practical Use Cases: Residential real estate appraisal, daily temperature forecasting, retail sales demand volume forecasting.
• Evaluation Metrics: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Coefficient of Determination (R²).
• Limitations: Highly sensitive to extreme numerical outliers; assumes specific functional relationships (e.g., linearity unless polynomial kernels are applied).`,
    tableData: {
      headers: ['Comparative Dimension', 'Classification', 'Regression'],
      rows: [
        ['Target Variable Domain', 'Discrete categorical classes (e.g. {0, 1})', 'Continuous numeric values (ℝ)'],
        ['Model Objective', 'Construct decision boundary separating classes', 'Fit mathematical surface minimizing distance to points'],
        ['Primary Algorithms', 'Decision Tree, SVM, KNN, Naive Bayes', 'Linear Regression, Polynomial Regression, SVR'],
        ['Evaluation Metrics', 'Confusion Matrix, Precision, Recall, F1', 'MAE, MSE, RMSE, R² Score'],
        ['Example Problem', 'Detecting fraudulent transactions', 'Predicting house sale prices']
      ]
    }
  },
  {
    id: 'u3-pb-04',
    qNo: 4,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze Overfitting and Underfitting on machine learning model and recommend appropriate strategies to achieve an optimal bias–variance trade-off.',
    answer: `1. Introduction:
The Bias-Variance Trade-off governs the generalization capacity of all predictive learning models. Total Expected Test Error decomposes into:
Expected Error = Bias² + Variance + Irreducible Noise (σ²)

2. Underfitting (High Bias):
• Definition: Occurs when an overly simplistic hypothesis class fails to capture the underlying structure of the data.
• Symptoms: High error on training data AND equally high error on testing data (e.g., Training Acc = 60%, Test Acc = 58%).
• Root Cause: High inductive bias, insufficient features, or overly restrictive model assumptions.
• Solutions:
  - Increase model expressive capacity (e.g., higher polynomial degree, deeper trees).
  - Add relevant domain features (Feature Engineering).
  - Train for more epochs / iterations.

3. Overfitting (High Variance):
• Definition: Occurs when a model is excessively complex and fits random statistical noise and idiosyncratic outliers in the training set.
• Symptoms: Exceptional training performance but degraded test performance (e.g., Training Acc = 99%, Test Acc = 70%).
• Root Cause: Excessive parameters relative to training sample size.
• Solutions:
  - Apply Regularization (L1 Lasso, L2 Ridge) to penalize excessive parameter magnitudes.
  - Employ Tree Pruning to remove spurious decision splits.
  - Apply Dropout in neural architectures.
  - Use K-Fold Cross Validation.
  - Collect more training samples.

4. The Bias-Variance Trade-Off Balance:
An optimal machine learning model operates at the sweet spot where total generalization error is minimized, achieving low bias without inflating model variance.`,
    diagramAscii: `High Bias (Too Simple) <──────── Balanced Model ────────> High Variance (Too Complex)
[ Underfitting ]                    [ Optimal Fit ]                   [ Overfitting ]
Low Train, Low Test Acc          High Train, High Test Acc        High Train, Low Test Acc`
  },
  {
    id: 'u3-pb-05',
    qNo: 5,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Evaluate the mathematical and algorithmic indicators of overfitting, and justify the effectiveness of different generalization techniques for improving model performance.',
    answer: `1. Indicators of Overfitting:
• Mathematical Indicator:
  Training Error ≪ Testing Error (Large Generalization Gap)
  Example: Train Error = 1%, Test Error = 25%.
• Algorithmic Indicators:
  - Decision trees growing to extreme depth where leaf nodes contain only 1–2 samples.
  - Linear/logistic regression coefficient magnitudes exploding to massive values (+10^4, -10^4).
  - Learning curves diverging: Training loss approaches zero while validation loss reverses and starts climbing upward.

2. Generalization Techniques & Justification:
1. Cross-Validation (K-Fold):
   - Mechanism: Rotates training and testing across K equal subsets.
   - Justification: Assesses model performance across multiple splits, ensuring models do not benefit from a single lucky train-test split.
2. Regularization (L1 and L2):
   - L1 (Lasso): Adds penalty λ ∑|w_i| to loss function. Drives non-essential weights to exactly zero, performing built-in feature selection.
   - L2 (Ridge): Adds penalty λ ∑w_i² to loss function. Smooths weight magnitudes, preventing individual features from dominating predictions.
3. Decision Tree Pruning:
   - Mechanism: Cuts back branches that fail to provide statistically significant information gain on validation data.
   - Justification: Replaces complex subtrees with leaf nodes, preserving only robust parent decision rules.
4. Dropout:
   - Mechanism: Randomly zeroes out a percentage of neuron activations during forward passes.
   - Justification: Breaks co-adaptation of features in deep networks.
5. Early Stopping:
   - Mechanism: Monitors validation set error during iterative training and halts epochs as soon as validation loss begins to rise.`,
    tableData: {
      headers: ['Technique', 'Mechanism', 'Overfitting Prevention Impact'],
      rows: [
        ['L1 Regularization (Lasso)', 'Adds λ ∑|w_i| penalty', 'Zeroes out non-informative weights; feature selection'],
        ['L2 Regularization (Ridge)', 'Adds λ ∑w_i² penalty', 'Constrains weight magnitudes; prevents feature dominance'],
        ['Tree Pruning', 'Removes low-gain branches', 'Prevents memorization of sample noise in leaves'],
        ['Early Stopping', 'Halts when validation loss rises', 'Stops model before it begins fitting training noise']
      ]
    }
  },
  {
    id: 'u3-pb-06',
    qNo: 6,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Assess the role of evaluation metrics and learning curves in identifying underfitting, and justify their suitability for improving model performance.',
    answer: `1. Definition of Underfitting:
Underfitting occurs when a model lacks sufficient mathematical expressive power to learn the relationship between features and target labels, resulting in poor fit across all datasets.

2. Diagnostic Role of Evaluation Metrics:
• Symptom: Both Training Accuracy and Testing Accuracy are stubbornly low.
  Example: Training Accuracy = 60%, Testing Accuracy = 58%.
• Contrast with Overfitting: In overfitting, training accuracy is 99% while testing is 70%. In underfitting, the model cannot even master the training data itself.

3. Diagnostic Role of Learning Curves:
A Learning Curve plots model error (or accuracy) as a function of the number of training samples.
• Underfitting Learning Curve Signature:
  - The training performance curve and validation performance curve converge early to a low score and plateau horizontally.
  - Adding more training data fails to raise performance!
  - Diagnoses immediately that the bottleneck is model complexity, not dataset size.

4. Remedies for Underfitting:
• Increase Model Complexity: Upgrade from a linear model to a polynomial model, or increase tree max-depth.
• Add Informative Features: Construct interaction terms or add domain-specific features.
• Decrease Regularization: Reduce penalty parameter λ (e.g., lower Ridge alpha).`,
    diagramAscii: `Accuracy (%)
100 ┌──────────────────────────────────────────
 80 │
 60 │  Training Acc:   *********************** (Plateau)
 58 │  Validation Acc: ----------------------- (Plateau)
 40 │
  0 └──────────────────────────────────────────> Training Samples
    [Diagnosis: High Bias / Underfitting — Model too simple!]`
  },
  {
    id: 'u3-pb-07',
    qNo: 7,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Evaluate the components of a supervised learning pipeline and justify the selection of appropriate techniques for each stage.',
    answer: `1. Introduction:
A supervised learning pipeline is a cohesive, reproducible software framework coordinating the end-to-end transformation of raw data into production predictions.

2. Core Pipeline Components:
1. Data Ingestion & Quality Cleaning:
   - Identifies and replaces missing records; handles outliers and duplicates.
2. Feature Transformation & Encoding:
   - One-hot encoding for nominal categories; Min-Max/Standard scaling for numerical features to ensure equal distance weighting.
3. Train-Test Split (80:20):
   - Partitions data prior to transformations to strictly prevent data leakage from test distributions into training.
4. Model Selection:
   - Selects algorithms suited to the underlying problem topology (e.g., Tree-based for tabular non-linearities, Linear models for fast interpretable baselines).
5. Hyperparameter Tuning:
   - Employs Grid Search or Random Search paired with K-Fold Cross-Validation to locate optimal hyperparameter sets.
6. Evaluation & Benchmarking:
   - Calculates comprehensive metric scores (Accuracy, Precision, Recall, F1 for classification; MAE, MSE, R² for regression).
7. Deployment:
   - Serializes trained pipelines for low-latency scoring.`,
    tableData: {
      headers: ['Pipeline Component', 'Standard Technique', 'Justification'],
      rows: [
        ['Categorical Handling', 'One-Hot & Label Encoding', 'Converts string categories to numerical vectors'],
        ['Feature Scaling', 'StandardScaler (z-score)', 'Prevents high-magnitude features from dominating gradients'],
        ['Cross Validation', '5-Fold CV', 'Provides unbiased estimate of generalization error'],
        ['Hyperparameter Search', 'Grid Search CV', 'Exhaustively identifies optimal parameter combinations']
      ]
    }
  },
  {
    id: 'u3-pb-08',
    qNo: 8,
    part: 'B',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Justify the suitability of Decision Tree, SVM, and KNN algorithms by evaluating their performance, accuracy, and computational complexity for classification tasks.',
    answer: `1. Comparative Evaluation of Classical Supervised Classifiers:

1. Decision Tree:
• Working Principle: Recursively partitions feature space using axis-aligned orthogonal splits that maximize Information Gain or minimize Gini Impurity.
• Complexity: Training is O(n · d · log n); Prediction is O(depth) ≈ O(log n).
• Strengths: Highly interpretable ("white box"); handles mixed categorical and numerical features; requires minimal scaling.
• Weaknesses: High variance; prone to overfitting without depth pruning.

2. Support Vector Machine (SVM):
• Working Principle: Identifies the optimal maximum-margin hyperplane that separates classes in original or kernel-projected feature space, supported by boundary vectors.
• Complexity: Training is approximately O(n² · d) to O(n³); Prediction is O(n_support_vectors · d).
• Strengths: Highly accurate in high-dimensional feature spaces; robust to overfitting when margin parameters (C, γ) are properly tuned.
• Weaknesses: Computationally expensive on large datasets; sensitive to feature scaling and kernel selection.

3. K-Nearest Neighbors (KNN):
• Working Principle: Instance-based "lazy learner" that does not fit an explicit model during training. At query time, computes distance to all training samples and takes majority vote among k closest neighbors.
• Complexity: Training is O(1) (instant); Prediction is O(n · d) (expensive per query).
• Strengths: Intuitive; zero training phase; adapts seamlessly as new training instances are logged.
• Weaknesses: Prediction latency degrades on large datasets; suffers severely from the Curse of Dimensionality.`,
    tableData: {
      headers: ['Algorithm', 'Training Complexity', 'Inference Complexity', 'Interpretability', 'Best Fit Scenario'],
      rows: [
        ['Decision Tree', 'O(n · d · log n)', 'O(log n) — Very Fast', 'High (Transparent Rules)', 'Tabular data requiring human audits'],
        ['Support Vector Machine', 'O(n² · d) — Heavy', 'O(n_sv · d) — Fast', 'Low (Kernel Black Box)', 'High-dimensional data (e.g. text/bio)'],
        ['K-Nearest Neighbors', 'O(1) — Instant', 'O(n · d) — Slow', 'Moderate (Local Analogy)', 'Small datasets with local neighborhood clusters']
      ]
    }
  }
];

export const unit3PartC: QuestionItem[] = [
  {
    id: 'u3-pc-01',
    qNo: 1,
    part: 'C',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Design a machine learning model to predict future customer purchases using a dataset of customer purchasing behaviour, and justify your design choices.',
    answer: `1. Problem Definition & Objectives:
E-commerce retail platforms utilize customer transaction histories to predict future purchase propensity (Binary: Will Purchase within 30 days? Y/N) and recommend tailored product categories to maximize customer lifetime value (LTV).

2. End-to-End System Architecture:
Dataset Ingestion ──> Preprocessing & Encoding ──> Feature Selection ──> Train-Test Split (80:20) ──> Classifier Selection (Random Forest / Logistic Regression) ──> Evaluation (F1 / Precision / Recall) ──> Recommendation Engine

3. Step-by-Step Design Justification:
• Step 1: Feature Inventory
  - Demographics: Age, Gender, Geography.
  - Behavioral History: Purchase Frequency (transactions/month), Total Spending ($), Average Order Value (AOV), Days Since Last Purchase (Recency), Preferred Category.
• Step 2: Data Preprocessing
  - Impute missing demographics using mode; impute numerical gaps using median.
  - Apply One-Hot Encoding to nominal categories (Gender, Preferred Category).
  - Apply RobustScaler to Total Spending and Frequency to mitigate outlier leverage.
• Step 3: Feature Selection
  - Use Random Forest Feature Importance and Correlation Analysis to drop collinear variables, isolating the top predictors: Recency, Frequency, and Monetary value (RFM metrics).
• Step 4: Algorithm Justification
  - Primary Model: Random Forest Classifier.
  - Justification: Combines an ensemble of de-correlated decision trees; inherently models non-linear interactions between recency and spending; resistant to overfitting; provides native feature importance rankings.
• Step 5: Model Evaluation Framework
  - Because active buyers may represent a minority class (e.g., 15% conversion rate), standard Accuracy is misleading.
  - Primary Metric: Precision-Recall AUC and F1-Score. High Precision avoids spamming uninterested shoppers; high Recall captures revenue opportunities.
• Step 6: Commercial Recommendation Integration
  - When P(Purchase > threshold), trigger targeted marketing vouchers for the customer's preferred product catalog.`,
    tableData: {
      headers: ['Design Component', 'Selected Approach', 'Engineering Justification'],
      rows: [
        ['Preprocessing', 'Median Imputation + One-Hot Encoding', 'Handles missing transactions without introducing numerical bias'],
        ['Feature Strategy', 'RFM (Recency, Frequency, Monetary)', 'Established retail predictors of purchasing propensity'],
        ['Algorithm', 'Random Forest Classifier', 'Models non-linear consumer behaviors; robust against overfitting'],
        ['Evaluation Metric', 'F1-Score & Precision-Recall AUC', 'Accounts for class imbalance in e-commerce conversion rates']
      ]
    }
  },
  {
    id: 'u3-pc-02',
    qNo: 2,
    part: 'C',
    unitNumber: 3,
    courseOutcome: 'CO3',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Create a regression model that predicts house prices from features such as house size, number of bedrooms, age, and location, and justify your implementation approach.',
    answer: `1. Problem Statement:
Develop a multivariate continuous regression model that predicts the residential sale price ($) based on property attributes: House Size (sq ft), Number of Bedrooms, Age of House (years), and Location (neighborhood).

2. Mathematical Formulation:
y_pred = w_0 + w_1 · Size + w_2 · Bedrooms + w_3 · Age + ∑ w_loc_i · Location_i

3. Methodological Pipeline:
• Step 1: Data Collection & Schema Audit
  - Target Variable: SalePrice (continuous ℝ).
  - Numerical Features: Size (500–5000 sq ft), Bedrooms (1–6), Age (0–60 years).
  - Categorical Feature: Location (e.g., Urban, Suburban, Rural).
• Step 2: Preprocessing & Leakage Prevention
  - One-Hot Encode Location into binary columns [Location_Urban, Location_Suburban, Location_Rural].
  - Standardize continuous variables using Z-score scaling: x' = (x - μ) / σ.
  - Split dataset into 80% Training and 20% Testing before scaling fit.
• Step 3: Model Formulation & Training
  - Baseline: Multiple Linear Regression with Ordinary Least Squares (OLS) to establish an interpretable linear benchmark.
  - Regularized Model: Ridge Regression (L2 penalty) to avoid multicollinearity between Size and Bedrooms.
  - Cost Function: J(w) = (1/2m) ∑ (y_pred - y_true)² + λ ∑ w_i².
• Step 4: Model Evaluation Metrics
  - MAE (Mean Absolute Error): Average absolute dollar error ($|y - y_hat|), intuitive for realtors.
  - RMSE (Root Mean Squared Error): Penalizes severe price estimation errors heavily.
  - R² Score: Proportion of variance in property prices explained by features (Target: R² ≥ 0.85).
• Step 5: Interpretation & Deployment
  - Positive coefficients for Size indicate marginal value per square foot.
  - Negative coefficient for Age reflects property depreciation.`,
    tableData: {
      headers: ['Feature', 'Role', 'Data Type', 'Expected Relationship with Price'],
      rows: [
        ['Size (sq ft)', 'Predictor', 'Continuous Float', 'Strong positive correlation (+w)'],
        ['Bedrooms', 'Predictor', 'Discrete Integer', 'Positive correlation (+w)'],
        ['Age (years)', 'Predictor', 'Continuous Float', 'Negative correlation due to depreciation (-w)'],
        ['Location', 'Predictor', 'Categorical (One-Hot)', 'Variable premium based on urban desirability'],
        ['Sale Price ($)', 'Target (y)', 'Continuous Float', 'Dependent continuous output variable']
      ]
    }
  }
];
