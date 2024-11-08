import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SemesterForm from './SemesterForm';
import { ISemester } from '../../types/semester/semester';
import { SemesterService } from '../../api/semester.service';
import { toast } from 'react-toastify';

const SemesterTable: React.FC = () => {
  const [semesters, setSemesters] = useState<ISemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [semesterToDelete, setSemesterToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const data = await SemesterService.getSemesters();
      setSemesters(data);
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const handleEdit = (semester: ISemester) => {
    setSelectedSemester(semester);
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setSemesterToDelete(id);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (semesterToDelete === null) return;

    try {
      await SemesterService.deleteSemester(semesterToDelete);
      toast.success('Семестр успешно удалён');
      fetchSemesters(); // Обновляем список после удаления
      setIsDialogOpen(false);
      setSemesterToDelete(null);
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const handleAddNew = () => {
    setSelectedSemester(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchSemesters();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSemesterToDelete(null);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Добавить семестр
      </Button>

      {showForm && (
        <SemesterForm semester={selectedSemester} onClose={handleCloseForm} />
      )}

      <TableContainer sx={{ marginTop: 2 }}>
        <Table sx={{ border: '1px solid #ddd' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid #ddd' }}>ID</TableCell>
              <TableCell sx={{ border: '1px solid #ddd' }}>Название</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesters.map((semester) => (
              <TableRow key={semester.id}>
                <TableCell sx={{ border: '1px solid #ddd' }}>{semester.id}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{semester.name}</TableCell>
                <TableCell>{semester.course.name} - {semester.course.studyMode.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(semester)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(semester.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот семестр? Это действие нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SemesterTable;
