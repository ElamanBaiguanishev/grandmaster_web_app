import { DataType, Table } from 'ka-table';
import { SortingMode } from 'ka-table/enums';
import { FC, useEffect, useState } from 'react';
import { ISemester } from '../../types/semester/semester';
import 'ka-table/style.css'; // обязательный импорт стилей
import { SemesterService } from '../../api/semester.service';

interface IFlattenedTask {
    id: number;
    type: string;
    lesson: string;
    group: string;
    semester: string;
    price: number;
}

const GroupingDemo: FC = () => {
    const [semesters, setSemesters] = useState<IFlattenedTask[] | null>(null);

    function flattenSemesterData(semesters: ISemester[]): IFlattenedTask[] {
        const dataArray: IFlattenedTask[] = [];

        semesters.forEach(semester => {
            semester.groups?.forEach(group => {
                group.lessons.forEach(lesson => {
                    lesson.tasks?.forEach(task => {
                        dataArray.push({
                            id: task.id,
                            type: task.type,
                            lesson: lesson.name || 'Unnamed Lesson',
                            group: group.name,
                            semester: semester.name,
                            price: task.price,
                        });
                    });
                });
            });
        });

        return dataArray;
    }

    useEffect(() => {
        const fetchSemesters = async () => {
            const semesterData = await SemesterService.getSemesters();
            setSemesters(flattenSemesterData(semesterData));
        };

        fetchSemesters();
    }, []);

    if (!semesters) {
        return <div>Loading...</div>;
    }

    const columns = [
        { key: 'type', title: 'Тип', dataType: DataType.String },
        { key: 'lesson', title: 'Предмет', dataType: DataType.String },
        { key: 'group', title: 'Группа', dataType: DataType.String },
        { key: 'semester', title: 'Семестр', dataType: DataType.String },
        { key: 'price', title: 'Цена', dataType: DataType.Number },
    ];

    return (
        <Table
            columns={columns}
            data={semesters}
            rowKeyField={'id'}
            sortingMode={SortingMode.Single}
            virtualScrolling={{ enabled: true }}
            groups={[{ columnKey: 'semester' }, { columnKey: 'group' }, { columnKey: 'lesson' }]}
            groupsExpanded={[
                [0] // Здесь указываем раскрытые группы
            ]}
            groupPanel={{
                enabled: true,
                text: 'For grouping, drag a column here...'
            }}
            // childComponents={{
            //     tableWrapper: {
            //         elementAttributes: () => ({ style: { maxHeight: 600 } })
            //     }
            // }}
        />
    );
};

export default GroupingDemo;
