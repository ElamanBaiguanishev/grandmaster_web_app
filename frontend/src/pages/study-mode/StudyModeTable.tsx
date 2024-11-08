import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import StudyModeForm from './StudyModeForm';
import { IStudyMode } from '../../types/study-mode/study-mode';
import { StudyModeService } from '../../api/study.service';
import { toast } from 'react-toastify';

const StudyModeTable: React.FC = () => {
  const [studyModes, setStudyModes] = useState<IStudyMode[]>([]);
  const [selectedStudyMode, setSelectedStudyMode] = useState<IStudyMode | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [studyModeToDelete, setStudyModeToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchStudyModes();
  }, []);

  const fetchStudyModes = async () => {
    try {
      const data = await StudyModeService.getStudyModes();
      setStudyModes(data);
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await StudyModeService.deleteStudyMode(id);
      setStudyModes(studyModes.filter((mode) => mode.id !== id));
      toast.success('Режим обучения успешно удалён');
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    } finally {
      setIsDialogOpen(false);
      setStudyModeToDelete(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    setStudyModeToDelete(id);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setStudyModeToDelete(null);
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
        <Table sx={{ border: '1px solid #ddd' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid #ddd' }}>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studyModes.map((mode) => (
              <TableRow key={mode.id}>
                <TableCell sx={{ border: '1px solid #ddd' }}>{mode.id}</TableCell>
                <TableCell>{mode.name}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(mode)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(mode.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Диалоговое окно для подтверждения удаления */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот режим обучения? Это действие необратимо.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={() => handleDelete(studyModeToDelete!)} color="secondary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StudyModeTable;
