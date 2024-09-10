import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PaletteMode } from '@mui/material';

// Интерфейс состояния для темы
interface themeState {
    mode: PaletteMode;
}

// Изначально установим светлую тему
const initialState: themeState = {
    mode: 'light',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchMode: (state, action: PayloadAction<PaletteMode>) => {
            state.mode = action.payload
        }
    },
});

// Экспортируем действие для смены темы
export const { switchMode } = themeSlice.actions;

// Селектор для получения текущей темы
export const selectTheme = (state: RootState) => state.theme.mode;

// Экспортируем редьюсер по умолчанию
export default themeSlice.reducer;

