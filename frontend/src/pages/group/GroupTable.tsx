import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Typography } from '@mui/material';
import { IGroup } from '../../types/group';
import { getGroupsBySemesterId } from '../../api/groupApi';

interface GroupTableProps {
  semesterId: number;
}

const GroupTable: React.FC<GroupTableProps> = ({ semesterId }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroupsBySemesterId(semesterId);
        setGroups(response);
      } catch (error) {
        setError('Ошибка при получении данных о группах.');
        console.error("Ошибка при получении данных о группах:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [semesterId]);

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
            <TableCell>Название группы</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map(group => (
            <TableRow key={group.id}>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupTable;
