import React, { useState, useMemo } from 'react';
import { UNITS_DATA } from '../data/embeddedCurriculum';
import { UnitId, SearchResult } from '../types/embedded';
import { Search, X, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (unitId: UnitId, conceptId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  const searchResults: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    UNITS_DATA.forEach((unit) => {
      // Check unit title & story
      if (unit.title.toLowerCase().includes(q) || unit.realLifeStory.scenario.toLowerCase().includes(q)) {
        results.push({
          unitId: unit.id,
          unitTitle: `Unit ${unit.unitNumber}: ${unit.title}`,
          conceptTitle: unit.realLifeStory.title,
          snippet: unit.realLifeStory.scenario.slice(0, 110) + '...',
          conceptId: '',
        });
      }

      // Check hardware parts
      unit.hardwareArchitecture.parts.forEach((part) => {
        if (
          part.name.toLowerCase().includes(q) ||
          part.role.toLowerCase().includes(q) ||
          part.howItWorks.toLowerCase().includes(q) ||
          part.associatedKeywords.some((k) => k.keyword.toLowerCase().includes(q))
        ) {
          results.push({
            unitId: unit.id,
            unitTitle: `Unit ${unit.unitNumber}: ${unit.title}`,
            conceptTitle: `Hardware Part: ${part.name}`,
            snippet: `${part.role} — ${part.howItWorks.slice(0, 90)}...`,
            conceptId: part.id,
          });
        }
      });

      // Check each concept
      unit.concepts.forEach((concept) => {
        if (
          concept.title.toLowerCase().includes(q) ||
          concept.tagline.toLowerCase().includes(q) ||
          concept.deepDive.toLowerCase().includes(q) ||
          concept.hardwareAnchor.toLowerCase().includes(q) ||
          concept.category.toLowerCase().includes(q)
        ) {
          results.push({
            unitId: unit.id,
            unitTitle: `Unit ${unit.unitNumber}: ${unit.title}`,
            conceptTitle: concept.title,
            snippet: `${concept.hardwareAnchor} — ${concept.deepDive.slice(0, 100)}...`,
            conceptId: concept.id,
          });
        }
      });
    });

    return results.slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white border border-slate-300 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-600" />
          <input
            type="text"
            placeholder="Search concepts or hardware (e.g. Solenoid, Harvard, Watchdog, Volatile, CAN bus, Quantization, RTOS)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {searchResults.length > 0 ? (
            searchResults.map((res, i) => (
              <div
                key={i}
                onClick={() => {
                  onSelectResult(res.unitId, res.conceptId);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 cursor-pointer transition-all text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-700 uppercase font-bold">
                    {res.unitTitle}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{res.conceptTitle}</div>
                <p className="text-slate-600 mt-1 line-clamp-2">{res.snippet}</p>
              </div>
            ))
          ) : query.trim() ? (
            <div className="text-center py-8 text-xs text-slate-500 font-medium">
              No matching embedded concepts found for "{query}".
            </div>
          ) : (
            <div className="py-4 text-xs text-slate-600 space-y-3">
              <div className="font-bold text-slate-800">Popular Concept & Hardware Shortcuts:</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Washing Machine Solenoid',
                  'Harvard Architecture',
                  'Watchdog Timer',
                  'Volatile Keyword',
                  'CAN Bus Arbitration',
                  'FreeRTOS Preemption',
                  'TinyML Quantization',
                  'UML Statechart',
                  'Hard Real-Time',
                  'Memory-Mapped I/O',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-mono text-[11px] border border-slate-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
