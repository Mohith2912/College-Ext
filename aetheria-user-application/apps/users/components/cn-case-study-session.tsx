'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  Check,
  Clock3,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import {
  caseStages,
  learningGoals,
  type CaseStage,
} from '@/lib/cn-case-study-session';

const stageIndex = (stage: CaseStage['id']) => caseStages.findIndex(item => item.id === stage);

export function CnCaseStudySession() {
  const [activeStage, setActiveStage] = useState<CaseStage['id']>('brief');
  const [completedStages, setCompletedStages] = useState<CaseStage['id'][]>([]);

  const activeIndex = stageIndex(activeStage);
  const progress = Math.round((completedStages.length / caseStages.length) * 100);
  const stage = caseStages[activeIndex];
  const completed = useMemo(() => new Set(completedStages), [completedStages]);

  function openStage(nextStage: CaseStage['id']) {
    setActiveStage(nextStage);
    document.querySelector('#case-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function completeStage(stageId: CaseStage['id'], nextStage?: CaseStage['id']) {
    setCompletedStages(current => current.includes(stageId) ? current : [...current, stageId]);
    if (nextStage) openStage(nextStage);
  }

  function resetSession() {
    setActiveStage('brief');
    setCompletedStages([]);
  }

  return <div className="cn-case-shell">
    <section className="cn-case-hero" aria-labelledby="cn-case-title">
      <div className="cn-case-hero__copy">
        <p className="cn-case-kicker"><ShieldAlert size={15} aria-hidden="true" /> Guided incident lab · Computer Networks</p>
        <h1 id="cn-case-title">The stream is live. The learning is not.</h1>
        <p>A campus lecture reaches every student—until video begins buffering across one building. Work the incident from symptom to verified recovery and explain each decision with network evidence.</p>
        <div className="cn-case-hero__actions">
          <button className="btn btn-primary" onClick={() => openStage('brief')}>Begin investigation <ArrowRight size={16} aria-hidden="true" /></button>
          <span><Clock3 size={15} aria-hidden="true" /> 20–25 minutes</span>
          <span><Activity size={15} aria-hidden="true" /> 5 checkpoints</span>
        </div>
      </div>
      <div className="cn-case-hero__brief" aria-label="Incident summary">
        <span>INC-024</span>
        <strong>North Hall livestream</strong>
        <dl>
          <div><dt>Impact</dt><dd>146 viewers</dd></div>
          <div><dt>Started</dt><dd>10:07 IST</dd></div>
          <div><dt>Priority</dt><dd>Classroom disruption</dd></div>
        </dl>
        <small>Fictional practice scenario</small>
      </div>
    </section>

    <section className="cn-case-objectives" aria-labelledby="case-objectives-title">
      <div><BookOpenCheck size={22} aria-hidden="true" /><span><small>Session outcomes</small><strong id="case-objectives-title">What you will practise</strong></span></div>
      <ul>{learningGoals.map(goal => <li key={goal}><Check size={14} aria-hidden="true" />{goal}</li>)}</ul>
    </section>

    <nav className="cn-case-progress" aria-label="Case study checkpoints">
      <div className="cn-case-progress__summary">
        <span>{progress}% complete</span>
        <button type="button" onClick={resetSession}><RotateCcw size={13} aria-hidden="true" /> Reset</button>
      </div>
      <div className="cn-case-progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
      <ol>{caseStages.map((item, index) => <li key={item.id}>
        <button type="button" className={activeStage === item.id ? 'active' : ''} aria-current={activeStage === item.id ? 'step' : undefined} onClick={() => openStage(item.id)}>
          <span>{completed.has(item.id) ? <Check size={14} aria-hidden="true" /> : index + 1}</span>
          <span><strong>{item.shortLabel}</strong><small>{item.description}</small></span>
        </button>
      </li>)}</ol>
    </nav>

    <section id="case-workspace" className="cn-case-workspace" aria-labelledby="case-stage-title">
      <header><div><span>Checkpoint {activeIndex + 1} of {caseStages.length}</span><h2 id="case-stage-title">{stage.label}</h2></div><p>{stage.description}</p></header>
      <div className="cn-case-placeholder">Interactive checkpoint content</div>
      <footer><button className="btn btn-primary" onClick={() => completeStage(activeStage, caseStages[activeIndex + 1]?.id)}>Mark checkpoint complete <ArrowRight size={15} aria-hidden="true" /></button></footer>
    </section>
  </div>;
}
