import { IUser } from "./user"

export interface IResponseUser {
    email: string;

    id: number;

    createdAt: string;

    updateAt: string;

    password: string;
}

export interface IResponseUserData extends IUser {
    token: string;
}