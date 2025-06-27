"use client"

import styles from "@/components/Forms/CreatePlaylist/two/styles.module.scss"
import Button from "@/components/UI/Button"
import CardRow from "@/components/UI/CardRow"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import { ICreatePlaylist } from "@/interfaces/playlistCreate.interface"
import { setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { IoMdClose } from "react-icons/io"

const CreatePlaylistStepTwo = () => {
  const [tracks, setTracks] = useState<Array<string>>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useTypedSelector(selector => selector.userSlice)
  const create = useTypedSelector(selector => selector.playlistSlice.create)

  const { handleSubmit } = useForm<ICreatePlaylist>()

  const onSubmit: SubmitHandler<ICreatePlaylist> = async data => {
    if (!create) return
    setLoading(true)

    await $api.post("/playlist", { tracks, description: create.description, name: create.name }).then(() => { setLoading(false); dispatch(setWindowForm(null)) }).catch(() => setError(true))
  }

  return <div className={styles.selectTracks}>
    <div className="flex justify-between items-center w-full mt-2 mb-2">
      <h1>Edit profile</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Choice tracks</h2>
      {error ? <p className="text-base mb-2 text-red-600">An error has occurred</p> : ""}
      <div className={styles.tracks}>
        {user ? user.tracks.map(track => <div className={`flex items-center relative`}>
          <CardRow {...track} key={track._id} />
          <input className="h-full w-auto ml-4" type="checkbox" onChange={e => { e.target.checked ? setTracks([...tracks, track._id]) : setTracks(tracks.filter(clearTrack => clearTrack != track._id)) }} />
        </div>) : ""}
      </div>
      <Button className="mt-5" style={{ width: "100%", height: "40px" }} type="submit">
        {
          loading ?
            <Image unoptimized src={"/loader.svg"} width={30} height={100} alt="loader" /> :
            "Create playlist"
        }
      </Button>
    </form>
  </div>
}

export default CreatePlaylistStepTwo;