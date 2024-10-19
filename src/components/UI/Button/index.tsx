import styles from "@/components/UI/Button/styles.module.scss"
import { FC } from "react"

type TVariant = "default" | "danger"

interface IButton {
  variant?: TVariant
  type?: "button" | "submit" | "reset";
  disabled?: boolean
  onSubmit?: any;
  children: React.ReactNode;
}

const Button: FC<IButton> = ({ children, onSubmit, type, disabled, variant }) => {
  const variantStyles: Record<TVariant, string> = {
    "default": "bg-white text-black",
    "danger": "bg-red-600 text-white"
  }

  const defVariant = variant || "default"

  return <button
    disabled={disabled}
    type={type}
    onSubmit={onSubmit}
    className={`${styles.button} ${variantStyles[defVariant]}`}
  >{children}</button>
}

export default Button;