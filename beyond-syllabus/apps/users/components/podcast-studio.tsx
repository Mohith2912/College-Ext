'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  Check,
  Clock3,
  Download,
  Gauge,
  Headphones,
  Network,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Sparkles,
} from 'lucide-react';

const AUDIO_SOURCE = '/podcasts/computer-networks-unit-1-global-network-architecture.m4a';
const AUDIO_DURATION = 52 * 60 + 59;
const SPEEDS = [1, 1.25, 1.5, 1.75, 2];

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '00:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function PodcastStudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(AUDIO_DURATION);
  const [speed, setSpeed] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      setReady(true);
    };
    const stopPlaying = () => setPlaying(false);
    const startPlaying = () => setPlaying(true);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('ended', stopPlaying);
    audio.addEventListener('pause', stopPlaying);
    audio.addEventListener('play', startPlaying);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
      audio.removeEventListener('ended', stopPlaying);
      audio.removeEventListener('pause', stopPlaying);
      audio.removeEventListener('play', startPlaying);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(value, 0), duration);
    audio.currentTime = next;
    setCurrentTime(next);
  }

  function changeSpeed() {
    const audio = audioRef.current;
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length] ?? 1;
    setSpeed(next);
    if (audio) audio.playbackRate = next;
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return <div className="podcast-hub">
    <section className="podcast-hero">
      <div className="podcast-hero-copy">
        <span className="podcast-kicker"><Headphones size={15} aria-hidden="true" /> BEYOND SYLLABUS AUDIO</span>
        <h1>Learn the unit.<br />Hear the bigger picture.</h1>
        <p>A focused audio companion for Computer Networks, arranged unit by unit so listening stays connected to what you are studying.</p>
        <div className="podcast-hero-meta"><span><Network size={15} aria-hidden="true" /> Computer Networks</span><span><Clock3 size={15} aria-hidden="true" /> 52:59</span></div>
      </div>
      <div className="podcast-signal" aria-hidden="true">
        {[38, 70, 48, 86, 58, 96, 66, 44, 78, 54, 88, 36].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
      </div>
    </section>

    <div className="podcast-grid">
      <aside className="podcast-units" aria-label="Computer Networks podcast units">
        <div className="podcast-section-label"><span>COURSE SERIES</span><strong>Computer Networks</strong></div>
        <ol>
          <li className="active"><span className="unit-index">01</span><span><small>NOW PLAYING</small><strong>Global Network Architecture</strong></span><Check size={17} aria-hidden="true" /></li>
          {[2, 3, 4, 5].map(unit => <li key={unit} className="upcoming"><span className="unit-index">0{unit}</span><span><small>COMING NEXT</small><strong>Unit {unit} podcast</strong></span></li>)}
        </ol>
      </aside>

      <section className="podcast-console" aria-labelledby="episode-title">
        <audio ref={audioRef} preload="metadata" src={AUDIO_SOURCE} />
        <div className="podcast-cover-new">
          <div className="cover-orbit"><span /><span /><Network size={46} strokeWidth={1.35} aria-hidden="true" /></div>
          <span>COMPUTER NETWORKS</span>
          <strong>UNIT<br />ONE</strong>
          <small>BEYOND SYLLABUS · PODCAST</small>
        </div>

        <div className="podcast-now-playing">
          <div className="podcast-episode-label"><span>EPISODE 01</span><span className="audio-status">{playing ? 'PLAYING' : ready ? 'READY' : 'LOADING AUDIO'}</span></div>
          <h2 id="episode-title">Anatomy of Global Network Architecture</h2>
          <p>Unit 1 audio companion · Computer Networks</p>

          <div className="podcast-timeline">
            <input
              type="range"
              min="0"
              max={duration || AUDIO_DURATION}
              step="1"
              value={Math.min(currentTime, duration || AUDIO_DURATION)}
              onChange={event => seek(Number(event.target.value))}
              aria-label="Podcast playback position"
              style={{ '--podcast-progress': `${progress}%` } as CSSProperties}
            />
            <div><span>{formatTime(currentTime)}</span><span>-{formatTime(Math.max(duration - currentTime, 0))}</span></div>
          </div>

          <div className="podcast-controls">
            <button type="button" className="podcast-skip" onClick={() => seek(currentTime - 15)} aria-label="Go back 15 seconds"><RotateCcw aria-hidden="true" /><span>15</span></button>
            <button type="button" className="podcast-play" onClick={togglePlayback} aria-label={playing ? 'Pause podcast' : 'Play podcast'}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>
            <button type="button" className="podcast-skip" onClick={() => seek(currentTime + 15)} aria-label="Go forward 15 seconds"><RotateCw aria-hidden="true" /><span>15</span></button>
            <button type="button" className="podcast-speed" onClick={changeSpeed} aria-label={`Playback speed ${speed} times. Change speed`}><Gauge size={16} aria-hidden="true" /> {speed}×</button>
          </div>

          <div className="podcast-actions">
            <span><Sparkles size={15} aria-hidden="true" /> Original Unit 1 recording</span>
            <a href={AUDIO_SOURCE} download><Download size={15} aria-hidden="true" /> Download episode</a>
          </div>
        </div>
      </section>
    </div>

    <section className="podcast-listen-note">
      <div><span>01</span><p>Listen once for the full structure. Replay difficult sections while reviewing your Unit 1 notes.</p></div>
      <div><span>02</span><p>Use the 15-second controls to revisit definitions, examples, and transitions without losing your place.</p></div>
      <div><span>03</span><p>After listening, switch to Learn for a Test and check what you can recall without the audio.</p></div>
    </section>
  </div>;
}
