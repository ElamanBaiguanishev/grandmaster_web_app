import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useAppSelector } from '../../store/hooks';

const MiniAppPayment: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const navigate = useNavigate();

    useEffect(() => {
        if (telegram) {
            telegram.MainButton.hide();
            telegram.BackButton.show();

            const backClick = () => {
                navigate('/miniapp/fio');
            }

            telegram.BackButton.onClick(backClick);

            return () => {
                if (telegram) {
                    telegram.MainButton.hide();
                    telegram.BackButton.offClick(backClick)
                }
            };
        }
    }, [telegram, navigate]);

    const handleFullPayment = () => {
        navigate('/miniapp/qr'); // Перенаправление на страницу полной оплаты
    };

    const handleInstallmentPayment = () => {
        navigate('/miniapp/dolyame'); // Перенаправление на страницу оплаты в рассрочку
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                mt: 4 // Добавляем отступ сверху
            }}
        >
            <Button
                variant="contained"
                onClick={handleFullPayment}
                sx={{
                    width: '90%',
                    height: '60px', // Увеличиваем высоту кнопки
                    marginBottom: 2,
                    background: '#3CB043',
                }}
            >
                Оплатить сразу целиком
            </Button>
            <Button
                variant="contained"
                onClick={handleInstallmentPayment}
                sx={{
                    width: '90%',
                    height: '60px', // Увеличиваем высоту кнопки
                    background: '#3CB043',
                }}
            >
                Оплатить через сервис долями
            </Button>
        </Box>
    );
};

export default MiniAppPayment;
