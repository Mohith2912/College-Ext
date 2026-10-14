import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Check,
  CheckCheck,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Terminal,
  AlertCircle,
  ArrowRight,
  Wifi,
  Smartphone,
  Cloud,
  Database,
  Sliders,
  ShieldCheck,
  Activity,
  Layers,
  Network,
  Server,
  Zap,
  HelpCircle,
  Copy,
  Info,
  Radio,
  FileCheck2,
  RefreshCw,
  Cpu
} from 'lucide-react';
import {
  TRANSIT_STAGES,
  COMPARISON_TABLE,
  ENCAPSULATION_STACK,
  DIAGNOSTIC_CASES,
  QUIZ_QUESTIONS,
  MATCH_PAIRS,
  GUARDRAILS
} from './data';
import { TransitStage } from './types';

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState<'simulator' | 'architectures' | 'playbook' | 'diagnostic' | 'quiz' | 'guardrails'>('simulator');

  // Transit Simulator State
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(3000); // ms per stage
  const [chatMessage, setChatMessage] = useState<string>('Good morning!');
  const [sentMessage, setSentMessage] = useState<string>('Good morning!');
  const [senderStatus, setSenderStatus] = useState<'clock' | 'one-tick' | 'two-ticks' | 'blue-ticks'>('blue-ticks');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playbook State (Load Balancing & Auto-Scaling)
  const [trafficVolume, setTrafficVolume] = useState<number>(45); // in k msgs/sec
  const [lbAlgorithm, setLbAlgorithm] = useState<'round-robin' | 'least-conn' | 'consistent-hash'>('consistent-hash');
  const [autoScaleMode, setAutoScaleMode] = useState<boolean>(true);
  const [simulatedFailureNode, setSimulatedFailureNode] = useState<number | null>(null);
  const [isSurgeActive, setIsSurgeActive] = useState<boolean>(false);

  // Genetic Algorithm Visualizer State
  const [gaGeneration, setGaGeneration] = useState<number>(1);
  const [gaMutationRate, setGaMutationRate] = useState<number>(5);
  const [gaBestFitness, setGaBestFitness] = useState<number>(84.2);
  const [gaPaths, setGaPaths] = useState([
    { id: 'Path-A', via: 'Chennai → Hyderabad → Nagpur → Delhi', latency: 44, loss: 0.08, fitness: 84.2, active: true },
    { id: 'Path-B', via: 'Chennai → Bangalore → Mumbai → Delhi', latency: 52, loss: 0.12, fitness: 76.5, active: false },
    { id: 'Path-C', via: 'Chennai → Vijayawada → Kolkata → Delhi', latency: 68, loss: 0.28, fitness: 61.0, active: false },
    { id: 'Path-D', via: 'Chennai → Pune → Ahmedabad → Delhi', latency: 58, loss: 0.15, fitness: 71.4, active: false }
  ]);

  // Failure Topology Sandbox
  const [activeSandboxScenario, setActiveSandboxScenario] = useState<'nominal' | 'spine-cut' | 'worker-crash' | 'slice-jam'>('nominal');

  // Encapsulation Inspector Layer
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  // Diagnostic Lab State
  const [selectedCaseId, setSelectedCaseId] = useState<string>(DIAGNOSTIC_CASES[0].id);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Match the Following State
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [matchEvaluated, setMatchEvaluated] = useState<boolean>(false);

  const currentStage: TransitStage = TRANSIT_STAGES[currentStageIndex];

  // Simulator Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStageIndex((prev) => {
          if (prev < TRANSIT_STAGES.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Sync tick status with stage index
  useEffect(() => {
    if (currentStageIndex === 0) setSenderStatus('clock');
    else if (currentStageIndex >= 1 && currentStageIndex <= 4) setSenderStatus('one-tick');
    else if (currentStageIndex >= 5 && currentStageIndex <= 6) setSenderStatus('two-ticks');
    else if (currentStageIndex === 7) setSenderStatus('blue-ticks');
  }, [currentStageIndex]);

  // Send message action
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim()) return;
    setSentMessage(chatMessage);
    setCurrentStageIndex(0);
    setSenderStatus('clock');
    setIsPlaying(true);
  };

  // Run next GA generation
  const handleNextGeneration = () => {
    setGaGeneration((prev) => prev + 1);
    setGaBestFitness((prev) => Math.min(99.6, +(prev + (Math.random() * 2.8 - 0.4)).toFixed(1)));
    setGaPaths((prev) =>
      prev.map((p, idx) => ({
        ...p,
        latency: Math.max(38, Math.round(p.latency + (Math.random() * 4 - 2.5))),
        loss: +(Math.max(0.01, p.loss + (Math.random() * 0.04 - 0.03))).toFixed(2),
        fitness: +(Math.min(99.4, p.fitness + (idx === 0 ? 1.4 : Math.random() * 2.2 - 0.8))).toFixed(1)
      }))
    );
  };

  // Trigger New Year's Eve Traffic Surge
  const handleTriggerSurge = () => {
    setIsSurgeActive(true);
    setTrafficVolume(320); // 320k msgs/sec
    setTimeout(() => {
      setIsSurgeActive(false);
    }, 8000);
  };

  // Copy command helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  // Match Pair click handlers
  const handleConceptClick = (conceptId: string) => {
    if (userMatches[conceptId]) {
      // unpair
      const newMatches = { ...userMatches };
      delete newMatches[conceptId];
      setUserMatches(newMatches);
      setMatchEvaluated(false);
      return;
    }
    setSelectedConcept(conceptId);
  };

  const handleMechanismClick = (mechanismId: string) => {
    if (!selectedConcept) return;
    setUserMatches({
      ...userMatches,
      [selectedConcept]: mechanismId
    });
    setSelectedConcept(null);
    setMatchEvaluated(false);
  };

  const resetMatches = () => {
    setUserMatches({});
    setSelectedConcept(null);
    setMatchEvaluated(false);
  };

  // Calculate Auto-scaler nodes
  const calculatedNodes = autoScaleMode
    ? Math.max(3, Math.min(18, Math.ceil(trafficVolume / 22)))
    : 4;
  const avgCpuLoad = autoScaleMode
    ? Math.min(96, Math.max(22, Math.round((trafficVolume / (calculatedNodes * 22)) * 68)))
    : Math.min(100, Math.round((trafficVolume / (4 * 22)) * 75));
  const estimatedLatency = autoScaleMode
    ? (1.05 + (trafficVolume > 200 ? 0.35 : 0.05)).toFixed(2)
    : (1.05 + (trafficVolume > 100 ? (trafficVolume - 100) * 0.04 : 0)).toFixed(2);

  const selectedCase = DIAGNOSTIC_CASES.find((c) => c.id === selectedCaseId) || DIAGNOSTIC_CASES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Wordmark Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Network className="w-5 h-5" />
            </div>
            <a href="#simulator" className="text-lg font-bold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors">
              NetPulse
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => { setActiveSection('simulator'); document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${activeSection === 'simulator' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 py-4' : ''}`}
            >
              Transit Simulator
            </button>
            <button
              onClick={() => { setActiveSection('architectures'); document.getElementById('architectures')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${activeSection === 'architectures' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 py-4' : ''}`}
            >
              Architecture Matrix
            </button>
            <button
              onClick={() => { setActiveSection('playbook'); document.getElementById('playbook')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${activeSection === 'playbook' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 py-4' : ''}`}
            >
              Interactive Playbook
            </button>
            <button
              onClick={() => { setActiveSection('diagnostic'); document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${activeSection === 'diagnostic' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 py-4' : ''}`}
            >
              Diagnostic Lab
            </button>
            <button
              onClick={() => { setActiveSection('quiz'); document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${activeSection === 'quiz' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 py-4' : ''}`}
            >
              Knowledge Check
            </button>
            <button
              onClick={() => { setActiveSection('guardrails'); document.getElementById('guardrails')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${activeSection === 'guardrails' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 py-4' : ''}`}
            >
              Production Realities
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
                setIsPlaying(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Live Transit</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                <span className="text-emerald-700 font-semibold">Computer Networks · Unit 5</span>
                <span aria-hidden="true">·</span>
                <span>Emerging Technologies</span>
                <span aria-hidden="true">·</span>
                <span>Chennai to Delhi Transit</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
                How WhatsApp Delivers a Message in Under 2 Seconds
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                An interactive engineering dissection of modern networking technologies: 5G Network Slicing,
                Network Function Virtualization (NFV), Virtual Private Clouds (VPC), Layer 7 Load Balancing,
                Cloud Auto-Scaling, Spine-Leaf Fabrics, and Heuristic Routing.
              </p>
            </div>

            {/* Live WhatsApp Interactive Phone Widget */}
            <div className="w-full lg:w-80 shrink-0 bg-slate-100 p-3 rounded-2xl border border-slate-200 shadow-sm">
              <div className="bg-[#075E54] text-white px-3.5 py-2.5 rounded-t-xl flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-xs">
                    D
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">Delhi Friend</div>
                    <div className="text-[10px] text-emerald-200">Online</div>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-100">5G Sliced</div>
              </div>

              {/* Chat Canvas */}
              <div className="bg-[#EFEAE2] p-3 min-h-[140px] flex flex-col justify-end gap-2 text-xs relative overflow-hidden">
                <div className="text-center text-[10px] text-slate-500 mb-1">
                  Messages are end-to-end encrypted with Signal Protocol
                </div>
                
                {/* Sent Bubble */}
                <div className="self-end bg-[#D9FDD3] text-slate-800 rounded-lg p-2.5 max-w-[85%] shadow-xs border border-emerald-200/50">
                  <p className="text-xs break-words">{sentMessage}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500">
                    <span>10:42 AM</span>
                    {senderStatus === 'clock' && <Clock className="w-3 h-3 text-slate-400" />}
                    {senderStatus === 'one-tick' && <Check className="w-3 h-3 text-slate-500" />}
                    {senderStatus === 'two-ticks' && <CheckCheck className="w-3 h-3 text-slate-500" />}
                    {senderStatus === 'blue-ticks' && <CheckCheck className="w-3 h-3 text-blue-500 stroke-[2.5]" />}
                  </div>
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="bg-white p-2 rounded-b-xl border-t border-slate-200 flex items-center gap-1.5">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type message to transit..."
                  className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800"
                />
                <button
                  type="submit"
                  className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                  title="Send through network"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE INTERACTIVE END-TO-END TRANSIT SIMULATOR (CENTERPIECE) */}
      <section id="simulator" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
              01. Real-World Transit Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              End-to-End Transit Architecture (Chennai → Delhi)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Track packet encapsulation, radio slicing, NFV routing, cloud load balancing, and spine-leaf data transfer step-by-step.
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setCurrentStageIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStageIndex === 0}
              className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 cursor-pointer"
              title="Previous Stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Stage'}</span>
            </button>
            <button
              onClick={() => setCurrentStageIndex((prev) => Math.min(TRANSIT_STAGES.length - 1, prev + 1))}
              disabled={currentStageIndex === TRANSIT_STAGES.length - 1}
              className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 cursor-pointer"
              title="Next Stage"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentStageIndex(0);
                setIsPlaying(false);
              }}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Reset to Stage 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1" />
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              aria-label="Playback pace"
              className="text-xs text-slate-700 bg-transparent border-0 focus:ring-0 cursor-pointer pr-1"
            >
              <option value={4500}>0.7x (Slow)</option>
              <option value={3000}>1.0x (Normal)</option>
              <option value={1500}>2.0x (Fast)</option>
            </select>
          </div>
        </div>

        {/* Horizontal Progress Track with Numbered Nodes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-6 shadow-xs overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between relative">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-100 -z-0" />
            <div
              className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-300 -z-0"
              style={{
                width: `${(currentStageIndex / (TRANSIT_STAGES.length - 1)) * 94}%`
              }}
            />

            {TRANSIT_STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setCurrentStageIndex(idx);
                    setIsPlaying(false);
                  }}
                  className="flex flex-col items-center group relative z-10 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                      isCurrent
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md ring-4 ring-emerald-100 scale-110'
                        : isPast
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-slate-300 text-slate-500 group-hover:border-slate-400'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : stage.id}
                  </div>
                  <span
                    className={`text-[11px] mt-2 font-medium tracking-tight transition-colors text-center max-w-[85px] leading-tight ${
                      isCurrent ? 'text-emerald-700 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Inspection Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Left Column: Interactive Schematic Canvas */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-semibold text-emerald-800">{currentStage.domain}</span>
                <span className="font-mono text-slate-600">Est. Latency: {currentStage.latencyBudget}</span>
              </div>
              <div className="font-mono text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 mb-4">
                <div className="text-[10px] text-slate-600 font-sans uppercase tracking-wider mb-0.5">Active PDU / Frame:</div>
                <div className="font-semibold text-emerald-700 truncate">{currentStage.pduLabel}</div>
              </div>
            </div>

            {/* Dynamic Stage Schematic Rendering */}
            <div className="my-4 min-h-[220px] flex items-center justify-center bg-white rounded-xl border border-slate-200/80 p-4">
              {currentStage.schematicType === 'client' && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <Smartphone className="w-12 h-12 text-slate-800" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Chennai Handset (Client Edge)</div>
                      <div className="text-[11px] text-slate-500">Signal Protocol Ratchet Step 142</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
                    <div>Cipher: <span className="text-emerald-700">AES-256-GCM</span></div>
                    <div>Key Exchange: <span className="text-emerald-700">Curve25519 (ECDH)</span></div>
                    <div>Forward Secrecy: <span className="text-emerald-600 font-semibold">Active</span></div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'slicing' && (
                <div className="w-full space-y-2.5">
                  <div className="flex items-center justify-center gap-3">
                    <Radio className="w-10 h-10 text-emerald-600 animate-pulse" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Chennai 5G gNodeB Tower</div>
                      <div className="text-[11px] text-slate-500">3GPP Network Slicing Active</div>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold">
                      <span>Slice 1 (WhatsApp Chat - SST 1)</span>
                      <span className="text-[10px] font-mono">Guaranteed 8ms</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-100 text-slate-500">
                      <span>Slice 2 (4K Video Streaming - eMBB)</span>
                      <span className="text-[10px] font-mono">Variable 45ms</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-100 text-slate-500">
                      <span>Slice 3 (Smart Grid IoT - mMTC)</span>
                      <span className="text-[10px] font-mono">Low-Priority</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'nfv' && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <Cpu className="w-10 h-10 text-blue-600" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Telecom Carrier NFVI Rack</div>
                      <div className="text-[11px] text-slate-500">MANO Orchestrated VNFs</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-900">
                      <div className="font-bold">VNF: UPF</div>
                      <div>User Plane Routing</div>
                    </div>
                    <div className="p-2 bg-slate-100 rounded text-slate-700">
                      <div className="font-bold">VNF: AMF</div>
                      <div>Access Management</div>
                    </div>
                    <div className="p-2 bg-slate-100 rounded text-slate-700">
                      <div className="font-bold">VNF: SMF</div>
                      <div>Session Control</div>
                    </div>
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                      <div className="font-bold">GTP-U Tunnel</div>
                      <div>Port 2152 Encap</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'vpc' && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Cloud className="w-10 h-10 text-slate-800" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">WhatsApp Cloud Ingress VPC</div>
                      <div className="text-[11px] text-slate-500">Mumbai Peering PoP</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Security Group:</span>
                      <span className="font-mono text-emerald-700 font-semibold">Allow 443, 5222</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Stateless ACL:</span>
                      <span className="font-mono text-slate-800">Pass IPv6 /48</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">VPC Peering:</span>
                      <span className="font-mono text-slate-800">Direct Connect 100Gbps</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'lb' && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Activity className="w-10 h-10 text-emerald-600" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Layer 7 Anycast Proxy Pool</div>
                      <div className="text-[11px] text-slate-500">Consistent Hashing Ingress</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-emerald-900">
                      <div className="font-bold">Broker Node 01</div>
                      <div className="text-emerald-700">Healthy (22k ws)</div>
                    </div>
                    <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-emerald-900">
                      <div className="font-bold">Broker Node 02</div>
                      <div className="text-emerald-700">Healthy (19k ws)</div>
                    </div>
                    <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-emerald-900">
                      <div className="font-bold">Broker Node 03</div>
                      <div className="text-emerald-700">Healthy (25k ws)</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'autoscaling' && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Server className="w-10 h-10 text-indigo-600" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Kubernetes / HPA Cluster</div>
                      <div className="text-[11px] text-slate-500">Automated Pod Elasticity</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPU Saturation:</span>
                      <span className="text-emerald-700 font-bold">54% (Nominal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Active Replicas:</span>
                      <span className="text-slate-800">48 / 200 Max</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cooldown Window:</span>
                      <span className="text-slate-800">15s Burst Mode</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'spineleaf' && (
                <div className="w-full space-y-2">
                  <div className="text-center text-xs font-bold text-slate-900 mb-1">
                    Spine-Leaf Fabric (Deterministic 2-Hop Latency)
                  </div>
                  <div className="flex justify-around items-center">
                    <div className="p-1.5 bg-indigo-100 rounded text-[10px] font-bold text-indigo-900">Spine Switch 1</div>
                    <div className="p-1.5 bg-indigo-100 rounded text-[10px] font-bold text-indigo-900">Spine Switch 2</div>
                  </div>
                  <div className="h-6 flex items-center justify-center text-[10px] font-mono text-slate-400">
                    ↕ Full Mesh ECMP Interconnect (Non-Blocking) ↕
                  </div>
                  <div className="flex justify-around items-center">
                    <div className="p-1.5 bg-slate-100 rounded text-[10px] text-slate-800">Leaf 1 (Sender)</div>
                    <div className="p-1.5 bg-emerald-100 border border-emerald-300 rounded text-[10px] font-bold text-emerald-900">Leaf 2 (DB Core)</div>
                    <div className="p-1.5 bg-slate-100 rounded text-[10px] text-slate-800">Leaf 3 (Egress)</div>
                  </div>
                </div>
              )}

              {currentStage.schematicType === 'delivery' && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <Smartphone className="w-12 h-12 text-emerald-600" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Delhi Recipient Handset</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">Delivery Ack Transmitted</div>
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Receipt State:</span>
                      <span className="font-bold flex items-center gap-1 text-blue-600">
                        <CheckCheck className="w-4 h-4 stroke-[3]" /> Read by Recipient
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-700">Total Roundtrip: 1.18s across 2,180 km fiber</div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/80 flex items-center justify-between">
              <span>Status on Handset:</span>
              <span className="font-semibold text-slate-800">{currentStage.statusText}</span>
            </div>
          </div>

          {/* Right Column: Narrative & Engineering Breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                Stage {currentStage.id} of {TRANSIT_STAGES.length}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentStage.title}
              </h3>
              <div className="text-xs text-slate-500 mt-0.5">{currentStage.subtitle}</div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-700" />
                  <span>The Physical Reality</span>
                </div>
                <p className="leading-relaxed text-slate-600">{currentStage.physicalReality}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-700" />
                  <span>How the System Executes This</span>
                </div>
                <p className="leading-relaxed text-slate-600">{currentStage.engineeringMechanism}</p>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Why It Matters · Unit 5 Syllabus Anchor</span>
                </div>
                <p className="leading-relaxed text-emerald-900">{currentStage.syllabusConcept}</p>
              </div>
            </div>

            {/* Quick Step Switcher */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <button
                onClick={() => setCurrentStageIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentStageIndex === 0}
                className="text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 flex items-center gap-1 cursor-pointer font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous Stage
              </button>
              <span className="text-slate-400 font-mono">
                {currentStageIndex + 1} / {TRANSIT_STAGES.length}
              </span>
              <button
                onClick={() => setCurrentStageIndex((prev) => Math.min(TRANSIT_STAGES.length - 1, prev + 1))}
                disabled={currentStageIndex === TRANSIT_STAGES.length - 1}
                className="text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 flex items-center gap-1 cursor-pointer font-medium"
              >
                Next Stage <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DEEP-DIVE CONCEPTUAL MODULES & VISUALIZERS */}
      <section id="architectures" className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
              02. Architectural Systems & Core Visualizers
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Modern vs Legacy Infrastructure Comparison
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Contrast traditional networking boundaries with modern virtualized, software-defined, and cloud-native standards.
            </p>
          </div>

          {/* Component Comparison Matrix */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-12 shadow-xs">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  <th className="py-3 px-4">Architectural Dimension</th>
                  <th className="py-3 px-4">Traditional Legacy Approach</th>
                  <th className="py-3 px-4">Unit 5 Modern Solution</th>
                  <th className="py-3 px-4">Production Engineering Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div>{row.dimension}</div>
                      <div className="text-[11px] text-slate-600 font-normal">{row.layer}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-xs">{row.legacy}</td>
                    <td className="py-3.5 px-4 font-medium text-emerald-800 bg-emerald-50/30 leading-relaxed max-w-xs">
                      {row.modern}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 leading-relaxed max-w-xs">{row.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INTERACTIVE FAILURE & MECHANISM SANDBOX */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Interactive Failure & Mechanism Sandbox
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Inject live real-world networking faults to observe automated fault isolation and self-healing protocols.
                </p>
              </div>

              {/* Sandbox Scenario Buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
                <button
                  onClick={() => setActiveSandboxScenario('nominal')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeSandboxScenario === 'nominal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Nominal Flow
                </button>
                <button
                  onClick={() => setActiveSandboxScenario('spine-cut')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeSandboxScenario === 'spine-cut' ? 'bg-white text-rose-700 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Spine-2 Link Cut
                </button>
                <button
                  onClick={() => setActiveSandboxScenario('worker-crash')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeSandboxScenario === 'worker-crash' ? 'bg-white text-amber-700 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Broker Node Crash
                </button>
                <button
                  onClick={() => setActiveSandboxScenario('slice-jam')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeSandboxScenario === 'slice-jam' ? 'bg-white text-indigo-700 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  IoT Video Flooding
                </button>
              </div>
            </div>

            {/* Sandbox Canvas */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className={`p-4 rounded-xl border transition-all ${
                  activeSandboxScenario === 'slice-jam' ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between mb-2">
                    <span>5G Chennai gNodeB</span>
                    <span className="text-[10px] font-mono text-slate-500">Slice SST 1</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {activeSandboxScenario === 'slice-jam' ? (
                      <span className="text-amber-800 font-medium">
                        Slice 2 (eMBB) congested with 4K video, but WhatsApp Slice 1 throughput remains locked at 99.8% SLA.
                      </span>
                    ) : (
                      <span>Radio spectrum allocated evenly with low jitter (4ms).</span>
                    )}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${
                  activeSandboxScenario === 'worker-crash' ? 'bg-rose-50 border-rose-300' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between mb-2">
                    <span>L7 Proxy & Ingress Pool</span>
                    <span className="text-[10px] font-mono text-slate-500">Maglev Envoy</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {activeSandboxScenario === 'worker-crash' ? (
                      <span className="text-rose-800 font-medium">
                        Broker-03 health check timed out. L7 proxy auto-drained 18k sockets to Broker-01/02 with 0ms client drop.
                      </span>
                    ) : (
                      <span>Consistent hashing maintains sticky Erlang socket channels without single point of failure.</span>
                    )}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${
                  activeSandboxScenario === 'spine-cut' ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between mb-2">
                    <span>Spine-Leaf DC Fabric</span>
                    <span className="text-[10px] font-mono text-slate-500">ECMP Clos</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {activeSandboxScenario === 'spine-cut' ? (
                      <span className="text-indigo-900 font-medium">
                        Fiber to Spine-2 severed! Leaf switch BFD detected link drop in 12ms; ECMP diverted all packets over Spine-1.
                      </span>
                    ) : (
                      <span>Non-blocking multi-pathing routes traffic over both Spine-1 and Spine-2 simultaneously.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-slate-900">System State:</span>
                  <span>
                    {activeSandboxScenario === 'nominal' && 'Nominal multi-tenant transit running without bottlenecks.'}
                    {activeSandboxScenario === 'spine-cut' && 'Self-healing ECMP convergence completed in 12ms. Zero packet drops.'}
                    {activeSandboxScenario === 'worker-crash' && 'Failover health-drain rerouted active sessions. Client UI reflects 1 grey tick without error.'}
                    {activeSandboxScenario === 'slice-jam' && 'Network Slicing isolation guaranteed high-priority chat delivery despite 4K streaming congestion.'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">E2E SLA: 99.999%</span>
              </div>
            </div>
          </div>

          {/* PROTOCOL ENCAPSULATION INSPECTOR */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Layering & Encapsulation Inspector
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Inspect how the WhatsApp chat payload is nested into cryptographic, transport, cloud overlay, and cellular tunneling envelopes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              {/* Layer Selection Buttons */}
              <div className="lg:col-span-4 space-y-2">
                {ENCAPSULATION_STACK.map((layer, idx) => (
                  <button
                    key={layer.level}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedLayerIndex === idx
                        ? 'bg-white border-emerald-500 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-600">L{layer.level}</span>
                      <span className="text-[11px] text-slate-500">{layer.headerSize}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">{layer.name}</div>
                    <div className="text-[11px] text-emerald-700 truncate">{layer.pdu}</div>
                  </button>
                ))}
              </div>

              {/* Layer Details Inspection */}
              <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-emerald-800">
                      Layer {ENCAPSULATION_STACK[selectedLayerIndex].level} Structure
                    </span>
                    <span className="font-mono">Header: {ENCAPSULATION_STACK[selectedLayerIndex].headerSize}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-3">
                    {ENCAPSULATION_STACK[selectedLayerIndex].name}
                  </h4>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-600 font-semibold">
                          <th className="py-2 px-2">Field</th>
                          <th className="py-2 px-2">Example Value</th>
                          <th className="py-2 px-2">Role & Engineering Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {ENCAPSULATION_STACK[selectedLayerIndex].fields.map((f, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="py-2 px-2 font-semibold text-slate-900">{f.name}</td>
                            <td className="py-2 px-2 text-emerald-700">{f.value}</td>
                            <td className="py-2 px-2 font-sans text-slate-600">{f.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200/80 text-xs text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{ENCAPSULATION_STACK[selectedLayerIndex].securityNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE LOAD BALANCING & AUTO-SCALING PLAYBOOK */}
      <section id="playbook" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
              03. Interactive Engineering Playbook
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Load Balancing & Cloud Auto-Scaling Sandbox
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Simulate traffic surges, switch balancing algorithms, and watch dynamic pod provisioning absorb New Year’s Eve message spikes.
            </p>
          </div>

          <button
            onClick={handleTriggerSurge}
            disabled={isSurgeActive}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isSurgeActive ? 'Flash Surge in Progress...' : "Simulate New Year's Spike (8x)"}</span>
          </button>
        </div>

        {/* Playbook Interactive Controls & Monitor Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs mb-10">
          {/* Left Controls Deck */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                <span>Ingress Traffic Rate:</span>
                <span className="font-mono font-bold text-emerald-700">{trafficVolume}k msgs/sec</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={trafficVolume}
                onChange={(e) => setTrafficVolume(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
                <span>10k (Quiet)</span>
                <span>150k (Peak)</span>
                <span>500k (Midnight NYE)</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">
                Load Balancing Distribution Algorithm:
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setLbAlgorithm('consistent-hash')}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    lbAlgorithm === 'consistent-hash'
                      ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">Consistent Hashing (Ketama)</div>
                  <div className="text-[11px] text-slate-500">Maps sender-receiver JID hash onto ring; prevents session drops</div>
                </button>

                <button
                  onClick={() => setLbAlgorithm('least-conn')}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    lbAlgorithm === 'least-conn'
                      ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">Least Connections</div>
                  <div className="text-[11px] text-slate-500">Diverts incoming WebSockets to the worker with fewest active sockets</div>
                </button>

                <button
                  onClick={() => setLbAlgorithm('round-robin')}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    lbAlgorithm === 'round-robin'
                      ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">Round Robin</div>
                  <div className="text-[11px] text-slate-500">Sequential circular distribution; susceptible to socket-weight imbalance</div>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Dynamic Auto-Scaling (HPA)</div>
                <div className="text-[11px] text-slate-500">Automatically provisions pods on CPU &gt; 70%</div>
              </div>
              <button
                onClick={() => setAutoScaleMode(!autoScaleMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  autoScaleMode ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoScaleMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Live Cluster Monitor & Metrics */}
          <div className="lg:col-span-8 bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              {/* Telemetry Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500">Active Worker Nodes</div>
                  <div className="text-lg font-bold font-mono text-slate-900">{calculatedNodes} Pods</div>
                  <div className="text-[10px] text-emerald-700">Max limit: 20</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500">Avg CPU Saturation</div>
                  <div className={`text-lg font-bold font-mono ${avgCpuLoad > 85 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {avgCpuLoad}%
                  </div>
                  <div className="text-[10px] text-slate-500">Threshold: 70%</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500">Estimated Transit Latency</div>
                  <div className={`text-lg font-bold font-mono ${Number(estimatedLatency) > 2.0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {estimatedLatency} s
                  </div>
                  <div className="text-[10px] text-slate-500">SLA: &lt; 2.0 s</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500">Packet Drop Rate</div>
                  <div className="text-lg font-bold font-mono text-emerald-700">
                    {autoScaleMode ? '0.00%' : trafficVolume > 150 ? '3.42%' : '0.01%'}
                  </div>
                  <div className="text-[10px] text-slate-500">Zero-Loss Target</div>
                </div>
              </div>

              {/* Server Nodes Grid */}
              <div className="mb-4">
                <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                  <span>Erlang Broker Cluster Fleet:</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    Click node to simulate crash
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {Array.from({ length: calculatedNodes }).map((_, idx) => {
                    const isFailed = simulatedFailureNode === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSimulatedFailureNode(isFailed ? null : idx)}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          isFailed
                            ? 'bg-rose-50 border-rose-300 text-rose-800'
                            : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
                        }`}
                      >
                        <Server className={`w-4 h-4 mx-auto mb-1 ${isFailed ? 'text-rose-600' : 'text-emerald-600'}`} />
                        <div className="text-[11px] font-bold">Node-{idx + 1}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {isFailed ? 'CRASHED' : `${Math.round(trafficVolume / calculatedNodes)}k rps`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="font-medium text-slate-800">
                Algorithm in Action: {lbAlgorithm === 'consistent-hash' ? 'Consistent Hashing' : lbAlgorithm === 'least-conn' ? 'Least Connections' : 'Round Robin'}
              </span>
              <span className="text-emerald-700 font-mono">
                {autoScaleMode ? 'Auto-Scaler Active' : 'Static Provisioning'}
              </span>
            </div>
          </div>
        </div>

        {/* GENETIC ALGORITHM (GA) ROUTING EXPLORER */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
                Advanced Mathematical Heuristics
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Genetic Algorithm (GA) Wide-Area Path Optimization
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                How WhatsApp finds optimal cross-country transit paths (Chennai → Delhi) balancing delay, loss, and jitter.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800">
                Generation: <span className="font-bold text-emerald-700">{gaGeneration}</span>
              </div>
              <button
                onClick={handleNextGeneration}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Next Generation (Evolve)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50">
                    <th className="py-2.5 px-3">Chromosome Path</th>
                    <th className="py-2.5 px-3">Transit Waypoints</th>
                    <th className="py-2.5 px-3">Latency</th>
                    <th className="py-2.5 px-3">Loss Rate</th>
                    <th className="py-2.5 px-3">Fitness Score</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {gaPaths.map((p, idx) => (
                    <tr key={p.id} className={idx === 0 ? 'bg-emerald-50/50' : 'hover:bg-slate-50'}>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{p.id}</td>
                      <td className="py-2.5 px-3 font-sans text-slate-700">{p.via}</td>
                      <td className="py-2.5 px-3 text-slate-800">{p.latency} ms</td>
                      <td className="py-2.5 px-3 text-slate-800">{p.loss}%</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">{p.fitness} / 100</td>
                      <td className="py-2.5 px-3 font-sans">
                        {idx === 0 ? (
                          <span className="text-emerald-700 font-semibold">Active Egress</span>
                        ) : (
                          <span className="text-slate-600">Candidate</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 mb-1">Fitness Function:</div>
                <div className="font-mono text-emerald-800 bg-white p-2 rounded border border-slate-200 mb-3 text-[11px]">
                  F = 1 / (α·Delay + β·Loss + γ/Bandwidth)
                </div>

                <div className="space-y-2 text-slate-600 text-[11px]">
                  <div>1. <strong>Population:</strong> Set of diverse candidate fiber routes.</div>
                  <div>2. <strong>Selection:</strong> High-fitness low-jitter routes survive.</div>
                  <div>3. <strong>Crossover:</strong> Recombining segments of 2 top routes.</div>
                  <div>4. <strong>Mutation:</strong> Random exploration of alternate IXP peers.</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-slate-700 font-medium text-[11px]">
                Global Fitness: <span className="font-mono text-emerald-700 font-bold">{gaBestFitness}% optimal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PRACTICAL DIAGNOSTIC LAB */}
      <section id="diagnostic" className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
              04. Practical Engineering Diagnostic Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Real-World Troubleshooting Console
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Diagnose complex network breakdowns under deceptive symptoms using simulated CLI outputs from 5G gNodeBs, Kubernetes, and Spine switches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Case Selection Sidebar */}
            <div className="lg:col-span-4 space-y-2">
              {DIAGNOSTIC_CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedCaseId === c.id
                      ? 'bg-slate-50 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-500 mb-1">{c.layer}</div>
                  <div className="text-xs font-bold text-slate-900 leading-snug">{c.title}</div>
                </button>
              ))}
            </div>

            {/* Diagnostic Terminal & Remediation Workspace */}
            <div className="lg:col-span-8 space-y-4">
              {/* Simulated Terminal */}
              <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs shadow-md border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>production-debug-console :: {selectedCase.command}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedCase.command)}
                    className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="pt-3 overflow-x-auto text-[11px] leading-relaxed text-slate-300 font-mono">
                  {selectedCase.rawOutput}
                </pre>
              </div>

              {/* Engineering Analysis Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-rose-700 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Root Cause Isolation</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{selectedCase.rootCause}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Engineering Deduction</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{selectedCase.deduction}</p>
                </div>
              </div>

              {/* Actionable Remediation Step */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                <div className="text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Actionable Remediation</span>
                </div>
                <p className="text-xs text-emerald-900 mb-2 leading-relaxed">{selectedCase.remediation}</p>
                <div className="bg-emerald-950 text-emerald-200 p-2.5 rounded font-mono text-[11px] flex items-center justify-between">
                  <span className="truncate">{selectedCase.fixCommand}</span>
                  <button
                    onClick={() => handleCopy(selectedCase.fixCommand)}
                    className="text-emerald-400 hover:text-white shrink-0 ml-2 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE UNDERSTANDING CHECKS */}
      <section id="quiz" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
            05. Conceptual Intuition & Knowledge Checks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Scenario Assessments & Architecture Matching
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Reinforce key architectural principles with scenario-grounded MCQs and an interactive concept-to-mechanism pairing canvas.
          </p>
        </div>

        {/* 4 Scenario-Based MCQs */}
        <div className="space-y-6 mb-12">
          {QUIZ_QUESTIONS.map((q) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer === q.correctId;

            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  Question 0{q.id} · Scenario-Grounded Analysis
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 mb-3 leading-relaxed">
                  <strong>Scenario:</strong> {q.scenario}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4">{q.question}</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((opt) => {
                    let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';

                    if (isAnswered) {
                      if (opt.id === q.correctId) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                      } else if (opt.id === userAnswer) {
                        optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                      } else {
                        optionStyle = 'bg-white border-slate-100 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={isAnswered}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt.id })}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-start gap-2.5 ${optionStyle}`}
                      >
                        <span className="font-bold shrink-0">{opt.id}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {isAnswered && (
                  <div className={`p-4 rounded-xl text-xs ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {isCorrect ? (
                        <span className="text-emerald-800 flex items-center gap-1">
                          <Check className="w-4 h-4 stroke-[3]" /> Correct Deduction
                        </span>
                      ) : (
                        <span className="text-rose-800 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Incorrect Choice
                        </span>
                      )}
                    </div>
                    <p className={`leading-relaxed ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                      {q.explanation}
                    </p>
                    {!isCorrect && (
                      <div className="mt-2 pt-2 border-t border-rose-200/60 text-rose-800">
                        <strong>Why {userAnswer} is wrong:</strong> {q.whyWrong[userAnswer]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE MATCH THE FOLLOWING CANVAS */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
                Interactive Concept Pairing
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Match the Following: Architecture ↔ Real-World Mechanism
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Click a syllabus concept on the left, then click its corresponding production mechanism on the right.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetMatches}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                Reset Canvas
              </button>
              <button
                onClick={() => setMatchEvaluated(true)}
                disabled={Object.keys(userMatches).length !== MATCH_PAIRS.length}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Evaluate Matches
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Concepts */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Unit 5 Syllabus Concepts
              </div>
              {MATCH_PAIRS.map((pair) => {
                const isSelected = selectedConcept === pair.id;
                const isPaired = !!userMatches[pair.id];
                const targetMechanism = MATCH_PAIRS.find((p) => p.id === userMatches[pair.id]);
                const isCorrect = userMatches[pair.id] === pair.id;

                let cardBg = 'bg-white border-slate-200 hover:border-slate-400';
                if (isSelected) cardBg = 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100';
                else if (isPaired && !matchEvaluated) cardBg = 'bg-slate-50 border-emerald-300';
                else if (isPaired && matchEvaluated) {
                  cardBg = isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-300';
                }

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleConceptClick(pair.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${cardBg}`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{pair.concept}</span>
                      {isPaired && (
                        <span className="text-[10px] font-mono font-normal text-emerald-700">
                          Linked ➔
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{pair.conceptDetail}</div>
                    {isPaired && targetMechanism && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-700 flex items-center justify-between">
                        <span className="truncate">Paired: {targetMechanism.mechanism.substring(0, 32)}...</span>
                        <span className="text-[10px] text-slate-400 hover:text-rose-600">click to unpair</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Mechanisms */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                WhatsApp Production Mechanisms
              </div>
              {/* Shuffled display */}
              {[...MATCH_PAIRS].reverse().map((pair) => {
                const isAlreadyLinked = Object.values(userMatches).includes(pair.id);

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleMechanismClick(pair.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedConcept ? 'border-dashed border-emerald-400 bg-emerald-50/20 hover:bg-emerald-50/50' : 'bg-white border-slate-200'
                    } ${isAlreadyLinked ? 'opacity-70 bg-slate-50' : ''}`}
                  >
                    <div className="font-bold text-slate-900">{pair.mechanism}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{pair.mechanismDetail}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Evaluation Banner */}
          {matchEvaluated && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">Evaluation Result: </span>
                <span className="font-mono text-emerald-700 font-semibold">
                  {Object.entries(userMatches).filter(([k, v]) => k === v).length} / {MATCH_PAIRS.length} Accurate Pairs
                </span>
              </div>
              <span className="text-slate-500">
                {Object.entries(userMatches).filter(([k, v]) => k === v).length === MATCH_PAIRS.length
                  ? 'All 6 architecture mappings verified!'
                  : 'Review the flagged items above and re-pair.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: HYPOTHETICAL CASE STUDY GUARDRAILS & REAL-WORLD REALITY */}
      <section id="guardrails" className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
              06. Pedagogical Guardrails
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hypothetical Case Study Guardrails & Real-World Reality
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Explicit engineering disclosures detailing what this educational case study simplifies for conceptual clarity versus how production WhatsApp/Meta infrastructure operates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUARDRAILS.map((g, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">{g.title}</h3>
                  <div className="mb-3">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Pedagogical Simplification
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{g.pedagogicalSimplification}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                      Production Reality
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{g.productionReality}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-mono">
                  {g.technicalDepth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">NetPulse</span>
            <span aria-hidden="true">·</span>
            <span>Computer Networks Unit 5 Interactive Case Study</span>
          </div>
          <div>
            Built for conceptual intuition, zero-trust mechanics, and systems engineering clarity.
          </div>
        </div>
      </footer>
    </div>
  );
}
