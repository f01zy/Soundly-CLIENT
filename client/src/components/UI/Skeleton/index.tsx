import styles from "@/components/UI/Skeleton/styles.module.scss"
import { FC } from "react"

interface ISkeleton {
  width: string
  height: string
}

const Skeleton: FC<ISkeleton> = ({ height, width }) => {
  return <div className={styles.skeleton} style={{ width, height }}></div>
}

export default Skeleton;