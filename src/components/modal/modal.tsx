"use client";
import { useEffect, useId, useState } from 'react';
import { Loader, ICON, Portal } from '@/components';
import styles from "./modal.module.scss";
import { useAppSelector, selectUsers, setUsers } from '@/store';
import { useFetch } from '@/hooks';
import { Endpoints } from '@/utils';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    userId: number | null;
}


export function Modal({ isVisible, onClose, userId }: Props) {
    const { users, users_count } = useAppSelector(selectUsers);
    const [user, setUser] = useState<User | undefined>(users.find(item => item.id === userId));
    const modalContentId: string = useId();
    const modalId: string = useId();
    const url = Endpoints.users;

    useFetch({
        reducer: setUsers,
        url: users_count === 0 ? url : null
    })

    useEffect(() => {
        if (users_count > 0) {
            setUser(users.find(item => item.id === userId));
        }
    }, [userId, setUser, user, users, users_count])

    return (
        isVisible &&
        <Portal id={modalId} className={styles.container}>
            <div className={styles.modal} id={modalContentId}>
                <div className={styles.header}>
                    <button className={styles.closeButton} onClick={onClose} title={'Close the window'}>
                        <ICON color="black" name='xmark-solid' />
                    </button>
                </div>
                <div className={styles.body}>
                    {user ?
                        <>

                            <div className={styles.title}>Name</div>
                            <div className={styles.value}>{user.name}</div>
                            <div className={styles.title}>Email</div>
                            <div className={styles.value}>
                                <a className={styles.value} href={`mailto:${user.email}`}>{user.email}</a>
                            </div>
                            <div className={styles.title}>Username</div>
                            <div className={styles.value}>{user.username}</div>
                            <div className={styles.title}>Website</div>
                            <div className={styles.value}>
                                <a href={`https://${user.website}`} target='__blank'>{user.website}</a>
                            </div>
                            <div className={styles.title}>Company</div>
                            <div className={styles.value}>{user.company.name}</div>
                        </>
                        : <Loader size={1} />}
                </div>
            </div>
        </Portal>)
}