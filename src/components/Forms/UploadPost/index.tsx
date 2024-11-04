"use client"

import styles from "@/components/Forms/UploadPost/styles.module.scss"
import Input from "@/components/UI/Input"
import { useTypedSelector } from "@/hooks/selector.hook"
import { IUploadPost } from "@/interfaces/postCreate.interface"
import { AppDispatch } from "@/store/store"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import Button from "@/components/UI/Button"
import Image from "next/image"
import { IoMdClose } from "react-icons/io"
import { setWindowForm } from "@/store/site/site.slice"
import { $api } from "@/http"
import Textarea from "@/components/UI/Textarea"

const UploadPost = () => {
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useTypedSelector(selector => selector.userSlice)

  const { handleSubmit, register } = useForm<IUploadPost>()

  const onSubmit: SubmitHandler<IUploadPost> = async data => {
    if (loading) return
    setLoading(true)

    await $api.post("/post", data)
      .then(() => dispatch(setWindowForm(null)))
      .catch(err => setError(err.response.data.message))
      .finally(() => setLoading(false))
  }

  return <div className={`${styles.upload} formBaseStyles`}>
    <div className="flex justify-between items-center w-full mb-2">
      <h1>Upload post</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <p className="text-red-600 mb-2 text-sm">{error}</p>
      <Input label="title" field="title" register={register} max={30} required />
      <Textarea className="mt-2" register={register} field="content" maxLength={3000} required />
      <Button className="mt-5" style={{ width: "100%", height: "40px" }} type="submit">
        {
          loading ?
            <Image unoptimized src={"/loader.svg"} width={30} height={100} alt="loader" /> :
            "Upload"
        }
      </Button>
    </form>
  </div >
}

export default UploadPost