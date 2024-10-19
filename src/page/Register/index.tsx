"use client"

import { IRegister } from "@/interfaces/register.interface";
import { AppDispatch } from "@/store/store";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerF } from "@/store/user/user.actions"
import AuthForm from "@/components/Forms/AuthForm";
import { useState } from "react"
import { TInputExtends } from "@/types/input.type";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isSenden, setIsSended] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (isSenden) return

    setIsSended(true)

    const typedData = data as IRegister
    dispatch(registerF(typedData)).then(() => setIsSended(false))
  }

  const inputs: Array<TInputExtends> = [
    {
      label: "username",
      field: "username",
      type: "text",
      min: 4,
      max: 16
    },
    {
      field: "email",
      label: "email",
      type: "email"
    },
    {
      field: "password",
      label: "password",
      type: "password",
      min: 8,
      max: 30
    }
  ]

  return <AuthForm buttonLabel="Register" inputs={inputs} onSubmit={onSubmit} />
}

export default Register;