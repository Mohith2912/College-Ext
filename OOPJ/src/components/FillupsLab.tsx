import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Terminal, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Code, 
  BookOpen,
  Filter,
  Check
} from 'lucide-react';
import { ALL_FILLUPS } from '../units/allUnitsData';
import { FillupExercise, UnitId } from '../types/concept';

interface FillupsLabProps {
  selectedUnit: UnitId | 'all';
  locked?: boolean;
}

export const FillupsLab: React.FC<FillupsLabProps> = ({ selectedUnit, locked = false }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<UnitId | 'all'>(selectedUnit);
  const [selectedBloomsFilter, setSelectedBloomsFilter] = useState<string>('all');

  // Filtered exercises list
  const filteredExercises = useMemo(() => {
    return ALL_FILLUPS.filter((ex) => {
      if (selectedUnitFilter !== 'all' && ex.unit !== selectedUnitFilter) return false;
      if (selectedBloomsFilter !== 'all' && ex.blooms !== selectedBloomsFilter) return false;
      return true;
    });
  }, [selectedUnitFilter, selectedBloomsFilter]);

  React.useEffect(() => {
    if (locked && selectedUnit !== 'all') {
      setSelectedUnitFilter(selectedUnit);
      setCurrentIdx(0);
    }
  }, [locked, selectedUnit]);

  // Active exercise safe fallback
  const exercise: FillupExercise = filteredExercises[currentIdx] || filteredExercises[0] || ALL_FILLUPS[0];

  // User input states: blankId -> string
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [evaluated, setEvaluated] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [completedList, setCompletedList] = useState<Set<string>>(new Set());

  const handleInputChange = (blankId: string, val: string) => {
    setUserInputs((prev) => ({ ...prev, [blankId]: val }));
    setEvaluated(false);
  };

  const handleSelectToken = (token: string) => {
    // Fill into first empty blank or the first blank
    for (const blank of exercise.blanks) {
      if (!userInputs[blank.id] || userInputs[blank.id].trim() === '') {
        handleInputChange(blank.id, token);
        return;
      }
    }
    // If all are filled, update blank_1
    handleInputChange(exercise.blanks[0].id, token);
  };

  const isBlankCorrect = (blankId: string) => {
    const blank = exercise.blanks.find((b) => b.id === blankId);
    if (!blank) return false;
    const userVal = (userInputs[blankId] || '').trim().toLowerCase().replace(/\s+/g, '');
    return blank.expected.some((exp) => exp.toLowerCase().replace(/\s+/g, '') === userVal);
  };

  const allCorrect = exercise.blanks.every((b) => isBlankCorrect(b.id));

  const handleValidate = () => {
    setEvaluated(true);
    if (allCorrect) {
      setCompletedList((prev) => new Set([...prev, exercise.id]));
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setUserInputs({});
    setEvaluated(false);
    setShowExplanation(false);
    setShowHint(false);
  };

  const handleSelectExercise = (idx: number) => {
    handleReset();
    setCurrentIdx(idx);
  };

  const handleNext = () => {
    handleReset();
    setCurrentIdx((prev) => (prev + 1) % filteredExercises.length);
  };

  // Render code template with inline fields
  const renderInteractiveCode = () => {
    const parts = exercise.codeTemplate.split(/(\{\{blank_\d+\}\})/g);

    return parts.map((part, index) => {
      const match = part.match(/\{\{(blank_\d+)\}\}/);
      if (match) {
        const blankId = match[1];
        const blankDef = exercise.blanks.find((b) => b.id === blankId);
        const val = userInputs[blankId] || '';
        const correct = evaluated && isBlankCorrect(blankId);
        const incorrect = evaluated && !isBlankCorrect(blankId);

        return (
          <span key={index} className="inline-block mx-1 align-middle">
            <input
              type="text"
              value={val}
              onChange={(e) => handleInputChange(blankId, e.target.value)}
              placeholder={blankDef?.placeholder || '____'}
              className={`px-2.5 py-1 font-mono text-xs rounded border transition-all text-center min-w-[120px] ${
                correct
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold ring-1 ring-emerald-500'
                  : incorrect
                  ? 'bg-red-950 text-red-300 border-red-500'
                  : 'bg-slate-800 text-amber-300 border-slate-700 hover:border-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
              }`}
            />
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Lab Header & Question Bank Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Anna University QB</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{exercise.unit}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-700 font-bold">{exercise.blooms}</span>
              <span aria-hidden="true">·</span>
              <span>15 Fill-in-the-Blank Exam Exercises</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {exercise.title}
            </h1>
          </div>

          {/* Quick Filters */}
          {!locked && <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => {
                  setSelectedUnitFilter('all');
                  setCurrentIdx(0);
                }}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedUnitFilter === 'all' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Units
              </button>
              {(['Unit-1', 'Unit-2', 'Unit-3', 'Unit-4', 'Unit-5'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => {
                    setSelectedUnitFilter(u);
                    setCurrentIdx(0);
                  }}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    selectedUnitFilter === u ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  U{u.split('-')[1]}
                </button>
              ))}
            </div>
          </div>}
        </div>

        {/* Exercise Jump Grid Strip */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Curriculum Question Bank Exercises:</span>
            <span className="font-mono text-[11px]">
              {completedList.size} / {ALL_FILLUPS.length} Completed
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredExercises.map((ex, i) => {
              const isCurrent = i === currentIdx;
              const isCompleted = completedList.has(ex.id);

              return (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExercise(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isCompleted && <Check className="w-3 h-3 text-emerald-600" />}
                  <span>Ex {i + 1}</span>
                  <span className="font-mono text-[10px] opacity-75">
                    {ex.blooms}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Problem Scenario & Context */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h3 className="font-bold text-slate-900">Engineering Problem Context:</h3>
              <p className="text-slate-600 leading-relaxed">{exercise.scenario}</p>
              <p className="font-semibold text-indigo-800 pt-1">
                Instruction: {exercise.instructions}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Code Editor Box */}
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-slate-300">
                Exercise_{currentIdx + 1}_{exercise.id}.java
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span>{showHint ? 'Hide Hints' : 'Instructor Hint'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed whitespace-pre">
            {renderInteractiveCode()}
          </div>
        </div>

        {/* Hint Callout */}
        {showHint && (
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1.5 animate-in fade-in">
            <span className="font-bold text-amber-900">Instructor Guidance & Hints:</span>
            <ul className="space-y-1 text-amber-800">
              {exercise.blanks.map((b, i) => (
                <li key={i}>
                  · Blank {i + 1}: {b.hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggested Draggable/Clickable Token Chips Pool */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Suggested Tokens (Click to insert into active blank):
            </span>
            <span className="text-slate-400 text-[11px]">Or type directly into the code blanks</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {exercise.optionsPool.map((token, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectToken(token)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 border border-slate-200 rounded-md font-mono text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls & Submission */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Blanks</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleValidate}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Verify & Execute Program</span>
            </button>

            {evaluated && allCorrect && (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer animate-in fade-in"
              >
                <span>Next Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Output & Explanation Console */}
        {evaluated && (
          <div
            className={`p-5 rounded-xl border space-y-4 animate-in fade-in ${
              allCorrect
                ? 'bg-emerald-50/50 border-emerald-300'
                : 'bg-red-50/50 border-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {allCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-900">
                    Program Successfully Compiled & Verified!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-bold text-red-900">
                    Compilation / Logic Mismatch Detected
                  </span>
                </>
              )}
            </div>

            {/* Simulated Terminal Output */}
            {allCorrect && (
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wide block mb-1">
                  JVM Console Execution Output:
                </span>
                <div className="bg-slate-950 text-emerald-400 p-3.5 rounded-lg font-mono text-xs whitespace-pre leading-relaxed border border-slate-800">
                  {exercise.expectedOutput}
                </div>
              </div>
            )}

            {/* Official Syllabus Explanation */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-1">
                Engineering Rationale & Exam Takeaway:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-200">
                {exercise.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
