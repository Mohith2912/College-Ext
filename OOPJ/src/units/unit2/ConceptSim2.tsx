import React, { useState } from 'react';
import { 
  Database, 
  Trash2, 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  Code,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const ConceptSim2: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'this_pointer' | 'overload_match' | 'gc_heap'>('this_pointer');

  // --- THIS POINTER SIMULATOR ---
  const [activeCaller, setActiveCaller] = useState<'s1' | 's2'>('s1');
  const [useThisKeyword, setUseThisKeyword] = useState<boolean>(true);
  const [s1Name, setS1Name] = useState<string>('Alan');
  const [s2Name, setS2Name] = useState<string>('Grace');
  const [inputParam, setInputParam] = useState<string>('Ada');

  const executeAssignment = () => {
    if (useThisKeyword) {
      if (activeCaller === 's1') setS1Name(inputParam);
      if (activeCaller === 's2') setS2Name(inputParam);
    }
    // If not using 'this', parameter shadows field; no mutation occurs on instance!
  };

  // --- OVERLOAD RESOLVER SIMULATOR ---
  const [selectedCall, setSelectedCall] = useState<'int_two' | 'int_three' | 'double_two'>('int_two');

  const overloadMethods = {
    int_two: {
      signature: 'add(int a, int b)',
      types: 'int, int',
      params: '5, 10',
      result: '15',
      matchIndex: 0
    },
    int_three: {
      signature: 'add(int a, int b, int c)',
      types: 'int, int, int',
      params: '1, 2, 3',
      result: '6',
      matchIndex: 1
    },
    double_two: {
      signature: 'add(double a, double b)',
      types: 'double, double',
      params: '5.5, 2.3',
      result: '7.8',
      matchIndex: 2
    }
  };

  // --- GENERATIONAL GC SIMULATOR ---
  interface HeapItem {
    id: number;
    name: string;
    gen: 'eden' | 'survivor' | 'tenured';
    isLive: boolean;
  }

  const [heapItems, setHeapItems] = useState<HeapItem[]>([
    { id: 1, name: 'Student_#1', gen: 'eden', isLive: true },
    { id: 2, name: 'TempScanner_#2', gen: 'eden', isLive: false },
    { id: 3, name: 'Invoice_#3', gen: 'survivor', isLive: true },
    { id: 4, name: 'SystemConfig', gen: 'tenured', isLive: true }
  ]);

  const allocateEden = () => {
    const nextId = Date.now() % 1000;
    setHeapItems((prev) => [
      ...prev,
      { id: nextId, name: `Obj_${nextId}`, gen: 'eden', isLive: true }
    ]);
  };

  const severReferences = () => {
    setHeapItems((prev) =>
      prev.map((item) => (item.gen === 'eden' ? { ...item, isLive: false } : item))
    );
  };

  const runMinorGc = () => {
    setHeapItems((prev) =>
      prev
        .filter((item) => item.gen !== 'eden' || item.isLive)
        .map((item) => (item.gen === 'eden' ? { ...item, gen: 'survivor' as const } : item))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Unit 2 · Classes, Memory & Method Overloading
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('this_pointer')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'this_pointer' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            The "this" Pointer
          </button>
          <button
            onClick={() => setActiveTab('overload_match')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'overload_match' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Overload Signature Matcher
          </button>
          <button
            onClick={() => setActiveTab('gc_heap')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'gc_heap' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Generational GC
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* --- TAB 1: THIS POINTER SIMULATOR --- */}
        {activeTab === 'this_pointer' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Memory Pointer Visualizer: How "this" Resolves Shadowing
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  See how the "this" keyword dynamically references the caller object's exact heap slot.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setUseThisKeyword(true)}
                  className={`px-3 py-1 rounded font-medium ${useThisKeyword ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Using this.name = name
                </button>
                <button
                  onClick={() => setUseThisKeyword(false)}
                  className={`px-3 py-1 rounded font-medium ${!useThisKeyword ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Without this (name = name Bug)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heap Instances Display */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  JVM Heap Memory State:
                </span>
                
                {/* Instance s1 */}
                <div className={`p-4 rounded-xl border transition-all ${
                  activeCaller === 's1' ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-400' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-900 font-mono">Student s1 = new Student()</span>
                    <span className="font-mono text-[11px] text-slate-500">Heap: 0x1A40</span>
                  </div>
                  <div className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded border border-slate-200">
                    <div>field String name = <span className="font-bold text-indigo-700">"{s1Name}"</span>;</div>
                  </div>
                </div>

                {/* Instance s2 */}
                <div className={`p-4 rounded-xl border transition-all ${
                  activeCaller === 's2' ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-400' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-900 font-mono">Student s2 = new Student()</span>
                    <span className="font-mono text-[11px] text-slate-500">Heap: 0x2B80</span>
                  </div>
                  <div className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded border border-slate-200">
                    <div>field String name = <span className="font-bold text-indigo-700">"{s2Name}"</span>;</div>
                  </div>
                </div>
              </div>

              {/* Method Caller Deck */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Execute Setter Method Call:
                </h5>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Select Active Calling Instance:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveCaller('s1')}
                        className={`flex-1 py-1.5 rounded font-semibold transition-colors cursor-pointer ${
                          activeCaller === 's1' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        s1.setName(...)
                      </button>
                      <button
                        onClick={() => setActiveCaller('s2')}
                        className={`flex-1 py-1.5 rounded font-semibold transition-colors cursor-pointer ${
                          activeCaller === 's2' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        s2.setName(...)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Incoming Parameter (String name):</label>
                    <input
                      type="text"
                      value={inputParam}
                      onChange={(e) => setInputParam(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono"
                    />
                  </div>

                  <button
                    onClick={executeAssignment}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold cursor-pointer transition-colors"
                  >
                    Execute: {activeCaller}.setName("{inputParam}")
                  </button>

                  <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                    useThisKeyword ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}>
                    {useThisKeyword ? (
                      <div>
                        <strong>SUCCESS:</strong> "this" resolves to Heap address <strong>{activeCaller === 's1' ? '0x1A40' : '0x2B80'}</strong>. Instance field successfully updated to "{inputParam}"!
                      </div>
                    ) : (
                      <div>
                        <strong>BUG OCCURRED:</strong> "name = name" assigned the parameter to itself. The Heap object's field was NEVER updated!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: OVERLOAD MATCHER --- */}
        {activeTab === 'overload_match' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Compile-Time Signature Resolution Table
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                The compiler binds calls to the exact matching method signature using parameter counts and types.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCall('int_two')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                  selectedCall === 'int_two' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                calc.add(5, 10)
              </button>
              <button
                onClick={() => setSelectedCall('int_three')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                  selectedCall === 'int_three' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                calc.add(1, 2, 3)
              </button>
              <button
                onClick={() => setSelectedCall('double_two')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                  selectedCall === 'double_two' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                calc.add(5.5, 2.3)
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Candidate Overloaded Signature</th>
                    <th className="py-2.5 px-4">Parameter Signature</th>
                    <th className="py-2.5 px-4">Compiler Binding Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr className={selectedCall === 'int_two' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-slate-600'}>
                    <td className="py-2.5 px-4">public int add(int a, int b)</td>
                    <td className="py-2.5 px-4">(int, int)</td>
                    <td className="py-2.5 px-4">
                      {selectedCall === 'int_two' ? 'MATCHED & BOUND (Returns 15)' : 'Signature Mismatch'}
                    </td>
                  </tr>
                  <tr className={selectedCall === 'int_three' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-slate-600'}>
                    <td className="py-2.5 px-4">public int add(int a, int b, int c)</td>
                    <td className="py-2.5 px-4">(int, int, int)</td>
                    <td className="py-2.5 px-4">
                      {selectedCall === 'int_three' ? 'MATCHED & BOUND (Returns 6)' : 'Signature Mismatch'}
                    </td>
                  </tr>
                  <tr className={selectedCall === 'double_two' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-slate-600'}>
                    <td className="py-2.5 px-4">public double add(double a, double b)</td>
                    <td className="py-2.5 px-4">(double, double)</td>
                    <td className="py-2.5 px-4">
                      {selectedCall === 'double_two' ? 'MATCHED & BOUND (Returns 7.8)' : 'Signature Mismatch'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: GENERATIONAL GC --- */}
        {activeTab === 'gc_heap' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  JVM Heap Memory & Generational Garbage Collection
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Allocate objects, sever references (obj = null), and watch the GC sweep unreachable instances.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={allocateEden}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Allocate Object
                </button>
                <button
                  onClick={severReferences}
                  className="px-3 py-1 bg-amber-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  obj = null
                </button>
                <button
                  onClick={runMinorGc}
                  className="px-3 py-1 bg-rose-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Run Minor GC
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-2">
                <span className="font-bold text-xs text-sky-900 block">Eden Space (Young Gen)</span>
                <div className="space-y-1.5">
                  {heapItems.filter((i) => i.gen === 'eden').map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 rounded font-mono text-xs border ${
                        item.isLive ? 'bg-white text-slate-800 border-slate-200' : 'bg-rose-100 text-rose-800 border-rose-300 line-through'
                      }`}
                    >
                      {item.name} {item.isLive ? '(Reachable)' : '(Unreachable)'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
                <span className="font-bold text-xs text-indigo-900 block">Survivor Space (S0 / S1)</span>
                <div className="space-y-1.5">
                  {heapItems.filter((i) => i.gen === 'survivor').map((item) => (
                    <div key={item.id} className="p-2 bg-white rounded font-mono text-xs border border-indigo-200 text-indigo-900">
                      {item.name} (Promoted)
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-2">
                <span className="font-bold text-xs text-slate-900 block">Tenured Generation (Old Gen)</span>
                <div className="space-y-1.5">
                  {heapItems.filter((i) => i.gen === 'tenured').map((item) => (
                    <div key={item.id} className="p-2 bg-white rounded font-mono text-xs border border-slate-300 text-slate-800">
                      {item.name} (Long-lived)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
