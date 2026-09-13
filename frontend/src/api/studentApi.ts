import { apiClient } from './client';
import { StudentState } from '../types/student';

export const studentApi = {
  getStudentState: async (studentId: string): Promise<StudentState> => {
    const res = await apiClient.get<StudentState>(`/students/${studentId}/state`);
    return res.data;
  },
};
