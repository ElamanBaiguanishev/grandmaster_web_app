import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, CircularProgress } from '@mui/material';
import { getGroupsBySemesterId } from '../../api/groupApi'; // API-запрос для получения групп
import { IGroup } from '../../types/group';
import LessonTable from './LessonTable'; // Компонент для отображения таблицы с уроками

interface LessonFormProps {
  semesterId: number;
}

const LessonForm: React.FC<LessonFormProps> = ({ semesterId }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroupsBySemesterId(semesterId); // Получаем список групп по ID семестра
        setGroups(data);
        setSelectedGroup(data[0]); // Устанавливаем первую группу как выбранную по умолчанию
      } catch (error) {
        setError('Ошибка при получении данных о группах.');
        console.error("Ошибка при получении данных о группах:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [semesterId]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedGroup(groups[newValue]);
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
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',  // Предотвращает перенос строк
        }}
      >
        <Tabs
          value={groups.findIndex(g => g === selectedGroup)}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {groups.map((group, _) => (
            <Tab key={group.id} label={group.name} sx={{ whiteSpace: 'nowrap' }} />
          ))}
        </Tabs>
      </Box>
      <Box mt={2}>
        {selectedGroup ? (
          <LessonTable groupId={selectedGroup.id} />
        ) : (
          <Typography variant="h6">Выберите группу для отображения уроков.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LessonForm;
