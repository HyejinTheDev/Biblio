import React from 'react';
import { StageNodeData } from '../../types/skill';

interface StageNodeProps {
  stage: StageNodeData;
  onClick: (stage: StageNodeData) => void;
}

export const StageNode: React.FC<StageNodeProps> = ({ stage, onClick }) => {
  const isLocked = stage.status === 'locked';
  const isCleared = stage.status === 'cleared';
  const isActive = stage.status === 'active';

  const getNodeStyles = () => {
    if (stage.is_boss) {
      if (isCleared) {
        return 'bg-gradient-to-tr from-amber-600 to-yellow-400 border-amber-300 text-slate-950 shadow-amber-500/50 shadow-xl ring-4 ring-amber-400/40';
      }
      if (isActive) {
        return 'bg-gradient-to-tr from-rose-700 via-purple-700 to-amber-600 border-rose-400 text-white animate-pulse shadow-rose-500/50 shadow-2xl ring-4 ring-rose-500/50';
      }
      return 'bg-slate-800 border-slate-700 text-slate-500 opacity-60';
    }

    if (isCleared) {
      return 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-300 text-white shadow-emerald-500/30 shadow-lg';
    }
    if (isActive) {
      return 'bg-gradient-to-tr from-indigo-600 to-violet-500 border-indigo-300 text-white shadow-indigo-500/40 shadow-xl ring-4 ring-indigo-400/40 animate-pulse';
    }
    return 'bg-slate-800/80 border-slate-700 text-slate-500 opacity-50 cursor-not-allowed';
  };

  return (
    <div className="flex flex-col items-center group relative cursor-pointer" onClick={() => !isLocked && onClick(stage)}>
      {/* Node Orb Button */}
      <button
        type="button"
        disabled={isLocked}
        className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform group-hover:scale-110 active:scale-95 z-10 ${getNodeStyles()}`}
      >
        {isLocked ? (
          <span className="text-xl">🔒</span>
        ) : stage.is_boss ? (
          <span className="text-2xl drop-shadow">👑</span>
        ) : isCleared ? (
          <span className="text-2xl">✨</span>
        ) : (
          <span className="text-2xl">⚔️</span>
        )}

        <span className="text-[11px] font-black tracking-tight mt-0.5">
          {stage.stage_code}
        </span>
      </button>

      {/* Stars Underneath */}
      <div className="flex gap-0.5 mt-2 h-4 items-center">
        {isCleared ? (
          Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`text-xs ${
                i < stage.stars_earned ? 'text-amber-400 drop-shadow' : 'text-slate-600'
              }`}
            >
              ★
            </span>
          ))
        ) : (
          <span className="text-[10px] text-slate-500 font-mono">
            {stage.is_boss ? 'BOSS ẢI' : isLocked ? 'CHƯA MỞ' : 'SẴN SÀNG'}
          </span>
        )}
      </div>

      {/* Stage Name Label */}
      <div className="text-center mt-1 max-w-[130px]">
        <h4
          className={`text-xs font-semibold leading-tight line-clamp-2 transition-colors ${
            isLocked
              ? 'text-slate-500'
              : isActive
              ? 'text-indigo-300 group-hover:text-white'
              : 'text-slate-200 group-hover:text-white'
          }`}
        >
          {stage.name}
        </h4>
      </div>
    </div>
  );
};
