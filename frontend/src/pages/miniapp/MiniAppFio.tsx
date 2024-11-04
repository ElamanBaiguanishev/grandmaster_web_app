import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, TextField, Typography } from '@mui/material';
import { setfio } from '../../store/telegram/tgSlice';

const MiniAppFio: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const fio = useAppSelector((state) => state.tg.fio); // Получаем текущее значение ФИО из глобального состояния
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>(fio || ""); // Устанавливаем текущее значение ФИО в локальное состояние
    const dispatch = useAppDispatch();

    const enableButton = () => {
        if (telegram) {
            telegram.MainButton.enable();
            telegram.MainButton.color = "#3CB043"; // Зеленый цвет кнопки, когда она активна
            telegram.MainButton.textColor = "#FFFFFF"; // Белый цвет текста
        }
    };

    const disableButton = () => {
        if (telegram) {
            telegram.MainButton.disable();
            telegram.MainButton.color = "#B0BEC5"; // Серый цвет кнопки, когда она отключена
            telegram.MainButton.textColor = "#FFFFFF"; // Белый цвет текста
        }
    };

    useEffect(() => {
        if (telegram) {
            telegram.BackButton.show();
            telegram.MainButton.show();
            telegram.MainButton.setText("Продолжить");

            if (!fullName.trim()) {
                disableButton();
            } else {
                enableButton();
            }

            const handleClick = () => {
                dispatch(setfio(fullName));
                navigate('/miniapp/payment');
            }

            const backClick = () => {
                navigate("/miniapp/:group_id");
            }

            telegram.MainButton.onClick(handleClick);

            telegram.BackButton.onClick(backClick);

            return () => {
                if (telegram) {
                    // telegram.BackButton.hide();
                    // telegram.MainButton.hide();
                    telegram.MainButton.offClick(backClick)
                    telegram.MainButton.offClick(handleClick);
                }
            };
        }


    }, [telegram, navigate, fullName, dispatch]);

    // Обновляем кнопку при изменении значения ФИО
    useEffect(() => {
        if (telegram) {
            if (!fullName.trim()) {
                disableButton(); // Отключаем кнопку и меняем цвет на серый
            } else {
                enableButton(); // Включаем кнопку и меняем цвет на зеленый
            }
        }
    }, [fullName, telegram]);

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    marginBottom: "16px",
                    // fontWeight: "bold",
                }}
            >
                Введите Ваше ФИО и нажмите кнопку продолжить
            </Typography>
            <TextField
                label="ФИО"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} // Обновляем локальное состояние
                required
                fullWidth
            />
        </Box>);
}

export default MiniAppFio;
