import React from 'react';
import { PowerRecursionFrame } from '../../engines/foundations';
import { Layers } from 'lucide-react';

interface CallStackVisualizerProps {
  x: number;
  n: number;
  callStack: PowerRecursionFrame[];
  activeCallId: number;
  finalResult: number | null;
}

export const CallStackVisualizer: React.FC<CallStackVisualizerProps> = ({
  x,
  n,
  callStack,
  activeCallId,
  finalResult,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          <span>Recursive Call Stack Memory Buffer (Recurrence: T(n) = T(n-1) + 1)</span>
        </span>
        <span className="font-mono text-purple-700 font-semibold">
          Stack Depth: {callStack.length} Frame(s) / Max: {n + 1}
        </span>
      </div>

      <div className="flex flex-col-reverse gap-2 bg-white border border-slate-200 rounded-md p-4 min-h-[220px] justify-start overflow-y-auto max-h-[320px]">
        {callStack.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400 italic">
            {finalResult !== null
              ? `Call stack fully unwound! Computed output: ${x}^${n} = ${finalResult}`
              : 'Call stack is empty. Click Play or Step Next to begin.'}
          </div>
        ) : (
          callStack.map((frame, idx) => {
            const isTop = idx === callStack.length - 1;
            const isBase = frame.n === 0;

            let frameBg = 'bg-slate-50 border-slate-200 text-slate-800';
            if (isTop) {
              frameBg = 'bg-sky-50 border-sky-400 text-sky-950 ring-2 ring-sky-300 shadow-sm';
            } else if (frame.state === 'returned') {
              frameBg = 'bg-emerald-50 border-emerald-300 text-emerald-950';
            }

            return (
              <div
                key={frame.callId}
                className={`p-3 rounded-lg border font-mono text-xs flex items-center justify-between transition-all ${frameBg}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 select-none">
                    Frame #{frame.callId}
                  </span>
                  <span className="font-bold text-sm">
                    power(x={frame.x}, n={frame.n})
                  </span>
                  {isBase && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-sans font-semibold">
                      Base Case (n=0)
                    </span>
                  )}
                </div>

                <div className="text-right">
                  {frame.returnedValue !== undefined ? (
                    <span className="font-bold text-emerald-700">
                      Returns: {frame.returnedValue}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">
                      Waiting for power({frame.x}, {frame.n - 1})
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between">
        <span>Base of Stack: power({x}, {n}) [First Invocation]</span>
        <span>Top of Stack: Active Function Execution Context</span>
      </div>
    </div>
  );
};
