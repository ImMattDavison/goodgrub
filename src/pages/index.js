import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { supabase } from '../utils/supabase'
import { useSessionContext, useSupabaseClient, useUser, User } from '@supabase/auth-helpers-react';

export default function Home() {
    
    const metaTitle = 'GoodGrub | Better Food, Better Future'
    const metaDescription = 'Want to track your food intake? GoodGrub allows you to track your eating and drinking. Use GoodGrub to track your meals. Better Food, Better Future.'
    const metaImage = 'https://goodgrub.tech/images/og-image.png'
    const metaUrl = 'https://goodgrub.tech/'

    const login = async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'openid profile email'
            }
        })
    }

    console.log(useUser())

    return (
        <>
            <Head>
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
            </Head>
            {!useUser() ? <button onClick={login}>Log In</button> : <button>Sign Out</button>}
        </>
    )
}
