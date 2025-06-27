"use client"

import { musicInterval, playerController } from "@/components/Wrappers/Layout";
import { startMusicInterval } from "./startMusicInterval.utils";
import { setIsPaused, } from "@/store/music/music.slice";
import { Dispatch } from "@reduxjs/toolkit/react"
import { IMusic } from "@/interfaces/music.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { playMusic } from "./playMusic.utils";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { setPlaylist } from "@/store/playlist/playlist.slice";
import { alert } from "../alert.utils";

export interface IPlaylistWithGivenTrack extends IPlaylist {
  track: string
}

export type ITransmittedComposition = IMusic | IPlaylist | IPlaylistWithGivenTrack

const pause = (dispatch: Dispatch) => {
  if (musicInterval) clearInterval(musicInterval); playerController.pause(); dispatch(setIsPaused(true))
}

export const handlePlayClick = (
  dispatch: Dispatch,
  composition: ITransmittedComposition,
  user: IUser | null,
  router: AppRouterInstance,
  currentMusicId: string | undefined
) => {
  if (!user) return router.push("/login")
  if (composition.type === "playlist" && composition.tracks.length === 0) return alert(dispatch, "This playlist is empty")

  if (currentMusicId != composition._id) {
    pause(dispatch)
    composition.type === "playlist" ?
      dispatch(setPlaylist(composition._id)) :
      dispatch(setPlaylist(null))

    return playMusic(composition, dispatch, user)
  }

  if (playerController.getIsPaused) { startMusicInterval(dispatch); playerController.resume(); dispatch(setIsPaused(false)) }
  else pause(dispatch)
}