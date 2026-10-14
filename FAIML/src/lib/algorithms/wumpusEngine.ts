/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WumpusCell {
  x: number; // 1 to 4
  y: number; // 1 to 4
  hasPit: boolean;
  hasWumpus: boolean;
  hasGold: boolean;
  visited: boolean;
  isSafe: boolean;
  inferredDangerous: boolean;
  stench: boolean;
  breeze: boolean;
  glitter: boolean;
}

export interface WumpusState {
  agentX: number;
  agentY: number;
  direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
  hasArrow: boolean;
  hasGold: boolean;
  isAlive: boolean;
  score: number;
  wumpusAlive: boolean;
  message: string;
  percepts: {
    stench: boolean;
    breeze: boolean;
    glitter: boolean;
    bump: boolean;
    scream: boolean;
  };
  deductions: string[];
}

export function createDefaultWumpusGrid(): WumpusCell[][] {
  const grid: WumpusCell[][] = [];

  for (let y = 4; y >= 1; y--) {
    const row: WumpusCell[] = [];
    for (let x = 1; x <= 4; x++) {
      row.push({
        x,
        y,
        hasPit: false,
        hasWumpus: false,
        hasGold: false,
        visited: x === 1 && y === 1,
        isSafe: x === 1 && y === 1,
        inferredDangerous: false,
        stench: false,
        breeze: false,
        glitter: false
      });
    }
    grid.push(row);
  }

  // Pre-configured canonical syllabus Wumpus World layout
  // Pit at [3, 1], [3, 3], [4, 4]
  // Wumpus at [1, 3]
  // Gold at [2, 3]
  const findCell = (x: number, y: number) => {
    for (const r of grid) {
      for (const c of r) {
        if (c.x === x && c.y === y) return c;
      }
    }
    return undefined;
  };

  const pits = [[3, 1], [3, 3], [4, 4]];
  pits.forEach(([px, py]) => {
    const c = findCell(px, py);
    if (c) c.hasPit = true;
  });

  const w = findCell(1, 3);
  if (w) w.hasWumpus = true;

  const g = findCell(2, 3);
  if (g) g.hasGold = true;

  // Set percept indicators for adjacent cells
  const getAdjacent = (x: number, y: number) => {
    return [
      findCell(x + 1, y),
      findCell(x - 1, y),
      findCell(x, y + 1),
      findCell(x, y - 1)
    ].filter(Boolean) as WumpusCell[];
  };

  pits.forEach(([px, py]) => {
    getAdjacent(px, py).forEach(adj => (adj.breeze = true));
  });

  if (w) {
    getAdjacent(1, 3).forEach(adj => (adj.stench = true));
  }

  if (g) {
    g.glitter = true;
  }

  return grid;
}
