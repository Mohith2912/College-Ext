import React from 'react';
import { Unit3EmbeddedCSim } from '../../components/simulators/Unit3EmbeddedCSim';

export const Unit3Simulator: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Interactive Simulator Studio
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Embedded C Register & Bitwise Sandbox</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Memory-Mapped I/O Register 0x4001204C & Bit Twiddling Studio
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Test live reading of 12-bit SAR ADC registers at address 0x4001204C, toggle GPIOA-&gt;ODR bits safely with bitmasks, and test watchdog reset when software hangs.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {['Memory-Mapped I/O', 'volatile uint16_t*', 'Bitmasking', 'Watchdog 1.6s'].map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Unit3EmbeddedCSim />
    </div>
  );
};
