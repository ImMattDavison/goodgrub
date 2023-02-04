import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { supabase } from '../utils/supabase'
import { useSessionContext, useSupabaseClient, useUser, User } from '@supabase/auth-helpers-react';
import styles from '@/styles/Dashboard.module.css'

export default function Header() {

    const metaTitle = 'Dashboard | GoodGrub'
    const metaDescription = 'Manage, view and track with GoodGrub. Better Food, Better Future.'

    const router = useRouter()

    const user = useUser()

    console.log(useUser())

    return(
        <>
            <Head>
                {/* SEO META */}
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>
            {useUser() ?
                <main className={`${styles.loggedIn} container`}>
                    <section className={styles.header}>
                        <div className={styles.photoName}>
                            <img className={styles.profileImage} src={user.user_metadata.avatar_url}/>
                            <div className={styles.userMeta}>
                                <h2>{user.user_metadata.full_name}</h2>
                                <p>X Meals Logged</p>
                            </div>
                        </div>
                        <div className={styles.userActions}>
                            <button className={styles.newLog}>Log A Meal</button>
                        </div>
                    </section>
                    <section className={styles.meals}>
                        <h2>Recently Logged Meals</h2>
                        <div className={styles.mealList}>
                            
                        </div>
                    </section>
                </main>
            :
                <main className={`${styles.noLogin} container`}>
                    <h1>Page unavailable. Please login to view this page.</h1>
                    <Link href='/'>GO HOME</Link>
                </main>
            }
        </>
    )
}