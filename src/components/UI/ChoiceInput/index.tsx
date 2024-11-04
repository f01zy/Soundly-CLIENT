import styles from "@/components/UI/ChoiceInput/styles.module.scss"
import { FC, Dispatch } from "react"

interface IChoiceInput {
  state: any
  setState: Dispatch<any>
  title: string,
  choices: Array<string>
}

const ChoiceInput: FC<IChoiceInput> = ({ setState, choices, title, state }) => {
  return <div className={styles.input}>
    <h2 className="text-base">{title}</h2>
    <div className={styles.choices}>
      {
        choices.map(
          i => <div
            className={`${styles.choice} ${state === i ? styles.active : ""}`}
            onClick={() => setState(i)}
          >
            <h4>{i}</h4>
          </div>
        )
      }
    </div>
  </div>
}

export default ChoiceInput;