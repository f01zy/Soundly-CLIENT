import { IUser } from "@/interfaces/user.interface"
import { createSlice } from "@reduxjs/toolkit"
import { login, register } from "./user.actions"

type TMessage = { status: "success" | "error", value: string }

interface IState { message: TMessage, loading: boolean, user: IUser | null }

const initialState: IState = { message: {}, loading: false, user: null } as IState

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, { payload }: { payload: IUser | null }) => {
      state.user = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => { state.loading = true })
      .addCase(register.rejected, (state, action) => { state.message = { status: "error", value: (action.payload as any).response.data.message }; state.loading = false })
      .addCase(register.fulfilled, (state, action) => { state.user = action.payload!; state.message = { status: "success", value: "Success" }; state.loading = false })

      .addCase(login.pending, state => { state.loading = true })
      .addCase(login.rejected, (state, action) => { state.message = { status: "error", value: (action.payload as any).response.data.message }; state.loading = false })
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload!; state.message = { status: "success", value: "Success" }; state.loading = false })
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer