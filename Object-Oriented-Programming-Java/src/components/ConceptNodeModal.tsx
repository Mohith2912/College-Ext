import React from 'react';
import { X, ExternalLink, Code, Lightbulb, CheckCircle2, Bookmark } from 'lucide-react';
import { ConceptNode } from '../types/concept';

interface ConceptNodeModalProps {
  node: ConceptNode | null;
  onClose: () => void;
  onOpenCaseStudy?: (caseStudyId: string) => void;
  onOpenFillups?: () => void;
}

export const ConceptNodeModal: React.FC<ConceptNodeModalProps> = ({
  node,
  onClose,
  onOpenCaseStudy,
  onOpenFillups
}) => {
  if (!node) return null;

  const bloomsDescriptions: Record<string, string> = {
    K1: 'Remember · Recall definitions, basic syntax, and keywords',
    K2: 'Understand · Explain concepts, compare paradigms, summarize mechanisms',
    K3: 'Apply · Implement algorithms, write valid classes and programs',
    K4: 'Analyze · Compare performance, trace memory buffers and execution cycles',
    K5: 'Evaluate · Assess architecture, justify engineering tradeoffs & calculate tariffs',
    K6: 'Create · Synthesize comprehensive enterprise applications from specifications'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">{node.unit}</span>
              <span aria-hidden="true">·</span>
              <span>{node.co}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-700 font-semibold">{node.blooms}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{node.title}</h2>
            <p className="text-sm text-slate-600 mt-0.5">{node.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          {/* Bloom's Level & Cognitive Goal */}
          <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg flex items-start gap-3">
            <Bookmark className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-xs text-indigo-900 uppercase tracking-wide">Cognitive Objective:</span>
              <p className="text-xs text-indigo-800 mt-0.5">{bloomsDescriptions[node.blooms]}</p>
            </div>
          </div>

          {/* Core Concept Definition */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Core Theory & Definition</h3>
            <p className="leading-relaxed text-slate-700 bg-white p-3 rounded-lg border border-slate-100">
              {node.description}
            </p>
          </div>

          {/* Key Syllabus Takeaways */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Key Takeaways for Exam</h3>
            <ul className="space-y-2">
              {node.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-xs leading-normal">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Demonstration if available */}
          {node.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-slate-500" />
                  Java Reference Implementation
                </h3>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <pre>{node.codeSnippet}</pre>
              </div>
            </div>
          )}

          {/* Real-World Metaphor / Engineering Context */}
          {node.realWorldExample && (
            <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-lg flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-amber-900">Real-World Analogy & Metaphor:</span>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">{node.realWorldExample}</p>
              </div>
            </div>
          )}

          {/* Exam Relevance */}
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
            <span className="font-medium text-slate-700">Exam Mapping:</span>
            <span>{node.examRelevance}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {node.relatedCaseStudyId && onOpenCaseStudy && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCaseStudy(node.relatedCaseStudyId!);
                }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Case Study Simulation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            {onOpenFillups && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFillups();
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                Practice in Fill-ups Lab
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
