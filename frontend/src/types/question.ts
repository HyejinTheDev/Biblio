export interface Question {
  id: string;
  skill_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  difficulty: number;
}

export interface SubmitAnswerPayload {
  student_id: string;
  question_id: string;
  selected_option: string;
  response_time_sec?: number;
}

export interface SubmitAnswerResult {
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
  skill_id: string;
  new_mastery: number;
  status_changed: string;
}
