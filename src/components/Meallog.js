import styles from '@/styles/Meallog.module.css'

export default function Meallog(props) {

    console.log(props.mealMood)

    return (

        <div className={styles.mealLog}>
            {/* <p>{props.mealDate}</p> */}
            <h3 className={styles.mealName}>{props.mealName}</h3>
            <div className={styles.mealNotes}>
                <h4>Meal Notes</h4>
                <p>{props.mealNotes}</p>
            </div>
            <div className={styles.mealStats}>
                <p>{'Health Score Self Assessment: ' + props.mealHealthiness}</p>
                <p>Feeling: {props.mealMood == 5 ? 'Great' : props.mealMood == 4 ? 'Good' : props.mealMood == 3 ? 'Okay' : props.mealMood == 2 ? 'Bad' : props.mealMood == 1 ? 'Terrible' : 'No Mood'}</p>
            </div>
        </div>
    )
}