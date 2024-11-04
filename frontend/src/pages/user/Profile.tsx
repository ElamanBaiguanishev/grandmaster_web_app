import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserService } from '../../api/user.service';
import { IUser } from '../../types/user/user';
import { Card, CardContent, Typography, Box, Avatar, CircularProgress } from '@mui/material';

const Profile: FC = () => {
    const { profile_id } = useParams<{ profile_id: string }>();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async (user_id: string) => {
        setLoading(true);
        try {
            const response = await UserService.getUser(+user_id);
            setUser(response);
        } catch (error) {
            alert("Сервер недоступен");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profile_id) fetchUserData(profile_id);
    }, [profile_id]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Card sx={{ width: 400, p: 2 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ mr: 2, width: 56, height: 56 }}>
                        {user?.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h5">{user?.username}</Typography>
                </Box>
                <CardContent>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Email: {user?.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Роль: {user?.role.name} ({user?.role.type})
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Семестры: {user?.role.semesters ? user.role.semesters.join(', ') : 'Нет доступных семестров'}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
