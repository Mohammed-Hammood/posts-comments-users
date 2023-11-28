import styles from "./post.module.scss";
import Link from "next/link";
import Image from "next/image";

type Props = {
    post: Post;
    setUserId: (user: number | null) => void;
}

export const PostCard = ({ post, setUserId }: Props): JSX.Element => {
    
    return <div className={styles.post}>
        <span className={styles.title} >
            <Image
                src="/user-avatar.png"
                alt=""
                className={styles.userAvatar}
                width={50}
                height={50}
                onClick={()=> setUserId(post.userId)}
            />
            <Link href={`/post/${post.id}`}>
                <span>{post.title}</span>
            </Link>
        </span>
        <div>{post.body}</div>
    </div>
}