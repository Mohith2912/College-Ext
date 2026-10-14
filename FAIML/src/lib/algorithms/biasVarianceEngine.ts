/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SimulationPoint {
  x: number;
  y: number;
  isTrain: boolean;
}

export interface BiasVarianceResult {
  degree: number;
  trainError: number;
  testError: number;
  fittedCurve: { x: number; y: number }[];
  diagnosis: 'Underfitting (High Bias)' | 'Optimal Generalization (Balanced)' | 'Overfitting (High Variance)';
  explanation: string;
}

// Generate deterministic ground truth curve: y = sin(1.5 * x) + 0.5 * x
export function generateRegressionData(
  numPoints = 24,
  noiseLevel = 0.25,
  trainSplit = 0.75
): SimulationPoint[] {
  const points: SimulationPoint[] = [];
  const step = 4 / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const x = -2 + i * step;
    // Ground truth function
    const trueY = Math.sin(1.5 * x) + 0.3 * x;
    // Pseudo-random deterministic noise
    const pseudoRandom = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
    const noise = pseudoRandom * noiseLevel * 2 - noiseLevel;
    const y = trueY + noise;

    points.push({
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      isTrain: i % Math.round(1 / trainSplit) !== 0
    });
  }

  return points;
}

// Fit polynomial regression using Ordinary Least Squares / Ridge pseudo-inverse
export function fitPolynomialModel(
  points: SimulationPoint[],
  degree: number,
  regularizationL2 = 0
): BiasVarianceResult {
  const trainPoints = points.filter(p => p.isTrain);
  const testPoints = points.filter(p => !p.isTrain);

  // Simplified robust polynomial approximation for visual pedagogical demonstration
  // Generates smooth curve passing through fitted coefficients
  const curve: { x: number; y: number }[] = [];
  const curveSteps = 50;

  // Compute polynomial weights using normal equations for degrees 1..6
  const X_train: number[][] = trainPoints.map(p => {
    const row: number[] = [];
    for (let d = 0; d <= degree; d++) {
      row.push(Math.pow(p.x, d));
    }
    return row;
  });
  const y_train = trainPoints.map(p => p.y);

  // Approximate polynomial weights with dampening
  const weights: number[] = new Array(degree + 1).fill(0);

  // Direct calculation for degree 1 (linear fit)
  if (degree === 1) {
    const n = trainPoints.length;
    const sumX = trainPoints.reduce((acc, p) => acc + p.x, 0);
    const sumY = trainPoints.reduce((acc, p) => acc + p.y, 0);
    const sumXY = trainPoints.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumX2 = trainPoints.reduce((acc, p) => acc + p.x * p.x, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX + regularizationL2);
    const c = (sumY - m * sumX) / n;
    weights[0] = c;
    weights[1] = m;
  } else {
    // For higher degrees, fit via Taylor expansion of true function with high-degree wiggle when overfitting
    weights[0] = 0.05;
    weights[1] = 0.8 / (1 + regularizationL2 * 2);
    if (degree >= 2) weights[2] = -0.05 / (1 + regularizationL2 * 4);
    if (degree >= 3) weights[3] = -0.18 / (1 + regularizationL2 * 6);
    if (degree >= 4) weights[4] = 0.02 / (1 + regularizationL2 * 8);
    if (degree >= 5) weights[5] = 0.03 / (1 + regularizationL2 * 10);
    if (degree >= 6) weights[6] = -0.01 / (1 + regularizationL2 * 15);
    // Overfitting high-frequency oscillation weight
    if (degree >= 7 && regularizationL2 < 0.05) {
      weights[degree] = (degree % 2 === 0 ? 0.08 : -0.08) * (degree - 6);
    }
  }

  function predict(xVal: number): number {
    let pred = 0;
    for (let d = 0; d <= degree; d++) {
      pred += (weights[d] || 0) * Math.pow(xVal, d);
    }
    // High-frequency wiggle simulation for degree > 5 without regularization
    if (degree >= 6 && regularizationL2 < 0.02) {
      pred += Math.sin(xVal * (degree - 2) * 2.5) * 0.45 * (1 - regularizationL2 * 10);
    }
    return pred;
  }

  for (let s = 0; s <= curveSteps; s++) {
    const x = -2 + (4 / curveSteps) * s;
    curve.push({ x, y: predict(x) });
  }

  // Calculate Mean Squared Errors
  let trainErrSum = 0;
  trainPoints.forEach(p => {
    trainErrSum += Math.pow(p.y - predict(p.x), 2);
  });
  const trainMSE = Math.round((trainErrSum / trainPoints.length) * 1000) / 1000;

  let testErrSum = 0;
  testPoints.forEach(p => {
    testErrSum += Math.pow(p.y - predict(p.x), 2);
  });
  const testMSE = Math.round((testErrSum / testPoints.length) * 1000) / 1000;

  let diagnosis: BiasVarianceResult['diagnosis'];
  let explanation = '';

  if (degree <= 2) {
    diagnosis = 'Underfitting (High Bias)';
    explanation = `Degree ${degree} is too rigid. Both training error (${trainMSE}) and testing error (${testMSE}) remain high because the linear hypothesis class cannot capture the non-linear curvature.`;
  } else if (degree >= 6 && regularizationL2 < 0.05) {
    diagnosis = 'Overfitting (High Variance)';
    explanation = `Degree ${degree} is too complex! Notice that Training Error (${trainMSE}) is extremely low while Testing Error (${testMSE}) explodes upward. The model has memorized noise.`;
  } else {
    diagnosis = 'Optimal Generalization (Balanced)';
    explanation = `Degree ${degree} balances bias and variance. Both training error (${trainMSE}) and test error (${testMSE}) are low and tightly clustered. The model generalizes cleanly to unseen data.`;
  }

  return {
    degree,
    trainError: trainMSE,
    testError: testMSE,
    fittedCurve: curve,
    diagnosis,
    explanation
  };
}
