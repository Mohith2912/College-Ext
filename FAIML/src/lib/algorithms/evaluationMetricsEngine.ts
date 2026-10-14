/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConfusionMatrixValues {
  tp: number;
  tn: number;
  fp: number;
  fn: number;
}

export interface MetricSummary {
  accuracy: number;
  precision: number;
  recall: number;
  specificity: number;
  f1Score: number;
  total: number;
  errorRate: number;
}

export function calculateClassificationMetrics(cm: ConfusionMatrixValues): MetricSummary {
  const total = cm.tp + cm.tn + cm.fp + cm.fn;
  if (total === 0) {
    return {
      accuracy: 0,
      precision: 0,
      recall: 0,
      specificity: 0,
      f1Score: 0,
      total: 0,
      errorRate: 0
    };
  }

  const accuracy = (cm.tp + cm.tn) / total;
  const precision = cm.tp + cm.fp > 0 ? cm.tp / (cm.tp + cm.fp) : 0;
  const recall = cm.tp + cm.fn > 0 ? cm.tp / (cm.tp + cm.fn) : 0;
  const specificity = cm.tn + cm.fp > 0 ? cm.tn / (cm.tn + cm.fp) : 0;
  const f1Score = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  const errorRate = (cm.fp + cm.fn) / total;

  return {
    accuracy: Math.round(accuracy * 1000) / 1000,
    precision: Math.round(precision * 1000) / 1000,
    recall: Math.round(recall * 1000) / 1000,
    specificity: Math.round(specificity * 1000) / 1000,
    f1Score: Math.round(f1Score * 1000) / 1000,
    total,
    errorRate: Math.round(errorRate * 1000) / 1000
  };
}

export interface FoldResult {
  foldNumber: number;
  trainAccuracy: number;
  validationAccuracy: number;
  f1Score: number;
  isTestFold: boolean;
}

export function simulateKFoldCrossValidation(k: number, isStratified: boolean): {
  folds: FoldResult[];
  meanValAccuracy: number;
  stdDev: number;
} {
  const folds: FoldResult[] = [];
  const baseScore = isStratified ? 0.86 : 0.84;
  const noiseSpread = isStratified ? 0.015 : 0.035;

  let sumVal = 0;

  for (let i = 1; i <= k; i++) {
    // Generate slight deterministic variance per fold
    const foldVariance = Math.sin(i * 3.7) * noiseSpread;
    const valAcc = Math.round((baseScore + foldVariance) * 1000) / 1000;
    const trainAcc = Math.round((0.92 + Math.cos(i * 2.1) * 0.01) * 1000) / 1000;
    const f1 = Math.round((valAcc - 0.02) * 1000) / 1000;

    folds.push({
      foldNumber: i,
      trainAccuracy: trainAcc,
      validationAccuracy: valAcc,
      f1Score: f1,
      isTestFold: false
    });
    sumVal += valAcc;
  }

  const mean = Math.round((sumVal / k) * 1000) / 1000;

  let varianceSum = 0;
  folds.forEach(f => {
    varianceSum += Math.pow(f.validationAccuracy - mean, 2);
  });
  const stdDev = Math.round(Math.sqrt(varianceSum / k) * 1000) / 1000;

  return { folds, meanValAccuracy: mean, stdDev };
}
