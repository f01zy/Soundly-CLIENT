"use client"

import Banner from "@/components/UI/Banner";
import TracksGrid from "@/components/Tracks/TracksGrid";
import styles from "@/page/Home/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";

const Home = () => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  return <div className={`${styles.home} pageBaseStyles`}>
    {
      user && user.subscriptions.length > 0 ?
        <div className={styles.subscriptions}>
          <h2>Your subscriptions</h2>
          <div className="gridStyles">
            {
              user.subscriptions.slice(0, 5).map(item => <Link href={`/profile/${item._id}`}>
                <Avatar user={item} height={150} width={150} />
              </Link>)
            }
          </div>
        </div> :
        ""
    }
    <TracksGrid label="Most popular" quantity={6} sort="listenings" />
  </div>
}

export default Home;