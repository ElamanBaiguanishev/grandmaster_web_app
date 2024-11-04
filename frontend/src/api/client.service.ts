import { IClient } from "../types/client/client";
import api from ".";
import { IClientPayloadData } from "../types/client/client.payload";

export const ClientService = {
  async createClient(
    clientData: IClientPayloadData
  ): Promise<IClient> {
    const { data } = await api.post('/clients', clientData);
    return data;
  },
  async getClients(): Promise<IClient[]> {
    const { data } = await api.get<IClient[]>('/clients');
    return data;
  }
}