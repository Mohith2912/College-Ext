'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BrainCircuit, Check, ChevronRight, CircleHelp, Edit3, Flame, Layers3, Minus, Plus, RotateCcw, Sparkles, Target, Trophy, X } from 'lucide-react';
import { computerNetworksQuestionBank, questionBankSource, type QuestionBankItem } from '@/lib/question-bank';
import { oopjQuestionBank, oopjQuestionBankSource } from '@/lib/oopj-question-bank';

type ModuleOption = { id: string; course: string; courseCode: string; courseSlug: string; module: string; moduleSlug: string; termNumber: number };
type AuthoredItem = QuestionBankItem & { authored: true };
type Mode = 'quiz' | 'write' | 'flashcards' | 'author';

const unitNames = ['Foundations and architecture', 'Switching, routing and addressing', 'Transport and congestion control', 'Network security', 'Cloud, IoT and 5G'];
const oopjUnitNames = ['OOP and Java basics', 'Classes, methods and memory', 'Inheritance and interfaces', 'Exceptions and file streams', 'Threads, generics and JDBC'];
const unitColors = ['violet', 'blue', 'amber', 'rose', 'cyan'] as const;
const storageKey = 'beyond-syllabus-authored-question-bank-v1';

function moduleUnit(moduleSlug: string) {
  const match = /(?:computer-networks|oopj)-unit-([1-5])$/.exec(moduleSlug);
  return match ? Number(match[1]) : undefined;
}

function sourceQuestions(module: ModuleOption, authored: AuthoredItem[]) {
  const unit = moduleUnit(module.moduleSlug);
  const authoredForModule = authored.filter(item => item.id.startsWith(`${module.courseSlug}:${module.moduleSlug}:`));
  if (module.courseSlug === 'computer-networks' && unit) return [...computerNetworksQuestionBank.filter(item => item.unit === unit), ...authoredForModule];
  if (module.courseSlug === 'object-oriented-programming-using-java' && unit) return [...oopjQuestionBank.filter(item => item.unit === unit), ...authoredForModule];
  return authoredForModule;
}

function sourceForCourse(courseSlug: string) {
  return courseSlug === 'object-oriented-programming-using-java' ? oopjQuestionBankSource : questionBankSource;
}

function sourceFormat(item: QuestionBankItem) {
  return item.id.startsWith('oopj-') ? 'DOC' : 'PDF';
}

function optionsFor(items: QuestionBankItem[], index: number) {
  const current = items[index];
  if (!current) return { options: [], answer: 0 };
  const distractors = items.filter(item => item.id !== current.id).slice(0, 3).map(item => item.answer);
  const values = [current.answer, ...distractors];
  const shift = values.length ? index % values.length : 0;
  return { options: values.map((_, optionIndex) => values[(optionIndex + shift) % values.length] ?? ''), answer: (values.length - shift) % values.length };
}

export function LearnForTest({ modules, initialCourse, initialModule }: { modules: ModuleOption[]; initialCourse?: string; initialModule?: string }) {
  const courses = useMemo(() => [...new Map(modules.map(item => [item.courseSlug, { slug: item.courseSlug, title: item.course, code: item.courseCode }])).values()], [modules]);
  const first = modules.find(item => item.courseSlug === initialCourse && item.moduleSlug === initialModule) ?? modules.find(item => item.courseSlug === initialCourse) ?? modules[0];
  const [courseSlug, setCourseSlug] = useState(first?.courseSlug ?? '');
  const [moduleSlug, setModuleSlug] = useState(first?.moduleSlug ?? '');
  const [mode, setMode] = useState<Mode>('quiz');
  const [authored, setAuthored] = useState<AuthoredItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [known, setKnown] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [draftQuestion, setDraftQuestion] = useState('');
  const [draftAnswer, setDraftAnswer] = useState('');
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
      if (Array.isArray(stored)) setAuthored(stored);
      const progress = JSON.parse(window.localStorage.getItem(`${storageKey}:progress`) ?? '{}');
      if (progress && Array.isArray(progress.known)) setKnown(progress.known);
      if (progress && Number.isFinite(progress.streak)) setStreak(progress.streak);
    } catch { /* local progress is optional */ }
  }, []);

  const selectedModule = modules.find(item => item.courseSlug === courseSlug && item.moduleSlug === moduleSlug) ?? modules.find(item => item.courseSlug === courseSlug) ?? modules[0];
  const courseModules = modules.filter(item => item.courseSlug === courseSlug);
  const items = selectedModule ? sourceQuestions(selectedModule, authored) : [];
  const current = items[index] ?? items[0];
  const quizOptions = current ? optionsFor(items, index) : { options: [], answer: 0 };
  const unit = selectedModule ? moduleUnit(selectedModule.moduleSlug) : undefined;
  const selectedUnitNames = courseSlug === 'object-oriented-programming-using-java' ? oopjUnitNames : unitNames;
  const selectedSource = sourceForCourse(courseSlug);
  const color = unit ? unitColors[unit - 1] : 'violet';
  const answered = selected !== null;

  function resetSession(nextMode = mode) {
    setMode(nextMode); setIndex(0); setSelected(null); setFlipped(false); setRevealed(false); setWrittenAnswer(''); setSavedNotice('');
  }

  function chooseCourse(next: string) {
    const nextModule = modules.find(item => item.courseSlug === next);
    setCourseSlug(next); setModuleSlug(nextModule?.moduleSlug ?? ''); resetSession();
  }

  function chooseModule(next: string) {
    setModuleSlug(next); resetSession();
  }

  function chooseAnswer(option: number) {
    if (answered || !current) return;
    setSelected(option);
    if (option === quizOptions.answer) {
      const nextKnown = known.includes(current.id) ? known : [...known, current.id];
      setKnown(nextKnown); setStreak(value => value + 1);
      try { window.localStorage.setItem(`${storageKey}:progress`, JSON.stringify({ known: nextKnown, streak: streak + 1 })); } catch { /* optional */ }
    } else setStreak(0);
  }

  function nextQuestion() {
    setIndex(value => items.length ? (value + 1) % items.length : 0); setSelected(null); setFlipped(false); setRevealed(false); setWrittenAnswer('');
  }

  function markCurrentKnown() {
    if (!current || known.includes(current.id)) { nextQuestion(); return; }
    const nextKnown = [...known, current.id];
    setKnown(nextKnown);
    try { window.localStorage.setItem(`${storageKey}:progress`, JSON.stringify({ known: nextKnown, streak })); } catch { /* optional */ }
    nextQuestion();
  }

  function saveAuthoredQuestion() {
    if (!selectedModule || !draftQuestion.trim() || !draftAnswer.trim()) return;
    const item: AuthoredItem = { id: `${selectedModule.courseSlug}:${selectedModule.moduleSlug}:${Date.now()}`, unit: unit ?? 0, unitTitle: selectedModule.module, part: 'A', number: items.length + 1, question: draftQuestion.trim(), answer: draftAnswer.trim(), authored: true };
    const next = [...authored, item]; setAuthored(next); setDraftQuestion(''); setDraftAnswer(''); setSavedNotice('Added to this module’s private question set.');
    try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* optional */ }
  }

  const progress = items.length ? Math.round((known.filter(id => items.some(item => item.id === id)).length / items.length) * 100) : 0;

  return <div className={`learn-arena learn-arena-${color}`}>
    <header className="learn-hero">
      <div className="learn-hero-copy"><div className="learn-kicker"><BrainCircuit size={16} aria-hidden="true" /> LEARN FOR A TEST · ACTIVE RECALL ARENA</div><h1>Turn the question bank into momentum.</h1><p>Practice the exact {selectedModule?.course ?? 'course'} question bank with quiz rounds, flip-to-recall flashcards, and your own authored prompts for every module.</p><div className="learn-hero-source"><span><Sparkles size={14} aria-hidden="true" /> Source-locked content</span><span>{selectedSource}</span></div></div>
      <div className="learn-hero-orbit"><div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" /><div className="orbit-core"><Target size={28} aria-hidden="true" /><strong>{progress}%</strong><small>mastered</small></div></div>
    </header>

    <section className="learn-command" aria-label="Choose a course and module"><div className="learn-select"><label>Course<select value={courseSlug} onChange={event => chooseCourse(event.target.value)}>{courses.map(course => <option key={course.slug} value={course.slug}>{course.code} · {course.title}</option>)}</select></label><label>Module<select value={moduleSlug} onChange={event => chooseModule(event.target.value)}>{courseModules.map(item => <option key={item.moduleSlug} value={item.moduleSlug}>{item.module}</option>)}</select></label></div><div className="learn-stats"><span><Flame size={15} aria-hidden="true" /><strong>{streak}</strong> streak</span><span><Trophy size={15} aria-hidden="true" /><strong>{known.filter(id => items.some(item => item.id === id)).length}</strong> mastered</span><span><Layers3 size={15} aria-hidden="true" /><strong>{items.length}</strong> source cards</span></div></section>

    <nav className="learn-mode-tabs" aria-label="Practice modes"><button className={mode === 'quiz' ? 'active' : ''} onClick={() => resetSession('quiz')}><CircleHelp size={17} aria-hidden="true" /><span><strong>Quiz arena</strong><small>Choose, commit, learn</small></span></button><button className={mode === 'write' ? 'active' : ''} onClick={() => resetSession('write')}><Edit3 size={17} aria-hidden="true" /><span><strong>Write answer</strong><small>Recall, then compare</small></span></button><button className={mode === 'flashcards' ? 'active' : ''} onClick={() => resetSession('flashcards')}><Layers3 size={17} aria-hidden="true" /><span><strong>Flashcards</strong><small>Flip for recall</small></span></button><button className={mode === 'author' ? 'active' : ''} onClick={() => resetSession('author')}><Sparkles size={17} aria-hidden="true" /><span><strong>Write your own</strong><small>Build module memory</small></span></button></nav>

    {unit && <div className="learn-unit-strip" aria-label={`${selectedModule?.course ?? 'Course'} units`}>{selectedUnitNames.map((name, unitIndex) => <Link key={name} href={`/learn?course=${courseSlug}&module=${courseSlug === 'computer-networks' ? 'computer-networks' : 'oopj'}-unit-${unitIndex + 1}`} className={unit === unitIndex + 1 ? 'active' : ''}><span>0{unitIndex + 1}</span>{name}</Link>)}</div>}

    {!selectedModule || !items.length ? <section className="learn-empty"><Sparkles size={28} aria-hidden="true" /><h2>This module is ready for your questions.</h2><p>Choose “Write your own” to author a private question-and-answer set for this course module. Your cards stay in this browser.</p><button className="btn btn-primary" onClick={() => resetSession('author')}>Write the first card <ChevronRight size={14} aria-hidden="true" /></button></section> : mode === 'quiz' ? <QuizPanel current={current} options={quizOptions.options} answer={quizOptions.answer} selected={selected} onChoose={chooseAnswer} onNext={nextQuestion} index={index} total={items.length} /> : mode === 'write' ? <WrittenAnswerPanel current={current} index={index} total={items.length} response={writtenAnswer} setResponse={setWrittenAnswer} revealed={revealed} reveal={() => setRevealed(true)} onNext={nextQuestion} onKnown={markCurrentKnown} /> : mode === 'flashcards' ? <FlashcardPanel current={current} flipped={flipped} onFlip={() => setFlipped(value => !value)} onNext={nextQuestion} index={index} total={items.length} known={known.includes(current.id)} onKnown={markCurrentKnown} /> : <AuthorPanel question={draftQuestion} answer={draftAnswer} setQuestion={setDraftQuestion} setAnswer={setDraftAnswer} onSave={saveAuthoredQuestion} notice={savedNotice} authoredCount={authored.filter(item => selectedModule && item.id.startsWith(`${selectedModule.courseSlug}:${selectedModule.moduleSlug}:`)).length} />}

    {selectedModule && <footer className="learn-footer"><span>Studying <strong>{selectedModule.module}</strong> · answers are adapted from the uploaded question bank.</span><Link href={`/notes/${selectedModule.courseSlug}/${selectedModule.moduleSlug}`}>Open the full module <ChevronRight size={14} aria-hidden="true" /></Link></footer>}
  </div>;
}

function QuizPanel({ current, options, answer, selected, onChoose, onNext, index, total }: { current: QuestionBankItem; options: string[]; answer: number; selected: number | null; onChoose: (option: number) => void; onNext: () => void; index: number; total: number }) {
  const answered = selected !== null;
  return <section className="learn-panel quiz-panel"><div className="panel-topline"><span className="panel-eyebrow">ROUND {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span><span className="source-chip">{sourceFormat(current)} · UNIT {current.unit} · PART {current.part}</span></div><div className="quiz-progress"><span style={{ width: `${((index + 1) / total) * 100}%` }} /></div><div className="quiz-question"><span className="question-number">{current.part}{current.number}</span><h2>{current.question}</h2><p>Pick the explanation that best matches the source answer, then read the rationale.</p></div><div className="quiz-options">{options.map((option, optionIndex) => { const correct = optionIndex === answer; const wrong = selected === optionIndex && !correct; return <button key={`${option}-${optionIndex}`} className={`${selected !== null && correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`} onClick={() => onChoose(optionIndex)} disabled={answered}><span className="option-key">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{selected !== null && correct && <Check size={18} aria-hidden="true" />}{wrong && <X size={18} aria-hidden="true" />}</button>; })}</div>{answered && <div className={`quiz-feedback ${selected === answer ? 'is-correct' : 'is-review'}`}><div><strong>{selected === answer ? 'Locked in. Nice recall.' : 'Good review moment.'}</strong><p>{current.answer}</p></div><button className="btn btn-primary" onClick={onNext}>Next card <ChevronRight size={14} aria-hidden="true" /></button></div>}</section>;
}

function FlashcardPanel({ current, flipped, onFlip, onNext, index, total, known, onKnown }: { current: QuestionBankItem; flipped: boolean; onFlip: () => void; onNext: () => void; index: number; total: number; known: boolean; onKnown: () => void }) {
  const [fontSize, setFontSize] = useState(24);
  const cardHeight = Math.min(600, Math.max(360, 300 + Math.ceil(Math.max(current.question.length, current.answer.length) / 280) * 52));
  return <section className="learn-panel flashcard-panel"><div className="panel-topline"><span className="panel-eyebrow">FLASHCARD {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span><span className="source-chip">{known ? 'REVIEWED' : 'NEW CARD'}</span></div><div className="flashcard-tools" aria-label="Flashcard display controls"><span>Text size</span><button type="button" aria-label="Decrease flashcard text size" onClick={() => setFontSize(size => Math.max(18, size - 2))} disabled={fontSize <= 18}><Minus size={16} aria-hidden="true" /></button><output aria-live="polite">{fontSize}px</output><button type="button" aria-label="Increase flashcard text size" onClick={() => setFontSize(size => Math.min(34, size + 2))} disabled={fontSize >= 34}><Plus size={16} aria-hidden="true" /></button></div><button className={`flashcard ${flipped ? 'flipped' : ''}`} style={{ height: `${cardHeight}px` }} onClick={onFlip} aria-pressed={flipped} aria-label={flipped ? 'Show question' : 'Reveal answer'}><span className="flashcard-face flashcard-front"><small>QUESTION {current.number}</small><strong style={{ fontSize: `${fontSize}px` }}>{current.question}</strong><em>Tap to reveal the source answer</em></span><span className="flashcard-face flashcard-back"><small>SOURCE ANSWER</small><strong style={{ fontSize: `${fontSize}px` }}>{current.answer}</strong><em>Explain it in your own words before moving on</em></span></button><div className="flashcard-actions"><button className="btn btn-secondary" onClick={onNext}><RotateCcw size={14} aria-hidden="true" /> Keep reviewing</button><button className="btn btn-primary" onClick={onKnown}><Check size={14} aria-hidden="true" /> I know this</button></div></section>;
}

function WrittenAnswerPanel({ current, index, total, response, setResponse, revealed, reveal, onNext, onKnown }: { current: QuestionBankItem; index: number; total: number; response: string; setResponse: (value: string) => void; revealed: boolean; reveal: () => void; onNext: () => void; onKnown: () => void }) {
  return <section className="learn-panel written-panel"><div className="panel-topline"><span className="panel-eyebrow">WRITE IT OUT · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span><span className="source-chip">{sourceFormat(current)} · UNIT {current.unit} · PART {current.part}</span></div><div className="written-prompt"><span className="question-number">{current.part}{current.number}</span><h2>{current.question}</h2></div><label className="written-field">Your answer<textarea value={response} onChange={event => setResponse(event.target.value)} placeholder="Close the model answer and explain it from memory..." rows={7} /></label>{revealed && <div className="written-model"><span className="panel-eyebrow">QUESTION BANK MODEL ANSWER</span><p>{current.answer}</p></div>}<div className="written-actions">{!revealed ? <button className="btn btn-primary" onClick={reveal} disabled={!response.trim()}>Compare with model answer <ChevronRight size={14} aria-hidden="true" /></button> : <><button className="btn btn-secondary" onClick={onNext}><RotateCcw size={14} aria-hidden="true" /> Review again</button><button className="btn btn-primary" onClick={onKnown}><Check size={14} aria-hidden="true" /> I know this</button></>}</div></section>;
}

function AuthorPanel({ question, answer, setQuestion, setAnswer, onSave, notice, authoredCount }: { question: string; answer: string; setQuestion: (value: string) => void; setAnswer: (value: string) => void; onSave: () => void; notice: string; authoredCount: number }) {
  return <section className="learn-panel author-panel"><div className="panel-topline"><span className="panel-eyebrow">AUTHOR MODE · MAKE IT STICK</span><span className="source-chip">{authoredCount} private cards</span></div><div className="author-intro"><div className="author-icon"><Edit3 size={20} aria-hidden="true" /></div><div><h2>Write the question you wish the examiner would ask.</h2><p>Turn confusing ideas into your own prompts. These cards are saved only in this browser and join the selected module’s quiz and flashcard rounds.</p></div></div><div className="author-fields"><label>Question prompt<textarea value={question} onChange={event => setQuestion(event.target.value)} placeholder="e.g. Explain why…" rows={5} /></label><label>Model answer<textarea value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Write the answer you want to remember…" rows={5} /></label></div><div className="author-footer"><span>{notice || 'Private to this browser · no account sync required'}</span><button className="btn btn-primary" onClick={onSave} disabled={!question.trim() || !answer.trim()}>Add to study set <Sparkles size={14} aria-hidden="true" /></button></div></section>;
}
