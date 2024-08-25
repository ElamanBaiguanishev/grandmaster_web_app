import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
    isCollapsed: boolean;
    isToggled: boolean;
    isBroken: boolean;
}

const initialState: SidebarState = {
    isCollapsed: false,
    isToggled: false,
    isBroken: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isToggled = !state.isToggled;
        },
        setIsCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload;
        },
        setIsBroken: (state, action: PayloadAction<boolean>) => {
            state.isBroken = action.payload;
        },
    },
});

export const { toggleSidebar, setIsCollapsed, setIsBroken } = sidebarSlice.actions;
export default sidebarSlice.reducer;
