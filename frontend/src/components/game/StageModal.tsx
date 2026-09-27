import React, { useState } from 'react';
import { StageNodeData, DifficultyTier } from '../../types/skill';

interface StageModalProps {
  stage: StageNodeData | null;
  isOpen: boolean;
  onClose: () => void;
  onStartBattle: (stage: StageNodeData, difficulty: DifficultyTier) => void;
}

export const StageModal: React.FC<StageModalProps> = ({
  stage,
  isOpen,
  onClose,
  onStartBattle,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyTier>('normal');

  if (!isOpen || !stage) return null;

  const difficultyOptions: {
    key: DifficultyTier;
    label: string;
    exp: number;
    stars: string;
    desc: string;
    color: string;
    border: string;
    bg: string;
  }[] = [
    {
      key: 'normal',
      label: 'Thường',
      exp: 50,
      stars: '⭐',
      desc: 'Câu hỏi trắc nghiệm kiến thức cốt lõi, công thức toán và định nghĩa cơ bản.',
      color: 'text-emerald-400',
      border: 'border-emerald-500/50',
      bg: 'hover:bg-emerald-950/30',
    },
    {
      key: 'hard',
      label: 'Trung Bình',
      exp: 100,
      stars: '⭐⭐',
      desc: 'Suy luận code Python/NumPy, tính đạo hàm ma trận, giải thích trade-off.',
      color: 'text-amber-400',
      border: 'border-amber-500/50',
      bg: 'hover:bg-amber-950/30',
    },
    {
      key: 'hell',
      label: 'Địa Ngục',
      exp: 250,
      stars: '⭐⭐⭐',
      desc: 'Phỏng vấn kỹ thuật VinUni/VinAI, bẫy tensor shape, tối ưu hóa bộ nhớ chuyên sâu.',
      color: 'text-rose-400',
      border: 'border-rose-500/50',
      bg: 'hover:bg-rose-950/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative text-white space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-black">
              Ải {stage.stage_code}
            </span>
            {stage.is_boss && (
              <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black animate-pulse">
                👑 BOSS TRẬN
              </span>
            )}
            {stage.stars_earned > 0 && (
              <span className="text-amber-400 text-xs font-bold">
                {'★'.repeat(stage.stars_earned)} Đã qua ải
              </span>
            )}
          </div>

          <h3 className="text-xl font-black text-white">{stage.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{stage.description}</p>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Chọn Độ Khó Thử Thách:
          </label>

          <div className="space-y-2">
            {difficultyOptions.map((opt) => {
              const isSelected = selectedDifficulty === opt.key;
              return (
                <div
                  key={opt.key}
                  onClick={() => setSelectedDifficulty(opt.key)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${opt.bg} ${
                    isSelected
                      ? `${opt.border} bg-slate-800/90 shadow-lg ring-1 ring-current`
                      : 'border-slate-800 bg-slate-900/50 opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black ${opt.color}`}>{opt.label}</span>
                      <span className="text-xs">{opt.stars}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-300">
                      +{opt.exp} EXP
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onStartBattle(stage, selectedDifficulty)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base shadow-xl shadow-indigo-600/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>⚔️ VÀO TRẬN CHIẾN</span>
            <span className="text-xs uppercase px-2 py-0.5 bg-black/30 rounded-md font-mono">
              {selectedDifficulty}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
