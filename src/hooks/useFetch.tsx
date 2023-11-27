"use client";
import { useAppDispatch } from '@/store';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify"

interface Props {
    url?: string | null;
    reducer: (data: any) => any;
}

export function useFetch(props: Props) {
    const [url, setUrl] = useState<string | null | undefined>(props.url);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {

        const sendRequest = async (url: string): Promise<void> => {
            try {
                const req = await fetch(url);
                const res = await req.json();
                if (res && res.ok) {
                    dispatch(props.reducer(res))
                }else {
                    throw (res.message)
                }

            } catch (err: any) {
                toast.error(err, {
                    position: "top-center",
                    closeOnClick: true,
                    theme: "colored",
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,
                })

            } finally {
                setLoading(false);
                setUrl(null);
            }
        }
        if (url && !loading) {
            setLoading(true);
            sendRequest(url);
        }
    }, [url, loading, setUrl, setLoading, props])
    return {
        loading,
        url,
        setUrl,
        setLoading,
    }
}