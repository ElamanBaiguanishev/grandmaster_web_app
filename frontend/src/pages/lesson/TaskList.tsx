import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Button, TextField, IconButton } from '@mui/material';
import { getTasksByLessonId, addTask, updateTask } from '../../api/taskApi';
import { ITask } from '../../types/group';

interface TaskListProps {
  lessonId: number;
}

const TaskList: React.FC<TaskListProps> = ({ lessonId }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState({ type: '', price: 0 });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await getTasksByLessonId(lessonId);
        setTasks(taskData);
      } catch (error) {
        console.error('Ошибка при получении данных о задачах:', error);
      }
    };

    fetchTasks();
  }, [lessonId]);

  const handleAddTask = async () => {
    if (!newTask.type || !newTask.price) return;
    try {
      const createdTask = await addTask({ ...newTask, lessonId: lessonId });
      setTasks([...tasks, createdTask]);
      setNewTask({ type: '', price: 0 });
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  const handleEditTask = (task: ITask) => {
    setEditingTaskId(task.id);
    setNewTask({ type: task.type, price: task.price });
  };

  const handleUpdateTask = async (taskId: number) => {
    try {
      const updatedTask = await updateTask(taskId, { type: newTask.type, price: newTask.price });
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
      setEditingTaskId(null);
      setNewTask({ type: '', price: 0 });
    } catch (error) {
      console.error('Ошибка при редактировании задачи:', error);
    }
  };

  return (
    <Box mt={2} sx={{ paddingLeft: 4 }}>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            {editingTaskId === task.id ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Тип"
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                />
                <TextField
                  label="Цена"
                  value={newTask.price}
                  onChange={(e) => setNewTask({ ...newTask, price: +e.target.value })}
                  type="number"
                />
                <Button onClick={() => handleUpdateTask(task.id)}>Сохранить</Button>
              </Box>
            ) : (
              <ListItemText primary={`${task.type} - ${task.price} ₽`} />
            )}
            <IconButton onClick={() => handleEditTask(task)}>Редактировать</IconButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label="Тип"
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
        />
        <TextField
          label="Цена"
          value={newTask.price}
          onChange={(e) => setNewTask({ ...newTask, price: +e.target.value })}
          type="number"
        />
        <Button onClick={handleAddTask}>Добавить задачу</Button>
      </Box>
    </Box>
  );
};

export default TaskList;
