/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './components/TopNav';
import { CourseTopNav } from './components/CourseTopNav';
import { ConceptMapView } from './components/ConceptMapView';
import { ConceptNodeModal } from './components/ConceptNodeModal';
import { ConceptLabHub } from './components/ConceptLabHub';
import { FillupsLab } from './components/FillupsLab';
import { DragDropStudio } from './components/DragDropStudio';
import { ExamQuestionBank } from './components/ExamQuestionBank';
import { ConceptNode, UnitId } from './types/concept';
import { Sparkles, Map, Terminal, Shuffle, BookOpen, Layers } from 'lucide-react';
import heroConceptMap from './assets/images/hero_concept_map_edtech_1790864713497.jpg';

function initialUnit(): UnitId | 'all' {
  const unit = new URLSearchParams(window.location.search).get('unit');
  return unit && /^[1-5]$/.test(unit) ? (`Unit-${unit}` as UnitId) : 'all';
}

export default function App() {
  const [lockedUnit] = useState<UnitId | undefined>(() => {
    const unit = initialUnit();
    return unit === 'all' ? undefined : unit;
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>(() =>
    lockedUnit ? 'concept_labs' : 'concept_map'
  );
  const [selectedUnit, setSelectedUnit] = useState<UnitId | 'all'>(() => lockedUnit ?? 'all');
  const [inspectedNode, setInspectedNode] = useState<ConceptNode | null>(null);

  const handleOpenCaseStudy = (caseId: string) => {
    setActiveTab('concept_labs');
  };

  const handleOpenFillups = () => {
    setActiveTab('fillups');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 3-Zone Top Navigation Bar with Unit Selector */}
      <CourseTopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedUnit={selectedUnit}
        setSelectedUnit={(unit) => {
          if (!lockedUnit) setSelectedUnit(unit);
        }}
        lockedUnit={lockedUnit}
      />

      {/* Hero / Quick Context Header */}
      {!lockedUnit && (
      <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background image from asset with contrast scrim */}
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none overflow-hidden">
          <img
            src={heroConceptMap}
            alt="Concept Mapping Canvas"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-mono">
                <span>BE/B.Tech III Semester</span>
                <span aria-hidden="true">·</span>
                <span>Course 2321CSC304R</span>
                <span aria-hidden="true">·</span>
                <span>Regulations R 2023-V 1.2</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Object Oriented Programming using JAVA (Units 1 – 5)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Conceptual understanding engine with hands-on mental models for Polymorphism, Mutex Concurrency, Exception Stacks, and Generational Memory.
              </p>
            </div>

            {/* Quick Stats & Bloom's Taxonomy Summary */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-xs text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                  Syllabus Coverage
                </span>
                <div className="flex items-center gap-1.5 text-slate-200">
                  <span className="font-semibold text-emerald-400">CO1 to CO5</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-indigo-300">Bloom's K1 - K6</span>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 mx-1" />
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                  Interactive Features
                </span>
                <span className="font-semibold text-white">
                  5 Unit Simulators · 15+ Fill-ups
                </span>
              </div>
            </div>
          </div>

          {/* Quick Module Navigation Buttons */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('concept_map')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'concept_map'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Panoramic Concept Map</span>
            </button>
            <button
              onClick={() => setActiveTab('concept_labs')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'concept_labs'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Concept Simulators (Units 1–5)</span>
            </button>
            <button
              onClick={() => setActiveTab('fillups')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'fillups'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Fill-ups Lab</span>
            </button>
            <button
              onClick={() => setActiveTab('drag_drop')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'drag_drop'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Drag & Drop Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('exam_bank')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'exam_bank'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Question Bank & Rubrics</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Main Interactive Workspace */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'concept_map' && (
          <ConceptMapView
            onSelectNode={(node) => setInspectedNode(node)}
            onOpenCaseStudy={handleOpenCaseStudy}
            selectedUnit={selectedUnit}
          />
        )}

        {activeTab === 'concept_labs' && (
          <ConceptLabHub
            currentUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
            onOpenFillups={handleOpenFillups}
            lockedUnit={lockedUnit}
          />
        )}

        {activeTab === 'fillups' && <FillupsLab selectedUnit={selectedUnit} locked={Boolean(lockedUnit)} />}

        {activeTab === 'drag_drop' && <DragDropStudio selectedUnit={selectedUnit} locked={Boolean(lockedUnit)} />}

        {activeTab === 'exam_bank' && (
          <ExamQuestionBank
            onOpenCaseStudy={handleOpenCaseStudy}
            onOpenFillups={handleOpenFillups}
            selectedUnit={selectedUnit}
            locked={Boolean(lockedUnit)}
          />
        )}
      </main>

      {/* Deep-Dive Concept Node Modal */}
      {inspectedNode && (
        <ConceptNodeModal
          node={inspectedNode}
          onClose={() => setInspectedNode(null)}
          onOpenCaseStudy={handleOpenCaseStudy}
          onOpenFillups={handleOpenFillups}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">JavaMap EDU</span>
            <span aria-hidden="true">·</span>
            <span>Anna University B.E/B.Tech (AI&DS, CSE, AIML, IT) III Semester</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Course Code: 2321CSC304R</span>
            <span aria-hidden="true">·</span>
            <span>Regulations R 2023-V 1.2 (Units 1 to 5)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
