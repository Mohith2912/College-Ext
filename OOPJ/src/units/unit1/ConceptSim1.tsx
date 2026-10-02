import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Zap, 
  Layers, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Cpu,
  Car
} from 'lucide-react';

export const ConceptSim1: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'wora' | 'tariff'>('pillars');

  // --- PILLAR 1: ABSTRACTION (CAR METAPHOR) ---
  const [speed, setSpeed] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(800);
  const [gear, setGear] = useState<number>(1);
  const [showInternalEngine, setShowInternalEngine] = useState<boolean>(false);

  const handleAccelerate = () => {
    setSpeed((s) => Math.min(120, s + 15));
    setRpm((r) => Math.min(6000, r + 900));
    setGear((g) => (speed > 80 ? 5 : speed > 50 ? 4 : speed > 30 ? 3 : speed > 15 ? 2 : 1));
  };

  const handleBrake = () => {
    setSpeed((s) => Math.max(0, s - 20));
    setRpm((r) => Math.max(800, r - 1100));
  };

  // --- PILLAR 2: ENCAPSULATION (BANK VAULT) ---
  const [balance, setBalance] = useState<number>(5000);
  const [depositAmt, setDepositAmt] = useState<number>(500);
  const [directAccessAttempted, setDirectAccessAttempted] = useState<boolean>(false);
  const [encapLog, setEncapLog] = useState<string>('Vault secure. balance field is "private".');

  const attemptDirectWrite = () => {
    setDirectAccessAttempted(true);
    setEncapLog('COMPILER ERROR: balance has private access in BankAccount. Direct write "acc.balance = 99999" blocked!');
  };

  const executeValidatedDeposit = () => {
    setDirectAccessAttempted(false);
    if (depositAmt <= 0) {
      setEncapLog('VALIDATION REJECTED: Deposit amount must be positive.');
      return;
    }
    setBalance((prev) => prev + depositAmt);
    setEncapLog(`VALIDATED MUTATION: deposit(${depositAmt}) accepted via public setter.`);
  };

  // --- WORA PIPELINE SIMULATION ---
  const [woraStep, setWoraStep] = useState<number>(0);
  const woraStages = [
    { title: '1. Developer writes Source (.java)', label: 'Human-readable Java code with strict OOP syntax.' },
    { title: '2. javac Compiles to Bytecode (.class)', label: 'Platform-neutral bytecode with magic number 0xCAFEBABE.' },
    { title: '3. ClassLoader & Verifier in JVM', label: 'Memory safety checks: ensures no stack overflows or illegal casts.' },
    { title: '4. JIT Compiler to Native Machine Code', label: 'Compiles hot loops into native assembly for Windows, Linux, or macOS!' }
  ];

  // --- TARIFF CASING METER ---
  const [units, setUnits] = useState<number>(240);
  const slab1 = Math.min(100, units);
  const slab2 = Math.min(100, Math.max(0, units - 100));
  const slab3 = Math.min(300, Math.max(0, units - 200));
  const slab4 = Math.max(0, units - 500);

  const billTotal = slab1 * 1.0 + slab2 * 2.50 + slab3 * 4.0 + slab4 * 6.0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Simulation Selector Bar */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Unit 1 · Hands-On Mental Model Simulators
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'pillars' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            4 Pillars Metaphor
          </button>
          <button
            onClick={() => setActiveTab('wora')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'wora' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            WORA Pipeline
          </button>
          <button
            onClick={() => setActiveTab('tariff')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'tariff' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Tariff Slabs Meter
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* --- TAB 1: 4 PILLARS METAPHOR --- */}
        {activeTab === 'pillars' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Abstraction: Car pedal vs Hidden Engine */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      1. Abstraction (The Car Interface)
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowInternalEngine(!showInternalEngine)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {showInternalEngine ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showInternalEngine ? 'Hide Complex Engine' : 'Peek Behind Abstraction'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The driver operates simple public controls (Pedal & Brake). The complex fuel injection, valve timing, and combustion pressure remain strictly abstracted away.
                </p>

                {/* Dashboard Controls */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Vehicle Speed:</span>
                    <span className="font-mono text-lg font-bold text-indigo-700 tabular-nums">{speed} km/h</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAccelerate}
                      className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Press Accelerator
                    </button>
                    <button
                      onClick={handleBrake}
                      className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded text-xs font-medium cursor-pointer"
                    >
                      Press Brake
                    </button>
                  </div>
                </div>

                {/* Hidden Complexity Panel */}
                {showInternalEngine && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1.5 animate-in fade-in">
                    <span className="font-bold text-amber-900">Internal Engine Subsystem (Hidden by Abstraction):</span>
                    <div className="font-mono text-[11px] text-amber-800 space-y-0.5">
                      <div>· Engine RPM: {rpm} RPM</div>
                      <div>· Transmission Gear Ratio: Gear {gear}</div>
                      <div>· Fuel Injection: {Math.round(rpm * 0.04)} mg/stroke</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Encapsulation: Bank Vault State Defense */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    2. Encapsulation (State Defense)
                  </h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Data fields are declared <code className="bg-slate-200 px-1 rounded">private</code>. Outside classes cannot corrupt balance directly; they must interact through validated public methods.
                </p>

                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Account Balance:</span>
                    <span className="font-mono text-base font-bold text-emerald-700">₹ {balance.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={attemptDirectWrite}
                      className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded text-xs font-medium cursor-pointer"
                    >
                      acc.balance = 99999 (Illegal)
                    </button>
                    <button
                      onClick={executeValidatedDeposit}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      deposit(+₹500) (Valid)
                    </button>
                  </div>

                  <div className={`p-2.5 rounded font-mono text-[11px] ${
                    directAccessAttempted ? 'bg-rose-100 text-rose-900 border border-rose-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    &gt; {encapLog}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: WORA EXECUTION PIPELINE --- */}
        {activeTab === 'wora' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Java Compilation & Execution Pipeline (Write Once, Run Anywhere)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Step through how .java source is compiled to bytecode and executed by the JVM on any CPU.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setWoraStep((s) => (s < 3 ? s + 1 : 0))}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {woraStep === 3 ? 'Restart Flow' : 'Advance Next Stage'}
                </button>
              </div>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {woraStages.map((stage, idx) => (
                <div
                  key={idx}
                  onClick={() => setWoraStep(idx)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    woraStep === idx
                      ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-400'
                      : idx < woraStep
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold block mb-1">STAGE 0{idx + 1}</span>
                  <div className="text-xs font-bold text-slate-900">{stage.title}</div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{stage.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: TARIFF SLABS METER --- */}
        {activeTab === 'tariff' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Tiered Slab Billing Visualizer (Unit 1C Case Study)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Drag the slider to watch units cascade into progressive non-linear cost tiers.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total Computed Bill</span>
                <div className="text-xl font-bold font-mono text-indigo-700">₹ {billTotal.toFixed(2)}</div>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Consumed Units: {units} Units</span>
                <span>Max: 800 Units</span>
              </div>
              <input
                type="range"
                min="10"
                max="800"
                step="10"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Slabs Meter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="font-bold text-emerald-900 block">Slab 1 (1–100u @ ₹1)</span>
                <div className="text-sm font-mono font-bold text-emerald-700 mt-1">{slab1} units = ₹ {slab1 * 1}</div>
              </div>
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg">
                <span className="font-bold text-sky-900 block">Slab 2 (101–200u @ ₹2.5)</span>
                <div className="text-sm font-mono font-bold text-sky-700 mt-1">{slab2} units = ₹ {slab2 * 2.5}</div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-900 block">Slab 3 (201–500u @ ₹4)</span>
                <div className="text-sm font-mono font-bold text-amber-700 mt-1">{slab3} units = ₹ {slab3 * 4}</div>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <span className="font-bold text-rose-900 block">Slab 4 (&gt;501u @ ₹6)</span>
                <div className="text-sm font-mono font-bold text-rose-700 mt-1">{slab4} units = ₹ {slab4 * 6}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
