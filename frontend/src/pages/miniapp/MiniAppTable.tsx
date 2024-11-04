import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { setLessons, setPrice } from '../../store/telegram/tgSlice';
import { ILesson } from '../../types/lesson/lesson';
import { filterLessons } from './tools';

const tableCellStyle = () => ({
  fontSize: "12px",
  fontWeight: "bold",
  borderBottom: `1px solid`,
  paddingBottom: "5px",
  paddingTop: "5px"
});

const tableRowCellStyle = () => ({
  fontSize: "10px",
  borderBottom: `1px solid`,
  paddingBottom: "5px",
  paddingTop: "5px"
});

const MiniAppTable: FC = () => {
  const { choise } = useParams<{ choise?: string }>();
  const telegram = useAppSelector((state) => state.tg.tg);
  const navigate = useNavigate();
  const group = useAppSelector((state) => state.tg.group);
  const dispatch = useAppDispatch();
  const [filtLessons, setLesson] = useState<ILesson[] | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (group) {
      const filteredLessons: ILesson[] | null = filterLessons(group, choise || "choisetask");
      if (filteredLessons) {
        setLesson(filteredLessons);

        const totalPrice = filteredLessons.reduce((acc, lesson) => {
          const taskPriceSum = lesson.tasks!.reduce((taskAcc, task) => {
            return +taskAcc + +task.price;
          }, 0);
          return acc + taskPriceSum;
        }, 0);

        setTotalPrice(totalPrice);
      }
    }

    if (telegram) {
      telegram.BackButton.show();
      telegram.MainButton.show();
      telegram.MainButton.setText("Продолжить");
      telegram.MainButton.enable();
      telegram.MainButton.color = "#3CB043";
      telegram.MainButton.textColor = "#FFFFFF";

      const handleClick = () => {
        if (filtLessons) {
          dispatch(setLessons(filtLessons));
        }

        if (totalPrice) {
          dispatch(setPrice(totalPrice));
        }

        navigate('/miniapp/fio');
      };

      const backClick = () => {
        navigate("/miniapp/:group_id");
      }


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
          // telegram.BackButton.hide();
          // telegram.MainButton.hide();
          telegram.BackButton.offClick(backClick);
          telegram.MainButton.offClick(handleClick);
        }
      };
    }
  }, [group, choise, telegram, navigate, dispatch, totalPrice]);

  if (!filtLessons) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginBottom: "16px",
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
      <Paper
        sx={{
          width: "100%",
          padding: "4px",
          marginBottom: "8px"
        }}
        elevation={2}
      >
        <Typography variant="h6" sx={{ fontSize: "14px", textAlign: "center" }}>
          Выбранные предметы:
        </Typography>

        <Table
          sx={{
            width: "100%",
            marginTop: "4px"
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle()}>
                Предмет
              </TableCell>
              <TableCell sx={tableCellStyle()}>
                Задание
              </TableCell>
              <TableCell sx={tableCellStyle()}>
                Цена
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtLessons.map((lesson) =>
              lesson.tasks!.map((task) => (
                <TableRow key={task.id}>
                  <TableCell sx={tableRowCellStyle()}>
                    {lesson.name}
                  </TableCell>
                  <TableCell sx={tableRowCellStyle()}>
                    {task.type}
                  </TableCell>
                  <TableCell sx={tableRowCellStyle()}>
                    {task.price} ₽
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell colSpan={2} sx={{
                borderBottom: `1px solid`,
                paddingBottom: "5px",
                paddingTop: "5px",
                fontWeight: 'bold',
                fontSize: '1.1em',
              }} >
                Общая сумма:
              </TableCell>
              <TableCell sx={tableRowCellStyle()}>
                <Box component='span' sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1em',
                }}>{totalPrice.toFixed(2)} ₽</Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default MiniAppTable;
