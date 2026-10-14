import React, { useState, useEffect } from 'react';
import { Cpu, Play, Pause, RotateCcw, AlertTriangle, Activity, Zap, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

interface TaskItem {
  id: string;
  name: string;
  priority: number;
  color: string;
  durationMs: number;
  state: 'Running' | 'Ready' | 'Blocked' | 'Suspended';
}

export const Unit4RTOSSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheduler' | 'tinyml-pipeline'>('scheduler');

  // --- RTOS Scheduler State ---
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 't-emerg', name: 'Emergency Stop Task', priority: 5, color: 'bg-rose-500', durationMs: 20, state: 'Blocked' },
    { id: 't-infer', name: 'TinyML Inference Task', priority: 4, color: 'bg-purple-600', durationMs: 48, state: 'Ready' },
    { id: 't-sample', name: 'Vibration Sampling Task', priority: 3, color: 'bg-indigo-600', durationMs: 15, state: 'Running' },
    { id: 't-cloud', name: 'Cloud MQTT Upload Task', priority: 1, color: 'bg-amber-600', durationMs: 120, state: 'Ready' },
  ]);

  const [activeRunningTaskId, setActiveRunningTaskId] = useState<string>('t-sample');
  const [timelineLog, setTimelineLog] = useState<{ time: number; taskName: string; color: string }[]>([]);
  const [simTime, setSimTime] = useState<number>(0);
  const [isLiveRunning, setIsLiveRunning] = useState<boolean>(false);
  const [preemptionAlert, setPreemptionAlert] = useState<string | null>(null);

  const stepScheduler = () => {
    setSimTime((prev) => prev + 10);

    const sorted = [...tasks]
      .filter((t) => t.state !== 'Blocked' && t.state !== 'Suspended')
      .sort((a, b) => b.priority - a.priority);

    if (sorted.length > 0) {
      const topTask = sorted[0];
      setActiveRunningTaskId(topTask.id);
      setTimelineLog((prev) => [
        ...prev.slice(-18),
        { time: simTime + 10, taskName: topTask.name, color: topTask.color },
      ]);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveRunning) {
      interval = setInterval(() => {
        stepScheduler();
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isLiveRunning, simTime, tasks]);

  const triggerEmergencySurge = () => {
    setPreemptionAlert('VIBRATION SURGE > 8G! Emergency Cutoff Task unblocked at Priority 5.');
    setTasks((prev) =>
      prev.map((t) => (t.id === 't-emerg' ? { ...t, state: 'Ready' } : t))
    );
    setActiveRunningTaskId('t-emerg');
    setTimeout(() => {
      setPreemptionAlert(null);
    }, 3500);
  };

  const changeTaskPriority = (taskId: string, newPriority: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority: newPriority } : t))
    );
  };

  // --- TinyML Pipeline State ---
  const [activePipelineStage, setActivePipelineStage] = useState<number>(5);

  const pipelineStages = [
    {
      step: 1,
      title: 'Data Collection',
      tag: 'SPI Accelerometer',
      desc: '3-axis MEMS accelerometer sampled at 1660 Hz with 16-bit resolution over 10 MHz SPI bus.',
      metric: '1660 samples/sec',
    },
    {
      step: 2,
      title: 'Preprocessing',
      tag: 'Digital Filter',
      desc: 'High-pass filter removes DC gravity offset; Hanning windowing applied to 1024-sample batch.',
      metric: '1024 window buffer',
    },
    {
      step: 3,
      title: 'Feature Extraction',
      tag: 'DSP Math',
      desc: 'Computes statistical and spectral features: Kurtosis (3.84), RMS (0.42G), and FFT peak frequency (148 Hz).',
      metric: '6 Feature Vector',
    },
    {
      step: 4,
      title: 'Offline Training',
      tag: 'Cloud TensorFlow',
      desc: 'Trained on 6 months of historical bearing vibration datasets (12,000 run-to-failure cycles).',
      metric: '1D-CNN Architecture',
    },
    {
      step: 5,
      title: 'Post-Training Quantization',
      tag: 'Float32 → INT8',
      desc: 'Model weights and biases compressed from 32-bit floats to 8-bit integers. Size shrinks from 240 KB to 62 KB!',
      metric: '74.2% RAM Savings',
    },
    {
      step: 6,
      title: 'Deployment',
      tag: 'TFLite Micro',
      desc: 'Compiled directly with ARM CMSIS-NN kernels into ESP32 firmware flash with 0 external OS dependencies.',
      metric: 'Statically Linked C++',
    },
    {
      step: 7,
      title: 'On-Device Inference',
      tag: 'FreeRTOS Task (P4)',
      desc: 'Executes every 30 seconds on MCU in 48 milliseconds. Outputs class probability distributions.',
      metric: '48 ms Latency',
    },
    {
      step: 8,
      title: 'Predictive Action',
      tag: 'MQTT / SCADA',
      desc: 'Bearing early wear detected! Dispatches alert: "Replace Motor M-17 bearing in 11–14 days. Zero downtime."',
      metric: '11–14 Days Warning',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-slate-900 shadow-sm">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
              Unit 4 RTOS & TinyML Lab
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">FreeRTOS Priority Preemption, IPC Queues & On-Device ML</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Industrial Motor Predictive Maintenance Studio</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('scheduler')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'scheduler' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FreeRTOS Preemptive Scheduler
          </button>
          <button
            onClick={() => setActiveTab('tinyml-pipeline')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'tinyml-pipeline' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TinyML 8-Stage Pipeline
          </button>
        </div>
      </div>

      {/* Tab 1: FreeRTOS Scheduler */}
      {activeTab === 'scheduler' && (
        <div className="mt-6 space-y-6">
          {/* Preemption Alert Banner */}
          {preemptionAlert && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-800 shadow-sm">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{preemptionAlert}</span>
              </div>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-rose-300 text-rose-700">
                Context Switch: 2.4 µs
              </span>
            </div>
          )}

          {/* Controls & Top Status */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500 font-medium">
                Scheduler Rule: <strong className="text-slate-900">Strict Preemptive Priority (Higher Number = Higher Priority)</strong>
              </div>
              <div className="text-xs font-mono text-purple-700 mt-1">
                Currently Executing on Core: <span className="font-bold text-slate-900 uppercase">{tasks.find((t) => t.id === activeRunningTaskId)?.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiveRunning(!isLiveRunning)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs ${
                  isLiveRunning ? 'bg-amber-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isLiveRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isLiveRunning ? 'Pause Ticker' : 'Run Scheduler Live'}
              </button>

              <button
                onClick={stepScheduler}
                disabled={isLiveRunning}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-50 text-xs font-bold text-slate-700 border border-slate-200"
              >
                Tick +10 ms
              </button>

              <button
                onClick={triggerEmergencySurge}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5" />
                Inject Emergency Surge
              </button>
            </div>
          </div>

          {/* Task Priority Configuration Grid */}
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Task Priority Queue (Adjust priorities to test scheduling behavior)
            </h4>

            <div className="space-y-2.5">
              {tasks.map((task) => {
                const isRunning = task.id === activeRunningTaskId;
                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                      isRunning
                        ? 'bg-purple-50/80 border-purple-400 ring-2 ring-purple-200 shadow-2xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full ${task.color} ${isRunning ? 'animate-ping' : ''}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span>{task.name}</span>
                          {isRunning && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-600 text-white font-mono font-bold">
                              RUNNING (CPU CORE 0)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Burst Duration: {task.durationMs} ms · State: {task.state}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono">Priority:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => changeTaskPriority(task.id, lvl)}
                            className={`w-6 h-6 rounded text-xs font-mono font-bold transition-colors ${
                              task.priority === lvl
                                ? 'bg-purple-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Gantt Chart */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex justify-between">
              <span>RTOS Execution Gantt Timeline (Last 18 Slices)</span>
              <span className="font-mono text-purple-700">Time: {simTime} ms</span>
            </div>

            <div className="h-10 bg-white rounded-lg p-1 border border-slate-200 flex gap-1 overflow-hidden shadow-inner">
              {timelineLog.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded ${item.color} flex items-center justify-center text-[9px] font-mono font-bold text-white truncate shadow-2xs`}
                  title={`${item.taskName} @ ${item.time}ms`}
                >
                  {item.taskName.slice(0, 3)}
                </div>
              ))}
              {timelineLog.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
                  Click "Run Scheduler Live" or "Tick +10 ms" to observe task timeline
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: TinyML 8-Stage Pipeline */}
      {activeTab === 'tinyml-pipeline' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
              Complete TinyML Predictive Maintenance Pipeline (Sensor → Quantization → Alert)
            </h4>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1.5 mb-6">
              {pipelineStages.map((stage) => {
                const isActive = stage.step === activePipelineStage;
                return (
                  <button
                    key={stage.step}
                    onClick={() => setActivePipelineStage(stage.step)}
                    className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-sm border-purple-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-purple-100' : 'text-purple-600'}`}>
                      STAGE {stage.step}
                    </span>
                    <span className="text-xs font-bold mt-1 leading-tight">{stage.title}</span>
                    <span className={`text-[9px] mt-1 truncate ${isActive ? 'text-purple-200' : 'text-slate-400'}`}>
                      {stage.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Deep Dive */}
            {(() => {
              const stage = pipelineStages[activePipelineStage - 1];
              return (
                <div className="p-5 rounded-xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xs">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-purple-700">STAGE {stage.step}:</span>
                      <h5 className="text-base font-bold text-slate-900">{stage.title}</h5>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{stage.desc}</p>

                    {stage.step === 5 && (
                      <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs">
                        <div className="text-slate-500 mb-1">INT8 Quantization Formula:</div>
                        <div className="text-purple-700 font-bold">q = round(S * r + Z)</div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Float32 weights (4 bytes) converted to signed 8-bit integers (1 byte). 240 KB → 62 KB!
                        </div>
                      </div>
                    )}

                    {stage.step === 7 && (
                      <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <div className="text-slate-500 font-mono mb-2">Live Inference Class Probabilities:</div>
                        <div className="space-y-1.5 font-mono">
                          <div className="flex justify-between">
                            <span className="text-emerald-700 font-medium">Class 0: Healthy Motor</span>
                            <span>1.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-700 font-bold">Class 1: Early Bearing Wear (Flaking)</span>
                            <span className="font-bold text-amber-700">98.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-rose-700 font-medium">Class 2: Severe Seizure Risk</span>
                            <span>0.1%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Key Engineering Metric</div>
                      <div className="text-lg font-bold font-mono text-purple-700 mt-1">{stage.metric}</div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200">
                      <div className="text-[10px] text-slate-400">Where it lives:</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">{stage.tag}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
