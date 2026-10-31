import React, { useState } from 'react';
import { soundFx } from '../../lib/sound';

interface GraphVisualizerProps {
  matrix: number[][];
  nodeNames: string[];
  visited?: boolean[];
  currentNode?: number | null;
  relaxingEdge?: [number, number] | null;
  mstEdges?: [number, number, number][]; // [u, v, weight]
  nodeColors?: number[]; // For graph coloring (1-based color indices)
  distances?: number[]; // For Dijkstra
  queueOrStack?: number[];
  isQueue?: boolean;
  pathTrail?: number[]; // For Hamiltonian cycle
  onSelectNode?: (nodeIndex: number) => void;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  matrix,
  nodeNames,
  visited,
  currentNode,
  relaxingEdge,
  mstEdges = [],
  nodeColors,
  distances,
  queueOrStack,
  isQueue = true,
  pathTrail,
  onSelectNode,
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const V = matrix.length;
  const width = 540;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.38;

  // Calculate coordinates for vertices in a circle
  const coords = Array.from({ length: V }, (_, i) => {
    const angle = (2 * Math.PI * i) / V - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  // Extract edges to avoid duplicate rendering for undirected graphs
  const edges: { u: number; v: number; weight: number }[] = [];
  for (let i = 0; i < V; i++) {
    for (let j = i + 1; j < V; j++) {
      if (matrix[i][j] > 0 && matrix[i][j] < 999) {
        edges.push({ u: i, v: j, weight: matrix[i][j] });
      }
    }
  }

  // Palette colors for graph coloring
  const PALETTE = ['#0284c7', '#059669', '#d97706', '#dc2626', '#7c3aed', '#db2777'];

  return (
    <div className="flex flex-col gap-3.5 p-5 bg-white border border-slate-200 rounded-xl shadow-2xs">
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
        <span className="font-semibold uppercase tracking-wider text-slate-700">
          Interactive Graph Topology Stage ({V} Vertices, {edges.length} Edges)
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Click any node to set as Source
          </span>
          {currentNode !== null && currentNode !== undefined && (
            <span className="font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Active: {nodeNames[currentNode]}
            </span>
          )}
        </div>
      </div>

      <div className="relative flex justify-center bg-slate-50/70 border border-slate-200/80 rounded-lg overflow-hidden py-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[540px] h-[300px] select-none"
        >
          {/* Edge Lines */}
          {edges.map((e, idx) => {
            const p1 = coords[e.u];
            const p2 = coords[e.v];

            // Is this edge currently being relaxed?
            const isRelaxing =
              relaxingEdge &&
              ((relaxingEdge[0] === e.u && relaxingEdge[1] === e.v) ||
                (relaxingEdge[0] === e.v && relaxingEdge[1] === e.u));

            // Is this edge in the MST?
            const isInMST = mstEdges.some(
              (mst) => (mst[0] === e.u && mst[1] === e.v) || (mst[0] === e.v && mst[1] === e.u)
            );

            // Is this edge incident to hovered node?
            const isIncidentToHover = hoveredNode === e.u || hoveredNode === e.v;

            // Is this edge part of the current Hamiltonian path?
            let isInPath = false;
            if (pathTrail && pathTrail.length > 1) {
              for (let k = 0; k < pathTrail.length - 1; k++) {
                if (
                  (pathTrail[k] === e.u && pathTrail[k + 1] === e.v) ||
                  (pathTrail[k] === e.v && pathTrail[k + 1] === e.u)
                ) {
                  isInPath = true;
                  break;
                }
              }
            }

            let stroke = '#cbd5e1';
            let strokeWidth = 1.5;
            let strokeDash = undefined;

            if (isInMST) {
              stroke = '#059669';
              strokeWidth = 3.5;
            } else if (isInPath) {
              stroke = '#7c3aed';
              strokeWidth = 3;
            } else if (isRelaxing) {
              stroke = '#f59e0b';
              strokeWidth = 3;
              strokeDash = '4,4';
            } else if (isIncidentToHover) {
              stroke = '#38bdf8';
              strokeWidth = 2.5;
            }

            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  className="transition-all duration-200"
                />
                {/* Weight Label if weighted graph */}
                {e.weight !== 1 && (
                  <g>
                    <rect
                      x={midX - 13}
                      y={midY - 9}
                      width={26}
                      height={18}
                      rx={5}
                      fill="#ffffff"
                      stroke={isIncidentToHover ? '#38bdf8' : '#e2e8f0'}
                      strokeWidth={1.5}
                      className="shadow-xs"
                    />
                    <text
                      x={midX}
                      y={midY + 3.5}
                      textAnchor="middle"
                      className="text-[10px] font-mono font-bold fill-slate-700"
                    >
                      {e.weight}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Node Circles */}
          {coords.map((c, i) => {
            const isCur = currentNode === i;
            const isVis = visited ? visited[i] : false;
            const isHover = hoveredNode === i;
            const assignedColor = nodeColors && nodeColors[i] > 0 ? PALETTE[(nodeColors[i] - 1) % PALETTE.length] : null;

            let fillColor = '#ffffff';
            let strokeColor = '#94a3b8';
            let strokeWidth = 2;

            if (assignedColor) {
              fillColor = assignedColor;
              strokeColor = '#0f172a';
              strokeWidth = 2.5;
            } else if (isCur) {
              fillColor = '#e0f2fe';
              strokeColor = '#0284c7';
              strokeWidth = 3.5;
            } else if (isVis) {
              fillColor = '#ecfdf5';
              strokeColor = '#059669';
              strokeWidth = 2.5;
            }

            return (
              <g
                key={`node-${i}`}
                className="cursor-pointer transition-transform duration-150"
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  soundFx.playStep();
                  if (onSelectNode) onSelectNode(i);
                }}
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHover || isCur ? 22 : 19}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="shadow-md"
                />
                <text
                  x={c.x}
                  y={c.y + 4.5}
                  textAnchor="middle"
                  className={`text-xs font-mono font-bold pointer-events-none select-none ${
                    assignedColor ? 'fill-white' : 'fill-slate-900'
                  }`}
                >
                  {nodeNames[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Auxiliary State Details: Distances or Traversal Queue/Stack */}
      {distances && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span>Tentative Distance Vector (Dijkstra dist[]):</span>
            <span className="font-mono text-[11px] text-slate-500">
              Min unvisited vertex selected at each relaxation step
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {distances.map((d, dIdx) => (
              <div
                key={dIdx}
                onClick={() => onSelectNode && onSelectNode(dIdx)}
                className={`p-2 rounded-md text-center border text-xs font-mono cursor-pointer transition-colors ${
                  visited && visited[dIdx]
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400'
                }`}
              >
                <div className="text-[10px] text-slate-500 font-semibold">{nodeNames[dIdx]}</div>
                <div className="font-bold text-sm tabular-nums mt-0.5">
                  {d >= 99999 ? '∞' : d}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue or Stack Buffer State for BFS / DFS */}
      {queueOrStack && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span>
              {isQueue ? 'FIFO Queue Buffer (Queue<Integer> q)' : 'LIFO Stack Buffer (Stack<Integer> s)'}:
            </span>
            <span className="font-mono text-slate-500">
              Active Elements: {queueOrStack.length}
            </span>
          </div>
          {queueOrStack.length === 0 ? (
            <div className="text-xs text-slate-400 italic">Buffer is empty.</div>
          ) : (
            <div className="flex flex-wrap gap-2 items-center">
              {queueOrStack.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold border shadow-2xs ${
                    qIdx === 0
                      ? 'bg-sky-100 border-sky-400 text-sky-950 ring-2 ring-sky-300'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {isQueue && qIdx === 0 ? 'Front: ' : !isQueue && qIdx === queueOrStack.length - 1 ? 'Top: ' : ''}
                  {nodeNames[item]}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
