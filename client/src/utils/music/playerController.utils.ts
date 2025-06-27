"use client"

import { SERVER_URL } from "@/config"
import { setMusicDelay } from "@/store/music/music.slice"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export class PlayerController {
  private readonly player = typeof window !== 'undefined' ? new window.Audio() : null

  public play() { if (!this.player) return; this.player.play() }

  public rewind(number: number, dispatch: Dispatch<UnknownAction>) {
    if (!this.player) return
    if (this.player.currentTime + number < 0) this.player.currentTime = 0
    else if (this.player.currentTime + number > this.player.duration) return
    else this.player.currentTime += number
    dispatch(setMusicDelay(Math.floor(this.player.currentTime)))
  }

  public pause() { if (!this.player) return; this.player.pause() }

  public resume() { if (!this.player) return; this.player.play() }

  get getIsPaused() { if (!this.player) return; return this.player.paused }

  get getMusicDelay() { if (!this.player) return; return Math.floor(this.player.currentTime) }

  get getMaxDelay() { if (!this.player) return; return Math.floor(this.player.duration) }

  set playerSrc(id: string) { if (!this.player) return; this.player.src = `${SERVER_URL}/music/${id}.mp3` }

  set onLoadedMetadata(func: (this: GlobalEventHandlers) => any) { if (!this.player) return; this.player.onloadedmetadata = func }

  set onEnded(func: (this: GlobalEventHandlers) => any) { if (!this.player) return; this.player.onended = func }
}