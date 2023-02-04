import styles from '../styles/Header.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabase'
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react'

export default function Header() {

    // SCRIPTS
    const [navOpen, setNavOpen] = useState(false);
    const [pageSize, setPageSize] = useState(0);
    
    const toggleNav = () => {
        setNavOpen(!navOpen)
    }

    useEffect(() => {
        // Open close or ignore nav
        let navClass = document.querySelector(`.${styles.navListContainer}`)
        if(navOpen && window.innerWidth < 768) {
            // navClass.style.height = 'auto'
            navClass.classList.add(`${styles.navListContainerOpen}`);
            console.log('nav opened')
        } else if(!navOpen && window.innerWidth < 768) {
            // document.querySelector(`.navListContainer`).style.height = '0'
            navClass.classList.remove(`${styles.navListContainerOpen}`);
            console.log('nav closed')
        } else {
            // document.querySelector(`.navListContainer`).style.height = 'auto'
            navClass.classList.remove(`${styles.navListContainerOpen}`);
        }

        // Manage page resize state
        window.addEventListener('resize', handleResize)
        function handleResize() {
            setPageSize(window.innerWidth);
        }
        console.log(pageSize);
    }, [navOpen, pageSize]);

    const login = async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'openid profile email'
            }
        })
    }

    const signOut = async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    console.log(useUser())

    return (
        <header className={`${styles.header}`}>
            <nav className={`${styles.nav} container`}>
                <div>
                    {/* LOGO */}
                    <Link className={styles.logoLink} href='../'>
                        <img className={styles.logo} src="/images/brand/logo.svg" alt="GoodGrub Logo"/>
                    </Link>
                </div>
                <div className={styles.navToggleContainer}>
                    {/* NAV TOGGLE */}
                    <button className={styles.navToggle} onClick={toggleNav}>&#9776;</button>
                </div>
                <div className={`${styles.navListContainer} navListContainer`}>
                    {/* NAVIGATION */}
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} href="/">HOME</Link>
                        </li>
                        {!useUser() ? 
                            <li>
                                <button className={styles.login} onClick={login}>Log In</button>
                            </li> :
                            <li>
                                <Link className={styles.navLink} href="/dashboard">DASHBOARD</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}