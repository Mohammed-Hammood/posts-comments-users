"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PostCard, Loader, ICON, Modal } from '@/components';
import styles from '@/styles/Home.module.scss';
import { selectPosts, setFilters, setPosts, clearPosts, useAppDispatch, useAppSelector } from '@/store';
import { useFetch } from '@/hooks';
import { Endpoints } from '@/utils';


export default function HomePage() {
    const [userId, setUserId] = useState<null | number>(null);
    const { posts, posts_count, filters, loading } = useAppSelector(selectPosts)
    const dispatch = useAppDispatch();
    const url = Endpoints.posts(filters);
    const { page, limit } = filters;

    const { setUrl } = useFetch({
        reducer: setPosts,
        url: posts_count === 0 ? url : null
    })

    const pageChangeHandler = (value: number): void => {
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
                    <ReactPaginate
                        pageCount={Math.ceil(posts_count / limit)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={({ selected }: { selected: number }) => pageChangeHandler(selected + 1)}
                        containerClassName={styles.pagination}
                        activeClassName={styles.active}
                        initialPage={page - 1}
                        nextLabel={<ICON name='angles-right' height={"15px"} width='15px' />}
                        previousLabel={<ICON name='angles-left' height={"15px"} width='15px' />}

                    />}
                    
                <div className={styles.postsWrapper}>
                    {loading
                        ? <Loader size={10} />
                        : posts.map(post => (
                            <PostCard
                                post={post}
                                setUserId={setUserId}
                                key={post.id}
                            />
                        ))}

                </div>
                {posts_count > limit &&
                    <ReactPaginate
                        pageCount={Math.ceil(posts_count / limit)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={({ selected }: { selected: number }) => pageChangeHandler(selected + 1)}
                        containerClassName={styles.pagination}
                        activeClassName={styles.active}
                        initialPage={page - 1}
                        nextLabel={<ICON name='angles-right' height={"15px"} width='15px' />}
                        previousLabel={<ICON name='angles-left' height={"15px"} width='15px' />}

                    />}
            </div>
            <Modal
                isVisible={userId !== null}
                onClose={() => setUserId(null)}
                userId={userId}
            />
        </main>
    );

}
