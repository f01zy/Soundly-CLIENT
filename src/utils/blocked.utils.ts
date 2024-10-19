import { blockedTime } from "@/components/Wrappers/Layout";
import { setBlocked } from "@/store/site/site.slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const blocked = (dispatch: Dispatch<UnknownAction>, currentState: boolean) => {
  if (currentState) return
  dispatch(setBlocked(true))
  setTimeout(() => { dispatch(setBlocked(false)) }, blockedTime)
}