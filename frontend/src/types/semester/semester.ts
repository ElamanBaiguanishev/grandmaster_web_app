import { ICourse } from "../course/course";
import { IGroup } from "../group/group";


export interface ISemester {
    id: number;
    
    name: string;

    course: ICourse;

    groups: IGroup[]; 

    createdAt: Date;
    
    updatedAt: Date;
}