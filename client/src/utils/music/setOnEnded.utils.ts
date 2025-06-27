import { $api } from '@/http';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { random } from '../random.utils';
import { IPlaylist } from '@/interfaces/playlist.interface';
import { notFound } from 'next/navigation';

export const setOnEnded = async (
  user: IUser,
  currentMusic: IMusic,
  dispatch: Dispatch<UnknownAction>,
  playlistId: string | undefined = undefined
) => {
  let findPlaylist

  if (playlistId) {
    findPlaylist = await $api.get<IPlaylist>(`/playlist/${playlistId}`).then(res => res.data)
  }

  let playlist = findPlaylist ? findPlaylist.tracks : user.history
  if (!playlist) return notFound()

  const music = getMusicMode() === "random" ?
    playlist[random(0, playlist.length - 1)] :
    currentMusic

  playerController.onEnded = () => {
    playlistId ?
      playMusic(findPlaylist!, dispatch, user) :
      playMusic(music, dispatch, user)
  };
}