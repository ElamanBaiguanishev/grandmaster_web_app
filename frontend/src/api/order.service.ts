import { IOrder } from '../types/order/order';
import api from '.';
import { IOrderVerifyingPayloadData, IOrderPayloadData, IOrderConfirmingPayloadData } from '../types/order/order.payload';

export const OrderService = {
    async getOrders(): Promise<IOrder[]> {
        const { data } = await api.get<IOrder[]>('/orders');
        return data;
    },

    async getOrderById(id: number): Promise<IOrder> {
        const { data } = await api.get<IOrder>(`/orders/${id}`);
        return data;
    },

    async createOrder(orderData: IOrderPayloadData): Promise<IOrder> {
        const { data } = await api.post<IOrder>('/orders', orderData);
        return data;
    },

    async updateOrder(id: number, orderData: Partial<IOrderPayloadData>): Promise<IOrder> {
        const { data } = await api.patch<IOrder>(`/orders/${id}`, orderData);
        return data;
    },

    async verifyingOrder(id: number, verifyingData: IOrderVerifyingPayloadData): Promise<IOrder> {
        const { data } = await api.patch<IOrder>(`/orders/verifying/${id}`, verifyingData);
        return data;
    },

    async confirmingOrder(id: number, confirmingData: IOrderConfirmingPayloadData): Promise<IOrder> {
        const { data } = await api.patch<IOrder>(`/orders/confirming/${id}`, confirmingData);
        return data;
    },

    async deleteOrder(id: number): Promise<void> {
        await api.delete(`/orders/${id}`);
    }
};
