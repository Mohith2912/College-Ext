/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Network, Activity, RotateCcw, Info, Sliders } from 'lucide-react';

export const BayesianNetworkLab: React.FC = () => {
  // Evidence toggles: true, false, or null (unobserved)
  const [evidenceSmoker, setEvidenceSmoker] = useState<boolean | null>(null);
  const [evidenceXRay, setEvidenceXRay] = useState<boolean | null>(null);
  const [evidenceDyspnea, setEvidenceDyspnea] = useState<boolean | null>(null);
  const [evidenceCough, setEvidenceCough] = useState<boolean | null>(null);

  // Prior probabilities & CPTs
  // P(Smoker) = 0.30
  // P(Cancer | Smoker) = 0.10, P(Cancer | ~Smoker) = 0.01
  // P(Bronchitis | Smoker) = 0.60, P(Bronchitis | ~Smoker) = 0.30
  // P(XRay | Cancer) = 0.90, P(XRay | ~Cancer) = 0.05
  // P(Dyspnea | Cancer, Bronchitis) = 0.90, P(Dyspnea | Cancer, ~Bronch) = 0.70, etc.

  // Compute exact or normalized posterior beliefs given evidence
  const pSmokerPrior = 0.3;

  // Let's compute posteriors across joint states
  const computeBeliefs = () => {
    let totalWeight = 0;
    let weightSmoker = 0;
    let weightCancer = 0;
    let weightBronchitis = 0;
    let weightDyspnea = 0;
    let weightXRay = 0;

    // Iterate all 16 states of [S, C, B, D, X]
    const bools = [true, false];
    for (const s of bools) {
      for (const c of bools) {
        for (const b of bools) {
          for (const d of bools) {
            for (const x of bools) {
              // Check if matches evidence
              if (evidenceSmoker !== null && evidenceSmoker !== s) continue;
              if (evidenceXRay !== null && evidenceXRay !== x) continue;
              if (evidenceDyspnea !== null && evidenceDyspnea !== d) continue;
              if (evidenceCough !== null && evidenceCough !== b) continue;

              // Calculate joint probability: P(S)*P(C|S)*P(B|S)*P(X|C)*P(D|C,B)
              const pS = s ? pSmokerPrior : 1 - pSmokerPrior;
              const pC = s ? (c ? 0.10 : 0.90) : (c ? 0.01 : 0.99);
              const pB = s ? (b ? 0.60 : 0.40) : (b ? 0.30 : 0.70);
              const pX = c ? (x ? 0.90 : 0.10) : (x ? 0.05 : 0.95);

              // Dyspnea CPT
              let pD = 0.1;
              if (c && b) pD = 0.90;
              else if (c && !b) pD = 0.70;
              else if (!c && b) pD = 0.60;
              else pD = 0.10;
              const pDFactor = d ? pD : 1 - pD;

              const jointProb = pS * pC * pB * pX * pDFactor;

              totalWeight += jointProb;
              if (s) weightSmoker += jointProb;
              if (c) weightCancer += jointProb;
              if (b) weightBronchitis += jointProb;
              if (d) weightDyspnea += jointProb;
              if (x) weightXRay += jointProb;
            }
          }
        }
      }
    }

    if (totalWeight === 0) {
      return { smoker: 30, cancer: 4, bronchitis: 39, dyspnea: 34, xray: 8 };
    }

    return {
      smoker: Math.round((weightSmoker / totalWeight) * 100),
      cancer: Math.round((weightCancer / totalWeight) * 100),
      bronchitis: Math.round((weightBronchitis / totalWeight) * 100),
      dyspnea: Math.round((weightDyspnea / totalWeight) * 100),
      xray: Math.round((weightXRay / totalWeight) * 100)
    };
  };

  const beliefs = computeBeliefs();

  const resetEvidence = () => {
    setEvidenceSmoker(null);
    setEvidenceXRay(null);
    setEvidenceDyspnea(null);
    setEvidenceCough(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-purple-50/60 via-indigo-50/40 to-blue-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <Network className="w-4 h-4 text-purple-600" />
            <span>Unit 2 Probabilistic Reasoning under Uncertainty</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Bayesian Network & CPT Inference Engine (Asia Medical Model)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Toggle patient symptoms and observe posterior disease probabilities updating via Bayes\' theorem: P(A|B) = P(B|A)P(A)/P(B).
          </p>
        </div>

        <button
          onClick={resetEvidence}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Evidence</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Interactive Graph DAG (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="relative w-full h-[380px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
            <svg className="w-full h-full" viewBox="0 0 500 320">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="7"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#818cf8" />
                </marker>
              </defs>

              {/* Edges */}
              <line x1="250" y1="50" x2="150" y2="130" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="250" y1="50" x2="350" y2="130" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="150" y1="150" x2="100" y2="240" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="150" y1="150" x2="250" y2="240" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="350" y1="150" x2="250" y2="240" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

              {/* Node 1: Smoker */}
              <g transform="translate(250, 40)" className="cursor-pointer">
                <rect x="-65" y="-22" width="130" height="44" rx="10" fill="#ffffff" stroke={evidenceSmoker !== null ? '#6366f1' : '#cbd5e1'} strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />
                <text x="0" y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Smoking History</text>
                <text x="0" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4f46e5 font-mono">P(S) = {beliefs.smoker}%</text>
              </g>

              {/* Node 2: Lung Cancer */}
              <g transform="translate(150, 140)" className="cursor-pointer">
                <rect x="-60" y="-22" width="120" height="44" rx="10" fill="#ffffff" stroke={beliefs.cancer > 30 ? '#ef4444' : '#cbd5e1'} strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />
                <text x="0" y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Lung Cancer</text>
                <text x="0" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={beliefs.cancer > 30 ? '#dc2626' : '#64748b'}>P(C) = {beliefs.cancer}%</text>
              </g>

              {/* Node 3: Bronchitis */}
              <g transform="translate(350, 140)" className="cursor-pointer">
                <rect x="-60" y="-22" width="120" height="44" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />
                <text x="0" y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Bronchitis</text>
                <text x="0" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0284c7 font-mono">P(B) = {beliefs.bronchitis}%</text>
              </g>

              {/* Node 4: X-Ray */}
              <g transform="translate(100, 250)" className="cursor-pointer">
                <rect x="-55" y="-22" width="110" height="44" rx="10" fill="#ffffff" stroke={evidenceXRay !== null ? '#6366f1' : '#cbd5e1'} strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />
                <text x="0" y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Positive X-Ray</text>
                <text x="0" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4f46e5 font-mono">P(X) = {beliefs.xray}%</text>
              </g>

              {/* Node 5: Dyspnea */}
              <g transform="translate(250, 250)" className="cursor-pointer">
                <rect x="-65" y="-22" width="130" height="44" rx="10" fill="#ffffff" stroke={evidenceDyspnea !== null ? '#6366f1' : '#cbd5e1'} strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />
                <text x="0" y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Dyspnea (Breath)</text>
                <text x="0" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4f46e5 font-mono">P(D) = {beliefs.dyspnea}%</text>
              </g>
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Factorization: P(S, C, B, X, D) = P(S) · P(C|S) · P(B|S) · P(X|C) · P(D|C, B)</span>
            <span className="font-semibold text-indigo-600">DAG Semantics Active</span>
          </div>
        </div>

        {/* Right: Clinical Evidence Toggles & CPTs (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Set Observed Clinical Evidence
            </h3>

            {/* Toggle Toggles */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Chest X-Ray Result:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEvidenceXRay(evidenceXRay === true ? null : true)}
                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                      evidenceXRay === true ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Positive (+)
                  </button>
                  <button
                    onClick={() => setEvidenceXRay(evidenceXRay === false ? null : false)}
                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                      evidenceXRay === false ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Normal (-)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Severe Dyspnea (Shortness of Breath):</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEvidenceDyspnea(evidenceDyspnea === true ? null : true)}
                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                      evidenceDyspnea === true ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => setEvidenceDyspnea(evidenceDyspnea === false ? null : false)}
                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                      evidenceDyspnea === false ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Patient Smoker:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEvidenceSmoker(evidenceSmoker === true ? null : true)}
                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                      evidenceSmoker === true ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setEvidenceSmoker(evidenceSmoker === false ? null : false)}
                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                      evidenceSmoker === false ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnostic Result Callout */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-bold text-slate-900 mb-2">
                Differential Diagnostic Diagnosis:
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-red-700">Posterior P(Lung Cancer | Evidence):</span>
                    <span className="font-mono text-red-600">{beliefs.cancer}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${beliefs.cancer}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-blue-700">Posterior P(Bronchitis | Evidence):</span>
                    <span className="font-mono text-blue-600">{beliefs.bronchitis}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${beliefs.bronchitis}%` }} />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                Notice: When <strong>X-Ray = Positive</strong> is introduced as evidence, the posterior probability of Lung Cancer jumps significantly from the baseline prior of 4% to <strong>{beliefs.cancer}%</strong>, illustrating abductive diagnostic inference.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            CPT: Stored conditional tables at each node eliminate exponential state representations.
          </div>
        </div>
      </div>
    </div>
  );
};
