import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  FastForward,
  Clock
} from 'lucide-react';

export const ConceptSim5: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'concurrency_race'>('concurrency_race');

  // --- THREAD LIFECYCLE SIMULATOR ---
  type ThreadState = 'NEW' | 'RUNNABLE' | 'RUNNING' | 'TIMED_WAITING' | 'WAITING' | 'TERMINATED';
  const [threadState, setThreadState] = useState<ThreadState>('NEW');
  const [lifecycleLog, setLifecycleLog] = useState<string>('Thread t = new Thread(task) created. State: NEW.');

  const handleStart = () => {
    setThreadState('RUNNABLE');
    setLifecycleLog('t.start() called. Native execution stack allocated. Ready in Thread Scheduler queue: RUNNABLE.');
  };

  const handleDispatchCpu = () => {
    setThreadState('RUNNING');
    setLifecycleLog('JVM Thread Scheduler dispatched CPU slice to thread. State: RUNNING.');
  };

  const handleSleep = () => {
    setThreadState('TIMED_WAITING');
    setLifecycleLog('Thread.sleep(1000) called. Thread suspended without releasing object locks: TIMED_WAITING.');
    setTimeout(() => {
      setThreadState('RUNNABLE');
      setLifecycleLog('Sleep timer expired! Thread re-entered ready queue: RUNNABLE.');
    }, 1500);
  };

  const handleWait = () => {
    setThreadState('WAITING');
    setLifecycleLog('obj.wait() called. Thread releases monitor lock and sleeps indefinitely: WAITING.');
  };

  const handleNotify = () => {
    if (threadState === 'WAITING') {
      setThreadState('RUNNABLE');
      setLifecycleLog('obj.notify() called by another thread! Woken up to re-acquire monitor lock: RUNNABLE.');
    }
  };

  const handleTerminate = () => {
    setThreadState('TERMINATED');
    setLifecycleLog('run() method returned or completed. Thread lifecycle concluded: TERMINATED (Dead).');
  };

  const resetThread = () => {
    setThreadState('NEW');
    setLifecycleLog('Thread t = new Thread(task) re-instantiated. State: NEW.');
  };

  // --- CONCURRENCY RACE CONDITION SIMULATOR ---
  const [useSynchronization, setUseSynchronization] = useState<boolean>(false);
  const [accountBalance, setAccountBalance] = useState<number>(1000);
  const [depositorLogs, setDepositorLogs] = useState<string[]>([]);
  const [withdrawerLogs, setWithdrawerLogs] = useState<string[]>([]);
  const [isRunningSim, setIsRunningSim] = useState<boolean>(false);
  const [raceDetected, setRaceDetected] = useState<boolean>(false);

  const runConcurrentTransactions = () => {
    setIsRunningSim(true);
    setRaceDetected(false);
    setAccountBalance(1000);

    if (!useSynchronization) {
      // UNSAFE: Simulated race condition where both threads read balance = 1000 simultaneously
      setTimeout(() => {
        setDepositorLogs([
          'Depositor reads balance: ₹1000',
          'Depositor computes: 1000 + 500 = 1500',
          'Depositor preempted before writing back...'
        ]);
        setWithdrawerLogs([
          'Withdrawer reads STALE balance: ₹1000 (Overlap!)',
          'Withdrawer computes: 1000 - 300 = 700',
          'Withdrawer writes back balance: ₹700'
        ]);
        // Overwriting update lost!
        setAccountBalance(700);
        setRaceDetected(true);
        setIsRunningSim(false);
      }, 600);
    } else {
      // SYNCHRONIZED: Depositor locks monitor, updates to 1500, releases lock, then Withdrawer subtracts 300 -> 1200
      setTimeout(() => {
        setDepositorLogs([
          'Depositor acquires intrinsic monitor lock [LOCKED]',
          'Depositor reads balance: ₹1000',
          'Depositor writes back balance: ₹1500',
          'Depositor releases monitor lock [UNLOCKED]'
        ]);
        setWithdrawerLogs([
          'Withdrawer WAITS for monitor lock...',
          'Withdrawer acquires monitor lock [LOCKED]',
          'Withdrawer reads updated balance: ₹1500',
          'Withdrawer writes back balance: ₹1200',
          'Withdrawer releases monitor lock [UNLOCKED]'
        ]);
        setAccountBalance(1200);
        setRaceDetected(false);
        setIsRunningSim(false);
      }, 600);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Unit 5 · Multithreading, Thread Life Cycle & Concurrency Mutex
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('concurrency_race')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'concurrency_race' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Bank Concurrency & Mutex
          </button>
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'lifecycle' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Thread State Machine
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* --- TAB 1: CONCURRENCY RACE CONDITION (CASE STUDY) --- */}
        {activeTab === 'concurrency_race' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Shared Bank Account: Race Condition vs Synchronized Resolution (Unit 5 Part C Q1)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Two threads (Depositor +₹500, Withdrawer -₹300) access the same account balance simultaneously.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setUseSynchronization(false)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    !useSynchronization ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Sync OFF (Race Condition)</span>
                </button>
                <button
                  onClick={() => setUseSynchronization(true)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    useSynchronization ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sync ON (synchronized method)</span>
                </button>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="p-5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  SHARED HEAP INSTANCE: BankAccount account = new BankAccount(1000)
                </span>
                <h3 className="text-lg font-bold mt-0.5">Audited Account Balance:</h3>
                <span className="text-xs text-slate-400">
                  Initial: ₹1000 · Expected Final: ₹1000 + ₹500 - ₹300 = ₹1200
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400">Current Balance</span>
                  <div className={`text-2xl font-mono font-bold ${
                    raceDetected ? 'text-red-400 line-through' : 'text-emerald-400'
                  }`}>
                    ₹ {accountBalance}
                  </div>
                </div>

                <button
                  onClick={runConcurrentTransactions}
                  disabled={isRunningSim}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Threads</span>
                </button>
              </div>
            </div>

            {/* Concurrent Threads Interleaving Stream */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thread 1: Depositor */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-950 font-mono border-b border-emerald-100 pb-1">
                  <span>Thread-1: Depositor (+₹500)</span>
                  <span className="text-[10px] text-emerald-700">Concurrent</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-700">
                  {depositorLogs.length === 0 ? (
                    <span className="text-slate-400 italic">Awaiting execution...</span>
                  ) : (
                    depositorLogs.map((l, i) => <div key={i}>&gt; {l}</div>)
                  )}
                </div>
              </div>

              {/* Thread 2: Withdrawer */}
              <div className="p-4 bg-red-50/50 border border-red-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-red-950 font-mono border-b border-red-100 pb-1">
                  <span>Thread-2: Withdrawer (-₹300)</span>
                  <span className="text-[10px] text-red-700">Concurrent</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-700">
                  {withdrawerLogs.length === 0 ? (
                    <span className="text-slate-400 italic">Awaiting execution...</span>
                  ) : (
                    withdrawerLogs.map((l, i) => <div key={i}>&gt; {l}</div>)
                  )}
                </div>
              </div>
            </div>

            {/* Pedagogical Outcome Banner */}
            {raceDetected && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-xs space-y-1 text-red-900 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  RACE CONDITION OCCURRED! Balance Corrupted to ₹{accountBalance}!
                </div>
                <p className="leading-relaxed">
                  Both threads read <code>balance = 1000</code> concurrently before either had committed its modification. Withdrawer overwrote Depositor's update, completely losing the ₹500 deposit! Toggle <strong>"Sync ON"</strong> to see how <code>synchronized</code> enforces mutual exclusion.
                </p>
              </div>
            )}

            {!raceDetected && depositorLogs.length > 0 && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs space-y-1 text-emerald-900 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  MUTEX SYNCHRONIZATION VERIFIED! Correct Final Balance: ₹1200!
                </div>
                <p className="leading-relaxed">
                  The <code>synchronized</code> keyword acquired the intrinsic object lock (monitor) on <code>this</code>. Thread-2 was blocked until Thread-1 released the lock, guaranteeing atomic read-modify-write transitions.
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: THREAD LIFECYCLE --- */}
        {activeTab === 'lifecycle' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Thread Life Cycle State Machine Simulator (Unit 5B Q2)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trigger lifecycle methods to move the thread through its JVM scheduling states.
                </p>
              </div>
              <button
                onClick={resetThread}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Reset to NEW
              </button>
            </div>

            {/* States Visual Chain */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(['NEW', 'RUNNABLE', 'RUNNING', 'TIMED_WAITING', 'TERMINATED'] as const).map((st) => (
                <div
                  key={st}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    threadState === st
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400 font-bold scale-[1.03]'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="text-[10px] font-mono block opacity-75">STATE</span>
                  <div className="text-xs font-bold mt-0.5">{st}</div>
                </div>
              ))}
            </div>

            {/* Interactive Scheduler Actions */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                Invoke Thread Transitions:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={handleStart}
                  disabled={threadState !== 'NEW'}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                >
                  t.start()
                </button>
                <button
                  onClick={handleDispatchCpu}
                  disabled={threadState !== 'RUNNABLE'}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                >
                  CPU Dispatches Thread
                </button>
                <button
                  onClick={handleSleep}
                  disabled={threadState !== 'RUNNING'}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                >
                  Thread.sleep(1000)
                </button>
                <button
                  onClick={handleWait}
                  disabled={threadState !== 'RUNNING'}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                >
                  obj.wait()
                </button>
                <button
                  onClick={handleNotify}
                  disabled={threadState !== 'WAITING'}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                >
                  obj.notify()
                </button>
                <button
                  onClick={handleTerminate}
                  disabled={threadState !== 'RUNNING'}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                >
                  run() completes
                </button>
              </div>
            </div>

            {/* Realtime Event Log */}
            <div className="p-3.5 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg border border-slate-800">
              &gt; {lifecycleLog}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
