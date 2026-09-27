import { apiClient } from './client';
import { Question, SubmitAnswerPayload, SubmitAnswerResult } from '../types/question';

export const questionApi = {
  getQuestion: async (questionId: string): Promise<Question> => {
    const res = await apiClient.get<Question>(`/questions/${questionId}`);
    return res.data;
  },

  getQuestionsByStage: async (stageId: string, difficultyTier: string = 'normal'): Promise<Question[]> => {
    const res = await apiClient.get<Question[]>('/questions/by-stage', {
      params: {
        stage_id: stageId,
        difficulty_tier: difficultyTier,
      },
    });
    return res.data;
  },

  submitAnswer: async (payload: SubmitAnswerPayload): Promise<SubmitAnswerResult> => {
    const res = await apiClient.post<SubmitAnswerResult>('/questions/submit', payload);
    return res.data;
  },
};
