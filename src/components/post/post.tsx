import styles from "./post.module.scss";
import Link from "next/link";


export const PostCard = ({ post }: { post: Post }): JSX.Element => {
    return <div className={styles.post}>
        <Link href={`/post/${post.id}`} className={styles.title} >
            <img src="/user-avatar.png" alt="" className={styles.userAvatar} />
            <span>{post.title}</span>
        </Link>
        <div>{post.body}</div>
    </div>
}