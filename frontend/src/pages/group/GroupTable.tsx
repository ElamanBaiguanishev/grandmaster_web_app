import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Typography, IconButton, Button, Checkbox } from '@mui/material';
import { IGroup } from '../../types/group/group';
import { GroupService } from '../../api/group.service';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupForm from './GroupForm';

interface GroupTableProps {
  semesterId: number;
}

const GroupTable: React.FC<GroupTableProps> = ({ semesterId }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchGroups = async (semesterId: number) => {
    try {
      const response = await GroupService.getGroupsBySemesterId(semesterId);
      setGroups(response);
    } catch (error) {
      setError('Ошибка при получении данных о группах.');
      console.error("Ошибка при получении данных о группах:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups(semesterId)
  }, [semesterId]);

  const handleEdit = (group: IGroup) => {
    setSelectedGroup(group);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedGroup(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchGroups(semesterId);
  };

  const handleDelete = async (id: number) => {
    try {
      await GroupService.deleteGroup(id);
      fetchGroups(semesterId); // Обновляем список после удаления
    } catch (error) {
      console.error('Error deleting semester:', error);
    }
  };

  const handleToggleVisibility = async (group: IGroup) => {
    try {
      const updatedGroup = await GroupService.toggleVisibility(group.id, !group.isVisible);
      setGroups(groups.map(g => (g.id === group.id ? updatedGroup : g)));
    } catch (error) {
      console.error('Ошибка при обновлении видимости группы:', error);
    }
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
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Добавить группу
      </Button>

      {showForm && (
        <GroupForm group={selectedGroup} onClose={handleCloseForm} />
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название группы</TableCell>
              <TableCell>Показвать в боте</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map(group => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={group.isVisible}
                    onChange={() => handleToggleVisibility(group)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(group)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(group.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GroupTable;
