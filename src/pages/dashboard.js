import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { supabase } from '../utils/supabase'
import { useSessionContext, useSupabaseClient, useUser, User } from '@supabase/auth-helpers-react';
import styles from '@/styles/Dashboard.module.css'
import Meallog from '@/components/Meallog';
import { Client, AccountCreateTransaction, Hbar, PrivateKey, TransferTransaction, AccountBalanceQuery } from "@hashgraph/sdk";

export default function Header({ meals, userBalance }) {
    // console.log({ meals })
    // console.log(meals.meal_log)
    // console.log(new Date())

    const metaTitle = 'Dashboard | GoodGrub'
    const metaDescription = 'Manage, view and track with GoodGrub. Better Food, Better Future.'

    const router = useRouter()
    const user = useUser()

    const client = Client.forTestnet();
    client.setOperator(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID, process.env.NEXT_PUBLIC_HEDERA_PUBLIC_KEY);

    console.log(client)
    console.log(userBalance)

    const [meal, setMeal] = useState({
        "mealName": "",
        "mealHealthiness": '',
        "mealNotes": "",
        "mealMood": 0,
        "mealDate": new Date(),
    })

    console.log(meal)

    const handleInput = (e) => {
        const { name, value } = e.target
        setMeal({ ...meal, [name]: value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        meals.meal_log.push(meal)

        const { error } = await supabase
            .from('profile')
            .update({ meal_log: meals.meal_log })
            .eq('id', user.id)

        console.log('errors: ' + error)   

        setMeal({
            "mealName": "",
            "mealHealthiness": '',
            "mealNotes": "",
            "mealMood": 0,
            "mealDate": new Date(),
        })

        if(!meals.hedera_id){

            const newAccountPrivateKey = PrivateKey.generateED25519(); 
            const newAccountPublicKey = newAccountPrivateKey.publicKey;

            const newAccount = await new AccountCreateTransaction()
                .setKey(newAccountPublicKey)
                .setInitialBalance(Hbar.fromTinybars(3))
                .execute(client);

            const getReceipt = await newAccount.getReceipt(client);
            const newAccountId = getReceipt.accountId;

            console.log("The new account ID is: " +newAccountId);

            const accountBalance = await new AccountBalanceQuery()
                .setAccountId(newAccountId)
                .execute(client);

            console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");

            const { error } = await supabase
                .from('profile')
                .update({ hedera_id: newAccountId.toString() })
                .eq('id', user.id)

            console.log('errors: ' + error)

            
            const sendHbar = await new TransferTransaction()
                .addHbarTransfer(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID, Hbar.fromTinybars(-3)) //Sending account
                .addHbarTransfer(newAccountId, Hbar.fromTinybars(3)) //Receiving account
                .execute(client);

            return alert('Meal Logged!')
        
        }
        
        if(meals.hedera_id && meals.hedera_id != null){
            const sendHbar = await new TransferTransaction()
                .addHbarTransfer(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID, Hbar.fromTinybars(-3)) //Sending account
                .addHbarTransfer(meals.hedera_id, Hbar.fromTinybars(3)) //Receiving account
                .execute(client);
        } 

        return alert('Meal Logged!')


    }



    return(
        <>
            <Head>
                {/* SEO META */}
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>
            {useUser() ?
                // LOGGED IN
                <main className={`${styles.loggedIn} container`}>
                    <section className={styles['header', 'section']}>
                        <div className={styles.photoName}>
                            <img className={styles.profileImage} src={user.user_metadata.avatar_url}/>
                            <div className={styles.userMeta}>
                                <h2>{user.user_metadata.full_name}</h2>
                                <p>{meals.meal_log.length} Meals Logged</p>
                            </div>
                        </div>
                        <div className={styles.userActions}>
                            <Link href='#log-a-meal' className={styles.newLog}>Log A Meal</Link>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>Stats</h2>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <h3>Meals Logged</h3>
                                <p>{meals.meal_log.length}</p>
                            </div>
                            <div className={styles.stat}>
                                <h3>Hedera ID</h3>
                                <p>{meals.hedera_id ? meals.hedera_id : 'Log a meal to unlock.'}</p>
                            </div>
                            <div className={styles.stat}>
                                <h3>TinyBar Balance</h3>
                                <p>{userBalance}</p>
                            </div>
                        </div>
                    </section>
                    <section id="log-a-meal" className={styles.section}>
                        <h2>Log A Meal</h2>
                        <form className={styles.logForm}>
                            <label htmlFor="mealName">Meal Name</label>
                            <input 
                                onChange={handleInput} 
                                type="text" 
                                name="mealName" 
                                id="mealName" 
                                placeholder="Meal Name"
                                value={meal.mealName}
                            />
                            <label htmlFor="mealNotes">Meal Description</label>
                            <textarea 
                                onChange={handleInput} 
                                name="mealNotes" 
                                id="mealNotes" 
                                placeholder="Meal Description"
                                value={meal.mealNotes}
                            >
                            </textarea>
                            <label htmlFor="howHealthy">Rate the healthiness of the meal</label>
                            <input 
                                onChange={handleInput} 
                                type="range" 
                                name="mealHealthiness" 
                                id="howHealthy" 
                                min="1" 
                                max="5" 
                                value={meal.mealHealthiness} 
                            />
                            <label htmlFor="howIFeel">How do you feel today?</label>
                            <select 
                                onChange={handleInput} 
                                name="mealMood" 
                                id="howIFeel"
                                value={meal.mealMood}
                            >
                                <option value="1">1 - Terrible</option>
                                <option value="2">2 - Bad</option>
                                <option value="3">3 - Okay</option>
                                <option value="4">4 - Good</option>
                                <option value="5">5 - Great</option>
                            </select>
                            <button type="submit" onClick={handleFormSubmit}>Log Meal</button>

                        </form>
                    </section>
                    <section className={styles.section}>
                        <h2>Recently Logged Meals</h2>
                        <div className={styles.mealList}>
                            {console.log(meals.meal_log)}
                            {meals.meal_log.slice(0).reverse().map((meal) => (
                                <Meallog
                                    mealName = {meal.mealName}
                                    mealHealthiness = {meal.mealHealthiness}
                                    mealNotes = {meal.mealNotes}
                                    mealMood = {meal.mealMood}
                                    mealDate = {meal.mealDate}
                                />
                            ))}
                        </div>
                    </section>
                </main>
            :
                // NOT LOGGED IN
                <main className={`${styles.noLogin} container`}>
                    <h1>Page unavailable. Please login to view this page.</h1>
                    <Link href='/'>GO HOME</Link>
                </main>
            }
        </>
    )
}

export const getServerSideProps = async (user) => {
    const { data: meals, error } = await supabase
        .from('profile')
        .select('*')
        .single()
    console.log(meals)

    const client = Client.forTestnet();
    client.setOperator(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID, process.env.NEXT_PUBLIC_HEDERA_PUBLIC_KEY);

    if(!meals.hedera_id){

        const newAccountPrivateKey = PrivateKey.generateED25519(); 
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(0))
            .execute(client);

        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;

        console.log("The new account ID is: " +newAccountId);

        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(newAccountId)
            .execute(client);

        console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");

        const { error } = await supabase
            .from('profile')
            .update({ hedera_id: newAccountId.toString() })
            .eq('id', user.id)

        console.log('errors: ' + error)

        return {
            props: {
                meals,
                userBalance: accountBalance.hbars.toTinybars() + " tinybar"
            }
        }
    }

    const getNewBalance = await new AccountBalanceQuery()
        .setAccountId(meals.hedera_id)
        .execute(client);

        console.log("The account balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar.")

        let userBalance = getNewBalance.hbars.toTinybars() + " tinybar"

    return {
        props: {
            meals,
            userBalance
        }
    }
}