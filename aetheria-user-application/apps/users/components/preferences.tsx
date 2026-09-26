'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Moon, Sun, Sunset } from 'lucide-react';

type Theme = 'light' | 'sepia' | 'dark';

export function ThemePicker() {
  const [theme, setTheme] = useState<Theme>('light');
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    try { const saved = localStorage.getItem('aetheria-theme'); if (saved === 'light' || saved === 'sepia' || saved === 'dark') { setTheme(saved); document.documentElement.dataset.theme = saved; } } catch { /* Private browsing can disable local storage. */ }
  }, []);
  function changeTheme(value: Theme) {
    setTheme(value); document.documentElement.dataset.theme = value;
    try { localStorage.setItem('aetheria-theme', value); } catch { /* Theme still applies in memory. */ }
    if (menu.current) menu.current.open = false;
  }
  return <details ref={menu} className="theme-picker" onKeyDown={event => { if (event.key === 'Escape' && menu.current) menu.current.open = false; }}>
    <summary className="icon-button" aria-label="Choose reading theme"><Sun size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
    <div className="theme-menu" aria-label="Reading theme">
      {([{ value: 'light', label: 'Light', icon: Sun }, { value: 'sepia', label: 'Sepia', icon: Sunset }, { value: 'dark', label: 'Dark', icon: Moon }] as const).map(item => <button key={item.value} type="button" onClick={() => changeTheme(item.value)} aria-pressed={theme === item.value}><item.icon size={16} aria-hidden="true" />{item.label}{theme === item.value && <Check size={14} aria-hidden="true" />}</button>)}
    </div>
  </details>;
}
