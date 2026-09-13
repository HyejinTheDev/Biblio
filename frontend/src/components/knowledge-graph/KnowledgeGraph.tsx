import React from 'react';
import { SkillNodeData } from '../../types/skill';
import { SkillNode } from './SkillNode';
import { GraphLegend } from './GraphLegend';

interface KnowledgeGraphProps {
  skills: SkillNodeData[];
  selectedSkillId?: string;
  onSelectSkill?: (skill: SkillNodeData) => void;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  skills,
  selectedSkillId,
  onSelectSkill,
}) => {
  return (
    <div className="relative w-full h-full min-h-[420px] bg-slate-50/50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-800">Bản đồ kiến thức thích ứng</h3>
        <GraphLegend />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
        {skills.map((skill) => (
          <SkillNode
            key={skill.id}
            skill={skill}
            isSelected={skill.id === selectedSkillId}
            onClick={onSelectSkill}
          />
        ))}
      </div>

      <div className="text-center text-xs text-slate-400 mt-4">
        Các mũi tên tiên quyết và node được cập nhật real-time theo mô hình BKT
      </div>
    </div>
  );
};
