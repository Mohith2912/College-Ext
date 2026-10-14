/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  Brain,
  Layers,
  Sparkles,
  GitBranch,
  Shield,
  Home,
  CheckCircle2,
  Award,
  ChevronRight,
  Palette,
  RotateCcw,
  Zap,
  Sliders,
  Grid
} from 'lucide-react';

import { courseManifest } from './data/manifest';
import { useLearningProgress } from './hooks/useLearningProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/learning/SearchModal';

// Interactive Labs Components
import { SearchGraphVisualizer } from './components/visualizations/SearchGraphVisualizer';
import { VacuumAgentLab } from './components/visualizations/VacuumAgentLab';
import { GameTreeVisualizer } from './components/visualizations/GameTreeVisualizer';
import { WumpusWorldVisualizer } from './components/visualizations/WumpusWorldVisualizer';
import { BayesianNetworkLab } from './components/visualizations/BayesianNetworkLab';
import { BiasVarianceVisualizer } from './components/visualizations/BiasVarianceVisualizer';
import { ClassifierComparisonLab } from './components/visualizations/ClassifierComparisonLab';
import { HousePriceRegressionLab } from './components/visualizations/HousePriceRegressionLab';
import { ClusteringVisualizer } from './components/visualizations/ClusteringVisualizer';
import { PCADimensionalityLab } from './components/visualizations/PCADimensionalityLab';
import { HierarchicalClusteringLab } from './components/visualizations/HierarchicalClusteringLab';
import { ConfusionMatrixVisualizer } from './components/visualizations/ConfusionMatrixVisualizer';
import { CategoricalEncodingLab } from './components/visualizations/CategoricalEncodingLab';
import { FeatureSelectionLab } from './components/visualizations/FeatureSelectionLab';
import { GridSearchLab } from './components/visualizations/GridSearchLab';

// Case Studies & Assessments
import { CaseStudyWorkspace } from './components/case-studies/CaseStudyWorkspace';
import { UnitAssessment } from './components/assessments/UnitAssessment';

interface LabMetadata {
  id: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  co: string;
  tag: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ReactNode;
  conceptTakeaway: string;
}

export default function App() {
  const { progress, saveQuizScore } = useLearningProgress();

  const [activeView, setActiveView] = useState<
    'syllabus' | 'algorithms' | 'case-studies' | 'assessments' | 'bookmarks'
  >('syllabus');

  const [activeUnitNumber, setActiveUnitNumber] = useState(1);
  const [activeLabId, setActiveLabId] = useState<string>('u1-search');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Master definition of all 14 interactive labs mapped to syllabus concepts
  const allLabs: LabMetadata[] = [
    // Unit 1 Labs
    {
      id: 'u1-search',
      unitNumber: 1,
      title: 'A* & Uninformed Search Lab',
      subtitle: 'BFS, DFS, Uniform Cost & A* (f = g + h)',
      co: 'CO1',
      tag: 'Graph Search',
      color: 'from-blue-600 to-indigo-600',
      icon: Compass,
      component: <SearchGraphVisualizer />,
      conceptTakeaway: 'A* guarantees optimal pathfinding when heuristic h(n) is admissible (never overestimates). Explores fewer nodes than blind BFS/UCS by directing search toward the goal.'
    },
    {
      id: 'u1-vacuum',
      unitNumber: 1,
      title: 'Vacuum Cleaner World & PEAS Agent',
      subtitle: 'Model-Based Reflex Memory & Stochastic Cleaning',
      co: 'CO1',
      tag: 'Intelligent Agents',
      color: 'from-emerald-600 to-teal-600',
      icon: Cpu,
      component: <VacuumAgentLab />,
      conceptTakeaway: 'Model-Based Reflex agents overcome partial observability by maintaining internal world states, preventing infinite repetitive cleaning loops under stochastic uncertainty.'
    },

    // Unit 2 Labs
    {
      id: 'u2-gametree',
      unitNumber: 2,
      title: 'Mini-Max & Alpha-Beta Pruning Studio',
      subtitle: 'Adversarial Decision Trees & α ≥ β Branch Elimination',
      co: 'CO2',
      tag: 'Game Playing',
      color: 'from-indigo-600 to-purple-600',
      icon: Brain,
      component: <GameTreeVisualizer />,
      conceptTakeaway: 'Alpha-Beta pruning computes the identical optimal move as Mini-Max while skipping branches where α ≥ β, cutting search time and evaluation steps significantly.'
    },
    {
      id: 'u2-wumpus',
      unitNumber: 2,
      title: 'Wumpus World 4×4 Deductive Grid',
      subtitle: 'Sensory Logic: Breeze → Pit, Stench → Wumpus',
      co: 'CO2',
      tag: 'Propositional Logic',
      color: 'from-purple-600 to-pink-600',
      icon: Layers,
      component: <WumpusWorldVisualizer />,
      conceptTakeaway: 'Propositional and First-Order Logic enable agents to deduce provably safe squares (e.g. ¬Breeze ∧ ¬Stench at [1,1]) without risky exploratory trial-and-error.'
    },
    {
      id: 'u2-bayesian',
      unitNumber: 2,
      title: 'Bayesian Network & CPT Medical Inference',
      subtitle: 'Directed Acyclic Graphs & Probabilistic Reasoning',
      co: 'CO2',
      tag: 'Probabilistic AI',
      color: 'from-violet-600 to-indigo-600',
      icon: Sparkles,
      component: <BayesianNetworkLab />,
      conceptTakeaway: 'Bayesian Networks factor complex joint probability distributions via local Conditional Probability Tables (CPTs), powering abductive diagnostic inference under missing data.'
    },

    // Unit 3 Labs
    {
      id: 'u3-biasvar',
      unitNumber: 3,
      title: 'Polynomial Bias–Variance & Overfitting Simulator',
      subtitle: 'Degree Complexity, Noise & Ridge L2 Regularization',
      co: 'CO3',
      tag: 'Generalization',
      color: 'from-blue-600 to-cyan-600',
      icon: Zap,
      component: <BiasVarianceVisualizer />,
      conceptTakeaway: 'Overfitting occurs when training error ≪ test error due to excessive model complexity. Ridge L2 regularization penalizes high weights to restore generalization.'
    },
    {
      id: 'u3-classifiers',
      unitNumber: 3,
      title: 'Classifier Decision Boundaries: DT vs SVM vs KNN',
      subtitle: 'Orthogonal Splits, Support Vectors & Voronoi Bounds',
      co: 'CO3',
      tag: 'Classification',
      color: 'from-indigo-600 to-blue-600',
      icon: GitBranch,
      component: <ClassifierComparisonLab />,
      conceptTakeaway: 'Decision Trees split along orthogonal axes O(log n); SVM maximizes margin between support vectors O(n²); KNN is a lazy instance-based learner O(n).'
    },
    {
      id: 'u3-regression',
      unitNumber: 3,
      title: 'Multivariate House Price Regression Studio',
      subtitle: 'Area, Bedrooms, Age & Location with MAE / R² Metrics',
      co: 'CO3',
      tag: 'Regression',
      color: 'from-teal-600 to-emerald-600',
      icon: Home,
      component: <HousePriceRegressionLab />,
      conceptTakeaway: 'Continuous regression predicts numerical prices by minimizing Mean Squared Error (MSE). Categorical locations are integrated via One-Hot binary intercepts.'
    },

    // Unit 4 Labs
    {
      id: 'u4-clustering',
      unitNumber: 4,
      title: 'K-Means vs DBSCAN Clustering Sandbox',
      subtitle: 'Centroid Partitioning, Density Radius & Silhouette Formula',
      co: 'CO4',
      tag: 'Clustering',
      color: 'from-emerald-600 to-teal-600',
      icon: Layers,
      component: <ClusteringVisualizer />,
      conceptTakeaway: 'K-Means assumes spherical clusters and is sensitive to outliers. DBSCAN identifies arbitrary shapes and flags noise (-1). Silhouette Score S(P1) = (b-a)/max(a,b) = 0.733 confirms cluster separation.'
    },
    {
      id: 'u4-pca',
      unitNumber: 4,
      title: 'PCA & Feature Scaling Studio',
      subtitle: 'Eigenvector Projection & Z-Score Standardization',
      co: 'CO4',
      tag: 'Dimensionality Reduction',
      color: 'from-teal-600 to-cyan-600',
      icon: Compass,
      component: <PCADimensionalityLab />,
      conceptTakeaway: 'PCA projects high-dimensional data onto orthogonal axes of maximum variance. Standardization is required prior to PCA so high-magnitude variables do not distort eigenvectors.'
    },
    {
      id: 'u4-hierarchical',
      unitNumber: 4,
      title: 'Hierarchical Clustering & Dendrogram Cut Studio',
      subtitle: 'Agglomerative Tree Merging & Dynamic Distance Cuts',
      co: 'CO4',
      tag: 'Hierarchical',
      color: 'from-cyan-600 to-blue-600',
      icon: GitBranch,
      component: <HierarchicalClusteringLab />,
      conceptTakeaway: 'Hierarchical clustering constructs a deterministic dendrogram tree without pre-specifying K, allowing stakeholders to cut at any similarity threshold.'
    },

    // Unit 5 Labs
    {
      id: 'u5-confusion',
      unitNumber: 5,
      title: 'Confusion Matrix & ROC Threshold Tuner',
      subtitle: 'TP=45, TN=40, FP=10, FN=5 → Accuracy = 85.0%',
      co: 'CO5',
      tag: 'Model Evaluation',
      color: 'from-indigo-600 to-purple-600',
      icon: Award,
      component: <ConfusionMatrixVisualizer />,
      conceptTakeaway: 'Accuracy = (TP+TN)/Total = 85.0%. For imbalanced datasets, Precision TP/(TP+FP) and Recall TP/(TP+FN) must be optimized via threshold tuning and F1-score.'
    },
    {
      id: 'u5-encoding',
      unitNumber: 5,
      title: 'Categorical Encoding: One-Hot vs Label Encoding',
      subtitle: 'Nominal Color {Red, Blue, Green} vs Ordinal Education',
      co: 'CO5',
      tag: 'Preprocessing',
      color: 'from-purple-600 to-violet-600',
      icon: Palette,
      component: <CategoricalEncodingLab />,
      conceptTakeaway: 'Nominal categories (Color) require One-Hot binary columns to prevent artificial mathematical hierarchy. Ordinal categories (Education) use sequential Label Encoding.'
    },
    {
      id: 'u5-features',
      unitNumber: 5,
      title: 'Automatic Feature Selection Lab: Filter, Wrapper, LASSO',
      subtitle: 'Pruning Noise Features to Maximize Model Accuracy',
      co: 'CO5',
      tag: 'Feature Selection',
      color: 'from-orange-600 to-amber-600',
      icon: Sliders,
      component: <FeatureSelectionLab />,
      conceptTakeaway: 'Recursive Feature Elimination (RFE) and LASSO L1 regularization eliminate noise variables, lowering overfitting risk and increasing test accuracy from 65% to 88%.'
    },
    {
      id: 'u5-gridsearch',
      unitNumber: 5,
      title: 'Grid Search 2D Hyperparameter Heatmap',
      subtitle: 'Max Depth vs Learning Rate with 5-Fold Cross Validation',
      co: 'CO5',
      tag: 'Optimization',
      color: 'from-amber-600 to-emerald-600',
      icon: Grid,
      component: <GridSearchLab />,
      conceptTakeaway: 'Grid Search exhaustively evaluates the Cartesian product of hyperparameter sets paired with Stratified K-Fold CV to discover the globally optimal model configuration.'
    }
  ];

  // Current Unit's labs
  const unitLabs = allLabs.filter(lab => lab.unitNumber === activeUnitNumber);
  const activeLab = allLabs.find(lab => lab.id === activeLabId) || unitLabs[0] || allLabs[0];

  const currentUnitManifest =
    courseManifest.units.find(u => u.number === activeUnitNumber) ||
    courseManifest.units[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenSearch={() => setIsSearchOpen(true)}
        totalCompletedCount={progress.completedQuestions.length}
        totalQuestions={125}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectQuestion={(unitNum, part, qNo) => {
          setActiveView('syllabus');
          setActiveUnitNumber(unitNum);
          // Auto-select relevant lab for that unit
          const firstLabForUnit = allLabs.find(l => l.unitNumber === unitNum);
          if (firstLabForUnit) setActiveLabId(firstLabForUnit.id);
        }}
        completedQuestions={progress.completedQuestions}
        bookmarkedQuestions={progress.bookmarks}
        onToggleComplete={() => {}}
        onToggleBookmark={() => {}}
      />

      {/* Hero Strip — Interactive AIML Lab Studio */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Interactive AIML Engineering Studio · Regulations R2023_V1.2</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hands-On Artificial Intelligence & Machine Learning Lab
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                Experience every core concept from the curriculum through dynamic mathematical simulators, decision boundaries, algorithmic traces, and parameter playgrounds.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-2xl shrink-0">
              <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Active Labs</div>
                <div className="text-base font-extrabold text-indigo-600 font-mono">14 Labs</div>
              </div>
              <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Outcomes</div>
                <div className="text-base font-extrabold text-emerald-600 font-mono">CO1–CO5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {activeView === 'syllabus' && (
          <div className="space-y-6">
            {/* Unit Selector Pills (1 to 5) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {courseManifest.units.map(unit => {
                const isSelected = unit.number === activeUnitNumber;
                const labsInUnit = allLabs.filter(l => l.unitNumber === unit.number);

                return (
                  <button
                    key={unit.id}
                    onClick={() => {
                      setActiveUnitNumber(unit.number);
                      const firstLab = allLabs.find(l => l.unitNumber === unit.number);
                      if (firstLab) setActiveLabId(firstLab.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-linear-to-b from-indigo-50/90 to-white border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className={`font-mono font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
                          Unit {unit.number}
                        </span>
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {unit.courseOutcome}
                        </span>
                      </div>
                      <h3 className="text-xs font-extrabold text-slate-900 leading-snug">
                        {unit.shortTitle.split(':')[1]?.trim() || unit.shortTitle}
                      </h3>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{labsInUnit.length} Interactive Labs</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Unit Header Strip */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
                  <span>Course Outcome {currentUnitManifest.courseOutcome}</span>
                  <span>·</span>
                  <span className="text-slate-500">{currentUnitManifest.coDescription}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {currentUnitManifest.title}
                </h2>
              </div>

              {/* Lab Selector Segmented Control for Active Unit */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {unitLabs.map(lab => {
                  const isCurrentLab = lab.id === activeLabId;
                  const Icon = lab.icon;

                  return (
                    <button
                      key={lab.id}
                      onClick={() => setActiveLabId(lab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrentLab
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{lab.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Render Active Lab Canvas */}
            <div className="space-y-4">
              {activeLab.component}

              {/* Pedagogical Key Takeaway Card */}
              <div className="p-4 bg-linear-to-r from-indigo-50/80 via-white to-purple-50/80 border border-indigo-200/80 rounded-2xl flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-0.5">
                    Core Academic Takeaway & Exam Principle · {activeLab.co}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeLab.conceptTakeaway}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STANDALONE ALGORITHM DIRECTORY */}
        {activeView === 'algorithms' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All 14 Interactive Laboratories Directory
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select any laboratory to run step-by-step state traces, hyperparameter sweeps, and boundary simulations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                {[1, 2, 3, 4, 5].map(uNum => (
                  <button
                    key={uNum}
                    onClick={() => setActiveUnitNumber(uNum)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeUnitNumber === uNum ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Unit {uNum} Labs
                  </button>
                ))}
              </div>
            </div>

            {/* Lab Cards Grid for Selected Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allLabs
                .filter(l => l.unitNumber === activeUnitNumber)
                .map(lab => {
                  const Icon = lab.icon;
                  const isSelected = activeLabId === lab.id;

                  return (
                    <button
                      key={lab.id}
                      onClick={() => {
                        setActiveLabId(lab.id);
                        setActiveView('syllabus');
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="font-mono font-bold text-indigo-600">{lab.co}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {lab.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h3 className="text-sm font-bold text-slate-900">{lab.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{lab.subtitle}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                        <span>Launch Lab</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* CASE STUDIES VIEW */}
        {activeView === 'case-studies' && <CaseStudyWorkspace />}

        {/* ASSESSMENTS VIEW */}
        {activeView === 'assessments' && (
          <UnitAssessment
            initialUnitNumber={activeUnitNumber}
            onSaveScore={saveQuizScore}
            savedScores={progress.quizScores}
          />
        )}

        {/* BOOKMARKS / SAVED ITEMS VIEW */}
        {activeView === 'bookmarks' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Lab State & Study Bookmarks</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              All 14 interactive labs preserve their real-time state, parameters, and simulation runs directly in browser storage.
            </p>
            <button
              onClick={() => {
                setActiveView('syllabus');
                setActiveLabId('u1-search');
              }}
              className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              <span>Back to Interactive Labs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Academic Footer */}
      <Footer />
    </div>
  );
}
