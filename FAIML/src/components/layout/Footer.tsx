/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Fundamentals of Artificial Intelligence and Machine Learning
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Regulations R2023_V1.2 · III Semester BE/BTECH · Common to CSE, IT, CSBS, CSD · NOV/DEC 2026 Examinations
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span>5 Core Course Outcomes (CO1–CO5)</span>
            <span aria-hidden="true">·</span>
            <span>125 Syllabus Questions</span>
            <span aria-hidden="true">·</span>
            <span>6 Interactive Labs</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Academic Learning System. Based on Official Anna University / Autonomous Syllabus R2023_V1.2.</p>
          <p>Progress tracked locally in browser.</p>
        </div>
      </div>
    </footer>
  );
};
