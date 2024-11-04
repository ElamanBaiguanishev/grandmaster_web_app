import { Box, CardHeader, Avatar, Typography, Divider, CardMedia } from '@mui/material';
import { IOrder } from '../../types/order/order';
import { FC } from 'react';
import { staticUrl } from '../../api';
import React from 'react';

interface OrderDetailsProps {
    order: IOrder;
}

const OrderDetails: FC<OrderDetailsProps> = ({ order }) => (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1} mr={2}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{order.fio[0]}</Avatar>}
                title={`Заказ #${order.id}`}
                subheader={`Фио заказчика: ${order.fio || 'Не указан'}`}
            />
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1">
                    Телеграм: <a href={`https://t.me/${order.telegram_nickname}`} target="_blank" rel="noopener noreferrer">
                        {order.telegram_nickname}
                    </a>
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
                Семестр: {order.semester}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                Курс: {order.course}
            </Typography>
            <Divider />
            <Box display="flex" alignItems="center" mt={2} gap={5}>
                <Typography variant="body1" fontWeight="bold">
                    Сумма: {order.price}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {order.type}
                </Typography>
            </Box>
        </Box>

        {order.check && (
            <Box display="flex" alignItems="center">
                <a href={`${staticUrl}/${order.check}`} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                        component="img"
                        image={`${staticUrl}/${order.check}`}
                        alt="Чек"
                        sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
                    />
                </a>
            </Box>
        )}
    </Box>
);

export default React.memo(OrderDetails);
