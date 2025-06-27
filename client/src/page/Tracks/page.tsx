"use client"

import TracksGrid from "@/components/Tracks/TracksGrid";
import styles from "@/page/Tracks/styles.module.scss"

const Tracks = () => {
  return <div className={`${styles.tracks} pageBaseStyles`}>
    <TracksGrid label="Tracks" />
  </div>
}

export default Tracks;