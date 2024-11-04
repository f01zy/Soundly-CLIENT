"use client"

import styles from "@/components/Forms/EditProfile/styles.module.scss"
import { useState } from "react"
import EditProfileNavigation from "./Navigation"
import EditProfileComponent from "./Profile"
import EditProfileConfidentiality from "./Confidentiality"
import { IoMdClose } from "react-icons/io"
import { setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"

export const editProfileCategories = ["Account", "App settings", "Danger zone"] as const;
export type TCategory = typeof editProfileCategories[number];

export const editProfilePages = [
  ["Account", "Profile"],
  ["Account", "Confidentiality"],
  ["App settings", "Theme"],
  ["App settings", "Special features"],
  ["App settings", "Keyboard shortcuts"],
  ["Danger zone", "Log out"],
  ["Danger zone", "Delete account"],
] as const;

export type TEditProfilePage = typeof editProfilePages[number][1];

const EditProfile = () => {
  const [page, setPage] = useState<TEditProfilePage>("Profile")
  const dispatch = useDispatch<AppDispatch>()

  const pageComponents: Record<TEditProfilePage, () => JSX.Element> = {
    "Confidentiality": EditProfileConfidentiality,
    "Profile": EditProfileComponent,
    "Theme": () => <div></div>,
    "Special features": () => <div></div>,
    "Keyboard shortcuts": () => <div></div>,
    "Log out": () => <div></div>,
    "Delete account": () => <div></div>,
  }

  const Page = pageComponents[page]

  const close = () => dispatch(setWindowForm(null))

  return <div className={`${styles.form} formBaseStyles`}>
    <EditProfileNavigation setPage={setPage} page={page} />
    <div className={styles.pageContainer}>
      <div className="flex justify-between items-center w-full mb-2">
        <h1>{page}</h1>
        <IoMdClose width={25} height={25} onClick={() => close()} />
      </div>
      <Page />
    </div>
  </div>
}

export default EditProfile;