import React, { useState } from 'react';
import { Cpu, ArrowRight, Play, RotateCcw, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Unit2ArchitectureSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bus-race' | 'can-arbitration' | 'abs-slip'>('bus-race');

  // --- Bus Race State ---
  const [vehicleSpeedKmh, setVehicleSpeedKmh] = useState<number>(90);
  const [isSimulatingBrake, setIsSimulatingBrake] = useState<boolean>(false);
  const [harvardClockCycles, setHarvardClockCycles] = useState<number>(0);
  const [vonNeumannClockCycles, setVonNeumannClockCycles] = useState<number>(0);
  const [harvardBrakingDistanceMeters, setHarvardBrakingDistanceMeters] = useState<number>(0);
  const [vonNeumannBrakingDistanceMeters, setVonNeumannBrakingDistanceMeters] = useState<number>(0);

  const runBusRace = () => {
    setIsSimulatingBrake(true);
    setHarvardClockCycles(0);
    setVonNeumannClockCycles(0);

    let cycle = 0;
    const interval = setInterval(() => {
      cycle += 1;
      setHarvardClockCycles(cycle);
      setVonNeumannClockCycles(Math.floor(cycle * 2.4));

      if (cycle >= 20) {
        clearInterval(interval);
        setIsSimulatingBrake(false);

        const v = (vehicleSpeedKmh * 1000) / 3600;
        const distHarvard = 0.5 * (v * v) / (0.8 * 9.81) + v * 0.012;
        const distVonNeumann = 0.5 * (v * v) / (0.8 * 9.81) + v * 0.068 + 4.8;

        setHarvardBrakingDistanceMeters(Number(distHarvard.toFixed(1)));
        setVonNeumannBrakingDistanceMeters(Number(distVonNeumann.toFixed(1)));
      }
    }, 80);
  };

  // --- CAN Arbitration State ---
  const [canBitStep, setCanBitStep] = useState<number>(0);
  const absIdBits = ['0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0'];
  const climateIdBits = ['1', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0'];

  const stepCanArbitration = () => {
    if (canBitStep < 11) {
      setCanBitStep((prev) => prev + 1);
    }
  };

  const resetCanArbitration = () => {
    setCanBitStep(0);
  };

  // --- ABS Slip State ---
  const [hydraulicPressureBar, setHydraulicPressureBar] = useState<number>(120);
  const [wheelSlipPct, setWheelSlipPct] = useState<number>(18);
  const [solenoidPulsing, setSolenoidPulsing] = useState<boolean>(true);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-sm">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Unit 2 Architecture Lab
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">ECU Silicon Bus, CAN Protocol & Microcontroller Integration</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Automotive ABS ECU Architecture Studio</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bus-race')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'bus-race' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Harvard vs Von Neumann Race
          </button>
          <button
            onClick={() => setActiveTab('can-arbitration')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'can-arbitration' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CAN Bus Priority Arbitration
          </button>
          <button
            onClick={() => setActiveTab('abs-slip')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'abs-slip' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4-Wheel Slip & Pulse
          </button>
        </div>
      </div>

      {/* Tab 1: Harvard vs Von Neumann Bus Race */}
      {activeTab === 'bus-race' && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  Dual-Bus Parallel Fetch vs. Shared-Bus Bottleneck
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Simulate emergency braking at {vehicleSpeedKmh} km/h on wet asphalt. Watch clock cycle latency accumulate when instruction and data share a single bus.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Speed:</span>
                  <span className="font-mono text-indigo-700 font-bold">{vehicleSpeedKmh} km/h</span>
                </div>
                <button
                  onClick={runBusRace}
                  disabled={isSimulatingBrake}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Stomp Brakes!
                </button>
              </div>
            </div>

            {/* Architecture Comparison Arena */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Harvard Architecture Box */}
              <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-2xs">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-900">HARVARD ARCHITECTURE (Real ABS ECU)</span>
                    <div className="text-[11px] text-slate-500">Separate Instruction Bus + Data Bus</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Dual Bus (I-Code & D-Code)
                  </span>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-100 my-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500">Instruction Bus:</span>
                    <span className="text-indigo-700 font-bold">Fetching "PWM_PULSE_SOLENOID"</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500">Data Bus:</span>
                    <span className="text-blue-700 font-bold">Reading "Wheel_Speed_FL"</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-sans font-semibold mt-1">
                    ✓ Both operations occur SIMULTANEOUSLY on clock cycle #{harvardClockCycles}
                  </div>
                </div>

                <div className="mt-3 flex justify-between items-end text-xs">
                  <div>
                    <div className="text-slate-500">ECU Loop Latency:</div>
                    <div className="font-mono text-indigo-700 font-bold text-base">
                      {isSimulatingBrake ? `${harvardClockCycles * 0.6} ms` : '12 ms (Deterministic)'}
                    </div>
                  </div>
                  {harvardBrakingDistanceMeters > 0 && (
                    <div className="text-right">
                      <div className="text-slate-500">Total Stop Distance:</div>
                      <div className="font-mono text-emerald-700 font-bold text-base">
                        {harvardBrakingDistanceMeters} m <CheckCircle2 className="inline w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Von Neumann Architecture Box */}
              <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-2xs">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-rose-900">VON NEUMANN (Shared Single Bus)</span>
                    <div className="text-[11px] text-slate-500">Single Bus for Instructions & Data</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Von Neumann Bottleneck
                  </span>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-100 my-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500">Shared Bus (Cycle 1):</span>
                    <span className="text-amber-700 font-bold">Fetch Instruction (Data stalled)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500">Shared Bus (Cycle 2):</span>
                    <span className="text-rose-700 font-bold">Fetch Wheel Data (Instruction stalled)</span>
                  </div>
                  <div className="text-[11px] text-rose-700 font-sans font-semibold mt-1">
                    ⚠ Sequential access stall! Clock cycles: #{vonNeumannClockCycles}
                  </div>
                </div>

                <div className="mt-3 flex justify-between items-end text-xs">
                  <div>
                    <div className="text-slate-500">ECU Loop Latency:</div>
                    <div className="font-mono text-rose-700 font-bold text-base">
                      {isSimulatingBrake ? `${vonNeumannClockCycles * 0.6} ms` : '68 ms (Delayed)'}
                    </div>
                  </div>
                  {vonNeumannBrakingDistanceMeters > 0 && (
                    <div className="text-right">
                      <div className="text-slate-500">Total Stop Distance:</div>
                      <div className="font-mono text-rose-700 font-bold text-base">
                        {vonNeumannBrakingDistanceMeters} m <ShieldAlert className="inline w-3.5 h-3.5 text-rose-600" />
                      </div>
                      <div className="text-[10px] text-rose-700 font-bold mt-0.5">
                        (+{(vonNeumannBrakingDistanceMeters - harvardBrakingDistanceMeters).toFixed(1)} m SKID PENALTY!)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CAN Bus Priority & Bitwise Arbitration */}
      {activeTab === 'can-arbitration' && (
        <div className="mt-6 space-y-5">
          <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  CAN Bus Non-Destructive Bitwise Arbitration Visualizer
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  On the 2-wire CAN bus (CAN_H / CAN_L), a <strong>Dominant 0</strong> physically pulls the bus low, overwriting a <strong>Recessive 1</strong>. When two ECUs transmit simultaneously, lower ID number wins without packet collisions!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={stepCanArbitration}
                  disabled={canBitStep >= 11}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  Clock Step Bit ({canBitStep}/11)
                </button>
                <button
                  onClick={resetCanArbitration}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bitwise Comparison Table */}
            <div className="mt-5 space-y-4">
              {/* Node 1: ABS Brake Command */}
              <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-emerald-800">
                    NODE 1: ABS ECU (Brake Pressure Command)
                  </div>
                  <div className="text-xs font-mono text-emerald-700 font-bold">
                    ID: 0x010 (Binary: 00000010000) · Priority: HIGH
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto pb-1">
                  {absIdBits.map((bit, idx) => (
                    <div
                      key={idx}
                      className={`w-7 h-8 flex flex-col items-center justify-center rounded border ${
                        idx < canBitStep
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                          : idx === canBitStep
                          ? 'bg-indigo-600 border-indigo-700 text-white font-bold ring-2 ring-indigo-200'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-[9px] opacity-70">b{idx}</span>
                      <span className="font-bold">{bit}</span>
                    </div>
                  ))}
                  <span className="ml-2 text-xs text-emerald-700 font-sans font-bold">
                    {canBitStep >= 1 ? '→ Continues transmitting on physical bus' : ''}
                  </span>
                </div>
              </div>

              {/* Node 2: Climate Control */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-800">
                    NODE 2: Climate Control ECU (Fan Speed Telemetry)
                  </div>
                  <div className="text-xs font-mono text-slate-500 font-bold">
                    ID: 0x480 (Binary: 10010000000) · Priority: LOW
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto pb-1">
                  {climateIdBits.map((bit, idx) => (
                    <div
                      key={idx}
                      className={`w-7 h-8 flex flex-col items-center justify-center rounded border ${
                        idx === 0 && canBitStep >= 1
                          ? 'bg-rose-50 border-rose-300 text-rose-700 line-through'
                          : idx < canBitStep
                          ? 'bg-slate-50 border-slate-200 text-slate-400'
                          : idx === canBitStep
                          ? 'bg-slate-100 border-slate-300 text-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-[9px] opacity-70">b{idx}</span>
                      <span className="font-bold">{bit}</span>
                    </div>
                  ))}
                  <span className="ml-2 text-xs text-rose-700 font-sans font-bold">
                    {canBitStep >= 1 ? '⚠ Bit 0 sent Recessive 1, saw Dominant 0 → YIELDS SILENTLY!' : ''}
                  </span>
                </div>
              </div>

              {/* Physical Bus State */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs">
                <div className="font-bold text-indigo-900 mb-1">
                  CAN_H / CAN_L Physical Differential Bus Wire State:
                </div>
                <div className="text-slate-700 text-[11px] leading-relaxed">
                  {canBitStep === 0 && 'Both nodes ready to assert Start of Frame (SOF). Press Clock Step Bit.'}
                  {canBitStep >= 1 && (
                    <span>
                      At <strong>Bit 0</strong>, ABS sent <code>0</code> (Dominant) while Climate sent <code>1</code> (Recessive). The physical bus registered <code>0</code>. The Climate ECU transmitter hardware noticed the bus did not match its output, immediately suspended transmission, and transitioned to Receiver mode. <strong>Zero packet corruption, zero collision delay!</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ABS Slip Calculation & Pulse Brake */}
      {activeTab === 'abs-slip' && (
        <div className="mt-6 space-y-5">
          <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Closed-Loop Hydraulic Solenoid Pulsing (15 Hz)
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Tire friction is maximized when wheel slip ratio is kept between 15% and 20%. If slip exceeds 20%, the tire locks into an uncontrollable skid.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                <div className="text-slate-500 font-medium">Current Wheel Slip:</div>
                <div className="text-xl font-mono font-bold text-amber-700 mt-1">{wheelSlipPct}%</div>
                <div className="text-[11px] text-slate-400 mt-1">Target range: 15% – 20%</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                <div className="text-slate-500 font-medium">Hydraulic Pressure:</div>
                <div className="text-xl font-mono font-bold text-indigo-700 mt-1">{hydraulicPressureBar} Bar</div>
                <div className="text-[11px] text-slate-400 mt-1">Controlled by Solenoid PWM</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                <div className="text-slate-500 font-medium">Solenoid Cycle State:</div>
                <div className="text-xl font-mono font-bold text-emerald-700 mt-1">
                  {solenoidPulsing ? 'PULSING (15 Hz)' : 'LOCKED'}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Dump → Hold → Reapply</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setWheelSlipPct(17);
                  setHydraulicPressureBar(95);
                  setSolenoidPulsing(true);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-2xs"
              >
                Pulse Brake (ABS Active)
              </button>
              <button
                onClick={() => {
                  setWheelSlipPct(100);
                  setHydraulicPressureBar(160);
                  setSolenoidPulsing(false);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-2xs"
              >
                Simulate Non-ABS Lockup (100% Skid)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
