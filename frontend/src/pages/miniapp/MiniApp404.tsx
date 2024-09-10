import { FC, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

const MiniApp404: FC = () => {
    const telegram = useAppSelector((state) => state.tg.tg);
    const navigate = useNavigate();
    const location = useLocation(); // Получаем текущий маршрут


    useEffect(() => {
        if (telegram) {
            telegram.BackButton.show();
            telegram.BackButton.onClick(() => {
                navigate("/miniapp/:group_id");
            });
        }

        return () => {
            telegram?.BackButton.hide();
        };
    }, [telegram, navigate]);

    return (
        <div>
            <h1>Ошибка 404</h1>
            <p>Страница не найдена.</p>
            <p>Страница по адресу <strong>{location.pathname}</strong> не найдена.</p>
        </div>
    );
};

export default MiniApp404;
