"use client"

import { playerController } from "@/components/Wrappers/Layout"
import { IExtendsMusic, setCurrentMusic, setLoading, setMusicDelay } from "@/store/music/music.slice"
import { startMusicInterval } from "./startMusicInterval.utils"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { IUser } from "@/interfaces/user.interface"
import { listen } from "./listen.utils"
import { setOnEnded } from "./setOnEnded.utils"
import { random } from "../random.utils"
import { alert } from "../alert.utils"
import { ITransmittedComposition } from "./handlePlayClick.utils"

export const playMusic = (
  composition: ITransmittedComposition,
  dispatch: Dispatch<UnknownAction>,
  user: IUser
) => {
  const handleErr = () => {
    dispatch(setLoading(null))
    dispatch(setCurrentMusic(null))
    alert(dispatch, "An error has occurred, please try again later")
  }

  const track = composition.type === "track" ? composition :
    (composition as any).track ?
      composition.tracks.find(item => item._id === (composition as any).track) :
      composition.tracks[random(0, composition.tracks.length - 1)]

  if (!track) {
    return alert(dispatch, "Cannot play this track")
  }

  dispatch(setLoading(track._id))

  listen(track._id, dispatch).then(() => {
    dispatch(setMusicDelay(0))

    playerController.playerSrc = track._id

    composition.type === "track" ?
      setOnEnded(user, track, dispatch) :
      setOnEnded(user, track, dispatch, composition._id)

    playerController.onLoadedMetadata = () => {
      const setMusic: IExtendsMusic = {
        ...track,
        delay: 0,
        maxDelay: playerController.getMaxDelay || 0,
        isPaused: false
      }

      dispatch(setCurrentMusic(setMusic))
      dispatch(setLoading(null))
      startMusicInterval(dispatch)
      playerController.play()
    }
  }).catch(() => handleErr())
}