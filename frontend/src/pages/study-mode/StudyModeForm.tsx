// src/components/StudyMode/StudyModeForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { IStudyMode } from '../../types/study-mode/study-mode';
import { StudyModeService } from '../../api/study.service';

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
            } else {
                await StudyModeService.createStudyMode({ name });
            }
            onClose(); // Закрываем форму после успешного сохранения
        } catch (error) {
            console.error('Error saving study mode:', error);
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
