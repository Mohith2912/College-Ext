'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Award, BatteryCharging, Check, CheckCircle2, Clock3, Cpu, RotateCcw, Thermometer } from 'lucide-react';
import { esdLearningGoals, esdStages, missionOptions, type EsdStageId } from '@/lib/esd-case-study-session';

const stageIndex = (id: EsdStageId) => esdStages.findIndex(stage => stage.id === id);

export function EsdCaseStudySession() {
  const [activeStage, setActiveStage] = useState<EsdStageId>('mission');
  const [completedStages, setCompletedStages] = useState<EsdStageId[]>([]);
  const completed = useMemo(() => new Set(completedStages), [completedStages]);
  const activeIndex = stageIndex(activeStage);
  const progress = Math.round((completedStages.length / esdStages.length) * 100);
  const [stageReady, setStageReady] = useState<Record<EsdStageId, boolean>>({ mission: false, interfaces: false, timing: false, 'state-machine': false, power: false, debrief: false });
  const [missionAnswers, setMissionAnswers] = useState<string[]>([]);
  const missionCorrect = missionAnswers.length === 4 && missionOptions.filter(option => option.required).every(option => missionAnswers.includes(option.id));
  const canComplete = activeStage === 'mission' ? missionCorrect : stageReady[activeStage];

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
    setMissionAnswers([]);
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
      {activeStage === 'mission' ? <div className="esd-mission">
        <article><span className="esd-label"><AlertTriangle size={14} aria-hidden="true" /> Incident 08 · Rural outreach route</span><blockquote>“The carrier arrived warm, and the six-hour data gap means nobody can prove when the excursion began.”</blockquote><p>The unit continued showing a green status lamp after its sensor task stalled. The team needs requirements that can be tested on a bench before the next route.</p><dl><div><dt>Payload</dt><dd>120 vaccine doses</dd></div><div><dt>Expected range</dt><dd>2 °C to 8 °C</dd></div><div><dt>Route</dt><dd>14 hours off-grid</dd></div><div><dt>Battery</dt><dd>2,000 mAh</dd></div></dl></article>
        <fieldset><legend>Select the four measurable system requirements.</legend><p>Choose outcomes that remain valid even if the hardware platform changes.</p>{missionOptions.map(option => { const selected = missionAnswers.includes(option.id); return <label key={option.id} className={selected ? 'selected' : ''}><input type="checkbox" checked={selected} onChange={() => setMissionAnswers(current => selected ? current.filter(id => id !== option.id) : [...current, option.id])} /><span>{option.label}</span>{selected && (option.required ? <CheckCircle2 aria-label="Measurable requirement" /> : <AlertTriangle aria-label="Implementation assumption" />)}</label>; })}{missionAnswers.length >= 4 && <div className={`esd-feedback ${missionCorrect ? 'correct' : ''}`} role="status"><strong>{missionCorrect ? 'The mission is testable.' : 'Some choices are design assumptions.'}</strong><span>{missionCorrect ? 'Temperature, sampling, alarm latency, and runtime now give the team objective acceptance tests.' : 'Keep measurable safety outcomes; defer colour and processor selection until the workload is understood.'}</span></div>}</fieldset>
      </div> : <div className="esd-stage-placeholder"><Cpu size={26} aria-hidden="true" /><h3>{esdStages[activeIndex].shortLabel} activity</h3><p>The interactive engineering workspace is ready for this checkpoint.</p><button type="button" className="btn btn-secondary" onClick={() => setStageReady(current => ({ ...current, [activeStage]: true }))}>Mark activity ready</button></div>}
      <footer><span>{canComplete ? 'Checkpoint ready to close.' : 'Complete the engineering activity to continue.'}</span><div>{activeIndex > 0 && <button type="button" className="btn btn-secondary" onClick={() => openStage(esdStages[activeIndex - 1].id)}>Previous checkpoint</button>}<button type="button" className="btn btn-primary" disabled={!canComplete} onClick={closeStage}>{activeIndex === esdStages.length - 1 ? 'Complete case study' : 'Close checkpoint'} <ArrowRight size={15} aria-hidden="true" /></button></div></footer>
    </section>

    {completedStages.length === esdStages.length && <section className="esd-complete" aria-live="polite"><Award aria-hidden="true" /><div><small>Systems review complete</small><h2>The carrier now senses, decides, and conserves power on purpose.</h2><p>You connected every design decision to a measurable safety requirement.</p></div><button type="button" className="btn btn-secondary" onClick={resetSession}><RotateCcw size={14} aria-hidden="true" /> Run again</button></section>}
  </div>;
}
