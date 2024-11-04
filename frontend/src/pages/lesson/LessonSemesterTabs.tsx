import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import CustomScrollableTabs from '../../components/tab/CustomTabs';
import { ISemester } from '../../types/semester/semester';
import LessonGroupList from './LessonGroupList';
import { SemesterService } from '../../api/semester.service';

const LessonSemesterTabs: React.FC = () => {
    const [semesters, setSemesters] = useState<ISemester[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const data = await SemesterService.getSemesters();
                setSemesters(data);
                setSelectedSemester(data[0]);
            } catch (error) {
                setError(`Ошибка при получении данных о семестрах. ${error}`);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Paper sx={{ padding: 2, width: '100%', overflowX: 'auto' }}>
                <CustomScrollableTabs
                    items={semesters}
                    value={semesters.findIndex(s => s.id === selectedSemester?.id)}
                    onChange={handleTabChange}
                />
                <Box mt={2}>
                    {selectedSemester ? (
                        <LessonGroupList semesterId={selectedSemester.id} />
                    ) : (
                        <Typography variant="h6">Выберите семестр для отображения групп.</Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default LessonSemesterTabs;
