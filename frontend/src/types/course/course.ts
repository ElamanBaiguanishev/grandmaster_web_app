import { ISemester } from "../semester/semester";
import { IStudyMode } from "../study-mode/study-mode";

export interface ICourse {
    id: number;

    name: string;

    studyMode: IStudyMode;

    semesters: ISemester[];

    createdAt: Date,

    updatedAt: Date,
}