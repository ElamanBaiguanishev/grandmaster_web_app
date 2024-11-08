import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IGroup } from '../../types/group/group'
import { ILesson } from '../../types/lesson/lesson'

interface TgState {
    tg: WebApp | null
    group: IGroup | null
    lessons: ILesson[] | null
    fio: string | null
    price: number | null,
    file: File | null,
    type: string | null
}

const initialState: TgState = {
    tg: null,
    group: null,
    lessons: null,
    fio: null,
    price: null,
    file: null,
    type: null
}

export const tgSlice = createSlice({
    name: 'tg',
    initialState,
    reducers: {
        setTg: (state, action: PayloadAction<WebApp>) => {
            state.tg = action.payload
        },
        setGroup: (state, action: PayloadAction<IGroup>) => {
            state.group = action.payload
        },
        setLessons: (state, action: PayloadAction<ILesson[]>) => {
            state.lessons = action.payload
        },
        setfio: (state, action: PayloadAction<string>) => {
            state.fio = action.payload
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload
        },
        setFile: (state, action: PayloadAction<File>) => {
            state.file = action.payload
        },
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload
        },
    },
})

export const { setTg, setGroup, setLessons, setfio, setPrice, setFile, setType } = tgSlice.actions

export const selectCount = (state: RootState) => state.tg

export default tgSlice.reducer