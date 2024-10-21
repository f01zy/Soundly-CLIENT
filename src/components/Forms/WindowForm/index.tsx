import styles from "@/components/Forms/WindowForm/styles.module.scss"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import Button from "../../UI/Button";
import { FC } from "react"
import { useTypedSelector } from "@/hooks/selector.hook";
import { setWindowForm } from "@/store/site/site.slice";
import Input from "@/components/UI/Input";
import { TInputExtends } from "@/types/input.type";

interface IWindowForm {
  onSubmit: SubmitHandler<FieldValues>,
  inputs: Array<TInputExtends>,
  title: string
}

const WindowForm: FC<IWindowForm> = ({ inputs, onSubmit, title }) => {
  const { loading, windowError } = useTypedSelector(selector => selector.siteSlice)
  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit } = useForm()

  return <div className={styles.form}>
    <div className="flex justify-between items-center w-full mb-2">
      <h1>{title}</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      {windowError && <p className="w-full mb-3 text-base text-red-600">{windowError}</p>}

      {inputs.flatMap(input => <Input {...(input as TInputExtends)} register={register} required />)}

      <Button className="mt-5" style={{ width: "100%", height: "40px" }} type="submit">{loading ? <Image unoptimized src={"/loader.svg"} width={30} height={100} alt="loader" /> : "Upload"}</Button>
    </form>
  </div>
}

export default WindowForm;