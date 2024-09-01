import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getCourses } from '../../api/courseApi'; // API-запрос для получения курсов
import { ICourse, ISemester } from '../../types/group'; // Убедитесь, что типы корректны
import { createSemester, updateSemester } from '../../api/semesterApi';

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
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (courseId === '') {
      // Обработка ошибки: courseId должен быть выбран
      console.error('Course is required');
      return;
    }

    // Поиск выбранного курса по ID
    const selectedCourse = courses.find(course => course.id === courseId);

    if (!selectedCourse) {
      console.error('Selected course not found');
      return;
    }

    const semesterData: Omit<ISemester, 'id'> = {
      name,
      course: selectedCourse  // Передаем полный объект курса
    };

    try {
      if (isEditMode) {
        await updateSemester(semester!.id, semesterData);
      } else {
        await createSemester(semesterData);
      }
      onClose(); // Закрываем форму после успешного сохранения
    } catch (error) {
      console.error('Error saving semester:', error);
    }
  };

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
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
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
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
