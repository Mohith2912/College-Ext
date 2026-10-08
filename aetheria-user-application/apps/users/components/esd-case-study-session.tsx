'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Award, BatteryCharging, Check, Clock3, Cpu, RotateCcw, Thermometer } from 'lucide-react';
import { esdLearningGoals, esdStages, type EsdStageId } from '@/lib/esd-case-study-session';

const stageIndex = (id: EsdStageId) => esdStages.findIndex(stage => stage.id === id);

export function EsdCaseStudySession() {
  const [activeStage, setActiveStage] = useState<EsdStageId>('mission');
  const [completedStages, setCompletedStages] = useState<EsdStageId[]>([]);
  const completed = useMemo(() => new Set(completedStages), [completedStages]);
  const activeIndex = stageIndex(activeStage);
  const progress = Math.round((completedStages.length / esdStages.length) * 100);
  const [stageReady, setStageReady] = useState<Record<EsdStageId, boolean>>({ mission: false, interfaces: false, timing: false, 'state-machine': false, power: false, debrief: false });

  function openStage(id: EsdStageId) {
    setActiveStage(id);
    document.querySelector('#esd-case-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeStage() {
    setCompletedStages(current => current.includes(activeStage) ? current : [...current, activeStage]);
    const next = esdStages[activeIndex + 1];
    if (next) openStage(next.id);
  }

  function resetSession() {
    setActiveStage('mission');
    setCompletedStages([]);
    setStageReady({ mission: false, interfaces: false, timing: false, 'state-machine': false, power: false, debrief: false });
  }

  return <div className="esd-case-shell">
    <section className="esd-case-hero" aria-labelledby="esd-case-title">
      <div>
        <p className="esd-kicker"><Cpu size={15} aria-hidden="true" /> Guided systems lab · Embedded Systems Design</p>
        <h1 id="esd-case-title">One cold-chain box. Six hours offline. Zero room for drift.</h1>
        <p>Rescue a fictional vaccine carrier by designing a dependable sensing, timing, control, and power strategy.</p>
        <div className="esd-hero-actions"><button type="button" className="btn btn-primary" onClick={() => openStage('mission')}>Open the incident brief <ArrowRight size={16} aria-hidden="true" /></button><span><Clock3 size={15} aria-hidden="true" /> 30–35 minutes</span><span><Cpu size={15} aria-hidden="true" /> 6 checkpoints</span></div>
      </div>
      <div className="esd-device" aria-label="Cold-chain device status">
        <header><span>FIELD UNIT</span><strong>VC-08</strong></header>
        <div><Thermometer aria-hidden="true" /><strong>9.6<sup>°C</sup></strong><small>threshold exceeded</small></div>
        <footer><span><BatteryCharging aria-hidden="true" /> 41%</span><span>LOG GAP 06:12:18</span></footer>
      </div>
    </section>

    <section className="esd-outcomes" aria-labelledby="esd-outcomes-title"><div><small>Learning outcomes</small><h2 id="esd-outcomes-title">Design decisions you will practise</h2></div><ul>{esdLearningGoals.map(goal => <li key={goal}><Check size={14} aria-hidden="true" />{goal}</li>)}</ul></section>

    <nav className="esd-progress" aria-label="ESD case study checkpoints">
      <div><span>{progress}% complete</span><button type="button" onClick={resetSession}><RotateCcw size={13} aria-hidden="true" /> Reset session</button></div>
      <div className="esd-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
      <ol>{esdStages.map((stage, index) => <li key={stage.id}><button type="button" className={activeStage === stage.id ? 'active' : ''} aria-current={activeStage === stage.id ? 'step' : undefined} onClick={() => openStage(stage.id)}><span>{completed.has(stage.id) ? <Check size={14} aria-hidden="true" /> : index + 1}</span><span><strong>{stage.shortLabel}</strong><small>{stage.description}</small></span></button></li>)}</ol>
    </nav>

    <section id="esd-case-workspace" className="esd-workspace" aria-labelledby="esd-stage-title">
      <header><div><span>Checkpoint {activeIndex + 1} of {esdStages.length}</span><h2 id="esd-stage-title">{esdStages[activeIndex].label}</h2></div><p>{esdStages[activeIndex].description}</p></header>
      <div className="esd-stage-placeholder"><Cpu size={26} aria-hidden="true" /><h3>{esdStages[activeIndex].shortLabel} activity</h3><p>The interactive engineering workspace is ready for this checkpoint.</p><button type="button" className="btn btn-secondary" onClick={() => setStageReady(current => ({ ...current, [activeStage]: true }))}>Mark activity ready</button></div>
      <footer><span>{stageReady[activeStage] ? 'Checkpoint ready to close.' : 'Complete the engineering activity to continue.'}</span><div>{activeIndex > 0 && <button type="button" className="btn btn-secondary" onClick={() => openStage(esdStages[activeIndex - 1].id)}>Previous checkpoint</button>}<button type="button" className="btn btn-primary" disabled={!stageReady[activeStage]} onClick={closeStage}>{activeIndex === esdStages.length - 1 ? 'Complete case study' : 'Close checkpoint'} <ArrowRight size={15} aria-hidden="true" /></button></div></footer>
    </section>

    {completedStages.length === esdStages.length && <section className="esd-complete" aria-live="polite"><Award aria-hidden="true" /><div><small>Systems review complete</small><h2>The carrier now senses, decides, and conserves power on purpose.</h2><p>You connected every design decision to a measurable safety requirement.</p></div><button type="button" className="btn btn-secondary" onClick={resetSession}><RotateCcw size={14} aria-hidden="true" /> Run again</button></section>}
  </div>;
}
