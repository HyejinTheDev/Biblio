import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label = 'Tiến độ tổng thể' }) => {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-sm font-medium text-slate-700 mb-2">
        <span>{label}</span>
        <span className="font-mono text-indigo-600">{clampedProgress}%</span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
