import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SemesterForm from './SemesterForm';
import { ISemester } from '../../types/semester/semester';
import { SemesterService } from '../../api/semester.service';

const SemesterTable: React.FC = () => {
  const [semesters, setSemesters] = useState<ISemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const data = await SemesterService.getSemesters();
      setSemesters(data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  const handleEdit = (semester: ISemester) => {
    setSelectedSemester(semester);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await SemesterService.deleteSemester(id);
      fetchSemesters(); // Обновляем список после удаления
    } catch (error) {
      console.error('Error deleting semester:', error);
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
                <TableCell>{semester.course.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(semester)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(semester.id)} color="secondary">
                    <DeleteIcon />
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

export default SemesterTable;
