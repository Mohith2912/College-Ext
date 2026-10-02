import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Database
} from 'lucide-react';

export const JvmArchitectureVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('jvm');

  const steps = [
    {
      title: '1. Java Source Code (.java)',
      desc: 'Developer authors human-readable code conforming to OOP standards (classes, interfaces).',
      tool: 'Developer IDE / Editor',
      artifact: 'Main.java'
    },
    {
      title: '2. javac Compiler (JDK Tool)',
      desc: 'javac checks syntax, resolves types, enforces access modifiers, and compiles source into bytecode.',
      tool: 'javac Main.java',
      artifact: 'Compiling...'
    },
    {
      title: '3. Platform-Independent Bytecode (.class)',
      desc: 'Binary intermediate representation executed by any compliant JVM on Windows, Linux, or macOS.',
      tool: 'Bytecode Output',
      artifact: 'Main.class (Magic: 0xCAFEBABE)'
    },
    {
      title: '4. JVM ClassLoader Subsystem',
      desc: 'Loads the .class bytecode into JVM Method Area, performs Linking (Verify, Prepare, Resolve), and Initialization.',
      tool: 'ClassLoader (Bootstrap, Extension, App)',
      artifact: 'Loaded in Method Area'
    },
    {
      title: '5. Bytecode Verifier',
      desc: 'Checks memory safety: ensures no operand stack overflows, no illegal type casts, and strict security compliance.',
      tool: 'JVM Security Manager',
      artifact: 'Verified Safe'
    },
    {
      title: '6. JIT Compiler & Execution Engine',
      desc: 'Interprets bytecode line-by-line while JIT compiles frequently executed hot code loops into native CPU machine instructions.',
      tool: 'JIT Compiler / Native OS',
      artifact: 'Native Machine Code'
    }
  ];

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Unit-1</span>
              <span aria-hidden="true">·</span>
              <span>CO1</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-700 font-semibold">K3 Apply / K4 Analyze</span>
              <span aria-hidden="true">·</span>
              <span>Exam Question: Unit 1B Q3 (13 Marks)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Java Architecture: JDK, JRE & JVM Execution Engine
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
              disabled={activeStep === 0}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{activeStep === steps.length - 1 ? 'Restart Flow' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {steps.map((st, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`p-2 rounded-lg text-left transition-all cursor-pointer ${
                  activeStep === i
                    ? 'bg-indigo-50 border border-indigo-400 ring-1 ring-indigo-400'
                    : i < activeStep
                    ? 'bg-emerald-50/60 border border-emerald-200 text-slate-700'
                    : 'bg-slate-50 border border-slate-200 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 0{i + 1}</div>
                <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                  {st.title.split('. ')[1]}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-900 text-sm">{steps[activeStep].title}</span>
              <p className="text-slate-600 mt-1 leading-relaxed">{steps[activeStep].desc}</p>
            </div>
            <div className="bg-slate-900 text-emerald-400 font-mono text-xs px-3 py-2 rounded-lg shrink-0">
              Artifact: {steps[activeStep].artifact}
            </div>
          </div>
        </div>

        {/* Hierarchical Visual Architecture Box: JDK -> JRE -> JVM */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Nested Containment Model (JDK contains JRE; JRE contains JVM)
          </h3>

          {/* Layer 1: JDK (Outer Container) */}
          <div className="p-6 bg-slate-100/80 border-2 border-slate-300 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  JDK (Java Development Kit)
                </h4>
              </div>
              <span className="text-xs text-slate-500">
                Primary use: Developing Java Applications
              </span>
            </div>

            {/* JDK Tools Strip */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-slate-800 font-medium">
                javac (Java Compiler)
              </span>
              <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-slate-800">
                java (Interpreter / Launcher)
              </span>
              <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-slate-800">
                javadoc (Doc Generator)
              </span>
              <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-slate-800">
                jdb (Debugger)
              </span>
              <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-slate-800">
                jar (Archive Tool)
              </span>
            </div>

            {/* Layer 2: JRE (Middle Container) */}
            <div className="p-5 bg-indigo-50/70 border-2 border-indigo-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                    JRE (Java Runtime Environment)
                  </h5>
                </div>
                <span className="text-[11px] text-indigo-700">
                  Primary use: Running Java Applications
                </span>
              </div>

              {/* JRE Core Libraries */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-white border border-indigo-200 rounded-md text-indigo-900 font-mono text-[11px]">
                  Java Class Libraries (java.lang, java.util, java.io)
                </span>
                <span className="px-2.5 py-1 bg-white border border-indigo-200 rounded-md text-indigo-900 font-mono text-[11px]">
                  Runtime Support Files (rt.jar / modules)
                </span>
              </div>

              {/* Layer 3: JVM (Inner Virtual Machine) */}
              <div className="p-5 bg-white border-2 border-indigo-500 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-indigo-600" />
                    <h6 className="text-xs font-bold text-slate-900">
                      JVM (Java Virtual Machine) — The Bytecode Engine
                    </h6>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-600 font-semibold">
                    Enables WORA (Write Once, Run Anywhere)
                  </span>
                </div>

                {/* Subsystems of JVM */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Subsystem 1: ClassLoader */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-bold text-slate-900 block">1. ClassLoader</span>
                    <ul className="text-slate-600 text-[11px] space-y-0.5">
                      <li>· Loading (.class bytes)</li>
                      <li>· Linking (Verify, Prepare, Resolve)</li>
                      <li>· Initialization (static blocks)</li>
                    </ul>
                  </div>

                  {/* Subsystem 2: Runtime Data Areas */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-bold text-slate-900 block">2. Runtime Data Areas</span>
                    <ul className="text-slate-600 text-[11px] space-y-0.5">
                      <li>· Heap (Objects & Instances)</li>
                      <li>· Method Area (Class metadata)</li>
                      <li>· JVM Stack (Frame & local vars)</li>
                      <li>· Program Counter (PC) Registers</li>
                    </ul>
                  </div>

                  {/* Subsystem 3: Execution Engine */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-bold text-slate-900 block">3. Execution Engine</span>
                    <ul className="text-slate-600 text-[11px] space-y-0.5">
                      <li>· Interpreter (Line-by-line)</li>
                      <li>· JIT Compiler (Hotspot native speed)</li>
                      <li>· Garbage Collector (Automatic heap reclaim)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Summary Callout */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-slate-900">Summary for Exam Answer (Unit 1B Q3):</h4>
            <p className="text-slate-600 leading-relaxed">
              <strong>JDK</strong> is for developers to build apps (contains javac + JRE). <strong>JRE</strong> is the runtime package for end-users (contains libraries + JVM). <strong>JVM</strong> executes the bytecode, manages heap/stack memory, and converts bytecode into native machine instructions via the JIT compiler, fulfilling the Write Once, Run Anywhere (WORA) guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
