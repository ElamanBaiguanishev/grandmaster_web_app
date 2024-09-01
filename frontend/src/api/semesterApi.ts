// src/api/semesterApi.ts
import { ISemester } from "../types/group";
import api from "./axios.api";

export const getSemesters = async (): Promise<ISemester[]> => {
    const response = await api.get<ISemester[]>('/semesters');
    return response.data;
};

export const getSemesterById = async (id: number): Promise<ISemester> => {
    const response = await api.get<ISemester>(`/semesters/${id}`);
    return response.data;
};

export const createSemester = async (data: Omit<ISemester, 'id'>): Promise<ISemester> => {
    const response = await api.post<ISemester>('/semesters', data);
    return response.data;
};

export const updateSemester = async (id: number, data: Omit<ISemester, 'id'>): Promise<ISemester> => {
    const response = await api.put<ISemester>(`/semesters/${id}`, data);
    return response.data;
};

export const deleteSemester = async (id: number): Promise<void> => {
    await api.delete(`/semesters/${id}`);
};
