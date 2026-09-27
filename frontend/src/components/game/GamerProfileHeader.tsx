import React from 'react';
import { GamerProfileData } from '../../types/skill';

interface GamerProfileHeaderProps {
  profile: GamerProfileData;
  overallProgress: number;
}

export const GamerProfileHeader: React.FC<GamerProfileHeaderProps> = ({
  profile,
  overallProgress,
}) => {
  const currentExpInLevel = profile.exp % 500;
  const expPercent = Math.min(100, Math.round((currentExpInLevel / 500) * 100));

  const getRankTitle = (level: number) => {
    if (level >= 10) return 'Archmage of AI';
    if (level >= 7) return 'Deep Learning Master';
    if (level >= 4) return 'ML Practitioner';
    if (level >= 2) return 'Python Explorer';
    return 'Tân Binh VinUni AI';
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl text-white">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Left: Avatar & Rank */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl font-black">
                🤖
              </div>
            </div>
            <span className="absolute -bottom-2 -right-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-full shadow-md">
              Lv.{profile.level}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">{profile.name}</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {getRankTitle(profile.level)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Mục tiêu: Đỗ Chương Trình AI Thực Chiến VinUni 🎯</p>
          </div>
        </div>

        {/* Center: EXP Progress */}
        <div className="w-full lg:w-72 space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">Tiến độ Cấp độ {profile.level}</span>
            <span className="text-indigo-400 font-mono">
              {currentExpInLevel} / 500 EXP
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 shadow-sm shadow-indigo-500"
              style={{ width: `${expPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Badges, Stars & Streak */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
          {/* Stars */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
            <span className="text-amber-400 text-lg">⭐</span>
            <div>
              <div className="text-sm font-bold text-white leading-none">{profile.total_stars}</div>
              <div className="text-[10px] text-slate-400 font-medium">Sao tích lũy</div>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
            <span className="text-orange-500 text-lg">🔥</span>
            <div>
              <div className="text-sm font-bold text-white leading-none">{profile.streak_days} Ngày</div>
              <div className="text-[10px] text-slate-400 font-medium">Chuỗi học</div>
            </div>
          </div>

          {/* Overall Completion */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
            <span className="text-emerald-400 text-lg">🏆</span>
            <div>
              <div className="text-sm font-bold text-emerald-400 leading-none">{overallProgress}%</div>
              <div className="text-[10px] text-slate-400 font-medium">Toàn khóa AI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
