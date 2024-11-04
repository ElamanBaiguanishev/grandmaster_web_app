import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { setFile } from '../../store/telegram/tgSlice';
import api from '../../api';

const MiniAppAtachFile: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const uploadedFile = useAppSelector((state) => state.tg.file);
    const stateTg = useAppSelector((state) => state.tg);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const enableButton = () => {
        if (telegram) {
            telegram.MainButton.enable();
            telegram.MainButton.color = "#3CB043";
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
            const telegram_nickname = stateTg.tg?.initDataUnsafe?.user?.username;
            const file = stateTg.file;
            const fio = stateTg.fio;
            const group = stateTg.group?.name.toString();
            const semester = stateTg.group?.semester?.name.toString();
            const course = stateTg.group?.semester?.course?.name.toString();
            const type = stateTg.type?.toString();

            if (!price || !telegram_user_id || !telegram_nickname || !file || !fio || !group || !type || !semester || !course) {
                alert('One or more fields are missing');
                return false;
            }

            formData.append("price", price);
            formData.append("telegram_user_id", telegram_user_id);
            formData.append("telegram_nickname", telegram_nickname);
            formData.append("image", file);
            formData.append("fio", fio);
            formData.append("group", group);
            formData.append("semester", semester);
            formData.append("course", course);
            formData.append("type", type);

            if (stateTg.lessons) {
                formData.append("lessons", JSON.stringify(stateTg.lessons));
            }

            await api.post('/orders/', formData);

            alert('Ваш заказ успешно завершен! В случае необходимости с вами свяжется наш менеджер');

            return true
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('Ошибка 400: ' + JSON.stringify(error.response.data));
                return false
            } else {
                alert('Ошибка: ' + error.message);
                return false
            }
        }
    }

    useEffect(() => {
        if (telegram) {
            telegram.BackButton.show();
            telegram.MainButton.show();
            telegram.MainButton.setText("ЗАВЕРШИТЬ ЗАКАЗ");

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

            const backClick = () => {
                navigate('/miniapp/qr');
            }

            telegram.BackButton.onClick(backClick);

            return () => {
                if (telegram) {
                    // telegram.BackButton.hide();
                    // telegram.MainButton.hide();
                    telegram.BackButton.offClick(backClick)
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
                Приложите чек оплаты и нажмите кнопку «ЗАВЕРШИТЬ ЗАКАЗ»
            </Typography>

            <Button
                variant="contained"
                component="label"
                fullWidth
            >
                Приложить чек оплаты
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
