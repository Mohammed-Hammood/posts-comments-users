"use client"
import React from 'react';
import style from './header.module.scss';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { ICON } from '@/components';
import { Endpoints } from '@/utils';
import { clearPosts, selectPosts, setFilters, setPosts, useAppDispatch, useAppSelector } from '@/store';
import { useFetch } from '@/hooks';
import { useRouter } from 'next/navigation';


export function Header() {
    const { filters } = useAppSelector(selectPosts)
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset, watch } = useForm();
    const { setUrl } = useFetch({ reducer: setPosts })
    const router = useRouter();

    const onSubmit = (text: string) => {
        if (text.trim().length > 0) {
            const updatedFilters = { ...filters, query: text.trim(), page: 1 }
            dispatch(clearPosts());
            dispatch(setFilters(updatedFilters));
            setUrl(Endpoints.posts(updatedFilters));
            router.replace("/");
        }
    }
    const resetPosts = () => {
        const updatedFilters = { ...filters, query: "", page: 1 }
        dispatch(setFilters(updatedFilters));
        dispatch(clearPosts())
        setUrl(Endpoints.posts(updatedFilters));
        reset();
        router.replace("/");
    }
    return (<header className={style.header}>
        <nav className={style.nav}>
            <Link href={"/"} className={style.home}>
                <ICON name='home-solid' color='#000' height='14px' />
            </Link>
            <form
                className={style.form}
                onSubmit={handleSubmit(({ text }) => onSubmit(text.trim()))}
            >
                {(watch("text") || filters.query.length > 0) &&
                    <button
                        title='Reset search'
                        onClick={() => resetPosts()}
                        className={style.clearBtn}
                        type="button">
                        <ICON name="xmark-solid" color='#000' />
                    </button>}
                <input
                    className={style.input}
                    {...register('text', { required: true })}
                    placeholder={"Search posts by title"}
                />
                <button className={style.submitBtn} type="submit">
                    <ICON name="search" color='#fff' />
                </button>
            </form>
        </nav>

    </header>
    );
}
