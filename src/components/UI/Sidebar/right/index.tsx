"use client"

import styles from "@/components/UI/Sidebar/right/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook"
import { IPost } from "@/interfaces/post.interface";
import { formatTimeByUTC } from "@/utils/formatTimeByUTC.utils";
import Link from "next/link";

const isDateNotLaterThan = (dateToCheck: Date, day: Date) => {
  const utcDateToCheck = new Date(dateToCheck.getUTCFullYear(), dateToCheck.getUTCMonth(), dateToCheck.getUTCDate())
  const comparisonDate = new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate())

  return utcDateToCheck <= comparisonDate
}

const SidebarRight = () => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  const posts: IPost[] = user ? user.subscriptions.flatMap(subscription => {
    const filter: Array<IPost> = []
    const date = new Date()

    for (let i = 0; i < subscription.posts.length; i++) {
      const post = subscription.posts[i]
      if (isDateNotLaterThan(new Date(post.date), date)) filter.push(post)
    }

    return filter
  }) : []

  return <aside className={styles.sidebar}>
    <div className={styles.posts}>
      <h2 className="text-base mb-2 mt-4">New posts</h2>
      {
        posts.length > 0 ? posts.map(
          post => <div className="mt-3">
            <div className="mb-1"><Link className="underline text-base " href={`/posts/${post._id}`}>{post.title}</Link></div>
            <div className="mb-1"><Link className="underline text-base" href={`/profile/${post.author._id}`}>{post.author.username}</Link></div>
            <h4 className="text-sm text-gray-400">{formatTimeByUTC(post.date)}</h4>
          </div>
        ) : <h1>Strangely, it&apos;s empty :(</h1>
      }
    </div>
  </aside>
}

export default SidebarRight;