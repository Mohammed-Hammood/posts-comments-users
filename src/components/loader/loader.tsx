import styles from "./loader.module.scss";

export const Loader = ({ size }: { size: number }) => {
    
    const cards = Array.from({ length: size }, (_, i: number) => i);

    return (
        <div className={styles.loader}>
            {cards.map((item) => <div className={styles.card} key={item}>
                <div className={styles.title}></div>
                <div className={styles.details}></div>
            </div>)}
        </div>
    )
}