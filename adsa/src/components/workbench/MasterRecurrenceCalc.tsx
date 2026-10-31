import React, { useState } from 'react';
import { X, Calculator, HelpCircle } from 'lucide-react';

interface MasterRecurrenceCalcProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasterRecurrenceCalc: React.FC<MasterRecurrenceCalcProps> = ({
  isOpen,
  onClose,
}) => {
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(2);
  const [k, setK] = useState<number>(1); // f(n) = Theta(n^k)

  if (!isOpen) return null;

  // Compute log_b(a)
  const logBOfA = Math.log(a) / Math.log(b);
  const roundedLog = Math.round(logBOfA * 1000) / 1000;

  // Determine Master Theorem case
  let theoremCase = '';
  let resultComplexity = '';
  let explanation = '';

  const epsilon = 0.001;
  if (roundedLog > k + epsilon) {
    theoremCase = 'Case 1: Heavy Leaves (log_b a > k)';
    resultComplexity = `Θ(n^${roundedLog.toFixed(2)}) [or Θ(n^(log_${b} ${a}))]`;
    explanation = `The work done at the leaf level dominates the divide-and-conquer tree because log_b(a) = ${roundedLog.toFixed(3)} is strictly greater than k = ${k}.`;
  } else if (Math.abs(roundedLog - k) <= epsilon) {
    theoremCase = 'Case 2: Balanced Tree (log_b a == k)';
    resultComplexity = k === 0 ? 'Θ(log n)' : k === 1 ? 'Θ(n log n)' : `Θ(n^${k} log n)`;
    explanation = `The work done at every level of the recursion tree is roughly equal: log_b(a) = ${roundedLog.toFixed(3)} equals polynomial power k = ${k}. Multiplying by tree height log_b(n) yields ${resultComplexity}.`;
  } else {
    theoremCase = 'Case 3: Heavy Root (log_b a < k)';
    resultComplexity = k === 0 ? 'Θ(1)' : k === 1 ? 'Θ(n)' : `Θ(n^${k})`;
    explanation = `The work done at the root node f(n) dominates because k = ${k} is strictly greater than log_b(a) = ${roundedLog.toFixed(3)}.`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Divide & Conquer Recurrence Solver
              </h2>
              <div className="text-xs text-slate-500 font-mono">
                T(n) = a·T(n/b) + f(n) (Syllabus Part-A Q7)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Syllabus Equation Definition */}
          <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-lg text-xs leading-relaxed text-sky-950">
            <div className="font-bold text-sky-900 mb-1 text-sm">
              General Divide and Conquer Recurrence:
            </div>
            <div className="font-mono text-base text-sky-900 font-bold mb-2">
              T(n) = a · T(n / b) + f(n)
            </div>
            <ul className="space-y-1 text-sky-800 list-disc list-inside">
              <li>
                <strong className="text-sky-950 font-mono">a</strong>: Number of recursive subproblems generated (a ≥ 1).
              </li>
              <li>
                <strong className="text-sky-950 font-mono">n / b</strong>: Size of each subproblem after division (b &gt; 1).
              </li>
              <li>
                <strong className="text-sky-950 font-mono">f(n)</strong>: Cost of dividing the problem and combining the subproblem solutions (approximated as Θ(n^k)).
              </li>
            </ul>
          </div>

          {/* Interactive Parameters Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Subproblems (a)</span>
                <span className="font-mono text-sky-600 font-bold">{a}</span>
              </label>
              <input
                type="range"
                min={1}
                max={8}
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="text-[11px] text-slate-400">e.g., 2 for MergeSort</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Divisor (b)</span>
                <span className="font-mono text-sky-600 font-bold">{b}</span>
              </label>
              <input
                type="range"
                min={2}
                max={8}
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="text-[11px] text-slate-400">e.g., 2 for halves</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Combine Power k</span>
                <span className="font-mono text-sky-600 font-bold">{k}</span>
              </label>
              <input
                type="range"
                min={0}
                max={3}
                value={k}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="text-[11px] text-slate-400">f(n) = Θ(n^{k})</div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 font-medium self-center mr-1">Presets:</span>
            <button
              onClick={() => {
                setA(1);
                setB(2);
                setK(0);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-800 transition-colors"
            >
              Binary Search (T(n)=T(n/2)+1)
            </button>
            <button
              onClick={() => {
                setA(2);
                setB(2);
                setK(1);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-800 transition-colors"
            >
              Merge Sort (T(n)=2T(n/2)+n)
            </button>
            <button
              onClick={() => {
                setA(7);
                setB(2);
                setK(2);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-800 transition-colors"
            >
              Strassen Mult (T(n)=7T(n/2)+n²)
            </button>
          </div>

          {/* Mathematical Computation Result Card */}
          <div className="p-4 bg-slate-900 text-white rounded-lg space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs text-sky-400 uppercase font-sans font-bold">
                Master Theorem Evaluation
              </span>
              <span className="text-xs text-slate-400 font-sans">{theoremCase}</span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="text-[11px] text-slate-400 font-sans">Critical Exponent log_b(a):</div>
                <div className="text-lg font-bold text-sky-300">
                  log_{b}({a}) = {roundedLog.toFixed(3)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-sans">Final Asymptotic Complexity:</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {resultComplexity}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-slate-800">
              {explanation}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
