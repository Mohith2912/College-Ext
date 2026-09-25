'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, Pause, Play, RotateCcw, Square } from 'lucide-react';
import type { PodcastEpisode } from '@/lib/learning-studio';

export function PodcastStudio({ episodes }: { episodes: PodcastEpisode[] }) {
  const terms = [...new Map(episodes.map(episode => [episode.termNumber, episode.term])).entries()];
  const [term, setTerm] = useState(terms[0]?.[0] ?? 1);
  const filtered = useMemo(() => episodes.filter(episode => episode.termNumber === term), [episodes, term]);
  const [episodeId, setEpisodeId] = useState(filtered[0]?.id ?? '');
  const episode = episodes.find(item => item.id === episodeId) ?? filtered[0];
  const [turn, setTurn] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const runRef = useRef(0);

  useEffect(() => {
    if (!filtered.some(item => item.id === episodeId)) setEpisodeId(filtered[0]?.id ?? '');
    setTurn(0);
    setPlaying(false);
    setPaused(false);
    speechSynthesis.cancel();
  }, [term]);

  useEffect(() => () => speechSynthesis.cancel(), []);

  function speakFrom(index: number) {
    if (!episode || !('speechSynthesis' in window)) return;
    const run = ++runRef.current;
    speechSynthesis.cancel();
    setPlaying(true);
    setPaused(false);
    const voices = speechSynthesis.getVoices();
    const preferred = voices.filter(voice => /^en/i.test(voice.lang));
    const speakTurn = (position: number) => {
      if (run !== runRef.current || position >= episode.dialogue.length) {
        if (run === runRef.current) setPlaying(false);
        return;
      }
      setTurn(position);
      const item = episode.dialogue[position];
      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.rate = item.speaker === 'Mira' ? 0.96 : 1.02;
      utterance.pitch = item.speaker === 'Mira' ? 1.08 : 0.9;
      utterance.voice = preferred[item.speaker === 'Mira' ? 0 : Math.min(1, preferred.length - 1)] ?? null;
      utterance.onend = () => speakTurn(position + 1);
      utterance.onerror = () => setPlaying(false);
      speechSynthesis.speak(utterance);
    };
    speakTurn(index);
  }

  function togglePause() {
    if (paused) speechSynthesis.resume(); else speechSynthesis.pause();
    setPaused(!paused);
  }

  function stop() {
    runRef.current += 1;
    speechSynthesis.cancel();
    setPlaying(false);
    setPaused(false);
  }

  if (!episode) return <div className="empty-state"><h2>Podcast conversations are being prepared.</h2><p>They appear when published course notes are available.</p></div>;

  return <div className="podcast-studio">
    <div className="term-switcher" role="tablist" aria-label="Choose semester">{terms.map(([number, label]) => <button key={number} role="tab" aria-selected={term === number} onClick={() => setTerm(number)}>{label}</button>)}</div>
    <div className="podcast-layout">
      <aside className="episode-list" aria-label={`${episode.term} episodes`}>
        <p className="eyebrow">{episode.term.toUpperCase()} · COURSE CONVERSATIONS</p>
        {filtered.map(item => <button key={item.id} className={item.id === episode.id ? 'active' : ''} onClick={() => { stop(); setEpisodeId(item.id); setTurn(0); }}><span>{item.courseCode}</span><strong>{item.course}</strong><small>{item.minutes} min · two hosts</small></button>)}
      </aside>
      <section className="podcast-player">
        <div className="podcast-cover"><Headphones aria-hidden="true"/><span>{episode.term}</span><strong>{episode.course}</strong><small>A conversation between Mira and Arun</small></div>
        <div className="player-copy"><span className="course-code">{episode.courseCode} · TWO-SIDED STUDY PODCAST</span><h2>{episode.course}</h2><p>{episode.description}</p>
          <div className="player-controls"><button className="round-control primary" onClick={() => speakFrom(turn)} aria-label={playing ? 'Restart from current speaker' : 'Play conversation'}>{playing ? <RotateCcw/> : <Play/>}</button><button className="round-control" onClick={togglePause} disabled={!playing} aria-label={paused ? 'Resume' : 'Pause'}>{paused ? <Play/> : <Pause/>}</button><button className="round-control" onClick={stop} disabled={!playing} aria-label="Stop"><Square/></button><span>{turn + 1} / {episode.dialogue.length} turns</span></div>
        </div>
        <div className="dialogue-transcript" aria-live="polite">{episode.dialogue.map((item, index) => <button key={`${item.speaker}-${index}`} className={`${item.speaker.toLowerCase()} ${index === turn ? 'current' : ''}`} onClick={() => speakFrom(index)}><span className="speaker-avatar">{item.speaker[0]}</span><span><strong>{item.speaker}</strong><span>{item.text}</span></span></button>)}</div>
      </section>
    </div>
  </div>;
}
