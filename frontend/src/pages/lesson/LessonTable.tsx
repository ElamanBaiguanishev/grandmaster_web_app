import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Typography } from '@mui/material';
import api from '../../api/axios.api';
import { ILesson } from '../../types/group';

interface LessonTableProps {
  groupId: number;
}

const LessonTable: React.FC<LessonTableProps> = ({ groupId }) => {
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get<ILesson[]>(`/lessons/by-group/${groupId}`);
        setLessons(response.data);
      } catch (error) {
        setError('Ошибка при получении данных об уроках.');
        console.error("Ошибка при получении данных об уроках:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [groupId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название урока</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map(lesson => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.id}</TableCell>
              <TableCell>{lesson.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LessonTable;
