import { ITask } from '../types/task/task';
import api from '.';
import { ITaskPayloadData } from '../types/task/task.payload';

export const TaskService = {
    async getTasksByLessonId(lessonId: number): Promise<ITask[]> {
        const { data } = await api.get<ITask[]>(`/tasks/by-lesson/${lessonId}`);
        return data;
    },

    async getTasks(): Promise<ITask[]> {
        const { data } = await api.get<ITask[]>('/tasks');
        return data;
    },

    async getTasksByIds(taskIds: number[]): Promise<ITask[]> {
        const { data } = await api.post('/tasks/by-ids', { taskIds });
        return data;
    },

    async createTask(taskData: ITaskPayloadData): Promise<ITask> {
        const { data } = await api.post<ITask>('/tasks', taskData);
        return data;
    },

    async updateTask(id: number, taskData: Partial<ITaskPayloadData>): Promise<ITask> {
        const { data } = await api.patch<ITask>(`/tasks/${id}`, taskData);
        return data;
    },

    async deleteTask(taskId: number): Promise<void> {
        await api.delete(`/tasks/${taskId}`);
    }
};
