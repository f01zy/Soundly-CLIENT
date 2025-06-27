import { createSlice } from "@reduxjs/toolkit"

export interface IAlert {
  message: string,
  isShow: boolean
}

interface IAlertStore {
  alert: IAlert,
}

const initialState: IAlertStore = {
  alert: { isShow: false, message: "" }
}

export const alertSlice = createSlice({
  initialState,
  name: "alert",
  reducers: {
    setAlert(state, { payload }: { payload: string }) { state.alert = { isShow: true, message: payload } },
    hideAlert(state) { state.alert.isShow = false },
  }
})

export const { setAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer