import React from 'react';
import { UnitId, LabId } from '../../types/algorithm';
import { UNITS, LAB_METADATA } from '../../data/curriculum';
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  Volume2,
  VolumeX,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface TopNavBarProps {
  currentUnitId: UnitId;
  currentLabId: LabId;
  completedLabs: Set<LabId>;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSelectUnit: (unitId: UnitId) => void;
  onSelectLab: (labId: LabId) => void;
  onOpenSearch: () => void;
  onOpenRecurrenceCalc: () => void;
  onOpenComplexityCompare: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentUnitId,
  currentLabId,
  completedLabs,
  soundEnabled,
  onToggleSound,
  onSelectUnit,
  onSelectLab,
  onOpenSearch,
  onOpenRecurrenceCalc,
  onOpenComplexityCompare,
}) => {
  const currentUnit = UNITS.find((u) => u.id === currentUnitId) || UNITS[0];
  const allLabIds = UNITS.flatMap((u) => u.labs);
  const currentLabGlobalIndex = allLabIds.indexOf(currentLabId);

  const handlePrevLab = () => {
    if (currentLabGlobalIndex > 0) {
      const prevId = allLabIds[currentLabGlobalIndex - 1];
      const prevMeta = LAB_METADATA[prevId];
      if (prevMeta.unitId !== currentUnitId) {
        onSelectUnit(prevMeta.unitId);
      }
      onSelectLab(prevId);
    }
  };

  const handleNextLab = () => {
    if (currentLabGlobalIndex < allLabIds.length - 1) {
      const nextId = allLabIds[currentLabGlobalIndex + 1];
      const nextMeta = LAB_METADATA[nextId];
      if (nextMeta.unitId !== currentUnitId) {
        onSelectUnit(nextMeta.unitId);
      }
      onSelectLab(nextId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Upper Row: Brand & Unit Tabs & Global Action Controls */}
      <div className="flex items-center justify-between gap-6 px-5 py-3 border-b border-slate-100">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-600 rotate-45" />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectUnit('unit-1');
                onSelectLab('linear-search');
              }}
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
            >
              Algorithmic Workbench
            </a>
          </div>
          <span className="hidden md:inline-block text-xs font-mono text-slate-500 border-l border-slate-200 pl-3">
            DAA Virtual Lab
          </span>
        </div>

        {/* Zone 2: 5 Unit Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {UNITS.map((unit) => {
            const isSelected = unit.id === currentUnitId;
            const unitDoneCount = unit.labs.filter((l) => completedLabs.has(l)).length;

            return (
              <button
                key={unit.id}
                onClick={() => {
                  onSelectUnit(unit.id);
                  if (!unit.labs.includes(currentLabId)) {
                    onSelectLab(unit.labs[0]);
                  }
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>0{unit.number}. {unit.title.split(' ')[0]}</span>
                {unitDoneCount > 0 && (
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-sky-100 text-sky-800">
                    {unitDoneCount}/{unit.labCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Workbench Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Audio Effects' : 'Enable Tactile Audio Effects'}
            className={`p-1.5 rounded-md text-xs font-medium border transition-colors ${
              soundEnabled
                ? 'bg-sky-50 border-sky-300 text-sky-700'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Master Recurrence Button */}
          <button
            onClick={onOpenRecurrenceCalc}
            title="Master Theorem Recurrence Calculator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Master Recurrence</span>
          </button>

          {/* Complexity Chart Button */}
          <button
            onClick={onOpenComplexityCompare}
            title="Compare Asymptotic Complexity Curves"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Complexity Curves</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search Labs</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] font-mono bg-slate-800 rounded text-slate-300">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Lower Row: Active Unit's Labs Horizontal Ribbon */}
      <div className="flex items-center justify-between px-5 py-2 bg-slate-50/80 overflow-x-auto text-xs">
        {/* Left: Previous / Next Lab Navigation */}
        <div className="flex items-center gap-1 shrink-0 mr-4">
          <button
            onClick={handlePrevLab}
            disabled={currentLabGlobalIndex === 0}
            title="Previous Lab"
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-slate-500 tabular-nums px-1">
            {currentLabGlobalIndex + 1}/{allLabIds.length}
          </span>
          <button
            onClick={handleNextLab}
            disabled={currentLabGlobalIndex === allLabIds.length - 1}
            title="Next Lab"
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Horizontal Lab Buttons for the Active Unit */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 flex-1 min-w-0">
          <span className="text-slate-400 font-medium whitespace-nowrap mr-1 hidden sm:inline">
            Unit 0{currentUnit.number}:
          </span>
          {currentUnit.labs.map((labId) => {
            const lab = LAB_METADATA[labId];
            const isSelected = labId === currentLabId;
            const isDone = completedLabs.has(labId);

            return (
              <button
                key={labId}
                onClick={() => onSelectLab(labId)}
                className={`px-3 py-1.5 rounded-md font-medium text-xs whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {isDone ? (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-white' : 'text-emerald-600'
                    }`}
                  />
                ) : (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-sky-200' : 'bg-slate-300'
                    }`}
                  />
                )}
                <span>{lab.title}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    isSelected ? 'bg-sky-700/80 text-sky-100' : 'text-slate-400'
                  }`}
                >
                  {lab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Overall Progress Metric */}
        <div className="hidden md:flex items-center gap-3 shrink-0 ml-4 border-l border-slate-200 pl-4">
          <div className="text-[11px] text-slate-600">
            Progress: <span className="font-mono font-bold text-sky-700">{completedLabs.size}/17</span>
          </div>
          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-sky-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(completedLabs.size / 17) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
