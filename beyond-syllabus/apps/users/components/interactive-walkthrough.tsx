'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import type { InteractiveModule } from '@/lib/learning-studio';
import { cnRepositoryUrl } from '@/lib/cn-repositories';

export function InteractiveWalkthrough({ modules, initialCourse, initialModule }: { modules: InteractiveModule[]; initialCourse?: string; initialModule?: string }) {
  const requested = modules.find(item => item.courseSlug === initialCourse && item.moduleSlug === initialModule);
  const defaultModule = requested ?? modules[0];
  const [moduleId, setModuleId] = useState(defaultModule?.id ?? '');
  const selected = modules.find(item => item.id === moduleId) ?? defaultModule;
  const terms = [...new Map(modules.map(item => [item.termNumber, item.term])).entries()];
  const termNumber = selected?.termNumber ?? terms[0]?.[0] ?? 1;
  const courses = [...new Map(modules.filter(item => item.termNumber === termNumber).map(item => [item.courseSlug, item.course])).entries()];
  const courseSlug = selected?.courseSlug ?? courses[0]?.[0] ?? '';
  const courseModules = modules.filter(item => item.termNumber === termNumber && item.courseSlug === courseSlug);
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const step = selected?.steps[activeStep];

  useEffect(() => { setActiveStep(0); setExpanded(false); setChoice(null); }, [selected?.id]);

  function selectModule(id: string) {
    const next = modules.find(item => item.id === id);
    if (next?.courseSlug === 'computer-networks' && /^computer-networks-unit-[1-5]$/.test(next.moduleSlug)) {
      window.location.assign(cnRepositoryUrl(next.moduleSlug)!);
      return;
    }
    if (id !== moduleId) setModuleId(id);
  }
  if (!selected || !step) return <div className="empty-state"><h2>No published modules have interactive labs yet.</h2><p>When an administrator publishes course material, its module lab will appear here.</p><Link href="/notes" className="btn btn-secondary">Browse courses</Link></div>;

  return <div className="interactive-studio">
    <div className="session-selectors">
      <label>Semester<select value={termNumber} onChange={event => { const nextTerm = Number(event.target.value); const first = modules.find(item => item.termNumber === nextTerm); if (first) selectModule(first.id); }}>{terms.map(([number, label]) => <option key={number} value={number}>{label}</option>)}</select></label>
      <label>Course<select value={courseSlug} onChange={event => { const first = modules.find(item => item.termNumber === termNumber && item.courseSlug === event.target.value); if (first) selectModule(first.id); }}>{courses.map(([slug, title]) => <option key={slug} value={slug}>{title}</option>)}</select></label>
      <label>Module<select value={selected.id} onChange={event => selectModule(event.target.value)}>{courseModules.map(item => <option key={item.id} value={item.id}>{item.module}</option>)}</select></label>
    </div>
    <section className="walkthrough-card">
      <header><strong>INTERACTIVE STUDY LAB</strong><span>Step {activeStep + 1} of {selected.steps.length}</span></header>
      <div className="concept-track" aria-label="Session progress">{selected.steps.map((item, index) => <button key={`${item.title}-${index}`} aria-current={index === activeStep ? 'step' : undefined} className={index === activeStep ? 'active' : index < activeStep ? 'complete' : ''} onClick={() => { setActiveStep(index); setChoice(null); setExpanded(false); }}><span>{index < activeStep ? '✓' : index + 1}</span><small>{item.title}</small></button>)}</div>
      <div className="walkthrough-scene"><p className="scene-label">{step.label}</p><h2>{step.title}</h2><p>{step.description}</p><div className="active-concept"><BookOpen aria-hidden="true"/><span><small>CURRENT MODULE</small><strong>{selected.module}</strong></span></div></div>
      <div className="walkthrough-info"><span className="course-code">{selected.courseCode} · {selected.term}</span><h3>Try this checkpoint</h3><p>{step.challenge.question}</p><div className="mt-4 grid gap-2">{step.challenge.options.map((option, index) => <button key={`${step.title}-${index}`} aria-pressed={choice === index} onClick={() => setChoice(index)} className={`rounded-xl border p-3 text-left text-sm transition ${choice === index ? index === step.challenge.answer ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : 'border-amber-400 bg-amber-50 text-amber-950' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>{option}</button>)}</div>{choice !== null && <p role="status" className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6"><strong>{choice === step.challenge.answer ? 'That matches the published module. ' : 'Not quite. Re-read the checkpoint idea. '}</strong>{step.challenge.explanation}</p>}{expanded && <div className="learn-panel"><strong>Explore the source idea</strong><ul>{step.details.map((detail, index) => <li key={`${index}-${detail}`}>{detail}</li>)}</ul></div>}</div>
      <footer><button className="btn btn-secondary" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide guidance' : 'Show guidance'}</button><div><button className="btn btn-secondary" disabled={activeStep === 0} onClick={() => { setActiveStep(activeStep - 1); setChoice(null); setExpanded(false); }}><ArrowLeft size={15}/> Previous</button>{activeStep === selected.steps.length - 1 ? <button className="btn btn-primary" onClick={() => { setActiveStep(0); setChoice(null); setExpanded(false); }}><RotateCcw size={15}/> Restart</button> : <button className="btn btn-primary" onClick={() => { setActiveStep(activeStep + 1); setChoice(null); setExpanded(false); }}>Next <ArrowRight size={15}/></button>}</div></footer>
    </section>
    <p className="session-source">Built from this published module. <Link href={`/notes/${selected.courseSlug}/${selected.moduleSlug}`}>Open full notes <ArrowRight size={13}/></Link></p>
  </div>;
}
