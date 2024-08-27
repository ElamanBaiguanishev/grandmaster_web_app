import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";

const MiniApp: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [isTelegram, setIsTelegram] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setIsTelegram(true);
            setUserId(tg.initDataUnsafe.user.id);
        } else {
            setIsTelegram(false);
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
                            src="src\assets\mock_qr.svg"
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
