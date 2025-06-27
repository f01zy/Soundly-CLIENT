import { createSlice } from "@reduxjs/toolkit"

type TCreate = {
  name: string
  description: string
}

interface IPlaylist {
  create: TCreate | null
  playlist: string | null
}

const initialState: IPlaylist = {
  create: null,
  playlist: null
}

export const playlistSlice = createSlice({
  initialState,
  name: "playlist",
  reducers: {
    setCreate(state, { payload }: { payload: TCreate | null }) { state.create = payload },
    setPlaylist(state, { payload }: { payload: string | null }) { state.playlist = payload }
  }
})

export const { setCreate, setPlaylist } = playlistSlice.actions

export default playlistSlice.reducer