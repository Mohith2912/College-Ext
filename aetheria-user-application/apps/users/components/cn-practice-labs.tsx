'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const names = ['Signal encoding', 'IPv4 subnetting', 'Stop-and-wait efficiency', 'Anti-replay receiver', 'Token-bucket shaping'];
export function CnPracticeLabs({ initialUnit }: { initialUnit: number }) {
  const [unit, setUnit] = useState(initialUnit);
  useEffect(() => { const sync = () => setUnit(Number(new URLSearchParams(location.search).get('module')?.slice(-1)) || 0); window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync); }, []);
  return <><div className="page-heading"><div><p className="eyebrow">COMPUTER NETWORKS · SEPARATE PRACTICE</p><h1>Interactive study lab.</h1><p>Choose a lab to try your own inputs. These activities supplement—not replace—the complete original modules.</p></div></div><div className="interactive-studio"><div className="session-selectors"><label>Practice unit<select value={unit} onChange={e => { const next = Number(e.target.value); setUnit(next); history.pushState(null, '', next ? `/interactive?course=computer-networks&module=computer-networks-unit-${next}` : '/interactive'); }}><option value={0}>Select a unit</option>{names.map((name, i) => <option key={name} value={i + 1}>Unit {i + 1} · {name}</option>)}</select></label></div>{unit ? <section className="walkthrough-card p-6"><h2>Unit {unit} · {names[unit - 1]}</h2><Practice key={unit} unit={unit}/><Link className="btn btn-secondary" href={`/notes/computer-networks/computer-networks-unit-${unit}`}>Open complete original Unit {unit}</Link></section> : <div className="empty-state"><h2>Five units. Five separate labs.</h2><p>Select a unit above to begin.</p></div>}</div></>;
}

function Practice({ unit }: { unit: number }) {
  const [input, setInput] = useState(unit === 1 ? '10110010' : unit === 2 ? '192.168.1.45' : '1');
  const [prefix, setPrefix] = useState(24);
  const [bytes, setBytes] = useState(1500);
  const [rate, setRate] = useState(10);
  const [rtt, setRtt] = useState(40);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [tokens, setTokens] = useState(5);
  const [message, setMessage] = useState('');
  const numberField = (label: string, value: number, setter: (v: number) => void) => <label className="my-4 grid gap-2">{label}<input className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900" type="number" value={value} onChange={e => setter(Number(e.target.value))}/></label>;
  let result = '';
  if (unit === 1) result = input && /^[01]+$/.test(input) ? [...input].map(bit => bit === '1' ? 'LH' : 'HL').join(' | ') : 'Enter a binary sequence containing only 0 and 1.';
  if (unit === 2) {
    const parts = input.split('.');
    if (parts.length !== 4 || parts.some(p => !/^\d{1,3}$/.test(p) || Number(p) > 255) || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) result = 'Enter a valid IPv4 address and integer prefix from 0 to 32.';
    else {
      const size = 2 ** (32 - prefix), value = parts.reduce((n, p) => n * 256 + Number(p), 0), network = Math.floor(value / size) * size;
      const address = (n: number) => [24, 16, 8, 0].map(s => Math.floor(n / 2 ** s) % 256).join('.');
      result = `Network: ${address(network)}/${prefix} · Last address: ${address(network + size - 1)} · Addresses: ${size} · ${prefix < 31 ? `Usable hosts: ${size - 2}` : prefix === 31 ? 'Two point-to-point endpoints (RFC 3021)' : 'Single host route'}`;
    }
  }
  if (unit === 3) { const tx = bytes * 8 / (rate * 1000); result = bytes > 0 && rate > 0 && rtt >= 0 ? `Transmission: ${tx.toFixed(3)} ms · Utilization: ${(100 * tx / (tx + rtt)).toFixed(2)}% · Throughput: ${(rate * tx / (tx + rtt)).toFixed(3)} Mbps` : 'Size and rate must be positive; delay cannot be negative.'; }
  const descriptions = ['Manchester encoding: 1 = low→high, 0 = high→low. Both conventions exist; this lab uses this one consistently.', 'Calculate IPv4 network boundaries. /31 represents point-to-point endpoints; /32 is a host route.', 'Send one frame, then wait for its ACK. This model ignores loss, processing delay, and ACK transmission time.', 'Receive authenticated packet sequences with a 64-packet sliding window. This simulation does not encrypt real traffic.', 'Capacity: 10 tokens. Refill: 2 tokens per simulated second. Each packet consumes one token.'];
  return <div className="my-6"><p>{descriptions[unit - 1]}</p>{[1, 2, 4].includes(unit) && <label className="my-4 grid gap-2">{unit === 1 ? 'Binary input' : unit === 2 ? 'IPv4 address' : 'Packet sequence'}<input className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900" value={input} maxLength={64} onChange={e => setInput(e.target.value)}/></label>}{unit === 2 && numberField('Prefix length', prefix, setPrefix)}{unit === 3 && <>{numberField('Frame size (bytes)', bytes, setBytes)}{numberField('Link rate (Mbps)', rate, setRate)}{numberField('Round-trip propagation (ms)', rtt, setRtt)}</>}{unit === 4 && <><button className="btn btn-primary" onClick={() => { const n = Number(input), highest = accepted.length ? Math.max(...accepted) : 0; if (!/^\d+$/.test(input) || !Number.isSafeInteger(n) || n < 1) { setMessage('Enter a positive integer sequence.'); return; } if (n <= highest - 64) setMessage('Dropped: outside the 64-packet window'); else if (accepted.includes(n)) setMessage('Dropped: duplicate replay'); else { setAccepted(a => [...a, n].filter(v => v > Math.max(highest, n) - 64)); setMessage('Accepted: unseen sequence'); } }}>Receive packet</button><button className="btn btn-secondary ml-3" onClick={() => { setAccepted([]); setMessage('Receiver reset.'); }}>Reset receiver</button><p className="my-4">Highest accepted: {accepted.length ? Math.max(...accepted) : 0}</p></>}{unit === 5 && <><p className="my-4">Available tokens: {tokens.toFixed(2)} / 10</p><button className="btn btn-primary" onClick={() => { if (tokens >= 1) { setTokens(tokens - 1); setMessage('Packet sent'); } else setMessage('Packet deferred: no token available'); }}>Send packet</button>{numberField('Simulated elapsed seconds', Number(input), n => setInput(String(n)))}<button className="btn btn-secondary" onClick={() => { const n = Number(input); if (!Number.isFinite(n) || n < 0) { setMessage('Elapsed time must be non-negative.'); return; } setTokens(Math.min(10, tokens + 2 * n)); setMessage(`Advanced ${n} seconds`); }}>Advance time</button><button className="btn btn-secondary ml-3" onClick={() => { setTokens(5); setMessage('Bucket reset.'); }}>Reset bucket</button></>}<output className="my-4 block break-words" aria-live="polite">{result || message}</output></div>;
}
