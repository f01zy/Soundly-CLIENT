"use client"

import styles from "@/components/UI/Sidebar/styles.module.scss"
import { browseMusic, libraryLinks } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const isOpen = useTypedSelector(selector => selector.siteSlice.sidebar)
  const pathname = usePathname()

  return <aside className={`${styles.sidebar} ${isOpen ? "" : styles.close}`}>
    <h1>Soundly</h1>

    <h2>Browse Music</h2>
    <ul>
      {browseMusic.map(([Icon, label, path]) => (
        <li key={label} className={pathname === path ? styles.active : ""}><Link href={path}><Icon /> {label}</Link></li>
      ))}
    </ul>
    <h2>Library</h2>
    <ul>
      {libraryLinks.map(([path, label]) => (
        <li key={label} className={pathname === path ? styles.active : ""}><Link href={path}>{label}</Link></li>
      ))}
    </ul>
  </aside>
}

export default Sidebar;