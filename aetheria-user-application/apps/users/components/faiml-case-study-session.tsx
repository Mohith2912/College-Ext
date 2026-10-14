'use client';

import { useMemo, useState } from 'react';
import { BrainCircuit, Check, ChevronRight, CircleHelp, FlaskConical, RotateCcw, Sparkles } from 'lucide-react';

const stages = [
  { id: 'search', label: 'Route the agent', detail: 'Choose a search strategy for a changing campus route.' },
  { id: 'features', label: 'Prepare the data', detail: 'Make a fair preprocessing decision before training.' },
  { id: 'metrics', label: 'Choose the metric', detail: 'Match evaluation to the cost of a wrong prediction.' },
  { id: 'clusters', label: 'Read the clusters', detail: 'Turn unlabeled patterns into a cautious recommendation.' },
] as const;

type StageId = typeof stages[number]['id'];

export function FaimlCaseStudySession() {
  const [activeStage, setActiveStage] = useState<StageId>('search');
  const [answers, setAnswers] = useState<Record<StageId, string>>({ search: '', features: '', metrics: '', clusters: '' });
  const [submitted, setSubmitted] = useState<StageId[]>([]);
  const stageIndex = stages.findIndex(stage => stage.id === activeStage);
  const progress = Math.round((submitted.length / stages.length) * 100);
  const current = useMemo(() => stages[stageIndex], [stageIndex]);

  function submit() {
    if (!answers[activeStage]) return;
    setSubmitted(value => value.includes(activeStage) ? value : [...value, activeStage]);
  }

  function reset() {
    setAnswers({ search: '', features: '', metrics: '', clusters: '' });
    setSubmitted([]);
    setActiveStage('search');
  }

  return <div className="faiml-case-shell">
    <section className="faiml-case-hero" aria-labelledby="faiml-case-title">
      <div><p className="faiml-kicker"><BrainCircuit size={16} aria-hidden="true" /> Guided AI/ML case studio</p><h1 id="faiml-case-title">A campus AI assistant must make one careful decision.</h1><p>Trace a single investigation from search and data preparation to evaluation and clustering. Every checkpoint comes from the ideas in the supplied FAIML question bank.</p><div className="faiml-hero-actions"><button type="button" className="btn btn-primary" onClick={() => document.querySelector('#faiml-case-workspace')?.scrollIntoView({ behavior: 'smooth' })}>Open the investigation <ChevronRight size={15} aria-hidden="true" /></button><span><FlaskConical size={15} aria-hidden="true" /> 10–15 minutes</span><span><CircleHelp size={15} aria-hidden="true" /> 4 checkpoints</span></div></div>
      <div className="faiml-orbit" aria-label="FAIML case study progress"><span /><span /><strong>{progress}%</strong><small>complete</small></div>
    </section>

    <section className="faiml-outcomes"><div><small>Learning outcomes</small><h2>Decisions you will practise</h2></div><ul><li><Check size={14} aria-hidden="true" />Choose search by cost and guidance</li><li><Check size={14} aria-hidden="true" />Prevent leakage before model training</li><li><Check size={14} aria-hidden="true" />Match metrics to real consequences</li></ul></section>

    <nav className="faiml-progress" aria-label="FAIML investigation checkpoints"><div className="faiml-progress-summary"><span>{progress}% complete</span><button type="button" onClick={reset}><RotateCcw size={13} aria-hidden="true" /> Reset</button></div><div className="faiml-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div><ol>{stages.map((stage, index) => <li key={stage.id}><button type="button" className={activeStage === stage.id ? 'active' : ''} aria-current={activeStage === stage.id ? 'step' : undefined} onClick={() => setActiveStage(stage.id)}><b>{submitted.includes(stage.id) ? <Check size={13} aria-hidden="true" /> : index + 1}</b><span><strong>{stage.label}</strong><small>{stage.detail}</small></span></button></li>)}</ol></nav>

    <section id="faiml-case-workspace" className="faiml-workspace" aria-labelledby="faiml-stage-title"><header><div><span>Checkpoint {stageIndex + 1} of {stages.length}</span><h2 id="faiml-stage-title">{current.label}</h2></div><p>{current.detail}</p></header><StagePrompt stage={activeStage} value={answers[activeStage]} onChange={value => setAnswers(currentAnswers => ({ ...currentAnswers, [activeStage]: value }))} /><div className="faiml-stage-footer"><span>{submitted.includes(activeStage) ? 'Decision recorded. You can revisit it at any time.' : 'Choose one option, then commit to your reasoning.'}</span><button type="button" className="btn btn-primary" onClick={submit} disabled={!answers[activeStage]}>{submitted.includes(activeStage) ? 'Decision recorded' : 'Commit decision'} <Sparkles size={14} aria-hidden="true" /></button></div></section>
  </div>;
}

function StagePrompt({ stage, value, onChange }: { stage: StageId; value: string; onChange: (value: string) => void }) {
  const options: Record<StageId, Array<[string, string]>> = {
    search: [['astar', 'A* search'], ['dfs', 'DFS'], ['bfs', 'BFS']],
    features: [['onehot', 'One-hot encode nominal categories'], ['label', 'Label encode every category'], ['drop', 'Drop categorical columns']],
    metrics: [['recall', 'Recall'], ['accuracy', 'Accuracy'], ['precision', 'Precision']],
    clusters: [['validate', 'Validate with stability and domain meaning'], ['name', 'Name each cluster as a guaranteed user type'], ['ignore', 'Ignore scale because K-means handles it']],
  };
  const prompt: Record<StageId, string> = { search: 'The map has unequal road costs and a useful distance estimate. Which strategy should guide the route?', features: 'The loan dataset has nominal fields such as employment type. What is the safest first choice?', metrics: 'Missing a likely churn customer is more costly than contacting a customer who stays. Which metric deserves priority?', clusters: 'After finding library usage clusters, what should the team do before launching a service for each group?' };
  return <div className="faiml-stage-prompt"><span className="faiml-stage-icon"><BrainCircuit size={23} aria-hidden="true" /></span><h3>{prompt[stage]}</h3><div className="faiml-options" role="radiogroup" aria-label="Choose an answer">{options[stage].map(([id, label]) => <label key={id} className={value === id ? 'selected' : ''}><input type="radio" name={stage} value={id} checked={value === id} onChange={() => onChange(id)} /><span>{label}</span></label>)}</div></div>;
}
