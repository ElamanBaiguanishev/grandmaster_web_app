import { ICourse } from "../course/course";

export interface IStudyMode {
    id: number;
    
    name: string;

    courses: ICourse[];

    createdAt: Date;
    
    updatedAt: Date;
}