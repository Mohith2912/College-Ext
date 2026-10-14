/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from '../../types';

export const unit4PartA: QuestionItem[] = [
  {
    id: 'u4-pa-01',
    qNo: 1,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Identify the benefits of unsupervised learning in machine learning.',
    answer: 'Benefits of unsupervised learning:\n1. Operates on massive volumes of raw, unlabeled data without human annotation.\n2. Discovers unexpected latent patterns, customer groupings, and hidden structures.\n3. Enables dimensionality reduction and data compression (e.g., PCA).\n4. Essential for exploratory data analysis, anomaly/fraud detection, and representation learning.',
    keyTakeaways: [
      'Eliminates dependency on costly manual data annotation',
      'Uncovers intrinsic data geometry and natural groupings'
    ]
  },
  {
    id: 'u4-pa-02',
    qNo: 2,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define manifold learning.',
    answer: 'Manifold learning is an approach to non-linear dimensionality reduction based on the assumption that high-dimensional observational data lies on an embedded lower-dimensional non-linear manifold within the higher-dimensional ambient space (e.g., Swiss Roll). Algorithms include Isomap, LLE, and t-SNE.',
    keyTakeaways: [
      'Preserves non-linear geodesic distances and local neighborhood topology',
      'Overcomes the linearity constraint of classical PCA'
    ]
  },
  {
    id: 'u4-pa-03',
    qNo: 3,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain the difference between normalization and standardization in data preprocessing.',
    answer: '• Normalization (Min-Max Scaling): Rescales feature values into a bounded range, typically [0, 1]. Formula: x_norm = (x - min) / (max - min). Best for algorithms sensitive to bounded scale when data does not follow a Gaussian distribution.\n• Standardization (Z-Score Scaling): Centers data to have zero mean (μ = 0) and unit variance (σ = 1). Formula: z = (x - μ) / σ. Best when features follow normal distributions or for models assuming Gaussian priors (e.g., PCA, SVM).',
    tableData: {
      headers: ['Feature', 'Normalization (Min-Max)', 'Standardization (Z-Score)'],
      rows: [
        ['Formula', '(x - min) / (max - min)', '(x - μ) / σ'],
        ['Resulting Range', 'Strictly [0, 1] (or specified bounds)', 'Unbounded, centered at 0 with σ = 1'],
        ['Outlier Sensitivity', 'Highly sensitive (outliers compress normal values)', 'More robust to extreme values'],
        ['Best Use Case', 'Neural networks, image pixel scaling [0, 255]', 'PCA, Linear Models, K-Means']
      ]
    }
  },
  {
    id: 'u4-pa-04',
    qNo: 4,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe the advantages of Hierarchical Clustering.',
    answer: 'Advantages of Hierarchical Clustering:\n1. No Predefined K: Does not require specifying the number of clusters in advance.\n2. Visual Dendrogram: Produces a rich, interpretable hierarchical tree (dendrogram) showing nested cluster relationships.\n3. Arbitrary Granularity: Allows users to cut the dendrogram at any distance threshold to obtain any desired number of clusters.\n4. Preserves Taxonomy: Ideal for biological phylogenetics and taxonomy modeling.',
    keyTakeaways: [
      'Agglomerative (bottom-up) vs Divisive (top-down)',
      'High interpretability via dendrogram cuts'
    ]
  },
  {
    id: 'u4-pa-05',
    qNo: 5,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Name the applications of feature extraction and its purpose.',
    answer: 'Purpose: To transform high-dimensional raw observations into a reduced set of informative, non-redundant numerical features that preserve the critical variance and discriminative signal of the original data.\nApplications:\n• Computer Vision / Image Recognition (edges, textures, CNN embeddings)\n• Speech & Audio Processing (MFCC spectral features)\n• Text Mining / NLP (TF-IDF, word embeddings, topic modeling)\n• Medical Diagnostics (ECG/EEG wave decomposition)',
    keyTakeaways: [
      'Mitigates the Curse of Dimensionality and speeds up downstream model training'
    ]
  },
  {
    id: 'u4-pa-06',
    qNo: 6,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Choose a suitable dimensionality reduction technique for a high-dimensional dataset and justify your choice.',
    answer: 'Principal Component Analysis (PCA) is the primary recommendation for high-dimensional tabular datasets. It identifies orthogonal axes of maximal variance (eigenvectors of the covariance matrix) and projects the data onto top principal components. This compresses feature dimensionality while retaining the majority of data variance, eliminating multicollinearity and enabling 2D/3D visualization.',
    keyTakeaways: [
      'Maximizes retained variance while guaranteeing orthogonal (uncorrelated) components'
    ]
  },
  {
    id: 'u4-pa-07',
    qNo: 7,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Describe the purpose of the Silhouette Score in clustering evaluation.',
    answer: 'The Silhouette Score measures how well-separated and cohesive clusters are, evaluating how similar an individual data point is to its own cluster (intra-cluster compactness a(i)) compared to other neighboring clusters (nearest-cluster separation b(i)). Values range from -1 to +1, where values close to +1 indicate tight, distinct clusters.',
    formula: 's(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}',
    keyTakeaways: [
      '+1: Well matched to own cluster and far from neighbors',
      '0: On or very close to the decision boundary between clusters',
      '-1: Probably assigned to the wrong cluster'
    ]
  },
  {
    id: 'u4-pa-08',
    qNo: 8,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'List some common challenges in unsupervised learning.',
    answer: 'Common challenges in unsupervised learning:\n1. Absence of ground-truth target labels for objective performance verification.\n2. Difficulty in objectively validating cluster quality without domain experts.\n3. Determining the optimal number of clusters (K).\n4. Sensitivity to feature scaling, measurement units, noise, and outliers.\n5. High computational complexity O(n² or n³) on massive datasets (e.g., Hierarchical Clustering).',
    keyTakeaways: [
      'Subjective evaluation requires intrinsic validity indices (Silhouette, DBI, CHI)'
    ]
  },
  {
    id: 'u4-pa-09',
    qNo: 9,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State the advantages of hierarchical clustering over K-means.',
    answer: '1. No need to specify the number of clusters (K) a priori.\n2. Produces a complete hierarchical tree (dendrogram) revealing nested sub-clusters.\n3. Deterministic: Yields the exact same clustering on every run (no random centroid initialization issues).\n4. Capable of discovering clusters of varying granularities.',
    keyTakeaways: [
      'Eliminates random seed variability common in K-Means'
    ]
  },
  {
    id: 'u4-pa-10',
    qNo: 10,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'State the advantage of using PCA for dimensionality reduction.',
    answer: 'Advantages of PCA:\n1. Compresses high-dimensional datasets while retaining the maximum possible variance.\n2. Removes multicollinearity by transforming correlated variables into completely uncorrelated orthogonal components.\n3. Reduces computational training latency for downstream algorithms.\n4. Enables intuitive 2D and 3D visual projection of complex high-dimensional spaces.',
    keyTakeaways: [
      'Linear transformation that diagonalizes the empirical covariance matrix'
    ]
  },
  {
    id: 'u4-pa-11',
    qNo: 11,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Differentiate between K-Means and DBSCAN.',
    answer: 'K-Means is a centroid-based partitioning algorithm that divides data into K predefined spherical clusters by minimizing within-cluster sum of squares. DBSCAN is a density-based algorithm that discovers clusters of arbitrary non-spherical shapes based on local point density, automatically isolating sparse noise points as outliers without requiring K.',
    tableData: {
      headers: ['Feature', 'K-Means Clustering', 'DBSCAN Clustering'],
      rows: [
        ['Clustering Basis', 'Centroid-based partition', 'Density-based connectivity'],
        ['Number of Clusters', 'Must specify K in advance', 'Automatically discovered'],
        ['Cluster Shapes', 'Assumes spherical/globular shapes', 'Arbitrary, concave, crescent shapes'],
        ['Outlier Handling', 'Forced into nearest cluster (sensitive)', 'Identifies outliers as noise points (-1)'],
        ['Parameters', 'K (number of clusters)', 'Eps (radius) and MinPts (min neighbors)']
      ]
    }
  },
  {
    id: 'u4-pa-12',
    qNo: 12,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Discuss how different algorithms affect the outcome of unsupervised learning tasks.',
    answer: 'Different clustering algorithms make distinct geometric and statistical assumptions about the underlying data manifold:\n• K-Means assumes convex, isotropic, spherical clusters of roughly equal variance.\n• DBSCAN assumes clusters are dense regions separated by sparse noise.\n• Hierarchical clustering assumes nested tree-like taxonomies.\nSelecting an algorithm incompatible with the data distribution (e.g., using K-Means on concentric ring shapes) causes severe misclustering.',
    keyTakeaways: [
      'Algorithm selection must match the geometric distribution of the data'
    ]
  },
  {
    id: 'u4-pa-13',
    qNo: 13,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Select an appropriate clustering algorithm to segment customers based on their buying behaviour and justify your selection.',
    answer: 'K-Means Clustering is the recommended algorithm for customer segmentation when transaction datasets are large and business teams have a target number of customer tiers (e.g., VIP, Regular, Occasional, Inactive). Its computational efficiency O(n · K · i) processes tens of thousands of records rapidly, generating compact, easily interpretable centroid profiles for targeted marketing.',
    keyTakeaways: [
      'High scalability and intuitive centroid interpretation for business stakeholders'
    ]
  },
  {
    id: 'u4-pa-14',
    qNo: 14,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain how the Davies–Bouldin Index (DBI) is used to evaluate clustering results.',
    answer: 'The Davies-Bouldin Index (DBI) is an internal cluster evaluation metric that measures the average similarity between each cluster and its most similar counterpart. Similarity combines the dispersion (compactness) of each cluster with the separation distance between centroids.\nLower DBI values indicate superior clustering, signifying that clusters are both internally compact and well-separated from one another.',
    keyTakeaways: [
      'DBI = (1/k) ∑ max_{j≠i} ( (s_i + s_j) / d(c_i, c_j) )',
      'Lower value = better clustering model'
    ]
  },
  {
    id: 'u4-pa-15',
    qNo: 15,
    part: 'A',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Compute the Silhouette coefficient for point P1.',
    answer: 'Given:\n• Mean intra-cluster distance a(P1) = 2\n• Distances to points in the nearest neighbor cluster = 7 and 8\nCalculation:\n• Mean nearest-cluster distance b(P1) = (7 + 8) / 2 = 7.5\n• Formula: S(P1) = (b(P1) - a(P1)) / max(a(P1), b(P1))\n• S(P1) = (7.5 - 2) / max(2, 7.5) = 5.5 / 7.5 = 0.733\nConclusion: The Silhouette Coefficient for P1 is 0.733, indicating that point P1 is well-clustered.',
    formula: 'S(P1) = \\frac{b(P1) - a(P1)}{\\max(a(P1), b(P1))} = \\frac{7.5 - 2}{7.5} = 0.733',
    tableData: {
      headers: ['Parameter', 'Given Value', 'Description'],
      rows: [
        ['a(P1)', '2.0', 'Average distance to other points in same cluster'],
        ['b(P1)', '7.5', 'Average distance to points in closest neighboring cluster ((7+8)/2)'],
        ['Numerator', '5.5', 'b(P1) - a(P1) = 7.5 - 2 = 5.5'],
        ['Denominator', '7.5', 'max(a(P1), b(P1)) = 7.5'],
        ['Silhouette Score S(P1)', '0.733', 'Strong cluster cohesion and distinct separation']
      ]
    }
  }
];

export const unit4PartB: QuestionItem[] = [
  {
    id: 'u4-pb-01',
    qNo: 1,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply the clustering technique to group users of a social media platform based on their content interaction patterns for targeted advertising.',
    answer: `1. Introduction:
Social media platforms process high-dimensional telemetry streams of user engagement. Clustering groups users exhibiting analogous consumption behaviors into target cohorts for advertisers.

2. Feature Engineering from Raw Telemetry:
Extract numerical features reflecting engagement intensity and genre preferences:
1. Total Likes Count: Measures positive sentiment and engagement volume.
2. Shares / Reposts: Measures affinity for disseminating content to peer networks.
3. Comments Count: Measures high-effort active participation.
4. Dwell Time (seconds/post): High-fidelity indicator of genuine attention.
5. Daily Scroll Depth: Distinguishes heavy power users from casual browsers.
6. Click-Through Rate (CTR): Direct measure of ad responsiveness.
7. Login Frequency: Measures retention and platform stickiness.
8. Category Distribution Vector: Relative % of time spent on {Sports, Tech, Fashion, Gaming, News}.

3. Preprocessing & Scaling:
• Apply Z-score standardization so high-volume counts (e.g., 500 likes) do not dominate low-range features (e.g., 0.04 CTR).

4. Algorithm Selection & Trade-Off Analysis:
• Option A: K-Means Clustering
  - Best when business requirements mandate a fixed number of advertising tiers (e.g., K = 5 personas: Influencers, Lurkers, Active Creators, Casual Consumers, News Buffs).
  - High computational throughput on millions of active accounts.
• Option B: DBSCAN
  - Best when user behavior includes bot traffic, spam accounts, or rare outliers that must be filtered out rather than forced into legitimate user personas.

5. Business Recommendation:
Use K-Means with K determined by the Elbow method and Silhouette score. Deliver customized programmatic ad campaigns to each distinct cluster profile.`,
    tableData: {
      headers: ['Cohort Cluster', 'Distinctive Interaction Pattern', 'Targeted Advertising Campaign'],
      rows: [
        ['Cluster 1: Casual Observers', 'Low likes, low shares, moderate dwell time', 'Brand awareness video ads'],
        ['Cluster 2: Active Amplifiers', 'High shares, high comments, high login frequency', 'Viral campaigns & social referral products'],
        ['Cluster 3: Commercial Converters', 'High CTR on sponsored links, high tech category affinity', 'Direct-response e-commerce discounts']
      ]
    }
  },
  {
    id: 'u4-pb-02',
    qNo: 2,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Use Principal Component Analysis (PCA) to perform dimensionality reduction on a dataset.',
    answer: `1. Introduction:
Principal Component Analysis (PCA) is an unsupervised linear transformation technique that reduces high-dimensional datasets to a smaller set of orthogonal, uncorrelated variables called Principal Components, preserving maximal data variance.

2. Step-by-Step PCA Mathematical Workflow:
Step 1: Standardize the Feature Matrix
Compute z = (x - μ) / σ to ensure zero mean and unit variance across all features.
Step 2: Construct the Covariance Matrix
Compute the d × d covariance matrix Σ = (1/n) X^T X.
Step 3: Compute Eigenvectors and Eigenvalues
Solve the characteristic equation: det(Σ - λI) = 0.
- Eigenvalues λ_i represent the variance explained along each axis.
- Eigenvectors v_i represent the principal component directions.
Step 4: Rank and Select Top k Components
Sort eigenvalues in descending order: λ_1 ≥ λ_2 ≥ ... ≥ λ_d. Select top k components whose cumulative explained variance exceeds threshold (e.g., ≥ 90%).
Step 5: Project Original Data
Transform data into lower-dimensional subspace: Z = X · W_k.

3. Advantages of PCA:
• Drastically reduces memory and storage requirements.
• Eliminates multicollinearity between features.
• Accelerates convergence of subsequent machine learning models.
• Enables 2D and 3D visualization of high-dimensional datasets.

4. Limitations:
• Linear assumption: Cannot capture non-linear relationships (use Manifold learning instead).
• Loss of interpretability: Principal components are linear combinations of features and lose raw physical units.`,
    tableData: {
      headers: ['Component', 'Eigenvalue (λ)', 'Explained Variance (%)', 'Cumulative Variance (%)'],
      rows: [
        ['PC 1', '4.2', '52.5%', '52.5%'],
        ['PC 2', '2.1', '26.3%', '78.8%'],
        ['PC 3', '1.1', '13.7%', '92.5% (Retain top 3)'],
        ['PC 4', '0.6', '7.5%', '100.0%']
      ]
    }
  },
  {
    id: 'u4-pb-03',
    qNo: 3,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze the effectiveness of manifold learning techniques for dimensionality reduction and feature extraction in a dataset with a complex underlying structure.',
    answer: `1. Introduction:
When datasets possess non-linear geometric structures (such as a Swiss Roll or concentric rings), linear PCA fails because it measures Euclidean straight-line distance across empty space. Manifold learning algorithms preserve non-linear geodesic distances along the manifold surface.

2. Prominent Manifold Learning Paradigms:
• Isomap (Isometric Feature Mapping):
  - Constructs a k-nearest neighbor graph connecting adjacent points.
  - Computes all-pairs shortest path geodesic distances using Dijkstra\'s algorithm.
  - Applies Classical Multidimensional Scaling (MDS) to preserve geodesic distances in low-dimensional space.
• Locally Linear Embedding (LLE):
  - Characterizes local geometry by representing each point as a linear combination of its neighbors.
  - Finds low-dimensional coordinates that preserve these exact neighborhood reconstruction weights.
• t-SNE (t-Distributed Stochastic Neighbor Embedding):
  - Converts pairwise Euclidean distances into conditional probabilities representing similarities.
  - Minimizes Kullback-Leibler (KL) divergence between high- and low-dimensional probability distributions. Exceptional for exploratory 2D visualization.

3. Strengths:
• Unfolds complex non-linear structures that completely baffle linear PCA.
• Preserves fine-grained local neighborhood relationships.

4. Computational Limitations:
• High time and space complexity: Isomap requires O(n³) for all-pairs shortest paths.
• Does not provide an out-of-sample projection function for new incoming data points.`,
    tableData: {
      headers: ['Technique', 'Distance Metric', 'Geometry Handled', 'Primary Application'],
      rows: [
        ['PCA', 'Global Euclidean Distance', 'Strictly Linear Subspaces', 'Feature reduction for regression/clustering'],
        ['Isomap', 'Geodesic Shortest-Path Graph', 'Non-linear continuous manifolds', 'Biomedical signal unfolding'],
        ['t-SNE', 'Student-t Probability Similarity', 'Non-linear local clusters', '2D exploratory data visualization']
      ]
    }
  },
  {
    id: 'u4-pb-04',
    qNo: 4,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Examine the role of various clustering evaluation metrics in measuring clustering quality.',
    answer: `1. Purpose of Clustering Evaluation:
Because unsupervised clustering operates without ground-truth labels, internal validation indices are required to quantify cluster compactness (low within-cluster variance) and separation (high distance between distinct clusters).

2. Three Primary Clustering Evaluation Metrics:

1. Silhouette Coefficient:
• Measures the balance between intra-cluster cohesion a(i) and inter-cluster separation b(i).
• Formula: S(i) = (b(i) - a(i)) / max(a(i), b(i))
• Range: -1 to +1.
• Interpretation: Scores near +1 indicate dense, clearly segregated clusters; 0 denotes overlapping clusters; negative values indicate misclustered points.

2. Davies–Bouldin Index (DBI):
• Computes the average similarity between each cluster and its most similar rival, based on the ratio of within-cluster scatter to centroid separation.
• Formula: DBI = (1/k) ∑ max_{j≠i} [ (s_i + s_j) / d(c_i, c_j) ]
• Range: [0, ∞).
• Interpretation: LOWER values are superior. A smaller DBI proves clusters are tight and centroids are widely separated.

3. Calinski–Harabasz Index (CHI / Variance Ratio Criterion):
• Computes the ratio of between-cluster dispersion (separation) to within-cluster dispersion (compactness).
• Formula: CHI = [ Trace(B_k) / (k - 1) ] / [ Trace(W_k) / (n - k) ]
• Range: [0, ∞).
• Interpretation: HIGHER values indicate superior clustering quality.

3. Comparative Utility:
Relying on multiple metrics concurrently provides robust validation: a clustering configuration with peak Silhouette score, minimal DBI, and maximal CHI confirms the optimal number of clusters K.`,
    tableData: {
      headers: ['Metric', 'Evaluation Criteria', 'Optimal Direction', 'Computational Complexity'],
      rows: [
        ['Silhouette Score', 'Intra-cluster vs nearest inter-cluster distance', 'Higher is better (Max +1.0)', 'O(n²) — Pairwise distances'],
        ['Davies-Bouldin Index', 'Ratio of cluster scatter to centroid separation', 'Lower is better (Min 0.0)', 'O(n · k) — Fast computation'],
        ['Calinski-Harabasz Index', 'Ratio of between-dispersion to within-dispersion', 'Higher is better', 'O(n · d) — Extremely fast']
      ]
    }
  },
  {
    id: 'u4-pb-05',
    qNo: 5,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Assess the effectiveness of K-Means, DBSCAN, and Hierarchical Clustering in clustering datasets with varying densities and noise levels.',
    answer: `1. Introduction:
Clustering performance depends heavily on dataset topology, density variations, and contamination with noise/outliers.

2. Detailed Algorithmic Assessment:
• K-Means:
  - Working Principle: Partitions n samples into K clusters by iteratively updating centroids to minimize within-cluster sum of squares.
  - Varying Densities: Fails. Centroids get pulled into high-density regions, improperly splitting low-density clusters.
  - Noise & Outliers: Extremely sensitive. Outliers drag centroids away from true cluster cores.
  - Cluster Shapes: Assumes spherical/isotropic shapes.

• DBSCAN (Density-Based Spatial Clustering of Applications with Noise):
  - Working Principle: Expands clusters where point density exceeds MinPts within radius Eps; labels sparse isolated points as noise (-1).
  - Varying Densities: Struggles when clusters have drastically different densities, because a single global (Eps, MinPts) threshold cannot fit both tight and diffuse regions simultaneously.
  - Noise & Outliers: Exceptional. Automatically segregates noise without skewing cluster boundaries.
  - Cluster Shapes: Discovers arbitrary, elongated, crescent, and concave geometries.

• Hierarchical Clustering (Agglomerative):
  - Working Principle: Builds a bottom-up dendrogram by iteratively merging closest cluster pairs using linkage criteria (Single, Complete, Average, Ward).
  - Varying Densities: Moderate (Ward linkage favors compact clusters; Single linkage suffers from chaining).
  - Noise & Outliers: Single linkage is sensitive to noise bridges; Complete/Ward are more resilient.
  - Scalability: Poor on large datasets due to O(n³) time and O(n²) memory complexity.

3. Verdict:
• For noisy datasets with arbitrary shapes: DBSCAN is superior.
• For massive datasets with clean, spherical distributions: K-Means is optimal.
• For small datasets requiring taxonomic hierarchies: Hierarchical clustering is best.`,
    tableData: {
      headers: ['Algorithm', 'Noise Resilience', 'Arbitrary Shapes', 'Varying Densities', 'Computational Scaling'],
      rows: [
        ['K-Means', 'Poor (Outliers distort centroids)', 'Fails (Only spherical)', 'Poor', 'O(n · K · i) — Excellent'],
        ['DBSCAN', 'Excellent (Explicit noise class)', 'Superior (Concave & ring)', 'Moderate (Requires OPTICS)', 'O(n log n) with spatial index'],
        ['Hierarchical', 'Moderate (Depends on linkage)', 'Moderate (Single linkage chains)', 'Moderate', 'O(n²) to O(n³) — Poor on big data']
      ]
    }
  },
  {
    id: 'u4-pb-06',
    qNo: 6,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Critically evaluate the challenges of handling high-dimensional data in unsupervised learning and justify how dimensionality reduction techniques address these challenges.',
    answer: `1. The Curse of Dimensionality in Unsupervised Learning:
As the number of feature dimensions d grows, the volume of feature space increases exponentially, scattering data points across an immense, sparse space.

2. Critical Challenges:
1. Distance Metric Concentration:
   - In high dimensions, the ratio between the distance to the nearest neighbor and the distance to the farthest neighbor approaches 1:
     lim_{d→∞} (dist_max - dist_min) / dist_min = 0.
   - All pairwise Euclidean distances become uniformly large, rendering distance-based clustering (K-Means, KNN, DBSCAN) meaningless.
2. Exponential Sparsity:
   - Data points become isolated in corners of the hyperspace, making density estimation unfeasible.
3. Computational and Memory Bottlenecks:
   - Distance matrix calculations scale with O(n² · d), saturating memory bandwidth.
4. Noise & Redundancy:
   - Irrelevant noise attributes mask true clustering signals.

3. Justification of Dimensionality Reduction Solutions:
• Principal Component Analysis (PCA):
  - Filters out low-variance noise axes, concentrating dataset energy into the top principal components.
  - Restores meaningful Euclidean distance contrasts among data points.
• Manifold Learning (Isomap, t-SNE):
  - Unrolls complex non-linear relationships, projecting data onto its intrinsic lower-dimensional manifold.
  - Drastically accelerates downstream clustering runtimes and eliminates the curse of dimensionality.`,
    diagramAscii: `High-Dimensional Sparse Space ──(Curse of Dimensionality: Distances converge)──> Poor Clustering
               │
               ▼ Dimensionality Reduction (PCA / Manifold)
Compact Low-Dimensional Manifold ──(Clear Clusters Restored)──> Accurate, High-Speed Clustering`
  },
  {
    id: 'u4-pb-07',
    qNo: 7,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Given a dataset, apply normalization and standardization techniques and explain their effect on the performance of an unsupervised learning model.',
    answer: `1. The Necessity of Feature Scaling in Unsupervised Learning:
Unsupervised distance-based algorithms (such as K-Means, Hierarchical Clustering, and DBSCAN) calculate pairwise distances using metrics like Euclidean distance:
d(p, q) = √[ ∑ (p_i - q_i)² ]
If features are not scaled, an attribute measured in large numerical units (e.g., Annual Income: $50,000) will dominate the distance calculation over an attribute with a smaller scale (e.g., Age: 25 years), rendering the smaller feature effectively invisible to the algorithm.

2. Applied Scaling Techniques:
• Technique A: Min-Max Normalization
  Formula: x' = (x - min) / (max - min)
  - Transforms all variables into the strict range [0, 1].
  - Effect: Gives every feature equal maximum possible contribution (range = 1). Best when features have known bounded distributions and no extreme outliers.
• Technique B: Z-Score Standardization
  Formula: z = (x - μ) / σ
  - Rescales features to have zero mean and unit standard deviation.
  - Effect: Centers the data around origin. Preserves outlier information while ensuring features with wide spreads do not disproportionately distort centroid positioning.

3. Impact on Model Performance:
• Unscaled Data: Clustering groups data almost exclusively along the axis with the highest raw magnitude.
• Scaled Data: Clustering identifies meaningful multivariate relationships across all attributes simultaneously, improving Silhouette scores from near 0 to > 0.70.`,
    tableData: {
      headers: ['Raw Feature', 'Raw Range', 'Normalized [0, 1]', 'Standardized (Z-Score)'],
      rows: [
        ['Customer Age', '18 to 70 years', '0.00 to 1.00', '-1.50 to +1.80'],
        ['Annual Income', '$15,000 to $150,000', '0.00 to 1.00', '-1.40 to +2.10'],
        ['Web Visit Count', '1 to 50 visits', '0.00 to 1.00', '-1.20 to +2.50']
      ]
    }
  },
  {
    id: 'u4-pb-08',
    qNo: 8,
    part: 'B',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'A retail company wants to group its customers based on their purchase frequency, total spending, and preferred product categories. The dataset contains 10,000 records.\na) Demonstrate how to preprocess the dataset before applying a clustering algorithm.\nb) Select and justify a suitable clustering algorithm.',
    answer: `1. Case Background:
A retail enterprise with 10,000 customer records seeks customer segmentation across three attributes: Purchase Frequency (transactions/year), Total Spending ($), and Preferred Product Categories (Electronics, Apparel, Groceries, Home).

2. Part (a): Data Preprocessing Pipeline:
• Step 1: De-duplication & Missing Value Imputation
  - Remove duplicate customer IDs.
  - Impute missing spending values with column median to prevent outlier distortion.
• Step 2: Outlier Detection and Treatment
  - Identify extreme corporate buyers (e.g., $500,000 spending) using the Interquartile Range (IQR = Q3 - Q1). Cap outliers at 99th percentile to prevent centroid skewing.
• Step 3: Categorical Feature Encoding
  - Convert Preferred Category into numerical representation using One-Hot Encoding: [Is_Electronics, Is_Apparel, Is_Groceries, Is_Home].
• Step 4: Numerical Feature Standardization
  - Apply StandardScaler to Purchase Frequency and Total Spending so dollars (thousands) and frequencies (units) have equal weight in distance calculations.

3. Part (b): Clustering Algorithm Selection & Justification:
• Recommended Algorithm: K-Means Clustering.
• Justification:
  1. Computational Efficiency: With 10,000 records, K-Means runs in O(n · K · i) time, converging in fractions of a second, whereas Hierarchical Clustering requires O(n²) memory (~100 million pairwise distance pairs), which can cause memory exhaustion.
  2. Distinct Business Tiers: K-Means produces compact, interpretable cluster centroids that translate cleanly into marketing personas (e.g., High Frequency / High Spend = VIPs; Low Frequency / Low Spend = Churn Risk).
  3. Actionable Personas: Enables marketing teams to assign every incoming transaction to a specific customer cluster via nearest-centroid calculation.`,
    tableData: {
      headers: ['Generated Segment', 'Centroid Profile', 'Targeted Marketing Action'],
      rows: [
        ['Segment A: VIP High-Rollers', 'High Spending, High Frequency', 'Concierge service, premium loyalty rewards'],
        ['Segment B: Budget Essentials', 'Low Spending, High Frequency (Groceries)', 'Bulk-purchase grocery bundle promotions'],
        ['Segment C: Seasonal Splurgers', 'High Spending, Low Frequency (Electronics)', 'Product launch teasers and seasonal discounts']
      ]
    }
  }
];

export const unit4PartC: QuestionItem[] = [
  {
    id: 'u4-pc-01',
    qNo: 1,
    part: 'C',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Develop a clustering-based model to categorize students using attendance, participation, internal marks, and assignment submissions, and propose how the resulting groups can be used to improve academic performance.',
    answer: `1. Educational Problem Context:
Higher education institutions need proactive student support systems to detect at-risk students before final examinations, without relying on subjective instructor bias or manual auditing.

2. Student Feature Representation:
• Attendance Rate (%): Quantitative continuous [0–100].
• Forum & Classroom Participation Score: Normalized discrete score [0–10].
• Internal Assessment Marks (%): Quantitative continuous [0–100].
• Assignment Submission Timeliness & Quality (%): Quantitative continuous [0–100].

3. Methodology Pipeline:
• Preprocessing: Detect duplicate student IDs, impute missing assignment grades, and apply Z-score Standardization across all academic metrics.
• Optimal K Selection: Evaluate K ∈ [2, 6] using the Elbow method (Inertia) and Silhouette analysis. K = 4 emerges as the optimal configuration.
• Clustering Engine: K-Means clustering partitions the student population into 4 actionable performance cohorts.

4. Derived Student Clusters & Tailored Educational Interventions:
• Cluster 1: High Achievers (Exemplars)
  - Profile: High Attendance (95%), High Marks (88%), Timely Submissions (98%), Active Participation.
  - Intervention: Peer tutoring leadership opportunities, undergraduate research fellowships, advanced honors modules.
• Cluster 2: Diligent Strugglers
  - Profile: High Attendance (92%), Consistent Submissions (90%), but Low Internal Marks (45%).
  - Diagnosis: Attends classes and completes homework but struggles with conceptual comprehension or exam anxiety.
  - Intervention: Remedial tutoring, concept revision workshops, tailored office-hour mentoring.
• Cluster 3: Disengaged At-Risk Students
  - Profile: Low Attendance (52%), Low Submissions (40%), Low Internal Marks (38%).
  - Diagnosis: Severe academic risk of course failure and institutional dropout.
  - Intervention: Immediate academic counseling, parental alerts, attendance monitoring, and structured catch-up study plans.
• Cluster 4: Capable Procrastinators
  - Profile: Moderate Attendance (72%), High Marks (82%), but Late/Missing Submissions (55%).
  - Diagnosis: High innate aptitude but poor time management or workload balancing.
  - Intervention: Time-management coaching, milestone-based assignment check-ins, and study group accountability.

5. Educational Impact:
This proactive clustering approach shifts academic advising from reactive post-exam damage control to early-semester supportive interventions.`,
    tableData: {
      headers: ['Cluster Name', 'Attendance', 'Internal Marks', 'Submissions', 'Tailored Academic Intervention'],
      rows: [
        ['Cluster 1: Exemplars', '95%', '88%', '98%', 'Advanced research projects, honors tracks, peer mentoring'],
        ['Cluster 2: Diligent Strugglers', '92%', '45%', '90%', 'Remedial coaching, concept clarification, test-taking strategies'],
        ['Cluster 3: Disengaged At-Risk', '52%', '38%', '40%', 'Urgent counselor intervention, attendance tracking, study plans'],
        ['Cluster 4: Capable Procrastinators', '72%', '82%', '55%', 'Time-management training, structured assignment deadlines']
      ]
    }
  },
  {
    id: 'u4-pc-02',
    qNo: 2,
    part: 'C',
    unitNumber: 4,
    courseOutcome: 'CO4',
    bloomsLevel: 'K6',
    bloomsLabel: 'Create',
    question: 'Develop a complete clustering-based solution for a real-world unsupervised learning problem. Explain the preprocessing steps, clustering method, evaluation approach, and techniques for overcoming potential challenges.',
    answer: `1. Problem Definition:
Design an enterprise-grade customer segmentation engine for an omnichannel retailer to discover behavioral cohorts across purchase frequency, monetary spending, channel preference, and returns rate.

2. End-to-End Architectural Blueprint:
Raw Transaction Logs ──> Aggregation & Feature Engineering ──> Preprocessing & Robust Scaling ──> PCA Dimensionality Reduction ──> Multi-Algorithm Clustering (K-Means / DBSCAN) ──> Metric Benchmarking (Silhouette / DBI / CHI) ──> Actionable Cohort Activation

3. Technical Implementation Stages:
• Stage 1: Feature Engineering
  - Recency (days since last purchase)
  - Frequency (orders per quarter)
  - Monetary Value (gross spend $)
  - Product Diversity (count of distinct categories purchased)
  - Return Rate (% of orders returned)
• Stage 2: Preprocessing & Scaling
  - Financial data exhibits right-skewed heavy tails; apply log-transformation: x' = log(1 + x).
  - Apply StandardScaler to ensure zero mean and unit variance.
• Stage 3: Dimensionality Reduction
  - Apply PCA to condense 12 engineered interaction features down to 3 principal components retaining 88% of total variance, mitigating feature correlation.
• Stage 4: Clustering Execution
  - Implement K-Means as the baseline model for business tiers.
  - Run DBSCAN in parallel with spatial indexing to flag anomalous fraudulent accounts and bot scrapers as noise.
• Stage 5: Evaluation & Validation
  - Sweep K from 2 to 10.
  - Calculate Silhouette Coefficient, Davies-Bouldin Index (DBI), and Calinski-Harabasz Index (CHI).
  - Select K that maximizes Silhouette and minimizes DBI simultaneously.
• Stage 6: Challenge Mitigation
  - Challenge 1: Outliers pulling K-Means centroids → Filter out DBSCAN noise points prior to K-Means fit.
  - Challenge 2: Cluster drift over time → Schedule monthly re-clustering jobs to detect shifting customer spending habits.`,
    tableData: {
      headers: ['Phase', 'Engineering Technique', 'Challenge Addressed'],
      rows: [
        ['Preprocessing', 'Log-transform + StandardScaler', 'Mitigates extreme spending outliers and variance disparity'],
        ['Reduction', 'Principal Component Analysis (PCA)', 'Overcomes multicollinearity and Curse of Dimensionality'],
        ['Clustering', 'Hybrid DBSCAN + K-Means', 'Isolates fraudulent outliers while forming actionable cohorts'],
        ['Validation', 'Silhouette Score + DBI + CHI', 'Objectively determines optimal cluster count K']
      ]
    }
  }
];
