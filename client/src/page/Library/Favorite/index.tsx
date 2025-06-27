"use client"

import TracksList from "@/components/Tracks/TracksList";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Library/Favorite/styles.module.scss"

const Favorite = () => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  return <div className={`${styles.favorite} pageBaseStyles`}>
    {user ? (
      <>
        <h1 style={{ marginBottom: "8px" }} className="text-xl">Favorite tracks</h1>
        {user.likes.length != 0 ? <TracksList tracks={user.likes} /> : <h2 className="text-base">You haven&apos;t liked anything yet</h2>}
      </>
    ) : <h1 className="text-xl">Please auth</h1>}
  </div>
}

export default Favorite;