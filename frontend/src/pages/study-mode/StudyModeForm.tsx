// src/components/StudyMode/StudyModeForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { IStudyMode } from '../../types/study-mode/study-mode';
import { StudyModeService } from '../../api/study.service';
import { toast } from 'react-toastify';

interface StudyModeFormProps {
    studyMode?: IStudyMode | null;
    onClose: () => void;
}

const StudyModeForm: React.FC<StudyModeFormProps> = ({ studyMode, onClose }) => {
    const [name, setName] = useState(studyMode?.name || '');

    const isEditMode = Boolean(studyMode?.id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await StudyModeService.updateStudyMode(studyMode!.id, { name });
                toast.success('Запись успешно обновлена')
            } else {
                await StudyModeService.createStudyMode({ name });
                toast.success('Запись успешно добавлена')
            }
            onClose(); // Закрываем форму после успешного сохранения
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString())
        }
    };

    return (
        <Paper sx={{ padding: 1 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Название режима обучения"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit"
                    sx={{
                        marginRight: 1
                    }}
                >
                    {isEditMode ? 'Обновить' : 'Создать'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Отмена
                </Button>
            </form>
        </Paper>
    );
};

export default StudyModeForm;
