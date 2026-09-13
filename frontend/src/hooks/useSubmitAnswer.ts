import { useState } from 'react';
import { questionApi } from '../api/questionApi';
import { SubmitAnswerPayload, SubmitAnswerResult } from '../types/question';

export const useSubmitAnswer = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<SubmitAnswerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: SubmitAnswerPayload) => {
    try {
      setSubmitting(true);
      setError(null);
      const res = await questionApi.submitAnswer(payload);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err.message || 'Lỗi gửi câu trả lời');
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { submit, submitting, result, error, reset };
};
