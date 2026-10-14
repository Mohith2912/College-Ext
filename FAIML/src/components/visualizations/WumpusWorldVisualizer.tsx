/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, RotateCw, RotateCcw, ArrowUp, Crosshair, Award, RotateCcw as ResetIcon } from 'lucide-react';
import { createDefaultWumpusGrid, WumpusCell } from '../../lib/algorithms/wumpusEngine';

export const WumpusWorldVisualizer: React.FC = () => {
  const [grid, setGrid] = useState<WumpusCell[][]>(createDefaultWumpusGrid);
  const [agentX, setAgentX] = useState(1);
  const [agentY, setAgentY] = useState(1);
  const [direction, setDirection] = useState<'UP' | 'RIGHT' | 'DOWN' | 'LEFT'>('RIGHT');
  const [hasArrow, setHasArrow] = useState(true);
  const [hasGold, setHasGold] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [wumpusAlive, setWumpusAlive] = useState(true);
  const [message, setMessage] = useState('Agent starts at [1, 1] facing East. Cave entered.');
  const [deductions, setDeductions] = useState<string[]>([
    'Base Axiom: Agent safely at [1, 1].',
    '¬Breeze(1, 1) ⊢ ¬Pit(1, 2) ∧ ¬Pit(2, 1). Adjacent squares are provably SAFE!'
  ]);

  const currentCell = grid.find(row => row.some(c => c.x === agentX && c.y === agentY))
    ?.find(c => c.x === agentX && c.y === agentY);

  const resetGame = () => {
    setGrid(createDefaultWumpusGrid());
    setAgentX(1);
    setAgentY(1);
    setDirection('RIGHT');
    setHasArrow(true);
    setHasGold(false);
    setIsAlive(true);
    setScore(0);
    setWumpusAlive(true);
    setMessage('World reset. Agent at [1, 1] facing East.');
    setDeductions([
      'Base Axiom: Agent safely at [1, 1].',
      '¬Breeze(1, 1) ⊢ ¬Pit(1, 2) ∧ ¬Pit(2, 1). Adjacent squares are provably SAFE!'
    ]);
  };

  const turnLeft = () => {
    if (!isAlive) return;
    const order: ('UP' | 'LEFT' | 'DOWN' | 'RIGHT')[] = ['UP', 'LEFT', 'DOWN', 'RIGHT'];
    const currIdx = order.indexOf(direction as any);
    const nextDir = order[(currIdx + 1) % 4];
    setDirection(nextDir as any);
    setScore(s => s - 1);
    setMessage(`Agent turned Left. Now facing ${nextDir}.`);
  };

  const turnRight = () => {
    if (!isAlive) return;
    const order: ('UP' | 'RIGHT' | 'DOWN' | 'LEFT')[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    const currIdx = order.indexOf(direction);
    const nextDir = order[(currIdx + 1) % 4];
    setDirection(nextDir);
    setScore(s => s - 1);
    setMessage(`Agent turned Right. Now facing ${nextDir}.`);
  };

  const moveForward = () => {
    if (!isAlive) return;
    let nextX = agentX;
    let nextY = agentY;

    if (direction === 'UP') nextY += 1;
    if (direction === 'RIGHT') nextX += 1;
    if (direction === 'DOWN') nextY -= 1;
    if (direction === 'LEFT') nextX -= 1;

    // Check bounds
    if (nextX < 1 || nextX > 4 || nextY < 1 || nextY > 4) {
      setScore(s => s - 1);
      setMessage('Bump! Hit the cavern wall.');
      return;
    }

    setAgentX(nextX);
    setAgentY(nextY);
    setScore(s => s - 1);

    // Update cell visited
    const newGrid = [...grid];
    for (const row of newGrid) {
      for (const cell of row) {
        if (cell.x === nextX && cell.y === nextY) {
          cell.visited = true;

          // Check hazards
          if (cell.hasPit) {
            setIsAlive(false);
            setScore(s => s - 1000);
            setMessage(`Fatal fall! Agent fell into a bottomless Pit at [${nextX}, ${nextY}].`);
            return;
          }
          if (cell.hasWumpus && wumpusAlive) {
            setIsAlive(false);
            setScore(s => s - 1000);
            setMessage(`Game Over! The Wumpus ate the agent at [${nextX}, ${nextY}].`);
            return;
          }

          // Safe move message & deduction
          let perceptText = [];
          if (cell.stench && wumpusAlive) perceptText.push('Stench');
          if (cell.breeze) perceptText.push('Breeze');
          if (cell.glitter && !hasGold) perceptText.push('Glitter');

          setMessage(
            `Moved to [${nextX}, ${nextY}]. Percepts: [${
              perceptText.length ? perceptText.join(', ') : 'None'
            }].`
          );

          // Add formal deduction
          if (cell.breeze) {
            setDeductions(prev => [
              `Breeze at [${nextX}, ${nextY}] ⊢ ∃(dx,dy) Adjacent([${nextX}, ${nextY}], dx, dy) ∧ Pit(dx, dy)`,
              ...prev
            ]);
          } else {
            setDeductions(prev => [
              `¬Breeze at [${nextX}, ${nextY}] ⊢ All adjacent rooms are safe from Pits!`,
              ...prev
            ]);
          }

          if (cell.stench && wumpusAlive) {
            setDeductions(prev => [
              `Stench at [${nextX}, ${nextY}] ⊢ ∃(dx,dy) Adjacent([${nextX}, ${nextY}], dx, dy) ∧ Wumpus(dx, dy)`,
              ...prev
            ]);
          }
        }
      }
    }
    setGrid(newGrid);
  };

  const grabGold = () => {
    if (!isAlive) return;
    if (currentCell?.hasGold && !hasGold) {
      setHasGold(true);
      setScore(s => s + 1000);
      setMessage('Success! Agent picked up the Gold! (+1000 points). Now climb out at [1,1]!');
      setDeductions(prev => ['Glitter at [2, 3] ⊢ Gold grabbed successfully!', ...prev]);
    } else {
      setScore(s => s - 1);
      setMessage('No gold in this room to grab.');
    }
  };

  const shootArrow = () => {
    if (!isAlive || !hasArrow) return;
    setHasArrow(false);
    setScore(s => s - 10);

    // Arrow travels in straight line
    let hit = false;
    if (direction === 'UP' && agentX === 1 && agentY < 3) hit = true;
    if (direction === 'RIGHT' && agentY === 3 && agentX < 1) hit = true;

    if (hit && wumpusAlive) {
      setWumpusAlive(false);
      setMessage('Scream! The arrow struck and killed the Wumpus! Cavern safe from beast.');
      setDeductions(prev => ['Arrow Hit ⊢ Scream heard! Wumpus dead. ¬Wumpus(1, 3).', ...prev]);
    } else {
      setMessage('Twang! The arrow flew into the darkness and missed.');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Unit 2 Knowledge Representation & Propositional Logic
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Wumpus World 4×4 Deductive Reasoning Sandbox
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test formal sensory inference: Breeze → Pit, Stench → Wumpus, Glitter → Gold.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-2.5 py-1 bg-white border border-slate-200 rounded">
            Score: <span className="font-bold text-indigo-600">{score}</span>
          </div>
          <div className="px-2.5 py-1 bg-white border border-slate-200 rounded">
            Arrow: <span className="font-bold">{hasArrow ? 'Ready (1)' : 'Spent (0)'}</span>
          </div>
          <div className="px-2.5 py-1 bg-white border border-slate-200 rounded">
            Gold: <span className={`font-bold ${hasGold ? 'text-amber-600' : 'text-slate-400'}`}>{hasGold ? 'Carried' : 'None'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: 4x4 Grid (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
          <div className="max-w-md mx-auto w-full aspect-square bg-slate-900 rounded-xl p-3 grid grid-cols-4 grid-rows-4 gap-2">
            {grid.map(row =>
              row.map(cell => {
                const isAgentHere = cell.x === agentX && cell.y === agentY;
                const isVisible = cell.visited;

                return (
                  <div
                    key={`${cell.x}-${cell.y}`}
                    className={`relative rounded-lg flex flex-col items-center justify-between p-1.5 transition-all ${
                      isVisible
                        ? 'bg-slate-800 border border-slate-700'
                        : 'bg-slate-950/80 border border-slate-900'
                    }`}
                  >
                    {/* Coordinate indicator */}
                    <span className="self-start text-[9px] font-mono text-slate-500">
                      [{cell.x},{cell.y}]
                    </span>

                    {/* Cell contents */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-1">
                      {isAgentHere && (
                        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          {direction === 'UP' && '▲'}
                          {direction === 'RIGHT' && '▶'}
                          {direction === 'DOWN' && '▼'}
                          {direction === 'LEFT' && '◀'}
                        </div>
                      )}

                      {isVisible && (
                        <div className="flex flex-wrap items-center justify-center gap-1 text-[10px]">
                          {cell.hasPit && <span className="text-red-400 font-bold">PIT</span>}
                          {cell.hasWumpus && wumpusAlive && <span className="text-purple-400 font-bold">WUMPUS</span>}
                          {cell.hasWumpus && !wumpusAlive && <span className="text-slate-500 line-through">DEAD WUMPUS</span>}
                          {cell.hasGold && !hasGold && <span className="text-amber-300 font-bold">GOLD</span>}
                        </div>
                      )}
                    </div>

                    {/* Sensor badges */}
                    {isVisible && (
                      <div className="flex items-center gap-1 text-[9px] font-mono">
                        {cell.breeze && <span className="text-cyan-400">B</span>}
                        {cell.stench && wumpusAlive && <span className="text-green-400">S</span>}
                        {cell.glitter && !hasGold && <span className="text-amber-400">G</span>}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Action Pad */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={turnLeft}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Turn Left
            </button>
            <button
              onClick={moveForward}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Move Forward
            </button>
            <button
              onClick={turnRight}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" /> Turn Right
            </button>
            <button
              onClick={grabGold}
              disabled={!currentCell?.hasGold || hasGold}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" /> Grab Gold
            </button>
            <button
              onClick={shootArrow}
              disabled={!hasArrow}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-30 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5" /> Shoot Arrow
            </button>
            <button
              onClick={resetGame}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Reset World"
            >
              <ResetIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Knowledge Base & Deductions (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-50/30">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Agent Sensor Telemetry & KB
            </div>

            {/* Current status banner */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg mb-3 text-xs">
              <div className="font-semibold text-slate-900 mb-0.5">Status Update:</div>
              <div className="text-slate-600">{message}</div>
            </div>

            {/* Active percept sensors */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className={`p-2 rounded border text-center text-xs font-medium ${
                currentCell?.stench && wumpusAlive ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-slate-200 text-slate-400'
              }`}>
                Stench
              </div>
              <div className={`p-2 rounded border text-center text-xs font-medium ${
                currentCell?.breeze ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-white border-slate-200 text-slate-400'
              }`}>
                Breeze
              </div>
              <div className={`p-2 rounded border text-center text-xs font-medium ${
                currentCell?.glitter && !hasGold ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-slate-200 text-slate-400'
              }`}>
                Glitter
              </div>
            </div>

            {/* Deductions stream */}
            <div className="text-xs font-semibold text-slate-700 mb-1.5">
              Derived First-Order Logic Deductions:
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {deductions.map((d, i) => (
                <div key={i} className="p-2 bg-white border border-slate-200 rounded text-[11px] font-mono text-slate-700 leading-tight">
                  {d}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
            Rule: <code className="font-mono text-slate-700">Breeze(x,y) ↔ ∃(dx,dy) Adjacent(x,y,dx,dy) ∧ Pit(dx,dy)</code>
          </div>
        </div>
      </div>
    </div>
  );
};
