import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface HardwareGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HardwareGlossaryModal: React.FC<HardwareGlossaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const glossaryItems = [
    {
      term: 'Memory-Mapped I/O (MMIO)',
      category: 'Software / Architecture',
      definition: 'A method where peripheral registers (ADC, GPIO, Timers) are assigned addresses in the CPU memory space, accessed via standard pointer dereferencing *(volatile uint16_t*)0x4001204C.',
    },
    {
      term: 'Harvard Architecture',
      category: 'Silicon Architecture',
      definition: 'A CPU bus architecture featuring separate physical memory and buses for instructions and data, eliminating the Von Neumann bus bottleneck and enabling single-cycle concurrent access.',
    },
    {
      term: 'CAN Bus (ISO 11898)',
      category: 'Networking',
      definition: 'A multi-master, differential 2-wire serial bus (CAN_H, CAN_L) using bitwise non-destructive arbitration. Dominant 0 overwrites Recessive 1, allowing higher-priority message IDs to win instantly.',
    },
    {
      term: 'Independent Watchdog Timer (IWDG)',
      category: 'Hardware Safety',
      definition: 'A dedicated hardware countdown counter driven by an autonomous low-speed RC oscillator (32 kHz). If the software freezes and fails to reload the counter within 1.6s, the WDT triggers a hard system reset.',
    },
    {
      term: 'Volatile Keyword',
      category: 'Embedded C',
      definition: 'A type qualifier warning the C/C++ compiler that a variable can be modified by hardware outside the program scope (e.g. ADC registers, ISR flags), preventing the optimizer from caching stale register values.',
    },
    {
      term: 'FreeRTOS Preemptive Priority',
      category: 'Real-Time Kernel',
      definition: 'A scheduling algorithm where the ready task with the highest numerical priority strictly preempts currently executing lower-priority tasks via the ARM PendSV interrupt handler.',
    },
    {
      term: 'Post-Training Quantization (INT8)',
      category: 'TinyML / Edge AI',
      definition: 'Transforming neural network weights and activations from 32-bit floating point to 8-bit integers using scaling and zero-point parameters (q = round(S*r + Z)), shrinking model footprint by ~75%.',
    },
    {
      term: 'UML Hierarchical State Machine',
      category: 'Software Design',
      definition: 'A visual formal specification modeling system states (Sleep, Sensing, Analysing, Alerting) and event-driven transitions, preventing unhandled states and race conditions in asynchronous firmware.',
    },
    {
      term: 'McCabe Cyclomatic Complexity',
      category: 'Verification & Testing',
      definition: 'A software metric measuring the number of linearly independent paths through code. Medical and automotive standards require complexity < 15 per function to guarantee thorough testability.',
    },
    {
      term: 'Hard Real-Time Constraint',
      category: 'Real-Time Systems',
      definition: 'A deterministic temporal deadline where missing the deadline by even a few milliseconds constitutes total system failure or catastrophic physical hazard (e.g. ABS braking or water valve cutoff).',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-12 px-4 pb-8 overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Embedded Systems Engineering Glossary</h3>
              <p className="text-xs text-slate-500">Essential keywords, bus protocols, and architecture definitions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Glossary List */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {glossaryItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">{item.term}</span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 font-bold">
                  {item.category}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed mt-1 font-medium">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
