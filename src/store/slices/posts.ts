import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { HYDRATE } from "next-redux-wrapper";

 
export interface PostsState {
    posts: Post[];
    posts_count:number;
    filters: Filters;
    loading: boolean;
}

 
const initialState: PostsState = {
    posts: [],
    loading: true,
    posts_count:0,
    filters: {
        order: "-id",
        limit:10,
        page: 1,
        query:""
    }
};

 
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // Action to set the authentication status
        setPosts(state, action:PayloadAction<{posts:Post[], posts_count:number}>) {
            state.posts = action.payload.posts;
            state.posts_count = action.payload.posts_count;
            state.loading = false;
        },
        setFilters(state, action: PayloadAction<Filters>){
            state.filters = action.payload;
        },
        resetFilters(state){
            state.filters = initialState.filters;
        },
        clearPosts(state) {
            state.posts = [];
            state.loading = true;
        }
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.posts,
            };
        },
    },
});

export const { setPosts, setFilters, resetFilters, clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;