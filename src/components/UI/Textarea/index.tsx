import styles from "@/components/UI/Textarea/styles.module.scss"
import { FC, TextareaHTMLAttributes } from "react"

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  field: string
  register: any,
}

const Textarea: FC<ITextarea> = ({ field, register, ...props }) => {
  return <textarea
    {...props}
    {...register(field)}
    className={`${styles.textarea} ${props.className}`}
    onKeyDown={(e) => {
      if (e.key === "Tab") {
        e.preventDefault();

        const start = e.currentTarget.selectionStart;
        const end = e.currentTarget.selectionEnd;

        e.currentTarget.value = e.currentTarget.value.substring(0, start) + '    ' + e.currentTarget.value.substring(end);
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
      }
    }}
  >

  </textarea>
}

export default Textarea;