'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Award, BatteryCharging, Check, CheckCircle2, CircuitBoard, Clock3, Cpu, GitBranch, RotateCcw, Thermometer, Timer } from 'lucide-react';
import { esdLearningGoals, esdStages, interfaceChallenges, missionOptions, powerProfiles, stateTransitions, timingTasks, type EsdStageId } from '@/lib/esd-case-study-session';

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
  const [interfaceAnswers, setInterfaceAnswers] = useState<Record<string, number>>({});
  const interfacesCorrect = interfaceChallenges.every(challenge => interfaceAnswers[challenge.id] === challenge.answer);
  const [criticalTasks, setCriticalTasks] = useState<string[]>([]);
  const timingCorrect = criticalTasks.length === 2 && ['alarm', 'sensor'].every(id => criticalTasks.includes(id));
  const [transitionOrder, setTransitionOrder] = useState<string[]>([]);
  const stateMachineCorrect = transitionOrder.length === stateTransitions.length && transitionOrder.every((id, index) => stateTransitions[index].id === id);
  const [powerProfile, setPowerProfile] = useState<string | null>(null);
  const powerCorrect = powerProfiles.find(profile => profile.id === powerProfile)?.correct === true;
  const canComplete = activeStage === 'mission' ? missionCorrect : activeStage === 'interfaces' ? interfacesCorrect : activeStage === 'timing' ? timingCorrect : activeStage === 'state-machine' ? stateMachineCorrect : activeStage === 'power' ? powerCorrect : stageReady[activeStage];

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
    setInterfaceAnswers({});
    setCriticalTasks([]);
    setTransitionOrder([]);
    setPowerProfile(null);
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

    <section id="esd-case-workspace" className={`esd-workspace esd-stage-${activeStage}`} aria-labelledby="esd-stage-title">
      <header><div><span>Checkpoint {activeIndex + 1} of {esdStages.length}</span><h2 id="esd-stage-title">{esdStages[activeIndex].label}</h2></div><p>{esdStages[activeIndex].description}</p></header>
      {activeStage === 'mission' ? <div className="esd-mission">
        <article><span className="esd-label"><AlertTriangle size={14} aria-hidden="true" /> Incident 08 · Rural outreach route</span><blockquote>“The carrier arrived warm, and the six-hour data gap means nobody can prove when the excursion began.”</blockquote><p>The unit continued showing a green status lamp after its sensor task stalled. The team needs requirements that can be tested on a bench before the next route.</p><dl><div><dt>Payload</dt><dd>120 vaccine doses</dd></div><div><dt>Expected range</dt><dd>2 °C to 8 °C</dd></div><div><dt>Route</dt><dd>14 hours off-grid</dd></div><div><dt>Battery</dt><dd>2,000 mAh</dd></div></dl></article>
        <fieldset><legend>Select the four measurable system requirements.</legend><p>Choose outcomes that remain valid even if the hardware platform changes.</p>{missionOptions.map(option => { const selected = missionAnswers.includes(option.id); return <label key={option.id} className={selected ? 'selected' : ''}><input type="checkbox" checked={selected} onChange={() => setMissionAnswers(current => selected ? current.filter(id => id !== option.id) : [...current, option.id])} /><span>{option.label}</span>{selected && (option.required ? <CheckCircle2 aria-label="Measurable requirement" /> : <AlertTriangle aria-label="Implementation assumption" />)}</label>; })}{missionAnswers.length >= 4 && <div className={`esd-feedback ${missionCorrect ? 'correct' : ''}`} role="status"><strong>{missionCorrect ? 'The mission is testable.' : 'Some choices are design assumptions.'}</strong><span>{missionCorrect ? 'Temperature, sampling, alarm latency, and runtime now give the team objective acceptance tests.' : 'Keep measurable safety outcomes; defer colour and processor selection until the workload is understood.'}</span></div>}</fieldset>
      </div> : activeStage === 'interfaces' ? <div className="esd-interfaces"><aside><span className="esd-label"><CircuitBoard size={14} aria-hidden="true" /> Peripheral map</span><h3>Give every signal a suitable path.</h3><p>Select an interface for each device. Use the electrical and data clues—not habit—to decide.</p><div className="esd-board-map"><span>MCU</span>{interfaceChallenges.map(challenge => <div key={challenge.id}><i /><strong>{challenge.device}</strong><small>{interfaceAnswers[challenge.id] === undefined ? 'unassigned' : challenge.options[interfaceAnswers[challenge.id]]}</small></div>)}</div></aside><div className="esd-interface-cards">{interfaceChallenges.map((challenge, challengeIndex) => { const answer = interfaceAnswers[challenge.id]; return <fieldset key={challenge.id}><legend><span>{challengeIndex + 1}</span>{challenge.device}</legend><p>{challenge.clue}</p><div>{challenge.options.map((option, optionIndex) => <button key={option} type="button" className={answer !== undefined && optionIndex === challenge.answer ? 'correct' : answer === optionIndex ? 'wrong' : ''} disabled={answer !== undefined} onClick={() => setInterfaceAnswers(current => ({ ...current, [challenge.id]: optionIndex }))}>{option}</button>)}</div>{answer !== undefined && <div className={`esd-feedback ${answer === challenge.answer ? 'correct' : ''}`} role="status"><strong>{answer === challenge.answer ? 'Interface matched.' : 'Revisit the signal clue.'}</strong><span>{challenge.explanation}</span></div>}</fieldset>; })}</div></div> : activeStage === 'timing' ? <div className="esd-timing"><div><span className="esd-label"><Timer size={14} aria-hidden="true" /> Deadline audit</span><h3>Which work may never be late?</h3><p>Select exactly two safety-critical tasks. Then compare their deadlines, worst-case execution times, and assigned priorities.</p><div className="esd-utilisation"><strong>4.8%</strong><span>estimated peak CPU utilisation</span><small>There is capacity—but priority still decides what runs first.</small></div></div><div className="esd-task-table" role="group" aria-label="Select safety-critical real-time tasks">{timingTasks.map(task => { const selected = criticalTasks.includes(task.id); return <label key={task.id} className={selected ? 'selected' : ''}><input type="checkbox" checked={selected} onChange={() => setCriticalTasks(current => selected ? current.filter(id => id !== task.id) : [...current, task.id])} /><span><strong>{task.name}</strong><small>{task.period}</small></span><span><small>Deadline</small><strong>{task.deadlineMs} ms</strong></span><span><small>WCET</small><strong>{task.executionMs} ms</strong></span><b>{task.priority}</b></label>; })}{criticalTasks.length >= 2 && <div className={`esd-feedback ${timingCorrect ? 'correct' : ''}`} role="status"><strong>{timingCorrect ? 'Safety path protected.' : 'Priority must follow consequence.'}</strong><span>{timingCorrect ? 'Alarm assertion and sensing directly protect the safety requirement; logging and display work can yield when necessary.' : 'Choose tasks whose missed deadline could hide or delay a temperature breach.'}</span></div>}</div></div> : activeStage === 'state-machine' ? <div className="esd-states"><aside><span className="esd-label"><GitBranch size={14} aria-hidden="true" /> Control path</span><h3>Make every transition explainable.</h3><p>Select transitions in the order the carrier experiences them: startup, detected breach, stable recovery, and acknowledgement.</p><button type="button" onClick={() => setTransitionOrder([])}><RotateCcw size={13} aria-hidden="true" /> Clear path</button></aside><div className="esd-state-builder"><section><span>Available transitions</span>{['alarm-safe','boot-selftest','recovery-ack','monitor-breach'].map(id => stateTransitions.find(item => item.id === id)!).map(item => <button type="button" key={item.id} disabled={transitionOrder.includes(item.id)} onClick={() => setTransitionOrder(current => [...current, item.id])}><strong>{item.from} → {item.to}</strong><small>{item.event}</small></button>)}</section><section><span>Executed path</span><ol>{transitionOrder.map((id, index) => { const item = stateTransitions.find(transition => transition.id === id)!; return <li key={id}><button type="button" onClick={() => setTransitionOrder(current => current.filter(value => value !== id))}><b>{index + 1}</b><span><strong>{item.from} → {item.to}</strong><small>{item.event}</small></span></button></li>; })}</ol>{transitionOrder.length === 0 && <p>No transitions placed yet.</p>}</section>{transitionOrder.length === stateTransitions.length && <div className={`esd-feedback ${stateMachineCorrect ? 'correct' : ''}`} role="status"><strong>{stateMachineCorrect ? 'The controller is deterministic.' : 'The path cannot execute in this order.'}</strong><span>{stateMachineCorrect ? 'Every event has one explicit destination, with confirmation counts preventing noisy threshold chatter.' : 'Start from BOOT, enter monitoring, respond to a confirmed breach, then recover and acknowledge.'}</span></div>}</div></div> : <div className="esd-stage-placeholder"><Cpu size={26} aria-hidden="true" /><h3>{esdStages[activeIndex].shortLabel} activity</h3><p>The interactive engineering workspace is ready for this checkpoint.</p><button type="button" className="btn btn-secondary" onClick={() => setStageReady(current => ({ ...current, [activeStage]: true }))}>Mark activity ready</button></div>}
      {activeStage === 'power' && <div className="esd-power"><div><span className="esd-label"><BatteryCharging size={14} aria-hidden="true" /> Energy budget</span><h3>Runtime is a design output.</h3><p>The carrier uses a 2,000 mAh battery. Compare measured firmware profiles and choose the one that satisfies every requirement with useful reserve.</p><div className="esd-power-equation"><code>runtime = capacity ÷ average current</code><small>Estimates shown before temperature and ageing derating.</small></div></div><fieldset><legend>Choose the deployable power profile.</legend>{powerProfiles.map(profile => <label key={profile.id} className={powerProfile === profile.id ? 'selected' : ''}><input type="radio" name="power-profile" checked={powerProfile === profile.id} onChange={() => setPowerProfile(profile.id)} /><span><strong>{profile.name}</strong><small>{profile.note}</small></span><span><b>{profile.averageMa} mA</b><strong>{profile.runtimeHours} h</strong></span></label>)}{powerProfile && <div className={`esd-feedback ${powerCorrect ? 'correct' : ''}`} role="status"><strong>{powerCorrect ? 'Requirements met with reserve.' : 'This profile is not deployable.'}</strong><span>{powerCorrect ? 'Timed sampling and sleep preserve the two-second deadline while leaving more than a full day of estimated reserve.' : powerProfiles.find(profile => profile.id === powerProfile)?.note}</span></div>}</fieldset></div>}
      <footer><span>{canComplete ? 'Checkpoint ready to close.' : 'Complete the engineering activity to continue.'}</span><div>{activeIndex > 0 && <button type="button" className="btn btn-secondary" onClick={() => openStage(esdStages[activeIndex - 1].id)}>Previous checkpoint</button>}<button type="button" className="btn btn-primary" disabled={!canComplete} onClick={closeStage}>{activeIndex === esdStages.length - 1 ? 'Complete case study' : 'Close checkpoint'} <ArrowRight size={15} aria-hidden="true" /></button></div></footer>
    </section>

    {completedStages.length === esdStages.length && <section className="esd-complete" aria-live="polite"><Award aria-hidden="true" /><div><small>Systems review complete</small><h2>The carrier now senses, decides, and conserves power on purpose.</h2><p>You connected every design decision to a measurable safety requirement.</p></div><button type="button" className="btn btn-secondary" onClick={resetSession}><RotateCcw size={14} aria-hidden="true" /> Run again</button></section>}
  </div>;
}
