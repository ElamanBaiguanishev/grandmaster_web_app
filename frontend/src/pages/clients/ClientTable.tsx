import { FC, useState, useEffect } from 'react';
import { Table, DataType } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import { Button, TextField } from '@mui/material';
import { ClientService } from '../../api/client.service';
import { IClient } from '../../types/client/client';
import { toast } from 'react-toastify';

const ClientTable: FC = () => {
    const [clients, setClients] = useState<IClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await ClientService.getClients();
                setClients(data);
            } catch (err: any) {
                const error = err.response?.data.message;
                toast.error(error.toString())
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

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
                    { key: 'cipher', title: 'Учебный Шифр', dataType: DataType.String },
                    {
                        key: 'name', title: 'ФИО студента', dataType: DataType.String, width: '20%', // Устанавливаем больше пространства для столбца FIO
                        style: {
                            whiteSpace: 'nowrap', // Отключаем перенос текста
                            overflow: 'hidden',   // Обрезаем текст, если он не помещается
                            textOverflow: 'ellipsis' // Добавляем многоточие для длинных строк
                        }
                    },
                    {
                        key: 'groupName',
                        title: 'Группа',
                        dataType: DataType.String,
                        sortDirection: SortDirection.Ascend,
                        isSortable: true,
                    },
                    {
                        key: 'semester',
                        title: 'Семестр',
                        dataType: DataType.String,
                        sortDirection: SortDirection.Ascend,
                        isSortable: true,
                        filter: (_, filterValue, rowData) => {
                            return rowData.semester.name.toLowerCase().includes(filterValue.toLowerCase());
                        },
                        headerFilterListItems: ({ data }) => {
                            const semesters = Array.from(new Set(data!.map((item) => item.semester.name)));
                            return semesters;
                        }
                    },
                    {
                        key: 'orders',
                        title: 'Заказы',
                        dataType: DataType.String,
                        isFilterable: false,
                        style: { textAlign: 'center' }
                    },
                ]}
                paging={{
                    enabled: true,
                    pageSize: 10,
                    pageIndex: 0
                }}
                data={clients}
                noData={{
                    text: 'No Data Found'
                }}
                searchText={searchText}
                rowKeyField={'id'}
                filteringMode={FilteringMode.HeaderFilter}
                sortingMode={SortingMode.Single}

                childComponents={{
                    cellText: {
                        content: (props) => {
                            if (props.column.key === 'semester') {
                                return <>{props.rowData.semester.name}</>;
                            }
                            if (props.column.key === 'orders') {
                                return <Button size="small" color="primary" variant="contained">КНОПКА</Button>;
                            }
                        }
                    }
                }}
            />
        </>
    );
};

export default ClientTable;
