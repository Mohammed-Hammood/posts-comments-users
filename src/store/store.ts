"use client"
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { postsSlice } from "./slices/posts";
// import { createWrapper } from "next-redux-wrapper";
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
// import { persistStore, persistReducer } from 'redux-persist';

// import {
//   TypedUseSelectorHook,
//   useDispatch as useAppDispatch,
//   useSelector as useAppSelector,
// } from 'react-redux';

export const store = configureStore({
  reducer: {
    [postsSlice.name]: postsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// // Create a persistor for data persistence using Redux Persist
// const persistor = persistStore(store);

// // Extract the dispatch function from the store for convenience
// const { dispatch } = store;

// const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// // Create a custom useDispatch hook with typed dispatch
// const useDispatch = () => useAppDispatch<AppDispatch>();

// // Export the Redux store, persistor, dispatch, useSelector, and useDispatch for use in components
// export { store, persistor, dispatch, useSelector, useDispatch };
