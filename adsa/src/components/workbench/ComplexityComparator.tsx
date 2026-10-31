import React, { useState } from 'react';
import { X, SlidersHorizontal, Info } from 'lucide-react';

interface ComplexityComparatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplexityComparator: React.FC<ComplexityComparatorProps> = ({
  isOpen,
  onClose,
}) => {
  const [n, setN] = useState<number>(16);

  if (!isOpen) return null;

  // Compute values for given n
  const calculateOperations = (inputN: number) => {
    const o1 = 1;
    const oLogn = Math.log2(inputN);
    const oN = inputN;
    const oNlogn = inputN * Math.log2(inputN);
    const oN2 = Math.pow(inputN, 2);
    const oN3 = Math.pow(inputN, 3);
    const o2n = inputN > 30 ? Infinity : Math.pow(2, inputN);
    // Factorial approximation
    let fact = 1;
    for (let i = 1; i <= Math.min(inputN, 20); i++) fact *= i;
    const oNfact = inputN > 20 ? Infinity : fact;

    return [
      {
        name: 'O(1) Constant',
        val: o1,
        formatted: '1',
        rating: 'Optimal',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        syllabusExample: 'CheckSorted Best Case · Array Index Lookup',
      },
      {
        name: 'O(log n) Logarithmic',
        val: oLogn,
        formatted: `${oLogn.toFixed(1)} ops`,
        rating: 'Excellent',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        syllabusExample: 'Binary Search (halving search space)',
      },
      {
        name: 'O(n) Linear',
        val: oN,
        formatted: `${oN} ops`,
        rating: 'Good',
        color: 'text-sky-700 bg-sky-50 border-sky-200',
        syllabusExample: 'Linear Search · MinMax (Θ(n)) · Recursive Power',
      },
      {
        name: 'O(n log n) Linearithmic',
        val: oNlogn,
        formatted: `${Math.round(oNlogn)} ops`,
        rating: 'Very Fair',
        color: 'text-sky-700 bg-sky-50 border-sky-200',
        syllabusExample: 'Merge Sort · Quick Sort Avg · Fractional Knapsack Sort',
      },
      {
        name: 'O(n²) Quadratic',
        val: oN2,
        formatted: `${oN2.toLocaleString()} ops`,
        rating: 'Caution',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        syllabusExample: 'Quick Sort Worst · Job Scheduling Worst (d≈n)',
      },
      {
        name: 'O(n³) Cubic',
        val: oN3,
        formatted: `${oN3.toLocaleString()} ops`,
        rating: 'Slow for large n',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        syllabusExample: 'All-Pairs Shortest Path (Floyd-Warshall) · Optimal BST',
      },
      {
        name: 'O(2ⁿ) Exponential',
        val: o2n,
        formatted: o2n === Infinity ? 'Overflow (>10⁹)' : `${o2n.toLocaleString()} ops`,
        rating: 'Intractable',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        syllabusExample: 'Sum of Subsets (without pruning)',
      },
      {
        name: 'O(n!) Factorial',
        val: oNfact,
        formatted: oNfact === Infinity ? 'Explosive Overflow' : `${oNfact.toLocaleString()} ops`,
        rating: 'Combinatorial Explosion',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        syllabusExample: 'Hamiltonian Cycle · N-Queens Brute Force',
      },
    ];
  };

  const curves = calculateOperations(n);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Asymptotic Growth Rate Laboratory
              </h2>
              <div className="text-xs text-slate-500 font-mono">
                Observe Big O explosive scaling as input size n grows
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
          {/* Input Size Slider */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Simulated Input Size (n):
              </span>
              <span className="text-base font-bold text-sky-700 font-mono tabular-nums">
                n = {n} elements
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={64}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>n = 2</span>
              <span>n = 16</span>
              <span>n = 32</span>
              <span>n = 64</span>
            </div>
          </div>

          {/* Complexity Spectrum Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-sans">
                  <th className="p-3 text-left">Notation & Class</th>
                  <th className="p-3 text-right">Computed Steps at n={n}</th>
                  <th className="p-3 text-left">Syllabus Benchmark</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {curves.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 text-right font-bold text-slate-800 tabular-nums">
                      {c.formatted}
                    </td>
                    <td className="p-3 text-slate-600 font-sans text-[11px]">
                      {c.syllabusExample}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${c.color}`}>
                        {c.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Asymptotic Definitions Callout */}
          <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-lg text-xs text-sky-950 space-y-2">
            <div className="font-bold text-sky-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-600" />
              <span>Syllabus Rigorous Definitions (Part-A Q3, Q5, Part-B Q2):</span>
            </div>
            <ul className="space-y-1.5 text-sky-800 list-disc list-inside">
              <li>
                <strong>Big O (O):</strong> Upper bound (worst-case). Running time will never exceed this bound for large inputs.
              </li>
              <li>
                <strong>Big Omega (Ω):</strong> Lower bound (best-case). Running time takes at least this bound.
              </li>
              <li>
                <strong>Big Theta (Θ):</strong> Tight bound. Exists when upper and lower bounds coincide (e.g. MinMax Θ(n)).
              </li>
              <li>
                <strong>Little o (o):</strong> Strict upper bound. Function grows strictly slower than the bounding rate.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
