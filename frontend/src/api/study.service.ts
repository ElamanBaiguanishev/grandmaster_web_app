import { IStudyMode } from "../types/study-mode/study-mode";
import api from ".";
import { IStudyModePayloadData } from "../types/study-mode/study-mode.payload";

export const StudyModeService = {
  async getStudyModes(): Promise<IStudyMode[]> {
    const { data } = await api.get<IStudyMode[]>('/studymodes');
    return data;
  },

  async getStudyModeById(id: number): Promise<IStudyMode> {
    const { data } = await api.get<IStudyMode>(`/studymodes/${id}`);
    return data;
  },

  async createStudyMode(studyModeData: IStudyModePayloadData): Promise<IStudyMode> {
    const { data } = await api.post<IStudyMode>('/studymodes', studyModeData);
    return data;
  },

  async updateStudyMode(id: number, studyModeData: IStudyModePayloadData): Promise<IStudyMode> {
    const { data } = await api.put<IStudyMode>(`/studymodes/${id}`, studyModeData);
    return data;
  },

  async deleteStudyMode(id: number): Promise<void> {
    await api.delete(`/studymodes/${id}`);
  }
};
