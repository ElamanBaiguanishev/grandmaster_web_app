import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ILesson } from "../../../types/lesson";

const MiniApp: React.FC = () => {
    const location = useLocation();
    const { lessons, fullName } = location.state as { lessons: ILesson[], fullName: string };
    const [tg, setTg] = useState<WebApp | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null); // Сохраняем файл
    const [totalPrice, setTotalPrice] = useState<number>(0); // Общая сумма цен
    const [error, setError] = useState<string | null>(null); // Состояние для отображения ошибок

    useEffect(() => {
        const telegram = window.Telegram?.WebApp;
        if (telegram) {
            setTg(telegram);
            telegram.expand();
        }

        // Подсчёт общей суммы
        const totalPrice = lessons.reduce((acc, lesson) => {
            const taskPriceSum = lesson.tasks.reduce((taskAcc, task) => {
                return +taskAcc + +task.price;
            }, 0);
            return acc + taskPriceSum;
        }, 0);

        setTotalPrice(totalPrice);
        setError(`${totalPrice}`)
    }, [lessons]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile); // Сохраняем файл для отправки
        } else {
            setFileName(null);
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        setError(null); // Сбрасываем состояние ошибки перед началом отправки

        if (!tg) {
            setError("Не удается получить данные Telegram.");
            return;
        }

        if (!file) {
            setError("Не выбран файл для загрузки.");
            return;
        }

        const formData = new FormData();
        formData.append("price", totalPrice.toFixed(2)); // Преобразуем сумму в строку с двумя знаками после запятой
        formData.append("telegram_user_id", tg.initDataUnsafe!.user!.id.toString()); // ID пользователя из Telegram
        formData.append("image", file); // Изображение

        try {
            const response = await fetch(`https://grandmaster55.ru/api/orders/`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text(); // Чтение тела ответа с ошибкой
                throw new Error(`Ошибка сервера: ${response.statusText}. Детали: ${errorText}`);
            }

            setError("Данные успешно отправлены!");
        } catch (error) {
            const errorMessage = `Произошла ошибка при отправке данных: ${(error as Error).message}`;
            setError(errorMessage);
        }
    };


    // Получаем стили Telegram WebApp для динамического изменения темы
    const backgroundColor = tg?.themeParams?.bg_color || "#ffffff";
    const textColor = tg?.themeParams?.text_color || "#000000";
    const buttonColor = tg?.themeParams?.button_color || "#0088cc";
    const buttonTextColor = tg?.themeParams?.button_text_color || "#ffffff";
    const tableBackgroundColor = tg?.themeParams?.secondary_bg_color || "#f1f1f1";
    const tableBorderColor = tg?.themeParams?.hint_color || "#dddddd";

    return (
        <Box
            sx={{
                padding: "8px",
                width: "100%",
                backgroundColor: backgroundColor,
                color: textColor,
                minHeight: "100vh",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    padding: "4px",
                    marginBottom: "8px",
                    backgroundColor: tableBackgroundColor,
                    color: textColor,
                    borderColor: tableBorderColor,
                }}
                elevation={2}
            >
                <Typography variant="h6" sx={{ fontSize: "14px", textAlign: "center", color: textColor }}>
                    Выбранные предметы:
                </Typography>

                {/* Таблица для отображения предметов и заданий */}
                <Table
                    sx={{
                        width: "100%",
                        marginTop: "4px",
                        backgroundColor: tableBackgroundColor, // Цвет фона таблицы
                        color: textColor,
                        borderColor: tableBorderColor, // Граница таблицы
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: textColor,
                                    borderBottom: `1px solid ${tableBorderColor}`,
                                    paddingBottom: "0.5px",
                                    paddingTop: "0.5px"
                                }}
                            >
                                Предмет
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: textColor,
                                    borderBottom: `1px solid ${tableBorderColor}`,
                                    paddingBottom: "0.5px",
                                    paddingTop: "0.5px"
                                }}
                            >
                                Задание
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: textColor,
                                    borderBottom: `1px solid ${tableBorderColor}`,
                                    paddingBottom: "0.5px",
                                    paddingTop: "0.5px"
                                }}
                            >
                                Цена
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson) =>
                            lesson.tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell
                                        sx={{
                                            fontSize: "12px",
                                            color: textColor,
                                            borderBottom: `1px solid ${tableBorderColor}`,
                                            paddingBottom: "0.5px",
                                            paddingTop: "0.5px"
                                        }}
                                    >
                                        {lesson.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: "10px",
                                            color: textColor,
                                            borderBottom: `1px solid ${tableBorderColor}`,
                                            paddingBottom: "0.5px",
                                            paddingTop: "0.5px"
                                        }}
                                    >
                                        {task.type}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: "10px",
                                            color: textColor,
                                            borderBottom: `1px solid ${tableBorderColor}`,
                                            paddingBottom: "0.5px",
                                            paddingTop: "0.5px"
                                        }}
                                    >
                                        {task.price}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {/* Добавление строки для общей суммы */}
                        <TableRow>
                            <TableCell colSpan={2} sx={{
                                fontSize: "10px",
                                color: textColor,
                                borderBottom: `1px solid ${tableBorderColor}`,
                                paddingBottom: "0.5px",
                                paddingTop: "0.5px"
                            }}>
                                Общая сумма:
                            </TableCell>
                            <TableCell sx={{
                                fontSize: "10px",
                                color: textColor,
                                borderBottom: `1px solid ${tableBorderColor}`,
                                paddingBottom: "0.5px",
                                paddingTop: "0.5px"
                            }}>
                                {totalPrice.toFixed(2)} ₽
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            {/* ФИО */}
            <Typography variant="h6" sx={{ fontSize: "12px", textAlign: "center", marginBottom: "8px", color: textColor }}>
                Ваше ФИО: {fullName}
            </Typography>

            {/* QR-код */}
            <Box sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}>
                <img src="\src\assets\mock_qr.svg" alt="QR Code" style={{ width: "80%", maxWidth: "150px", height: "auto" }} />
            </Box>

            {/* Загрузка файла */}
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ fontSize: "12px", padding: "6px", backgroundColor: buttonColor, color: buttonTextColor }}
                >
                    Приложите файл
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {fileName && (
                    <Typography variant="body2" sx={{ fontSize: "10px", textAlign: "center", marginTop: "4px", color: textColor }}>
                        Выбранный файл: {fileName}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ fontSize: "12px", padding: "6px" }}
                    onClick={handleSubmit}
                >
                    Отправить
                </Button>
            </Box>

            {/* User ID */}
            {tg && (
                <Typography variant="body2" sx={{ marginTop: "8px", fontSize: "10px", color: textColor }}>
                    Ваш User ID: {tg.initDataUnsafe!.user!.id}
                </Typography>
            )}

            {/* Лейбл для отображения ошибок */}
            {error && (
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: "12px",
                        fontSize: "12px",
                        color: "red", // Цвет ошибки
                        textAlign: "center",
                    }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default MiniApp;
