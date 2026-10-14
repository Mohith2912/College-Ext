/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2, ShieldCheck, Battery } from 'lucide-react';

export const VacuumAgentLab: React.FC = () => {
  // 4-room grid: [A, B; C, D]
  const [rooms, setRooms] = useState([
    { id: 'A', name: 'Room A', isDirty: true, x: 0, y: 0 },
    { id: 'B', name: 'Room B', isDirty: true, x: 1, y: 0 },
    { id: 'C', name: 'Room C', isDirty: false, x: 0, y: 1 },
    { id: 'D', name: 'Room D', isDirty: true, x: 1, y: 1 }
  ]);

  const [agentLocation, setAgentLocation] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [agentType, setAgentType] = useState<'MODEL_BASED' | 'SIMPLE_REFLEX'>('MODEL_BASED');
  const [stochasticDirt, setStochasticDirt] = useState(false);
  const [cleaningFailRate, setCleaningFailRate] = useState(15); // % chance suck fails
  const [internalModel, setInternalModel] = useState<Record<string, 'Clean' | 'Dirty' | 'Unknown'>>({
    A: 'Dirty',
    B: 'Unknown',
    C: 'Unknown',
    D: 'Unknown'
  });

  const [battery, setBattery] = useState(100);
  const [totalActions, setTotalActions] = useState(0);
  const [dirtCleaned, setDirtCleaned] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([
    'Agent initialized in Room A. Internal model: Room A is Dirty.'
  ]);

  const resetSimulation = () => {
    setRooms([
      { id: 'A', name: 'Room A', isDirty: true, x: 0, y: 0 },
      { id: 'B', name: 'Room B', isDirty: true, x: 1, y: 0 },
      { id: 'C', name: 'Room C', isDirty: false, x: 0, y: 1 },
      { id: 'D', name: 'Room D', isDirty: true, x: 1, y: 1 }
    ]);
    setAgentLocation('A');
    setInternalModel({ A: 'Dirty', B: 'Unknown', C: 'Unknown', D: 'Unknown' });
    setBattery(100);
    setTotalActions(0);
    setDirtCleaned(0);
    setIsPlaying(false);
    setActionLog(['Simulation reset. Agent ready in Room A.']);
  };

  const toggleDirt = (id: string) => {
    setRooms(prev =>
      prev.map(r => (r.id === id ? { ...r, isDirty: !r.isDirty } : r))
    );
  };

  const stepAgent = () => {
    if (battery <= 0) {
      setIsPlaying(false);
      setActionLog(prev => ['Battery depleted! Agent stopped.', ...prev]);
      return;
    }

    const currentRoom = rooms.find(r => r.id === agentLocation)!;
    let nextRooms = [...rooms];
    let nextModel = { ...internalModel };
    let logMsg = '';

    // Percept: Senses current room dirt status
    const isDirtyPercept = currentRoom.isDirty;
    nextModel[agentLocation] = isDirtyPercept ? 'Dirty' : 'Clean';

    if (isDirtyPercept) {
      // Suck action with stochastic failure simulation
      const willFail = Math.random() * 100 < cleaningFailRate;
      if (willFail) {
        logMsg = `[Action: SUCK] Cleaning failed due to actuator slip in Room ${agentLocation}! Room remains Dirty.`;
      } else {
        nextRooms = nextRooms.map(r =>
          r.id === agentLocation ? { ...r, isDirty: false } : r
        );
        nextModel[agentLocation] = 'Clean';
        setDirtCleaned(c => c + 1);
        logMsg = `[Action: SUCK] Succeeded! Cleaned Room ${agentLocation}. Internal model updated to Clean.`;
      }
    } else {
      // Move decision
      // Adjacency graph
      const transitions: Record<string, string[]> = {
        A: ['B', 'C'],
        B: ['A', 'D'],
        C: ['A', 'D'],
        D: ['B', 'C']
      };

      if (agentType === 'MODEL_BASED') {
        // Model-based agent prioritizes rooms it believes are Dirty or Unknown
        const unvisitedOrDirty = transitions[agentLocation].find(
          nbr => nextModel[nbr] === 'Dirty' || nextModel[nbr] === 'Unknown'
        );
        const nextTarget = unvisitedOrDirty || transitions[agentLocation][0];
        setAgentLocation(nextTarget as any);
        logMsg = `[Action: MOVE] Room ${agentLocation} is clean. Moving to Room ${nextTarget} based on internal world model.`;
      } else {
        // Simple reflex moves blindly to adjacent
        const nextTarget = transitions[agentLocation][totalActions % transitions[agentLocation].length];
        setAgentLocation(nextTarget as any);
        logMsg = `[Action: MOVE] Simple reflex: Room ${agentLocation} clean, randomly transitioning to Room ${nextTarget}.`;
      }
    }

    // Stochastic dirt reappearance
    if (stochasticDirt && Math.random() < 0.25) {
      const randomIdx = Math.floor(Math.random() * nextRooms.length);
      if (!nextRooms[randomIdx].isDirty && nextRooms[randomIdx].id !== agentLocation) {
        nextRooms[randomIdx].isDirty = true;
        logMsg += ` · [Stochastic Event] Dirt reappeared in Room ${nextRooms[randomIdx].id}!`;
      }
    }

    setRooms(nextRooms);
    setInternalModel(nextModel);
    setBattery(b => Math.max(0, b - 2));
    setTotalActions(a => a + 1);
    setActionLog(prev => [logMsg, ...prev.slice(0, 15)]);
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(stepAgent, 900);
    }
    return () => clearInterval(interval);
  }, [isPlaying, rooms, agentLocation, battery, totalActions, internalModel, stochasticDirt, cleaningFailRate]);

  const cleanRoomsCount = rooms.filter(r => !r.isDirty).length;
  const cleanlinessPercentage = Math.round((cleanRoomsCount / rooms.length) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-emerald-50/60 via-teal-50/40 to-cyan-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Unit 1 PEAS & Rational Agent Architecture</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Vacuum Cleaner World: Model-Based vs Reflex Agent Sandbox
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Demonstrates handling partial observability, stochastic cleaning failure, and internal state models.
          </p>
        </div>

        {/* Live Gauges */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-xs shadow-xs">
            <Battery className="w-4 h-4 text-emerald-600" />
            <span className="font-mono font-bold text-slate-800">{battery}% Battery</span>
          </div>
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-xs shadow-xs">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="font-mono font-bold text-slate-800">{cleanlinessPercentage}% Clean</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: 2x2 Grid Environment (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span>Click any room to toggle dirt manually:</span>
              <span className="font-mono text-emerald-600 font-semibold">{cleanRoomsCount}/4 Rooms Clean</span>
            </div>

            {/* 2x2 Visual Room Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto aspect-square">
              {rooms.map(room => {
                const isAgentHere = room.id === agentLocation;
                const belief = internalModel[room.id];

                return (
                  <div
                    key={room.id}
                    onClick={() => toggleDirt(room.id)}
                    className={`relative rounded-2xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      room.isDirty
                        ? 'bg-amber-50/80 border-amber-300 shadow-inner'
                        : 'bg-emerald-50/60 border-emerald-300'
                    } ${isAgentHere ? 'ring-4 ring-indigo-500/30' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-slate-900">{room.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          room.isDirty
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-emerald-200 text-emerald-900'
                        }`}
                      >
                        {room.isDirty ? 'DIRTY' : 'CLEAN'}
                      </span>
                    </div>

                    {/* Agent Sprite or Dirt Animation */}
                    <div className="my-auto flex flex-col items-center justify-center min-h-[64px]">
                      {isAgentHere && (
                        <div className="flex flex-col items-center animate-bounce">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg border-2 border-indigo-400">
                            🤖
                          </div>
                          <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-full mt-1 border border-indigo-200 shadow-xs">
                            Agent Active
                          </span>
                        </div>
                      )}
                      {!isAgentHere && room.isDirty && (
                        <div className="text-2xl animate-pulse">🍂 💨</div>
                      )}
                      {!isAgentHere && !room.isDirty && (
                        <div className="text-2xl text-emerald-500">✨</div>
                      )}
                    </div>

                    {/* Internal Model Belief Tag */}
                    <div className="text-[11px] flex items-center justify-between text-slate-500 border-t border-slate-200/60 pt-2">
                      <span>Belief:</span>
                      <span
                        className={`font-mono font-semibold ${
                          belief === 'Dirty'
                            ? 'text-amber-700'
                            : belief === 'Clean'
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {belief}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Run Agent Cycle'}</span>
              </button>

              <button
                onClick={stepAgent}
                disabled={isPlaying || battery <= 0}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Step Action
              </button>

              <button
                onClick={resetSimulation}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Actions Taken: <strong className="text-slate-900">{totalActions}</strong> · Cleaned: <strong className="text-emerald-600">{dirtCleaned}</strong>
            </div>
          </div>
        </div>

        {/* Right: Agent Settings & PEAS Specification (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Agent Behavior Configuration
            </h3>

            {/* Agent Type Selector */}
            <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Agent Architecture:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAgentType('MODEL_BASED')}
                  className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                    agentType === 'MODEL_BASED'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Model-Based Reflex (Memory)
                </button>
                <button
                  onClick={() => setAgentType('SIMPLE_REFLEX')}
                  className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                    agentType === 'SIMPLE_REFLEX'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Simple Reflex (Stateless)
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {agentType === 'MODEL_BASED'
                  ? 'Maintains an internal world map of unobserved rooms to avoid redundant cyclic visiting.'
                  : 'Acts purely on immediate percept without remembering past room cleanliness states.'}
              </p>
            </div>

            {/* Stochastic Controls */}
            <div className="bg-white p-3.5 border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
                <span>Stochastic Dirt Generation:</span>
                <input
                  type="checkbox"
                  checked={stochasticDirt}
                  onChange={e => setStochasticDirt(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                />
              </label>

              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Cleaning Actuator Failure Rate:</span>
                  <span className="font-mono text-indigo-600">{cleaningFailRate}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={cleaningFailRate}
                  onChange={e => setCleaningFailRate(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Action Log */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Percept-Action Execution Stream:</span>
                <span className="text-[10px] text-slate-400">Real-time</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3 max-h-36 overflow-y-auto space-y-1.5 text-[11px] font-mono text-slate-700 shadow-inner">
                {actionLog.map((log, i) => (
                  <div key={i} className="leading-snug border-b border-slate-50 pb-1 last:border-0">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            PEAS: <strong className="text-slate-800">P</strong>: Maximize cleanliness · <strong className="text-slate-800">E</strong>: 4-room grid · <strong className="text-slate-800">A</strong>: Left, Right, Up, Down, Suck · <strong className="text-slate-800">S</strong>: [Location, Dirty?]
          </div>
        </div>
      </div>
    </div>
  );
};
