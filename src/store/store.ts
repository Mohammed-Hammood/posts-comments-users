"use client"
import { configureStore } from "@reduxjs/toolkit";
import { postsSlice, usersSlice } from "./slices";


export const store = configureStore({
    reducer: {
        [postsSlice.name]: postsSlice.reducer,
        [usersSlice.name]: usersSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;