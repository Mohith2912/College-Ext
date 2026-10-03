import React, { useState } from 'react';
import { UnitData, ConceptItem } from '../types/embedded';
import { MapPin, Clock, Gauge, Eye, ChevronDown, ChevronUp, Cpu, CheckCircle2, Copy, Check } from 'lucide-react';

interface StoryViewProps {
  unit: UnitData;
}

export const StoryView: React.FC<StoryViewProps> = ({ unit }) => {
  const [revealedConceptIds, setRevealedConceptIds] = useState<Set<string>>(new Set([unit.concepts[0]?.id || '']));
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const toggleReveal = (conceptId: string) => {
    setRevealedConceptIds((prev) => {
      const next = new Set(prev);
      if (next.has(conceptId)) {
        next.delete(conceptId);
      } else {
        next.add(conceptId);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealedConceptIds(new Set(unit.concepts.map((c) => c.id)));
  };

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Real-Life Incident Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Unit {unit.unitNumber} Real-Life Incident
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {unit.realLifeStory.location}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {unit.realLifeStory.timeframe}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            “{unit.realLifeStory.title}”
          </h2>

          <p className="mt-3.5 text-slate-600 text-sm md:text-base leading-relaxed max-w-4xl">
            {unit.realLifeStory.scenario}
          </p>

          {/* Metric Callout + Quote Banner */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">{unit.realLifeStory.keyMetricLabel}</div>
                <div className="text-lg font-bold font-mono text-indigo-700">{unit.realLifeStory.keyMetric}</div>
              </div>
            </div>

            <div className="text-xs italic text-slate-600 max-w-md bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200/80">
              “{unit.realLifeStory.quote}”
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Concept Mapping: "Where Each Concept Lives" */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-bold">
                Concept → Real Application Mapping
              </span>
              <span className="text-xs text-slate-400 font-medium">
                ({revealedConceptIds.size} / {unit.concepts.length} Revealed)
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Where Each Unit {unit.unitNumber} Concept Lives in Physical Hardware
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any concept to reveal the exact silicon location, register anchor, and code snippet.
            </p>
          </div>

          <button
            onClick={revealAll}
            className="self-start md:self-auto text-xs px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            Reveal All Hardware Anchors
          </button>
        </div>

        {/* Concept Cards List */}
        <div className="space-y-3">
          {unit.concepts.map((concept) => {
            const isRevealed = revealedConceptIds.has(concept.id);

            return (
              <div
                key={concept.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isRevealed
                    ? 'bg-slate-50/60 border-indigo-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleReveal(concept.id)}
                  className="p-4 md:p-4.5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <span
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono font-bold ${
                        isRevealed
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {concept.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm md:text-base font-bold text-slate-900">{concept.title}</h4>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
                          {concept.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{concept.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        isRevealed
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      <span>{isRevealed ? 'Hide Details' : 'Show Hardware Location'}</span>
                      {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Deep Dive Drawer */}
                {isRevealed && (
                  <div className="px-5 pb-5 pt-3 border-t border-slate-200/80 bg-white space-y-4 text-xs md:text-sm">
                    {/* Hardware Anchor Pinpoint */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-indigo-900 font-medium">
                        <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Exact Hardware Location:</span>
                        <strong className="text-slate-900 font-bold">{concept.realLocation}</strong>
                      </div>
                      <span className="text-[11px] font-mono text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 font-semibold">
                        Anchor: {concept.hardwareAnchor}
                      </span>
                    </div>

                    {/* Deep-dive Explanation */}
                    <p className="text-slate-700 leading-relaxed text-xs md:text-sm whitespace-pre-line">
                      {concept.deepDive}
                    </p>

                    {/* Code Snippet if present */}
                    {concept.codeSnippet && (
                      <div className="relative rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-emerald-300 shadow-inner">
                        <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                          <span>EMBEDDED C FIRMWARE SNIPPET</span>
                          <button
                            onClick={() => copyCode(concept.id, concept.codeSnippet!)}
                            className="flex items-center gap-1 text-slate-300 hover:text-white"
                          >
                            {copiedCodeId === concept.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedCodeId === concept.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre>{concept.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Key Engineering Takeaway */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Key Engineering Principle: </span>
                      <strong className="text-indigo-950 font-bold">{concept.keyTakeaway}</strong>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
