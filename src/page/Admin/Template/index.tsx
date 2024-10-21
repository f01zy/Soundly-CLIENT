"use client"

import CardRow from "@/components/UI/CardRow"
import Skeleton from "@/components/UI/Skeleton"
import User from "@/components/UI/User"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import styles from "@/page/Admin/Template/styles.module.scss"
import Image from "next/image"
import { useState, useEffect, FC } from "react"
import { MdDelete } from "react-icons/md";

type TPage = "Users" | "Tracks"

const AdminTemplate: FC<{ page: TPage }> = ({ page }) => {
  const { user } = useTypedSelector(selector => selector.userSlice)
  const [content, setContent] = useState<Array<any>>([])
  const [contentLoading, setContentLoading] = useState<Array<string>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const paths = {
    "Users": "users",
    "Tracks": "music"
  }

  useEffect(() => {
    setLoading(true)
    $api.get(`/${paths[page]}`).then(res => {
      setContent(res.data)
      setLoading(false)
    })
  }, [])

  if (!user || !user.isStaff) return <div className="flex w-full h-full justify-center items-center">
    <h1 className="text-base">Access is denied</h1>
  </div>

  const deleteObject = (id: string) => {
    setContentLoading([...contentLoading, id])
    $api.delete(`/${paths[page]}/${id}`)
      .then(res => {
        setContent(content.filter(el => el._id != res.data))
      })
      .finally(() => setContentLoading(contentLoading.filter(item => item != id)))
  }

  return <div className={`${styles.admin} pageBaseStyles`}>
    <h1 className="text-xl">{page}</h1>

    {
      loading ?
        <div className="mt-3">
          {new Array<string>(10).fill("").map(() => <div className="mt-2"><Skeleton width="100%" height="70px" /></div>)}
        </div> :
        content.length === 0 ? <h2>It&apos;s empty</h2> : content.map(
          el => <div className="mt-3">
            {
              <div className="flex items-center justify-between">
                {page === "Users" && <User {...el} />}
                {page === "Tracks" && <CardRow {...el} />}
                {
                  contentLoading.includes(el._id) ?
                    <Image className={styles.deleteLoader} src={"/circle-loader-white.svg"} alt="loading" width={100} height={100} /> :
                    <MdDelete className={styles.deleteIcon} onClick={() => deleteObject(el._id)} />
                }
              </div>
            }
          </div>
        )
    }
  </div>
}

export default AdminTemplate;