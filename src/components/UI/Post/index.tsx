import styles from "@/components/UI/Post/styles.module.scss"
import { IPost } from "@/interfaces/post.interface";
import Link from "next/link";
import { FC } from "react"
import ReactMarkdown from 'react-markdown';
import { FcLike, FcDislike } from "react-icons/fc";
import { formatTimeByUTC } from "@/utils/formatTimeByUTC.utils";

const Post: FC<IPost> = (props) => {
  return <div className={styles.post}>
    <div className={styles.content}>
      <h1 className="text-base mb-2"><Link href={`/posts/${props._id}`}>{props.title}</Link></h1>
      <ReactMarkdown className={`${styles.markdown} markdown`}>
        {props.content.split("\n").slice(0, 10).join("\n")}
      </ReactMarkdown>
      <Link
        href={`/posts/${props._id}`}
        className="text-sm mt-2 underline"
        style={{ color: "var(--primary-color)" }}
      >Read more</Link>
    </div>
    <div className={`${styles.buttons} flex`}>
      <div className="flex h-full items-center">
        <FcLike />
        <Link href={`/posts/${props._id}`}>comments</Link>
      </div>
      <div className="flex h-full items-center">
        <p className="text-xs text-gray-400">{formatTimeByUTC(props.date)} (UTC)</p>
      </div>
    </div>
  </div>
}

export default Post;