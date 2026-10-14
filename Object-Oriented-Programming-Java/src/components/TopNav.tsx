import React from 'react';
import { UnitId } from '../types/concept';

export type ActiveTab = 'concept_map' | 'concept_labs' | 'fillups' | 'drag_drop' | 'exam_bank';

interface TopNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedUnit: UnitId | 'all';
  setSelectedUnit: (unit: UnitId | 'all') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  selectedUnit,
  setSelectedUnit
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('concept_map')}
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer text-left"
          >
            JavaMap EDU
          </button>
          <span className="hidden sm:inline-block text-xs text-slate-500 border-l border-slate-200 pl-3">
            2321CSC304R · R2023-V1.2 · Units 1–5
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('concept_map')}
            className={`transition-colors pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'concept_map'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Concept Map
          </button>
          <button
            onClick={() => setActiveTab('concept_labs')}
            className={`transition-colors pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'concept_labs'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Concept Simulators
          </button>
          <button
            onClick={() => setActiveTab('fillups')}
            className={`transition-colors pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'fillups'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Fill-ups Lab
          </button>
          <button
            onClick={() => setActiveTab('drag_drop')}
            className={`transition-colors pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'drag_drop'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Drag & Drop Studio
          </button>
          <button
            onClick={() => setActiveTab('exam_bank')}
            className={`transition-colors pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'exam_bank'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Bank
          </button>
        </nav>

        {/* Zone 3: Unit Segmented Filter for Units 1 to 5 + All */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
              selectedUnit === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Units
          </button>
          {(['Unit-1', 'Unit-2', 'Unit-3', 'Unit-4', 'Unit-5'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedUnit === u
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              U{u.split('-')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-slate-100 overflow-x-auto text-xs gap-3">
        <button
          onClick={() => setActiveTab('concept_map')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'concept_map' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          Concept Map
        </button>
        <button
          onClick={() => setActiveTab('concept_labs')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'concept_labs' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          Simulators
        </button>
        <button
          onClick={() => setActiveTab('fillups')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'fillups' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          Fill-ups
        </button>
        <button
          onClick={() => setActiveTab('drag_drop')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'drag_drop' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          Drag & Drop
        </button>
        <button
          onClick={() => setActiveTab('exam_bank')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'exam_bank' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          Question Bank
        </button>
      </div>
    </header>
  );
};
