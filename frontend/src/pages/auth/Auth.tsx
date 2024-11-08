import { FC, useState } from "react";
import { setTokenToLocalStorage } from "../../helpers/localstorage.helper";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../api/auth.service";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { IUserPayloadData } from "../../types/user/user.payload";
import { toast } from "react-toastify"


const Auth: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const userData: IUserPayloadData = { email, password }

            const data = await AuthService.login(userData);

            if (data) {
                setTokenToLocalStorage('token', data.token);
                dispatch(login(data));
                toast.success('Вы успешно вошли в систему.');
                navigate('/');
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString())
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Форма входа
                </Typography>
                <Box component="form" onSubmit={loginHandler} sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
                        Войти
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;
