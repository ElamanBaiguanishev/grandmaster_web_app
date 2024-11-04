import React, { Fragment, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, IconButton, Collapse, Button } from '@mui/material';
import { ExpandLess, ExpandMore, Edit, Delete } from '@mui/icons-material';
import { IGroup } from '../../types/group/group';
import LessonForm from './LessonForm';
import { ILesson } from '../../types/lesson/lesson';
import { GroupService } from '../../api/group.service';

interface LessonGroupListProps {
    semesterId: number;
}

const LessonGroupList: React.FC<LessonGroupListProps> = ({ semesterId }) => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [openGroups, setOpenGroups] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [groupId, setGroupId] = useState<number | null>(null);

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

    useEffect(() => {
        fetchGroups();
    }, [semesterId]);

    const handleToggleGroup = (groupId: number) => {
        setOpenGroups(prevOpenGroups =>
            prevOpenGroups.includes(groupId)
                ? prevOpenGroups.filter(id => id !== groupId)
                : [...prevOpenGroups, groupId]
        );
    };

    const handleEditLesson = (lesson: ILesson, groupId: number) => {
        setGroupId(groupId)
        setSelectedLesson(lesson);
        setOpenForm(true);
    };

    const handleDeleteLesson = (_: number) => {
        // Имплементировать функцию удаления предмета
    };

    const handleCloseForm = () => {
        fetchGroups();  // Обновляем группы и уроки после изменений
        setOpenForm(false);
        setSelectedLesson(null);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box mt={2}>
            <Button
                onClick={() => setOpenForm(true)}
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
            >
                Добавить предмет
            </Button>
            <List>
                {groups.map(group => (
                    <Fragment key={group.id}>
                        <ListItem onClick={() => handleToggleGroup(group.id)} sx={{ cursor: 'pointer' }}>
                            <IconButton>
                                {openGroups.includes(group.id) ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                            <ListItemText primary={group.name} />
                        </ListItem>
                        <Collapse in={openGroups.includes(group.id)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                                {group.lessons.length > 0 ? (
                                    group.lessons.map(lesson => (
                                        <Fragment key={lesson.id}>
                                            <ListItem>
                                                <ListItemText primary={lesson.name || 'Без имени'} />
                                                <IconButton color="primary" onClick={() => handleEditLesson(lesson, group.id)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleDeleteLesson(lesson.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </ListItem>
                                        </Fragment>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText primary="На этой группе пока нет предметов" />
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>
                    </Fragment>
                ))}
            </List>
            {openForm && <LessonForm lesson={selectedLesson} groups={groups} groupId={groupId!} onClose={handleCloseForm} />}
        </Box>
    );
};

export default LessonGroupList;
