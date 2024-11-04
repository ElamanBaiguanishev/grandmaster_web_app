import React, { Fragment, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Collapse, Box } from '@mui/material';
import { Delete, Edit, ExpandLess, ExpandMore } from '@mui/icons-material';
import TaskList from '../TaskList';
import { ILesson } from '../../../types/lesson/lesson';
import { IGroup } from '../../../types/group/group';
import LessonForm from '../../lesson/LessonForm';

interface LessonListProps {
    lessons: ILesson[];
    groups: IGroup[];
}

const LessonList: React.FC<LessonListProps> = ({ lessons, groups }) => {
    const [openLessons, setOpenLessons] = useState<number[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [groupId, setGroupId] = useState<number | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);

    const handleEditLesson = (lesson: ILesson, groupId: number) => {
        setGroupId(groupId)
        setSelectedLesson(lesson);
        setOpenForm(true);
    };

    const handleDeleteLesson = (_: number) => {
        // Имплементировать функцию удаления предмета
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedLesson(null);
    };

    const handleToggleLesson = (lessonId: number) => {
        setOpenLessons(prevOpenLessons =>
            prevOpenLessons.includes(lessonId)
                ? prevOpenLessons.filter(id => id !== lessonId)
                : [...prevOpenLessons, lessonId]
        );
    };

    return (
        <Box sx={{ paddingLeft: 4 }}>
            <List component="div" disablePadding>
                {lessons.length > 0 ? (
                    lessons.map(lesson => (
                        <Fragment key={lesson.id}>
                            <ListItem onClick={() => handleToggleLesson(lesson.id)} sx={{ cursor: 'pointer' }}>
                                <IconButton>
                                    {openLessons.includes(lesson.id) ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                                <ListItem>
                                    <ListItemText primary={lesson.name || 'Без имени'} />
                                    <IconButton color="primary" onClick={() => handleEditLesson(lesson, lesson.group?.id!)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteLesson(lesson.id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItem>
                            </ListItem>
                            <Collapse in={openLessons.includes(lesson.id)} timeout="auto" unmountOnExit>
                                <TaskList lesson={lesson} />
                            </Collapse>
                        </Fragment>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="На этой группе пока нет предметов" />
                    </ListItem>
                )}
            </List>
            {openForm && <LessonForm lesson={selectedLesson} groups={groups} groupId={groupId!} onClose={handleCloseForm} />}

        </Box>
    );
};

export default LessonList;
