import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 
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

});

export const { setPosts, setFilters, resetFilters, clearPosts } = postsSlice.actions;


export default postsSlice.reducer;