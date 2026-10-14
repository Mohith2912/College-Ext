/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DataPoint {
  id: number;
  x: number;
  y: number;
  cluster: number; // 0, 1, 2, ... or -1 for noise
  type?: 'core' | 'border' | 'noise';
}

export interface Centroid {
  id: number;
  x: number;
  y: number;
  color: string;
}

export interface KMeansStep {
  iteration: number;
  centroids: Centroid[];
  points: DataPoint[];
  inertia: number;
  hasConverged: boolean;
  description: string;
}

export const CLUSTER_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// Seeded dataset with natural groupings + outliers
export function generateSampleDataset(preset: 'three_blobs' | 'noisy_moons' | 'retail_customers'): DataPoint[] {
  const points: DataPoint[] = [];
  let id = 1;

  if (preset === 'three_blobs') {
    // Cluster 1: High Spending, High Frequency (VIPs)
    for (let i = 0; i < 15; i++) {
      points.push({
        id: id++,
        x: 70 + (Math.random() * 20 - 10),
        y: 80 + (Math.random() * 20 - 10),
        cluster: -1
      });
    }
    // Cluster 2: Budget shoppers (Low Spending, High Frequency)
    for (let i = 0; i < 15; i++) {
      points.push({
        id: id++,
        x: 30 + (Math.random() * 20 - 10),
        y: 80 + (Math.random() * 20 - 10),
        cluster: -1
      });
    }
    // Cluster 3: Occasional shoppers (Low Spending, Low Frequency)
    for (let i = 0; i < 15; i++) {
      points.push({
        id: id++,
        x: 35 + (Math.random() * 20 - 10),
        y: 25 + (Math.random() * 20 - 10),
        cluster: -1
      });
    }
    // Noise outliers
    points.push({ id: id++, x: 92, y: 15, cluster: -1 });
    points.push({ id: id++, x: 12, y: 55, cluster: -1 });
  } else if (preset === 'retail_customers') {
    // 10,000 records simulation downsampled to 40 representative customer nodes
    for (let i = 0; i < 20; i++) {
      points.push({
        id: id++,
        x: 20 + Math.random() * 30,
        y: 40 + Math.random() * 30,
        cluster: -1
      });
    }
    for (let i = 0; i < 20; i++) {
      points.push({
        id: id++,
        x: 65 + Math.random() * 25,
        y: 60 + Math.random() * 30,
        cluster: -1
      });
    }
  }

  return points;
}

export function runKMeansStep(
  points: DataPoint[],
  currentCentroids: Centroid[],
  iteration: number
): KMeansStep {
  // 1. Assign points to nearest centroid
  const updatedPoints = points.map(p => {
    let minDistance = Infinity;
    let assignedCluster = 0;

    currentCentroids.forEach(c => {
      const dist = Math.hypot(p.x - c.x, p.y - c.y);
      if (dist < minDistance) {
        minDistance = dist;
        assignedCluster = c.id;
      }
    });

    return { ...p, cluster: assignedCluster };
  });

  // 2. Compute new centroid positions
  let totalInertia = 0;
  let maxCentroidShift = 0;

  const newCentroids = currentCentroids.map(c => {
    const clusterPoints = updatedPoints.filter(p => p.cluster === c.id);
    if (clusterPoints.length === 0) return c;

    const newX = clusterPoints.reduce((acc, p) => acc + p.x, 0) / clusterPoints.length;
    const newY = clusterPoints.reduce((acc, p) => acc + p.y, 0) / clusterPoints.length;

    const shift = Math.hypot(newX - c.x, newY - c.y);
    maxCentroidShift = Math.max(maxCentroidShift, shift);

    // Add to inertia (sum of squared Euclidean distances)
    clusterPoints.forEach(p => {
      totalInertia += Math.pow(p.x - newX, 2) + Math.pow(p.y - newY, 2);
    });

    return { ...c, x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 };
  });

  const hasConverged = maxCentroidShift < 0.5;

  return {
    iteration: iteration + 1,
    centroids: newCentroids,
    points: updatedPoints,
    inertia: Math.round(totalInertia),
    hasConverged,
    description: hasConverged
      ? `K-Means Converged at Iteration ${iteration + 1}! Centroid shift < 0.5. Inertia = ${Math.round(totalInertia)}.`
      : `Iteration ${iteration + 1}: Assigned ${points.length} points to nearest centroids. Shifted centers. Inertia = ${Math.round(totalInertia)}.`
  };
}

// DBSCAN Algorithm
export function runDBSCAN(
  points: DataPoint[],
  eps: number,
  minPts: number
): DataPoint[] {
  const result: DataPoint[] = points.map(p => ({ ...p, cluster: -1, type: undefined }));
  let clusterId = 0;

  function regionQuery(p: DataPoint): number[] {
    const neighbors: number[] = [];
    result.forEach((other, idx) => {
      if (Math.hypot(p.x - other.x, p.y - other.y) <= eps) {
        neighbors.push(idx);
      }
    });
    return neighbors;
  }

  const visited = new Set<number>();

  for (let i = 0; i < result.length; i++) {
    if (visited.has(i)) continue;
    visited.add(i);

    const neighbors = regionQuery(result[i]);

    if (neighbors.length < minPts) {
      result[i].type = 'noise';
      result[i].cluster = -1;
    } else {
      result[i].type = 'core';
      result[i].cluster = clusterId;

      const queue = [...neighbors];
      for (let j = 0; j < queue.length; j++) {
        const neighborIdx = queue[j];
        if (!visited.has(neighborIdx)) {
          visited.add(neighborIdx);
          const nextNeighbors = regionQuery(result[neighborIdx]);
          if (nextNeighbors.length >= minPts) {
            result[neighborIdx].type = 'core';
            queue.push(...nextNeighbors);
          } else {
            result[neighborIdx].type = 'border';
          }
        }
        if (result[neighborIdx].cluster === -1) {
          result[neighborIdx].cluster = clusterId;
          if (!result[neighborIdx].type) {
            result[neighborIdx].type = 'border';
          }
        }
      }
      clusterId++;
    }
  }

  return result;
}

// Silhouette Score Calculator
export function calculateSilhouetteCoefficient(a: number, b: number): number {
  if (Math.max(a, b) === 0) return 0;
  return Math.round(((b - a) / Math.max(a, b)) * 1000) / 1000;
}
