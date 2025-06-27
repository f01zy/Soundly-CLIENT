"use client"

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCreate } from "@/store/playlist/playlist.slice";
import { ICreatePlaylist } from "@/interfaces/playlistCreate.interface";
import { setLoading, setWindowForm } from "@/store/site/site.slice";
import WindowForm from "../../WindowForm";
import { useTypedSelector } from "@/hooks/selector.hook";
import { $api } from "@/http";
import { TInputExtends } from "@/types/input.type";

const CreatePlaylistStepOne = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useTypedSelector(selector => selector.userSlice)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (user?.tracks.length === 0) { dispatch(setLoading(true)); await $api.post("/playlist", { tracks: [], ...data }).then(() => dispatch(setLoading(false))); dispatch(setWindowForm(null)) }
    dispatch(setCreate({ ...data as ICreatePlaylist }))
    dispatch(setWindowForm(null))
    dispatch(setWindowForm("createPlaylistStepTwo"))
  }

  const inputs: Array<TInputExtends> = [
    {
      field: "name",
      label: "name",
      type: "text"
    },
    {
      field: "description",
      label: "description",
      type: "text"
    }
  ]

  return <WindowForm inputs={inputs} onSubmit={onSubmit} title="Create playlist" />
}

export default CreatePlaylistStepOne;