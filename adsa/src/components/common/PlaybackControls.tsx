import React, { useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
  Keyboard,
} from 'lucide-react';
import { soundFx } from '../../lib/sound';

interface PlaybackControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number; // in ms
  onPlay: () => void;
  onPause: () => void;
  onStepNext: () => void;
  onStepPrev: () => void;
  onReset: () => void;
  onJumpToEnd: () => void;
  onChangeSpeed: (speedMs: number) => void;
  onSeek: (stepIndex: number) => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onPlay,
  onPause,
  onStepNext,
  onStepPrev,
  onReset,
  onJumpToEnd,
  onChangeSpeed,
  onSeek,
}) => {
  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= totalSteps - 1;

  // Global keyboard shortcuts for playback controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          onPause();
        } else if (!isAtEnd) {
          onPlay();
          soundFx.playStep();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (!isAtEnd) {
          onStepNext();
          soundFx.playStep();
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (!isAtStart) {
          onStepPrev();
          soundFx.playStep();
        }
      } else if (e.key.toLowerCase() === 'r') {
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isAtEnd, isAtStart, onPause, onPlay, onStepNext, onStepPrev, onReset]);

  return (
    <div className="flex flex-col gap-2.5 p-3.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Step Scrubber / Progress Slider */}
        <div className="w-full sm:flex-1 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={Math.max(totalSteps - 1, 0)}
            value={currentStep}
            onChange={(e) => {
              onSeek(Number(e.target.value));
              soundFx.playStep();
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600 focus:outline-hidden"
          />
          <span className="text-xs font-mono tabular-nums text-slate-700 font-semibold whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
            Step {totalSteps > 0 ? currentStep + 1 : 0} of {totalSteps}
          </span>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-xs shrink-0">
          <span className="text-[10px] text-slate-500 uppercase font-mono px-1">Speed:</span>
          <button
            onClick={() => onChangeSpeed(1200)}
            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
              playbackSpeed === 1200
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            0.5×
          </button>
          <button
            onClick={() => onChangeSpeed(650)}
            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
              playbackSpeed === 650
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1×
          </button>
          <button
            onClick={() => onChangeSpeed(300)}
            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
              playbackSpeed === 300
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2×
          </button>
          <button
            onClick={() => onChangeSpeed(100)}
            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
              playbackSpeed === 100
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5×
          </button>
        </div>
      </div>

      {/* Button Toolbar */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              onReset();
            }}
            disabled={isAtStart}
            title="Reset (Key: R)"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onStepPrev();
              soundFx.playStep();
            }}
            disabled={isAtStart}
            title="Step Backward (Key: ←)"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {isPlaying ? (
            <button
              onClick={onPause}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onPlay();
                soundFx.playStep();
              }}
              disabled={isAtEnd}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Play</span>
            </button>
          )}

          <button
            onClick={() => {
              onStepNext();
              soundFx.playStep();
            }}
            disabled={isAtEnd}
            title="Step Forward (Key: →)"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onJumpToEnd();
              soundFx.playSuccess();
            }}
            disabled={isAtEnd}
            title="Run to Completion"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <Keyboard className="w-3.5 h-3.5 text-slate-400" />
          <span>Space (Play) · ← / → (Step) · R (Reset)</span>
        </div>
      </div>
    </div>
  );
};
