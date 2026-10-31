import React from 'react';
import { UnitId, LabId } from '../../types/algorithm';
import { UNITS, LAB_METADATA } from '../../data/curriculum';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentUnitId: UnitId;
  currentLabId: LabId;
  completedLabs: Set<LabId>;
  onSelectLab: (labId: LabId) => void;
  onSelectUnit: (unitId: UnitId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUnitId,
  currentLabId,
  completedLabs,
  onSelectLab,
  onSelectUnit,
}) => {
  return (
    <aside className="w-80 shrink-0 border-r border-slate-200 bg-white flex flex-col h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto">
      <div className="p-4 border-b border-slate-100">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Curriculum Navigation
        </div>
        <div className="text-sm text-slate-700">
          {completedLabs.size} of 17 Labs Completed (
          {Math.round((completedLabs.size / 17) * 100)}%)
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-sky-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(completedLabs.size / 17) * 100}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100 flex-1">
        {UNITS.map((unit) => {
          const isCurrentUnit = unit.id === currentUnitId;
          const unitCompletedCount = unit.labs.filter((l) => completedLabs.has(l)).length;

          return (
            <div key={unit.id} className="py-2">
              <button
                onClick={() => {
                  onSelectUnit(unit.id);
                  if (!unit.labs.includes(currentLabId)) {
                    onSelectLab(unit.labs[0]);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-slate-50 transition-colors ${
                  isCurrentUnit ? 'bg-slate-50' : ''
                }`}
              >
                <div>
                  <div className="text-xs font-medium text-slate-400">
                    Unit 0{unit.number}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-tight">
                    {unit.title}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">
                    {unitCompletedCount}/{unit.labCount}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isCurrentUnit ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {isCurrentUnit && (
                <div className="mt-1 space-y-0.5 px-2">
                  {unit.labs.map((labId) => {
                    const lab = LAB_METADATA[labId];
                    const isSelected = labId === currentLabId;
                    const isDone = completedLabs.has(labId);

                    return (
                      <button
                        key={labId}
                        onClick={() => onSelectLab(labId)}
                        className={`w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-md text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 text-sky-900 font-medium'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <div
                              className={`w-3.5 h-3.5 rounded-full border ${
                                isSelected ? 'border-sky-500' : 'border-slate-300'
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium">{lab.title}</div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {lab.badge}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-center">
        Interactive Algorithms Lab Engine
      </div>
    </aside>
  );
};
