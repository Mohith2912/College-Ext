'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Braces,
  Check,
  Clock3,
  Code2,
  RotateCcw,
} from 'lucide-react';
import {
  oopjLearningGoals,
  oopjStages,
  type OopjStage,
} from '@/lib/oopj-case-study-session';

const getStageIndex = (stage: OopjStage['id']) => oopjStages.findIndex(item => item.id === stage);

export function OopjCaseStudySession() {
  const [activeStage, setActiveStage] = useState<OopjStage['id']>('brief');
  const [completedStages, setCompletedStages] = useState<OopjStage['id'][]>([]);

  const activeIndex = getStageIndex(activeStage);
  const activeStageData = oopjStages[activeIndex];
  const completed = useMemo(() => new Set(completedStages), [completedStages]);
  const progress = Math.round((completedStages.length / oopjStages.length) * 100);

  function openStage(stage: OopjStage['id']) {
    setActiveStage(stage);
    document.querySelector('#oopj-case-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function completeStage(stage: OopjStage['id'], next?: OopjStage['id']) {
    setCompletedStages(current => current.includes(stage) ? current : [...current, stage]);
    if (next) openStage(next);
  }

  function resetSession() {
    setActiveStage('brief');
    setCompletedStages([]);
  }

  return <div className="oopj-case-shell">
    <section className="oopj-case-hero" aria-labelledby="oopj-case-title">
      <div className="oopj-case-hero__copy">
        <p className="oopj-case-kicker"><Braces size={15} aria-hidden="true" /> Guided design lab · OOP using Java</p>
        <h1 id="oopj-case-title">One last copy. Two issue desks. One object model.</h1>
        <p>Stabilise a fictional campus library service by turning requirements into Java objects, tracing runtime behaviour, and protecting shared state.</p>
        <div className="oopj-case-hero__actions">
          <button type="button" className="btn btn-primary" onClick={() => openStage('brief')}>Start the design review <ArrowRight size={16} aria-hidden="true" /></button>
          <span><Clock3 size={15} aria-hidden="true" /> 25–30 minutes</span>
          <span><Code2 size={15} aria-hidden="true" /> 6 checkpoints</span>
        </div>
      </div>
      <div className="oopj-case-hero__console" aria-label="Case study summary">
        <div><span /><span /><span /></div>
        <code><small>CASE JAVA-204</small><strong>Library circulation</strong><em>status: design review</em></code>
        <dl><div><dt>Users</dt><dd>2,400</dd></div><div><dt>Peak load</dt><dd>2 issue desks</dd></div><div><dt>Constraint</dt><dd>1 last copy</dd></div></dl>
      </div>
    </section>

    <section className="oopj-case-objectives" aria-labelledby="oopj-objectives-title">
      <div><BookOpenCheck size={22} aria-hidden="true" /><span><small>Session outcomes</small><strong id="oopj-objectives-title">What you will practise</strong></span></div>
      <ul>{oopjLearningGoals.map(goal => <li key={goal}><Check size={14} aria-hidden="true" />{goal}</li>)}</ul>
    </section>

    <nav className="oopj-case-progress" aria-label="OOPJ case study checkpoints">
      <div className="oopj-case-progress__summary"><span>{progress}% complete</span><button type="button" onClick={resetSession}><RotateCcw size={13} aria-hidden="true" /> Reset</button></div>
      <div className="oopj-case-progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
      <ol>{oopjStages.map((stage, index) => <li key={stage.id}><button type="button" className={activeStage === stage.id ? 'active' : ''} aria-current={activeStage === stage.id ? 'step' : undefined} onClick={() => openStage(stage.id)}><span>{completed.has(stage.id) ? <Check size={14} aria-hidden="true" /> : index + 1}</span><span><strong>{stage.shortLabel}</strong><small>{stage.description}</small></span></button></li>)}</ol>
    </nav>

    <section id="oopj-case-workspace" className="oopj-case-workspace" aria-labelledby="oopj-stage-title">
      <header><div><span>Checkpoint {activeIndex + 1} of {oopjStages.length}</span><h2 id="oopj-stage-title">{activeStageData.label}</h2></div><p>{activeStageData.description}</p></header>
      <div className="oopj-case-placeholder">Interactive checkpoint content</div>
      <footer><button type="button" className="btn btn-primary" onClick={() => completeStage(activeStage, oopjStages[activeIndex + 1]?.id)}>Mark checkpoint complete <ArrowRight size={15} aria-hidden="true" /></button></footer>
    </section>
  </div>;
}
