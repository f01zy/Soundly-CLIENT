"use client"

import Avatar from "@/components/UI/Avatar"
import CardRow from "@/components/UI/CardRow"
import EditProfile from "@/components/Forms/EditProfile"
import Upload from "@/components/Forms/Upload"
import { SERVER_URL } from "@/config"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import { IUser } from "@/interfaces/user.interface"
import styles from "@/page/Profile/styles.module.scss"
import { TWindowForm, setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { RiEdit2Fill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import CreatePlaylistStepOne from "@/components/Forms/CreatePlaylist/one"
import CreatePlaylistStepTwo from "@/components/Forms/CreatePlaylist/two"
import Link from "next/link"
import Skeleton from "@/components/UI/Skeleton"
import Button from "@/components/UI/Button"
import ConfirmEmailBanner from "@/components/UI/ConfirmEmailBanner"
import { alert } from "@/utils/alert.utils"
import { setUser } from "@/store/user/user.slice"
import { handleClickBlock } from "@/utils/handleClickBlock.utils"

enum ESlide { "Tracks", "Playlists" }
const length = Object.keys(ESlide).length / 2
const values: Array<string> = []

for (let i = 0; i < length; i++) {
  values.push(ESlide[i])
}

const Profile: FC<{ id: string }> = ({ id }) => {
  const [fetchUser, setFetchUser] = useState<IUser>()
  const [slide, setSlide] = useState<ESlide>(ESlide.Tracks)
  const { user } = useTypedSelector(selector => selector.userSlice)
  const { windowForm, blocked } = useTypedSelector(selector => selector.siteSlice)
  const dispatch = useDispatch<AppDispatch>()

  const avatar = 90

  const forms = [
    ["uploadTrack", Upload],
    ["editProfile", EditProfile],
    ["createPlaylistStepOne", CreatePlaylistStepOne],
    ["createPlaylistStepTwo", CreatePlaylistStepTwo]
  ]

  const openCreateMenu = (menu: TWindowForm) => {
    if (!user || user._id != fetchUser?._id) return
    if (!user.isActivated) return alert(dispatch, "Confirm your email")

    dispatch(setWindowForm(menu))
  }

  const subscribe = () => {
    if (!user || !fetchUser) return
    if (!user.isActivated) return alert(dispatch, "Confirm your email")
    const isBlocked = handleClickBlock(dispatch, blocked); if (isBlocked) return
    $api.post(`/users/${fetchUser._id}/subscribe`)
      .then(res => dispatch(setUser(res.data)))
  }

  useEffect(() => { $api.get<IUser>(`/users/${id}`).then(res => setFetchUser(res.data)) }, [])

  return fetchUser ? <div className={styles.profile}>
    {
      forms.map(form => {
        if (windowForm === form[0]) {
          const Component = form[1]
          return <Component />
        }
      })
    }

    {
      user?._id === fetchUser._id && !fetchUser.isActivated && <ConfirmEmailBanner />
    }

    <div className={styles.user}>
      <div className={styles.container}>
        <div className={styles.banner}>{fetchUser.banner && <Image unoptimized src={`${SERVER_URL}/banner/${fetchUser._id}.jpg`} alt="banner" width={100} height={100} className="w-full h-full" />}</div>
        <div className={styles.user_info}>
          <Avatar user={fetchUser} width={avatar} height={avatar} />
          <h3>{fetchUser.username}</h3>
          <p>{fetchUser.tracks.length} tracks</p>
          <p>{fetchUser.playlists.length} playlists</p>
          {
            user && user._id != fetchUser._id ? <Button
              variant={
                user.subscriptions.some(item => item._id === fetchUser._id) ?
                  "danger" :
                  "default"
              }
              className="mt-2 ml-2"
              style={{ width: "120px", height: "30px" }}
              onClick={subscribe}
            >
              {user.subscriptions.some(item => item._id === fetchUser._id) ? "Unsubscribe" : "Subscribe"}
            </Button> : ""
          }
          {user?._id === fetchUser._id && <RiEdit2Fill style={{ marginTop: "15px" }} width={30} onClick={() => dispatch(setWindowForm("editProfile"))} className="ml-3 cursor-pointer" />}
        </div>
      </div>
      <p className={`${styles.description} text-base`}>{fetchUser.description}</p>
      {
        fetchUser.links.length > 0 && <div className={`${styles.links} mt-3`}>
          <h3 className="text-base">Links</h3>
          <ul>
            {fetchUser.links.map(link => <li><Link className="text-sm" href={link}>{link}</Link></li>)}
          </ul>
        </div>
      }
    </div>
    <nav>
      <ul>
        {values.map(el => (
          <li onClick={() => setSlide(values.indexOf(el))} className={values.indexOf(el) === slide ? "border-b-2 border-white pb-2" : ""} key={el}>{el}</li>
        ))}
      </ul>
    </nav>

    {slide === ESlide.Tracks ? <>
      {
        user?._id === fetchUser._id &&
        <div className={styles.createButton} onClick={() => openCreateMenu("uploadTrack")}>
          <Button className="mt-5" style={{ width: "100%", height: "40px" }}>Upload</Button>
        </div>
      }
      <div className={styles.tracks}>{fetchUser.tracks.map(track => <div className={styles.track}><CardRow key={track._id} {...track} /></div>)}</div>
    </> : ""}

    {slide === ESlide.Playlists ? <>
      {
        user?._id === fetchUser._id &&
        <div className={styles.createButton} onClick={() => openCreateMenu("createPlaylistStepOne")}>
          <Button className="mt-5" style={{ width: "100%", height: "40px" }}>Create</Button>
        </div>
      }
      <div className={styles.tracks}>{fetchUser.playlists.map(playlist => playlist.author._id === fetchUser._id && <div className={styles.track}><CardRow key={playlist._id} {...playlist} /></div>)}</div>
    </> : ""}
  </div> : <div className={styles.profile}>
    <div className={styles.user}>
      <div className={styles.container}>
        <div className={styles.banner}></div>
        <div className={styles.user_info}>
          <Skeleton width={`${avatar}px`} height={`${avatar}px`} />
        </div>
      </div>
      <p className={`${styles.description} text-base`}><Skeleton width="200px" height="25px" /></p>
    </div>
    <nav>
      <ul>
        <li><Skeleton width="100px" height="25px" /></li>
        <li><Skeleton width="100px" height="25px" /></li>
        <li><Skeleton width="100px" height="25px" /></li>
      </ul>
    </nav>
    <div className={styles.tracks}>
      <div className={styles.track}><Skeleton width="100%" height="50px" /></div>
      <div className={styles.track}><Skeleton width="100%" height="50px" /></div>
      <div className={styles.track}><Skeleton width="100%" height="50px" /></div>
    </div>
  </div>
}

export default Profile;