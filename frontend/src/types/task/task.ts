import { ILesson } from "../lesson/lesson";

export interface ITask {
    id: number;
    
    type: string;

    price: number;

    lesson: ILesson;

    createdAt: Date;
    
    updatedAt: Date;
}