import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setType } from '../../store/telegram/tgSlice';

const MiniAppChoice: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (telegram) {
            telegram.BackButton.hide();
            telegram.MainButton.hide();
        }
    }, [telegram]);

    return (
        <Box
            sx={{
                padding: "0px",
            }}
        >
            {/* Заголовок */}
            <Typography
                variant="h1"
                sx={{
                    textAlign: "center",
                    padding: 0,
                    margin: 0,
                    lineHeight: '33.3552px',
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontWeight: '500',
                    fontSize: "19px",
                    marginBottom: '15px'
                }}
            >
                Выберите, что Вы хотите заказать
            </Typography>

            <Grid
                container
                spacing={2}
                sx={{
                    // padding: 2,
                }}
            >
                <Grid item xs={6}>
                    <Button
                        component={Link}
                        to="alltask"
                        variant="contained"
                        size="large"
                        fullWidth
                        color='inherit'
                        sx={{
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            borderRadius: '16px'
                        }}
                        onClick={()=> {dispatch(setType('Вся сессия'))}}
                    >
                        Вся сессия
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        component={Link}
                        to="allkr"
                        variant="contained"
                        size="large"
                        fullWidth
                        color='inherit'
                        sx={{
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            borderRadius: '16px'
                        }}
                        onClick={()=> {dispatch(setType('Все контрольные'))}}
                    >
                        Только все контрольные
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        component={Link}
                        to="allexam"
                        variant="contained"
                        size="large"
                        fullWidth color='inherit'
                        sx={{
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            borderRadius: '16px'
                        }}
                        onClick={()=> {dispatch(setType('Все экзамены'))}}
                    >
                        Только все экзамены
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        component={Link}
                        to="choisetask"
                        variant="contained"
                        size="large"
                        fullWidth color='inherit'
                        sx={{
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            borderRadius: '16px'
                        }}
                        onClick={()=> {dispatch(setType('Часть предметов'))}}
                    >
                        Часть предметов
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MiniAppChoice;
