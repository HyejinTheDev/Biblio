export type SkillStatus = 'weak' | 'average' | 'mastered' | 'ready_to_learn' | 'locked';

export interface SkillNodeData {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  difficulty: number;
  mastery_prob?: number;
  status: SkillStatus;
}

export interface KnowledgeGraphData {
  subject: string;
  title: string;
  skills: SkillNodeData[];
}
