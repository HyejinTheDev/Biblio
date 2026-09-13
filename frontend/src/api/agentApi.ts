import { apiClient } from './client';

export interface AgentRecommendationPayload {
  student_id: string;
  skill_id: string;
  is_correct: boolean;
  new_mastery: number;
  root_weakness_id?: string;
}

export const agentApi = {
  getAdvice: async (payload: AgentRecommendationPayload): Promise<{ advice: string }> => {
    const res = await apiClient.post<{ advice: string }>('/agent/recommend', payload);
    return res.data;
  },
};
