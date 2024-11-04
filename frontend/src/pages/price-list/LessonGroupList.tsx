import React, { Fragment, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, IconButton, Collapse, Button } from '@mui/material';
import { ExpandLess, ExpandMore, Edit, Delete } from '@mui/icons-material';
import { IGroup } from '../../types/group/group';
import LessonForm from '../lesson/LessonForm';
import { ILesson } from '../../types/lesson/lesson';
import TaskList from './TaskList';
import { LessonService } from '../../api/lesson.service';
import { GroupService } from '../../api/group.service';

interface LessonGroupListProps {
    semesterId: number;
}

const LessonGroupList: React.FC<LessonGroupListProps> = ({ semesterId }) => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [openGroups, setOpenGroups] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
    const [groupId, setGroupId] = useState<number | null>(null);
    const [openLessons, setOpenLessons] = useState<number[]>([]);

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

    const handleToggleLesson = (lessonId: number) => {
        setOpenLessons(prevOpenLessons =>
            prevOpenLessons.includes(lessonId)
                ? prevOpenLessons.filter(id => id !== lessonId)
                : [...prevOpenLessons, lessonId]
        );
    };

    const handleEditLesson = (lesson: ILesson, groupId: number) => {
        setSelectedLesson(lesson);
        setGroupId(groupId);
        setOpenForm(true);
    };

    const handleAddLesson = () => {
        setSelectedLesson(null);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedLesson(null);
        setGroupId(null);
        fetchGroups();
    };

    const handleDeleteLesson = async (lessonId: number) => {
        await LessonService.deleteLesson(lessonId)
        fetchGroups();
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => handleAddLesson()}>
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
                                            <ListItem onClick={() => handleToggleLesson(lesson.id)} sx={{ cursor: 'pointer' }}>
                                                <IconButton>
                                                    {openLessons.includes(lesson.id) ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                                <ListItemText primary={lesson.name || 'Без имени'} />
                                                <IconButton color="primary" onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleEditLesson(lesson, group.id);
                                                }}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleDeleteLesson(lesson.id);
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
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
                        </Collapse>
                    </Fragment>
                ))}
            </List>

            {openForm && (
                <LessonForm
                    lesson={selectedLesson}
                    groups={groups}
                    groupId={groupId!}
                    onClose={handleCloseForm}
                />
            )}
        </Box>
    );
};

export default LessonGroupList;
