"use client"

import Skeleton from "@/components/UI/Skeleton"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import styles from "@/page/Admin/styles.module.scss"
import { AppDispatch } from "@/store/store"
import { alert } from "@/utils/alert.utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

interface IStatistics {
  db: string,
  collections: number,
  views: number,
  objects: number,
  avgObjSize: number,
  dataSize: number,
  storageSize: number,
  totalFreeStorageSize: number,
  numExtents: number,
  indexes: number,
  indexSize: number,
  indexFreeStorageSize: number,
  fileSize: number,
  nsSizeMB: number,
  ok: number
}

const Admin = () => {
  const [statistics, setStatistics] = useState<IStatistics>()
  const { user } = useTypedSelector(selector => selector.userSlice)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    $api.get("/utils/statistics")
      .then(res => setStatistics(res.data))
      .catch(() => alert(dispatch, "Couldn't request statistics"))
  }, [])

  if (!user || !user.isStaff) return <div className="flex w-full h-full justify-center items-center">
    <h1 className="text-base">Access is denied</h1>
  </div>

  return <div className={`${styles.admin} pageBaseStyles  `}>
    <div className={styles.statistics}>
      {
        (
          statistics ? [
            [statistics.db, "Name"],
            [statistics.objects, "Objects"],
            [statistics.collections, "Collections"],
          ] : new Array<number>(10).fill(0)
        ).map(stat => {
          if (typeof stat === "number") return <Skeleton width="200px" height="50px" />
          else return <div className={styles.block}><h2>{stat[1]}:</h2><h3>{stat[0]}</h3></div>
        })
      }
    </div>
    <div className={styles.collections}>
      <h2>Manage collections</h2>
      <ul>
        <li><Link href={"/admin/users"}>Users</Link></li>
        <li><Link href={"/admin/tracks"}>Tracks</Link></li>
      </ul>
    </div>
  </div>
}

export default Admin;