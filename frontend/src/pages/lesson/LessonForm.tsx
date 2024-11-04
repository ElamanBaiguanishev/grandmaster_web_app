import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import { ILesson } from '../../types/lesson/lesson';
import { IGroup } from '../../types/group/group';
import { LessonService } from '../../api/lesson.service';

interface LessonFormProps {
    lesson: ILesson | null;
    groups: IGroup[];
    groupId: number;
    onClose: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ lesson, groups, onClose, groupId }) => {
    const [name, setName] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>(undefined);
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (lesson) {
            setName(lesson.name || '');
            setSelectedGroupId(groupId);
        }
    }, [lesson, groupId]);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            if (lesson) {
                await LessonService.updateLesson(lesson.id, { name, groupId: selectedGroupId ?? -1 });
            } else {
                await LessonService.createLesson({ name, groupId: selectedGroupId ?? -1 });
            }
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении предмета:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{lesson ? 'Редактировать предмет' : 'Добавить предмет'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Группа</InputLabel>
                    <Select
                        value={selectedGroupId || ''}
                        onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                        label="Группа"
                        defaultValue={selectedGroupId}
                    >
                        {groups.map(group => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
                    {lesson ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LessonForm;
