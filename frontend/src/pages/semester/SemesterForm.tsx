import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CourseService } from '../../api/course.service';
import { ICourse } from '../../types/course/course';
import { ISemester } from '../../types/semester/semester';
import { SemesterService } from '../../api/semester.service';
import { ISemesterPayloadData } from '../../types/semester/semester.payload';
import { toast } from 'react-toastify';

interface SemesterFormProps {
  semester?: ISemester | null;
  onClose: () => void;
}

const SemesterForm: React.FC<SemesterFormProps> = ({ semester, onClose }) => {
  const [name, setName] = useState(semester?.name || '');
  const [courseId, setCourseId] = useState<number | ''>(semester?.course?.id || '');
  const [courses, setCourses] = useState<ICourse[]>([]);

  const isEditMode = Boolean(semester?.id);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseService.getCourses();
        setCourses(data);
      } catch (err: any) {
        const error = err.response?.data.message;
        toast.error(error.toString());
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (courseId === '') {
      // Обработка ошибки: courseId должен быть выбран
      toast.warning('Курс должен быть выбран');
      return;
    }

    const semesterData: ISemesterPayloadData = {
      name,
      courseId
    };

    try {
      if (isEditMode) {
        await SemesterService.updateSemester(semester!.id, semesterData);
        toast.success('Семестр успешно обновлен');
      } else {
        await SemesterService.createSemester(semesterData);
        toast.success('Семестр успешно добавлен');
      }
      onClose(); // Закрываем форму после успешного сохранения
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <Paper sx={{ padding: 1 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название семестра"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Курс</InputLabel>
          <Select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value as number)}
            label="Курс"
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name} - {course.studyMode.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" sx={{ marginRight: 1 }}>
          {isEditMode ? 'Обновить' : 'Создать'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Отмена
        </Button>
      </form>
    </Paper>
  );
};

export default SemesterForm;
