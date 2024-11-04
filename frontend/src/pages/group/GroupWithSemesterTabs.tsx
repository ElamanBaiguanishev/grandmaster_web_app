import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import GroupTable from './GroupTable';
import CustomScrollableTabs from '../../components/tab/CustomTabs';
import { ISemester } from '../../types/semester/semester';
import { SemesterService } from '../../api/semester.service';

const GroupWithSemesterTabs: React.FC = () => {
    const [semesters, setSemesters] = useState<ISemester[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const data = await SemesterService.getSemesters(); // Получаем список семестров
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
        <Paper sx={{ padding: 2, width: '100%', boxSizing: 'border-box' }}>
            <CustomScrollableTabs
                items={semesters}
                value={semesters.findIndex(s => s === selectedSemester)}
                onChange={handleTabChange}
            />
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

export default GroupWithSemesterTabs;
