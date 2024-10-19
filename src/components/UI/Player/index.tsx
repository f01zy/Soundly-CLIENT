"use client"

import styles from "@/components/UI/Player/styles.module.scss"
import { SERVER_URL } from "@/config"
import { useTypedSelector } from "@/hooks/selector.hook"
import Image from "next/image"
import { FaForward, FaBackward } from "react-icons/fa"
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { getMusicMode, playerController, setMusicMode } from "../../Wrappers/Layout"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { handlePlayClick } from "@/utils/music/handlePlayClick.utils"
import { formatTime } from "@/utils/formatTime.utils"
import { useRouter } from "next/navigation"
import Skeleton from "../Skeleton"
import { RiRepeatOneLine } from "react-icons/ri";
import { playMusic } from "@/utils/music/playMusic.utils"
import { TMusicMode } from "@/types/musicMode.type"
import { random } from "@/utils/random.utils"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

const Player = () => {
  const { music, loading } = useTypedSelector(selector => selector.musicSlice)
  const user = useTypedSelector(selector => selector.userSlice.user)!
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const setMusicModeAndOnLoad = (mode: TMusicMode) => {
    setMusicMode(mode)
    const newMusic = getMusicMode() === "random" ? user.history[random(0, user.history.length - 1)] : music!
    playerController.onEnded = () => { playMusic(newMusic, dispatch, user) };
  }

  return <div className={styles.playerContainer}>
    {
      loading ? <Skeleton width="300px" height="100%" /> : music ? (
        <>
          <div className={styles.player}>
            <div className="flex items-center">
              <Image unoptimized className="rounded-md" src={`${SERVER_URL}/cover/${music._id}.jpg`} alt={music.name} width={40} height={40} />
              <div className={`ml-3 flex flex-col items-center justify-center ${styles.title}`}>
                <h1>{music.name}</h1>
                {/* <h5 className="mt-0.5">-{formatTime(music.maxDelay - music.delay)}</h5> */}
              </div>
              <div className={styles.buttons}>
                <div className={styles.button} onClick={() => playerController.rewind(-5, dispatch)}>
                  <FaBackward />
                </div>
                <div className={styles.button} onClick={() => {
                  handlePlayClick(dispatch, music, user, router, music._id)
                }}>
                  {music.isPaused ? <IoIosPlay /> : <FaPause />}
                </div>
                <div className={styles.button} onClick={() => playerController.rewind(5, dispatch)}>
                  <FaForward />
                </div>
                <div className={styles.button} onClick={() => setMusicModeAndOnLoad(getMusicMode() === "random" ? "one" : "random")}>
                  {getMusicMode() === "one" ? <RiRepeatOneLine /> : <GiPerspectiveDiceSixFacesRandom />}
                </div>
              </div>
            </div>
            <div className={styles.bar}>
              <div style={{ width: `${music.delay / music.maxDelay * 100}%` }}></div>
            </div>
          </div>
        </>
      ) : ""
    }
  </div>
}

export default Player;