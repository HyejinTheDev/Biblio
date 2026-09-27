import { apiClient } from './client';
import { StudentState } from '../types/student';
import { AdventureMapData } from '../types/skill';

export const studentApi = {
  getStudentState: async (studentId: string): Promise<StudentState> => {
    const res = await apiClient.get<StudentState>(`/students/${studentId}/state`);
    return res.data;
  },

  getAdventureMap: async (studentId: string): Promise<AdventureMapData> => {
    const res = await apiClient.get<AdventureMapData>(`/students/${studentId}/adventure-map`);
    return res.data;
  },
};
