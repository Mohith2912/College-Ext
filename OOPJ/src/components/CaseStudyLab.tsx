import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  DollarSign, 
  Box, 
  Type, 
  Trash2, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  Code2, 
  Info, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { CaseStudy } from '../types/concept';

interface CaseStudyLabProps {
  initialCaseStudyId?: string;
  onOpenFillups?: () => void;
}

export const CaseStudyLab: React.FC<CaseStudyLabProps> = ({
  initialCaseStudyId = 'electricity_bill',
  onOpenFillups
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseStudyId);
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'rubric'>('simulator');

  const currentCase = useMemo(
    () => CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0],
    [selectedCaseId]
  );

  // --- STATE FOR CASE 1: ELECTRICITY BILL ---
  const [consumerNo, setConsumerNo] = useState('10824');
  const [consumerName, setConsumerName] = useState('Dr. S. K. Narayanan');
  const [prevReading, setPrevReading] = useState(1200);
  const [currReading, setCurrReading] = useState(1540);

  const unitsConsumed = Math.max(0, currReading - prevReading);

  const tariffBreakdown = useMemo(() => {
    let slab1Units = 0;
    let slab2Units = 0;
    let slab3Units = 0;
    let slab4Units = 0;

    let slab1Cost = 0;
    let slab2Cost = 0;
    let slab3Cost = 0;
    let slab4Cost = 0;

    const u = unitsConsumed;

    if (u <= 100) {
      slab1Units = u;
      slab1Cost = slab1Units * 1.0;
    } else if (u <= 200) {
      slab1Units = 100;
      slab1Cost = 100 * 1.0;
      slab2Units = u - 100;
      slab2Cost = slab2Units * 2.50;
    } else if (u <= 500) {
      slab1Units = 100;
      slab1Cost = 100 * 1.0;
      slab2Units = 100;
      slab2Cost = 100 * 2.50;
      slab3Units = u - 200;
      slab3Cost = slab3Units * 4.0;
    } else {
      slab1Units = 100;
      slab1Cost = 100 * 1.0;
      slab2Units = 100;
      slab2Cost = 100 * 2.50;
      slab3Units = 300;
      slab3Cost = 300 * 4.0;
      slab4Units = u - 500;
      slab4Cost = slab4Units * 6.0;
    }

    const totalBill = slab1Cost + slab2Cost + slab3Cost + slab4Cost;

    return {
      slab1Units,
      slab1Cost,
      slab2Units,
      slab2Cost,
      slab3Units,
      slab3Cost,
      slab4Units,
      slab4Cost,
      totalBill
    };
  }, [unitsConsumed]);

  // --- STATE FOR CASE 2: EMPLOYEE PAYROLL ---
  const [empId, setEmpId] = useState('EMP-4091');
  const [empName, setEmpName] = useState('Priya Sundaram');
  const [basicPay, setBasicPay] = useState(65000);

  const payrollBreakdown = useMemo(() => {
    const da = basicPay * 0.97;
    const hra = basicPay * 0.10;
    const gross = basicPay + da + hra;
    const pf = basicPay * 0.12;
    const staffClub = basicPay * 0.001; // 0.1% of BP
    const totalDeductions = pf + staffClub;
    const net = gross - totalDeductions;

    return { da, hra, gross, pf, staffClub, totalDeductions, net };
  }, [basicPay]);

  // --- STATE FOR CASE 3: MODULARITY RECTANGLE & AREA CALCULATOR ---
  const [rectLength, setRectLength] = useState(14);
  const [rectWidth, setRectWidth] = useState(8);

  const rectArea = rectLength * rectWidth;
  const rectPerimeter = 2 * (rectLength + rectWidth);

  // --- STATE FOR CASE 4: SENTENCE STRING PROCESSOR ---
  const [sentenceInput, setSentenceInput] = useState(
    'Object Oriented Programming in Java enables clean modular code'
  );

  const sentenceAnalysis = useMemo(() => {
    const trimmed = sentenceInput.trim();
    if (!trimmed) {
      return { words: [], count: 0, longest: '', reversed: '' };
    }
    const words = trimmed.split(/\s+/);
    let longest = '';
    for (const w of words) {
      if (w.length > longest.length) longest = w;
    }
    const reversed = sentenceInput.split('').reverse().join('');
    return {
      words,
      count: words.length,
      longest,
      reversed
    };
  }, [sentenceInput]);

  // --- STATE FOR CASE 5: JVM GARBAGE COLLECTION SIMULATOR ---
  interface GcObject {
    id: number;
    name: string;
    generation: 'eden' | 's0' | 's1' | 'tenured';
    isReachable: boolean;
  }

  const [heapObjects, setHeapObjects] = useState<GcObject[]>([
    { id: 1, name: 'Consumer_#101', generation: 'eden', isReachable: true },
    { id: 2, name: 'Invoice_#882', generation: 'eden', isReachable: false },
    { id: 3, name: 'TempScanner_#9', generation: 'eden', isReachable: false },
    { id: 4, name: 'Employee_#40', generation: 's0', isReachable: true },
    { id: 5, name: 'CompanyConfig', generation: 'tenured', isReachable: true }
  ]);
  const [gcLogs, setGcLogs] = useState<string[]>([
    'JVM Heap initialized with 5 objects across generations.'
  ]);

  const addHeapObjects = () => {
    const newId = Date.now() % 10000;
    const newItems: GcObject[] = [
      { id: newId, name: `Obj_${newId}`, generation: 'eden', isReachable: true },
      { id: newId + 1, name: `Buffer_${newId + 1}`, generation: 'eden', isReachable: true }
    ];
    setHeapObjects((prev) => [...prev, ...newItems]);
    setGcLogs((prev) => [
      `Allocated 2 new instances into Young Generation (Eden space).`,
      ...prev.slice(0, 5)
    ]);
  };

  const dereferenceRandom = () => {
    setHeapObjects((prev) =>
      prev.map((obj) => (obj.generation === 'eden' ? { ...obj, isReachable: false } : obj))
    );
    setGcLogs((prev) => [
      `References severed (obj = null). Eden objects are now unreachable & eligible for GC.`,
      ...prev.slice(0, 5)
    ]);
  };

  const runMinorGc = () => {
    // Collect unreachable in Eden, promote reachable to S0/S1
    const surviving = heapObjects
      .filter((obj) => obj.generation !== 'eden' || obj.isReachable)
      .map((obj) => {
        if (obj.generation === 'eden') {
          return { ...obj, generation: 's0' as const };
        }
        if (obj.generation === 's0') {
          return { ...obj, generation: 'tenured' as const };
        }
        return obj;
      });

    const reclaimedCount = heapObjects.length - surviving.length;
    setHeapObjects(surviving);
    setGcLogs((prev) => [
      `[Minor GC] Mark-Sweep completed! Reclaimed ${reclaimedCount} unreachable object(s). Promoted survivors.`,
      ...prev.slice(0, 5)
    ]);
  };

  const runFullGc = () => {
    // Full GC: sweeps all unreachable objects from entire Heap and compacts
    const surviving = heapObjects.filter((obj) => obj.isReachable);
    const reclaimed = heapObjects.length - surviving.length;
    setHeapObjects(surviving);
    setGcLogs((prev) => [
      `[Full System.gc()] Mark-Sweep-Compact executed! Reclaimed ${reclaimed} object(s). Heap memory defragmented.`,
      ...prev.slice(0, 5)
    ]);
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Lab Header & Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{currentCase.unit}</span>
              <span aria-hidden="true">·</span>
              <span>{currentCase.courseOutcome}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-700 font-semibold">{currentCase.blooms}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{currentCase.totalMarks} Marks Case Study</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {currentCase.title}
            </h1>
          </div>

          {/* Case Study Switcher Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap bg-white p-1 rounded-lg border border-slate-200">
            {CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCaseId === c.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {c.id === 'electricity_bill' && '1. Electricity Tariff'}
                {c.id === 'employee_payroll' && '2. Employee Payroll'}
                {c.id === 'oop_modularity' && '3. OOP Modularity'}
                {c.id === 'string_processor' && '4. String Processor'}
                {c.id === 'jvm_garbage_collection' && '5. JVM GC Memory'}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Segmented Bar: Simulator vs Code vs Marking Rubric */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Laboratory Simulator
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'code'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Java Code & Syntax Structure
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'rubric'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              University Marking Rubric ({currentCase.totalMarks} Marks)
            </button>
          </div>

          {onOpenFillups && (
            <button
              onClick={onOpenFillups}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Practice in Fill-ups</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* --- VIEW TAB 1: INTERACTIVE SIMULATORS --- */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Scenario Callout */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-slate-900">Case Study Specification:</p>
                  <p className="text-slate-600 leading-relaxed">{currentCase.problemStatement}</p>
                </div>
              </div>
            </div>

            {/* --- CASE 1: ELECTRICITY TARIFF BILLING SIMULATOR --- */}
            {selectedCaseId === 'electricity_bill' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Controls & Inputs */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Meter Input Parameters
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Consumer Number</label>
                      <input
                        type="text"
                        value={consumerNo}
                        onChange={(e) => setConsumerNo(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Consumer Name</label>
                      <input
                        type="text"
                        value={consumerName}
                        onChange={(e) => setConsumerName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-600 font-medium">Previous Month Reading</label>
                        <span className="font-mono text-slate-700">{prevReading} units</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="10"
                        value={prevReading}
                        onChange={(e) => setPrevReading(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-600 font-medium">Current Month Reading</label>
                        <span className="font-mono text-slate-700">{currReading} units</span>
                      </div>
                      <input
                        type="range"
                        min={prevReading}
                        max={prevReading + 1000}
                        step="10"
                        value={currReading}
                        onChange={(e) => setCurrReading(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Consumed Units Summary Box */}
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-indigo-900 font-medium">Total Consumed Units:</span>
                      <span className="font-mono font-bold text-indigo-700 text-sm">
                        {currReading} - {prevReading} = {unitsConsumed} Units
                      </span>
                    </div>
                  </div>

                  {/* Tariff Rules Table */}
                  <div className="border border-slate-100 rounded-lg overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                          <th className="py-1.5 px-3">Tariff Slab</th>
                          <th className="py-1.5 px-3">Rate / Unit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                        <tr>
                          <td className="py-1 px-3">First 100 units</td>
                          <td className="py-1 px-3">₹ 1.00</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-3">101 – 200 units</td>
                          <td className="py-1 px-3">₹ 2.50</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-3">201 – 500 units</td>
                          <td className="py-1 px-3">₹ 4.00</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-3">&gt; 501 units</td>
                          <td className="py-1 px-3">₹ 6.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Live Slab Breakdown & Printable Receipt */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Visual Tiered Slab Distribution Bar */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Tiered Slab Allocation Meter
                    </h4>
                    <div className="h-6 w-full bg-slate-100 rounded-md overflow-hidden flex border border-slate-200">
                      {tariffBreakdown.slab1Units > 0 && (
                        <div
                          style={{ width: `${(tariffBreakdown.slab1Units / Math.max(1, unitsConsumed)) * 100}%` }}
                          className="bg-emerald-500 text-white text-[10px] font-mono flex items-center justify-center transition-all"
                          title={`Slab 1: ${tariffBreakdown.slab1Units} units`}
                        >
                          {tariffBreakdown.slab1Units}u
                        </div>
                      )}
                      {tariffBreakdown.slab2Units > 0 && (
                        <div
                          style={{ width: `${(tariffBreakdown.slab2Units / Math.max(1, unitsConsumed)) * 100}%` }}
                          className="bg-sky-500 text-white text-[10px] font-mono flex items-center justify-center transition-all"
                          title={`Slab 2: ${tariffBreakdown.slab2Units} units`}
                        >
                          {tariffBreakdown.slab2Units}u
                        </div>
                      )}
                      {tariffBreakdown.slab3Units > 0 && (
                        <div
                          style={{ width: `${(tariffBreakdown.slab3Units / Math.max(1, unitsConsumed)) * 100}%` }}
                          className="bg-amber-500 text-white text-[10px] font-mono flex items-center justify-center transition-all"
                          title={`Slab 3: ${tariffBreakdown.slab3Units} units`}
                        >
                          {tariffBreakdown.slab3Units}u
                        </div>
                      )}
                      {tariffBreakdown.slab4Units > 0 && (
                        <div
                          style={{ width: `${(tariffBreakdown.slab4Units / Math.max(1, unitsConsumed)) * 100}%` }}
                          className="bg-rose-500 text-white text-[10px] font-mono flex items-center justify-center transition-all"
                          title={`Slab 4: ${tariffBreakdown.slab4Units} units`}
                        >
                          {tariffBreakdown.slab4Units}u
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>0 units</span>
                      <span className="text-emerald-700 font-medium">Slab 1 (₹1)</span>
                      <span className="text-sky-700 font-medium">Slab 2 (₹2.5)</span>
                      <span className="text-amber-700 font-medium">Slab 3 (₹4)</span>
                      <span className="text-rose-700 font-medium">Slab 4 (₹6)</span>
                      <span>{unitsConsumed} units</span>
                    </div>
                  </div>

                  {/* Official Bill Receipt Card */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          MUNICIPAL ELECTRICITY BOARD
                        </span>
                        <h3 className="text-base font-bold text-slate-900">Electricity Assessment Invoice</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Consumer: {consumerName} · ID: {consumerNo}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">Total Net Payable</span>
                        <div className="text-xl font-bold font-mono text-indigo-600 tabular-nums">
                          ₹ {tariffBreakdown.totalBill.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Step-by-step arithmetic justification */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">Slab 1 (1 – 100 units @ ₹ 1.00):</span>
                        <span className="font-mono text-slate-800">
                          {tariffBreakdown.slab1Units} × 1.00 = ₹ {tariffBreakdown.slab1Cost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">Slab 2 (101 – 200 units @ ₹ 2.50):</span>
                        <span className="font-mono text-slate-800">
                          {tariffBreakdown.slab2Units} × 2.50 = ₹ {tariffBreakdown.slab2Cost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">Slab 3 (201 – 500 units @ ₹ 4.00):</span>
                        <span className="font-mono text-slate-800">
                          {tariffBreakdown.slab3Units} × 4.00 = ₹ {tariffBreakdown.slab3Cost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">Slab 4 (&gt; 501 units @ ₹ 6.00):</span>
                        <span className="font-mono text-slate-800">
                          {tariffBreakdown.slab4Units} × 6.00 = ₹ {tariffBreakdown.slab4Cost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 font-bold text-slate-900 text-sm">
                        <span>Total Computed Bill Amount:</span>
                        <span className="font-mono text-indigo-700">₹ {tariffBreakdown.totalBill.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- CASE 2: EMPLOYEE PAYROLL SIMULATOR --- */}
            {selectedCaseId === 'employee_payroll' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input Panel */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Employee Compensation Parameters
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Employee ID</label>
                      <input
                        type="text"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Employee Full Name</label>
                      <input
                        type="text"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-600 font-medium">Basic Pay (BP)</label>
                        <span className="font-mono font-bold text-slate-900">₹ {basicPay.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="20000"
                        max="150000"
                        step="5000"
                        value={basicPay}
                        onChange={(e) => setBasicPay(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Formula Breakdown Cards */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <h5 className="font-semibold text-slate-800">Statutory Formulae (Unit 1 Part C):</h5>
                    <ul className="space-y-1 text-slate-600 font-mono text-[11px]">
                      <li>· DA = BP × 0.97 (97%)</li>
                      <li>· HRA = BP × 0.10 (10%)</li>
                      <li>· Gross = BP + DA + HRA</li>
                      <li>· PF = BP × 0.12 (12%)</li>
                      <li>· Staff Club = BP × 0.001 (0.1%)</li>
                      <li>· Net = Gross - PF - StaffClub</li>
                    </ul>
                  </div>
                </div>

                {/* Official Salary Slip Card */}
                <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
                  <div className="border-b border-slate-200 pb-3 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        ACME ENTERPRISE HRM SYSTEM
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">Official Monthly Pay Slip</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Emp: {empName} · ID: {empId}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Net Take-Home Salary</span>
                      <div className="text-xl font-bold font-mono text-emerald-600 tabular-nums">
                        ₹ {payrollBreakdown.net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Two column Earnings vs Deductions table */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Earnings Box */}
                    <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-2">
                      <div className="font-bold text-emerald-900 border-b border-emerald-100 pb-1 flex justify-between">
                        <span>Earnings</span>
                        <span>Amount (₹)</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Basic Pay (BP):</span>
                        <span className="font-mono">{basicPay.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>DA (97% of BP):</span>
                        <span className="font-mono">{payrollBreakdown.da.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>HRA (10% of BP):</span>
                        <span className="font-mono">{payrollBreakdown.hra.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-emerald-900 pt-2 border-t border-emerald-100">
                        <span>Gross Salary:</span>
                        <span className="font-mono">₹ {payrollBreakdown.gross.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Deductions Box */}
                    <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg space-y-2">
                      <div className="font-bold text-rose-900 border-b border-rose-100 pb-1 flex justify-between">
                        <span>Deductions</span>
                        <span>Amount (₹)</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Provident Fund (12%):</span>
                        <span className="font-mono">{payrollBreakdown.pf.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Staff Club Fund (0.1%):</span>
                        <span className="font-mono">{payrollBreakdown.staffClub.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-rose-900 pt-8 border-t border-rose-100">
                        <span>Total Deductions:</span>
                        <span className="font-mono">₹ {payrollBreakdown.totalDeductions.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Net Pay Highlight Banner */}
                  <div className="p-4 bg-slate-900 text-white rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Final Credited Bank Transfer Amount:</span>
                      <p className="text-xs text-slate-300">Gross (₹ {payrollBreakdown.gross.toFixed(2)}) - Deductions (₹ {payrollBreakdown.totalDeductions.toFixed(2)})</p>
                    </div>
                    <div className="text-xl font-bold font-mono text-emerald-400">
                      ₹ {payrollBreakdown.net.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- CASE 3: MODULARITY RECTANGLE & AREA CALCULATOR --- */}
            {selectedCaseId === 'oop_modularity' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Box className="w-4 h-4 text-indigo-600" />
                    Rectangle Dimensions
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-600 font-medium">Length</label>
                        <span className="font-mono font-bold text-slate-800">{rectLength} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="30"
                        value={rectLength}
                        onChange={(e) => setRectLength(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-600 font-medium">Width</label>
                        <span className="font-mono font-bold text-slate-800">{rectWidth} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="30"
                        value={rectWidth}
                        onChange={(e) => setRectWidth(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Architecture Explanation */}
                  <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs space-y-2">
                    <h5 className="font-semibold text-indigo-900">Decoupled Architectural Interaction:</h5>
                    <p className="text-indigo-800 leading-relaxed">
                      1. <code className="bg-indigo-100 px-1 py-0.5 rounded">Rectangle</code> encapsulates dimension fields.
                      <br />
                      2. <code className="bg-indigo-100 px-1 py-0.5 rounded">AreaCalculator</code> accepts <code className="bg-indigo-100 px-1 py-0.5 rounded">Rectangle r</code> reference as parameter.
                      <br />
                      3. Caller delegates formula execution to <code className="bg-indigo-100 px-1 py-0.5 rounded">r.calculateArea()</code>.
                    </p>
                  </div>
                </div>

                {/* Visual Class Collaboration Stage */}
                <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Object-Oriented Collaboration Graph
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Class 1: Rectangle Instance */}
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-mono text-xs font-bold text-indigo-700">class Rectangle</span>
                        <span className="text-[10px] text-slate-500">Heap: 0x4F1A</span>
                      </div>
                      <div className="text-xs space-y-1.5 font-mono text-slate-700">
                        <div className="flex justify-between bg-white p-1.5 rounded border border-slate-100">
                          <span>length:</span>
                          <span className="font-bold text-slate-900">{rectLength}.0</span>
                        </div>
                        <div className="flex justify-between bg-white p-1.5 rounded border border-slate-100">
                          <span>width:</span>
                          <span className="font-bold text-slate-900">{rectWidth}.0</span>
                        </div>
                        <div className="bg-emerald-50 p-1.5 rounded border border-emerald-100 text-emerald-800 text-[11px]">
                          + calculateArea(): {rectArea}.0
                        </div>
                      </div>
                    </div>

                    {/* Class 2: AreaCalculator Consumer */}
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-mono text-xs font-bold text-slate-900">class AreaCalculator</span>
                        <span className="text-[10px] text-slate-500">Consumer</span>
                      </div>
                      <div className="text-xs space-y-2 font-mono text-slate-700">
                        <div className="bg-white p-2 rounded border border-slate-100 text-[11px] leading-relaxed">
                          displayArea(Rectangle r) &#123;
                          <br />
                          &nbsp;&nbsp;System.out.println(r.calculateArea());
                          <br />
                          &#125;
                        </div>
                        <div className="p-2 bg-indigo-50 rounded border border-indigo-100 text-indigo-900 text-[11px]">
                          Console: Area = {rectArea}.0
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Geometric Canvas Visualization */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center min-h-[160px]">
                    <div
                      style={{
                        width: `${Math.min(260, rectLength * 9)}px`,
                        height: `${Math.min(160, rectWidth * 9)}px`
                      }}
                      className="bg-indigo-600/20 border-2 border-indigo-600 rounded flex flex-col items-center justify-center transition-all duration-200"
                    >
                      <span className="text-xs font-bold text-indigo-900 font-mono">
                        {rectLength} × {rectWidth}
                      </span>
                      <span className="text-[11px] text-indigo-700">Area: {rectArea} sq units</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- CASE 4: SENTENCE STRING PROCESSOR --- */}
            {selectedCaseId === 'string_processor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-600" />
                    Input Sentence Stream
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Sentence to Process</label>
                      <textarea
                        rows={3}
                        value={sentenceInput}
                        onChange={(e) => setSentenceInput(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:bg-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setSentenceInput('Object Oriented Programming in Java enables clean modular code')
                        }
                        className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                      >
                        Sample 1 (OOP)
                      </button>
                      <button
                        onClick={() => setSentenceInput('MADAM ARORA TEACHES MALAYALAM')}
                        className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                      >
                        Sample 2 (Palindromes)
                      </button>
                    </div>
                  </div>

                  {/* Algorithmic Efficiency Notice */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
                    <span className="font-semibold text-amber-900">Why StringBuilder over String concatenation?</span>
                    <p className="text-amber-800 leading-relaxed">
                      String is immutable; repeated concatenation creates <code className="bg-amber-100 px-1 rounded">O(n)</code> temporary objects on the Heap. <code className="bg-amber-100 px-1 rounded">StringBuilder.reverse()</code> modifies the internal character array in-place in <code className="bg-amber-100 px-1 rounded">O(n)</code> time with zero garbage collection overhead.
                    </p>
                  </div>
                </div>

                {/* Analysis Visualizer */}
                <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 space-y-5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Live Parsing Pipeline & Metrics
                  </h4>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[11px] text-slate-500">Word Count (split)</span>
                      <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                        {sentenceAnalysis.count}
                      </div>
                    </div>
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                      <span className="text-[11px] text-indigo-700 font-medium">Longest Word</span>
                      <div className="text-xs font-bold font-mono text-indigo-900 mt-1 truncate">
                        "{sentenceAnalysis.longest}" ({sentenceAnalysis.longest.length} chars)
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-emerald-700 font-medium">Reversal Complexity</span>
                      <div className="text-xs font-bold font-mono text-emerald-900 mt-1">
                        O(n) in-place
                      </div>
                    </div>
                  </div>

                  {/* Tokenized Words Pill Cloud */}
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block mb-2">
                      Parsed Tokens Array [String[] words = sentence.split(" ")]:
                    </span>
                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      {sentenceAnalysis.words.map((word, idx) => {
                        const isLongest = word === sentenceAnalysis.longest;
                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 text-xs font-mono rounded border ${
                              isLongest
                                ? 'bg-indigo-600 text-white border-indigo-700 font-bold'
                                : 'bg-white text-slate-700 border-slate-200'
                            }`}
                          >
                            [{idx}] {word}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reversal Output Box */}
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block mb-1">
                      Reversed Sentence [new StringBuilder(sentence).reverse().toString()]:
                    </span>
                    <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto">
                      {sentenceAnalysis.reversed || '<empty string>'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- CASE 5: JVM GARBAGE COLLECTION SIMULATOR --- */}
            {selectedCaseId === 'jvm_garbage_collection' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Control Deck */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    JVM Heap Management Controls
                  </h3>

                  <div className="space-y-2 text-xs">
                    <button
                      onClick={addHeapObjects}
                      className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>1. Allocate Objects (new Object())</span>
                    </button>
                    <button
                      onClick={dereferenceRandom}
                      className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>2. Dereference Objects (obj = null)</span>
                    </button>
                    <button
                      onClick={runMinorGc}
                      className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>3. Trigger Minor GC (Eden Sweep & Promote)</span>
                    </button>
                    <button
                      onClick={runFullGc}
                      className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>4. Trigger System.gc() (Full Compaction)</span>
                    </button>
                  </div>

                  {/* Generational Heap Explanation */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                    <h5 className="font-semibold text-slate-800">Generational GC Hypothesis:</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Most newly created objects become unreachable rapidly ("die young") in Eden space. Survivors that live through consecutive GC cycles are promoted to Tenured (Old Generation).
                    </p>
                  </div>

                  {/* Live Activity Logs */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                      GC Activity Stream:
                    </span>
                    <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg max-h-36 overflow-y-auto space-y-1">
                      {gcLogs.map((log, idx) => (
                        <div key={idx}>&gt; {log}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generational Heap Visualizer */}
                <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      JVM Heap Memory Layout (Generations)
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      Total Objects: {heapObjects.length}
                    </span>
                  </div>

                  {/* Heap Regions */}
                  <div className="space-y-4">
                    {/* Young Gen: Eden */}
                    <div className="p-3 bg-sky-50/60 border border-sky-200 rounded-lg">
                      <div className="flex justify-between text-xs font-medium text-sky-900 mb-2">
                        <span>Eden Space (Young Generation - High Churn)</span>
                        <span className="font-mono text-[11px]">
                          {heapObjects.filter((o) => o.generation === 'eden').length} objects
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[44px]">
                        {heapObjects
                          .filter((o) => o.generation === 'eden')
                          .map((obj) => (
                            <div
                              key={obj.id}
                              className={`px-2 py-1 rounded text-[11px] font-mono border ${
                                obj.isReachable
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : 'bg-rose-100 text-rose-800 border-rose-300 line-through'
                              }`}
                            >
                              {obj.name} {obj.isReachable ? '(Live)' : '(Dead)'}
                            </div>
                          ))}
                        {heapObjects.filter((o) => o.generation === 'eden').length === 0 && (
                          <span className="text-xs text-slate-400 italic">Eden space empty</span>
                        )}
                      </div>
                    </div>

                    {/* Young Gen: Survivors S0 & S1 */}
                    <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg">
                      <div className="flex justify-between text-xs font-medium text-indigo-900 mb-2">
                        <span>Survivor Spaces (S0 / S1)</span>
                        <span className="font-mono text-[11px]">
                          {heapObjects.filter((o) => o.generation === 's0' || o.generation === 's1').length} objects
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[38px]">
                        {heapObjects
                          .filter((o) => o.generation === 's0' || o.generation === 's1')
                          .map((obj) => (
                            <div
                              key={obj.id}
                              className="px-2 py-1 rounded text-[11px] font-mono bg-white border border-indigo-200 text-indigo-800"
                            >
                              {obj.name}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Old Gen: Tenured */}
                    <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg">
                      <div className="flex justify-between text-xs font-medium text-slate-800 mb-2">
                        <span>Old / Tenured Generation (Long-lived Objects)</span>
                        <span className="font-mono text-[11px]">
                          {heapObjects.filter((o) => o.generation === 'tenured').length} objects
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[38px]">
                        {heapObjects
                          .filter((o) => o.generation === 'tenured')
                          .map((obj) => (
                            <div
                              key={obj.id}
                              className="px-2 py-1 rounded text-[11px] font-mono bg-white border border-slate-300 text-slate-800"
                            >
                              {obj.name}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- VIEW TAB 2: JAVA CODE & SYNTAX STRUCTURE --- */}
        {activeTab === 'code' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              Standard University Exam Reference Implementation
            </h3>

            <div className="bg-slate-950 text-slate-100 p-5 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {selectedCaseId === 'electricity_bill' && (
                <pre>{`import java.util.Scanner;

public class ElectricityBill {
    // Data Members (Encapsulation)
    private int consumerNo;
    private String consumerName;
    private double previousReading;
    private double currentReading;

    public void acceptInput() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Consumer No: ");
        consumerNo = sc.nextInt();
        System.out.print("Enter Consumer Name: ");
        consumerName = sc.next();
        System.out.print("Enter Previous Reading: ");
        previousReading = sc.nextDouble();
        System.out.print("Enter Current Reading: ");
        currentReading = sc.nextDouble();
    }

    public double calculateBill() {
        double units = currentReading - previousReading;
        double bill = 0.0;

        if (units >= 0 && units <= 100) {
            bill = units * 1.0;
        } else if (units > 100 && units <= 200) {
            bill = (100 * 1.0) + ((units - 100) * 2.50);
        } else if (units > 200 && units <= 500) {
            bill = (100 * 1.0) + (100 * 2.50) + ((units - 200) * 4.0);
        } else {
            bill = (100 * 1.0) + (100 * 2.50) + (300 * 4.0) + ((units - 500) * 6.0);
        }
        return bill;
    }

    public static void main(String[] args) {
        ElectricityBill eb = new ElectricityBill();
        eb.acceptInput();
        System.out.println("Total Electricity Bill: Rs. " + eb.calculateBill());
    }
}`}</pre>
              )}

              {selectedCaseId === 'employee_payroll' && (
                <pre>{`import java.util.Scanner;

public class Employee {
    String empName, address, mailId, mobileNo;
    int empId;
    double bp; // Basic Pay

    public void getDetails() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Employee ID: ");
        empId = sc.nextInt();
        System.out.print("Enter Employee Name: ");
        empName = sc.next();
        System.out.print("Enter Basic Pay: ");
        bp = sc.nextDouble();
    }

    public void generatePaySlip() {
        double da = bp * 0.97;         // 97% of BP
        double hra = bp * 0.10;        // 10% of BP
        double pf = bp * 0.12;         // 12% of BP
        double staffClub = bp * 0.001; // 0.1% of BP

        double gross = bp + da + hra;
        double net = gross - pf - staffClub;

        System.out.println("========== PAY SLIP ==========");
        System.out.println("Employee ID   : " + empId);
        System.out.println("Employee Name : " + empName);
        System.out.println("Basic Pay     : Rs. " + bp);
        System.out.println("DA (97%)      : Rs. " + da);
        System.out.println("HRA (10%)     : Rs. " + hra);
        System.out.println("Gross Salary  : Rs. " + gross);
        System.out.println("PF (12%)      : Rs. " + pf);
        System.out.println("Staff Club    : Rs. " + staffClub);
        System.out.println("------------------------------");
        System.out.println("Net Salary    : Rs. " + net);
        System.out.println("==============================");
    }

    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.getDetails();
        emp.generatePaySlip();
    }
}`}</pre>
              )}

              {selectedCaseId === 'oop_modularity' && (
                <pre>{`class Rectangle {
    double length, width;

    // Constructor with 'this' resolution
    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    double calculateArea() {
        return length * width;
    }
}

class AreaCalculator {
    // Accepts Rectangle object by reference
    void displayArea(Rectangle r) {
        System.out.println("Calculated Area = " + r.calculateArea());
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle(10, 5);
        AreaCalculator ac = new AreaCalculator();
        ac.displayArea(rect); // Clean separation of concerns
    }
}`}</pre>
              )}

              {selectedCaseId === 'string_processor' && (
                <pre>{`import java.util.Scanner;

public class StringProcessor {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter sentence: ");
        String sentence = sc.nextLine();

        // 1. Count words using split
        String[] words = sentence.split(" ");
        int count = words.length;

        // 2. Find longest word
        String longest = "";
        for (String word : words) {
            if (word.length() > longest.length()) {
                longest = word;
            }
        }

        // 3. Reverse sentence using mutable StringBuilder
        StringBuilder sb = new StringBuilder(sentence);
        String reversed = sb.reverse().toString();

        System.out.println("Word Count   : " + count);
        System.out.println("Longest Word : " + longest);
        System.out.println("Reversed     : " + reversed);
    }
}`}</pre>
              )}

              {selectedCaseId === 'jvm_garbage_collection' && (
                <pre>{`class Demo {
    @Override
    protected void finalize() {
        System.out.println("Object is garbage collected by JVM thread.");
    }
}

public class GarbageCollectionDemo {
    public static void main(String[] args) {
        Demo obj1 = new Demo();
        Demo obj2 = new Demo();

        // Severing references
        obj1 = null;
        obj2 = null;

        // Request JVM GC run
        System.gc();
        System.out.println("Garbage collection requested.");
    }
}`}</pre>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW TAB 3: UNIVERSITY MARKING RUBRIC --- */}
        {activeTab === 'rubric' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Official Examination Rubric & Marks Distribution
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Course Code: 2321CSC304R · Regulations R 2023-V 1.2
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total Weightage</span>
                <div className="text-lg font-bold font-mono text-indigo-700">
                  {currentCase.totalMarks} Marks
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Evaluation Criterion</th>
                    <th className="py-2.5 px-4 text-right">Awarded Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {currentCase.markingDistribution.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.criterion}</span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                        {item.marks} Mark{item.marks > 1 ? 's' : ''}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50/50 font-bold text-indigo-950">
                    <td className="py-3 px-4">Total Aggregate Score</td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-indigo-700">
                      {currentCase.totalMarks} / {currentCase.totalMarks}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
