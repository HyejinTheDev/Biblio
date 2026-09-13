import { apiClient } from './client';
import { Question, SubmitAnswerPayload, SubmitAnswerResult } from '../types/question';

export const questionApi = {
  getQuestion: async (questionId: string): Promise<Question> => {
    const res = await apiClient.get<Question>(`/questions/${questionId}`);
    return res.data;
  },

  submitAnswer: async (payload: SubmitAnswerPayload): Promise<SubmitAnswerResult> => {
    const res = await apiClient.post<SubmitAnswerResult>('/questions/submit', payload);
    return res.data;
  },
};
