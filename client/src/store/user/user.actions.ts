import { $api } from '@/http';
import { ILogin } from '@/interfaces/login.interface';
import { IRegister } from "@/interfaces/register.interface"
import { IResponce } from '@/interfaces/responce.interface';
import { createAsyncThunk } from "@reduxjs/toolkit"

export const register = createAsyncThunk("auth/register", async (user: IRegister, thunkApi) => {
  try {
    const userResponce: IResponce = await $api.post("/auth/register", user).then(res => res.data)
    localStorage.setItem("token", userResponce.accessToken)
    return userResponce.user
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const login = createAsyncThunk("auth/login", async (user: ILogin, thunkApi) => {
  try {
    const userResponce: IResponce = await $api.post("/auth/login", user).then(res => res.data)
    localStorage.setItem("token", userResponce.accessToken)
    return userResponce.user
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})