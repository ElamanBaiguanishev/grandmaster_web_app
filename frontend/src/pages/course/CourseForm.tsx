// src/components/Course/CourseForm.tsx
import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createCourse, updateCourse } from '../../api/courseApi';
import { ICourse, IStudyMode } from '../../types/group';
import { getStudyModes } from '../../api/studyModeApi';

interface CourseFormProps {
    course?: ICourse | null;
    onClose: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onClose }) => {
    const [name, setName] = useState(course?.name || '');
    const [studyModeId, setStudyModeId] = useState<number | ''>(course?.studyMode?.id || '');
    const [studyModes, setStudyModes] = useState<IStudyMode[]>([]);

    const isEditMode = Boolean(course?.id);

    useEffect(() => {
        const fetchStudyModes = async () => {
            try {
                const data = await getStudyModes();
                setStudyModes(data);
            } catch (error) {
                console.error('Error fetching study modes:', error);
            }
        };

        fetchStudyModes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (studyModeId === '') {
            // Обработка ошибки: studyModeId должен быть выбран
            console.error('Study mode is required');
            return;
        }

        const courseData = {
            name,
            studyModeId, // Добавление обязательного поля
        };

        try {
            if (isEditMode) {
                await updateCourse(course!.id, courseData);
            } else {
                await createCourse(courseData);
            }
            onClose(); // Закрываем форму после успешного сохранения
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    return (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Название курса"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />

                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Режим обучения</InputLabel>
                    <Select
                        value={studyModeId}
                        onChange={(e) => setStudyModeId(e.target.value as number)}
                    >
                        {studyModes.map((mode) => (
                            <MenuItem key={mode.id} value={mode.id}>
                                {mode.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" type="submit" sx={{ marginRight: 1 }}>
                    {isEditMode ? 'Обновить' : 'Создать'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Отмена
                </Button>
            </form>
        </Paper>
    );
};

export default CourseForm;