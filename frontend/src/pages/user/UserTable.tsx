import { FC, useEffect, useState } from 'react';
import { Table, DataType } from 'ka-table';
import { FilteringMode, SortingMode } from 'ka-table/enums';
import { UserService } from '../../api/user.service';
import { TextField } from '@mui/material';
import { IUser } from '../../types/user/user';

interface IFlatUser {
    id: number;
    email: string;
    username: string;
    roleName: string;
    semesterNames: string;
    createdAt: Date;
}

const UserTable: FC = () => {
    const [users, setUsers] = useState<IFlatUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchUsers = async () => {
        try {
            const data: IUser[] = await UserService.getUsers();
            const flatData = data.map(user => ({
                id: user.id,
                email: user.email,
                username: user.username,
                roleName: user.role.name,
                semesterNames: user?.role.semesters ? user.role.semesters.join(', ') : 'Нет доступных семестров',
                createdAt: user.role.createdAt
            }));
            setUsers(flatData);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
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
                    { key: 'username', title: 'Имя пользователя', dataType: DataType.String, isFilterable: true },
                    { key: 'email', title: 'Email', dataType: DataType.String, isFilterable: true },
                    { key: 'roleName', title: 'Роль', dataType: DataType.String, isFilterable: true },
                    { key: 'semesterNames', title: 'Семестры', dataType: DataType.String, isFilterable: true },
                    { key: 'createdAt', title: 'Дата создания', dataType: DataType.Date, isSortable: true }
                ]}
                data={users}
                sortingMode={SortingMode.Single}
                filteringMode={FilteringMode.HeaderFilter}
                search={({ searchText: searchTextValue, rowData, column }) => {
                    const key = column.key as keyof IFlatUser;
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

export default UserTable;
