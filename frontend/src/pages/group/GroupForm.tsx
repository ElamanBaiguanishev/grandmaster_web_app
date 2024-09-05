import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, CircularProgress, Paper } from '@mui/material';
import { getSemesters } from '../../api/semesterApi'; // API-запрос для получения семестров
import { ISemester } from '../../types/group';
import GroupTable from './GroupTable';

const GroupForm: React.FC = () => {
    const [semesters, setSemesters] = useState<ISemester[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const data = await getSemesters(); // Получаем список семестров
                setSemesters(data);
                setSelectedSemester(data[0]); // Устанавливаем первый семестр как выбранный по умолчанию
            } catch (error) {
                setError('Ошибка при получении данных о семестрах.');
                console.error("Ошибка при получении данных о семестрах:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSemesters();
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedSemester(semesters[newValue]);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Paper sx={{ padding: 2 }}>
            <Tabs value={semesters.findIndex(s => s === selectedSemester)} onChange={handleTabChange}>
                {semesters.map((semester, _) => (
                    <Tab key={semester.id} label={semester.name} />
                ))}
            </Tabs>
            <Box mt={2}>
                {selectedSemester ? (
                    <GroupTable semesterId={selectedSemester.id} />
                ) : (
                    <Typography variant="h6">Выберите семестр для отображения групп.</Typography>
                )}
            </Box>
        </Paper>
    );
};

export default GroupForm;
