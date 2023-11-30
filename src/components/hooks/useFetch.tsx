"use client";
import { useAppDispatch } from '@/store';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify"

interface Props {
    url?: string | null;
    reducer?: (data: any) => any;
    setData?: (data: any) => void;
}

export function useFetch({ url: url_, reducer, setData }: Props) {
    const [url, setUrl] = useState<string | null | undefined>(url_);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {

        const sendRequest = async (url: string): Promise<void> => {
            try {
                const req = await fetch(url);
                const res = await req.json();
                if (res && res.ok) {

                    reducer && dispatch(reducer(res));

                    setData && setData(res);
                }
                else {
                    throw res.message;
                }

            } catch (err: any) {
                
                const text:string = typeof err === 'string' ? err : (err.statusText || "Something went wrong");

                toast.error(text, {
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
    }, [url, loading, setUrl, setLoading, dispatch, setData, reducer])
    return {
        loading,
        url,
        setUrl,
        setLoading,
    }
}