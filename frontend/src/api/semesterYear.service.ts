import { ISemesterByYear } from "../types/semester/semesterByYear";
import api from ".";

export const SemesterByYearService = {
  async getYearSemesters(): Promise<ISemesterByYear[]> {
    const { data } = await api.get<ISemesterByYear[]>('/semesters-by-year');
    return data;
  }
};

export interface ReportData {
    semester: string;
    specialty: string;
    totalStudents: number;
    ordered: number;
    percent: number;
    allKR: number;
}

export const getFirstReport = async (): Promise<any[]> => {
    const response = await api.get<any[]>('/semesters-by-year/first-report');
    return response.data
};