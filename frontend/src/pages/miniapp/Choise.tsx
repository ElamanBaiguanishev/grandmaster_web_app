import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios.api";
import { IGroup, ITask } from "../../types/group";

const Choise: React.FC = () => {
  const [tg, setTg] = useState<WebApp | null>(null);
  const { group_id } = useParams<{ group_id: string }>();
  const [groupData, setGroupData] = useState<IGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("session");
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await api.get<IGroup>(`/groups/${group_id}`);
        setGroupData(response.data);
      } catch (error) {
        setError("Ошибка при получении данных о группе.");
      } finally {
        setLoading(false);
      }
    };

    if (group_id) {
      fetchGroupData();
    }
  }, [group_id]);

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      setTg(telegram);
      telegram.expand();
    }
  }, []);

  // Функция для обработки выбора опции
  const handleSubmit = () => {
    if (!fullName) {
      return; // Если ФИО не заполнено, форма не отправляется
    }

    // Логика для навигации по выбранной опции
    if (selectedOption === "session") {
      navigate("/order", { state: { lessons: groupData?.lessons, fullName } });
    } else if (selectedOption === "control-tests") {
      const controlTests = groupData?.lessons.map(lesson => ({
        ...lesson,
        tasks: lesson.tasks.filter((task: ITask) => task.type === "Контрольная работа")
      }));
      navigate("/order", { state: { lessons: controlTests, fullName } });
    } else if (selectedOption === "exams") {
      const exams = groupData?.lessons.map(lesson => ({
        ...lesson,
        tasks: lesson.tasks.filter((task: ITask) => {
          const taskTypeNormalized = task.type.trim().toLowerCase();
          return taskTypeNormalized === "экзамен";
        }),
      }));

      navigate("/order", { state: { lessons: exams, fullName } });
    } else if (selectedOption === "specific-subjects") {
      navigate("/order", { state: { lessons: groupData?.lessons, fullName } });
    }
  };

  const backgroundColor = tg?.themeParams?.bg_color;
  const textColor = tg?.themeParams?.text_color;
  const buttonColor = tg?.themeParams?.button_color;
  const buttonTextColor = tg?.themeParams?.button_text_color;
  const radioBorderColor = tg?.themeParams?.hint_color || textColor;


  // Обработчик выбора предметов
  const handleLessonToggle = (lessonId: number) => {
    setSelectedLessons((prevSelected) =>
      prevSelected.includes(lessonId)
        ? prevSelected.filter((id) => id !== lessonId)
        : [...prevSelected, lessonId]
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      padding: 2,
      width: "100%",
      backgroundColor: backgroundColor,
      color: textColor,
      minHeight: "100vh"
    }}>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Курс: {groupData?.semester.course.name} Семестр: {groupData?.semester.name}  Группа: {groupData?.name}
      </Typography>

      <Paper sx={{
        padding: 2,
        backgroundColor: backgroundColor,
        color: textColor,
        marginTop: 2, // Расстояние между первым и вторым Paper
      }}>
        <Typography variant="h4" gutterBottom>
          Выберите опции заказа
        </Typography>

        <TextField
          label="ФИО"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiInputLabel-root": {
              color: tg?.themeParams?.text_color || "inherit", // Цвет подсказки (лейбл)
              "&.Mui-focused": {
                color: tg?.themeParams?.text_color || "inherit", // Цвет подсказки при фокусе
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: tg?.themeParams?.bg_color || "inherit", // Цвет рамки
              },
              "&:hover fieldset": {
                borderColor: tg?.themeParams?.button_color || "inherit", // Цвет рамки при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: tg?.themeParams?.button_color || "inherit", // Цвет рамки при фокусе
              },
              color: tg?.themeParams?.text_color || "inherit", // Цвет текста внутри поля
              backgroundColor: tg?.themeParams?.bg_color || "inherit", // Фоновый цвет поля ввода
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              backgroundColor: tg?.themeParams?.bg_color || "inherit", // Установить фоновый цвет при фокусе
              color: tg?.themeParams?.text_color || "inherit", // Цвет текста при фокусе
            },
            // Стили для автозаполнения (autocomplete)
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${tg?.themeParams?.bg_color || "inherit"} inset`, // Убираем синий фон
              WebkitTextFillColor: tg?.themeParams?.text_color || "inherit", // Цвет текста при автозаполнении
            },
          }}
        />

        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <FormControlLabel
              value="session"
              control={<Radio sx={{
                '&.MuiRadio-root': {
                  color: radioBorderColor,
                },
                '&.Mui-checked': {
                  color: buttonColor,
                },
              }} />}
              label="Всю сессию"
            />
            <FormControlLabel
              value="control-tests"
              control={<Radio sx={{
                '&.MuiRadio-root': {
                  color: radioBorderColor,
                },
                '&.Mui-checked': {
                  color: buttonColor,
                },
              }} />}
              label="Только все контрольные"
            />
            <FormControlLabel
              value="exams"
              control={<Radio sx={{
                '&.MuiRadio-root': {
                  color: radioBorderColor,
                },
                '&.Mui-checked': {
                  color: buttonColor,
                },
              }} />}
              label="Только все экзамены"
            />
            <FormControlLabel
              value="specific-subjects"
              control={<Radio sx={{
                '&.MuiRadio-root': {
                  color: radioBorderColor,
                },
                '&.Mui-checked': {
                  color: buttonColor,
                },
              }} />}
              label="Часть предметов"
            />
          </RadioGroup>
        </FormControl>


      </Paper>
      <Paper sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        marginTop: 2,
      }}>
        {/* Если выбрана опция "Часть предметов", отображаем список с чекбоксами */}
        {selectedOption === "specific-subjects" && (
          <List>
            {groupData?.lessons.map((lesson) => (
              <ListItem key={lesson.id}>
                <ListItemText primary={lesson.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleLessonToggle(lesson.id)}
                    checked={selectedLessons.includes(lesson.id)}
                    sx={{
                      color: tg?.themeParams?.button_color || "primary",  // Цвет рамки чекбокса, если не выбран
                      '&.Mui-checked': {
                        color: tg?.themeParams?.button_color || "primary",  // Цвет галочки, если выбран
                      },
                      '& .MuiSvgIcon-root': {
                        fill: tg?.themeParams?.button_color || "primary",  // Цвет заливки иконки
                      }
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Button
        sx={{
          backgroundColor: buttonColor,
          color: buttonTextColor,
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        Заказать
      </Button>
    </Box>
  );
};

export default Choise;
