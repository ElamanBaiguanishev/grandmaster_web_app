import { IRole } from "../types/role/role";
import api from ".";
import { IRolePayloadData } from "../types/role/role.payload";

export const RoleService = {
  async getRoles(): Promise<IRole[]> {
    const { data } = await api.get<IRole[]>('/roles');
    return data;
  },

  async createRole(roleData: IRolePayloadData): Promise<IRole> {
    const { data } = await api.post<IRole>('/roles', roleData);
    return data;
  }
};
