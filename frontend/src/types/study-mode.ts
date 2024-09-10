import { ICourse } from "./course";

export interface IStudyMode {
    id: number;
    name: string;
    courses?: ICourse[];
}