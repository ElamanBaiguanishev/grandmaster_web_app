import React, { useEffect, useState } from 'react';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { IGroup } from '../../types/group/group';
import 'ka-table/style.css'; // обязательный импорт стилей
import { GroupService } from '../../api/group.service';

interface LessonGroupTableProps {
    semesterId: number;
}

const LessonGroupTable: React.FC<LessonGroupTableProps> = ({ semesterId }) => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupData = await GroupService.getGroupsBySemesterId(semesterId);
                setGroups(groupData);
            } catch (error) {
                setError('Ошибка при получении данных о группах.');
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [semesterId]);

    const data = groups.flatMap(group => [
        {
            id: group.id,
            treeGroupId: null,
            groupName: group.name,
            type: 'group',
            lessons: null,
        },
        ...group.lessons.map(lesson => ({
            id: lesson.id,
            treeGroupId: group.id, // Указываем, что это дочерний элемент группы
            groupName: lesson.name, // Показываем название урока вместо группы
            type: 'lesson',
        })),
    ]);

    const columns = [
        { key: 'groupName', title: 'Name', dataType: DataType.String }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Table
            columns={columns}
            data={data}
            rowKeyField={'id'}
            editingMode={EditingMode.Cell}
            sortingMode={SortingMode.Single}
            treeGroupKeyField={'treeGroupId'}
            childComponents={{
            }}
        />
    );
};

export default LessonGroupTable;
