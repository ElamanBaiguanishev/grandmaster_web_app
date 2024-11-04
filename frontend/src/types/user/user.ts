import { IRole } from "../role/role";

export interface IUser {
    id: number;
  
    email: string;

    username: string;
  
    role: IRole;
}