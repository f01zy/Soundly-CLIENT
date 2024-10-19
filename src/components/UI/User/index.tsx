import styles from "@/components/UI/User/styles.module.scss"
import { IUser } from "@/interfaces/user.interface";
import { FC } from "react"
import { FaCopy } from "react-icons/fa6";
import Avatar from "../Avatar";
import { alert } from "@/utils/alert.utils";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";

const User: FC<IUser> = (props) => {
  const dispatch = useDispatch<AppDispatch>()

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert(dispatch, "Successfully copied")
  }

  const fields: Array<string> = ["username", "_id"]

  return <div className={styles.user}>
    <Avatar user={props} width={50} height={50} />
    {fields.map(field => <div className="flex items-center ml-2">
      <h3 className="mr-1">{(props as any)[field]}</h3>
      <FaCopy onClick={() => copy((props as any)[field])} />
    </div>)}
  </div>
}

export default User;