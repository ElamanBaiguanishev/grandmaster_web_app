// src/components/Course/CourseList.tsx
import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../../api/courseApi';
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
import CourseForm from './CourseForm';
import { ICourse } from '../../types/group';

const CourseList: React.FC = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCourse(id);
            setCourses(courses.filter((course) => course.id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
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

    return (
        <Paper sx={{ padding: 2 }}>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
                Добавить курс
            </Button>

            {isFormVisible && (
                <CourseForm course={selectedCourse} onClose={handleFormClose} />
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
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.id}</TableCell>
                                <TableCell>{course.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEditClick(course)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(course.id)}>
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

export default CourseList;
