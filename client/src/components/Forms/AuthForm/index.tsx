import styles from "@/components/Forms/AuthForm/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import Input from "@/components/UI/Input"
import { TInputExtends } from "@/types/input.type"

interface IAuthForm {
  buttonLabel: string,
  onSubmit: SubmitHandler<FieldValues>,
  inputs: Array<TInputExtends>
}

const AuthForm: FC<IAuthForm> = ({ onSubmit, inputs, buttonLabel }) => {
  const { message, loading } = useTypedSelector(selector => selector.userSlice)
  const pathname = usePathname()
  const buttonLink = pathname === "/login" ? "register" : "login"

  const { register, handleSubmit, } = useForm()

  return <div className={styles.auth}>
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{buttonLabel} Here</h1>
        {message.value && <p className={`w-full text-base ${message.status === "error" ? "text-red-600" : "text-green-500"}`}>{message.status === "error" ? message.value : `You can go to the `}{message.status === "success" && <Link href={"/"} className="!text-blue-500">home</Link>}</p>}
        {inputs.flatMap(input => <Input {...input} register={register} required />)}
        <p className={styles.link}>{pathname === "/register" && <>Don&apos;t</>} have an account yet? - <Link href={`/${buttonLink}`} className="text-cyan-600">{buttonLink}</Link></p>
        <Button className="mt-5" style={{ width: "100%", height: "40px" }} type="submit">
          {
            loading ?
              <Image unoptimized src={"loader.svg"} width={30} height={100} alt="loader" /> :
              buttonLabel
          }
        </Button>
      </form>
    </div>
  </div>
}

export default AuthForm;