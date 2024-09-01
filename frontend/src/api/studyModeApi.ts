// src/api/studyModeApi.ts

import { IStudyMode } from "../types/group";
import api from "./axios.api";


export const getStudyModes = async (): Promise<IStudyMode[]> => {
  const response = await api.get<IStudyMode[]>('/studymodes');
  return response.data;
};

export const getStudyModeById = async (id: number): Promise<IStudyMode> => {
  const response = await api.get<IStudyMode>(`/studymodes/${id}`);
  return response.data;
};

export const createStudyMode = async (data: Omit<IStudyMode, 'id'>): Promise<IStudyMode> => {
  const response = await api.post<IStudyMode>('/studymodes', data);
  return response.data;
};

export const updateStudyMode = async (id: number, data: Omit<IStudyMode, 'id'>): Promise<IStudyMode> => {
  const response = await api.put<IStudyMode>(`/studymodes/${id}`, data);
  return response.data;
};

export const deleteStudyMode = async (id: number): Promise<void> => {
  await api.delete(`/studymodes/${id}`);
};
