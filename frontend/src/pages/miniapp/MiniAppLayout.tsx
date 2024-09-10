import { FC, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import {
    useAppDispatch,
    useAppSelector,
    // useAppSelector 
} from '../../store/hooks';
import { setGroup, setTg } from '../../store/telegram/tgSlice';
import { Outlet, useParams } from 'react-router-dom';
import { getGroup } from '../../api/groupApi';
import './miniapp.css'
import { switchMode } from '../../store/theme/themeSlice';

const MiniAppLayout: FC = () => {
    const { group_id } = useParams<{ group_id: string }>();
    const group = useAppSelector((state) => state.tg.group);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    dispatch(switchMode('dark'))

    const fetchGroupData = async (group_id: number) => {
        const response = await getGroup(+group_id);
        if (response)
            dispatch(setGroup(response));
        else
            alert("Сервер недоступен");
    };

    useEffect(() => {
        const telegram = window.Telegram?.WebApp;
        if (telegram) {
            dispatch(setTg(telegram));
        }

        if (group_id) {
            if (!group) {
                fetchGroupData(+group_id)
            }
        }

        return () => {
            if (telegram) {
                telegram.SettingsButton.onClick(() => null)
                telegram.BackButton.hide();
                telegram.MainButton.hide();
            }
        };
    }, [dispatch, group_id, group]);


    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: theme.palette.mode == 'dark' ? '#303030' : theme.palette.background.default,
            }}
        >
            <AppBar
                position="static"
            >
                <Toolbar>
                    <Typography
                        variant="h1"
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                        }}
                    >
                        Грандмастер
                    </Typography>
                </Toolbar>
                {/* <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    {useTheme().palette.mode}
                </Typography>

                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Курс: {group?.semester.course.name} Семестр: {group?.semester.name}  Группа: {group?.name}
                </Typography> */}
            </AppBar>
            <Box
                component="main"
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MiniAppLayout;
