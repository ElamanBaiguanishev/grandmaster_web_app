import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import api from "../../api/axios.api";
import { IGroup } from "../../types/group";

const MiniApp: React.FC = () => {
    const { group_id } = useParams<{ group_id: string }>(); // Извлекаем group_id из URL
    const [userId, setUserId] = useState<number | null>(null);
    const [isTelegram, setIsTelegram] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [groupData, setGroupData] = useState<IGroup | null>(null); 

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const response = await api.get(`groups/${group_id}`);  // Выполняем запрос к API
                setGroupData(response.data);  // Сохраняем полученные данные в состояние
            } catch (error) {
                console.error("Ошибка при получении данных о группе:", error);
            }
        };

        if (group_id) {
            fetchGroupData();  // Выполняем запрос, если group_id доступен
        }
    }, [group_id]);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setIsTelegram(true);
            setUserId(tg.initDataUnsafe.user.id);
        } else {
            setIsTelegram(true);
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

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "16px",
            }}
        >
            {isTelegram ? (
                <>
                    <Box sx={{ width: "100%", textAlign: "center" }}>
                        <img
                            src="\src\assets\mock_qr.svg"
                            alt="QR Code"
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                height: "auto",
                            }}
                        />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Заполните форму
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            width: "100%",
                        }}
                    >
                        <TextField
                            label="ФИО"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Учебный шифр"
                            variant="outlined"
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                        >
                            Приложите файл
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {fileName && (
                            <Typography variant="body2" sx={{ marginTop: "8px", textAlign: "center" }}>
                                Выбранный файл: {fileName}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Отправить
                        </Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: "16px" }}>
                        Ваш User ID: {userId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: "16px" }}>
                        Group Name: {groupData?.semester.name ?? "Загрузка..."}  {/* Добавлена проверка на наличие данных */}
                    </Typography>
                </>
            ) : (
                <Typography variant="h6" align="center">
                    Это приложение не открыто через Telegram
                </Typography>
            )}
        </Container>
    );
};

export default MiniApp;
