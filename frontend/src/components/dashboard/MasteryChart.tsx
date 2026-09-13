import React from 'react';

interface MasteryChartProps {
  data: Record<string, number>;
}

export const MasteryChart: React.FC<MasteryChartProps> = ({ data }) => {
  return (
    <div className="space-y-3">
      {Object.entries(data).map(([skill, mastery]) => {
        const percent = Math.round(mastery * 100);
        return (
          <div key={skill} className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>{skill}</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  percent >= 75 ? 'bg-emerald-500' : percent >= 45 ? 'bg-amber-400' : 'bg-rose-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
