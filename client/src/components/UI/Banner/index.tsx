import styles from "@/components/UI/Banner/styles.module.scss"
import { FC } from "react";

interface IBanner {
  title: string,
  value: string
}

const Banner: FC<IBanner> = ({ title, value }) => {
  return <div className={styles.banner}>
    <div className={styles.content}>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  </div>
}

export default Banner;