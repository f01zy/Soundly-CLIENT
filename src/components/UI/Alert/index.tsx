"use client"

import styles from "@/components/UI/Alert/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook"

const Alert = () => {
  const { music } = useTypedSelector(selector => selector.musicSlice)
  const { alert } = useTypedSelector(selector => selector.alertSlice)

  return <div className={`${styles.alert} bg-red-600 ${alert.isShow ? styles.active : styles.disable} ${music ? styles.activePlayer : "bottom-5"}`}>
    <h4>{alert.message}</h4>
  </div>
}

export default Alert;