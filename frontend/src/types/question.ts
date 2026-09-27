export type DifficultyTier = 'normal' | 'hard' | 'hell';

export interface Question {
  id: string;
  stage_id: string;
  difficulty_tier?: DifficultyTier;
  question_title?: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  exp_reward?: number;
  skill_id?: string;
  difficulty?: number;
}

export interface SubmitAnswerPayload {
  student_id: string;
  question_id: string;
  selected_option: string;
  response_time_sec?: number;
  difficulty_tier?: DifficultyTier;
}

export interface SubmitAnswerResult {
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
  stage_id: string;
  skill_id?: string;
  new_mastery: number;
  status_changed: string;
  exp_gained: number;
  stars_earned: number;
  recommended_message?: string;
}
