import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeChoice } from './newtheme';
import { useAppSelector } from './store/hooks';

function App() {
  const mode = useAppSelector((state) => state.theme.mode)

  return (
    <ThemeProvider theme={createTheme(themeChoice(mode))}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
