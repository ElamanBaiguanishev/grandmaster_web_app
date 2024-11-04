import { IGroup } from "../group/group";
import { ITask } from "../task/task";

export interface ILesson {
    id: number;

    name: string;

    group: IGroup;

    tasks: ITask[];

    createdAt: Date;

    updatedAt: Date;
}