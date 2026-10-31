import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { UNITS, LAB_METADATA } from '../../data/curriculum';
import { LabId, UnitId } from '../../types/algorithm';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLab: (labId: LabId) => void;
  lockedUnitId?: UnitId;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLab,
  lockedUnitId,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentUnit = lockedUnitId ? UNITS.find((u) => u.id === lockedUnitId) : undefined;
  const labPool: LabId[] = currentUnit ? currentUnit.labs : (Object.keys(LAB_METADATA) as LabId[]);

  const filteredLabs = labPool.filter((id) => {
    const meta = LAB_METADATA[id];
    const q = query.toLowerCase();
    return (
      meta.title.toLowerCase().includes(q) ||
      meta.category.toLowerCase().includes(q) ||
      meta.paradigm.toLowerCase().includes(q) ||
      meta.summary.toLowerCase().includes(q) ||
      meta.syllabusReference.toLowerCase().includes(q) ||
      meta.complexity.timeWorst.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              currentUnit
                ? `Search within Unit 0${currentUnit.number}: ${currentUnit.title}...`
                : 'Search algorithms, paradigms, Java classes, or Big O bounds...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-100"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
          {filteredLabs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No algorithm lab matched "{query}".
            </div>
          ) : (
            filteredLabs.map((id) => {
              const meta = LAB_METADATA[id];
              const unit = UNITS.find((u) => u.id === meta.unitId);

              return (
                <button
                  key={id}
                  onClick={() => {
                    onSelectLab(id);
                    onClose();
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/60">
                        {meta.badge}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                        {meta.title}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {unit?.title} • {meta.category} • Worst: {meta.complexity.timeWorst}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{filteredLabs.length} algorithm labs available</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
