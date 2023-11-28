"use client"
import React, { useState } from 'react';
import styles from './post.module.scss';
import { selectPosts, useAppSelector } from '@/store';
import { PostCard, CommentCard, Loader, Modal } from '@/components';
import { useFetch } from '@/hooks';
import { Endpoints } from '@/utils';


export default function Post({ params: { post_id } }: { params: { post_id: string } }) {
    const { posts } = useAppSelector(selectPosts);
    const [userId, setUserId] = useState<null | number>(null);
    const [post, setPost] = useState<Post | undefined>(posts.find(item => item.id === parseInt(post_id)))

    const [comments, setComments] = useState<CommentT[]>([]);
    const setData = (data: { comments: CommentT[], post: Post }) => {
        setComments(data.comments);
        setPost(data.post);
    }

    useFetch({
        reducer: setData,
        url: Endpoints.comments(parseInt(post_id))
    })

    return (
        <main className={styles.main}>
            <div className={styles.centerWrapper}>
                {post
                    ? <PostCard
                        {...{
                            post,
                            setUserId
                        }}
                    />
                    : <Loader size={1} />
                }

                {comments.length > 0 &&
                    <div className={styles.commentsCount}>
                        Comments {comments.length}
                    </div>}

                <div className={styles.commentsWrapper}>
                    {comments.map(item => <CommentCard key={item.id} comment={item} />)}
                </div>
            </div>
            <Modal
                isVisible={userId !== null}
                onClose={() => setUserId(null)}
                userId={userId}
            />
        </main>
    );


}
