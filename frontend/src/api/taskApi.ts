import { ITask } from '../types/group';
import api from './axios.api';

export const getTasksByLessonId = async (lessonId: number): Promise<ITask[]> => {
    console.log(lessonId)
    const response = await api.get<ITask[]>(`/tasks/by-lesson/${lessonId}`);
    return response.data;
};

export const addTask = async (data: Omit<ITask, 'id'>): Promise<ITask> => {
    const response = await api.post<ITask>('/tasks', data);
    return response.data;
};

export const updateTask = async (id: number, data: Partial<Omit<ITask, 'id'>>): Promise<ITask> => {
    const response = await api.put<ITask>(`/tasks/${id}`, data);
    return response.data;
};
