import { FC, useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { IRole } from '../../types/role/role';
import { AuthService } from '../../api/auth.service';
import { IUserRegPayloadData } from '../../types/user/user.payload';
import { RoleService } from '../../api/role.service';
import { toast } from 'react-toastify';

const RegistrationPage: FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<IRole[]>([]);
  const [roleId, setRoleId] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const rolesData = await RoleService.getRoles();
      setRoles(rolesData);
    };
    fetchData();
  }, []);

  const handleRegister = async () => {
    if (!email || !username || !password || !roleId) {
      toast.warning('Пожалуйста, заполните все поля!')
      return;
    }

    const userData: IUserRegPayloadData = {
      email,
      username,
      password,
      roleId
    };

    try {
      await AuthService.registration(userData);
      toast.success('Регистрация успешна!');
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString())
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto' }}>
      <Typography variant="h4" align="center">Регистрация сотрудника</Typography>

      <TextField
        label="Email"
        name="email"
        autoComplete="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Имя пользователя"
        name="username"
        autoComplete="username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        autoComplete="new-password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="role-label">Роль</InputLabel>
        <Select
          labelId="role-label"
          value={roleId}
          label="Роль"
          onChange={(e) => setRoleId(e.target.value as unknown as number)}
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleRegister}>
        Зарегистрировать
      </Button>
    </Box>
  );
};

export default RegistrationPage;
