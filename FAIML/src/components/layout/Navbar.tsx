/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search } from 'lucide-react';

interface NavbarProps {
  activeView: 'syllabus' | 'algorithms' | 'case-studies' | 'assessments' | 'bookmarks';
  onSelectView: (view: 'syllabus' | 'algorithms' | 'case-studies' | 'assessments' | 'bookmarks') => void;
  onOpenSearch: () => void;
  totalCompletedCount: number;
  totalQuestions: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenSearch,
  totalCompletedCount,
  totalQuestions
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectView('syllabus')}
          className="text-lg font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          SynapseAI
        </button>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectView('syllabus')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'syllabus' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Syllabus
          </button>
          <button
            onClick={() => onSelectView('algorithms')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'algorithms' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Algorithm Labs
          </button>
          <button
            onClick={() => onSelectView('case-studies')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'case-studies' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => onSelectView('assessments')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'assessments' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Assessments
          </button>
          <button
            onClick={() => onSelectView('bookmarks')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'bookmarks' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Saved Items
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Search entire 125-question syllabus"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Search Syllabus</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-300 rounded">
              ⌘K
            </kbd>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 pl-2 border-l border-slate-200">
            <span>Progress</span>
            <span className="font-mono font-medium text-slate-800 tabular-nums">
              {totalCompletedCount}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
