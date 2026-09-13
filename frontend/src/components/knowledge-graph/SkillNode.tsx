import React from 'react';
import { SkillNodeData } from '../../types/skill';

interface SkillNodeProps {
  skill: SkillNodeData;
  isSelected?: boolean;
  onClick?: (skill: SkillNodeData) => void;
}

export const SkillNode: React.FC<SkillNodeProps> = ({ skill, isSelected, onClick }) => {
  const getStatusColor = () => {
    switch (skill.status) {
      case 'mastered':
        return 'border-emerald-500 bg-emerald-50 text-emerald-900';
      case 'average':
        return 'border-amber-400 bg-amber-50 text-amber-900';
      case 'weak':
        return 'border-rose-500 bg-rose-50 text-rose-900';
      case 'ready_to_learn':
        return 'border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-300';
      default:
        return 'border-slate-300 bg-slate-50 text-slate-700';
    }
  };

  const masteryPercent = skill.mastery_prob !== undefined ? Math.round(skill.mastery_prob * 100) : 0;

  return (
    <div
      onClick={() => onClick && onClick(skill)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${getStatusColor()} ${
        isSelected ? 'ring-2 ring-slate-800 scale-105' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <h4 className="font-semibold text-sm line-clamp-1">{skill.name}</h4>
        <span className="text-xs font-mono font-bold">{masteryPercent}%</span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-2">{skill.description}</p>
    </div>
  );
};
