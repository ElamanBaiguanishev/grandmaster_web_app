import { IGroup } from "../types/group";
import api from "./axios.api";

// Пример API-запроса
export const getGroupsBySemesterId = async (semesterId: number): Promise<IGroup[]> => {
    const response = await api.get<IGroup[]>(`/groups/by-semester/${semesterId}`);
    return response.data;
};
