/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, X, Check, Bookmark, ArrowRight } from 'lucide-react';
import { QuestionItem } from '../../types';
import { allQuestionsByUnit, courseManifest } from '../../data/manifest';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (unitNumber: number, part: 'A' | 'B' | 'C', qNo: number) => void;
  completedQuestions: string[];
  bookmarkedQuestions: string[];
  onToggleComplete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  completedQuestions,
  bookmarkedQuestions,
  onToggleComplete,
  onToggleBookmark
}) => {
  const [query, setQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedBloom, setSelectedBloom] = useState<string | 'all'>('all');

  // Collect all questions
  const allQuestions: QuestionItem[] = [];
  [1, 2, 3, 4, 5].forEach(uNum => {
    const u = allQuestionsByUnit[uNum];
    if (u) {
      allQuestions.push(...u.partA, ...u.partB, ...u.partC);
    }
  });

  // Filter
  const filtered = allQuestions.filter(q => {
    const matchesUnit = selectedUnit === 'all' || q.unitNumber === selectedUnit;
    const matchesBloom = selectedBloom === 'all' || q.bloomsLevel === selectedBloom;
    const qText = (q.question + ' ' + q.answer + ' ' + q.courseOutcome).toLowerCase();
    const matchesQuery = query.trim() === '' || qText.includes(query.toLowerCase());
    return matchesUnit && matchesBloom && matchesQuery;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle handled outside
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header / Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search all 125 syllabus topics, algorithms, definitions, formulas..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span>Unit:</span>
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
            >
              <option value="all">All 5 Units</option>
              {courseManifest.units.map(u => (
                <option key={u.number} value={u.number}>
                  Unit {u.number} ({u.courseOutcome})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Bloom's Taxonomy:</span>
            <select
              value={selectedBloom}
              onChange={e => setSelectedBloom(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
            >
              <option value="all">All Levels</option>
              <option value="K1">K1 - Remember</option>
              <option value="K2">K2 - Understand</option>
              <option value="K3">K3 - Apply</option>
              <option value="K4">K4 - Analyze</option>
              <option value="K5">K5 - Evaluate</option>
              <option value="K6">K6 - Create</option>
            </select>
          </div>

          <span className="ml-auto text-slate-400 tabular-nums">
            {filtered.length} {filtered.length === 1 ? 'question' : 'questions'} found
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching syllabus questions found for "{query}".
            </div>
          ) : (
            filtered.map(item => {
              const isDone = completedQuestions.includes(item.id);
              const isBookmarked = bookmarkedQuestions.includes(item.id);

              return (
                <div key={item.id} className="py-3 group hover:bg-slate-50 px-2 rounded-lg transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-slate-700">Unit {item.unitNumber}</span>
                        <span>·</span>
                        <span className="font-mono text-indigo-600">Part {item.part} Q{item.qNo}</span>
                        <span>·</span>
                        <span className="font-mono">{item.courseOutcome}</span>
                        <span>·</span>
                        <span className="text-slate-600">{item.bloomsLevel} ({item.bloomsLabel})</span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.question}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {item.answer.replace(/\n/g, ' ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pt-1">
                      <button
                        onClick={() => onToggleBookmark(item.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isBookmarked ? 'text-amber-600 bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onToggleComplete(item.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isDone ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isDone ? 'Marked as mastered' : 'Mark as mastered'}
                      >
                        <Check className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          onSelectQuestion(item.unitNumber, item.part, item.qNo);
                          onClose();
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                        title="Jump to question"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
