import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Filter,
  Maximize2,
  Move,
  Layers,
  Check
} from 'lucide-react';
import { ConceptNode, ConceptEdge, BloomsLevel, ConceptCategory, UnitId } from '../types/concept';
import { ALL_CONCEPT_NODES, ALL_CONCEPT_EDGES } from '../units/allUnitsData';

interface ConceptMapViewProps {
  onSelectNode: (node: ConceptNode) => void;
  onOpenCaseStudy: (caseStudyId: string) => void;
  selectedUnit: UnitId | 'all';
}

export const ConceptMapView: React.FC<ConceptMapViewProps> = ({
  onSelectNode,
  onOpenCaseStudy,
  selectedUnit
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlooms, setSelectedBlooms] = useState<string>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);

  // Pan / Drag State
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  // Filter nodes
  const filteredNodes = useMemo(() => {
    return ALL_CONCEPT_NODES.filter((node) => {
      if (selectedUnit !== 'all' && node.unit !== selectedUnit) return false;
      if (selectedCategory !== 'all' && node.category !== selectedCategory) return false;
      if (selectedBlooms !== 'all' && node.blooms !== selectedBlooms) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = node.title.toLowerCase().includes(q);
        const matchDesc = node.description.toLowerCase().includes(q);
        const matchSubtitle = node.subtitle.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSubtitle) return false;
      }
      return true;
    });
  }, [selectedUnit, selectedCategory, selectedBlooms, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  // Filter edges to only those where both nodes are visible
  const activeEdges = useMemo(() => {
    return ALL_CONCEPT_EDGES.filter((edge) => {
      return filteredNodeIds.has(edge.from) && filteredNodeIds.has(edge.to);
    });
  }, [filteredNodeIds]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, ConceptNode>();
    ALL_CONCEPT_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.5, Number((prev + delta).toFixed(2))), 1.4));
  };

  const resetView = () => {
    setZoomLevel(0.9);
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 40, top: 20, behavior: 'smooth' });
    }
  };

  // Connected nodes when a node is hovered
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const set = new Set<string>();
    ALL_CONCEPT_EDGES.forEach((e: ConceptEdge) => {
      if (e.from === hoveredNodeId) set.add(e.to);
      if (e.to === hoveredNodeId) set.add(e.from);
    });
    return set;
  }, [hoveredNodeId]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag when clicking background directly, not on a card or button
    if ((e.target as HTMLElement).closest('.interactive-card')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollStart({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !containerRef.current) return;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    containerRef.current.scrollLeft = scrollStart.left - dx;
    containerRef.current.scrollTop = scrollStart.top - dy;
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 min-h-[calc(100vh-4rem)]">
      {/* Control Strip & Filters */}
      <div className="bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-2.5 shrink-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, keywords (e.g. Polymorphism, GC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
            />
          </div>

          {/* Categorical & Bloom's Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedCategory === 'all' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Lanes
              </button>
              <button
                onClick={() => setSelectedCategory('oop_pillars')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedCategory === 'oop_pillars' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                4 Pillars
              </button>
              <button
                onClick={() => setSelectedCategory('jvm_architecture')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedCategory === 'jvm_architecture' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                JVM Architecture
              </button>
              <button
                onClick={() => setSelectedCategory('case_studies')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedCategory === 'case_studies' ? 'bg-white font-medium text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Case Studies
              </button>
            </div>

            {/* Bloom's Selector */}
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg">
              {(['all', 'K1', 'K2', 'K3', 'K4', 'K5'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlooms(b)}
                  className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                    selectedBlooms === b ? 'bg-white font-bold text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b === 'all' ? 'All' : b}
                </button>
              ))}
            </div>

            {/* Zoom & Canvas Navigation Controls */}
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg">
              <button
                onClick={() => handleZoom(-0.1)}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-600 text-[11px] px-1 font-mono tabular-nums">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom(0.1)}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetView}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                title="Reset View & Center"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Spacious Panoramic Canvas */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex-1 relative overflow-auto bg-slate-50 p-6 select-none ${
          isPanning ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Scaled Panoramic Graph Stage (2000px × 1450px) */}
        <div
          className="relative transition-transform duration-75 origin-top-left"
          style={{
            width: '2020px',
            height: '1450px',
            transform: `scale(${zoomLevel})`
          }}
        >
          {/* Architectural Lane Headers */}
          <div className="absolute top-2 left-[80px] w-[340px] border-b border-slate-300 pb-2">
            <span className="font-mono text-[11px] text-slate-400 block">LANE 01</span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Paradigms & Architecture (CO1)
            </h3>
          </div>

          <div className="absolute top-2 left-[560px] w-[340px] border-b border-slate-300 pb-2">
            <span className="font-mono text-[11px] text-slate-400 block">LANE 02</span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              The 4 Pillars & Core Modifiers (CO1/CO2)
            </h3>
          </div>

          <div className="absolute top-2 left-[1080px] w-[340px] border-b border-slate-300 pb-2">
            <span className="font-mono text-[11px] text-slate-400 block">LANE 03</span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Engine Mechanics, Collections & IO (CO1/CO2)
            </h3>
          </div>

          <div className="absolute top-2 left-[1600px] w-[340px] border-b border-emerald-400 pb-2">
            <span className="font-mono text-[11px] text-emerald-600 block">LANE 04</span>
            <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Applied Case Studies & Industry Labs (CO1/CO2)
            </h3>
          </div>

          {/* Lane Divider Guides */}
          <div className="absolute top-14 bottom-10 left-[480px] w-px border-r border-dashed border-slate-200/90 pointer-events-none" />
          <div className="absolute top-14 bottom-10 left-[990px] w-px border-r border-dashed border-slate-200/90 pointer-events-none" />
          <div className="absolute top-14 bottom-10 left-[1510px] w-px border-r border-dashed border-emerald-200 pointer-events-none" />

          {/* SVG Vector Layer for Connective Links */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <marker
                id="arrow-default"
                markerWidth="9"
                markerHeight="7"
                refX="8"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 9 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker
                id="arrow-highlight"
                markerWidth="9"
                markerHeight="7"
                refX="8"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 9 3.5, 0 7" fill="#4f46e5" />
              </marker>
              <marker
                id="arrow-case"
                markerWidth="9"
                markerHeight="7"
                refX="8"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 9 3.5, 0 7" fill="#059669" />
              </marker>
            </defs>

            {activeEdges.map((edge, idx) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              if (!fromNode || !toNode) return null;

              // Node dimensions (Width: 280px, Height: 90px approx)
              const cardWidth = 280;
              const cardHeight = 90;

              const startX = fromNode.x + cardWidth;
              const startY = fromNode.y + cardHeight / 2;
              const endX = toNode.x;
              const endY = toNode.y + cardHeight / 2;

              // Sweeping cubic bezier control points with generous curves
              const dx = Math.abs(endX - startX);
              const cp1X = startX + Math.max(80, dx * 0.45);
              const cp1Y = startY;
              const cp2X = endX - Math.max(80, dx * 0.45);
              const cp2Y = endY;

              const isHighlighted =
                hoveredNodeId === edge.from || hoveredNodeId === edge.to;
              const isCaseStudyLink = toNode.category === 'case_studies';

              return (
                <g key={`edge-${idx}`}>
                  <path
                    d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                    fill="none"
                    stroke={
                      isHighlighted
                        ? '#4f46e5'
                        : isCaseStudyLink
                        ? '#10b981'
                        : '#cbd5e1'
                    }
                    strokeWidth={isHighlighted ? 2.5 : isCaseStudyLink ? 1.8 : 1.4}
                    strokeDasharray={isCaseStudyLink ? '5,4' : undefined}
                    markerEnd={
                      isHighlighted
                        ? 'url(#arrow-highlight)'
                        : isCaseStudyLink
                        ? 'url(#arrow-case)'
                        : 'url(#arrow-default)'
                    }
                    className="transition-all duration-200"
                  />
                  {/* Subtle label on path midpoint */}
                  {(isHighlighted || isCaseStudyLink) && (
                    <text
                      x={(startX + endX) / 2}
                      y={(startY + endY) / 2 - 8}
                      fill={isHighlighted ? '#4338ca' : '#047857'}
                      fontSize="10"
                      fontFamily="system-ui, sans-serif"
                      fontWeight="600"
                      textAnchor="middle"
                      className="bg-white"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Node Cards Layer */}
          {filteredNodes.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isCaseStudy = node.category === 'case_studies';

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => onSelectNode(node)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: '280px'
                }}
                className={`interactive-card absolute p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isCaseStudy
                    ? 'bg-white border-emerald-300 hover:border-emerald-600 shadow-xs hover:shadow-lg'
                    : 'bg-white border-slate-200/90 hover:border-indigo-500 shadow-xs hover:shadow-lg'
                } ${
                  isHovered
                    ? 'ring-2 ring-indigo-500 scale-[1.02] z-20 shadow-xl'
                    : isConnected
                    ? 'ring-1 ring-indigo-300 z-10'
                    : 'z-0'
                }`}
              >
                {/* Meta bar */}
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="font-semibold text-slate-700">{node.unit}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-indigo-700 font-bold">{node.blooms}</span>
                  </div>
                  {isCaseStudy ? (
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Applied Lab
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium font-mono">
                      {node.co}
                    </span>
                  )}
                </div>

                {/* Node Title */}
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {node.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {node.subtitle}
                </p>

                {/* Footer interactive trigger */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                    <span>Inspect Concept</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  {node.relatedCaseStudyId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCaseStudy(node.relatedCaseStudyId!);
                      }}
                      className="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] underline decoration-emerald-300 cursor-pointer"
                    >
                      Run Simulator
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Canvas Legend */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-white border border-slate-300" />
            <span>Theoretical Architecture Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-50 border border-emerald-400" />
            <span className="font-medium text-emerald-800">Applied Case Study</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-indigo-500" />
            <span>Active Semantic Flow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t border-dashed border-emerald-500" />
            <span>Case Study Mapping</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span>Click & Drag canvas to pan</span>
          <span aria-hidden="true">·</span>
          <span>{filteredNodes.length} Visible Nodes</span>
          <span aria-hidden="true">·</span>
          <span>{activeEdges.length} Connections</span>
        </div>
      </div>
    </div>
  );
};
