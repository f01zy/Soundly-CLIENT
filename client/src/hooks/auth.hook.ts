"use client"

import { $api } from '@/http';
import { IResponce } from '@/interfaces/responce.interface';
import { AppDispatch } from '@/store/store';
import { setUser } from '@/store/user/user.slice';
import { useDispatch } from 'react-redux';

export const useAuth = async () => {
  const dispatch = useDispatch<AppDispatch>()
  const res = await $api.get<IResponce>(`/auth/refresh`, { withCredentials: true })
  localStorage.setItem("token", res.data.accessToken)
  console.log(res.data.user)
  dispatch(setUser(res.data.user))
}