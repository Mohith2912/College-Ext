/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from '../../types';

export const unit5PartA: QuestionItem[] = [
  {
    id: 'u5-pa-01',
    qNo: 1,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State the meaning of categorical variables in machine learning.',
    answer: 'Categorical variables are input or target features that represent discrete qualitative groups, classes, or labels rather than continuous numerical measurements. Examples include Gender {Male, Female}, City {Chennai, Mumbai, Delhi}, and Education Level {High School, UG, PG}.',
    keyTakeaways: [
      'Nominal (no inherent ordering, e.g., Color) vs Ordinal (inherent rank order, e.g., Education)'
    ]
  },
  {
    id: 'u5-pa-02',
    qNo: 2,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define feature selection.',
    answer: 'Feature selection is the process of selecting a subset of the most relevant, informative, and non-redundant features from the original feature set. It eliminates irrelevant noise variables, combats the Curse of Dimensionality, reduces overfitting, and improves model interpretability.',
    keyTakeaways: [
      'Preserves original feature semantics (unlike PCA, which transforms features)'
    ]
  },
  {
    id: 'u5-pa-03',
    qNo: 3,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between One-Hot Encoding and Label Encoding.',
    answer: '• One-Hot Encoding: Creates a separate binary (0 or 1) dummy column for each distinct category. Best for nominal variables with no natural order (e.g., Color: Red, Blue, Green), preventing false numerical hierarchy.\n• Label Encoding: Assigns a unique sequential integer (0, 1, 2, ...) to each category. Best for ordinal variables that possess an intrinsic ranking (e.g., Low=0, Medium=1, High=2).',
    tableData: {
      headers: ['Encoding Method', 'Mechanism', 'Appropriate Variable Type', 'Example Output'],
      rows: [
        ['One-Hot Encoding', 'Creates N binary dummy columns', 'Nominal (No order)', 'Red → [1, 0, 0], Blue → [0, 1, 0]'],
        ['Label Encoding', 'Maps categories to sequential integers', 'Ordinal (Ranked order)', 'UG → 1, PG → 2, PhD → 3']
      ]
    }
  },
  {
    id: 'u5-pa-04',
    qNo: 4,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State the purpose of automatic feature selection.',
    answer: 'The purpose of automatic feature selection is to algorithmically isolate the most statistically significant predictors without manual trial-and-error. It reduces model complexity, shortens training latency, prevents overfitting on spurious correlations, and enhances generalization accuracy.',
    keyTakeaways: [
      'Automates filtering out non-predictive noise variables'
    ]
  },
  {
    id: 'u5-pa-05',
    qNo: 5,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain cross-validation.',
    answer: 'Cross-validation is a statistical resampling technique used to evaluate how well a machine learning model generalizes to an independent dataset. It partitions the dataset into multiple subsets (folds), iteratively training on K-1 folds and validating on the remaining fold to provide an unbiased estimate of generalization error.',
    keyTakeaways: [
      'Reduces dependence on a single random train-test split'
    ]
  },
  {
    id: 'u5-pa-06',
    qNo: 6,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Interpret the role of Grid Search in machine learning.',
    answer: 'Grid Search is an exhaustive hyperparameter optimization technique. It systematically evaluates every combination in a user-defined grid of hyperparameter values (e.g., Learning Rate ∈ {0.01, 0.1}, Max Depth ∈ {5, 10}) using cross-validation to identify the parameter set that delivers the highest validation score.',
    keyTakeaways: [
      'Exhaustive search over specified parameter grid',
      'Pairs with K-Fold CV to guard against validation overfitting'
    ]
  },
  {
    id: 'u5-pa-07',
    qNo: 7,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe model evaluation.',
    answer: 'Model evaluation is the formal process of assessing a trained machine learning model\'s predictive performance, robustness, and reliability on unseen test data using domain-appropriate quantitative metrics (e.g., Accuracy, Precision, Recall, F1-Score, ROC-AUC, MAE, R²).',
    keyTakeaways: [
      'Guides model selection and verifies readiness for production deployment'
    ]
  },
  {
    id: 'u5-pa-08',
    qNo: 8,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'List any four evaluation metrics used for classification models.',
    answer: '1. Accuracy: (TP + TN) / (TP + TN + FP + FN)\n2. Precision: TP / (TP + FP)\n3. Recall (Sensitivity): TP / (TP + FN)\n4. F1-Score: 2 · (Precision · Recall) / (Precision + Recall)',
    keyTakeaways: [
      'Precision targets minimizing False Positives (e.g., Spam)',
      'Recall targets minimizing False Negatives (e.g., Cancer)',
      'F1 balances Precision and Recall for imbalanced classes'
    ]
  },
  {
    id: 'u5-pa-09',
    qNo: 9,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between Accuracy and Precision.',
    answer: '• Accuracy: Measures the overall proportion of correct predictions (both positive and negative) across all test samples: (TP + TN) / Total. Can be misleading on imbalanced datasets.\n• Precision: Measures the proportion of true positives among all instances predicted as positive: TP / (TP + FP). Reflects the reliability of positive predictions.',
    tableData: {
      headers: ['Dimension', 'Accuracy', 'Precision'],
      rows: [
        ['Formula', '(TP + TN) / (TP + TN + FP + FN)', 'TP / (TP + FP)'],
        ['Focus', 'Overall correctness across all classes', 'Correctness of positive predictions only'],
        ['Vulnerability', 'Misleading when one class dominates (e.g. 99% benign)', 'Focuses strictly on cost of False Positives'],
        ['Example Use Case', 'Balanced digit recognition', 'Spam detection (avoiding blocking real mail)']
      ]
    }
  },
  {
    id: 'u5-pa-10',
    qNo: 10,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Illustrate the concept of overfitting and summarize ways to reduce it.',
    answer: 'Overfitting occurs when a model fits training data too closely, learning random noise and peculiarities rather than general patterns. As a result, training error is near zero while test error is high.\nTechniques to reduce overfitting:\n1. Automatic feature selection to remove non-informative features.\n2. L1 / L2 Regularization to penalize large parameter weights.\n3. K-Fold Cross Validation to ensure stable evaluation.\n4. Decision tree pruning and dropout in neural networks.\n5. Gathering more diverse training samples.',
    keyTakeaways: [
      'High Variance problem: model complexity exceeds data evidence'
    ]
  },
  {
    id: 'u5-pa-11',
    qNo: 11,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between Hold-out validation and K-Fold Cross Validation.',
    answer: '• Hold-Out Validation: Splits dataset once into a single training set (e.g., 80%) and testing set (20%). Fast and computationally cheap, but performance is sensitive to the specific random split.\n• K-Fold Cross Validation: Splits data into K equal partitions. Evaluates the model K times, using each partition as the test fold once while training on the other K-1 folds. More computationally intensive, but provides a much more reliable estimate of generalization performance.',
    tableData: {
      headers: ['Feature', 'Hold-Out Validation', 'K-Fold Cross Validation'],
      rows: [
        ['Data Partitioning', 'Single split (e.g., 80:20)', 'K equal folds (e.g., K = 5 or 10)'],
        ['Training Runs', '1 training run', 'K training runs'],
        ['Computational Cost', 'Low (fastest)', 'K times higher computation'],
        ['Reliability', 'High variance based on random split', 'Low variance; reliable performance estimate']
      ]
    }
  },
  {
    id: 'u5-pa-12',
    qNo: 12,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Summarize the impact of feature selection on model performance.',
    answer: 'Impact of feature selection on model performance:\n1. Reduces Overfitting: Prunes irrelevant noise features that models might otherwise memorize.\n2. Improves Accuracy: Focuses model capacity on the strongest predictive signals.\n3. Speeds Up Training: Fewer dimensions mean faster convergence during training.\n4. Enhances Interpretability: Produces simpler, more explainable decision models for domain experts.',
    keyTakeaways: [
      'Directly reduces model variance without sacrificing critical predictive signal'
    ]
  },
  {
    id: 'u5-pa-13',
    qNo: 13,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply a suitable encoding technique to represent the categorical feature "Color" with values {Red, Blue, Green}.',
    answer: 'Recommended Technique: One-Hot Encoding.\nJustification: The categories {Red, Blue, Green} are nominal; they have no intrinsic ranking or natural numerical order. Using Label Encoding (Red=1, Blue=2, Green=3) would introduce an artificial mathematical order (e.g., Green > Red, Blue is average of Red and Green), which can distort distance-based and linear models.\nOne-Hot Encoding maps each color to an independent binary vector:\n• Red → [1, 0, 0]\n• Blue → [0, 1, 0]\n• Green → [0, 0, 1]',
    tableData: {
      headers: ['Original Color', 'Color_Red', 'Color_Blue', 'Color_Green'],
      rows: [
        ['Red', 1, 0, 0],
        ['Blue', 0, 1, 0],
        ['Green', 0, 0, 1]
      ]
    }
  },
  {
    id: 'u5-pa-14',
    qNo: 14,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe the purpose of the confusion matrix in model evaluation.',
    answer: 'A confusion matrix is an evaluation layout that tabulates the counts of actual versus predicted class outcomes for a classification model. It categorizes predictions into four distinct quadrants:\n• True Positives (TP): Positive cases correctly classified.\n• True Negatives (TN): Negative cases correctly classified.\n• False Positives (FP) (Type I Error): Negative cases incorrectly flagged as positive.\n• False Negatives (FN) (Type II Error): Positive cases incorrectly missed.\nIt provides the foundation for calculating Accuracy, Precision, Recall, Specificity, and F1-Score.',
    keyTakeaways: [
      'Exposes the specific distribution of classification errors (Type I vs Type II)'
    ]
  },
  {
    id: 'u5-pa-15',
    qNo: 15,
    part: 'A',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Compute the Accuracy of the model given: TP = 45, TN = 40, FP = 10, FN = 5.',
    answer: 'Given:\n• True Positives (TP) = 45\n• True Negatives (TN) = 40\n• False Positives (FP) = 10\n• False Negatives (FN) = 5\nFormula:\nAccuracy = (TP + TN) / (TP + TN + FP + FN)\nCalculation:\nAccuracy = (45 + 40) / (45 + 40 + 10 + 5) = 85 / 100 = 0.85 = 85%\nAnswer: The classification model achieves an overall Accuracy of 85.0% (0.85).',
    formula: 'Accuracy = \\frac{TP + TN}{TP + TN + FP + FN} = \\frac{45 + 40}{45 + 40 + 10 + 5} = \\frac{85}{100} = 85\\%',
    tableData: {
      headers: ['Metric Dimension', 'Value', 'Calculation'],
      rows: [
        ['Correct Predictions (TP + TN)', 85, '45 + 40'],
        ['Total Samples (TP + TN + FP + FN)', 100, '45 + 40 + 10 + 5'],
        ['Overall Accuracy', '85.0%', '85 / 100 = 0.85']
      ]
    }
  }
];

export const unit5PartB: QuestionItem[] = [
  {
    id: 'u5-pb-01',
    qNo: 1,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'A hospital wants to predict whether a patient has diabetes based on age, glucose level, BMI, and blood pressure.\n• Apply how categorical variables should be preprocessed before training the model.\n• Apply suitable feature selection techniques to improve model performance.',
    answer: `1. Clinical Diagnostic Problem Formulation:
A healthcare institution aims to predict diabetes onset (Binary: Diabetic / Non-Diabetic) utilizing patient clinical records containing both numerical measures (Age, Glucose, BMI, Blood Pressure) and categorical factors (Gender, Family History of Diabetes, Smoking Status).

2. Preprocessing Strategy for Categorical Attributes:
• Step 1: Missing Data Imputation
  - Check for missing values in categorical fields. Replace missing entries with the category mode (most frequent label) to avoid data loss.
• Step 2: Categorical Type Audit & Encoding
  - Binary/Nominal Features:
    - Gender {Male, Female} → Binary One-Hot Encoding [Is_Male, Is_Female].
    - Smoking Status {Never, Former, Current} → Nominal One-Hot Encoding to avoid introducing artificial numerical ordering.
  - Ordinal Features:
    - Family History Severity {None, Distant, Immediate} → Label / Ordinal Encoding [0, 1, 2], preserving clinical risk progression.
• Step 3: Numerical Normalization
  - Scale Glucose, BMI, and Blood Pressure using StandardScaler to prevent large numerical ranges from dominating gradient updates.

3. Feature Selection Application:
To eliminate clinical noise and isolate high-impact predictors:
1. Filter Method:
   - Calculate Chi-Square test statistics for categorical features against the diabetes target.
   - Calculate Pearson correlation between numerical features and the target.
   - Observation: Glucose and BMI exhibit high correlation with diabetes; blood pressure shows moderate correlation.
2. Wrapper Method (Recursive Feature Elimination - RFE):
   - Fit a Logistic Regression base estimator and iteratively prune the least significant clinical features.
3. Embedded Method (LASSO / L1 Regularization):
   - Adds an L1 penalty to shrink non-informative feature coefficients to zero.

4. Clinical Outcome:
Retaining the top predictors (Glucose, BMI, Age, and Family History) reduces training time by 40% and raises classification F1-Score from 0.76 to 0.86.`,
    tableData: {
      headers: ['Clinical Feature', 'Data Type', 'Preprocessing Technique', 'Feature Selection Status'],
      rows: [
        ['Glucose Level', 'Numerical Continuous', 'StandardScaler (Z-Score)', 'Retained — Strongest predictor'],
        ['BMI', 'Numerical Continuous', 'StandardScaler (Z-Score)', 'Retained — High clinical relevance'],
        ['Age', 'Numerical Continuous', 'StandardScaler (Z-Score)', 'Retained — Significant age-onset trend'],
        ['Smoking Status', 'Categorical Nominal', 'One-Hot Encoding', 'Retained via RFE selection'],
        ['Patient ID / Record No', 'Identifier', 'Drop Column', 'Eliminated — Zero predictive value']
      ]
    }
  },
  {
    id: 'u5-pb-02',
    qNo: 2,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Illustrate the application of K-Fold Cross Validation in evaluating a machine learning model and compare its evaluation results with the hold-out method.',
    answer: `1. Introduction:
Model validation assesses generalization performance on unseen data. The two primary techniques are Hold-Out Validation and K-Fold Cross Validation.

2. K-Fold Cross Validation Workflow:
• The full dataset is partitioned into K equal folds (typically K = 5 or K = 10).
• The training and validation cycle runs K iterations:
  - Iteration 1: Train on Folds [2, 3, 4, 5], Validate on Fold 1.
  - Iteration 2: Train on Folds [1, 3, 4, 5], Validate on Fold 2.
  - Iteration 3: Train on Folds [1, 2, 4, 5], Validate on Fold 3.
  - Iteration 4: Train on Folds [1, 2, 3, 5], Validate on Fold 4.
  - Iteration 5: Train on Folds [1, 2, 3, 4], Validate on Fold 5.
• Final Performance: The average of the K individual validation scores:
  Accuracy_CV = (1/K) ∑ Score_i, accompanied by standard deviation σ.

3. Detailed Comparison:
• Hold-Out Method:
  - Splits data once (e.g., 80% train, 20% test).
  - Risk: The 20% test split may accidentally receive an unusually easy or hard subset, producing misleadingly optimistic or pessimistic scores.
• K-Fold Method:
  - Every sample is used for validation exactly once, and used for training K-1 times.
  - Produces a stable, lower-variance estimate of true real-world generalization performance.`,
    tableData: {
      headers: ['Evaluation Aspect', 'Hold-Out Validation', 'K-Fold Cross Validation (K=5)'],
      rows: [
        ['Number of Splits', 'Single split (80:20)', '5 distinct balanced folds'],
        ['Sample Utilization', 'Only 20% of data tested', '100% of data used in testing across folds'],
        ['Performance Variance', 'High (sensitive to split luck)', 'Low (averaged across all folds)'],
        ['Computational Cost', '1x training time', '5x training time'],
        ['Best Use Case', 'Very large datasets (millions of rows)', 'Small to moderately sized datasets']
      ]
    }
  },
  {
    id: 'u5-pb-03',
    qNo: 3,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze the impact of automatic feature selection on machine learning models by examining how it improves prediction accuracy and reduces model complexity.',
    answer: `1. Introduction:
Automatic feature selection algorithms evaluate candidate predictors to find the optimal feature subset without human intervention, addressing the Curse of Dimensionality.

2. Three Algorithmic Families:
1. Filter Methods:
   - Rank features using statistical scores independent of model training (e.g., Pearson Correlation, Chi-Square, Information Gain / Mutual Information).
   - Fast and computationally scalable; ignores feature interactions.
2. Wrapper Methods:
   - Use a machine learning algorithm as an evaluation engine to test subsets of features (e.g., Recursive Feature Elimination - RFE, Forward Stepwise Selection).
   - Captures feature interactions; computationally expensive on large feature spaces.
3. Embedded Methods:
   - Perform feature selection as an intrinsic part of model training (e.g., LASSO L1 regularization, Random Forest Gini feature importance).
   - Balances computational speed with feature interaction awareness.

3. Impact on Prediction Accuracy & Complexity:
• Eliminating Noise: Removing irrelevant features prevents models from learning spurious correlations.
• Mitigating Multicollinearity: Eliminates redundant, correlated variables that inflate parameter variance.
• Reducing Latency: Smaller feature matrices speed up training and production scoring.
• Improving Interpretability: Clearer visibility into the specific drivers behind predictions.`,
    tableData: {
      headers: ['Family', 'Core Techniques', 'Computational Cost', 'Feature Interactions'],
      rows: [
        ['Filter', 'Correlation, Chi-Square, Mutual Info', 'O(n · d) — Very Fast', 'Ignored (Evaluates each feature independently)'],
        ['Wrapper', 'Recursive Feature Elimination (RFE)', 'O(2^d) or O(d²) — Heavy', 'Captured through model retraining'],
        ['Embedded', 'LASSO (L1), Tree Gini Importance', 'O(Training Cost) — Balanced', 'Captured natively during model fit']
      ]
    }
  },
  {
    id: 'u5-pb-04',
    qNo: 4,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze the different classification evaluation metrics—Accuracy, Precision, Recall, F1-Score, and ROC-AUC—and compare their suitability for assessing machine learning model performance under different scenarios.',
    answer: `1. Introduction:
Selecting appropriate evaluation metrics is critical to assessing classifier performance, especially when class distributions are imbalanced or when Type I and Type II errors carry unequal real-world costs.

2. In-Depth Metric Analysis:

1. Accuracy = (TP + TN) / Total
• Best for: Balanced datasets with roughly equal class representations.
• Limitation: Fails on imbalanced data. A model predicting "No Fraud" on a dataset with 99% legitimate transactions achieves 99% accuracy while detecting zero actual fraud cases.

2. Precision = TP / (TP + FP)
• Measures: Out of all instances flagged as positive, what proportion was truly positive?
• Best when False Positives carry high costs (e.g., Spam filtering, where blocking an important business email is unacceptable).

3. Recall (Sensitivity) = TP / (TP + FN)
• Measures: Out of all actual positive instances, what proportion did the model successfully identify?
• Best when False Negatives carry high costs (e.g., Cancer screening or credit card fraud, where missing a positive case has severe consequences).

4. F1-Score = 2 · (Precision · Recall) / (Precision + Recall)
• Harmonic mean of Precision and Recall.
• Best for imbalanced datasets when both False Positives and False Negatives need to be balanced.

5. ROC-AUC (Area Under Receiver Operating Characteristic Curve):
• Plots True Positive Rate (Recall) vs False Positive Rate (1 - Specificity) across all decision thresholds.
• Evaluates overall class separation capability independent of any single probability cutoff.`,
    tableData: {
      headers: ['Metric', 'Primary Goal', 'Sensitive To', 'Real-World Scenario'],
      rows: [
        ['Accuracy', 'Maximize overall correct labels', 'Class imbalance collapse', 'Handwritten digit recognition (0–9)'],
        ['Precision', 'Minimize False Positives', 'False Alarms (FP)', 'Email spam filtering, loan auto-approval'],
        ['Recall', 'Minimize False Negatives', 'Missed Targets (FN)', 'Tumor diagnosis, airport security scanning'],
        ['F1-Score', 'Balance Precision and Recall', 'Both FP and FN', 'Customer churn with 5% positive rate'],
        ['ROC-AUC', 'Threshold-independent discrimination', 'Rank ordering ability', 'Comparing competing classification algorithms']
      ]
    }
  },
  {
    id: 'u5-pb-05',
    qNo: 5,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Compare the performance of different model evaluation techniques such as Hold-Out Validation, K-Fold Cross Validation, and Stratified K-Fold Validation. Discuss their advantages and limitations.',
    answer: `1. Introduction:
Validation techniques estimate model generalization to prevent overfitting and guide hyperparameter tuning. The choice of strategy depends on dataset size, training cost, and class balance.

2. Methodological Breakdown:

1. Hold-Out Validation:
• Mechanism: Single partition into Training (70–80%) and Test (20–30%) subsets.
• Advantages: Fast; requires only one training run. Ideal for massive deep learning datasets.
• Limitations: High variance; performance estimate depends on the specific random split.

2. K-Fold Cross Validation:
• Mechanism: Splits data into K equal partitions; rotates training over K-1 folds and validates on the remaining fold K times.
• Advantages: Efficient data use; every sample is validated once; yields stable mean and variance metrics.
• Limitations: K times more computationally intensive. In imbalanced datasets, random partitioning can result in folds with few or no positive instances.

3. Stratified K-Fold Cross Validation:
• Mechanism: Enhances standard K-Fold by enforcing that each fold contains the exact same percentage of each target class as the complete dataset.
• Advantages: Essential for imbalanced classification problems (e.g., 95% Class 0, 5% Class 1); ensures every fold has representative class ratios.
• Limitations: Applies only to classification tasks; slightly higher partitioning overhead.`,
    tableData: {
      headers: ['Technique', 'Splits', 'Class Distribution Handling', 'Computational Cost', 'Primary Use Case'],
      rows: [
        ['Hold-Out', 'Single (e.g., 80:20)', 'Random (Can skew small classes)', 'O(1) — Fastest', 'Very large datasets (>1M records)'],
        ['K-Fold', 'K folds (e.g., K=10)', 'Random across folds', 'O(K) — Higher', 'Balanced regression & classification'],
        ['Stratified K-Fold', 'K folds (e.g., K=10)', 'Strictly preserves class proportions', 'O(K) — Higher', 'Imbalanced classification problems']
      ]
    }
  },
  {
    id: 'u5-pb-06',
    qNo: 6,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Evaluate the effectiveness of Grid Search in hyperparameter tuning and justify its suitability for improving the performance of machine learning models.',
    answer: `1. Introduction:
Hyperparameters are configuration variables set before training that control model architecture and learning dynamics (e.g., tree depth, learning rate, regularization strength). Grid Search systematically searches for the optimal hyperparameter combination.

2. Grid Search Mechanism:
1. Define Parameter Grid:
   - Max Depth = {5, 10, 15}
   - Learning Rate = {0.01, 0.1}
   - Number of Estimators = {100, 200}
   - Total Configurations = 3 × 2 × 2 = 12 candidate combinations.
2. Cross-Validation Loop:
   - For each parameter combination, run 5-Fold Cross Validation.
   - Total training runs = 12 × 5 = 60 model fits.
3. Metric Selection:
   - Track mean validation score (e.g., F1-Score or ROC-AUC) across folds.
4. Model Selection:
   - Select the parameter combination with the highest average validation score and refit on the full training dataset.

3. Strengths & Limitations:
• Advantages: Exhaustive and deterministic; evaluates all specified combinations; directly paired with cross-validation to prevent validation overfitting.
• Limitations: Suffers from combinatorial explosion as the number of hyperparameters and values grows (can be addressed using Randomized Search or Bayesian Optimization).`,
    tableData: {
      headers: ['Hyperparameter', 'Candidate Values', 'Best Identified', 'Performance Impact'],
      rows: [
        ['Max Depth', '{5, 10, 15}', '10', 'Depth 5 underfits; Depth 15 overfits'],
        ['Learning Rate', '{0.01, 0.1}', '0.1', 'Faster convergence without instability'],
        ['Number of Estimators', '{100, 200}', '200', 'Ensemble variance reduction improves F1 by 4%']
      ]
    }
  },
  {
    id: 'u5-pb-07',
    qNo: 7,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'A bank wants to build a loan approval prediction model.\n• Classify the preprocessing steps required for categorical variables.\n• Justify feature selection and model evaluation techniques to improve prediction accuracy.',
    answer: `1. Problem Definition:
A commercial bank aims to automate retail loan decisions (Target: Approved / Rejected) based on applicant profiles containing categorical and numerical attributes.

2. Categorical Variable Preprocessing:
• Handling Missing Data: Impute missing categorical attributes using category modes; flag records with missing credit histories for verification.
• Label Encoding (for Ordinal Variables):
  - Education Level: {High School: 1, Undergraduate: 2, Postgraduate: 3}.
• One-Hot Encoding (for Nominal Variables):
  - Employment Type: {Salaried, Self-Employed, Business} → [Is_Salaried, Is_SelfEmployed, Is_Business].
  - Marital Status: {Single, Married} → [Is_Single, Is_Married].
• Numerical Scaling: Apply RobustScaler to Income and Loan Amount to reduce the influence of extreme outlier values.

3. Feature Selection Strategy:
• Filter Method: Use Information Gain and Mutual Information to rank features against loan approval outcomes.
• Feature Elimination: Credit Score and Debt-to-Income (DTI) ratio emerge as dominant predictors; drop demographic variables (e.g., Applicant ID) to avoid bias and simplify the model.

4. Model Evaluation Justification:
• Evaluation Metric: Precision-Recall tradeoff analysis.
  - False Positive Cost: Approving a high-risk applicant who defaults (financial capital loss).
  - False Negative Cost: Rejecting a creditworthy applicant (lost interest revenue).
  - Target: Maximize F1-Score and ROC-AUC.
• Validation Strategy: Use 5-Fold Stratified Cross Validation to preserve the ratio of approved to defaulted loans across all validation splits.`,
    tableData: {
      headers: ['Applicant Attribute', 'Variable Type', 'Preprocessing Method', 'Feature Importance Rank'],
      rows: [
        ['Credit Bureau Score', 'Numerical Continuous', 'StandardScaler', 'Rank 1 (Most Critical)'],
        ['Debt-to-Income Ratio', 'Numerical Continuous', 'StandardScaler', 'Rank 2 (Dominant Risk Factor)'],
        ['Employment Type', 'Categorical Nominal', 'One-Hot Encoding', 'Rank 3 (Stability Metric)'],
        ['Education Level', 'Categorical Ordinal', 'Label Encoding', 'Rank 4 (Socioeconomic Indicator)']
      ]
    }
  },
  {
    id: 'u5-pb-08',
    qNo: 8,
    part: 'B',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'A company develops a customer churn prediction model.\n• Discuss how you would evaluate the model using different performance metrics.\n• Recommend suitable validation techniques to improve the model performance.',
    answer: `1. Business Context:
A telecommunications provider seeks to identify customers likely to cancel their subscriptions (Churn = 1) versus those who remain active (Churn = 0). Churn is typically an imbalanced class problem (~10% churn rate).

2. Evaluation Metrics Analysis:
• Accuracy: Unreliable. A naive classifier predicting "No Churn" for every customer achieves 90% accuracy while failing to detect a single churning customer.
• Recall (Sensitivity): Critical. High Recall ensures the company identifies the largest possible share of customers at risk of leaving.
• Precision: Important for operational efficiency. High Precision ensures retention offers and discounts are not wasted on customers who had no intention of leaving.
• F1-Score: The primary benchmark metric, balancing Precision and Recall for the minority churn class.
• ROC-AUC: Measures the model's ability to rank churning customers higher in churn probability than non-churning customers across all possible decision thresholds.

3. Validation Strategy Recommendation:
• Stratified K-Fold Cross Validation (K = 5 or 10):
  - Preserves the 10% churn ratio across every training and validation fold, preventing folds with zero churn cases.
• Cost-Sensitive Threshold Tuning:
  - Adjust the decision threshold down from the default 0.5 to 0.35 to increase Recall and capture more at-risk accounts.`,
    tableData: {
      headers: ['Evaluation Metric', 'Formula', 'Value in Churn Context', 'Recommended Focus'],
      rows: [
        ['Accuracy', '(TP + TN) / Total', 'Misleading due to 90:10 imbalance', 'Avoid as primary KPI'],
        ['Recall', 'TP / (TP + FN)', 'Ensures at-risk customers are identified', 'Primary target (≥ 80%)'],
        ['Precision', 'TP / (TP + FP)', 'Ensures retention budget is spent effectively', 'Secondary target (≥ 70%)'],
        ['F1-Score', '2 · P · R / (P + R)', 'Harmonic balance for minority churn class', 'Primary model selection metric']
      ]
    }
  }
];

export const unit5PartC: QuestionItem[] = [
  {
    id: 'u5-pc-01',
    qNo: 1,
    part: 'C',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'A bank wants to develop a machine learning model to predict whether a customer is eligible for a loan. The dataset contains categorical variables such as Gender, Marital Status, Education, Employment Type, and numerical variables such as Income, Loan Amount, and Credit Score.\nDesign and justify a complete machine learning pipeline for the loan eligibility prediction system by addressing:\na) An appropriate preprocessing strategy for handling categorical variables.\nb) A feature selection approach and how automatic feature selection improves performance.\nc) A model evaluation and optimization framework using Cross Validation and Grid Search, with performance metrics.',
    answer: `1. Comprehensive Architecture for Bank Loan Eligibility Prediction:
The objective is to automate loan decisions with high accuracy, low default risk, and full regulatory auditability.

2. Part (a): Preprocessing Strategy for Categorical & Numerical Variables:
• Step 1: Missing Data Imputation
  - Numerical features (Income, Loan Amount): Impute using median to prevent outlier distortion.
  - Categorical features (Gender, Marital Status, Employment): Impute using mode.
• Step 2: Categorical Encoding
  - Nominal Features: Apply One-Hot Encoding to Gender {Male, Female}, Marital Status {Single, Married}, and Employment Type {Salaried, Self-Employed}.
  - Ordinal Features: Apply Label Encoding to Education Level {High School: 1, UG: 2, PG: 3}.
• Step 3: Numerical Feature Scaling
  - Apply StandardScaler to Income, Loan Amount, and Credit Score so large dollar amounts do not overshadow credit bureau ratings.

3. Part (b): Feature Selection Approach:
• Hybrid Two-Stage Feature Selection:
  - Stage 1: Filter Method (Mutual Information) to drop features with near-zero association with loan outcomes.
  - Stage 2: Embedded Method (Random Forest Feature Importance and LASSO L1 penalty) to rank feature weights.
• Justification:
  - Eliminates noise and prevents models from memorizing non-predictive attributes.
  - Reduces training latency and lowers risk of regulatory non-compliance.

4. Part (c): Evaluation & Optimization Framework:
• Optimization via Grid Search CV:
  - Base Estimator: Gradient Boosted Trees / Random Forest.
  - Search Space:
    - n_estimators: [100, 200, 300]
    - max_depth: [3, 5, 8]
    - learning_rate: [0.01, 0.05, 0.1]
  - Validation: 5-Fold Stratified Cross-Validation, preserving the default-to-approval ratio across all folds.
• Evaluation Metrics Suite:
  - Confusion Matrix: Tracks False Positives (bad loans approved) and False Negatives (good loans rejected).
  - Precision: Minimizes defaults by ensuring approved applicants are creditworthy.
  - Recall: Maximizes revenue by approving as many qualified applicants as possible.
  - ROC-AUC: Verifies discrimination capability across risk thresholds.`,
    tableData: {
      headers: ['Pipeline Component', 'Methodology Selected', 'Engineering Justification'],
      rows: [
        ['Preprocessing', 'Mode Imputation + One-Hot/Label Encoding + StandardScaler', 'Eliminates scale disparity and encodes categorical features cleanly'],
        ['Feature Selection', 'Mutual Information + Embedded Tree Importance', 'Isolates top predictive factors (Credit Score, DTI, Income)'],
        ['Validation', '5-Fold Stratified Cross Validation', 'Prevents class imbalance skew across validation splits'],
        ['Hyperparameter Search', 'GridSearchCV over depth and learning rate', 'Locates optimal hyperparameters to minimize test error'],
        ['Final Metric KPI', 'F1-Score (≥ 0.88) & ROC-AUC (≥ 0.92)', 'Balances default risk against loan origination revenue']
      ]
    }
  },
  {
    id: 'u5-pc-02',
    qNo: 2,
    part: 'C',
    unitNumber: 5,
    courseOutcome: 'CO5',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Create a comprehensive machine learning application to solve a real-world classification problem by designing and implementing an end-to-end machine learning pipeline. Your solution should include and justify: data preprocessing, encoding methods, automatic feature selection, evaluation framework with performance metrics, Cross Validation, Grid Search hyperparameter tuning, and challenge analysis with improvements.',
    answer: `1. Case Study: End-to-End Enterprise Customer Churn Prediction:
Design and implement a production pipeline for a telecom provider to identify customers at risk of churn, enabling proactive retention campaigns.

2. Pipeline Design:
Raw Data Ingestion ──> Preprocessing & Imputation ──> Encoding & Robust Scaling ──> Automatic Feature Selection (RFE) ──> Stratified 10-Fold CV + Grid Search ──> Cost-Sensitive Threshold Tuning ──> Production Serving

3. Component Specifications:
• Data Preprocessing:
  - Check schema for tenure, monthly charges, total charges, contract type, and payment methods.
  - Impute missing TotalCharges using median.
• Categorical Encoding:
  - Label Encoding for ordinal tenure tiers (Month-to-month: 1, One-year: 2, Two-year: 3).
  - One-Hot Encoding for nominal attributes (Payment Method, Tech Support, Internet Service).
• Automatic Feature Selection:
  - Use Recursive Feature Elimination (RFE) with Logistic Regression to prune bottom-tier features, retaining top predictors: Contract Type, Tenure, Monthly Charges, and Tech Support.
• Validation Architecture:
  - Use Stratified 10-Fold Cross Validation to maintain the 15% churn ratio across every fold.
• Hyperparameter Optimization:
  - Run Grid Search over Random Forest hyperparameters (n_estimators ∈ {100, 200}, max_depth ∈ {6, 10, 14}, min_samples_split ∈ {2, 5}).

4. Evaluation Metrics & Optimization Challenges:
• Primary Metrics: F1-Score, Precision-Recall AUC, and Confusion Matrix.
• Challenge 1: Severe Class Imbalance (85% retain vs 15% churn):
  - Addressed via SMOTE (Synthetic Minority Over-sampling) on training folds only.
• Challenge 2: Shifting Churn Thresholds:
  - Retention offers cost $20; losing a customer costs $600.
  - Lower probability threshold from 0.5 to 0.3 to increase Recall and minimize costly False Negatives.
• Challenge 3: Concept & Data Drift:
  - Schedule automated weekly pipeline retraining with rolling windows to capture shifting customer habits.`,
    tableData: {
      headers: ['Pipeline Stage', 'Selected Technique', 'Mitigation Strategy'],
      rows: [
        ['Data Preprocessing', 'Median Imputation + Outlier Trimming', 'Handles missing fields without introducing numerical bias'],
        ['Categorical Handling', 'One-Hot & Label Encoding', 'Preserves ordinal contract hierarchies'],
        ['Feature Selection', 'Recursive Feature Elimination (RFE)', 'Removes non-informative features to reduce model complexity'],
        ['Validation', 'Stratified 10-Fold CV', 'Guarantees representative minority churn representation in every fold'],
        ['Hyperparameter Tuning', 'GridSearchCV (Depth, Estimators)', 'Optimizes generalization and prevents tree overfitting'],
        ['Post-Processing', 'Threshold Tuning (0.3 Cutoff)', 'Aligns predictions with business retention costs']
      ]
    }
  }
];
