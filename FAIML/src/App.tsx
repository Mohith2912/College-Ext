import { useMemo, useState } from 'react';
import { ArrowRight, BrainCircuit, Check, CircleHelp, FlaskConical, GitBranch, Layers3, Map, RotateCcw, Search, Sparkles, Target, Workflow, X } from 'lucide-react';

type UnitId = 1 | 2 | 3 | 4 | 5;
type Tab = 'map' | 'labs' | 'pipeline' | 'practice';

const units = [
  { id: 1 as UnitId, title: 'Introduction to AI', short: 'AI foundations and search', color: 'violet', focus: 'Agents, problem formulation, BFS, DFS, UCS, A*, heuristics, CSPs, and game playing.' },
  { id: 2 as UnitId, title: 'Knowledge Representation', short: 'Logic and reasoning', color: 'cyan', focus: 'Logic, semantic networks, frames, production rules, expert systems, and uncertainty.' },
  { id: 3 as UnitId, title: 'Introduction to Machine Learning', short: 'Learning foundations', color: 'amber', focus: 'Learning types, preprocessing, regression, classification, overfitting, and generalization.' },
  { id: 4 as UnitId, title: 'Unsupervised Learning', short: 'Patterns without labels', color: 'rose', focus: 'Clustering, K-means, hierarchical learning, distance, and dimensionality reduction.' },
  { id: 5 as UnitId, title: 'Applied ML and Evaluation', short: 'Build and evaluate', color: 'blue', focus: 'Pipelines, feature selection, cross-validation, metrics, Grid Search, and responsible deployment.' },
];

const questions = [
  ['What does an intelligent agent use to perceive and act?', 'Sensors perceive the environment and actuators carry out actions.'],
  ['What is the A* evaluation function?', 'f(n) = g(n) + h(n), combining path cost and a heuristic estimate.'],
  ['Why is a test set needed?', 'It estimates how well a trained model generalizes to unseen examples.'],
  ['What does clustering discover?', 'Useful structure or groups in data without target labels.'],
  ['When is recall especially important?', 'When missing a positive case is more costly than raising extra alerts.'],
];

function initialUnit(): UnitId { const value = Number(new URLSearchParams(window.location.search).get('unit')); return value >= 1 && value <= 5 ? value as UnitId : 1; }

export default function App() {
  const locked = Boolean(new URLSearchParams(window.location.search).get('unit'));
  const [unit, setUnit] = useState<UnitId>(initialUnit);
  const [tab, setTab] = useState<Tab>('map');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const current = units.find(item => item.id === unit) ?? units[0];

  const openUnit = (id: UnitId) => { if (!locked) setUnit(id); setTab('map'); setSelectedNode(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const finish = (id: string) => setCompleted(value => value.includes(id) ? value : [...value, id]);

  return <div className={`faiml-app theme-${current.color}`}>
    <header className="faiml-nav"><a className="faiml-brand" href="/notes"><span className="brand-mark"><BrainCircuit size={19} /></span><span><strong>Beyond Syllabus</strong><small>FAIML · interactive course</small></span></a><nav aria-label="FAIML unit navigation">{units.map(item => <button key={item.id} className={unit === item.id ? 'active' : ''} disabled={locked} onClick={() => openUnit(item.id)}><b>0{item.id}</b><span>{item.short}</span></button>)}</nav><a className="course-exit" href={`/learn?course=fundamentals-of-artificial-intelligence-and-machine-learning&module=faiml-unit-${unit}`}>Test practice <ArrowRight size={14} /></a></header>

    <section className="faiml-hero"><div><p className="eyebrow"><Sparkles size={14} /> FUNDAMENTALS OF AI AND MACHINE LEARNING · UNIT {unit}</p><h1>{current.title}</h1><p>{current.focus}</p><div className="hero-actions"><button className="primary" onClick={() => setTab('labs')}>Open the interactive lab <ArrowRight size={15} /></button><span><Layers3 size={14} /> 5 learning units</span><span><CircleHelp size={14} /> source-aligned recall</span></div></div><div className="hero-visual"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="hero-core"><Target size={26} /><strong>CO{unit}</strong><small>K1–K6</small></div></div></section>

    <div className="faiml-tabs" role="tablist" aria-label="Interactive unit sections">{([['map', Map, 'Concept map'], ['labs', FlaskConical, 'Interactive lab'], ['pipeline', Workflow, 'Case pipeline'], ['practice', CircleHelp, 'Unit recall']] as const).map(([id, Icon, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)} role="tab" aria-selected={tab === id}><Icon size={16} /><span>{label}</span></button>)}</div>

    <main className="faiml-main">
      {tab === 'map' && <ConceptMap unit={current} selectedNode={selectedNode} selectNode={setSelectedNode} />}
      {tab === 'labs' && <InteractiveLab unit={unit} completed={completed} finish={finish} />}
      {tab === 'pipeline' && <CasePipeline unit={unit} completed={completed} finish={finish} />}
      {tab === 'practice' && <UnitRecall unit={unit} question={questions[unit - 1]} completed={completed} finish={finish} />}
    </main>

    <footer className="faiml-footer"><span>FAIML · 2311CSC303J · R2023_V1.2</span><span>Built from the supplied question bank · Unit {unit} of 5</span></footer>
  </div>;
}

function ConceptMap({ unit, selectedNode, selectNode }: { unit: typeof units[number]; selectedNode: string | null; selectNode: (value: string | null) => void }) {
  const nodes = unit.id === 1 ? ['Agent', 'Environment', 'Search', 'Heuristic', 'Goal test'] : unit.id === 2 ? ['Facts', 'Rules', 'Inference', 'Uncertainty', 'Expert system'] : unit.id === 3 ? ['Dataset', 'Features', 'Training', 'Model', 'Generalization'] : unit.id === 4 ? ['Distance', 'Clusters', 'Centroids', 'K-means', 'Validation'] : ['Pipeline', 'Metrics', 'Validation', 'Grid Search', 'Deployment'];
  return <section className="map-section"><div className="section-heading"><div><p className="eyebrow"><Map size={14} /> PANORAMIC CONCEPT MAP</p><h2>Move through the unit as a connected system.</h2><p>Choose a node to inspect its role, then test the idea in the lab.</p></div><span className="progress-pill"><Check size={13} /> {nodes.length} concepts</span></div><div className="concept-canvas"><div className="concept-lines" />{nodes.map((node, index) => <button key={node} className={`concept-node node-${index + 1} ${selectedNode === node ? 'selected' : ''}`} onClick={() => selectNode(selectedNode === node ? null : node)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{node}</strong><small>{index === 0 ? 'start here' : index === nodes.length - 1 ? 'apply it' : 'connect the idea'}</small></button>)}</div>{selectedNode && <div className="node-detail"><div><span className="node-label">INSPECTED CONCEPT</span><h3>{selectedNode}</h3><p>{selectedNode} is one part of the {unit.title.toLowerCase()} mental model. Explain what it receives, what it produces, and how you would observe it in a real system.</p></div><button className="icon-btn" aria-label="Close concept detail" onClick={() => selectNode(null)}><X size={16} /></button></div>}</section>;
}

function InteractiveLab({ unit, completed, finish }: { unit: UnitId; completed: string[]; finish: (id: string) => void }) {
  const labs = unit === 1 ? [['agent', 'Agent builder', 'Match sensors, goals, and actions.'], ['search', 'Search selector', 'Balance optimality, memory, and guidance.']] : unit === 2 ? [['logic', 'Rule tracer', 'Follow facts through a knowledge base.'], ['expert', 'Expert-system desk', 'Show evidence behind a recommendation.']] : unit === 3 ? [['pipeline', 'Pipeline builder', 'Keep preprocessing and evaluation leakage-safe.'], ['metrics', 'Metric chooser', 'Choose the metric that matches the consequence.']] : unit === 4 ? [['cluster', 'Cluster explorer', 'Group unlabeled observations and inspect scale.'], ['kmeans', 'K-means decisions', 'Test initialization and the value of k.']] : [['evaluate', 'Evaluation bench', 'Compare metrics for an imbalanced classifier.'], ['tune', 'Grid Search room', 'Select parameters with cross-validation.']];
  return <section className="lab-section"><div className="section-heading"><div><p className="eyebrow"><FlaskConical size={14} /> INTERACTIVE LAB</p><h2>Learn by making the decision.</h2><p>These lightweight activities mirror the applied learning flow in OOPJ and ESD.</p></div><span className="progress-pill">{completed.filter(id => labs.some(item => item[0] === id)).length}/{labs.length} complete</span></div><div className="lab-grid">{labs.map(([id, title, description]) => <LabCard key={id} id={id} title={title} description={description} done={completed.includes(id)} finish={finish} />)}</div></section>;
}

function LabCard({ id, title, description, done, finish }: { id: string; title: string; description: string; done: boolean; finish: (id: string) => void }) {
  const [choice, setChoice] = useState('');
  const options = id === 'search' ? ['A* because it uses g(n) + h(n)', 'DFS because it uses less memory', 'BFS because it is always optimal'] : id === 'metrics' || id === 'evaluate' ? ['Recall when missed positives are costly', 'Accuracy for every dataset', 'Ignore the confusion matrix'] : ['Inspect evidence and validate the result', 'Trust the first output', 'Skip preprocessing'];
  return <article className={`lab-card ${done ? 'done' : ''}`}><div className="lab-card-icon"><GitBranch size={19} /></div><span className="node-label">LAB {done ? 'COMPLETE' : 'CHECKPOINT'}</span><h3>{title}</h3><p>{description}</p><label className="lab-select">Choose the strongest decision<select value={choice} onChange={event => setChoice(event.target.value)}><option value="">Select an answer</option>{options.map(option => <option key={option}>{option}</option>)}</select></label><button className="secondary" disabled={!choice || done} onClick={() => finish(id)}>{done ? <><Check size={14} /> Completed</> : <>Commit decision <ArrowRight size={14} /></>}</button></article>;
}

function CasePipeline({ unit, completed, finish }: { unit: UnitId; completed: string[]; finish: (id: string) => void }) {
  const stages = unit === 1 ? ['Problem formulation', 'Search strategy', 'Goal test', 'Route update'] : unit === 2 ? ['Facts', 'Rules', 'Inference', 'Evidence'] : ['Collect data', 'Prepare features', 'Train model', 'Evaluate'];
  return <section className="pipeline-section"><div className="section-heading"><div><p className="eyebrow"><Workflow size={14} /> GUIDED CASE PIPELINE</p><h2>From incident to explainable outcome.</h2><p>Use the same story-first rhythm as the other course modules.</p></div><span className="progress-pill"><Search size={13} /> applied thinking</span></div><div className="pipeline-visual">{stages.map((stage, index) => <div className={`pipeline-step ${completed.includes(`pipeline-${index}`) ? 'done' : ''}`} key={stage}><span>{index + 1}</span><strong>{stage}</strong><small>{index === 0 ? 'Frame the question' : index === stages.length - 1 ? 'Explain the result' : 'Make the next decision'}</small><button onClick={() => finish(`pipeline-${index}`)} aria-label={`Mark ${stage} complete`}>{completed.includes(`pipeline-${index}`) ? <Check size={13} /> : <ArrowRight size={13} />}</button></div>)}</div><div className="case-callout"><BrainCircuit size={22} /><div><strong>Case lens for Unit {unit}</strong><p>Every answer should name the input, the reasoning step, the output, and the evidence needed to trust it.</p></div></div></section>;
}

function UnitRecall({ unit, question, completed, finish }: { unit: UnitId; question: string[]; completed: string[]; finish: (id: string) => void }) {
  const [revealed, setRevealed] = useState(false);
  const done = completed.includes(`recall-${unit}`);
  return <section className="recall-section"><div className="section-heading"><div><p className="eyebrow"><CircleHelp size={14} /> UNIT RECALL</p><h2>Close the notes. Explain it from memory.</h2><p>For deeper practice, open the full Learn for a Test arena below.</p></div><a className="secondary link-btn" href={`/learn?course=fundamentals-of-artificial-intelligence-and-machine-learning&module=faiml-unit-${unit}`}>Open full practice <ArrowRight size={14} /></a></div><article className={`recall-card ${revealed ? 'revealed' : ''}`}><span className="node-label">QUESTION {String(unit).padStart(2, '0')}</span><h3>{question[0]}</h3>{revealed && <div className="answer-box"><span className="node-label">MODEL ANSWER</span><p>{question[1]}</p></div>}<div className="recall-actions">{!revealed ? <button className="primary" onClick={() => setRevealed(true)}>Reveal model answer <ArrowRight size={14} /></button> : <button className="secondary" disabled={done} onClick={() => finish(`recall-${unit}`)}>{done ? <><Check size={14} /> Mastered</> : <><Check size={14} /> Mark as understood</>}</button>}<button className="icon-btn" onClick={() => setRevealed(false)} aria-label="Reset recall"><RotateCcw size={16} /></button></div></article></section>;
}
