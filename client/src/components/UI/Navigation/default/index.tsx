"use client"

import styles from "@/components/UI/Navigation/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook";
import { $api } from "@/http";
import { setSidebar } from "@/store/site/site.slice";
import { setCurrentMusic } from "@/store/music/music.slice";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/user/user.slice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Avatar from "../../Avatar";
import { IMusic } from "@/interfaces/music.interface";
import SearchResults from "../../SearchResults";
import { setLoading, setMusicResult } from "@/store/search/search.slice";
import Image from "next/image";

const Navigation = () => {
  const [userMenu, setUserMenu] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<boolean>(false)

  let searchTimeout: NodeJS.Timeout

  const pathname = usePathname()!
  const pathnameBreadcrumbs = ("home" + pathname).split("/"); delete pathnameBreadcrumbs[pathnameBreadcrumbs.length - 1]
  const user = useTypedSelector(selector => selector.userSlice.user)
  const { sidebar } = useTypedSelector(selector => selector.siteSlice)
  const { loading } = useTypedSelector(selector => selector.searchSlice)
  const dispatch = useDispatch<AppDispatch>()

  const avatar = 35
  const inputTimeoutTime = 300

  const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
      const q = e.target.value; if (q.length === 0) return dispatch(setMusicResult([]))
      dispatch(setLoading(true))
      const res = await $api.get<{ results: Array<IMusic>, total: number }>(`/search?q=${q}`).then(res => { dispatch(setLoading(false)); return res.data })
      dispatch(setMusicResult(res.results))
    }, inputTimeoutTime)
  }

  const links: [string, string][] = [
    ["Home", "/"],
    ["New releases", "/releases"],
    ["Shuffle play", "/shuffle"]
  ]

  return <nav className={styles.navigation}>
    <div className={`${styles.icon} ${sidebar ? styles.open : ""}`} onClick={() => dispatch(setSidebar(!sidebar))}><span></span><span></span><span></span></div>
    <h1 className={styles.logo}>Soundly</h1>
    <ul className={styles.links}>
      <li><div className={`${styles.input} ${searchInput ? styles.open : ""}`}><input type="text" onChange={onSearchChange} /><IoSearchSharp onClick={() => setSearchInput(!searchInput)} />{loading ? <Image src={"/circle-loader-white.svg"} alt="loading" width={100} height={100} /> : ""}</div><SearchResults /></li>
      {links.map(link => (
        <li key={link[1]}><Link href={link[1]} className={pathname === link[1] ? styles.active : ""}>{link[0]}</Link></li>
      ))}
    </ul>
    {user ? (
      <div className={styles.user} onClick={() => {
        setUserMenu(!userMenu)
      }}>
        <p className="mr-3">{user.username}</p>
        <Avatar user={user} width={avatar} height={avatar} />
        <div className={`${styles.menu} ${userMenu ? "visible opacity-100" : "invisible opacity-0"}`}>
          <ul>
            <Link href={`/profile/${user._id}`}><li>Profile</li></Link>
            <li onClick={() => {
              $api.get("/auth/logout")
              dispatch(setUser(null))
              dispatch(setCurrentMusic(null))
            }}>Log out</li>
          </ul>
        </div>
      </div>
    ) : (
      <div className={styles.auth}>
        <button><Link href={"/login"}>Log in</Link></button>
        <button><Link href={"/register"}>Register</Link></button>
      </div>
    )}
  </nav>
}

export default Navigation;