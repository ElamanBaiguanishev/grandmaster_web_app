export interface IUserPayloadData {
    email: string;
    
    password: string;
}

export interface IUserRegPayloadData {
    email: string;

    password: string;

    username: string;

    roleId: number;
}
