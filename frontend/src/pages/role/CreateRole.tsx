import { FC, useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { IRolePayloadData } from '../../types/role/role.payload';
import { RoleService } from '../../api/role.service';
import { RoleTypes } from '../../types/role/role-types';
import { SemesterService } from '../../api/semester.service';
import { ISemester } from '../../types/semester/semester';

const CreateRole: FC = () => {
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleType, setNewRoleType] = useState<RoleTypes>(RoleTypes.ADMIN);
    const [newRoleSemesters, setNewRoleSemesters] = useState<string[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [loading, setLoading] = useState(false); // Для отображения загрузки
    const [availableSemesters, setAvailableSemesters] = useState<ISemester[]>([]); // Состояние для списка семестров

    // Получаем семестры при монтировании компонента
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const semesters = await SemesterService.getSemesters();
                setAvailableSemesters(semesters);
            } catch (error) {
                console.error('Ошибка при загрузке семестров:', error);
            }
        };

        fetchSemesters();
    }, []);

    const handleAddSemester = () => {
        if (selectedSemester && !newRoleSemesters.includes(selectedSemester)) {
            setNewRoleSemesters([...newRoleSemesters, selectedSemester]);
            setSelectedSemester('');
        }
    };

    const handleCreateRole = async () => {
        if (!newRoleName || !newRoleType) return;

        setLoading(true);
        const newRoleData: IRolePayloadData = {
            name: newRoleName,
            type: newRoleType,
            semesters: newRoleSemesters,
        };

        try {
            await RoleService.createRole(newRoleData);
            // Здесь можно добавить уведомление об успешном создании роли
        } catch (error) {
            console.error("Ошибка при создании роли:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Создание новой роли</Typography>
            <TextField
                label="Название роли"
                variant="outlined"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                fullWidth
            />

            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="role-type-label">Тип роли</InputLabel>
                <Select
                    labelId="role-type-label"
                    value={newRoleType}
                    label="Тип роли"
                    onChange={(e) => setNewRoleType(e.target.value as RoleTypes)}
                >
                    {Object.values(RoleTypes).map((roleType, index) => (
                        <MenuItem key={index} value={roleType}>
                            {roleType}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="semester-select-label">Выберите семестр</InputLabel>
                <Select
                    labelId="semester-select-label"
                    value={selectedSemester}
                    label="Выберите семестр"
                    onChange={(e) => setSelectedSemester(e.target.value)}>
                    {availableSemesters.map((semester, index) => (
                        <MenuItem key={index} value={semester.name}>
                            {semester.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={handleAddSemester} variant="outlined" sx={{ marginTop: 2 }} disabled={!selectedSemester}>
                Добавить семестр
            </Button>

            <List sx={{ marginTop: 2 }}>
                {newRoleSemesters.map((semester, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={semester} />
                    </ListItem>
                ))}
            </List>

            <Button
                onClick={handleCreateRole}
                variant="contained"
                sx={{ marginTop: 2 }}
                disabled={loading}
            >
                {loading ? 'Создание...' : 'Создать роль'}
            </Button>
        </Paper>
    );
};

export default CreateRole;
