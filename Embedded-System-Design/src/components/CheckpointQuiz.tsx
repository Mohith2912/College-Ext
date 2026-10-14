import React, { useState } from 'react';
import { CheckpointQuestion } from '../types/embedded';
import { HelpCircle, CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';

interface CheckpointQuizProps {
  checkpoint: CheckpointQuestion;
  unitNumber: number;
  onRetest?: () => void;
  onNextUnit?: () => void;
  isLastUnit?: boolean;
}

export const CheckpointQuiz: React.FC<CheckpointQuizProps> = ({
  checkpoint,
  unitNumber,
  onRetest,
  onNextUnit,
  isLastUnit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    if (!submitted) {
      setSelectedOptionId(id);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionId) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
    if (onRetest) onRetest();
  };

  const selectedOption = checkpoint.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            Unit {unitNumber} Interactive Checkpoint
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">Concept Verification & Misconception Buster</span>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Try Again
          </button>
        )}
      </div>

      {/* Scenario Context */}
      <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed">
        <strong className="text-slate-900 font-bold">Real-Life Incident Scenario: </strong>
        {checkpoint.contextScenario}
      </div>

      {/* The Question */}
      <div className="mt-5">
        <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-start gap-2.5">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <span>{checkpoint.question}</span>
        </h3>
      </div>

      {/* Option Cards */}
      <div className="mt-6 space-y-3">
        {checkpoint.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          let borderClass = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

          if (submitted) {
            if (option.isCorrect) {
              borderClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-200';
            } else if (isSelected && !option.isCorrect) {
              borderClass = 'border-rose-400 bg-rose-50/70 text-rose-900 ring-2 ring-rose-200';
            } else {
              borderClass = 'border-slate-200 bg-slate-50/40 opacity-50 text-slate-500';
            }
          } else if (isSelected) {
            borderClass = 'border-indigo-600 bg-indigo-50/50 text-indigo-950 ring-2 ring-indigo-200';
          }

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`p-4 rounded-xl border text-xs md:text-sm cursor-pointer transition-all shadow-2xs ${borderClass}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <div className="flex-1">
                  <div className="font-semibold leading-relaxed">{option.text}</div>

                  {/* Feedback explanation after submit */}
                  {submitted && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-xs">
                      {option.isCorrect ? (
                        <div className="text-emerald-800 flex items-start gap-1.5 font-medium">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                          <span>{option.explanation}</span>
                        </div>
                      ) : isSelected ? (
                        <div className="text-rose-800 flex items-start gap-1.5 font-medium">
                          <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                          <span>{option.explanation}</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs text-white shadow-sm transition-all flex items-center gap-2"
          >
            <span>Verify Answer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Post-submission Deep Dive */}
      {submitted && (
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
          {/* Engineering Takeaway */}
          <div className="p-4.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 font-mono">
                Real-World Engineering Takeaway
              </div>
              <p className="text-xs md:text-sm text-slate-800 mt-1 leading-relaxed font-medium">
                {checkpoint.engineeringTakeaway}
              </p>
            </div>
          </div>

          {/* Misconception Alert */}
          <div className="p-4.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                Common Student Misconception Alert
              </div>
              <p className="text-xs md:text-sm text-amber-900 mt-1 leading-relaxed">
                {checkpoint.misconceptionAlert}
              </p>
            </div>
          </div>

          {/* Navigation to Next Unit if available */}
          {onNextUnit && !isLastUnit && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={onNextUnit}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-xs text-white shadow-sm transition-all flex items-center gap-2"
              >
                <span>Continue to Unit {unitNumber + 1} →</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
