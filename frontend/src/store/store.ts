import { configureStore } from '@reduxjs/toolkit'
import userReduser from "./user/userSlice"
import sidebarReducer from "./sidebar/sidebarSlice"

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        user: userReduser
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch