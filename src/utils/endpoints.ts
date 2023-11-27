

export const Endpoints = {
    posts: ({ query, page }: Filters) => `/api/posts?query=${query}&page=${page}`,
    comments: (post_id: number) => `/api/comments/${post_id}`
}