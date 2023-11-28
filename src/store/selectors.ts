import { RootState } from "./store";


export const selectPosts = (state: RootState) => state.posts;

export const selectUsers = (state: RootState) => state.users;

