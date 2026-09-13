import { useState, useEffect, useCallback } from 'react';
import { studentApi } from '../api/studentApi';
import { StudentState } from '../types/student';

export const useStudentState = (studentId: string) => {
  const [state, setState] = useState<StudentState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentApi.getStudentState(studentId);
      setState(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi tải trạng thái học sinh');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return { state, loading, error, refresh: fetchState };
};
