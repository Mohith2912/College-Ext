'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Laptop,
  Network,
  Radio,
  RotateCcw,
  Router,
  Server,
  ShieldAlert,
} from 'lucide-react';
import {
  caseStages,
  evidenceItems,
  learningGoals,
  networkHops,
  type CaseStage,
} from '@/lib/cn-case-study-session';

const stageIndex = (stage: CaseStage['id']) => caseStages.findIndex(item => item.id === stage);

export function CnCaseStudySession() {
  const [activeStage, setActiveStage] = useState<CaseStage['id']>('brief');
  const [completedStages, setCompletedStages] = useState<CaseStage['id'][]>([]);
  const [briefAnswer, setBriefAnswer] = useState<string | null>(null);
  const [selectedHop, setSelectedHop] = useState(0);
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);

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
    setBriefAnswer(null);
    setSelectedHop(0);
    setSelectedEvidence([]);
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
      {activeStage === 'brief' && <div className="cn-case-briefing">
        <div className="cn-case-briefing__story">
          <span className="cn-case-label"><AlertCircle size={14} aria-hidden="true" /> Dispatch note · 10:12 IST</span>
          <blockquote>“Wi-Fi shows connected, but the lecture stream pauses every 20–30 seconds in North Hall. Slides and chat still load.”</blockquote>
          <p>The report describes what people experience, not where the failure is. Before changing the network, establish the scope and convert the report into testable statements.</p>
          <dl>
            <div><dt>Affected</dt><dd>North Hall viewers on VLAN 24</dd></div>
            <div><dt>Unaffected</dt><dd>Recorded slides, text chat, other buildings</dd></div>
            <div><dt>Recent change</dt><dd>Traffic policy updated at 09:40</dd></div>
            <div><dt>Constraint</dt><dd>Do not interrupt the live lecture</dd></div>
          </dl>
        </div>
        <fieldset className="cn-case-prompt">
          <legend>Which is the best initial problem statement?</legend>
          <p>Choose the statement that is specific, observable, and does not assume a cause.</p>
          {[
            ['wifi', 'North Hall Wi-Fi is broken.'],
            ['provider', 'The media provider is overloaded.'],
            ['observable', 'Viewers on VLAN 24 can connect, but sustained video delivery stalls while lighter services continue.'],
          ].map(([value, label]) => <label key={value} className={briefAnswer === value ? 'selected' : ''}>
            <input type="radio" name="brief-answer" value={value} checked={briefAnswer === value} onChange={() => setBriefAnswer(value)} />
            <span>{label}</span>
            {briefAnswer === value && (value === 'observable' ? <CheckCircle2 aria-label="Strong problem statement" /> : <AlertCircle aria-label="This statement assumes a cause" />)}
          </label>)}
          {briefAnswer && <div className={briefAnswer === 'observable' ? 'cn-case-feedback correct' : 'cn-case-feedback'} role="status">
            <strong>{briefAnswer === 'observable' ? 'Strong framing.' : 'That jumps to a cause.'}</strong>
            <span>{briefAnswer === 'observable' ? 'It defines who, what, and the boundary between working and failing traffic without diagnosing too early.' : 'Keep the observed impact separate from a hypothesis until measurements support it.'}</span>
          </div>}
        </fieldset>
      </div>}
      {activeStage === 'path' && <div className="cn-case-path">
        <div className="cn-case-path__map" aria-label="Packet path from lecture laptop to media service">
          {networkHops.map((hop, index) => {
            const Icon = [Laptop, Radio, Network, Router, Server][index];
            return <button key={hop.id} type="button" className={selectedHop === index ? 'active' : ''} aria-pressed={selectedHop === index} onClick={() => setSelectedHop(index)}>
              <span className={`cn-hop-icon ${hop.status}`}><Icon size={19} aria-hidden="true" /></span>
              <span><small>Hop {index + 1}</small><strong>{hop.name}</strong><em>{hop.role}</em></span>
              {index < networkHops.length - 1 && <i aria-hidden="true" />}
            </button>;
          })}
        </div>
        <article className="cn-case-path__detail" aria-live="polite">
          <div className="cn-case-detail-heading"><span>{networkHops[selectedHop].layer}</span><small className={networkHops[selectedHop].status}>{networkHops[selectedHop].status}</small></div>
          <h3>{networkHops[selectedHop].name}</h3>
          <p>{networkHops[selectedHop].observation}</p>
          <dl><div><dt>Identity</dt><dd>{networkHops[selectedHop].address}</dd></div><div><dt>Responsibility</dt><dd>{networkHops[selectedHop].role}</dd></div></dl>
          <div className="cn-case-coach"><strong>Investigator note</strong><span>{networkHops[selectedHop].status === 'warning' ? 'This point deserves a targeted measurement. A warning is a lead, not yet a root cause.' : 'Healthy evidence at this boundary helps shrink the search area. Do not ignore what is working.'}</span></div>
        </article>
      </div>}
      {activeStage === 'evidence' && <div className="cn-case-evidence">
        <div className="cn-case-evidence__intro">
          <span className="cn-case-label"><ClipboardList size={14} aria-hidden="true" /> Evidence board</span>
          <h3>Choose the three readings that most sharply narrow the fault domain.</h3>
          <p>Useful evidence discriminates between competing explanations. Select exactly three items; you can revise your set.</p>
          <div><span>{selectedEvidence.length} / 3 selected</span><i><b style={{ width: `${selectedEvidence.length / 3 * 100}%` }} /></i></div>
        </div>
        <div className="cn-case-evidence__grid">
          {evidenceItems.map(item => {
            const selected = selectedEvidence.includes(item.id);
            const disabled = !selected && selectedEvidence.length === 3;
            return <button key={item.id} type="button" className={selected ? 'selected' : ''} aria-pressed={selected} disabled={disabled} onClick={() => setSelectedEvidence(current => selected ? current.filter(id => id !== item.id) : [...current, item.id])}>
              <span><small>{item.source}</small>{selected && <Check size={14} aria-hidden="true" />}</span>
              <strong>{item.reading}</strong>
              <p>{item.interpretation}</p>
            </button>;
          })}
        </div>
        {selectedEvidence.length === 3 && <div className={selectedEvidence.every(id => evidenceItems.find(item => item.id === id)?.relevance === 'high') ? 'cn-case-feedback correct' : 'cn-case-feedback'} role="status">
          <strong>{selectedEvidence.every(id => evidenceItems.find(item => item.id === id)?.relevance === 'high') ? 'High-value evidence set.' : 'Your set contains a weaker discriminator.'}</strong>
          <span>{selectedEvidence.every(id => evidenceItems.find(item => item.id === id)?.relevance === 'high') ? 'Together, the gateway probe, queue telemetry, and external control isolate a reachable but impaired campus path.' : 'Look for readings that compare paths or directly measure the observed sustained-delivery failure.'}</span>
        </div>}
      </div>}
      {!['brief', 'path', 'evidence'].includes(activeStage) && <div className="cn-case-placeholder">Interactive checkpoint content</div>}
      <footer><button className="btn btn-primary" onClick={() => completeStage(activeStage, caseStages[activeIndex + 1]?.id)}>Mark checkpoint complete <ArrowRight size={15} aria-hidden="true" /></button></footer>
    </section>
  </div>;
}
