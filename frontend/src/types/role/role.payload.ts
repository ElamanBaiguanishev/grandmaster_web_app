import { RoleTypes } from "./role-types";

export interface IRolePayloadData {
    type: RoleTypes;
    
    name: string;

    semesters?: string[];
}
