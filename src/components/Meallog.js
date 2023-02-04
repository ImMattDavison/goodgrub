import styles from '@/styles/Meallog.module.css'

export default function Meallog(props) {
    return (
        <div className={styles.mealLog}>
            <p>{props.mealDate}</p>
            <h3 className={styles.mealName}>{props.mealName}</h3>
            <p>{props.mealNotes}</p>
            <p>{props.mealHealthiness}</p>
            <p>{props.mealMood}</p>
        </div>
    )
}