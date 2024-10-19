"use client"

import Banner from "@/components/UI/Banner";
import TracksGrid from "@/components/Tracks/TracksGrid";
import styles from "@/page/Home/styles.module.scss"

const Home = () => {
  return <div className={`${styles.home} pageBaseStyles`}>
    <Banner title={"Soundly"} value="The best platform for high-quality music listening" />
    <TracksGrid label="Most popular" quantity={6} sort="listenings" />
  </div>
}

export default Home;