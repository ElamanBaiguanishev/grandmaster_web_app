import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const MiniAppChoice: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);

    useEffect(() => {
        if (telegram) {
            telegram.MainButton.hide();
        }
    }, [telegram]);

    return (
        <Box
            sx={{
                padding: "16px",
            }}
        >
            {/* Заголовок */}
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    marginBottom: "16px",
                    fontWeight: "bold",
                }}
            >
                Выберите, что Вы хотите заказать
            </Typography>

            <Grid
                container
                spacing={4}
                sx={{
                    padding: 2,
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
                        }}
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
                        }}
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
                        }}
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
                        }}
                    >
                        Часть предметов
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MiniAppChoice;
