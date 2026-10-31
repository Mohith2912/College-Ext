import React from 'react';
import { UnitId } from '../../types/algorithm';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentUnitId: UnitId;
  onSelectUnit: (unitId: UnitId) => void;
  onOpenSearch: () => void;
  onOpenRecurrenceCalc: () => void;
  onOpenComplexityCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUnitId,
  onSelectUnit,
  onOpenSearch,
  onOpenRecurrenceCalc,
  onOpenComplexityCompare,
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
      {/* Zone 1: Brand wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectUnit('unit-1');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
        >
          Algorithmic Workbench
        </a>
        <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
          DAA Virtual Lab
        </span>
      </div>

      {/* Zone 2: Single-line navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => onSelectUnit('unit-1')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            currentUnitId === 'unit-1' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          01. Foundations
        </button>
        <button
          onClick={() => onSelectUnit('unit-2')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            currentUnitId === 'unit-2' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          02. Divide & Conquer
        </button>
        <button
          onClick={() => onSelectUnit('unit-3')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            currentUnitId === 'unit-3' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          03. Greedy Methods
        </button>
        <button
          onClick={() => onSelectUnit('unit-4')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            currentUnitId === 'unit-4' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          04. Dynamic Prog
        </button>
        <button
          onClick={() => onSelectUnit('unit-5')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            currentUnitId === 'unit-5' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          05. Backtracking
        </button>
      </nav>

      {/* Zone 3: 1 Primary action cluster */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenRecurrenceCalc}
          title="Master Theorem Recurrence Calculator"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>Master Recurrence</span>
        </button>
        <button
          onClick={onOpenComplexityCompare}
          title="Compare Asymptotic Complexity Curves"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Complexity Chart</span>
        </button>
        <button
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Labs</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] font-mono bg-slate-800 rounded text-slate-300">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};
