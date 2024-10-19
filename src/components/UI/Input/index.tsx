import styles from "@/components/UI/Input/styles.module.scss"
import { AppDispatch } from "@/store/store"
import { alert } from "@/utils/alert.utils"
import { InputHTMLAttributes, FC, ChangeEvent } from "react"
import { useDispatch } from "react-redux"

interface IInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  field?: string
  register?: any,
  label: string
}

export interface IImageSize {
  imageWidth?: number
  imageHeight?: number
}

const Input: FC<IInput & IImageSize> = ({ label, field, register, imageWidth, imageHeight, ...props }) => {
  const dispatch = useDispatch<AppDispatch>()

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.type != "file") return

    const file = e.target.files?.[0];

    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = function () {
        if (img.width > imageWidth! || img.height > imageHeight!) {
          alert(dispatch, `The image exceeds the maximum size (${imageWidth}x${imageHeight}). Please select a different image.`);
          e.target.value = '';
        }
        URL.revokeObjectURL(img.src);
      }
    }
  }

  return <div className={props.type === "file" ? styles.file : styles.input}>
    <input
      placeholder=""
      {...props}
      {...(register && field ? register(field, { ...props }) : {})}
      {...(props.type === "file" && { onChange: onFileSelect })}
    />
    {props.type === "file" ? <div><p>{label}</p></div> : <p>{label}</p>}
  </div>
}

export default Input;