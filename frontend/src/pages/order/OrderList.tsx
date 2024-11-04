import { FC, useEffect, useState } from 'react';
import { IOrder } from '../../types/order/order';
import { Grid, Paper, Box } from '@mui/material';
import OrderCard from './OrderCard';
import { OrderService } from '../../api/order.service';

const OrderList: FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {/* Левая колонка с заказами */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </Paper>
                </Grid>

                {/* Правая колонка - пока пустая */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, minHeight: '100%' }}>
                        {/* Здесь будет пустое пространство */}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderList;
