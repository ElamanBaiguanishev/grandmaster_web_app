import { ILesson } from "../lesson/lesson";
import { ISemester } from "../semester/semester";

export interface IGroup {
    id: number;

    name: string;

    isVisible: boolean;

    semester: ISemester;

    lessons: ILesson[];

    createdAt: Date,

    updatedAt: Date,
}