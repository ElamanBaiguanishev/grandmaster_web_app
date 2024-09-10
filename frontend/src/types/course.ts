// course.interface.ts

import { ISemester } from "./semester";
import { IStudyMode } from "./study-mode";

export interface ICourse {
    id: number;
    name: string;
    studyMode?: IStudyMode;
    semesters?: ISemester[];
}