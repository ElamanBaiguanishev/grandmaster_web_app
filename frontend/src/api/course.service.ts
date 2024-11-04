import { ICourse } from "../types/course/course";
import api from ".";
import { ICoursePayloadData } from "../types/course/course.payload";

export const CourseService = {
  async getCourses(): Promise<ICourse[]> {
    const { data } = await api.get<ICourse[]>('/courses');
    return data;
  },

  async getCourseById(id: number): Promise<ICourse> {
    const { data } = await api.get<ICourse>(`/courses/${id}`);
    return data;
  },

  async createCourse(courseData: ICoursePayloadData): Promise<ICourse> {
    const { data } = await api.post<ICourse>('/courses', courseData);
    return data;
  },

  async updateCourse(id: number, courseData: ICoursePayloadData): Promise<ICourse> {
    const { data } = await api.put<ICourse>(`/courses/${id}`, courseData);
    return data;
  },

  async deleteCourse(id: number): Promise<void> {
    await api.delete(`/courses/${id}`);
  }
};
