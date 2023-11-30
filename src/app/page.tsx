"use client"
import React, { useState } from 'react';
import { useFetch, PostCard, Loader, Modal, Pagination } from '@/components';
import styles from '@/styles/home.module.scss';
import { selectPosts, setFilters, setPosts, clearPosts, useAppDispatch, useAppSelector } from '@/store';
import { Endpoints } from '@/utils';


export default function HomePage() {
    const [userId, setUserId] = useState<null | number>(null);
    const { posts, posts_count, filters, loading } = useAppSelector(selectPosts);
    const dispatch = useAppDispatch();
    const url = Endpoints.posts(filters);
    const { page, limit } = filters;

    const { setUrl } = useFetch({
        reducer: setPosts,
        url: posts_count === 0 ? url : null
    })

    const setPage = (value: number): void => {
        if (value !== page) {
            dispatch(clearPosts());
            dispatch(setFilters({ ...filters, page: value }));
            setUrl(Endpoints.posts({ ...filters, page: value }));
        }
    }
    return (
        <main className={styles.container}>
            <div className={styles.centerWrapper}>
                {posts_count > limit &&
                    <Pagination
                        total_pages={Math.ceil(posts_count / limit)}
                        page={page}
                        setPage={setPage}
                    />
                }

                <div className={styles.postsWrapper}>
                    {loading
                        ? <Loader size={limit} />
                        : posts.map(post => (
                            <PostCard
                                post={post}
                                setUserId={setUserId}
                                key={post.id}
                            />
                        ))}

                </div>
                {posts_count > limit &&
                    <Pagination
                        total_pages={Math.ceil(posts_count / limit)}
                        page={page}
                        setPage={setPage}
                    />
                }
            </div>
            <Modal
                isVisible={userId !== null}
                onClose={() => setUserId(null)}
                userId={userId}
            />
        </main>
    );

}
