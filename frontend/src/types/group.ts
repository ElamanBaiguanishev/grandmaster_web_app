import { ILesson } from "./lesson";
import { ISemester } from "./semester";

export interface IGroup {
    id: number;
    name: string;
    semester: ISemester;
    lessons: ILesson[];
}