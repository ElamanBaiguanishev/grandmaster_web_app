export interface IUser {
    id: number
    email: string

    name: string
    
    token: string
    image: string
}

export interface IUserData {
    name?: string
    email: string
    password: string
}

export interface IResponseUser {
    email: string
    id: number
    createdAt: string
    updateAt: string
    password: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}