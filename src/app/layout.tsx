import type { Metadata } from 'next'
import Head from 'next/head';
import { Inter } from 'next/font/google'
import { StateProvider } from '@/store/provider';
import '@/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Header, ToastProvider } from '@/components';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Posts',
    description: 'Posts application',
    icons: {
        icon: '/favicon.png'
    }
}

export default function RootLayout({ children}: { children: React.ReactNode}) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.png" type='image/x-icon' sizes={'16'}/>
            </Head>
            <body className={inter.className}>
                <StateProvider>
                    <Header />
                    {children}
                    <ToastProvider />
                </StateProvider>
            </body>
        </html>
    )
}
