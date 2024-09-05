import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Box } from '@mui/material';
import api from '../../api/axios.api';
import { IGroup } from '../../types/group';

const Choise: React.FC = () => {
  const { group_id } = useParams<{ group_id: string }>();
  const [groupData, setGroupData] = useState<IGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await api.get<IGroup>(`/groups/${group_id}`);
        setGroupData(response.data);
      } catch (error) {
        setError('Ошибка при получении данных о группе.');
        console.error("Ошибка при получении данных о группе:", error);
      } finally {
        setLoading(false);
      }
    };

    if (group_id) {
      fetchGroupData();
    }
  }, [group_id]);

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
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Группа: {groupData?.name}
      </Typography>
      <Typography variant="h6">
        Семестр: {groupData?.semester.name}
      </Typography>
      <Typography variant="h6">
        Курс: {groupData?.semester.course.name}
      </Typography>
      <Typography variant="h6">
        Режим обучения: {groupData?.semester.course.studyMode?.name}
      </Typography>
    </Paper>
  );
};

export default Choise;
