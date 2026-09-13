import React from 'react';

export const GraphLegend: React.FC = () => {
  return (
    <div className="flex items-center gap-4 p-3 bg-white/90 backdrop-blur rounded-lg border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
        <span>Yếu (&lt; 45%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
        <span>Trung bình (45% - 74%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
        <span>Đã vững (&ge; 75%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-indigo-300 inline-block" />
        <span>Sẵn sàng học tiếp</span>
      </div>
    </div>
  );
};
