import { ILesson } from "../lesson/lesson";

export interface OrderTasks {
    id: number;
    
    lessons: ILesson[];
}