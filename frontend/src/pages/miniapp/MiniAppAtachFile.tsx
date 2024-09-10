import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { setFile } from '../../store/telegram/tgSlice';
import api from '../../api/axios.api';

const MiniAppAtachFile: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const uploadedFile = useAppSelector((state) => state.tg.file);
    const stateTg = useAppSelector((state) => state.tg);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const enableButton = () => {
        if (telegram) {
            telegram.MainButton.enable();
            telegram.MainButton.color = "#FF0000";
            telegram.MainButton.textColor = "#FFFFFF";
        }
    };

    const disableButton = () => {
        if (telegram) {
            telegram.MainButton.disable();
            telegram.MainButton.color = "#B0BEC5";
            telegram.MainButton.textColor = "#FFFFFF";
        }
    };

    async function upload(): Promise<boolean> {
        try {
            const formData = new FormData();

            const price = stateTg.price?.toFixed(2);
            const telegram_user_id = stateTg.tg?.initDataUnsafe?.user?.id.toString();
            const file = stateTg.file;
            const fio = stateTg.fio;
            const group_id = stateTg.group?.id.toString();

            if (!price || !telegram_user_id || !file || !fio || !group_id) {
                alert('One or more fields are missing');
                return false;
            }

            formData.append("price", price);
            formData.append("telegram_user_id", telegram_user_id);
            formData.append("image", file);
            formData.append("fio", fio);
            formData.append("group_id", group_id);

            if (stateTg.lessons) {
                formData.append("lessons", JSON.stringify(stateTg.lessons));
            }

            await api.post('/orders/', formData);

            alert('Заказ успешно оформлен');

            return true
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('Ошибка 400: ' + JSON.stringify(error.response.data));
                return false
            } else {
                alert('Ошибка при загрузке файла: ' + error.message);
                return false
            }
        }
    }

    useEffect(() => {
        if (telegram) {
            telegram.BackButton.show();
            telegram.MainButton.show();
            telegram.MainButton.setText("Завершить");

            const handleClick = async () => {
                if (uploadedFile) {
                    const result = await upload();
                    if (result) {
                        navigate("/miniapp/:group_id");
                    }
                }
            };

            if (!uploadedFile) {
                disableButton();
            } else {
                enableButton();
            }

            telegram.MainButton.onClick(handleClick);

            telegram.BackButton.onClick(() => {
                navigate('/miniapp/qr');
            });

            return () => {
                if (telegram) {
                    telegram.BackButton.hide();
                    telegram.MainButton.hide();
                    telegram.MainButton.offClick(handleClick);
                }
            };
        }
    }, [telegram, navigate, uploadedFile, dispatch, upload]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(setFile(file));
        }
    };

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    marginBottom: "16px",
                }}
            >
                Приложите файл и нажмите кнопку завершить
            </Typography>

            <Button
                variant="contained"
                component="label"
                fullWidth
            >
                Загрузить файл
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>

            {/* Отображение имени файла, если файл был выбран */}
            {uploadedFile && (
                <Typography
                    variant="body2"
                    sx={{
                        textAlign: "center",
                        marginTop: "8px",
                        fontStyle: "italic",
                    }}
                >
                    Загружен файл: {uploadedFile.name}
                </Typography>
            )}
        </Box>
    );
};

export default MiniAppAtachFile;
