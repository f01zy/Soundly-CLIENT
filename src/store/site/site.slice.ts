import { createSlice } from "@reduxjs/toolkit"

export type TWindowForm = "uploadTrack" | "editProfile" | "createPlaylistStepOne" | "createPlaylistStepTwo" | null

interface ISite {
  blocked: boolean,
  sidebar: boolean,
  loading: boolean,
  windowForm: TWindowForm,
  windowError: string | null
}

const initialState: ISite = {
  blocked: false,
  sidebar: false,
  loading: false,
  windowForm: null,
  windowError: null
}

export const siteSlice = createSlice({
  initialState,
  name: "site",
  reducers: {
    setBlocked(state, { payload }: { payload: boolean }) { state.blocked = payload },
    setSidebar(state, { payload }: { payload: boolean }) { state.sidebar = payload },
    setWindowForm(state, { payload }: { payload: TWindowForm }) { state.windowForm = payload },
    setLoading(state, { payload }: { payload: boolean }) { state.loading = payload },
    setWindowError(state, { payload }: { payload: string }) { state.windowError = payload },
  }
})

export const { setBlocked, setSidebar, setWindowForm, setLoading, setWindowError } = siteSlice.actions

export default siteSlice.reducer