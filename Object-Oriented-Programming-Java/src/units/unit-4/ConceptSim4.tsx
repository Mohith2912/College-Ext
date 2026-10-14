import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Layers, 
  HardDrive, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert,
  Zap,
  Play
} from 'lucide-react';

export const ConceptSim4: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack_unwinding' | 'buffering_throughput'>('stack_unwinding');

  // --- EXCEPTION STACK PROPAGATION ---
  const [selectedError, setSelectedError] = useState<'custom_book' | 'divide_zero' | 'array_index'>('custom_book');
  const [unwindingStep, setUnwindingStep] = useState<number>(0);

  const errorScenarios = {
    custom_book: {
      type: 'BookNotAvailableException',
      category: 'Checked Domain Exception',
      throwLocation: 'validateAvailability()',
      caughtLocation: 'main() try-catch',
      message: 'Book #104 is already borrowed by another student!',
      handledGracefully: true
    },
    divide_zero: {
      type: 'ArithmeticException (/ by zero)',
      category: 'Unchecked Runtime Exception',
      throwLocation: 'computeAverage()',
      caughtLocation: 'main() try-catch',
      message: 'Division by zero: studentCount == 0!',
      handledGracefully: true
    },
    array_index: {
      type: 'ArrayIndexOutOfBoundsException',
      category: 'Unchecked Runtime Exception',
      throwLocation: 'accessBookIndex()',
      caughtLocation: 'main() try-catch',
      message: 'Index 5 out of bounds for length 3!',
      handledGracefully: true
    }
  };

  // --- BUFFERING THROUGHPUT SIMULATOR ---
  const [fileSizeBytes, setFileSizeBytes] = useState<number>(8192); // 8 KB
  const unbufferedSeeks = fileSizeBytes;
  const bufferedSeeks = Math.ceil(fileSizeBytes / 8192);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Unit 4 · Exception Call Stack & Stream Buffering
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('stack_unwinding')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'stack_unwinding' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Exception Stack Unwinding
          </button>
          <button
            onClick={() => setActiveTab('buffering_throughput')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'buffering_throughput' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            I/O Buffering Simulator
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* --- TAB 1: CALL STACK UNWINDING --- */}
        {activeTab === 'stack_unwinding' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Call Stack Frame Unwinding & The "finally" Guarantee
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Watch an exception bubble up through stack frames until intercepted by a catch handler.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setUnwindingStep((s) => (s < 3 ? s + 1 : 0))}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {unwindingStep === 3 ? 'Reset Stack' : 'Step Exception Propagation'}
                </button>
              </div>
            </div>

            {/* Error Type Selector */}
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => { setSelectedError('custom_book'); setUnwindingStep(0); }}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  selectedError === 'custom_book' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                1. Custom BookNotAvailableException
              </button>
              <button
                onClick={() => { setSelectedError('divide_zero'); setUnwindingStep(0); }}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  selectedError === 'divide_zero' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                2. Unchecked ArithmeticException
              </button>
              <button
                onClick={() => { setSelectedError('array_index'); setUnwindingStep(0); }}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  selectedError === 'array_index' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                3. ArrayIndexOutOfBoundsException
              </button>
            </div>

            {/* Visual Call Stack Representation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Stack Frames Column */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  JVM Execution Call Stack (Top to Bottom):
                </span>

                {/* Frame 3: Deepest method where error triggers */}
                <div className={`p-3.5 rounded-xl border font-mono text-xs transition-all ${
                  unwindingStep === 1
                    ? 'bg-red-50 border-red-500 ring-2 ring-red-400 text-red-950 font-bold'
                    : unwindingStep > 1
                    ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Frame 3: {errorScenarios[selectedError].throwLocation}</span>
                    <span>Top of Stack</span>
                  </div>
                  <div className="text-[11px]">throw new {errorScenarios[selectedError].type}</div>
                </div>

                {/* Frame 2: Caller method */}
                <div className={`p-3.5 rounded-xl border font-mono text-xs transition-all ${
                  unwindingStep === 2
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 text-amber-950 font-bold'
                    : unwindingStep > 2
                    ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Frame 2: processRequest()</span>
                    <span>throws Exception</span>
                  </div>
                  <div className="text-[11px]">Uncaught here -&gt; Unwinds frame to caller</div>
                </div>

                {/* Frame 1: main method with try-catch-finally */}
                <div className={`p-3.5 rounded-xl border font-mono text-xs transition-all ${
                  unwindingStep === 3
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Frame 1: main()</span>
                    <span>try-catch-finally</span>
                  </div>
                  <div className="text-[11px] text-emerald-700">catch ({errorScenarios[selectedError].type} e) &#123; ... &#125;</div>
                </div>
              </div>

              {/* Propagation Diagnosis Deck */}
              <div className="md:col-span-7 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wide block">
                  Propagation Lifecycle Stage:
                </span>

                <div className="p-3.5 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs space-y-1.5">
                  <div className="text-slate-400 text-[11px]">ACTIVE STAGE TRACE:</div>
                  {unwindingStep === 0 && (
                    <div className="text-slate-300">Program initialized. Click "Step Exception Propagation" to trigger failure.</div>
                  )}
                  {unwindingStep === 1 && (
                    <div className="text-red-400 font-bold">
                      1. EXCEPTION THROWN: {errorScenarios[selectedError].type} in {errorScenarios[selectedError].throwLocation}!
                    </div>
                  )}
                  {unwindingStep === 2 && (
                    <div className="text-amber-400 font-bold">
                      2. STACK UNWINDING: Frame 3 destroyed. Passing error up to Frame 2 (processRequest)...
                    </div>
                  )}
                  {unwindingStep === 3 && (
                    <div className="text-emerald-400 font-bold">
                      3. INTERCEPTED & HANDLED: Caught by catch-block in main(). finally block executed unconditionally!
                    </div>
                  )}
                </div>

                {/* Finally Block Indicator */}
                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-slate-700">"finally" Cleanup Status:</span>
                  <span className={`font-mono font-bold text-xs ${
                    unwindingStep === 3 ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {unwindingStep === 3 ? 'EXECUTED (Resources Closed)' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: STREAM BUFFERING --- */}
        {activeTab === 'buffering_throughput' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Disk I/O Throughput: Unbuffered vs Buffered Streams (Unit 4B Q7 & Q8)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Why does wrapping FileInputStream with BufferedInputStream boost performance by 100x?
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>File Size: {fileSizeBytes.toLocaleString()} Bytes ({fileSizeBytes / 1024} KB)</span>
                <span>Max: 32 KB</span>
              </div>
              <input
                type="range"
                min="1024"
                max="32768"
                step="1024"
                value={fileSizeBytes}
                onChange={(e) => setFileSizeBytes(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unbuffered */}
              <div className="p-5 bg-red-50/50 border border-red-200 rounded-xl space-y-3">
                <span className="font-bold text-xs text-red-950 block">
                  1. Unbuffered Stream (FileInputStream)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reads one byte at a time directly from magnetic / flash storage. Requires an OS interrupt and physical disk seek for every single byte.
                </p>
                <div className="p-3 bg-white border border-red-200 rounded-lg space-y-1">
                  <div className="text-xs text-slate-500">Physical Disk I/O Operations:</div>
                  <div className="text-lg font-mono font-bold text-red-700 tabular-nums">
                    {unbufferedSeeks.toLocaleString()} Disks Seeks
                  </div>
                  <span className="text-[11px] text-red-600 font-medium">Extremely high CPU & latency overhead</span>
                </div>
              </div>

              {/* Buffered */}
              <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
                <span className="font-bold text-xs text-emerald-950 block">
                  2. Buffered Stream (BufferedInputStream 8KB)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reads an entire block of 8192 bytes into fast RAM memory in one swift pass. Subsequent reads are serviced instantly from cache!
                </p>
                <div className="p-3 bg-white border border-emerald-200 rounded-lg space-y-1">
                  <div className="text-xs text-slate-500">Physical Disk I/O Operations:</div>
                  <div className="text-lg font-mono font-bold text-emerald-700 tabular-nums">
                    {bufferedSeeks} Block Seek{bufferedSeeks > 1 ? 's' : ''}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Near-instantaneous memory throughput</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
