import React, { useState } from 'react';
import { Heart, Activity, Cpu, Battery, Wifi, Shield, ArrowRight, Play, RotateCcw, AlertCircle } from 'lucide-react';

export const Unit5DesignSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'uml-states' | 'abstraction-zoom' | 'edge-vs-cloud' | 'verification'>('uml-states');

  // --- UML State Machine State ---
  type WearableState = 'SLEEP' | 'SENSING_PPG' | 'SUSPECT_ARRHYTHMIA' | 'ANALYSING_ECG' | 'ALERTING';
  const [currentState, setCurrentState] = useState<WearableState>('SLEEP');
  const [ecgHeartRateBpm, setEcgHeartRateBpm] = useState<number>(72);
  const [isAfibInjected, setIsAfibInjected] = useState<boolean>(false);
  const [stateLog, setStateLog] = useState<string[]>([
    'UML Statechart Engine initialized (QP framework).',
    'State: SLEEP (Ultra-low quiescent current: 15 µA).',
  ]);

  const addStateLog = (msg: string) => {
    setStateLog((prev) => [msg, ...prev.slice(0, 4)]);
  };

  const triggerPpgPeriodicWake = () => {
    setCurrentState('SENSING_PPG');
    addStateLog('Timer Event: RTC woke MCU -> SENSING_PPG (80 µA). Green optical LED pulsing at 25 Hz.');
  };

  const triggerAfibDetection = () => {
    setIsAfibInjected(true);
    setCurrentState('SUSPECT_ARRHYTHMIA');
    addStateLog('EVENT: R-R peak variability > 24% detected in PPG -> Prompts user for dry electrode touch.');

    setTimeout(() => {
      setCurrentState('ANALYSING_ECG');
      addStateLog('STATE: ANALYSING_ECG (4 mA). Hardware NPU running 1D-CNN convolution layers on 30s ECG trace.');

      setTimeout(() => {
        setCurrentState('ALERTING');
        addStateLog('STATE: ALERTING! AFib Confirmed (98.2% confidence). Vibration motor ON + BLE emergency dispatch.');
      }, 1200);
    }, 1000);
  };

  const resetStatechart = () => {
    setCurrentState('SLEEP');
    setIsAfibInjected(false);
    setEcgHeartRateBpm(72);
    addStateLog('Transition: Retrying Sleep Mode (15 µA). System quiescent.');
  };

  // --- Abstraction Zoom State ---
  const [abstractionLevel, setAbstractionLevel] = useState<'behavioral' | 'rtl' | 'gate'>('behavioral');

  // --- Edge vs Cloud Tradeoff Calculator ---
  const [samplingRateHz, setSamplingRateHz] = useState<number>(250);
  const [dailyScans, setDailyScans] = useState<number>(4);

  const edgeBatteryDays = (7.5 - (dailyScans * 0.05)).toFixed(1);
  const cloudBatteryHours = (12.5 - (dailyScans * 0.4)).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-sm">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
              Unit 5 Design & Applications
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">UML Statecharts, Abstraction Levels & Edge AI Architecture</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Medical Wearable Design & Edge AI Studio</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('uml-states')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'uml-states' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            UML Statechart Engine
          </button>
          <button
            onClick={() => setActiveTab('abstraction-zoom')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'abstraction-zoom' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3 Abstraction Levels
          </button>
          <button
            onClick={() => setActiveTab('edge-vs-cloud')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'edge-vs-cloud' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Edge AI vs Cloud Matrix
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'verification' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            V&V / Testing Rig
          </button>
        </div>
      </div>

      {/* Tab 1: UML Statechart Engine */}
      {activeTab === 'uml-states' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  Hierarchical UML Statechart: Smart Band Power & Cardiac Event Flow
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Trigger heart rate events to see how the embedded firmware transitions through deterministic states while managing micro-amp power budgets.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={triggerPpgPeriodicWake}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs"
                >
                  RTC Wake (PPG)
                </button>
                <button
                  onClick={triggerAfibDetection}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white flex items-center gap-1 shadow-2xs"
                >
                  <Activity className="w-3.5 h-3.5" />
                  Simulate AFib Event
                </button>
                <button
                  onClick={resetStatechart}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Statechart Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
              {[
                { id: 'SLEEP', label: '1. SLEEP', current: '15 µA', desc: 'Clocks gated, RTC alive' },
                { id: 'SENSING_PPG', label: '2. SENSING PPG', current: '80 µA', desc: 'Optical LED 25 Hz pulse' },
                { id: 'SUSPECT_ARRHYTHMIA', label: '3. SUSPECT', current: '350 µA', desc: 'R-R variance > 24%' },
                { id: 'ANALYSING_ECG', label: '4. ANALYSING', current: '4 mA', desc: 'NPU 1D-CNN Inference' },
                { id: 'ALERTING', label: '5. ALERTING', current: '15 mA', desc: 'Haptic + BLE 5.2 link' },
              ].map((st) => {
                const isActive = currentState === st.id;
                return (
                  <div
                    key={st.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-rose-50 border-rose-500 shadow-sm ring-2 ring-rose-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isActive ? 'text-rose-900' : 'text-slate-700'}`}>
                          {st.label}
                        </span>
                        {isActive && <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2">{st.desc}</div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] font-mono text-amber-700 font-bold">
                      Current: {st.current}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* State Transition Console */}
            <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">State Transition History:</div>
              {stateLog.map((log, i) => (
                <div key={i} className="text-slate-600 truncate border-b border-slate-100 last:border-none py-0.5">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3 Abstraction Levels */}
      {activeTab === 'abstraction-zoom' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  Levels of Abstraction in Silicon & Firmware
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  How high-level C logic translates down to Register Transfer Level (Verilog) and physical CMOS Silicon Gates.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                {(['behavioral', 'rtl', 'gate'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setAbstractionLevel(lvl)}
                    className={`px-3 py-1 rounded capitalize transition-colors ${
                      abstractionLevel === lvl ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl} Level
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-mono text-xs shadow-inner">
              {abstractionLevel === 'behavioral' && (
                <div>
                  <div className="text-cyan-400 font-sans font-bold text-sm mb-2">
                    Level 1: Behavioral (Algorithmic C/C++)
                  </div>
                  <pre className="leading-relaxed overflow-x-auto">
{`// High-level decision logic:
if (rr_variance > RR_THRESHOLD && heart_rate_bpm > 100) {
    afib_confidence_score = evaluate_npu_model(ecg_buffer_30s);
    if (afib_confidence_score >= 0.85f) {
        raise_medical_alert(ALERT_CRITICAL_AFIB);
    }
}`}
                  </pre>
                  <p className="font-sans text-slate-400 text-xs mt-3">
                    Engineers reason about mathematical algorithms, timing budgets, and API calls without worrying about clock edges.
                  </p>
                </div>
              )}

              {abstractionLevel === 'rtl' && (
                <div>
                  <div className="text-amber-400 font-sans font-bold text-sm mb-2">
                    Level 2: RTL (Register Transfer Level - Verilog HDL)
                  </div>
                  <pre className="leading-relaxed overflow-x-auto">
{`module ecg_fir_mac (
    input  wire        clk,
    input  wire        rst_n,
    input  wire signed [15:0] sample_in,
    input  wire signed [15:0] coeff_in,
    output reg  signed [31:0] mac_acc
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) mac_acc <= 32'sd0;
        else mac_acc <= mac_acc + (sample_in * coeff_in);
    end
endmodule`}
                  </pre>
                  <p className="font-sans text-slate-400 text-xs mt-3">
                    Describes synchronous digital hardware: data movement between flip-flop registers on every clock edge.
                  </p>
                </div>
              )}

              {abstractionLevel === 'gate' && (
                <div>
                  <div className="text-purple-400 font-sans font-bold text-sm mb-2">
                    Level 3: Physical Gate Level (Silicon Logic Gates & Netlist)
                  </div>
                  <pre className="leading-relaxed overflow-x-auto">
{`// Synthesized Standard Cell Netlist (TSMC 22nm Ultra-Low Power):
NAND2_X1 U12 (.A(reg_q[3]), .B(sample_valid), .Y(n_12));
NOR2_X1  U13 (.A(n_12), .B(rst_n), .Y(d_wire));
DFF_X1   U14 (.D(d_wire), .CK(clk), .Q(mac_acc[4]), .QN());`}
                  </pre>
                  <p className="font-sans text-slate-400 text-xs mt-3">
                    The electronic blueprint composed of actual silicon transistors, NAND gates, NOR gates, and wire delays.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Edge AI vs Cloud AI Matrix */}
      {activeTab === 'edge-vs-cloud' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Edge AI vs. Cloud AI Tradeoff Calculator
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Explore why Mr. Sharma's smart band performs inference locally on wrist silicon rather than streaming raw ECG to cloud servers.
            </p>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-white border border-slate-200 mb-6 text-xs shadow-2xs">
              <div>
                <div className="flex justify-between text-slate-700 mb-1 font-medium">
                  <span>Wearable Sampling Rate:</span>
                  <span className="font-mono text-blue-700 font-bold">{samplingRateHz} Hz</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="50"
                  value={samplingRateHz}
                  onChange={(e) => setSamplingRateHz(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1 font-medium">
                  <span>Daily On-Demand 30s ECG Scans:</span>
                  <span className="font-mono text-rose-700 font-bold">{dailyScans} scans/day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={dailyScans}
                  onChange={(e) => setDailyScans(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Side-by-side Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Edge AI Card */}
              <div className="p-4 rounded-xl bg-white border border-emerald-300 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-emerald-800 mb-3">
                  <span>ON-WRIST EDGE AI (NPU)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    REAL APPLICATION
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-600">Battery Endurance:</span>
                    <span className="font-mono font-bold text-emerald-700">{edgeBatteryDays} Days (180 mAh)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-600">Alert Latency:</span>
                    <span className="font-mono font-bold text-emerald-700">120 ms (Instant)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-600">Zero Cellular Signal:</span>
                    <span className="font-mono font-bold text-emerald-700">100% Functional (Full Offline)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Medical Privacy:</span>
                    <span className="font-mono font-bold text-emerald-700">Zero Continuous Biometric Streaming</span>
                  </div>
                </div>
              </div>

              {/* Cloud AI Card */}
              <div className="p-4 rounded-xl bg-white border border-rose-300 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-rose-800 mb-3">
                  <span>CONTINUOUS CLOUD STREAMING</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    UNVIABLE ARCHITECTURE
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-600">Battery Endurance:</span>
                    <span className="font-mono font-bold text-rose-700">{cloudBatteryHours} Hours (Dead by noon)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-600">Alert Latency:</span>
                    <span className="font-mono font-bold text-rose-700">3,400 ms (Network lag)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-600">Zero Cellular Signal:</span>
                    <span className="font-mono font-bold text-rose-700">0% (Completely Blind)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Medical Privacy:</span>
                    <span className="font-mono font-bold text-rose-700">Continuous 4G Telemetry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Verification & Testing Rig */}
      {activeTab === 'verification' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Medical Software Verification & Validation (V&V)
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Real testing methodologies applied before releasing life-critical medical wearable firmware.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="font-bold text-indigo-900 mb-1">Verification ("Did we build it right?")</div>
                <div className="text-slate-500 text-[11px] mb-3">Internal engineering checks against technical specifications.</div>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                  <li>Static analysis: 0 MISRA C:2012 violations</li>
                  <li>McCabe Cyclomatic Complexity &lt; 15 per function</li>
                  <li>100% statement and MC/DC code branch coverage</li>
                  <li>Static stack size verification to prevent stack overflows</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="font-bold text-emerald-900 mb-1">Validation ("Did we build the right thing?")</div>
                <div className="text-slate-500 text-[11px] mb-3">Clinical and real-world efficacy for the patient.</div>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                  <li>Clinical trials on 400 hospital cardiology patients</li>
                  <li>Regression testing on 500 benchmarked MIT-BIH ECG recordings</li>
                  <li>Motion artifact robustness (tested at 6 km/h running)</li>
                  <li>Fault injection: electrode detachment recovery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
