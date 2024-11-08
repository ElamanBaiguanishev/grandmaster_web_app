import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { ITask } from '../../types/task/task';
import { TaskService } from '../../api/task.service';

interface TaskFormProps {
    task: ITask | null;
    lessonId: number
    onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose, lessonId }) => {
    const [type, setType] = useState('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (task) {
            setType(task.type!);
            setPrice(task.price);
        }
    }, [task]);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            if (task) {
                await TaskService.updateTask(task.id, { type, price });
            } else {
                await TaskService.createTask({ type, price: price ?? 0, lessonId });
            }
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении задачи:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{task ? 'Редактировать задачу' : 'Добавить задачу'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Тип"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Цена"
                    type="number"
                    value={price ?? ''}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
                    {task ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
