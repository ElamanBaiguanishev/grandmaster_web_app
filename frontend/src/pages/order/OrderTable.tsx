import { FC, useEffect, useState } from 'react';
import { Table, DataType } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import { IOrder } from '../../types/order/order';
import { OrderService } from '../../api/order.service';
import { Box, Button, TextField, Typography } from '@mui/material';
import { OrderStatus, statusColorMapMui, statusColorMapStd, statusTextMap } from '../../types/order/order-status';
import OrderForm from './OrderForm';
import { Link } from 'react-router-dom';

const OrderTable: FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Ошибка при загрузке заказов:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleEditOrder = (order: IOrder) => {
        setSelectedOrder(order);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedOrder(null);
        fetchOrders();
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <TextField
                label="Поиск"
                variant="outlined"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                fullWidth
                style={{ marginBottom: '16px' }}
            />

            <Table
                columns={[
                    { key: 'createdAt', title: 'Дата', dataType: DataType.Date, isSortable: true, isFilterable: false },
                    {
                        key: 'fio',
                        title: 'ФИО заказчика',
                        dataType: DataType.String,
                        isFilterable: true,
                        width: '20%', // Устанавливаем больше пространства для столбца FIO
                        style: {
                            whiteSpace: 'nowrap', // Отключаем перенос текста
                            overflow: 'hidden',   // Обрезаем текст, если он не помещается
                            textOverflow: 'ellipsis' // Добавляем многоточие для длинных строк
                        }
                    },
                    { key: 'type', title: 'Тип заказа', dataType: DataType.String, isFilterable: true },
                    {
                        key: 'price',
                        title: 'Цена, ₽',
                        dataType: DataType.Number,
                        sortDirection: SortDirection.Ascend, // По умолчанию сортируем по возрастанию
                        isSortable: true, // Убедитесь, что сортировка включена
                        isFilterable: false
                    },
                    { key: 'group', title: 'Группа', dataType: DataType.String, isFilterable: true },
                    { key: 'semester', title: 'Семестр', dataType: DataType.String, isFilterable: true },
                    { key: 'course', title: 'Курс', dataType: DataType.String, isFilterable: true },
                    { key: 'status', title: 'Статус', dataType: DataType.String, isFilterable: true },
                    { key: 'show-hide-details-row', isFilterable: false },
                ]}
                data={orders}
                sortingMode={SortingMode.Single}
                filteringMode={FilteringMode.HeaderFilter}
                format={({ column, value }) => {
                    if (column.dataType === DataType.Date) {
                        const date = new Date(value);
                        return date.toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        });
                    }
                    return value;
                }}

                search={({ searchText: searchTextValue, rowData, column }) => {
                    const key = column.key as keyof IOrder;
                    const value = rowData[key] ? rowData[key]?.toString().toLowerCase() : '';
                    const searchLower = searchTextValue.toLowerCase();
                    return value.includes(searchLower);
                }}
                searchText={searchText}

                rowKeyField={'id'}
                noData={{
                    text: 'No Data Found'
                }}

                paging={{
                    enabled: true,
                    pageSize: 7,
                    pageIndex: 0
                }}

                childComponents={{
                    cellText: {
                        content: (props) => {
                            if (props.column.key === 'status') {
                                const order = props.rowData as IOrder;
                                const buttonColor = statusColorMapMui[order.status];

                                return (
                                    <Box>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color={buttonColor}
                                            fullWidth
                                            sx={{ minWidth: 120 }} // Минимальная ширина кнопки
                                            onClick={() => handleEditOrder(order)}
                                        >
                                            {statusTextMap[order.status]}
                                        </Button>


                                        {order.status === OrderStatus.VERIFIED && order.verifiedByName && (
                                            <Typography variant="caption" display="block" align="center">
                                                Обработал: {order.verifiedByName}
                                            </Typography>
                                        )}
                                        {order.status === OrderStatus.CONFIRMED && order.confirmedByName && (
                                            <Typography variant="caption" display="block" align="center">
                                                Подтвердил: {order.confirmedByName}
                                            </Typography>
                                        )}
                                    </Box>
                                );
                            }

                            if (props.column.key === 'show-hide-details-row') {
                                return <Button component={Link}
                                    to={`/orders/${props.rowData.id}`} size="small" color="primary" variant="contained">Подробно
                                </Button>;
                            }
                        }
                    },
                    dataRow: {
                        elementAttributes: ({ rowData }) => ({
                            style: {
                                backgroundColor: statusColorMapStd[rowData.status]
                            }
                        })
                    }
                }}
            />
            {openForm && (
                <OrderForm
                    order={selectedOrder}
                    onClose={handleCloseForm}
                />
            )}
        </>
    );
};

export default OrderTable;
