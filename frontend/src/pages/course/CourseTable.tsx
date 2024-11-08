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
import CourseForm from './CourseForm';
import { ICourse } from '../../types/course/course';
import { CourseService } from '../../api/course.service';
import { toast } from 'react-toastify';

const CourseTable: React.FC = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await CourseService.getCourses();
            setCourses(data);
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    const handleDelete = async () => {
        if (courseToDelete === null) return;

        try {
            await CourseService.deleteCourse(courseToDelete);
            setCourses(courses.filter((course) => course.id !== courseToDelete));
            setIsDialogOpen(false);
            setCourseToDelete(null);
            toast.success('Курс успешно удалён');
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    const handleDeleteClick = (id: number) => {
        setCourseToDelete(id);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setSelectedCourse(null);
        setIsFormVisible(true);
    };

    const handleEditClick = (course: ICourse) => {
        setSelectedCourse(course);
        setIsFormVisible(true);
    };

    const handleFormClose = () => {
        setIsFormVisible(false);
        setSelectedCourse(null);
        fetchCourses();
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCourseToDelete(null);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
                Добавить курс
            </Button>

            {isFormVisible && (
                <CourseForm course={selectedCourse} onClose={handleFormClose} />
            )}

            <TableContainer sx={{ marginTop: 2 }}>
                <Table sx={{ border: '1px solid #ddd' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #ddd' }}>ID</TableCell>
                            <TableCell sx={{ border: '1px solid #ddd' }}>Название</TableCell>
                            <TableCell>Форма обучения</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell sx={{ border: '1px solid #ddd' }}>{course.id}</TableCell>
                                <TableCell sx={{ border: '1px solid #ddd' }}>{course.name}</TableCell>
                                <TableCell>{course.studyMode!.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEditClick(course)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteClick(course.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Диалоговое окно подтверждения */}
            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите удалить этот курс? Это действие нельзя отменить.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default CourseTable;
