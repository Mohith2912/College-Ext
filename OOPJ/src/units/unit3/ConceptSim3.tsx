import React, { useState } from 'react';
import { 
  GitBranch, 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  AlertTriangle,
  Stethoscope,
  Volume2,
  Layers,
  HelpCircle
} from 'lucide-react';

export const ConceptSim3: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'polymorphism' | 'hospital_dispatch' | 'diamond_resolver'>('polymorphism');

  // --- ANIMAL RUNTIME POLYMORPHISM SIMULATOR ---
  const [selectedAnimalObject, setSelectedAnimalObject] = useState<'Dog' | 'Cat' | 'Cow'>('Dog');
  const [executionLog, setExecutionLog] = useState<string>('Ready to invoke ref.sound() via Dynamic Method Dispatch.');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  const animalBehaviors = {
    Dog: { sound: 'Woof! Woof! (Dog barks)', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' },
    Cat: { sound: 'Meow! Meow! (Cat purrs)', color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-300' },
    Cow: { sound: 'Moo! Moo! (Cow bellows)', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' }
  };

  const handleDispatchAnimal = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setExecutionLog(
        `[RUNTIME RESOLVED] JVM followed Stack pointer (Animal ref) -> inspected Heap instance (${selectedAnimalObject}) -> dynamically executed overridden method: "${animalBehaviors[selectedAnimalObject].sound}"!`
      );
      setIsDispatching(false);
    }, 300);
  };

  // --- HOSPITAL CASE STUDY DISPATCH ---
  const [selectedRole, setSelectedRole] = useState<'Doctor' | 'Nurse' | 'Technician'>('Doctor');
  const baseSalary = 45000;
  const hospitalRoles = {
    Doctor: { allowance: 30000, total: baseSalary + 30000, roleDesc: 'Surgeon / Specialist (+₹30,000 allowance)' },
    Nurse: { allowance: 15000, total: baseSalary + 15000, roleDesc: 'ICU Critical Care Nurse (+₹15,000 allowance)' },
    Technician: { allowance: 10000, total: baseSalary + 10000, roleDesc: 'Radiology / Lab Technician (+₹10,000 allowance)' }
  };

  // --- DIAMOND AMBIGUITY RESOLVER ---
  const [resolutionChoice, setResolutionChoice] = useState<'unresolved' | 'interface_a' | 'interface_b'>('unresolved');

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Unit 3 · Inheritance, Polymorphism & Dynamic Dispatch
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('polymorphism')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'polymorphism' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Polymorphism Lab
          </button>
          <button
            onClick={() => setActiveTab('hospital_dispatch')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'hospital_dispatch' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Hospital Salary Dispatch
          </button>
          <button
            onClick={() => setActiveTab('diamond_resolver')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'diamond_resolver' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Interface Diamond Resolver
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* --- TAB 1: RUNTIME POLYMORPHISM & DYNAMIC METHOD DISPATCH --- */}
        {activeTab === 'polymorphism' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Interactive Dynamic Method Dispatch Simulator (Core Concept Understanding)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                The reference variable is ALWAYS <code className="bg-slate-100 px-1 rounded font-bold">Animal ref</code>. Choose the concrete object placed on the Heap and watch JVM resolve at runtime!
              </p>
            </div>

            {/* Visual Call Stack vs Heap Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Stack Frame Box */}
              <div className="md:col-span-5 p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-1.5">
                  <span className="font-bold text-slate-900">JVM Stack Frame (main)</span>
                  <span className="text-[10px] text-slate-500 font-mono">Compile-time Type</span>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 text-xs font-mono">
                  <div className="text-slate-500">// Static reference declaration:</div>
                  <div className="text-indigo-700 font-bold">Animal ref;</div>
                  <div className="text-slate-500 pt-1">// Points to Heap instance:</div>
                  <div className="text-slate-800">ref = new {selectedAnimalObject}();</div>
                </div>

                {/* Object Selector */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Choose Concrete Heap Instance:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['Dog', 'Cat', 'Cow'] as const).map((animal) => (
                      <button
                        key={animal}
                        onClick={() => setSelectedAnimalObject(animal)}
                        className={`py-1.5 rounded font-bold transition-all cursor-pointer ${
                          selectedAnimalObject === animal
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        new {animal}()
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDispatchAnimal}
                  disabled={isDispatching}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Execute: ref.sound()</span>
                </button>
              </div>

              {/* Dynamic Dispatch Visual Flow */}
              <div className="md:col-span-7 p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Runtime Heap Memory & VTable Dispatch:
                </span>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1">
                    <span>CALL DISPATCH TRACE</span>
                    <span>HEAP ADDRESS: 0x7FA2</span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <div>1. Compile Time: Compiler verifies Animal.sound() exists. [OK]</div>
                    <div>2. Runtime: JVM follows reference pointer to Heap object.</div>
                    <div className="text-emerald-400 font-bold">
                      3. Concrete Type on Heap: <span className="underline">class {selectedAnimalObject}</span>
                    </div>
                    <div>4. JVM executes overridden method in {selectedAnimalObject} class!</div>
                  </div>
                </div>

                {/* Visual Behavior Banner */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${animalBehaviors[selectedAnimalObject].bg} ${animalBehaviors[selectedAnimalObject].border}`}>
                  <Sparkles className={`w-5 h-5 shrink-0 mt-0.5 ${animalBehaviors[selectedAnimalObject].color}`} />
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-slate-900 uppercase tracking-wide">
                      Dynamic Dispatch Output:
                    </span>
                    <p className={`font-mono text-sm font-bold ${animalBehaviors[selectedAnimalObject].color}`}>
                      "{animalBehaviors[selectedAnimalObject].sound}"
                    </p>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Notice: Calling code wrote <code className="bg-white/80 px-1 rounded font-bold">ref.sound()</code> without knowing whether it is a Dog, Cat, or Cow. Polymorphism allows adding new animals without touching the caller!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: HOSPITAL SALARY DISPATCH --- */}
        {activeTab === 'hospital_dispatch' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Hospital System: Hierarchical Overriding & super() Chaining (Unit 3 Part C)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Superclass <code className="bg-slate-100 px-1 rounded font-bold">Employee</code> reference calculates specialized role allowances via method overriding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['Doctor', 'Nurse', 'Technician'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === role
                      ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-400'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1 font-mono">
                    <span className="font-bold text-slate-900">class {role}</span>
                    <span className="text-[10px] text-slate-400">extends Employee</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{hospitalRoles[role].roleDesc}</p>
                  <div className="mt-2 text-xs font-mono font-bold text-indigo-700">
                    Total: ₹ {hospitalRoles[role].total.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Polymorphic Dispatch Call in Action:</span>
              <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-xs leading-relaxed">
                <div>Employee emp = new {selectedRole}(101, "Staff Member", {baseSalary});</div>
                <div className="text-emerald-400 font-bold mt-1">emp.calculateSalary();</div>
                <div className="text-slate-400 mt-1">&gt; Output: {selectedRole} Total Salary = Basic (₹{baseSalary.toLocaleString()}) + Allowance (₹{hospitalRoles[selectedRole].allowance.toLocaleString()}) = ₹{hospitalRoles[selectedRole].total.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: DIAMOND RESOLVER --- */}
        {activeTab === 'diamond_resolver' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Interface Multiple Inheritance Ambiguity & The Diamond Problem
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                When Interface A and Interface B both define <code className="bg-slate-100 px-1 rounded font-bold">default void display()</code>, how does Java eliminate collision?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-950 font-mono">interface A</span>
                <pre className="font-mono text-[11px] text-sky-800 bg-white p-2 rounded border border-sky-100">
                  default void display() &#123;
                  <br />
                  &nbsp;&nbsp;System.out.println("Display from A");
                  <br />
                  &#125;
                </pre>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-indigo-950 font-mono">interface B</span>
                <pre className="font-mono text-[11px] text-indigo-800 bg-white p-2 rounded border border-indigo-100">
                  default void display() &#123;
                  <br />
                  &nbsp;&nbsp;System.out.println("Display from B");
                  <br />
                  &#125;
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800">Resolution Strategy in class Test implements A, B:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setResolutionChoice('unresolved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    resolutionChoice === 'unresolved' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  No Override (Ambiguity Error)
                </button>
                <button
                  onClick={() => setResolutionChoice('interface_a')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    resolutionChoice === 'interface_a' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Resolve with A.super.display()
                </button>
                <button
                  onClick={() => setResolutionChoice('interface_b')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    resolutionChoice === 'interface_b' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Resolve with B.super.display()
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              resolutionChoice === 'unresolved'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              {resolutionChoice === 'unresolved' ? (
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-rose-800">
                    <AlertTriangle className="w-4 h-4" />
                    COMPILER ERROR (Diamond Conflict Detected):
                  </div>
                  <p className="mt-1">
                    "class Test inherits unrelated defaults for display() from types A and B". Java prohibits this to prevent ambiguity.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    AMBIGUITY SURGICALLY RESOLVED:
                  </div>
                  <p className="mt-1 font-mono">
                    @Override public void display() &#123; {resolutionChoice === 'interface_a' ? 'A' : 'B'}.super.display(); &#125;
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-1">
                    Output: "Display from {resolutionChoice === 'interface_a' ? 'A' : 'B'}". The compiler now knows unequivocally which interface method to execute!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
