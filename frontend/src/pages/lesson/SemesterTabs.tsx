import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, CircularProgress, Paper } from '@mui/material';
import { getSemesters } from '../../api/semesterApi';
import { ISemester } from '../../types/group';
import GroupList from './GroupList';

const SemesterTabs: React.FC = () => {
    const [semesters, setSemesters] = useState<ISemester[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const data = await getSemesters();
                setSemesters(data);
                setSelectedSemester(data[0]);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Paper sx={{ padding: 2, width: '100%', overflowX: 'auto' }}>
                <Tabs
                    value={semesters.findIndex(s => s.id === selectedSemester?.id)}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    {semesters.map((semester) => (
                        <Tab key={semester.id} label={semester.name} />
                    ))}
                </Tabs>
                <Box mt={2}>
                    {selectedSemester ? (
                        <GroupList semesterId={selectedSemester.id} />
                    ) : (
                        <Typography variant="h6">Выберите семестр для отображения групп.</Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default SemesterTabs;
