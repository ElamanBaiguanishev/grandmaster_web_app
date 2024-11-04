import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Button, CircularProgress } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ITask } from '../../types/task/task';
import { ILesson } from '../../types/lesson/lesson';
import TaskForm from './TaskForm';
import { TaskService } from '../../api/task.service';

interface TaskListProps {
  lesson: ILesson;
}

const TaskList: React.FC<TaskListProps> = ({ lesson }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);;
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const [openForm, setOpenForm] = useState(false);


  const fetchTasks = async () => {
    try {
      const data = await TaskService.getTasksByLessonId(lesson.id);
      setTasks(data);
    } catch (error) {
      setError('Ошибка при получении задач.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [lesson.id]);


  const handleEditTask = (task: ITask) => {
    // setGroupId(groupId)
    setSelectedTask(task);
    setOpenForm(true);
  };

  // const handleAddTask = async () => {
  //   if (!newTaskData.type.trim() || newTaskData.price <= 0) return;

  //   const newTask = {
  //     ...newTaskData,
  //     lesson,
  //   };

  //   try {
  //     const createdTask = await addTask(newTask);
  //     setTasks(prevTasks => [...prevTasks, createdTask]);
  //     setNewTaskData({ type: '', price: 0 });
  //   } catch (error) {
  //     setError('Ошибка при создании задачи.');
  //   }
  // };

  // const handleEditTask = async (taskId: number) => {
  //   if (!editedTaskData.type.trim() || editedTaskData.price <= 0) return;

  //   const updatedTask = {
  //     ...editedTaskData,
  //     lesson,
  //   };

  //   try {
  //     const task = await updateTask(taskId, updatedTask);
  //     setTasks(prevTasks => prevTasks.map(t => (t.id === taskId ? task : t)));
  //     setEditingTaskId(null);
  //     setEditedTaskData({ type: '', price: 0 });
  //   } catch (error) {
  //     setError('Ошибка при редактировании задачи.');
  //   }
  // };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError('Ошибка при удалении задачи.');
    }
  };

  const handleCloseForm = () => {
    fetchTasks();  // Обновляем группы и уроки после изменений
    setOpenForm(false);
    setSelectedTask(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box color="error">{error}</Box>;
  }

  return (
    <Box>
      <List>
        <Button
          onClick={() => setOpenForm(true)}
          variant="contained"
          color="primary"
        >
          Добавить задание
        </Button>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText
              primary={`Тип: ${task.type}`}
              secondary={`Цена: ${task.price}`}
            />

            <IconButton color="primary" onClick={() => { handleEditTask(task) }}>
              <Edit />
            </IconButton>

            <IconButton color="secondary" onClick={() => handleDeleteTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {openForm && <TaskForm task={selectedTask} lessonId={lesson.id} onClose={handleCloseForm} />}
    </Box>
  );
};

export default TaskList;
