import React from 'react';
import { PhaseData } from '../../types/skill';

interface PhaseSelectorProps {
  phases: PhaseData[];
  selectedPhaseId: string;
  onSelectPhase: (phaseId: string) => void;
}

export const PhaseSelector: React.FC<PhaseSelectorProps> = ({
  phases,
  selectedPhaseId,
  onSelectPhase,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {phases.map((phase) => {
        const isSelected = phase.id === selectedPhaseId;
        return (
          <button
            key={phase.id}
            type="button"
            onClick={() => onSelectPhase(phase.id)}
            className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
              isSelected
                ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                Phase {phase.number}
              </span>
              <span className="text-xs font-mono font-bold text-slate-300">
                {phase.phase_progress}%
              </span>
            </div>

            <h3
              className={`text-sm font-bold line-clamp-1 mb-1 ${
                isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
              }`}
            >
              {phase.title.replace(/^Phase \d+:\s*/, '')}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 mb-3">
              {phase.description}
            </p>

            {/* Mini Progress Line */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  phase.phase_progress >= 100
                    ? 'bg-emerald-500'
                    : isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500'
                    : 'bg-slate-600'
                }`}
                style={{ width: `${phase.phase_progress}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
