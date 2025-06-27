"use client"

import { $api } from '@/http';
import { IUser } from "@/interfaces/user.interface"
import { setUser } from "@/store/user/user.slice"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export const listen = async (music: string, dispatch: Dispatch<UnknownAction>) => {
  const user = (await $api.post<IUser>("/music/listen", { id: music })).data
  dispatch(setUser(user))
}