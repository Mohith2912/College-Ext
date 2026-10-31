import React from 'react';
import { JobItem } from '../../engines/greedy';
import { Calendar, DollarSign, Clock } from 'lucide-react';

interface TimelineVisualizerProps {
  timelineSlots: (JobItem | null)[];
  currentJob?: JobItem | null;
  totalProfit: number;
  sortedJobs: JobItem[];
  currentJobIndex?: number | null;
}

export const TimelineVisualizer: React.FC<TimelineVisualizerProps> = ({
  timelineSlots,
  currentJob,
  totalProfit,
  sortedJobs,
  currentJobIndex,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-sky-600" />
          <span>Timeline Slots Schedule (1 Unit Time Per Job)</span>
        </span>
        <div className="flex items-center gap-1 text-emerald-700 font-bold font-mono">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Current Total Profit = {totalProfit}</span>
        </div>
      </div>

      {/* Discrete Time Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {timelineSlots.map((job, idx) => {
          const slotNum = idx + 1;
          const isOccupied = job !== null;

          return (
            <div
              key={idx}
              className={`flex flex-col p-2.5 rounded-lg border transition-all ${
                isOccupied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-400 border-dashed'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1 font-mono text-slate-500">
                <span>Slot {slotNum}</span>
                <span className="text-[10px] text-slate-400">{idx}-{slotNum}h</span>
              </div>

              {isOccupied ? (
                <div>
                  <div className="font-bold text-sm text-emerald-900 font-mono">
                    Job {job.id}
                  </div>
                  <div className="text-[11px] text-emerald-700 flex items-center justify-between mt-1 font-mono">
                    <span>P: +{job.profit}</span>
                    <span className="text-[10px] text-slate-500">D: {job.deadline}</span>
                  </div>
                </div>
              ) : (
                <div className="py-2 text-center text-xs text-slate-400 font-mono">
                  [Free Slot]
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Job Candidate Queue sorted by profit */}
      <div className="p-3 bg-white border border-slate-200 rounded-md">
        <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Jobs Ranked by Greedy Profit (Descending):</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {sortedJobs.length} Candidates
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {sortedJobs.map((j, jIdx) => {
            const isCurrentlyEvaluating = currentJobIndex === jIdx;
            const isScheduled = timelineSlots.some((s) => s && s.id === j.id);

            let badgeStyle = 'bg-slate-50 border-slate-200 text-slate-700';
            if (isCurrentlyEvaluating) {
              badgeStyle = 'bg-sky-100 border-sky-400 text-sky-950 ring-2 ring-sky-300 font-bold';
            } else if (isScheduled) {
              badgeStyle = 'bg-emerald-50 border-emerald-200 text-emerald-900 line-through opacity-80';
            }

            return (
              <div
                key={j.id}
                className={`px-2.5 py-1.5 rounded border text-xs font-mono flex items-center gap-2 ${badgeStyle}`}
              >
                <span>Job {j.id}</span>
                <span className="text-emerald-700 font-semibold">+${j.profit}</span>
                <span className="text-[10px] text-slate-400">D:{j.deadline}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
