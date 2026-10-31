import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { UNITS, LAB_METADATA } from '../../data/curriculum';
import { LabId } from '../../types/algorithm';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLab: (labId: LabId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLab,
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

  const allLabIds = Object.keys(LAB_METADATA) as LabId[];
  const filteredLabs = allLabIds.filter((id) => {
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
            placeholder="Search algorithms, paradigms, Java classes, or Big O bounds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 rounded text-slate-500 border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
          {filteredLabs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching labs found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredLabs.map((labId) => {
              const lab = LAB_METADATA[labId];
              const unit = UNITS.find((u) => u.id === lab.unitId);

              return (
                <button
                  key={labId}
                  onClick={() => {
                    onSelectLab(labId);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-sky-700">
                        Unit 0{unit?.number} · {lab.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {lab.badge}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {lab.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      {lab.summary}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
