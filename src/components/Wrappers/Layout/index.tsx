"use client"

import { useParams, usePathname } from "next/navigation";
import Navigation from "@/components/UI/Navigation/default";
import Sidebar from "@/components/UI/Sidebar";
import styles from "@/components/Wrappers/Layout/styles.module.scss"
import { useAuth } from "@/hooks/auth.hook";
import Player from "../../UI/Player";
import { PlayerController } from "@/utils/music/playerController.utils";
import { useTypedSelector } from "@/hooks/selector.hook";
import Mask from "../../UI/Mask";
import { TMusicMode } from "@/types/musicMode.type";
import Alert from "@/components/UI/Alert";
import AdminNavigation from "@/components/UI/Navigation/admin";
import ConfirmEmailBanner from "@/components/UI/ConfirmEmailBanner";

export const playerController = new PlayerController()
export let musicInterval: NodeJS.Timeout | null = null
export const setMusicInterval = (newInterval: NodeJS.Timeout | null) => musicInterval = newInterval

let musicMode: TMusicMode = "random"

export const getMusicMode = () => musicMode
export const setMusicMode = (mode: TMusicMode) => musicMode = mode

export type TFetchError = {
  status: number
}

export const blockedTime = 1000 * 10
export const alertTime = 1000 * 5

let isAlertShow = false

export const setIsAlertShow = (bool: boolean) => isAlertShow = bool
export const getIsAlertShow = () => isAlertShow

let i = 0

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname()!
  const params = useParams()
  const { sidebar, windowForm } = useTypedSelector(selector => selector.siteSlice)
  const { result } = useTypedSelector(selector => selector.searchSlice)

  const isHideNavigation = ["/login", "/register", `/profile`, "/shuffle"].some(page => pathname.includes(page));
  const isHideSidebar = ["/login", "/register", `/profile`, "/shuffle", "/admin"].some(page => pathname.includes(page));

  const navigations: [string, () => JSX.Element][] = [["default", Navigation], ["admin", AdminNavigation]]

  const Nav = navigations.find(nav => pathname.includes(nav[0]))?.[1] || navigations[0][1]

  i === 0 && useAuth()
  i++

  return <>
    {!isHideNavigation && <Nav />}
    {!isHideSidebar && <Sidebar />}
    {!isHideSidebar ? <div className={styles.children}>{children}</div> : <>{children}</>}
    <Player />
    {sidebar || windowForm || (result.music.length > 0) ? <Mask /> : ""}
    <Alert />
  </>
}

export default Layout;