import React, { useState, useEffect } from 'react';
import { UnitId, LabId } from './types/algorithm';
import { UNITS, LAB_METADATA } from './data/curriculum';
import { TopNavBar } from './components/layout/TopNavBar';
import { LabWorkspace } from './components/labs/LabWorkspace';
import { SearchModal } from './components/common/SearchModal';
import { MasterRecurrenceCalc } from './components/workbench/MasterRecurrenceCalc';
import { ComplexityComparator } from './components/workbench/ComplexityComparator';
import { soundFx } from './lib/sound';

export default function App() {
  const [currentUnitId, setCurrentUnitId] = useState<UnitId>('unit-1');
  const [currentLabId, setCurrentLabId] = useState<LabId>('linear-search');
  const [completedLabs, setCompletedLabs] = useState<Set<LabId>>(() => {
    try {
      const saved = localStorage.getItem('daa_completed_labs_v2');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
    return new Set<LabId>();
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRecurrenceCalcOpen, setIsRecurrenceCalcOpen] = useState<boolean>(false);
  const [isComplexityCompareOpen, setIsComplexityCompareOpen] = useState<boolean>(false);

  // Sync unit and lab selection from URL query parameters (e.g. ?unit=1 or ?lab=linear-search)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const unitParam = params.get('unit');
        if (unitParam) {
          const uId = ('unit-' + unitParam);
          const foundUnit = UNITS.find((u) => u.id === uId);
          if (foundUnit && foundUnit.labs.length > 0) {
            setCurrentUnitId(uId);
            setCurrentLabId(foundUnit.labs[0]);
          }
        }
        const labParam = params.get('lab');
        if (labParam && LAB_METADATA[labParam]) {
          setCurrentLabId(labParam);
          const meta = LAB_METADATA[labParam];
          if (meta) setCurrentUnitId(meta.unitId);
        }
      }
    } catch {}
  }, []);

  // Toggle Sound FX
  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
  };

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsRecurrenceCalcOpen(false);
        setIsComplexityCompareOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save completed labs in localStorage
  const handleMarkComplete = (labId: LabId) => {
    setCompletedLabs((prev) => {
      const next = new Set(prev);
      next.add(labId);
      try {
        localStorage.setItem('daa_completed_labs_v2', JSON.stringify(Array.from(next)));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const handleSelectLab = (labId: LabId) => {
    setCurrentLabId(labId);
    const labMeta = LAB_METADATA[labId];
    if (labMeta && labMeta.unitId !== currentUnitId) {
      setCurrentUnitId(labMeta.unitId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectUnit = (unitId: UnitId) => {
    setCurrentUnitId(unitId);
    const unit = UNITS.find((u) => u.id === unitId);
    if (unit && !unit.labs.includes(currentLabId)) {
      setCurrentLabId(unit.labs[0]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* Top Navigation Bar with Unit & Lab Ribbons on Top */}
      <TopNavBar
        currentUnitId={currentUnitId}
        currentLabId={currentLabId}
        completedLabs={completedLabs}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onSelectUnit={handleSelectUnit}
        onSelectLab={handleSelectLab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRecurrenceCalc={() => setIsRecurrenceCalcOpen(true)}
        onOpenComplexityCompare={() => setIsComplexityCompareOpen(true)}
      />

      {/* Main Full-Width Laboratory Workspace */}
      <main className="flex-1 w-full">
        <LabWorkspace
          key={currentLabId}
          labId={currentLabId}
          onMarkComplete={handleMarkComplete}
          isCompleted={completedLabs.has(currentLabId)}
        />
      </main>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLab={handleSelectLab}
      />

      <MasterRecurrenceCalc
        isOpen={isRecurrenceCalcOpen}
        onClose={() => setIsRecurrenceCalcOpen(false)}
      />

      <ComplexityComparator
        isOpen={isComplexityCompareOpen}
        onClose={() => setIsComplexityCompareOpen(false)}
      />
    </div>
  );
}
