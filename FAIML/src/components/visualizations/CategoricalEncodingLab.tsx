/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Binary, Palette, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CategoricalEncodingLab: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<'COLOR' | 'EDUCATION'>('COLOR');

  // Syllabus Dataset 1: "Color" {Red, Blue, Green} from Unit 5 Part A Q13
  const colorData = [
    { id: 1, item: 'Apple', category: 'Red' },
    { id: 2, item: 'Berry', category: 'Blue' },
    { id: 3, item: 'Leaf', category: 'Green' },
    { id: 4, item: 'Cherry', category: 'Red' },
    { id: 5, item: 'Ocean', category: 'Blue' }
  ];

  // Dataset 2: "Education" {High School, UG, PG, PhD}
  const educationData = [
    { id: 1, person: 'Candidate A', category: 'High School' },
    { id: 2, person: 'Candidate B', category: 'UG' },
    { id: 3, person: 'Candidate C', category: 'PG' },
    { id: 4, person: 'Candidate D', category: 'PhD' },
    { id: 5, person: 'Candidate E', category: 'UG' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-violet-50/60 via-purple-50/40 to-indigo-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <Binary className="w-4 h-4 text-purple-600" />
            <span>Unit 5 Data Preprocessing & Categorical Transformation</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            One-Hot Encoding vs Label Encoding Interactive Studio
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Unit 5 Part A Q3 & Q13: Apply encoding to nominal "Color" {'{Red, Blue, Green}'} vs ordinal "Education" {'{High School, UG, PG}'}.
          </p>
        </div>

        {/* Dataset Switcher */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-xs text-xs">
          <button
            onClick={() => setActiveDataset('COLOR')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDataset === 'COLOR' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Nominal: Color (Q13)</span>
          </button>
          <button
            onClick={() => setActiveDataset('EDUCATION')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDataset === 'EDUCATION' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Ordinal: Education</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Interactive One-Hot Matrix Transformation (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Transformed Binary Feature Matrix</span>
              <span className="text-purple-600 font-mono font-semibold">One-Hot Encoding Result</span>
            </div>

            {/* Matrix Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold font-mono">
                  <tr>
                    <th className="p-3">Instance</th>
                    <th className="p-3">Raw Value</th>
                    {activeDataset === 'COLOR' ? (
                      <>
                        <th className="p-3 text-red-600 bg-red-50/50">Is_Red</th>
                        <th className="p-3 text-blue-600 bg-blue-50/50">Is_Blue</th>
                        <th className="p-3 text-emerald-600 bg-emerald-50/50">Is_Green</th>
                      </>
                    ) : (
                      <>
                        <th className="p-3 text-indigo-600 bg-indigo-50/50">Edu_HighSchool</th>
                        <th className="p-3 text-blue-600 bg-blue-50/50">Edu_UG</th>
                        <th className="p-3 text-purple-600 bg-purple-50/50">Edu_PG</th>
                        <th className="p-3 text-amber-600 bg-amber-50/50">Edu_PhD</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  {activeDataset === 'COLOR'
                    ? colorData.map(row => (
                        <tr key={row.id} className="hover:bg-slate-50/60">
                          <td className="p-3 font-sans font-medium text-slate-900">{row.item}</td>
                          <td className="p-3 font-sans font-semibold text-purple-700">{row.category}</td>
                          <td className="p-3 bg-red-50/30 text-center font-bold">
                            {row.category === 'Red' ? '1' : '0'}
                          </td>
                          <td className="p-3 bg-blue-50/30 text-center font-bold">
                            {row.category === 'Blue' ? '1' : '0'}
                          </td>
                          <td className="p-3 bg-emerald-50/30 text-center font-bold">
                            {row.category === 'Green' ? '1' : '0'}
                          </td>
                        </tr>
                      ))
                    : educationData.map(row => (
                        <tr key={row.id} className="hover:bg-slate-50/60">
                          <td className="p-3 font-sans font-medium text-slate-900">{row.person}</td>
                          <td className="p-3 font-sans font-semibold text-purple-700">{row.category}</td>
                          <td className="p-3 bg-indigo-50/30 text-center font-bold">
                            {row.category === 'High School' ? '1' : '0'}
                          </td>
                          <td className="p-3 bg-blue-50/30 text-center font-bold">
                            {row.category === 'UG' ? '1' : '0'}
                          </td>
                          <td className="p-3 bg-purple-50/30 text-center font-bold">
                            {row.category === 'PG' ? '1' : '0'}
                          </td>
                          <td className="p-3 bg-amber-50/30 text-center font-bold">
                            {row.category === 'PhD' ? '1' : '0'}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Each category gets an independent binary axis (0 or 1).</span>
            <span className="font-semibold text-purple-700">No False Hierarchy Created</span>
          </div>
        </div>

        {/* Right: Comparative Pedagogical Contrast (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Methodological Comparison
            </h3>

            {/* Label Encoding Demonstration */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs space-y-2">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Label Encoding Representation:</span>
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">Integer Mapping</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono space-y-1">
                {activeDataset === 'COLOR' ? (
                  <>
                    <div className="flex justify-between"><span>Red:</span> <strong className="text-red-600">1</strong></div>
                    <div className="flex justify-between"><span>Blue:</span> <strong className="text-blue-600">2</strong></div>
                    <div className="flex justify-between"><span>Green:</span> <strong className="text-emerald-600">3</strong></div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between"><span>High School:</span> <strong className="text-indigo-600">1</strong></div>
                    <div className="flex justify-between"><span>UG:</span> <strong className="text-blue-600">2</strong></div>
                    <div className="flex justify-between"><span>PG:</span> <strong className="text-purple-600">3</strong></div>
                    <div className="flex justify-between"><span>PhD:</span> <strong className="text-amber-600">4</strong></div>
                  </>
                )}
              </div>

              {/* Danger or Approval Callout */}
              {activeDataset === 'COLOR' ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Why Label Encoding Fails Here: </strong>
                    Assigning Green=3 and Red=1 causes linear regression and distance metrics to falsely infer that <em>Green &gt; Red</em> and that <em>Blue (2)</em> is the numeric midpoint! One-Hot Encoding is strictly required.
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Why Label Encoding Works Here: </strong>
                    Education has a natural ordinal ranking: High School &lt; UG &lt; PG &lt; PhD. Mapping to sequential integers preserves the genuine educational hierarchy.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            Rule of Thumb: <strong className="text-slate-800">Nominal → One-Hot</strong> · <strong className="text-slate-800">Ordinal → Label Encoding</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
