import React from 'react';
import { UnitId } from '../types/concept';
import type { ActiveTab } from './TopNav';

interface CourseTopNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedUnit: UnitId | 'all';
  setSelectedUnit: (unit: UnitId | 'all') => void;
  lockedUnit?: UnitId;
}

const allNavigation: Array<{ tab: ActiveTab; label: string }> = [
  { tab: 'concept_map', label: 'Concepts' },
  { tab: 'concept_labs', label: 'Simulator' },
  { tab: 'fillups', label: 'Fill-ups' },
  { tab: 'drag_drop', label: 'Practice' },
  { tab: 'exam_bank', label: 'Question Bank' },
];

export const CourseTopNav: React.FC<CourseTopNavProps> = ({
  activeTab,
  setActiveTab,
  selectedUnit,
  setSelectedUnit,
  lockedUnit,
}) => {
  const unitNumber = Number((lockedUnit ?? selectedUnit).toString().split('-')[1] ?? 1);
  const navigation = lockedUnit && unitNumber > 2
    ? allNavigation.filter(({ tab }) => tab !== 'fillups' && tab !== 'drag_drop')
    : allNavigation;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <button
          onClick={() => setActiveTab(lockedUnit ? 'concept_labs' : 'concept_map')}
          className="flex shrink-0 items-center gap-3 text-left"
          aria-label="Open the unit overview"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            <span className="text-rose-500">J</span>{unitNumber}
          </span>
          <span className="hidden items-center gap-2 text-sm font-bold tracking-tight text-slate-900 sm:flex">
            <span>Object Oriented Programming</span>
            <span className="font-normal text-slate-300">/</span>
            <span className="font-semibold text-slate-600">
              {lockedUnit ? `Unit ${unitNumber} Case Study` : 'Java Concept Studio'}
            </span>
          </span>
        </button>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap text-xs font-semibold text-slate-600 md:flex" aria-label="Unit sections">
          {navigation.map(({ tab, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-md px-2 py-1.5 transition-colors hover:text-slate-900 ${activeTab === tab ? 'font-bold text-rose-600' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {lockedUnit ? (
            <>
              <span className="hidden text-xs font-medium text-slate-500 xl:inline">Module {unitNumber}.1</span>
              <span className="hidden h-4 w-px bg-slate-200 xl:block" aria-hidden="true" />
              <button
                onClick={() => setActiveTab('concept_labs')}
                className="whitespace-nowrap rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                Unit {unitNumber} Simulator
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
              <button
                onClick={() => setSelectedUnit('all')}
                className={`whitespace-nowrap rounded px-2.5 py-1 transition-colors ${selectedUnit === 'all' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All Units
              </button>
              {(['Unit-1', 'Unit-2', 'Unit-3', 'Unit-4', 'Unit-5'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                  className={`whitespace-nowrap rounded px-2 py-1 transition-colors ${selectedUnit === unit ? 'bg-white font-bold text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  U{unit.split('-')[1]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <nav className={`grid border-t border-slate-200/60 bg-white px-2 text-xs font-semibold text-slate-600 md:hidden ${navigation.length === 3 ? 'grid-cols-3' : 'grid-cols-5'}`} aria-label="Unit sections">
        {navigation.map(({ tab, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-h-11 min-w-0 px-1 py-2 text-center leading-tight ${activeTab === tab ? 'font-bold text-rose-600' : ''}`}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};
