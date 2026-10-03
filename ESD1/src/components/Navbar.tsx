import React from 'react';
import { UnitId } from '../types/embedded';
import { AlertOctagon, BookOpen, CheckCircle2, Layers, Search, Wrench, Zap } from 'lucide-react';

interface NavbarProps {
  currentUnitId: UnitId;
  lockedUnit?: UnitId;
  onSelectUnit: (unitId: UnitId) => void;
  onOpenSearch: () => void;
  onOpenGlossary: () => void;
  onJumpToSection: (sectionId: string) => void;
}

const units = [
  { id: 'unit-1' as UnitId, number: 1, title: 'Washing Machine', subtitle: 'Intro & Hard Real-Time' },
  { id: 'unit-2' as UnitId, number: 2, title: 'ABS Braking ECU', subtitle: 'Harvard & CAN Bus' },
  { id: 'unit-3' as UnitId, number: 3, title: 'Smart Greenhouse', subtitle: 'Embedded C & WDT' },
  { id: 'unit-4' as UnitId, number: 4, title: 'Industrial Motor', subtitle: 'FreeRTOS & TinyML' },
  { id: 'unit-5' as UnitId, number: 5, title: 'Medical Wearable', subtitle: 'UML & Edge AI' },
];

const sections = [
  { id: 'sec-story', label: 'Case Story', icon: Layers },
  { id: 'sec-diagram', label: 'Architecture', icon: Wrench },
  { id: 'sec-parts', label: 'Concepts', icon: BookOpen },
  { id: 'sec-simulator', label: 'Simulator', icon: Zap },
  { id: 'sec-checkpoint', label: 'Checkpoint', icon: CheckCircle2 },
  { id: 'sec-whatif', label: 'What-If Lab', icon: AlertOctagon },
];

export const Navbar: React.FC<NavbarProps> = ({ currentUnitId, lockedUnit, onSelectUnit, onOpenSearch, onOpenGlossary, onJumpToSection }) => {
  const currentUnit = units.find(unit => unit.id === currentUnitId) ?? units[0];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#173b73] text-sm font-extrabold text-white shadow-sm">E{currentUnit.number}</div>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-900 sm:text-base">
              <span className="hidden sm:inline">Embedded System Design</span><span className="hidden text-slate-300 sm:inline">/</span><span className="truncate">Unit {currentUnit.number} Case Study</span>
            </div>
            <p className="truncate text-xs text-slate-500">{currentUnit.title} · {currentUnit.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={onOpenSearch} className="nav-utility" title="Search concepts across all units" aria-label="Search concepts"><Search className="h-4 w-4" /><span className="hidden lg:inline">Search</span></button>
          <button onClick={onOpenGlossary} className="nav-utility" aria-label="Open glossary"><BookOpen className="h-4 w-4" /><span className="hidden lg:inline">Glossary</span></button>
          {lockedUnit && <button onClick={() => onJumpToSection('sec-simulator')} className="hidden min-h-11 items-center gap-2 rounded-xl bg-[#173b73] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#102f5d] sm:flex"><Zap className="h-4 w-4" />Unit {currentUnit.number} Simulator</button>}
        </div>
      </div>

      {!lockedUnit && <div className="border-t border-slate-200 bg-slate-50/90 px-4 py-2"><div className="scrollbar-none mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto py-1">
        {units.map(unit => { const selected = unit.id === currentUnitId; return <button key={unit.id} onClick={() => onSelectUnit(unit.id)} className={`flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2 text-xs font-semibold transition ${selected ? 'border-[#3768a6] bg-white text-[#173b73] shadow-sm ring-2 ring-blue-100' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'}`}><span className={`flex h-7 w-7 items-center justify-center rounded-md font-mono text-[11px] font-bold ${selected ? 'bg-[#173b73] text-white' : 'bg-slate-100 text-slate-600'}`}>U{unit.number}</span><span className="text-left"><span className="block leading-tight">{unit.title}</span><span className="block text-[10px] font-normal leading-tight text-slate-400">{unit.subtitle}</span></span></button>; })}
      </div></div>}

      <nav className="border-t border-slate-200 bg-white px-3 py-2" aria-label="Unit sections"><div className="mx-auto grid max-w-7xl grid-cols-3 gap-1 sm:grid-cols-6">
        {sections.map(section => { const Icon = section.icon; return <button key={section.id} onClick={() => onJumpToSection(section.id)} className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-center text-[11px] font-semibold leading-tight text-slate-600 transition hover:bg-blue-50 hover:text-[#173b73] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b73] sm:text-xs"><Icon className="h-3.5 w-3.5 shrink-0 text-[#3768a6]" /><span>{section.label}</span></button>; })}
      </div></nav>
    </header>
  );
};
