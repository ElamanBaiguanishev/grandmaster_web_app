import { FC, useEffect } from 'react'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const MiniAppQR: FC = () => {
  const telegram = useAppSelector((state) => state.tg.tg);
  const navigate = useNavigate();
  const price = useAppSelector((state) => state.tg.price);

  useEffect(() => {
    if (telegram) {
      telegram.BackButton.show();
      telegram.MainButton.show();
      telegram.MainButton.setText("Продолжить");

      telegram.MainButton.enable();
      telegram.MainButton.color = "#3CB043"; // Зеленый цвет кнопки, когда она активна
      telegram.MainButton.textColor = "#FFFFFF"; // Белый цвет текста

      const handleClick = () => {
        navigate('/miniapp/final');
      }

      const backClick = () => {
        navigate("/miniapp/payment");
      }

      telegram.MainButton.onClick(handleClick);

      telegram.BackButton.onClick(backClick);

      return () => {
        if (telegram) {
          // telegram.BackButton.hide();
          // telegram.MainButton.hide();
          telegram.MainButton.offClick(handleClick);
          telegram.BackButton.offClick(backClick);
        }
      };
    }


  }, [telegram, navigate]);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: "16px",
          fontWeight: "bold",
        }}
      >
        Сумма к оплате {' '}
        <Box component='span' sx={{
          // color: 'red', // Выделение цветом
          fontWeight: 'bold',   // Жирный шрифт
          fontSize: '1.1em',    // Увеличенный размер шрифта
        }}>{price?.toFixed(2)} ₽</Box>
      </Typography>
      <Box sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}>
        <img src="/mock_qr.svg" alt="QR Code" style={{ width: "80%", maxWidth: "150px", height: "auto" }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginBottom: "16px",
          // fontWeight: "bold",
        }}
      >
        Сделайте скриншот QR-code и оплатите в приложении Вашего банка
      </Typography>
    </Box>
  );
}

export default MiniAppQR