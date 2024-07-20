import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar'; // Ensure this import is uncommented and correct
import Footer from '@/components/Footer';
import Head from 'next/head';
import '@/app/globals.css';
import Image from 'next/image';
import { metadata } from './metadata';

function MyApp({ Component, pageProps }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
        <title>Looks - {metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Other meta tags */}
      </Head>
            <SessionProvider session={pageProps.session}>
                <Navbar {...pageProps} />
                <main className="flex-grow">
                    <Component {...pageProps} />
                </main>
                <Footer />
            </SessionProvider>
        </div>
    );
}

export default MyApp;
