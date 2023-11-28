import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
    users: User[];
    users_count: number;
}


const initialState: UsersState = {
    users: [],
    users_count: 0,
};


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<{ users: User[], users_count: number }>) {
            state.users = action.payload.users;
            state.users_count = action.payload.users_count;
        },
    },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;