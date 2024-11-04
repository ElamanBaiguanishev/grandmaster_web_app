import { FC, useEffect, useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, CardActions, Typography } from '@mui/material';
import { IOrder } from '../../types/order/order';
import { debounce } from 'lodash';
import api from '../../api';
import { IClient } from '../../types/client/client';
import OrderDetails from './OrderDetails';
import ClientSearch from './ClientSearch';
import { OrderStatus } from '../../types/order/order-status';
import { OrderService } from '../../api/order.service';
import { useAppSelector } from '../../store/hooks';

interface OrderFormProps {
    order: IOrder | null;
    onClose: () => void;
}

const OrderForm: FC<OrderFormProps> = ({ order, onClose }) => {
    const [clients, setClients] = useState<IClient[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
    const [openMismatchDialog, setOpenMismatchDialog] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user.user);


    const fetchClients = useCallback(debounce(async (query: string) => {
        setLoading(true);
        try {
            const response = await api.get<IClient[]>(`/clients/search`, { params: { fio: query } });
            setClients(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке клиентов:", error);
        } finally {
            setLoading(false);
        }
    }, 500), []);

    useEffect(() => {
        if (searchQuery) fetchClients(searchQuery);
        else setClients([]);
    }, [searchQuery, fetchClients]);

    const handleSubmit = async () => {
        if (order && selectedClient) {
            const isFioMatch = order.fio === selectedClient.name;
            const isGroupMatch = order.group === selectedClient.groupName;

            if (!isFioMatch || !isGroupMatch) {
                // Открываем диалоговое окно, если ФИО или группа не совпадают
                setOpenMismatchDialog(true);
                return;
            }

            // Если совпадают, обновляем заказ
            await OrderService.verifyingOrder(order.id, {
                cipher: selectedClient.cipher,
                verifiedById: user!.id,
                verifiedByName: user!.username,
                verifiedDate: new Date()
            });
            onClose();
        }
    };

    const handleConfirmMismatch = async () => {
        if (order && selectedClient) {
            // Обновляем заказ несмотря на несовпадение
            await OrderService.verifyingOrder(order.id, {
                cipher: selectedClient.cipher,
                verifiedById: user!.id,
                verifiedByName: user!.username,
                verifiedDate: new Date()
            });
        }
        setOpenMismatchDialog(false);
        onClose();
    };

    const handleClientChange = (newClient: IClient | null) => {
        setSelectedClient(newClient);
    };

    const handleTakeOrderInProgress = async () => {
        if (order) {
            await OrderService.confirmingOrder(order.id, {
                confirmedById: user!.id,
                confirmedByName: user!.username,
                confirmedDate: new Date()
            })
            onClose();
        }
    };

    if (!order) {
        return (
            <Dialog open onClose={onClose}>
                <Typography variant="body1">Данные не найдены</Typography>
            </Dialog>
        );
    }

    return (
        <Dialog open={!!order} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ p: 1 }}>
                <OrderDetails order={order} />
                <Box>
                    {order.status === OrderStatus.NEW || order.status === OrderStatus.PENDING ? (
                        <Box>
                            <ClientSearch
                                clients={clients}
                                loading={loading}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                selectedClient={selectedClient}
                                onClientChange={handleClientChange}
                            />
                            <CardActions>
                                <Button onClick={handleSubmit} variant="contained" color="primary">
                                    Подтвердить ШИФР
                                </Button>
                            </CardActions>
                        </Box>
                    ) : order.status === OrderStatus.VERIFIED ? (
                        <CardActions>
                            <Button onClick={handleTakeOrderInProgress} variant="contained" color="secondary">
                                Взять в работу
                            </Button>
                        </CardActions>
                    ) : (order.client && (
                        <Box>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                Фио клиента: {order.client.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                Группа: {order.client.groupName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                Шифр: {order.client.cipher}
                            </Typography>
                        </Box>
                    )
                    )}
                </Box>

                <Dialog
                    open={openMismatchDialog}
                    onClose={() => setOpenMismatchDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Несовпадение данных</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ФИО или группа клиента не совпадают с заказом. Вы уверены, что хотите продолжить?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenMismatchDialog(false)} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={handleConfirmMismatch} color="primary" autoFocus>
                            Подтвердить
                        </Button>
                    </DialogActions>
                </Dialog>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} size="small" color="primary" variant="contained">
                        Закрыть
                    </Button>
                </CardActions>
            </Box>
        </Dialog>
    );
};

export default OrderForm;
