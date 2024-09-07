import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ILesson } from "../../types/group";

const MiniApp: React.FC = () => {
    const location = useLocation();
    const { lessons, fullName } = location.state as { lessons: ILesson[], fullName: string };
    const [tg, setTg] = useState<WebApp | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        const telegram = window.Telegram?.WebApp;
        if (telegram) {
            setTg(telegram);
            telegram.expand();
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    // Получаем стили Telegram WebApp для динамического изменения темы
    const backgroundColor = tg?.themeParams?.bg_color || "#ffffff"; // Цвет фона
    const textColor = tg?.themeParams?.text_color || "#000000"; // Цвет текста
    const buttonColor = tg?.themeParams?.button_color || "#0088cc"; // Цвет кнопок
    const buttonTextColor = tg?.themeParams?.button_text_color || "#ffffff"; // Цвет текста на кнопках
    const tableBackgroundColor = tg?.themeParams?.secondary_bg_color || "#f1f1f1"; // Цвет фона таблицы в зависимости от темы
    const tableBorderColor = tg?.themeParams?.hint_color || "#dddddd"; // Цвет границы таблицы

    return (
        <Box
            sx={{
                padding: "8px",
                width: "100%",
                backgroundColor: backgroundColor, // Используем цвет фона из темы Telegram
                color: textColor,
                minHeight: "100vh",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    padding: "4px",
                    marginBottom: "8px",
                    backgroundColor: tableBackgroundColor, // Цвет фона таблицы
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
                    </TableBody>
                </Table>
            </Paper>

            {/* ФИО */}
            <Typography
                variant="h6"
                sx={{ fontSize: "12px", textAlign: "center", marginBottom: "8px", color: textColor }}
            >
                Ваше ФИО: {fullName}
            </Typography>

            {/* QR-код */}
            <Box sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}>
                <img
                    src="\src\assets\mock_qr.svg"
                    alt="QR Code"
                    style={{ width: "80%", maxWidth: "150px", height: "auto" }}
                />
            </Box>

            {/* Загрузка файла */}
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}
            >
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{
                        fontSize: "12px",
                        padding: "6px",
                        backgroundColor: buttonColor, // Цвет кнопок
                        color: buttonTextColor, // Цвет текста на кнопках
                    }}
                >
                    Приложите файл
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {fileName && (
                    <Typography
                        variant="body2"
                        sx={{ fontSize: "10px", textAlign: "center", marginTop: "4px", color: textColor }}
                    >
                        Выбранный файл: {fileName}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ fontSize: "12px", padding: "6px" }}
                >
                    Отправить
                </Button>
            </Box>

            {/* User ID */}
            {tg && (
                <Typography
                    variant="body2"
                    sx={{ marginTop: "8px", fontSize: "10px", color: textColor }}
                >
                    Ваш User ID: {tg!.initDataUnsafe!.user!.id}
                </Typography>
            )}
        </Box>
    );
};

export default MiniApp;
