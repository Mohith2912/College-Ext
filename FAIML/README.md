# SynapseAI: AIML Interactive Learning Platform

**Regulations R2023_V1.2 · BE/BTECH Common to CSE, IT, CSBS, CSD · III Semester · NOV/DEC 2026 Examinations**

Course: **Fundamentals of Artificial Intelligence and Machine Learning**

---

## 1. Overview & Architecture

SynapseAI is an enterprise-grade interactive educational web platform built to transform academic syllabi into a dynamic, production-quality learning workspace. The curriculum is faithfully mapped across 5 Course Outcomes (CO1 to CO5) and structured into five comprehensive units:

1. **Unit I: Introduction to AI and Search Algorithms** (CO1)
   - Intelligent Agents & PEAS Framework (Smart Home Energy Management, Vacuum Cleaner World)
   - Uninformed Search: BFS & DFS level-by-level traces
   - Informed Search: A* Search with admissible heuristics ($f(n) = g(n) + h(n)$)
   - Dynamic Urban Navigation & Path Planning

2. **Unit II: Knowledge Representation and Reasoning** (CO2)
   - Adversarial Game Playing: Two-Player Zero-Sum Games & Mini-Max Algorithm
   - Alpha-Beta ($\alpha$-$\beta$) Pruning with real-time branch elimination ($\alpha \ge \beta$)
   - Propositional Logic & Resolution Theorem Proving in CNF
   - First-Order Logic (FOL) & Quantifier Inference Rules (UI, EI, UG, EG)
   - Forward Chaining (Data-Driven) vs Backward Chaining (Goal-Driven)
   - Wumpus World 4×4 Grid Deductive Reasoning
   - Probabilistic Bayesian Networks & CPT Semantics

3. **Unit III: Introduction to Machine Learning** (CO3)
   - Machine Learning vs Traditional Programming
   - Supervised, Unsupervised, and Reinforcement Learning Taxonomy
   - End-to-End Supervised Learning Pipeline (80:20 Train-Test Splits)
   - Classification vs Regression
   - Bias-Variance Trade-Off & Generalization Diagnostics
   - Overfitting ($Training Error \ll Testing Error$) and Generalization Techniques (L1/L2 Regularization, Pruning, Early Stopping)
   - Classical Classifiers: Decision Trees, SVM, KNN

4. **Unit IV: Unsupervised Learning & Clustering** (CO4)
   - Feature Scaling: Min-Max Normalization vs Z-Score Standardization
   - K-Means Centroid Partitioning vs Density-Based DBSCAN
   - Hierarchical Agglomerative Clustering & Dendrograms
   - Curse of Dimensionality & Principal Component Analysis (PCA)
   - Manifold Learning for Non-linear Structure Recovery
   - Internal Cluster Validation: Silhouette Score ($S(P1) = 0.733$), Davies-Bouldin Index (DBI), Calinski-Harabasz Index (CHI)
   - Customer Segmentation & Student Performance Academic Interventions

5. **Unit V: Applied Machine Learning and Evaluation** (CO5)
   - Categorical Feature Preprocessing: One-Hot vs Label Encoding
   - Automatic Feature Selection: Filter, Wrapper (RFE), Embedded (LASSO/Trees)
   - Confusion Matrix Computation: TP, TN, FP, FN ($TP=45, TN=40, FP=10, FN=5 \implies Accuracy = 85.0\%$)
   - Metrics Suite: Precision, Recall, F1-Score, ROC-AUC
   - Model Validation: Hold-Out vs K-Fold vs Stratified K-Fold Cross Validation
   - Hyperparameter Optimization via Grid Search
   - End-to-End Pipelines: Bank Loan Approval & Telecom Customer Churn Prediction

---

## 2. File Organization

```text
├── src/
│   ├── assets/
│   │   └── images/                     # Academic conceptual diagrams
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # 3-Zone Top Bar Contract
│   │   │   └── Footer.tsx             # Academic course footer
│   │   ├── learning/
│   │   │   ├── QuestionCard.tsx       # Unabridged questions, answers, formulas, tables
│   │   │   └── SearchModal.tsx        # Global search across all 125 syllabus items
│   │   ├── visualizations/
│   │   │   ├── SearchGraphVisualizer.tsx   # BFS, DFS, UCS, A* step-trace engine
│   │   │   ├── GameTreeVisualizer.tsx      # Mini-Max & Alpha-Beta pruning simulator
│   │   │   ├── WumpusWorldVisualizer.tsx   # 4x4 sensory deductive reasoning engine
│   │   │   ├── BiasVarianceVisualizer.tsx  # Polynomial regression & overfitting studio
│   │   │   ├── ClusteringVisualizer.tsx    # K-Means, DBSCAN & Silhouette calculator
│   │   │   └── ConfusionMatrixVisualizer.tsx # 2x2 Matrix & K-Fold cross-validation lab
│   │   ├── case-studies/
│   │   │   └── CaseStudyWorkspace.tsx # 5 real-world industry case studies
│   │   └── assessments/
│   │       └── UnitAssessment.tsx     # Bloom's taxonomy assessments (K1–K6)
│   ├── data/
│   │   ├── manifest.ts                # Master course metadata and outcome mappings
│   │   └── units/
│   │       ├── unit1.ts               # Unit 1 Q&A (Part A: 1-15, Part B: 1-8, Part C: 1-2)
│   │       ├── unit2.ts               # Unit 2 Q&A (Part A: 1-15, Part B: 1-8, Part C: 1-2)
│   │       ├── unit3.ts               # Unit 3 Q&A (Part A: 1-15, Part B: 1-8, Part C: 1-2)
│   │       ├── unit4.ts               # Unit 4 Q&A (Part A: 1-15, Part B: 1-8, Part C: 1-2)
│   │       └── unit5.ts               # Unit 5 Q&A (Part A: 1-15, Part B: 1-8, Part C: 1-2)
│   ├── hooks/
│   │   └── useLearningProgress.ts     # LocalStorage state persistence
│   ├── lib/
│   │   └── algorithms/                # Pure mathematical & algorithmic trace engines
│   │       ├── searchTrace.ts
│   │       ├── gameTreeEngine.ts
│   │       ├── wumpusEngine.ts
│   │       ├── biasVarianceEngine.ts
│   │       ├── clusteringEngine.ts
│   │       └── evaluationMetricsEngine.ts
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   ├── App.tsx                        # Main learning shell
│   ├── index.css                      # Tailwind v4 typography and tokens
│   └── main.tsx                       # Entry point
```

---

## 3. Extending the Platform

### Adding a New Unit
1. Create `src/data/units/unitX.ts` exporting `unitXPartA`, `unitXPartB`, and `unitXPartC`.
2. Register the unit in `src/data/manifest.ts` under `courseManifest.units` and `allQuestionsByUnit`.
3. Add corresponding quiz items in `unitAssessments`.

### Adding a New Algorithm Visualizer
1. Implement the step-based trace generator in `src/lib/algorithms/myAlgorithm.ts`, returning an array of trace step snapshots.
2. Build the visual component in `src/components/visualizations/MyVisualizer.tsx` with Play, Pause, Step Forward, and Reset controls.
3. Mount the component in `App.tsx` and the standalone Algorithm Labs portal.

---

## 4. Local Development

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`.
Build verification: `npm run build` or `npx tsc --noEmit`.
