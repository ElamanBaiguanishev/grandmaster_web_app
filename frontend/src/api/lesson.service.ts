import { ILesson } from "../types/lesson/lesson";
import api from ".";
import { ILessonPayloadData } from "../types/lesson/lesson.payload";

export const LessonService = {
    async getLessonById(lessonId: number): Promise<ILesson> {
        const { data } = await api.get<ILesson>(`/lessons/${lessonId}`);
        return data;
    },

    async getLessonsByGroupId(groupId: number): Promise<ILesson[]> {
        const { data } = await api.get<ILesson[]>(`/lessons/by-group/${groupId}`);
        return data;
    },

    async createLesson(lessonData: ILessonPayloadData): Promise<ILesson> {
        const { data } = await api.post<ILesson>('/lessons', lessonData);
        return data;
    },

    async updateLesson(lessonId: number, lessonData: ILessonPayloadData): Promise<ILesson> {
        const { data } = await api.put<ILesson>(`/lessons/${lessonId}`, lessonData);
        return data;
    },

    async deleteLesson(lessonId: number): Promise<void> {
        await api.delete(`/lessons/${lessonId}`);
    }
};
