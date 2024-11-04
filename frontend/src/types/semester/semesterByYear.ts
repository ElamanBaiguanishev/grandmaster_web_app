import { IClient } from "../client/client";
import { ICourse } from "../course/course";
import { IYear } from "../year/year";

export interface ISemesterByYear {
    id: number;

    name: string;

    year: IYear;

    course: ICourse;

    clients?: IClient[];

    createdAt?: Date,

    updatedAt?: Date,
}