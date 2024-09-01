// src/components/StudyMode/StudyModeList.tsx
import React, { useEffect, useState } from 'react';
import { getStudyModes, deleteStudyMode } from '../../api/studyModeApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import StudyModeForm from './StudyModeForm';
import { IStudyMode } from '../../types/group';

const StudyModeList: React.FC = () => {
  const [studyModes, setStudyModes] = useState<IStudyMode[]>([]);
  const [selectedStudyMode, setSelectedStudyMode] = useState<IStudyMode | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchStudyModes();
  }, []);

  const fetchStudyModes = async () => {
    try {
      const data = await getStudyModes();
      setStudyModes(data);
    } catch (error) {
      console.error('Error fetching study modes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudyMode(id);
      setStudyModes(studyModes.filter((mode) => mode.id !== id));
    } catch (error) {
      console.error('Error deleting study mode:', error);
    }
  };

  const handleAddClick = () => {
    setSelectedStudyMode(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (studyMode: IStudyMode) => {
    setSelectedStudyMode(studyMode);
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setSelectedStudyMode(null);
    fetchStudyModes(); // Обновить список после сохранения
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Добавить режим обучения
      </Button>

      {isFormVisible && (
        <StudyModeForm studyMode={selectedStudyMode} onClose={handleFormClose} />
      )}

      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studyModes.map((mode) => (
              <TableRow key={mode.id}>
                <TableCell>{mode.id}</TableCell>
                <TableCell>{mode.name}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(mode)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(mode.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StudyModeList;
