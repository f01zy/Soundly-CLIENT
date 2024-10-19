import { IImageSize } from "@/components/UI/Input";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export type TInput = Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder">

export type TInputExtends = {
  type?: HTMLInputTypeAttribute,
  field: string,
  label: string
} & IImageSize & TInput