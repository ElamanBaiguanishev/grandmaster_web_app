import { IGroup } from "./group";
import { ITask } from "./task";

export interface ILesson {
    id: number;
    name: string;
    group?: IGroup;
    tasks: ITask[];
}