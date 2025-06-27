import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

type TField = "music"

type TResult = { music: Array<IMusic> }

interface ISearch {
  query: string,
  field: TField,
  result: TResult,
  loading: boolean
}

const initialState: ISearch = {
  query: "",
  field: "music",
  result: { music: [] },
  loading: false
}

export const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    setQuery(state, { payload }: { payload: string }) { state.query = payload },
    setField(state, { payload }: { payload: TField }) { state.field = payload },
    setLoading(state, { payload }: { payload: boolean }) { state.loading = payload },
    setMusicResult(state, { payload }: { payload: Array<IMusic> }) { state.result.music = payload },
  }
})

export const { setQuery, setField, setMusicResult, setLoading } = searchSlice.actions

export default searchSlice.reducer