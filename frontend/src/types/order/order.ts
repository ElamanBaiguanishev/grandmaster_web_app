import { IClient } from "../client/client";
import { OrderStatus } from "./order-status";
import { OrderTasks } from "./order-tasks";

export interface IOrder {
    id: number;

    client?: IClient | null;

    price: number;

    check: string;

    fio: string;

    type: string;

    telegram_user_id: string;

    telegram_nickname: string;

    group: string;

    semester: string;

    course: string;

    orderTasks: OrderTasks;

    status: OrderStatus;

    createdAt: Date;

    updatedAt: Date;

    // Новые поля для обработки заказа
    verifiedById?: number;
    verifiedByName?: string;
    verifiedDate?: Date;

    // Новые поля для подтверждения заказа
    confirmedById?: number;
    confirmedByName?: string;
    confirmedDate?: Date;
}