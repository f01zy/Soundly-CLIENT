import styles from "@/components/UI/Button/styles.module.scss"
import { FC, ButtonHTMLAttributes } from "react"

type TVariant = "default" | "danger"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TVariant
  children: React.ReactNode;
}

const Button: FC<IButton> = ({ children, variant, ...props }) => {
  const variantStyles: Record<TVariant, string> = {
    "default": "bg-white text-black",
    "danger": "bg-red-600 text-white"
  }

  const defVariant = variant || "default"

  return <button
    {...props}

    className={`${styles.button} ${variantStyles[defVariant]} ${props.className}`}
  >{children}</button>
}

export default Button;