import { alertTime, getIsAlertShow, setIsAlertShow } from '@/components/Wrappers/Layout';
import { hideAlert, setAlert } from '@/store/alert/alert.slice';
import { Dispatch } from "@reduxjs/toolkit";

export const alert = (dispatch: Dispatch, alert: string) => {
  if (getIsAlertShow()) return
  dispatch(setAlert(alert))
  setIsAlertShow(true)
  setTimeout(() => { dispatch(hideAlert()); setIsAlertShow(false) }, alertTime)
}