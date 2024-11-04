import { ISemesterByYear } from "../semester/semesterByYear";

export interface IYear {
    id: number;

    name: string;

    semesters: ISemesterByYear[];

    createdAt: Date;
    
    updatedAt: Date;
}