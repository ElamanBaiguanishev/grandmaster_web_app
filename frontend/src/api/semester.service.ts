import { ISemester } from "../types/semester/semester";
import api from ".";
import { ISemesterPayloadData } from "../types/semester/semester.payload";

export const SemesterService = {
    async getSemesters(): Promise<ISemester[]> {
        const { data } = await api.get<ISemester[]>('/semesters');
        return data;
    },

    async getSemesterNames(): Promise<string[]> {
        const { data } = await api.get<string[]>('/semesters/allnames');
        return data;
    },

    async getSemesterById(id: number): Promise<ISemester> {
        const { data } = await api.get<ISemester>(`/semesters/${id}`);
        return data;
    },

    async createSemester(semesterData: ISemesterPayloadData): Promise<ISemester> {
        const { data } = await api.post<ISemester>('/semesters', semesterData);
        return data;
    },

    async updateSemester(id: number, semesterData: ISemesterPayloadData): Promise<ISemester> {
        const { data } = await api.put<ISemester>(`/semesters/${id}`, semesterData);
        return data;
    },

    async deleteSemester(id: number): Promise<void> {
        await api.delete(`/semesters/${id}`);
    }
};
