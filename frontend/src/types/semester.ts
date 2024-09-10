import { ICourse } from "./course";
import { IGroup } from "./group";


export interface ISemester {
    id: number;
    name: string;
    course: ICourse;
    groups?: IGroup[];
}