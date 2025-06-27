import { alert } from "./alert.utils"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { blocked } from "./blocked.utils"
import { blockedTime } from "@/components/Wrappers/Layout";

export const handleClickBlock = (dispatch: Dispatch<UnknownAction>, currentBlocked: boolean) => {
  if (currentBlocked) { alert(dispatch, `There are too many requests. Try it in ${Math.floor(blockedTime / 1000)} seconds`); return true }
  else { blocked(dispatch, currentBlocked); return false }
}