import { IUser } from "../types/user/user";
import api from ".";
import { IUserRegPayloadData, IUserPayloadData } from "../types/user/user.payload";
import { IResponseUserData } from "../types/user/user.response";

export const AuthService = {
    async registration(
        userData: IUserRegPayloadData
    ): Promise<IResponseUserData | undefined> {
        const { data } = await api.post<IResponseUserData>('auth/registration', userData)
        return data
    },
    async login(
        userData: IUserPayloadData
    ): Promise<IResponseUserData | undefined> {
        const { data } = await api.post<IResponseUserData>('auth/login', userData)
        return data
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await api.get<IUser>('auth/profile')
        if (data) return data
    }
}