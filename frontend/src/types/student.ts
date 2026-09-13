export interface StudentProfile {
  id: string;
  name: string;
  grade: number;
}

export interface StudentState {
  student_id: string;
  name: string;
  mastery_map: Record<string, number>;
  overall_progress: number;
  recommended_skill_id?: string;
  recommended_reason?: string;
}
