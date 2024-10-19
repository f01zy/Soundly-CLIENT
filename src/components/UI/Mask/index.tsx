"use client"

import styles from "@/components/UI/Mask/styles.module.scss"
import { setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"

const Mask = () => {
  const dispatch = useDispatch<AppDispatch>()

  return <div className={styles.mask} onClick={() => dispatch(setWindowForm(null))}></div>
}

export default Mask;