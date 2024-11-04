import { FC, useEffect } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import {
    useAppDispatch,
    useAppSelector,
} from '../../store/hooks';
import { setGroup, setTg } from '../../store/telegram/tgSlice';
import { Outlet, useParams } from 'react-router-dom';
import './miniapp.css';
import { switchMode } from '../../store/theme/themeSlice';
import { GroupService } from '../../api/group.service';

const MiniAppLayout: FC = () => {
    const { group_id } = useParams<{ group_id: string }>();
    const group = useAppSelector((state) => state.tg.group);
    const dispatch = useAppDispatch();
    const tg = useAppSelector((state) => state.tg.tg);

    dispatch(switchMode('dark'));

    const fetchGroupData = async (group_id: number) => {
        const response = await GroupService.getGroupById(+group_id);
        if (response)
            dispatch(setGroup(response));
        else
            alert("Сервер недоступен");
    };

    useEffect(() => {
        const telegram = window.Telegram?.WebApp;
        if (!tg) {
            if (telegram) {
                dispatch(setTg(telegram));
            }
        }

        if (group_id) {
            if (!group) {
                fetchGroupData(+group_id);
            }
        }

        return () => {
            if (telegram) {
                telegram.BackButton.hide();
                telegram.MainButton.hide();
            }
        };
    }, [dispatch, group_id, group]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
            }}
        >
            <AppBar
                position="sticky"
                sx={{ height: '64px' }} // Задаем фиксированную высоту AppBar
            >
                <Toolbar sx={{ padding: 0 }}>
                    <Box
                        component="img"
                        src="/logo.PNG" // Путь к изображению
                        alt="Грандмастер"
                        sx={{
                            width: '100%', // Растягиваем на всю ширину
                            height: '64px', // Высота совпадает с высотой AppBar
                            objectFit: 'cover', // Устанавливаем масштабирование, чтобы изображение покрывало весь контейнер
                        }}
                    />
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
                <Box sx={{ flexGrow: 1, padding: '12px', paddingTop: '5px' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MiniAppLayout;
