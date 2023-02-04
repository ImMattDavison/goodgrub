import '@/styles/globals.css'
import Head from 'next/head'
import { supabase } from '@/utils/supabase'
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Bebas_Neue, Inter } from '@next/font/google'

const bebasNeue = Bebas_Neue({
    weight: ['400'],
    styles: ['normal'],
    subsets: ['latin'],
})
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    styles: ['normal'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }) {

    const metaTitle = 'GoodGrub | Better Food, Better Future'
    const metaDescription = 'Want to track your food intake? GoodGrub allows you to track your eating and drinking. Use GoodGrub to track your meals. Better Food, Better Future.'
    const metaImage = 'https://goodgrub.tech/images/og-image.png'
    const metaUrl = 'https://goodgrub.tech/'

    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    return (
        <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
        >
            <style jsx global>{`
                :root {
                    --gg-font-bebasneue: ${bebasNeue.style.fontFamily};
                    --gg-font-inter: ${inter.style.fontFamily};
                }
            `}
            </style>
            <Head>
                {/* REQUIRED META */}
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* SEO META */}
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />

                {/* OPEN GRAPH META */}
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={metaUrl} />
                <meta property="og:image" content={metaImage} />

                {/* TWITTER META */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@goodgrubtech" />
                <meta name="twitter:creator" content="@immattdavison" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={metaImage} />

                {/* FAVICON */}
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
                <meta name="theme-color" content="#ffffff"/>
            </Head>
            <Component {...pageProps} />
        </SessionContextProvider>
    )
}
