import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IOrder } from '../../types/order/order';
import { CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { staticUrl } from '../../api';
import { ILesson } from '../../types/lesson/lesson';
import { OrderService } from '../../api/order.service';

const OrderPage: FC = () => {
    const { order_id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [lessons, setLessons] = useState<ILesson[]>([]);

    const fetchOrderWithTasks = async (order_id: number) => {
        try {
            setLoading(true);
            const orderData = await OrderService.getOrderById(order_id);
            setOrder(orderData);
            if (orderData.orderTasks && orderData.orderTasks.lessons) {
                setLessons(orderData.orderTasks.lessons);
            }
        } catch (error) {
            console.error('Error fetching order or tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (order_id) {
            fetchOrderWithTasks(+order_id);
        }
    }, [order_id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!order) {
        return <Typography variant="body1">Данные не найдены</Typography>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Заказ #{order.id}
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6">Информация о заказе:</Typography>
                <Typography variant="body1">ФИО: {order.fio}</Typography>
                <Typography variant="body1">Telegram ID: {order.telegram_user_id}</Typography>
                <Typography variant="body1">
                    Телеграм: <a href={`https://t.me/${order.telegram_nickname}`} target="_blank" rel="noopener noreferrer">
                        {order.telegram_nickname}
                    </a>
                </Typography>
                <Typography variant="body1">Группа: {order.group}</Typography>
                <Typography variant="body1">Сумма: {order.price} ₽</Typography>
                {order.check && (
                    <Typography variant="body1">Чек: <a href={`${staticUrl}/${order.check}`} target="_blank" rel="noopener noreferrer">Просмотреть чек</a></Typography>
                )}
            </Box>
            <Typography variant="h6" gutterBottom>
                {order.type}:
            </Typography>
            {lessons.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Предмет</TableCell>
                                <TableCell>Задача</TableCell>
                                <TableCell>Цена</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lessons.map((lesson) =>
                                lesson.tasks!.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            {lesson.name}
                                        </TableCell>
                                        <TableCell>
                                            {task.type}
                                        </TableCell>
                                        <TableCell>
                                            {task.price} ₽
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1">Уроки или задачи для этого заказа не найдены.</Typography>
            )}
        </Box>
    );
}

export default OrderPage;
