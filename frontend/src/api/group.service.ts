import { IGroup } from "../types/group/group";
import api from ".";
import { IGroupPayloadData } from "../types/group/group.payload";

export const GroupService = {
    async getGroups(): Promise<IGroup[]> {
        const { data } = await api.get<IGroup[]>('/groups');
        return data;
    },

    async getGroupById(groupId: number): Promise<IGroup> {
        const { data } = await api.get<IGroup>(`/groups/${groupId}`);
        return data;
    },

    async getGroupsBySemesterId(semesterId: number): Promise<IGroup[]> {
        const { data } = await api.get<IGroup[]>(`/groups/by-semester/${semesterId}`);
        return data;
    },

    async createGroup(groupData: IGroupPayloadData): Promise<IGroup> {
        const { data } = await api.post<IGroup>('/groups', groupData);
        return data;
    },

    async toggleVisibility(groupId: number, isVisible: boolean): Promise<IGroup> {
        const { data } = await api.patch<IGroup>(`/groups/visible/${groupId}`, { isVisible });
        return data;
    },

    async updateGroup(groupId: number, groupData: IGroupPayloadData): Promise<IGroup> {
        const { data } = await api.put<IGroup>(`/groups/${groupId}`, groupData);
        return data;
    },

    async deleteGroup(groupId: number): Promise<void> {
        await api.delete(`/groups/${groupId}`);
    }
};
