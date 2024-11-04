import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Checkbox, FormControlLabel, ListItem, ListItemText, Typography, Paper, Box, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ITask } from '../../types/task/task';
import { setLessons, setPrice } from '../../store/telegram/tgSlice';

const MiniAppChoiseTask: FC = () => {
    const group = useAppSelector((state) => state.tg.group);
    const telegram = useAppSelector((state) => state.tg.tg);
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState<string>("");
    const [selectedTasks, setSelectedTasks] = useState<ITask[]>([]);
    const dispatch = useAppDispatch();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // Обработчик изменения состояния чекбокса
    const handleCheckboxChange = (task: ITask) => {
        setSelectedTasks((prevSelectedTasks) =>
            prevSelectedTasks.find(t => t.id === task.id)
                ? prevSelectedTasks.filter(t => t.id !== task.id)
                : [...prevSelectedTasks, task]
        );
    };

    useEffect(() => {
        // Рассчитываем общую сумму
        const totalPrice = selectedTasks.reduce((acc, task) => acc + Number(task.price), 0);
        setTotalPrice(totalPrice);

        if (telegram) {
            telegram.BackButton.show();
            telegram.MainButton.show();
            telegram.MainButton.setText("Продолжить");
            telegram.MainButton.enable();
            telegram.MainButton.color = "#3CB043";
            telegram.MainButton.textColor = "#FFFFFF";

            const handleClick = () => {
                const selectedLessons = group?.lessons.map(lesson => ({
                    ...lesson,
                    tasks: lesson.tasks?.filter(task => selectedTasks.some(t => t.id === task.id))
                })) || [];
                dispatch(setLessons(selectedLessons)); // Сохраняем весь объект уроков с выбранными задачами в Redux
                dispatch(setPrice(totalPrice));
                navigate('/miniapp/fio');
            };

            const backClick = () => {
                navigate("/miniapp/:group_id");
            };

            telegram.MainButton.onClick(handleClick);
            telegram.BackButton.onClick(backClick);

            const today = new Date();
            const formattedDate = today.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            setCurrentDate(formattedDate);

            return () => {
                if (telegram) {
                    telegram.BackButton.offClick(backClick);
                    telegram.MainButton.offClick(handleClick);
                }
            };
        }
    }, [telegram, navigate, dispatch, totalPrice, selectedTasks, group]);

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    marginBottom: "4px",
                }}
            >
                Это все предметы Вашей сессии, установленные преподавателем на{' '}
                <Box
                    component="span"
                    sx={{
                        color: '#3CB043',
                        fontWeight: 'bold',
                        fontSize: '1.1em',
                    }}
                >
                    {currentDate}
                </Box>
            </Typography>
            <Paper sx={{ padding: '8px' }}>
                <List sx={{ padding: 0, margin: 0 }}>
                    {group?.lessons.map((lesson) => (
                        <Box key={lesson.id} sx={{ padding: 0, margin: 0 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ padding: 0, margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}
                            >
                                {lesson.name}
                            </Typography>
                            {lesson.tasks?.map((task) => (
                                <ListItem key={task.id} sx={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedTasks.some(t => t.id === task.id)}
                                                onChange={() => handleCheckboxChange(task)}
                                            />
                                        }
                                        label={<ListItemText primary={task.type} />}
                                        sx={{ padding: 0, margin: 0 }}
                                    />
                                    <Typography variant="body2" sx={{ padding: 0, margin: 0 }}>
                                        {Number(task.price).toFixed(2)} ₽
                                    </Typography>
                                </ListItem>
                            ))}
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <ListItem sx={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                                Общая сумма:
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                                {totalPrice.toFixed(2)} ₽
                            </Typography>
                        </ListItem>
                    </Box>
                </List>
            </Paper>
        </Box>
    );
};

export default MiniAppChoiseTask;
