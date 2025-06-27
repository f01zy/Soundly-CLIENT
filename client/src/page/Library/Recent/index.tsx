"use client"

import TracksList from "@/components/Tracks/TracksList";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Library/Recent/styles.module.scss"

const Recent = () => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  return <div className={`${styles.recent} pageBaseStyles`}>
    {user ? (
      <>
        <h1 style={{ marginBottom: "8px" }} className="text-xl">Recent played</h1>
        {user?.history.length != 0 ? <TracksList tracks="recent" /> : <h2 className="text-base">You haven&apos;t listened to anything yet</h2>}
      </>
    ) : <h1 className="text-xl">Please auth</h1>}
  </div>
}

export default Recent;