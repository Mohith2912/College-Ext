import React, { useEffect, useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award, 
  CheckCircle,
  ExternalLink,
  Code
} from 'lucide-react';
import { COMPLETE_EXAM_QUESTIONS } from '../data/completeExamQuestions';
import { ExamQuestion, UnitId } from '../types/concept';

interface ExamQuestionBankProps {
  onOpenCaseStudy?: (caseId: string) => void;
  onOpenFillups?: () => void;
  selectedUnit: UnitId | 'all';
  locked?: boolean;
}

export const ExamQuestionBank: React.FC<ExamQuestionBankProps> = ({
  onOpenCaseStudy,
  onOpenFillups,
  selectedUnit,
  locked = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [selectedBlooms, setSelectedBlooms] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(COMPLETE_EXAM_QUESTIONS[0]?.id || null);

  const filteredQuestions = useMemo(() => {
    return COMPLETE_EXAM_QUESTIONS.filter((q) => {
      if (selectedUnit !== 'all' && q.unit !== selectedUnit) return false;
      if (selectedPart !== 'all' && q.part !== selectedPart) return false;
      if (selectedBlooms !== 'all' && q.blooms !== selectedBlooms) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchText = q.questionText.toLowerCase().includes(query);
        const matchAnswer = q.modelAnswer.toLowerCase().includes(query);
        const matchNum = q.questionNumber.toLowerCase().includes(query);
        if (!matchText && !matchAnswer && !matchNum) return false;
      }
      return true;
    });
  }, [selectedUnit, selectedPart, selectedBlooms, searchQuery]);

  useEffect(() => {
    if (filteredQuestions.length > 0 && !filteredQuestions.some((question) => question.id === expandedId)) {
      setExpandedId(filteredQuestions[0].id);
    }
  }, [expandedId, filteredQuestions]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Anna University Curriculum</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono font-semibold text-slate-700">2321CSC304R</span>
              <span aria-hidden="true">·</span>
              <span>R 2023-V 1.2</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {locked && selectedUnit !== 'all' ? `${selectedUnit.replace('-', ' ')} Examination Question Bank` : 'University Examination Question Bank & Rubrics'}
            </h1>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {filteredQuestions.length} Questions Available
          </span>
        </div>

        {/* Filter Controls Strip */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by question, keyword (e.g. Scanner, Palindrome)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Part Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <span className="text-slate-500 px-1 font-medium">Part:</span>
              <button
                onClick={() => setSelectedPart('all')}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedPart === 'all' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedPart('Part A')}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedPart === 'Part A' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Part A (2M)
              </button>
              <button
                onClick={() => setSelectedPart('Part B')}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedPart === 'Part B' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Part B (13M)
              </button>
              <button
                onClick={() => setSelectedPart('Part C')}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedPart === 'Part C' ? 'bg-white font-medium text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Part C (15M Case)
              </button>
            </div>

            {/* Bloom's Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <span className="text-slate-500 px-1 font-medium">Bloom's:</span>
              {(['all', 'K1', 'K2', 'K3', 'K4', 'K5'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlooms(b)}
                  className={`px-1.5 py-1 rounded transition-colors ${
                    selectedBlooms === b ? 'bg-white font-semibold text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b === 'all' ? 'All' : b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{q.unit}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-600">{q.part}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-rose-600 font-bold">{q.blooms}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono font-medium text-slate-800">{q.marks} Marks</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.questionNumber}. {q.questionText}
                    </h3>
                  </div>

                  <div className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Answer & Marking Scheme */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50/40 space-y-4 text-xs animate-in fade-in">
                    {/* Marking Scheme Breakdown */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-rose-600" />
                        Question-bank answer coverage ({q.marks} Marks):
                      </h4>
                      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <tbody className="divide-y divide-slate-100">
                            {q.markingScheme.map((m, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="py-2 px-3 flex items-center gap-2">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{m.item}</span>
                                </td>
                                <td className="py-2 px-3 text-right font-mono font-bold text-slate-800 w-24">
                                  {m.marks} Mark{m.marks > 1 ? 's' : ''}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Model Answer */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-rose-600" />
                        Model Solution & Key Points:
                      </h4>
                      <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-line">
                        {q.modelAnswer}
                      </div>
                    </div>

                    {/* Quick navigation actions */}
                    {q.part === 'Part C' && onOpenCaseStudy && (
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => {
                            if (q.questionNumber === 'Q1' && q.unit === 'Unit-1') {
                              onOpenCaseStudy('electricity_bill');
                            } else if (q.questionNumber === 'Q2' && q.unit === 'Unit-1') {
                              onOpenCaseStudy('employee_payroll');
                            } else if (q.questionNumber === 'Q1' && q.unit === 'Unit-2') {
                              onOpenCaseStudy('oop_modularity');
                            } else if (q.questionNumber === 'Q2' && q.unit === 'Unit-2') {
                              onOpenCaseStudy('string_processor');
                            }
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Launch Interactive Case Simulator</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
              No examination questions match the active filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
