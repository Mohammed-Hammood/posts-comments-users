import { ICON } from "../icons";
import styles from "./comment.module.scss";


type Props = {
    comment: CommentT
}

export const CommentCard = ({ comment }: Props) => {
    return (
        <div className={styles.comment}>
            <h3 className={styles.name}>
                <ICON name="user-solid" />
                {comment.name}
            </h3>
            <div className={styles.email}>
                <ICON name="envelope-solid" />
                <span>{comment.email}</span>
            </div>
            <div>{comment.body}</div>
        </div>
    )
}