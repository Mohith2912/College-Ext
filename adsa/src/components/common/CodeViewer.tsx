import React, { useRef, useEffect, useState } from 'react';
import { JAVA_SNIPPETS } from '../../data/javaSnippets';
import { LabId } from '../../types/algorithm';
import { Code2, Terminal, Copy, Check } from 'lucide-react';
import { soundFx } from '../../lib/sound';

interface CodeViewerProps {
  labId: LabId;
  activeLine: number;
  explanation: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  labId,
  activeLine,
  explanation,
}) => {
  const codeDef = JAVA_SNIPPETS[labId];
  const activeLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeLine]);

  const handleCopy = () => {
    if (!codeDef) return;
    navigator.clipboard.writeText(codeDef.code);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  if (!codeDef) return null;

  const lines = codeDef.code.split('\n');

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-slate-100 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-sky-400" />
          <span className="font-mono text-slate-200 font-semibold">{codeDef.sourceFile}</span>
          <span className="text-slate-600">·</span>
          <span>Java Implementation</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-sky-400 font-bold bg-sky-950 px-2 py-0.5 rounded border border-sky-800/60">
            Line {activeLine}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            title="Copy Java Source Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code line body */}
      <div
        ref={containerRef}
        className="p-2 font-mono text-xs overflow-y-auto max-h-80 leading-relaxed selection:bg-sky-900 selection:text-white"
      >
        {lines.map((lineText, idx) => {
          const lineNum = idx + 1;
          const isActive = lineNum === activeLine;
          const lineMeaning = codeDef.lineMapping[lineNum];

          return (
            <div
              key={idx}
              ref={isActive ? activeLineRef : null}
              title={lineMeaning ? `DAA Syllabus Role: ${lineMeaning}` : undefined}
              className={`flex items-start px-2.5 py-0.5 rounded transition-all ${
                isActive
                  ? 'bg-sky-950/90 border-l-3 border-sky-400 text-white font-medium shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800/40'
              }`}
            >
              <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-3 font-mono text-[11px] tabular-nums">
                {lineNum}
              </span>
              <span className="flex-1 whitespace-pre">{lineText || ' '}</span>
            </div>
          );
        })}
      </div>

      {/* Step Explanation Banner */}
      <div className="flex items-start gap-2.5 p-3 bg-slate-950/95 border-t border-slate-800 text-xs text-sky-200">
        <Terminal className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-sky-300">Active Execution Step: </span>
          <span>{explanation}</span>
        </div>
      </div>
    </div>
  );
};
