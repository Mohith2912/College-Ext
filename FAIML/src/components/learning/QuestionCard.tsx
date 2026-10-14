/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bookmark, Check, Copy, CheckCheck } from 'lucide-react';
import { QuestionItem } from '../../types';

interface QuestionCardProps {
  item: QuestionItem;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: () => void;
  onToggleBookmark: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Question ${item.qNo} (${item.courseOutcome} - ${item.bloomsLevel}): ${item.question}\n\nAnswer:\n${item.answer}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      id={`q-${item.part}-${item.qNo}`}
      className={`p-6 rounded-xl border transition-all ${
        isCompleted
          ? 'bg-white border-emerald-200 shadow-xs'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      {/* Top Metadata Line — Zero-pill unboxed typography */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Part {item.part}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-indigo-600 font-medium">Q.{item.qNo}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-slate-700">{item.courseOutcome}</span>
          <span aria-hidden="true">·</span>
          <span>
            {item.bloomsLevel} ({item.bloomsLabel})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            title="Copy question and answer"
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors cursor-pointer ${
              isBookmarked
                ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Saved to bookmarks' : 'Save question'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600' : ''}`} />
            <span className="text-[11px]">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Mastered' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>

      {/* Question Title */}
      <h3 className="text-base font-semibold text-slate-900 leading-snug mb-3 text-wrap-balance">
        {item.question}
      </h3>

      {/* Formula if present */}
      {item.formula && (
        <div className="my-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Key Formula
          </div>
          <div className="font-mono text-sm font-medium text-slate-900">
            {item.formula}
          </div>
        </div>
      )}

      {/* Answer Body */}
      <div className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
        {item.answer}
      </div>

      {/* Structured Table if present */}
      {item.tableData && (
        <div className="mt-4 overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                {item.tableData.headers.map((h, i) => (
                  <th key={i} className="px-3.5 py-2.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {item.tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/60">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ASCII Diagram if present */}
      {item.diagramAscii && (
        <div className="mt-4 p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto">
          <pre>{item.diagramAscii}</pre>
        </div>
      )}

      {/* Key Takeaways if present */}
      {item.keyTakeaways && item.keyTakeaways.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-600">Key Focus:</span>
          {item.keyTakeaways.map((point, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span>•</span>
              <span>{point}</span>
            </span>
          ))}
        </div>
      )}
    </article>
  );
};
