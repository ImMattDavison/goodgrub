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
            <section className={styles.hero}>
                <h1>
                    GOODGRUB
                </h1>
                <p>
                    Better Food, Better Future
                </p>
            </section>
            <section className={`${styles.info} container`}>
                <div>
                    <h2>
                        Track your food intake
                    </h2>
                </div>
                <div className={styles.infoContainer}>
                    <p>
                        Want to track your food intake and improve your health? GoodGrub allows you to track your eating and healt. Use GoodGrub to track your meals and have a better future.
                    </p>
                </div>
            </section>
            <section className={`${styles.info} container`}>
                <div className={styles.infoContainer}>
                    <p>
                        Tracking your health alongside yor diet allows you to identify issues between your diet and your health sooner. Use GoodGrub to track your meals and have a better future.
                    </p>
                </div>
                <div>
                    <h2>
                        Identify issues sooner
                    </h2>
                </div>
            </section>
            <section className={`${styles.info} container`}>
                <div>
                    <h2>
                        Get rewarded for tracking
                    </h2>
                </div>
                <div className={styles.infoContainer}>
                    <p>
                        Everytime you log a meal on GoodGrub we'll send you a few Hedera TinyBar (HBars) to your Hedera Wallet. Use GoodGrub to track your meals and have a better future.
                    </p>
                </div>
            </section>
        </>
    )
}
