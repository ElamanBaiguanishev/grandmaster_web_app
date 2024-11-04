import { IOrder } from "../order/order";
import { ISemesterByYear } from "../semester/semesterByYear";

export interface IClient {
    id: number;

    cipher: string;

    name: string;

    groupName: string;

    semester: ISemesterByYear;

    orders: IOrder[];

    phoneNumber?: string;

    login?: string;
    
    password?: string;
}
