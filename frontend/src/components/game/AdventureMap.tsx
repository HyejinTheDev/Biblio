import React, { useState } from 'react';
import { StageNodeData, DifficultyTier } from '../../types/skill';
import { StageNode } from './StageNode';
import { StageModal } from './StageModal';

interface AdventureMapProps {
  stages: StageNodeData[];
  onSelectStageBattle: (stage: StageNodeData, difficulty: DifficultyTier) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  stages,
  onSelectStageBattle,
}) => {
  const [activeModalStage, setActiveModalStage] = useState<StageNodeData | null>(null);

  const handleStageClick = (stage: StageNodeData) => {
    setActiveModalStage(stage);
  };

  const handleStartBattle = (stage: StageNodeData, difficulty: DifficultyTier) => {
    setActiveModalStage(null);
    onSelectStageBattle(stage, difficulty);
  };

  return (
    <div className="relative w-full bg-slate-950/70 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden">
      {/* Background Cyber Grid Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header bar of the map */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🗺️ Bản Đồ Vượt Ải VinUni</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              10 Ải Chiến Thuật
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Vượt qua từng ải để mở khóa ải tiếp theo. Đạt đủ điều kiện để khiêu chiến Boss Ải số 10!
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500" />
            <span>Đã vượt qua</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shadow-sm shadow-indigo-500 animate-pulse" />
            <span>Đang mở</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-sm shadow-amber-400" />
            <span>Boss ải 👑</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            <span>Khóa 🔒</span>
          </div>
        </div>
      </div>

      {/* Stages Grid Adventure Layout */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-6 justify-items-center py-4">
        {stages.map((stage) => (
          <StageNode
            key={stage.id}
            stage={stage}
            onClick={handleStageClick}
          />
        ))}
      </div>

      {/* Stage Detail & Difficulty Modal */}
      <StageModal
        stage={activeModalStage}
        isOpen={activeModalStage !== null}
        onClose={() => setActiveModalStage(null)}
        onStartBattle={handleStartBattle}
      />
    </div>
  );
};
