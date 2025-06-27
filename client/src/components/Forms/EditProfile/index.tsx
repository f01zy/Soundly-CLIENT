import styles from "@/components/Forms/EditProfile/styles.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useTypedSelector } from "@/hooks/selector.hook";
import Input from "../../UI/Input";
import { IProfile } from "@/interfaces/profile.interface";
import Button from "../../UI/Button";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { setWindowForm } from "@/store/site/site.slice";
import { FcAddImage } from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";
import { $api } from "@/http";
import { SERVER_URL } from "@/config";
import { IUser } from "@/interfaces/user.interface";
import { setUser } from "@/store/user/user.slice";

const EditProfile = () => {
  const [error, setError] = useState<string>()
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null)
  const [banner, setBanner] = useState<string | ArrayBuffer | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useTypedSelector(selector => selector.userSlice)
  const [links, setLinks] = useState<Array<string>>([""])
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user && user.links) {
      if (user.links.length > 0) {
        setLinks(user.links)
      }
    }
  }, [user])

  const onSubmit: SubmitHandler<IProfile> = async data => {
    if (!user) return

    const isEmpty = data.avatar.length === 0 &&
      data.banner.length === 0 &&
      (user.username === data.username || data.username.length === 0) &&
      (user.description === data.description || data.description.length === 0) &&
      user.links === links

    if (isEmpty) return setError("You haven't changed any fields")

    setLoading(true)

    const formData = new FormData()

    data.avatar.length > 0 && formData.append("avatar", data.avatar[0])
    data.banner.length > 0 && formData.append("banner", data.banner[0])
    data.description && formData.append("description", data.description)
    !(user.username === data.username || data.username.length === 0) && formData.append("username", data.username)

    if (links.some(el => el.trim().length > 0)) {
      links.forEach((link, index) => formData.append(`links[${index}]`, link))
    }

    await $api.put<IUser>("/users", formData)
      .then(res => { dispatch(setUser(res.data)); close() })
      .catch(err => { setError(err.response.data.message) })
  }

  const close = () => dispatch(setWindowForm(null))

  const fileChange = (e: ChangeEvent<HTMLInputElement>, field: "avatar" | "banner") => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { if (field === "avatar") setAvatar(reader.result); else if (field === "banner") setBanner(reader.result); };
      reader.readAsDataURL(file);
    }
  }

  const { register, handleSubmit } = useForm<IProfile>()

  return <div className={styles.form}>
    <div className="flex justify-between items-center w-full mt-2 mb-2">
      <h1>Edit profile</h1>
      <IoMdClose width={25} height={25} onClick={() => close()} />
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="w-full mb-3 text-base text-red-600">{error}</p>}

      <div className={styles.banner}>
        {banner ? <Image unoptimized src={banner.toString()} alt="banner" height={100} width={100} className="w-full h-full" /> : user?.banner ? <Image unoptimized src={`${SERVER_URL}/banner/${user._id}.jpg`} alt="banner" width={100} height={100} className="w-full h-full" /> : <FcAddImage width={40} className={styles.load} />}
        <input type="file" multiple={false} accept="image/*" {...register("banner", { required: false, onChange: (e: ChangeEvent<HTMLInputElement>) => fileChange(e, "banner") })} />
      </div>
      <div className={styles.avatar}>
        {avatar ? <Image unoptimized src={avatar.toString()} alt="avatar" height={100} width={100} className="w-full h-full" /> : user?.avatar ? <Image unoptimized src={`${SERVER_URL}/avatar/${user._id}.jpg`} alt="avatar" width={100} height={100} className="w-full h-full" /> : <FcAddImage width={40} className={styles.load} />}
        <input type="file" multiple={false} accept="image/*" {...register("avatar", { required: false, onChange: (e: ChangeEvent<HTMLInputElement>) => fileChange(e, "avatar") })} />
      </div>

      <Input defaultValue={user?.username} min={4} max={16} field="username" label="username" required={false} type="text" register={register} />
      <Input defaultValue={user?.description} max={200} field="description" label="description" required={false} type="text" register={register} />
      <div className="w-full flex items-center justify-between mt-3"><h4 className="text-base">Links</h4><FaPlus onClick={() => { links.length >= 4 ? setError("Maximum of four links") : setLinks([...links, ""]) }} /></div>
      <div className="w-full">
        {links.map((link, index) => <div className="mt-2 w-full flex items-center justify-between"><Input defaultValue={link} label="link" type="url" onChange={e => { let tempLinks = links; tempLinks[index] = e.target.value; setLinks(tempLinks) }} />{links.length > 1 && <IoMdClose className="ml-4" onClick={() => setLinks(links.filter((_, i) => i != index))} />}</div>)}
      </div>

      <Button className="mt-5" style={{ width: "100%", height: "40px" }} type="submit">
        {
          loading ?
            <Image unoptimized src={"/loader.svg"} width={30} height={100} alt="loader" /> :
            "Save changes"
        }
      </Button>
    </form>
  </div>
}

export default EditProfile;