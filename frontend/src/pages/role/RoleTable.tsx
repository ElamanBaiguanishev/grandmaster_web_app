import { FC, useEffect, useState } from 'react';
import { Table, DataType } from 'ka-table';
import { FilteringMode, SortingMode } from 'ka-table/enums';
import { IRole } from '../../types/role/role';
import { RoleService } from '../../api/role.service';
import { TextField } from '@mui/material';

const RoleTable: FC = () => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchRoles = async () => {
        try {
            const data = await RoleService.getRoles();
            setRoles(data);
        } catch (error) {
            console.error('Ошибка при загрузке ролей:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
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
                    { key: 'id', title: 'ID', dataType: DataType.Number, isSortable: true },
                    { key: 'type', title: 'Тип', dataType: DataType.String, isFilterable: true },
                    { key: 'name', title: 'Название роли', dataType: DataType.String, isFilterable: true },
                    {
                        key: 'semesters',
                        title: 'Семестры',
                        dataType: DataType.String,
                        isFilterable: true,
                        // format: ({ value }) => (value as string[]).join(', '), // Преобразование массива семестров в строку
                    }
                ]}
                data={roles}
                sortingMode={SortingMode.Single}
                filteringMode={FilteringMode.HeaderFilter}
                search={({ searchText: searchTextValue, rowData, column }) => {
                    const key = column.key as keyof IRole;
                    const value = rowData[key]?.toString().toLowerCase() ?? '';
                    return value.includes(searchTextValue.toLowerCase());
                }}
                searchText={searchText}
                rowKeyField={'id'}
                noData={{ text: 'Нет данных' }}
                paging={{
                    enabled: true,
                    pageSize: 10,
                    pageIndex: 0
                }}
            />
        </>
    );
};

export default RoleTable;
