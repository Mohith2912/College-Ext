import React, { useState } from 'react';
import { Crown, Sparkles, AlertTriangle, RotateCcw } from 'lucide-react';
import { soundFx } from '../../lib/sound';

interface ChessboardVisualizerProps {
  n: number;
  board: number[][]; // n x n matrix of 0/1
  currentRow: number;
  currentCol: number | null;
  conflictLocation?: [number, number];
  solutionCount: number;
  isSolved: boolean;
}

export const ChessboardVisualizer: React.FC<ChessboardVisualizerProps> = ({
  n,
  board: autoBoard,
  currentRow,
  currentCol,
  conflictLocation,
  solutionCount,
  isSolved,
}) => {
  // Manual Interactive Challenge Mode
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [manualQueens, setManualQueens] = useState<{ row: number; col: number }[]>([]);

  // Function to check threats in manual mode
  const getManualConflicts = () => {
    const conflicts = new Set<string>();
    for (let i = 0; i < manualQueens.length; i++) {
      for (let j = i + 1; j < manualQueens.length; j++) {
        const q1 = manualQueens[i];
        const q2 = manualQueens[j];

        // Same row, same col, or same diagonal
        const sameRow = q1.row === q2.row;
        const sameCol = q1.col === q2.col;
        const sameDiag = Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col);

        if (sameRow || sameCol || sameDiag) {
          conflicts.add(`${q1.row},${q1.col}`);
          conflicts.add(`${q2.row},${q2.col}`);
        }
      }
    }
    return conflicts;
  };

  const manualConflicts = getManualConflicts();
  const manualSuccess = manualQueens.length === n && manualConflicts.size === 0;

  const handleCellClick = (r: number, c: number) => {
    if (!isManualMode) return;

    const existingIdx = manualQueens.findIndex((q) => q.row === r && q.col === c);
    if (existingIdx !== -1) {
      // Remove queen
      const next = manualQueens.filter((_, idx) => idx !== existingIdx);
      setManualQueens(next);
      soundFx.playStep();
    } else {
      // Place queen
      const next = [...manualQueens, { row: r, col: c }];
      setManualQueens(next);
      soundFx.playStep();
      if (next.length === n) {
        soundFx.playSuccess();
      }
    }
  };

  // Build grid based on mode
  const activeGrid: number[][] = isManualMode
    ? Array.from({ length: n }, (_, r) =>
        Array.from({ length: n }, (_, c) => (manualQueens.some((q) => q.row === r && q.col === c) ? 1 : 0))
      )
    : autoBoard;

  return (
    <div className="flex flex-col gap-3.5 p-5 bg-white border border-slate-200 rounded-xl shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase tracking-wider text-slate-700 text-xs">
            N-Queens Board ({n} × {n})
          </span>
          {isSolved && !isManualMode && (
            <span className="text-emerald-700 font-bold font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ★ Solution #{solutionCount} Verified
            </span>
          )}
        </div>

        {/* Mode Toggle between Auto-Solve and Manual Challenge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md text-xs">
            <button
              onClick={() => setIsManualMode(false)}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                !isManualMode
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Algorithm Tracing
            </button>
            <button
              onClick={() => setIsManualMode(true)}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                isManualMode
                  ? 'bg-white text-sky-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Interactive Challenge</span>
            </button>
          </div>

          {isManualMode && (
            <button
              onClick={() => {
                setManualQueens([]);
                soundFx.playStep();
              }}
              className="p-1 text-slate-500 hover:text-slate-900 rounded bg-slate-100 hover:bg-slate-200"
              title="Reset Board"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Manual Mode Banner */}
      {isManualMode && (
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs flex items-center justify-between">
          <div className="text-sky-950 font-medium">
            <span>Challenge: Click squares to place </span>
            <strong className="text-sky-900 font-bold">{n} queens</strong>
            <span> with zero column or diagonal attacks.</span>
          </div>
          <div className="font-mono font-bold text-sky-900">
            {manualQueens.length} / {n} Placed
          </div>
        </div>
      )}

      {manualSuccess && isManualMode && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Brilliant! You placed all {n} Queens safely with zero attacks!</span>
        </div>
      )}

      {/* Chessboard */}
      <div className="flex justify-center p-3 bg-slate-50/70 border border-slate-200 rounded-lg">
        <div
          className="grid border-2 border-slate-800 rounded-lg shadow-md overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
            width: `${Math.min(n * 54, 420)}px`,
            height: `${Math.min(n * 54, 420)}px`,
          }}
        >
          {activeGrid.map((rowArr, rIdx) =>
            rowArr.map((hasQueen, cIdx) => {
              const isDark = (rIdx + cIdx) % 2 === 1;
              const isCurrentCell = !isManualMode && currentRow === rIdx && currentCol === cIdx;
              const isAutoConflict =
                !isManualMode &&
                conflictLocation &&
                conflictLocation[0] === rIdx &&
                conflictLocation[1] === cIdx;
              const isManualConflict = isManualMode && manualConflicts.has(`${rIdx},${cIdx}`);

              let cellBg = isDark ? 'bg-amber-100/70' : 'bg-amber-50/30';
              if (isAutoConflict || isManualConflict) {
                cellBg = 'bg-rose-200 ring-2 ring-rose-500';
              } else if (isCurrentCell) {
                cellBg = 'bg-sky-200 ring-2 ring-sky-500';
              }

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  className={`flex items-center justify-center border border-slate-300/80 relative select-none transition-colors duration-150 ${
                    isManualMode ? 'cursor-pointer hover:bg-sky-100/60' : ''
                  } ${cellBg}`}
                >
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-slate-400 select-none">
                    {rIdx},{cIdx}
                  </span>

                  {hasQueen === 1 && (
                    <Crown
                      className={`w-6 h-6 transition-transform ${
                        isAutoConflict || isManualConflict
                          ? 'text-rose-700 scale-110'
                          : 'text-slate-900 fill-amber-400'
                      }`}
                    />
                  )}
                  {isCurrentCell && hasQueen === 0 && (
                    <div className="w-3 h-3 rounded-full bg-sky-500/50" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
        <span>Rows: 0 to {n - 1} · Columns: 0 to {n - 1}</span>
        <span>Combinatorial bounds: {n}! maximum leaf states</span>
      </div>
    </div>
  );
};
