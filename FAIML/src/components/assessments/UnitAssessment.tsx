/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { unitAssessments, courseManifest } from '../../data/manifest';

interface UnitAssessmentProps {
  initialUnitNumber?: number;
  onSaveScore: (unitNumber: number, percentage: number) => void;
  savedScores: Record<string, number>;
}

export const UnitAssessment: React.FC<UnitAssessmentProps> = ({
  initialUnitNumber = 1,
  onSaveScore,
  savedScores
}) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(initialUnitNumber);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = unitAssessments[selectedUnit] || unitAssessments[1];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleGradeAssessment = () => {
    setShowResults(true);
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    onSaveScore(selectedUnit, percentage);

    if (percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const calculatedScore = questions.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((calculatedScore / questions.length) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Formative Knowledge Assessment · Bloom\'s Taxonomy
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Unit Examination Knowledge Check
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test conceptual retention, numerical calculations, and scenario prediction across CO1–CO5.
          </p>
        </div>

        {/* Unit Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs">
          {[1, 2, 3, 4, 5].map(uNum => {
            const isSelected = selectedUnit === uNum;
            const pastScore = savedScores[uNum];
            return (
              <button
                key={uNum}
                onClick={() => {
                  setSelectedUnit(uNum);
                  setUserAnswers({});
                  setShowResults(false);
                }}
                className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Unit {uNum}</span>
                {pastScore !== undefined && (
                  <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {pastScore}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions Form */}
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {questions.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-red-50/40 border-red-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Question Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-slate-700">Question {idx + 1} of {questions.length}</span>
                <span>·</span>
                <span className="font-mono text-indigo-600">{q.co}</span>
                <span>·</span>
                <span>{q.bloomLevel}</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-4">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isChecked = selectedOption === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-100 border-emerald-300 text-emerald-900 font-semibold';
                    } else if (isChecked && !isThisCorrect) {
                      optionStyle = 'bg-red-100 border-red-300 text-red-900 line-through';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isChecked) {
                    optionStyle = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className="font-mono font-bold text-slate-400 shrink-0">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pedagogical Explanation Reveal */}
              {showResults && (
                <div className={`mt-4 pt-3 border-t text-xs leading-relaxed ${
                  isCorrect ? 'border-emerald-200 text-emerald-800' : 'border-red-200 text-slate-700'
                }`}>
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>Explanation:</span>
                      </>
                    )}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer Score & Action Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {showResults ? (
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                <Award className={`w-6 h-6 ${scorePercent >= 80 ? 'text-amber-500' : 'text-slate-400'}`} />
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Evaluation Result</div>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    {calculatedScore} / {questions.length} ({scorePercent}%)
                  </div>
                </div>
              </div>

              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              {Object.keys(userAnswers).length} of {questions.length} questions attempted.
            </div>
          )}

          {!showResults && (
            <button
              onClick={handleGradeAssessment}
              disabled={Object.keys(userAnswers).length === 0}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>Submit & Grade Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
