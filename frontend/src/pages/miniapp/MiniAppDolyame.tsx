import { Box, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const MiniAppDolyame: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const navigate = useNavigate();

    useEffect(() => {
        if (telegram) {
            telegram.MainButton.hide();
            telegram.BackButton.show();

            const backClick = () => {
                navigate("/miniapp/payment");
            }

            telegram.BackButton.onClick(backClick);

            return () => {
                telegram.BackButton.offClick(backClick);
            };
        }



    }, [telegram, navigate]);
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6" color="error">
                В РАЗРАБОТКЕ
            </Typography>
        </Box>
    )
}

export default MiniAppDolyame