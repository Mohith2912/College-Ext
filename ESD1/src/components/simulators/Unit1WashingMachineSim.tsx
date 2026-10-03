import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Zap, Droplets, Gauge, Wifi, WifiOff } from 'lucide-react';

export const Unit1WashingMachineSim: React.FC = () => {
  // Cycle states
  const [cycleState, setCycleState] = useState<'standby' | 'filling' | 'washing' | 'rinsing' | 'spinning'>('standby');
  const [drumRPM, setDrumRPM] = useState<number>(0);
  const [waterLevelPct, setWaterLevelPct] = useState<number>(0);
  const [lidLocked, setLidLocked] = useState<boolean>(true);
  const [powerWatts, setPowerWatts] = useState<number>(0.3);
  const [wifiConnected, setWifiConnected] = useState<boolean>(true);
  const [pwmDutyCycle, setPwmDutyCycle] = useState<number>(0);

  // Real-time event states
  const [emergencyCutoffActive, setEmergencyCutoffActive] = useState<boolean>(false);
  const [hardRealTimeTimerMs, setHardRealTimeTimerMs] = useState<number | null>(null);
  const [isSoftRealTimeMode, setIsSoftRealTimeMode] = useState<boolean>(false);
  const [overflowOccurred, setOverflowOccurred] = useState<boolean>(false);
  const [eventLog, setEventLog] = useState<string[]>([
    'System Boot: Bare-metal firmware initialized (512 KB Flash, 64 KB RAM).',
    'Sensors OK: Water pressure frequency sensor baseline at 18.2 kHz.',
    'Standby: Power consumption stabilized at 0.3 W.',
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 6)]);
  };

  // State machine ticker
  useEffect(() => {
    if (cycleState === 'standby') {
      setDrumRPM(0);
      setPowerWatts(0.3);
      setPwmDutyCycle(0);
      return;
    }

    const interval = setInterval(() => {
      if (cycleState === 'filling') {
        setPowerWatts(14);
        setPwmDutyCycle(0);
        setDrumRPM(0);
        setWaterLevelPct((prev) => {
          if (prev >= 100) {
            setCycleState('washing');
            addLog('Hard Real-Time: Pressure sensor 21.4 kHz reached. Valve closed in 18 ms.');
            return 100;
          }
          return prev + 10;
        });
      } else if (cycleState === 'washing') {
        setPowerWatts(120);
        setPwmDutyCycle(45);
        setDrumRPM((prev) => (prev === 45 ? -45 : 45));
      } else if (cycleState === 'rinsing') {
        setPowerWatts(160);
        setPwmDutyCycle(60);
        setDrumRPM(350);
      } else if (cycleState === 'spinning') {
        setPowerWatts(345);
        setPwmDutyCycle(92);
        setDrumRPM(1200);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [cycleState]);

  // Handle water full event
  const triggerWaterFullDeadline = () => {
    addLog('ALERT: Water chamber level reached critical 100% threshold!');
    setWaterLevelPct(100);

    if (isSoftRealTimeMode) {
      setHardRealTimeTimerMs(1420);
      setTimeout(() => {
        setOverflowOccurred(true);
        addLog('CRITICAL FAULT: Water valve delayed by 1420 ms! Chassis overflow detected! Floor flooding!');
      }, 1420);
    } else {
      setHardRealTimeTimerMs(18);
      setTimeout(() => {
        addLog('HARD REAL-TIME SUCCESS: Triac cut solenoid power in 18 ms (< 200 ms deadline). 0 overflow.');
        setCycleState('washing');
      }, 100);
    }
  };

  // Handle Lid Opened during Spin
  const triggerLidOpenSpin = () => {
    setLidLocked(false);
    setCycleState('spinning');
    setDrumRPM(1200);
    setPowerWatts(350);
    addLog('EVENT: User lid switch OPENED while drum is spinning at 1200 RPM!');

    setEmergencyCutoffActive(true);
    setTimeout(() => {
      setDrumRPM(0);
      setPwmDutyCycle(0);
      setPowerWatts(0.5);
      addLog('HARD REAL-TIME INTERRUPT (EXTI0): 3-Phase Inverter dynamic brake activated in 24 ms. Drum locked safely.');
    }, 250);
  };

  const resetSystem = () => {
    setCycleState('standby');
    setDrumRPM(0);
    setWaterLevelPct(0);
    setLidLocked(true);
    setPowerWatts(0.3);
    setPwmDutyCycle(0);
    setEmergencyCutoffActive(false);
    setHardRealTimeTimerMs(null);
    setOverflowOccurred(false);
    addLog('RESET: Microcontroller re-initialized to Standby 0.3 W.');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Unit 1 Interactive Lab
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Smart Appliance Firmware & Real-Time Engine</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Smart Washing Machine Closed-Loop Simulator</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setWifiConnected(!wifiConnected)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              wifiConnected
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-rose-50 border-rose-300 text-rose-700'
            }`}
          >
            {wifiConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {wifiConnected ? 'IoT Connected (MQTT Active)' : 'Standalone (Wi-Fi Offline)'}
          </button>

          <button
            onClick={resetSystem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Machine Visualizer + Live Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Washing Machine Graphic & State Machine */}
        <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-500">
                STATE: <strong className="text-blue-700 uppercase font-bold">{cycleState}</strong>
              </span>
              <span className="text-xs font-mono text-slate-500">
                POWER: <strong className="text-amber-700 font-bold">{powerWatts.toFixed(1)} W</strong>
                {cycleState === 'standby' && ' (Sleep Mode)'}
              </span>
            </div>

            {/* Visual Drum & Water */}
            <div className="relative h-56 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
              {/* Water level fill */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-blue-500/20 border-t-2 border-blue-400 transition-all duration-500"
                style={{ height: `${waterLevelPct}%` }}
              />

              {/* Overflow warning overlay */}
              {overflowOccurred && (
                <div className="absolute inset-0 bg-rose-600/90 flex flex-col items-center justify-center p-4 text-center z-20 animate-pulse text-white">
                  <AlertTriangle className="w-10 h-10 mb-2" />
                  <p className="font-bold text-sm">FLOOD HAZARD: WATER OVERFLOW</p>
                  <p className="text-xs mt-1">Soft real-time delayed the valve cutoff by 1420 ms!</p>
                </div>
              )}

              {/* Rotating Drum */}
              <div
                className={`w-36 h-36 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center transition-all ${
                  drumRPM !== 0 ? 'border-blue-500' : ''
                }`}
                style={{
                  transform: `rotate(${drumRPM * 4}deg)`,
                  transitionDuration: drumRPM > 600 ? '100ms' : '400ms',
                }}
              >
                <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center p-2 shadow-sm">
                  <span className="text-base font-mono font-bold text-slate-800">{Math.abs(drumRPM)}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">RPM</span>
                </div>
              </div>

              {/* Sensor overlays */}
              <div className="absolute top-2.5 left-2.5 text-[11px] font-mono bg-white/95 px-2.5 py-1 rounded-md border border-slate-200 text-slate-700 shadow-2xs">
                Pressure: {(18.2 + (waterLevelPct / 100) * 3.2).toFixed(1)} kHz
              </div>
              <div className="absolute top-2.5 right-2.5 text-[11px] font-mono bg-white/95 px-2.5 py-1 rounded-md border border-slate-200 text-slate-700 shadow-2xs">
                Lid Lock: {lidLocked ? <span className="text-emerald-700 font-bold">LOCKED</span> : <span className="text-rose-700 font-bold">OPEN</span>}
              </div>
            </div>

            {/* Cycle Control Buttons */}
            <div className="grid grid-cols-5 gap-2 mt-4">
              {(['standby', 'filling', 'washing', 'rinsing', 'spinning'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setCycleState(mode);
                    setEmergencyCutoffActive(false);
                    setOverflowOccurred(false);
                    addLog(`Cycle state changed to: ${mode.toUpperCase()}`);
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-lg capitalize transition-all ${
                    cycleState === mode
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* PWM & Power Gauge */}
          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Motor Inverter PWM:</span>
                <span className="font-mono text-blue-700 font-bold">{pwmDutyCycle}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${pwmDutyCycle}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Power Draw:</span>
                <span className="font-mono text-amber-700 font-bold">{powerWatts} W</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (powerWatts / 350) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hard vs Soft Real-Time Test Bed */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Hard vs Soft Real-Time Test Panel */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Real-Time Constraint Test Lab
            </h4>

            <div className="space-y-3">
              {/* Real-time toggle mode */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Solenoid Cutoff Mode</div>
                  <div className="text-[11px] text-slate-500">
                    {isSoftRealTimeMode ? 'Soft Real-Time (Non-deterministic delay)' : 'Hard Real-Time (< 200 ms ISR cutoff)'}
                  </div>
                </div>
                <button
                  onClick={() => setIsSoftRealTimeMode(!isSoftRealTimeMode)}
                  className={`text-xs px-2.5 py-1 rounded-md font-bold border transition-colors ${
                    isSoftRealTimeMode
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  }`}
                >
                  {isSoftRealTimeMode ? 'Soft (Buggy)' : 'Hard Real-Time'}
                </button>
              </div>

              {/* Action 1: Water full trigger */}
              <button
                onClick={triggerWaterFullDeadline}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>Trigger Water "Full" Threshold (21.4 kHz)</span>
                <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-700 font-bold">
                  Target: &lt; 200 ms
                </span>
              </button>

              {/* Action 2: Lid open during spin */}
              <button
                onClick={triggerLidOpenSpin}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>Force Open Lid at 1200 RPM Spin</span>
                <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-amber-200 text-amber-800 font-bold">
                  EXTI0 &lt; 35 ms
                </span>
              </button>

              {hardRealTimeTimerMs !== null && (
                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between shadow-2xs">
                  <span className="text-slate-600 font-medium">Last Response Time:</span>
                  <span
                    className={`font-mono font-bold ${
                      hardRealTimeTimerMs <= 200 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {hardRealTimeTimerMs} ms {hardRealTimeTimerMs <= 200 ? '(MET DEADLINE)' : '(DEADLINE MISSED)'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Firmware Event Log */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 flex-1 flex flex-col">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Firmware Console Output</span>
              <span className="text-[10px] text-slate-500 font-mono">Flash: 38.4 KB / 512 KB</span>
            </div>
            <div className="font-mono text-[11px] text-slate-700 space-y-1 overflow-y-auto max-h-36 flex-1 pr-1 bg-white p-2.5 rounded-lg border border-slate-200">
              {eventLog.map((log, idx) => (
                <div key={idx} className="leading-tight border-b border-slate-100 pb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
