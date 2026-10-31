import React from 'react';
import { CaseStudySpec } from '../../types/algorithm';
import { Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

interface CaseStudyPanelProps {
  caseStudy: CaseStudySpec;
}

export const CaseStudyPanel: React.FC<CaseStudyPanelProps> = ({ caseStudy }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Industry Case Study Application
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">{caseStudy.industry}</span>
      </div>

      <div className="text-sm font-semibold text-slate-900 mb-1">{caseStudy.title}</div>
      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{caseStudy.scenario}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="p-3 bg-rose-50/50 border border-rose-100 rounded text-xs">
          <div className="font-semibold text-rose-900 mb-1 flex items-center gap-1">
            <span>Engineering Problem</span>
          </div>
          <p className="text-rose-800 leading-relaxed">{caseStudy.problem}</p>
        </div>

        <div className="p-3 bg-sky-50/50 border border-sky-100 rounded text-xs">
          <div className="font-semibold text-sky-900 mb-1 flex items-center gap-1">
            <span>Algorithmic Solution</span>
          </div>
          <p className="text-sky-800 leading-relaxed">{caseStudy.algorithmicSolution}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 p-2.5 bg-emerald-50/50 border border-emerald-100 rounded text-xs text-emerald-950">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-emerald-900">Real-World Quantitative Impact: </span>
          <span>{caseStudy.realWorldImpact}</span>
        </div>
      </div>
    </div>
  );
};
