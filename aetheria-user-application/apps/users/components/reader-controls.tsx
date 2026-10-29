'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Link2, Minus, Plus, Printer } from 'lucide-react';

export function ReaderControls({ title, course }: { title: string; course: string }) {
  const [scale, setScale] = useState(100);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    try { const saved = Number(localStorage.getItem('aetheria-reading-scale')); if (saved >= 85 && saved <= 140) { setScale(saved); document.documentElement.style.setProperty('--reading-scale', String(saved / 100)); } } catch { /* Reading controls remain available without local storage. */ }
    function updateProgress() {
      const article = document.getElementById('note-content');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight + 160);
      setProgress(Math.max(0, Math.min(100, ((160 - rect.top) / total) * 100)));
    }
    window.addEventListener('scroll', updateProgress, { passive: true }); window.addEventListener('resize', updateProgress); updateProgress();
    return () => { window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress); };
  }, []);
  function updateScale(value: number) { setScale(value); document.documentElement.style.setProperty('--reading-scale', String(value / 100)); try { localStorage.setItem('aetheria-reading-scale', String(value)); } catch { /* The current reading size still changes. */ } }
  async function copyCitation() { try { await navigator.clipboard.writeText(`Beyond Syllabus. “${title}.” ${course}. ${window.location.origin}${window.location.pathname} (accessed ${new Date().toISOString().slice(0, 10)}). Independent original study material.`); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); } }
  return <>
    <div className="reader-progress" aria-label="Position in this note" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><div className="reader-progress-fill" style={{ width: `${progress}%` }} /></div>
    <div className="reader-controls"><div className="scale-control"><span>Reading size</span><button type="button" className="icon-button" aria-label="Decrease reading size" disabled={scale <= 85} onClick={() => updateScale(Math.max(85, scale - 5))}><Minus size={13} aria-hidden="true" /></button><output aria-live="polite" style={{ minWidth: 31, textAlign: 'center' }}>{scale}%</output><button type="button" className="icon-button" aria-label="Increase reading size" disabled={scale >= 140} onClick={() => updateScale(Math.min(140, scale + 5))}><Plus size={13} aria-hidden="true" /></button></div><div className="reader-controls-right"><button type="button" className="btn btn-ghost" onClick={copyCitation}>{copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}<span aria-live="polite">{copied ? 'Copied' : 'Cite'}</span></button><button type="button" className="icon-button" aria-label="Print this note" onClick={() => window.print()}><Printer size={15} aria-hidden="true" /></button></div></div>
  </>;
}

export function CopyHeadingLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="heading-copy" aria-label={copied ? 'Heading link copied' : 'Copy link to this heading'} onClick={async () => { try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { window.location.hash = id; } }}>{copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}</button>;
}
