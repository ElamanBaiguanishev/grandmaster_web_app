// src/api/courseApi.ts

import { ICourse } from "../types/group";
import api from "./axios.api";

export const getCourses = async (): Promise<ICourse[]> => {
  const response = await api.get<ICourse[]>('/courses');
  return response.data;
};

export const getCourseById = async (id: number): Promise<ICourse> => {
  const response = await api.get<ICourse>(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (data: Omit<ICourse, 'id'>): Promise<ICourse> => {
  const response = await api.post<ICourse>('/courses', data);
  return response.data;
};

export const updateCourse = async (id: number, data: Omit<ICourse, 'id'>): Promise<ICourse> => {
  const response = await api.put<ICourse>(`/courses/${id}`, data);
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/courses/${id}`);
};
