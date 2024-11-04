import { IYear } from "../types/year/year";
import api from ".";

export const YearService = {
  async getYears(): Promise<IYear[]> {
    const { data } = await api.get<IYear[]>('/years');
    return data;
  }
};
