'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpenCheck,
  BrainCircuit,
  Braces,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Component,
  GitBranch,
  ListOrdered,
  LockKeyhole,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  oopjLearningGoals,
  oopjStages,
  modelCandidates,
  dispatchTraces,
  exceptionSteps,
  concurrencyFixes,
  unsafeThreadEvents,
  oopjQuestions,
  type OopjStage,
} from '@/lib/oopj-case-study-session';

const getStageIndex = (stage: OopjStage['id']) => oopjStages.findIndex(item => item.id === stage);

export function OopjCaseStudySession() {
  const [activeStage, setActiveStage] = useState<OopjStage['id']>('brief');
  const [completedStages, setCompletedStages] = useState<OopjStage['id'][]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState(0);
  const [inspectedModels, setInspectedModels] = useState<number[]>([0]);
  const [invariantOwner, setInvariantOwner] = useState<string | null>(null);
  const [dispatchIndex, setDispatchIndex] = useState(0);
  const [dispatchAnswers, setDispatchAnswers] = useState<Record<string, number>>({});
  const [exceptionOrder, setExceptionOrder] = useState<string[]>([]);
  const [threadStep, setThreadStep] = useState(0);
  const [concurrencyFix, setConcurrencyFix] = useState<string | null>(null);
  const [debriefIndex, setDebriefIndex] = useState(0);
  const [debriefAnswers, setDebriefAnswers] = useState<Record<string, number>>({});

  const activeIndex = getStageIndex(activeStage);
  const activeStageData = oopjStages[activeIndex];
  const completed = useMemo(() => new Set(completedStages), [completedStages]);
  const progress = Math.round((completedStages.length / oopjStages.length) * 100);
  const requirementsCorrect = selectedRequirements.length === 4 && ['identity', 'limits', 'atomic', 'failure'].every(id => selectedRequirements.includes(id));
  const exceptionCorrect = exceptionOrder.length === exceptionSteps.length && exceptionOrder.every((id, index) => exceptionSteps.find(step => step.id === id)?.correctOrder === index);
  const concurrencyCorrect = threadStep === unsafeThreadEvents.length && concurrencyFixes.find(fix => fix.id === concurrencyFix)?.correct === true;
  const canComplete = activeStage === 'brief' ? requirementsCorrect
    : activeStage === 'model' ? inspectedModels.length === modelCandidates.length && invariantOwner === 'book-copy'
    : activeStage === 'dispatch' ? Object.keys(dispatchAnswers).length === dispatchTraces.length
    : activeStage === 'resilience' ? exceptionCorrect
    : activeStage === 'concurrency' ? concurrencyCorrect
    : Object.keys(debriefAnswers).length === oopjQuestions.length;
  const debriefScore = oopjQuestions.filter(question => debriefAnswers[question.id] === question.answer).length;

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
    setSelectedRequirements([]);
    setSelectedModel(0);
    setInspectedModels([0]);
    setInvariantOwner(null);
    setDispatchIndex(0);
    setDispatchAnswers({});
    setExceptionOrder([]);
    setThreadStep(0);
    setConcurrencyFix(null);
    setDebriefIndex(0);
    setDebriefAnswers({});
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
      {activeStage === 'brief' && <div className="oopj-case-briefing">
        <article>
          <span className="oopj-case-label"><AlertTriangle size={14} aria-hidden="true" /> Service report · Exam week</span>
          <blockquote>“Two issue desks approved the same last copy. One student left with a receipt; the other left with a loan record but no book.”</blockquote>
          <p>The existing program stores most fields as public data and lets each screen update availability independently. Your team must redesign the flow without closing the library.</p>
          <dl><div><dt>Actors</dt><dd>Students, faculty, librarians</dd></div><div><dt>Scale</dt><dd>2,400 members · 18,000 copies</dd></div><div><dt>Failure</dt><dd>Duplicate issue of barcode BK-204</dd></div><div><dt>Audit need</dt><dd>Every loan outcome must be explainable</dd></div></dl>
        </article>
        <fieldset>
          <legend>Select the four domain requirements.</legend>
          <p>Separate what the system must guarantee from premature implementation choices.</p>
          {[
            ['identity', 'Each physical copy has one stable barcode.', true],
            ['limits', 'Borrowing limits vary by member type.', true],
            ['atomic', 'A copy cannot be issued to two members.', true],
            ['failure', 'An unavailable copy produces a precise recoverable failure.', true],
            ['color', 'The issue button must be teal.', false],
            ['arrays', 'All records must be stored in one public array.', false],
          ].map(([id, label, required]) => {
            const selected = selectedRequirements.includes(String(id));
            return <label key={String(id)} className={selected ? 'selected' : ''}>
              <input type="checkbox" checked={selected} onChange={() => setSelectedRequirements(current => selected ? current.filter(item => item !== String(id)) : [...current, String(id)])} />
              <span>{label}</span>
              {selected && (required ? <CheckCircle2 aria-label="Domain requirement" /> : <AlertTriangle aria-label="Implementation detail" />)}
            </label>;
          })}
          {selectedRequirements.length >= 4 && <div className={['identity', 'limits', 'atomic', 'failure'].every(id => selectedRequirements.includes(id)) && selectedRequirements.length === 4 ? 'oopj-case-feedback correct' : 'oopj-case-feedback'} role="status"><strong>{['identity', 'limits', 'atomic', 'failure'].every(id => selectedRequirements.includes(id)) && selectedRequirements.length === 4 ? 'The domain boundary is clear.' : 'Mixing design choices with requirements.'}</strong><span>{['identity', 'limits', 'atomic', 'failure'].every(id => selectedRequirements.includes(id)) && selectedRequirements.length === 4 ? 'These four statements describe identities, policies, invariants, and failure behaviour without dictating the interface or storage structure.' : 'Keep statements that remain true even if the interface colour or persistence technology changes.'}</span></div>}
        </fieldset>
      </div>}
      {activeStage === 'model' && <div className="oopj-case-model">
        <div className="oopj-model-browser">
          <div><span className="oopj-case-label"><Component size={14} aria-hidden="true" /> Responsibility map</span><strong>{inspectedModels.length} / {modelCandidates.length} inspected</strong></div>
          <div>{modelCandidates.map((candidate, index) => <button key={candidate.id} type="button" className={selectedModel === index ? 'active' : ''} aria-pressed={selectedModel === index} onClick={() => { setSelectedModel(index); setInspectedModels(current => current.includes(index) ? current : [...current, index]); }}><span>{candidate.kind}</span><strong>{candidate.name}</strong><small>{candidate.responsibility}</small></button>)}</div>
        </div>
        <article className="oopj-model-detail" aria-live="polite">
          <div><span>{modelCandidates[selectedModel].kind}</span><code>{modelCandidates[selectedModel].name}.java</code></div>
          <h3>{modelCandidates[selectedModel].name}</h3>
          <p>{modelCandidates[selectedModel].responsibility}</p>
          <section><strong>Owns</strong><ul>{modelCandidates[selectedModel].owns.map(item => <li key={item}><Check size={13} aria-hidden="true" />{item}</li>)}</ul></section>
          <section className="avoid"><strong>Keep outside</strong><p>{modelCandidates[selectedModel].shouldNotOwn}</p></section>
        </article>
        <fieldset className="oopj-model-decision">
          <legend>Which object should protect the rule “an unavailable copy cannot be issued”?</legend>
          <p>Choose the class that owns the state needed to enforce the invariant.</p>
          {[['circulation', 'CirculationService'], ['book-copy', 'BookCopy'], ['repository', 'LoanRepository']].map(([id, label]) => <label key={id} className={invariantOwner === id ? 'selected' : ''}><input type="radio" name="invariant-owner" checked={invariantOwner === id} onChange={() => setInvariantOwner(id)} /><span>{label}</span></label>)}
          {invariantOwner && <div className={invariantOwner === 'book-copy' ? 'oopj-case-feedback correct' : 'oopj-case-feedback'} role="status"><strong>{invariantOwner === 'book-copy' ? 'Cohesive ownership.' : 'Coordination is not ownership.'}</strong><span>{invariantOwner === 'book-copy' ? 'BookCopy owns availability, so its checkout() method can reject invalid transitions. The service coordinates the use case without exposing the field.' : 'The service or repository can call the operation, but BookCopy has the state and must defend its own invariant.'}</span></div>}
        </fieldset>
      </div>}
      {activeStage === 'dispatch' && <div className="oopj-case-dispatch">
        <aside>
          <span className="oopj-case-label"><GitBranch size={14} aria-hidden="true" /> Runtime trace</span>
          <h3>One reference type, three runtime objects.</h3>
          <p>Predict the return value before revealing how dynamic method dispatch resolves the call.</p>
          <div>{dispatchTraces.map((trace, index) => <button key={trace.id} type="button" className={dispatchIndex === index ? 'active' : ''} onClick={() => setDispatchIndex(index)}><span>{dispatchAnswers[trace.id] === undefined ? index + 1 : <Check size={13} aria-hidden="true" />}</span><span><strong>{trace.runtimeType.match(/new (\w+)/)?.[1]}</strong><small>{trace.call}</small></span></button>)}</div>
        </aside>
        <div className="oopj-dispatch-console">
          <div className="oopj-code-window"><div><span /><span /><span /><small>DispatchLab.java</small></div><pre><code><i>Member</i> borrower = {dispatchTraces[dispatchIndex].runtimeType};{`\n`}int limit = borrower.<b>getLoanLimit()</b>;</code></pre><dl><div><dt>Declared type</dt><dd>{dispatchTraces[dispatchIndex].declaration}</dd></div><div><dt>Method call</dt><dd>{dispatchTraces[dispatchIndex].call}</dd></div></dl></div>
          <fieldset>
            <legend>What does <code>limit</code> receive?</legend>
            {['2 books', '4 books', '10 books', 'Compile-time error'].map((option, index) => {
              const answer = dispatchAnswers[dispatchTraces[dispatchIndex].id];
              const correctIndex = [1, 2, 0][dispatchIndex];
              const state = answer !== undefined && index === correctIndex ? 'correct' : answer === index ? 'wrong' : '';
              return <button key={option} type="button" className={state} disabled={answer !== undefined} onClick={() => setDispatchAnswers(current => ({ ...current, [dispatchTraces[dispatchIndex].id]: index }))}><span>{String.fromCharCode(65 + index)}</span>{option}</button>;
            })}
          </fieldset>
          {dispatchAnswers[dispatchTraces[dispatchIndex].id] !== undefined && <div className={dispatchAnswers[dispatchTraces[dispatchIndex].id] === [1, 2, 0][dispatchIndex] ? 'oopj-case-feedback correct' : 'oopj-case-feedback'} role="status"><strong>{dispatchAnswers[dispatchTraces[dispatchIndex].id] === [1, 2, 0][dispatchIndex] ? dispatchTraces[dispatchIndex].result : 'Follow the runtime object.'}</strong><span>{dispatchTraces[dispatchIndex].explanation}</span></div>}
        </div>
      </div>}
      {activeStage === 'resilience' && <div className="oopj-case-resilience">
        <div className="oopj-resilience-intro">
          <span className="oopj-case-label"><ListOrdered size={14} aria-hidden="true" /> Exception pipeline</span>
          <h3>Rebuild the unavailable-copy path.</h3>
          <p>Select each step in execution order. The goal is a precise domain failure, a useful boundary message, and guaranteed resource cleanup.</p>
          <div><strong>{exceptionOrder.length} / {exceptionSteps.length}</strong><span>steps placed</span></div>
        </div>
        <div className="oopj-resilience-board">
          <section><span>Available steps</span><div>{['cleanup', 'lookup', 'throw', 'validate', 'handle'].map(id => exceptionSteps.find(step => step.id === id)!).map(step => <button key={step.id} type="button" disabled={exceptionOrder.includes(step.id)} onClick={() => setExceptionOrder(current => [...current, step.id])}><strong>{step.label}</strong><small>{step.detail}</small></button>)}</div></section>
          <section><span>Execution path</span><ol>{exceptionOrder.map((id, index) => { const step = exceptionSteps.find(item => item.id === id)!; return <li key={id}><button type="button" onClick={() => setExceptionOrder(current => current.filter(item => item !== id))} aria-label={`Remove ${step.label} from position ${index + 1}`}><b>{index + 1}</b><span><strong>{step.label}</strong><small>{step.detail}</small></span></button></li>; })}</ol>{exceptionOrder.length === 0 && <p>Select a step to begin building the path.</p>}</section>
        </div>
        {exceptionOrder.length === exceptionSteps.length && <div className={exceptionOrder.every((id, index) => exceptionSteps.find(step => step.id === id)?.correctOrder === index) ? 'oopj-case-feedback correct' : 'oopj-case-feedback'} role="status"><strong>{exceptionOrder.every((id, index) => exceptionSteps.find(step => step.id === id)?.correctOrder === index) ? 'Failure path is explicit and safe.' : 'The execution order can leak intent or resources.'}</strong><span>{exceptionOrder.every((id, index) => exceptionSteps.find(step => step.id === id)?.correctOrder === index) ? 'Lookup precedes validation, the domain throws precisely, the boundary translates the error, and resource cleanup runs on every path.' : 'Begin with lookup, validate before mutation, throw from the domain, translate at the boundary, and guarantee cleanup.'}</span><button type="button" onClick={() => setExceptionOrder([])}>Rebuild order</button></div>}
      </div>}
      {activeStage === 'concurrency' && <div className="oopj-case-concurrency">
        <div className="oopj-thread-stage">
          <div className="oopj-thread-heading"><span className="oopj-case-label"><Play size={14} aria-hidden="true" /> Unsafe interleaving</span><div><button type="button" onClick={() => { setThreadStep(0); setConcurrencyFix(null); }}><RotateCcw size={13} aria-hidden="true" /> Reset trace</button><button type="button" disabled={threadStep === unsafeThreadEvents.length} onClick={() => setThreadStep(step => Math.min(step + 1, unsafeThreadEvents.length))}>{threadStep === 0 ? 'Run first event' : 'Run next event'} <ArrowRight size={13} aria-hidden="true" /></button></div></div>
          <div className="oopj-shared-state"><span>shared field</span><code>availableCopies = {threadStep === 0 ? 1 : unsafeThreadEvents[threadStep - 1].sharedCopies}</code><strong className={threadStep === unsafeThreadEvents.length ? 'danger' : ''}>{threadStep === unsafeThreadEvents.length ? 'Invariant broken' : 'Trace running'}</strong></div>
          <div className="oopj-thread-lanes">{(['Desk A', 'Desk B'] as const).map(desk => <section key={desk}><header><span>{desk}</span><small>issueBook("BK-204")</small></header><ol>{unsafeThreadEvents.map((event, index) => event.desk === desk ? <li key={event.id} className={threadStep > index ? 'visible' : ''}><b>{index + 1}</b><span><strong>{event.action}</strong><small>{event.risk}</small></span></li> : null)}</ol></section>)}</div>
        </div>
        <fieldset className="oopj-concurrency-fix"><legend><LockKeyhole size={18} aria-hidden="true" /> Choose the minimal correct repair</legend><p>Protect the invariant without relying on timing.</p><div>{concurrencyFixes.map(fix => <label key={fix.id} className={concurrencyFix === fix.id ? 'selected' : ''}><input type="radio" name="concurrency-fix" checked={concurrencyFix === fix.id} onChange={() => setConcurrencyFix(fix.id)} /><span><strong>{fix.title}</strong><small>{fix.detail}</small></span></label>)}</div>{concurrencyFix && <div className={concurrencyFixes.find(fix => fix.id === concurrencyFix)?.correct ? 'oopj-case-feedback correct' : 'oopj-case-feedback'} role="status"><strong>{concurrencyFixes.find(fix => fix.id === concurrencyFix)?.correct ? 'The critical section is protected.' : 'The race can still occur.'}</strong><span>{concurrencyFixes.find(fix => fix.id === concurrencyFix)?.detail}</span></div>}</fieldset>
      </div>}
      {activeStage === 'debrief' && <div className="oopj-case-debrief">
        <aside><span className="oopj-case-label"><BrainCircuit size={14} aria-hidden="true" /> Architecture review</span><h3>Defend the design</h3><p>Explain why the repaired system is easier to extend, test, and trust.</p><ol>{oopjQuestions.map((question, index) => <li key={question.id} className={debriefIndex === index ? 'active' : ''}><button type="button" onClick={() => setDebriefIndex(index)} aria-label={`Open OOPJ debrief question ${index + 1}`}><span>{debriefAnswers[question.id] === undefined ? index + 1 : debriefAnswers[question.id] === question.answer ? <Check size={13} aria-hidden="true" /> : '!'}</span><small>Q{index + 1}</small></button></li>)}</ol></aside>
        <div className="oopj-debrief-question"><span>Question {debriefIndex + 1} of {oopjQuestions.length}</span><h3>{oopjQuestions[debriefIndex].prompt}</h3><div>{oopjQuestions[debriefIndex].options.map((option, index) => { const answer = debriefAnswers[oopjQuestions[debriefIndex].id]; const answered = answer !== undefined; const state = answered && index === oopjQuestions[debriefIndex].answer ? 'correct' : answered && index === answer ? 'wrong' : ''; return <button key={option} type="button" className={state} disabled={answered} onClick={() => setDebriefAnswers(current => ({ ...current, [oopjQuestions[debriefIndex].id]: index }))}><span>{String.fromCharCode(65 + index)}</span>{option}</button>; })}</div>{debriefAnswers[oopjQuestions[debriefIndex].id] !== undefined && <div className={debriefAnswers[oopjQuestions[debriefIndex].id] === oopjQuestions[debriefIndex].answer ? 'oopj-case-feedback correct' : 'oopj-case-feedback'} role="status"><strong>{debriefAnswers[oopjQuestions[debriefIndex].id] === oopjQuestions[debriefIndex].answer ? 'Correct design reasoning.' : 'Review the responsibility boundary.'}</strong><span>{oopjQuestions[debriefIndex].explanation}</span></div>}<footer><button type="button" className="btn btn-secondary" disabled={debriefIndex === 0} onClick={() => setDebriefIndex(index => index - 1)}>Previous</button><button type="button" className="btn btn-secondary" disabled={debriefIndex === oopjQuestions.length - 1} onClick={() => setDebriefIndex(index => index + 1)}>Next question</button></footer></div>
      </div>}
      <footer><span>{canComplete ? 'Checkpoint ready to close.' : activeStage === 'model' && inspectedModels.length < modelCandidates.length ? `Inspect ${modelCandidates.length - inspectedModels.length} more classes.` : 'Complete the activity above to continue.'}</span><div>{activeIndex > 0 && <button type="button" className="btn btn-secondary" onClick={() => openStage(oopjStages[activeIndex - 1].id)}>Previous checkpoint</button>}<button type="button" className="btn btn-primary" disabled={!canComplete} onClick={() => completeStage(activeStage, oopjStages[activeIndex + 1]?.id)}>{activeIndex === oopjStages.length - 1 ? 'Complete case study' : 'Close checkpoint'} <ArrowRight size={15} aria-hidden="true" /></button></div></footer>
    </section>
    {completedStages.length === oopjStages.length && <section className="oopj-case-complete" aria-live="polite"><span><Award size={28} aria-hidden="true" /></span><div><small>Design review complete</small><h2>The last copy is safe—and the model explains why.</h2><p>You separated responsibilities, traced dispatch, repaired failure handling, protected shared state, and scored <strong>{debriefScore} / {oopjQuestions.length}</strong> in the architecture review.</p></div><div><a className="btn btn-primary" href="/learn?course=object-oriented-programming-using-java&module=oopj-unit-1">Practise OOPJ questions</a><button type="button" className="btn btn-secondary" onClick={resetSession}><RotateCcw size={14} aria-hidden="true" /> Run again</button></div></section>}
  </div>;
}
