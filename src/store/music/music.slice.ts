import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

export interface IExtendsMusic extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean
}

interface IMusicStore {
  music: IExtendsMusic | null,
  loading: string | null,
}

const initialState: IMusicStore = {
  music: null,
  loading: null,
}

export const musicSlice = createSlice({
  initialState,
  name: "music",
  reducers: {
    setCurrentMusic(state, { payload }: { payload: IExtendsMusic | null }) { state.music = payload },
    setMusicDelay(state, { payload }: { payload: number }) { if (state.music) state.music.delay = payload },
    setIsPaused(state, { payload }: { payload: boolean }) { if (state.music) state.music.isPaused = payload },
    setLoading(state, { payload }: { payload: string | null }) { state.loading = payload },
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused, setLoading } = musicSlice.actions

export default musicSlice.reducer