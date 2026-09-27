export type DifficultyTier = 'normal' | 'hard' | 'hell';
export type StageStatus = 'locked' | 'active' | 'cleared';
export type SkillStatus = 'weak' | 'average' | 'mastered' | 'ready_to_learn' | 'locked' | 'active' | 'cleared';

export interface StageNodeData {
  id: string;
  stage_code: string;
  phase_id: string;
  name: string;
  description: string;
  prerequisites: string[];
  is_boss: boolean;
  mastery_prob: number;
  stars_earned: number;
  status: StageStatus;
  highest_difficulty: string;
}

export interface PhaseData {
  id: string;
  number: number;
  title: string;
  description: string;
  stages: StageNodeData[];
  phase_progress: number;
}

export interface GamerProfileData {
  student_id: string;
  name: string;
  level: number;
  exp: number;
  next_level_exp: number;
  streak_days: number;
  total_stars: number;
}

export interface AdventureMapData {
  subject: string;
  title: string;
  description: string;
  gamer_profile: GamerProfileData;
  phases: PhaseData[];
  overall_progress: number;
}

// Backward compatibility
export interface SkillNodeData extends Omit<StageNodeData, 'status'> {
  status: SkillStatus;
  difficulty?: number;
}
export interface KnowledgeGraphData {
  subject: string;
  title: string;
  skills: SkillNodeData[];
}
