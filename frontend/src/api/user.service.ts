import api from ".";
import { IUser } from "../types/user/user";

export const UserService = {
  async getUsers(): Promise<IUser[]> {
    const { data } = await api.get<IUser[]>(`/user`);
    return data;
  },
  async getUser(id: number): Promise<IUser> {
    const { data } = await api.get<IUser>(`/user/${id}`);
    return data;
  }
}