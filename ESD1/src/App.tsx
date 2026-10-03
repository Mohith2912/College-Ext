import React, { useState, useEffect } from 'react';
import { UNITS_DATA } from './data/embeddedCurriculum';
import { UnitId } from './types/embedded';
import { Navbar } from './components/Navbar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HardwareGlossaryModal } from './components/HardwareGlossaryModal';

// Dedicated Per-Unit Page Modules
import { Unit1Page } from './units/unit1/Unit1Page';
import { Unit2Page } from './units/unit2/Unit2Page';
import { Unit3Page } from './units/unit3/Unit3Page';
import { Unit4Page } from './units/unit4/Unit4Page';
import { Unit5Page } from './units/unit5/Unit5Page';

export default function App() {
  const [lockedUnit] = useState<UnitId | undefined>(() => {
    const unit = new URLSearchParams(window.location.search).get('unit');
    return unit && /^[1-5]$/.test(unit) ? (`unit-${unit}` as UnitId) : undefined;
  });
  const [currentUnitId, setCurrentUnitId] = useState<UnitId>(() => lockedUnit ?? 'unit-1');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentUnit = UNITS_DATA.find((u) => u.id === currentUnitId) || UNITS_DATA[0];

  const handleSelectSearchResult = (unitId: UnitId) => {
    setCurrentUnitId(unitId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextUnit = () => {
    if (lockedUnit) return;
    const currentIndex = UNITS_DATA.findIndex((u) => u.id === currentUnitId);
    if (currentIndex < UNITS_DATA.length - 1) {
      setCurrentUnitId(UNITS_DATA[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToSection = (sectionId: string) => {
    const unitPrefix = `u${currentUnit.unitNumber}-`;
    const targetId = `${unitPrefix}${sectionId}`;
    const el = document.getElementById(targetId) || document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#f7f8fa] text-[#182231] flex flex-col ${lockedUnit ? 'unit-locked' : ''}`}>
      {/* Navigation Bar with Separated Units and Jump Nav */}
      <Navbar
        currentUnitId={currentUnitId}
        onSelectUnit={(id) => {
          setCurrentUnitId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onJumpToSection={handleJumpToSection}
        lockedUnit={lockedUnit}
      />

      {/* Main Single-Page View per Unit: All Interactive Stuff Together */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {currentUnitId === 'unit-1' && (
          <Unit1Page unit={currentUnit} onNextUnit={lockedUnit ? undefined : handleNextUnit} />
        )}
        {currentUnitId === 'unit-2' && (
          <Unit2Page unit={currentUnit} onNextUnit={lockedUnit ? undefined : handleNextUnit} />
        )}
        {currentUnitId === 'unit-3' && (
          <Unit3Page unit={currentUnit} onNextUnit={lockedUnit ? undefined : handleNextUnit} />
        )}
        {currentUnitId === 'unit-4' && (
          <Unit4Page unit={currentUnit} onNextUnit={lockedUnit ? undefined : handleNextUnit} />
        )}
        {currentUnitId === 'unit-5' && (
          <Unit5Page unit={currentUnit} onNextUnit={lockedUnit ? undefined : handleNextUnit} />
        )}
      </main>

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <HardwareGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Classy White Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-800">
              Beyond Syllabus · Embedded System Design
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Pedagogical Engine: Real-world incident → Exploded Hardware Diagram → Concept & Keyword Exploder → Hands-on Simulator → Interactive Checkpoint → Fault Injection Lab.
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Hardware Glossary
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Concept Index (⌘K)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
