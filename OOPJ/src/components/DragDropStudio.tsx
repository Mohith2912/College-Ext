import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle, 
  Award,
  GripVertical,
  Check,
  Sparkles
} from 'lucide-react';
import { DRAG_DROP_CHALLENGES } from '../data/dragDropData';
import { DragDropChallenge, UnitId } from '../types/concept';

interface DragDropStudioProps {
  selectedUnit: UnitId | 'all';
  locked?: boolean;
}

export const DragDropStudio: React.FC<DragDropStudioProps> = ({ selectedUnit, locked = false }) => {
  const availableChallenges = locked && selectedUnit !== 'all'
    ? DRAG_DROP_CHALLENGES.filter((item) => item.unit === selectedUnit)
    : DRAG_DROP_CHALLENGES;
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const challenge: DragDropChallenge = availableChallenges[currentChallengeIdx] ?? availableChallenges[0];

  React.useEffect(() => {
    setCurrentChallengeIdx(0);
  }, [selectedUnit]);

  // slotId -> itemId map
  const [placedItems, setPlacedItems] = useState<Record<string, string>>({});
  // dragging state
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  // selected for click-to-place fallback
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Available items not yet placed
  const placedItemIds = new Set(Object.values(placedItems));
  const availableItems = challenge.draggableItems.filter((item) => !placedItemIds.has(item.id));

  const handleDragStart = (itemId: string) => {
    setDraggedItemId(itemId);
  };

  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    setActiveSlotId(slotId);
  };

  const handleDragLeave = () => {
    setActiveSlotId(null);
  };

  const handleDrop = (slotId: string) => {
    if (draggedItemId) {
      setPlacedItems((prev) => ({ ...prev, [slotId]: draggedItemId }));
      setDraggedItemId(null);
      setActiveSlotId(null);
      setIsSubmitted(false);
    }
  };

  // Click-to-place fallback for touch or accessibility
  const handleItemClick = (itemId: string) => {
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  const handleSlotClick = (slotId: string) => {
    if (selectedItemId) {
      setPlacedItems((prev) => ({ ...prev, [slotId]: selectedItemId }));
      setSelectedItemId(null);
      setIsSubmitted(false);
    } else if (placedItems[slotId]) {
      // Click placed item to unplace it
      const copy = { ...placedItems };
      delete copy[slotId];
      setPlacedItems(copy);
      setIsSubmitted(false);
    }
  };

  const handleUnplace = (slotId: string) => {
    const copy = { ...placedItems };
    delete copy[slotId];
    setPlacedItems(copy);
    setIsSubmitted(false);
  };

  const handleReset = () => {
    setPlacedItems({});
    setIsSubmitted(false);
    setSelectedItemId(null);
  };

  const isSlotCorrect = (slotId: string) => {
    const slot = challenge.targetSlots.find((s) => s.id === slotId);
    if (!slot) return false;
    return placedItems[slotId] === slot.acceptId;
  };

  const correctCount = challenge.targetSlots.filter((s) => isSlotCorrect(s.id)).length;
  const isAllCorrect = correctCount === challenge.targetSlots.length;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isAllCorrect) {
      setCompletedChallenges((prev) => new Set([...prev, challenge.id]));
    }
  };

  const handleNextChallenge = () => {
    handleReset();
    setCurrentChallengeIdx((prev) => (prev + 1) % availableChallenges.length);
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Challenge Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{challenge.unit}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-700 font-semibold">{challenge.blooms}</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Concept Map Construction</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {challenge.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {availableChallenges.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  handleReset();
                  setCurrentChallengeIdx(idx);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  idx === currentChallengeIdx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : completedChallenges.has(ch.id)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Challenge {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions banner */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-slate-900">Task Objective:</p>
            <p className="text-slate-600 leading-relaxed">{challenge.description}</p>
            <p className="text-[11px] text-indigo-700 font-medium pt-1">
              Tip: Drag items into target slots, or click an item below and click a slot to assign.
            </p>
          </div>
        </div>

        {/* 2-Zone Layout: Target Slots (Left/Top) vs Draggable Items Pool (Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Target Slots Container */}
          <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Target Architecture Slots
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {Object.keys(placedItems).length} of {challenge.targetSlots.length} Placed
              </span>
            </div>

            <div className="space-y-3">
              {challenge.targetSlots.map((slot) => {
                const placedItemId = placedItems[slot.id];
                const placedItem = challenge.draggableItems.find((i) => i.id === placedItemId);
                const isCorrect = isSubmitted && isSlotCorrect(slot.id);
                const isIncorrect = isSubmitted && placedItemId && !isSlotCorrect(slot.id);

                return (
                  <div
                    key={slot.id}
                    onDragOver={(e) => handleDragOver(e, slot.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={() => handleDrop(slot.id)}
                    onClick={() => handleSlotClick(slot.id)}
                    className={`p-3.5 rounded-lg border-2 transition-all cursor-pointer ${
                      activeSlotId === slot.id
                        ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                        : isCorrect
                        ? 'border-emerald-500 bg-emerald-50/40'
                        : isIncorrect
                        ? 'border-rose-500 bg-rose-50/40'
                        : placedItem
                        ? 'border-indigo-200 bg-slate-50/70'
                        : selectedItemId
                        ? 'border-dashed border-indigo-400 bg-indigo-50/20 hover:bg-indigo-50/40'
                        : 'border-dashed border-slate-300 bg-slate-50/50 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-900">{slot.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{slot.category}</span>
                    </div>

                    {placedItem ? (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-md border border-slate-200 shadow-xs">
                        <div>
                          <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                            {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            {isIncorrect && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                            <span>{placedItem.label}</span>
                          </div>
                          {placedItem.sublabel && (
                            <p className="text-[11px] text-slate-500 mt-0.5">{placedItem.sublabel}</p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnplace(slot.id);
                          }}
                          className="text-[11px] text-slate-400 hover:text-rose-600 px-2 py-0.5 rounded cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic py-1 flex items-center justify-between">
                        <span>{slot.hint}</span>
                        <span className="text-[10px] text-indigo-500 font-medium">
                          {selectedItemId ? 'Click to assign' : 'Drop item here'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Draggable Component Pool */}
          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Available Conceptual Elements
              </h3>
              <span className="text-xs text-slate-400">{availableItems.length} remaining</span>
            </div>

            <div className="space-y-2">
              {availableItems.map((item) => {
                const isSelected = selectedItemId === item.id;

                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onClick={() => handleItemClick(item.id)}
                    className={`p-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing select-none ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                        : 'border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-slate-900 block">{item.label}</span>
                        {item.sublabel && (
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {item.sublabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {availableItems.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500 italic bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  All elements have been placed! Click "Verify & Check Architecture" to grade your concept map.
                </div>
              )}
            </div>

            {/* Submit & Reset Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Map</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={Object.keys(placedItems).length === 0}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Verify & Check Architecture</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grade & Explanation Feedback */}
        {isSubmitted && (
          <div
            className={`p-5 rounded-xl border space-y-3 animate-in fade-in ${
              isAllCorrect
                ? 'bg-emerald-50/50 border-emerald-300'
                : 'bg-amber-50/60 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isAllCorrect ? (
                  <>
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-900">
                      Perfect Concept Architecture Verified! ({correctCount} / {challenge.targetSlots.length})
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-bold text-amber-900">
                      Concept Alignment Review ({correctCount} / {challenge.targetSlots.length} Correct)
                    </span>
                  </>
                )}
              </div>

              {isAllCorrect && (
                <button
                  onClick={handleNextChallenge}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-200">
              {challenge.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
