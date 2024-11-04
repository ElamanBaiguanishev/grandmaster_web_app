import { FC, useState } from 'react';
import { IOrder } from '../../types/order/order';
import { Typography, Card, CardContent, Avatar, Box, Button, CardActions, CardHeader, Divider, CardMedia, TextField } from '@mui/material';
import { Group, AttachMoney } from '@mui/icons-material';
import { staticUrl } from '../../api';
import { Link } from "react-router-dom";


interface OrderCardProps {
    order?: IOrder | null;
}

const OrderCard: FC<OrderCardProps> = ({ order }) => {
    const [clientId, setClientId] = useState('');
    const handleClientIdChange = (event: any) => {
        setClientId(event.target.value);
    };

    const handleClientIdSubmit = () => {
        // Обработка clientId, например, отправка запроса или другая логика
        alert(`Submitted clientId: ${clientId}`);
    };

    if (!order) {
        return <Typography variant="body1">Данные не найдены</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{order.fio[0]}</Avatar>}
                title={`Заказ #${order.id}`}
                subheader={`Клиент: ${order.fio || 'Не указан'}`}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    {/* Левая часть: информация о заказе */}
                    <Box flex={1} mr={2}>
                        <Box display="flex" alignItems="center" mb={2}>
                            {/* <Telegram color="primary" sx={{ mr: 1 }} /> */}
                            <Typography variant="body1">
                                Телеграм: <a href={`https://t.me/${order.telegram_nickname}`} target="_blank" rel="noopener noreferrer">
                                    {order.telegram_nickname}
                                </a>
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Group color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body1">
                                Группа: {order.group}
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" mb={1}>
                            Семестр: {order.semester}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Курс: {order.course}
                        </Typography>
                        <Divider />
                        <Box display="flex" alignItems="center" mt={2}>
                            <AttachMoney color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body1" fontWeight="bold">
                                Сумма: {order.price} ₽
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
            </CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <CardActions sx={{ flex: 1 }}>
                    <TextField
                        label="Client ID"
                        value={clientId}
                        onChange={handleClientIdChange}
                        size="small"
                        variant="outlined"
                        fullWidth
                    />
                    <Button
                        onClick={handleClientIdSubmit}
                        size="small"
                        color="primary"
                        variant="contained"
                        sx={{ ml: 2 }}
                    >
                        Submit Client ID
                    </Button>
                </CardActions>
                <CardActions sx={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        component={Link}
                        to={`/orders/${order.id}`} // Указываем полный путь для перехода
                        size="small"
                        color="primary"
                        variant="contained"
                    >
                        Посмотреть детали
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default OrderCard;
