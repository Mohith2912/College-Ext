'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import type { InteractiveModule } from '@/lib/learning-studio';

export function InteractiveWalkthrough({ modules }: { modules: InteractiveModule[] }) {
  const terms = [...new Map(modules.map(item => [item.termNumber, item.term])).entries()];
  const [term, setTerm] = useState(terms[0]?.[0] ?? 1);
  const courses = useMemo(() => [...new Map(modules.filter(item => item.termNumber === term).map(item => [item.courseSlug, item.course])).entries()], [modules, term]);
  const [courseSlug, setCourseSlug] = useState(courses[0]?.[0] ?? '');
  const availableCourses = courses.some(([slug]) => slug === courseSlug) ? courses : courses.slice(0, 1);
  const selectedCourse = availableCourses[0]?.[0] === courseSlug ? courseSlug : availableCourses[0]?.[0] ?? '';
  const courseModules = modules.filter(item => item.termNumber === term && item.courseSlug === selectedCourse);
  const [moduleId, setModuleId] = useState(courseModules[0]?.id ?? '');
  const selected = courseModules.find(item => item.id === moduleId) ?? courseModules[0];
  const [stepIndex, setStepIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const step = selected?.steps[Math.min(stepIndex, Math.max(0, selected.steps.length - 1))];

  function reset(nextModule?: string) { if (nextModule) setModuleId(nextModule); setStepIndex(0); setExpanded(false); }
  if (!selected || !step) return <div className="empty-state"><h2>Interactive sessions are being prepared.</h2><p>Publish a module note to make it available here.</p></div>;

  return <div className="interactive-studio">
    <div className="session-selectors">
      <label>Semester<select value={term} onChange={event => { const next = Number(event.target.value); setTerm(next); const first = modules.find(item => item.termNumber === next); setCourseSlug(first?.courseSlug ?? ''); reset(first?.id); }}>{terms.map(([number,label])=><option key={number} value={number}>{label}</option>)}</select></label>
      <label>Course<select value={selectedCourse} onChange={event => { setCourseSlug(event.target.value); reset(modules.find(item => item.termNumber === term && item.courseSlug === event.target.value)?.id); }}>{courses.map(([slug,title])=><option key={slug} value={slug}>{title}</option>)}</select></label>
      <label>Module<select value={selected.id} onChange={event => reset(event.target.value)}>{courseModules.map(item=><option key={item.id} value={item.id}>{item.module}</option>)}</select></label>
    </div>
    <section className="walkthrough-card">
      <header><strong>INTERACTIVE STUDY LAB</strong><span>Step {stepIndex + 1} of {selected.steps.length}</span></header>
      <div className="concept-track" aria-label="Session progress">{selected.steps.map((item,index)=><button key={`${item.title}-${index}`} className={index === stepIndex ? 'active' : index < stepIndex ? 'complete' : ''} onClick={()=>{setStepIndex(index);setExpanded(false)}}><span>{index + 1}</span><small>{item.title}</small></button>)}</div>
      <div className="walkthrough-scene"><p className="scene-label">{step.label}</p><h2>{step.title}</h2><p>{step.description}</p><div className="active-concept"><BookOpen aria-hidden="true"/><span><small>CURRENT CONCEPT</small><strong>{selected.module}</strong></span></div></div>
      <div className="walkthrough-info"><span className="course-code">{selected.courseCode} · {selected.term}</span><h3>What is happening?</h3><p>{step.description}</p>{expanded&&<div className="learn-panel"><strong>Learn more</strong><ul>{step.details.map(detail=><li key={detail}>{detail}</li>)}</ul></div>}</div>
      <footer><button className="btn btn-secondary" onClick={()=>setExpanded(!expanded)}>{expanded?'Hide details':'Learn more'}</button><div><button className="btn btn-secondary" disabled={stepIndex===0} onClick={()=>{setStepIndex(stepIndex-1);setExpanded(false)}}><ArrowLeft size={15}/> Previous</button>{stepIndex === selected.steps.length-1 ? <button className="btn btn-primary" onClick={()=>reset()}><RotateCcw size={15}/> Restart</button> : <button className="btn btn-primary" onClick={()=>{setStepIndex(stepIndex+1);setExpanded(false)}}>Next <ArrowRight size={15}/></button>}</div></footer>
    </section>
    <p className="session-source">Based on the latest published module content. <Link href={`/notes/${selected.courseSlug}/${selected.moduleSlug}`}>Open the complete note <ArrowRight size={13}/></Link></p>
  </div>;
}
