"use client"

import styles from "@/components/UI/CardRow/styles.module.scss"
import { SERVER_URL } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { AppDispatch } from "@/store/store";
import { handlePlayClick } from "@/utils/music/handlePlayClick.utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"
import { useDispatch } from "react-redux";
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { $api } from "@/http";

const CardRow: FC<IMusic | IPlaylist> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useTypedSelector(selector => selector.userSlice.user)
  const { music, loading } = useTypedSelector(selector => selector.musicSlice)
  const { playlist } = useTypedSelector(selector => selector.playlistSlice)
  const router = useRouter()
  const pathname = usePathname()

  return <div className={styles.cardLittle}>
    <div className={styles.cover}>
      {props.type === "playlist" ? <h4 className="!text-white">{props.name[0].toUpperCase()}</h4> : <Image unoptimized src={`${SERVER_URL}/cover/${props._id}.jpg`} alt={props.name} width={100} height={100} />}

      <div className={styles.play}>
        <div onClick={() => {
          const id = props.type === "playlist" ?
            playlist! :
            music?._id

          if (pathname.includes("playlists") && props.type === "track" && !music?.isPaused && music?._id != props._id) {
            const paths = pathname.split("/")
            return $api.get(`/playlist/${paths[paths.length - 1]}`).then(res => {
              const tempPlaylist: any = res.data
              tempPlaylist.track = props._id
              handlePlayClick(dispatch, tempPlaylist, user, router, id)
            })
          }

          handlePlayClick(dispatch, props, user, router, id)
        }
        }>
          {
            loading === props._id ?
              <Image src={"/circle-loader.svg"} alt="loading" width={100} height={100} /> :
              music?.name != props.name ? <IoIosPlay /> :
                music?.isPaused ? <IoIosPlay /> :
                  <FaPause />
          }
        </div>
      </div>
    </div>
    <div className="ml-3">
      <Link href={`/${props.type}s/${props._id}`}><h2>{props.name}</h2></Link>
      <Link href={`/profile/${props.author._id}`}><p>{props.author.username}</p></Link>
    </div>
  </div>
}

export default CardRow;