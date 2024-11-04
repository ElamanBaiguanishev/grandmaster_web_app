import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeChoice } from './newtheme';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getTokenFromLocalStorage } from './helpers/localstorage.helper';
import { useEffect } from 'react';
import { AuthService } from './api/auth.service';
import { login, logout } from './store/user/userSlice';

function App() {
  const mode = useAppSelector((state) => state.theme.mode)
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()

    try {
      if (token) {
        const data = await AuthService.getProfile()

        if (data) {
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <ThemeProvider theme={createTheme(themeChoice(mode))}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
