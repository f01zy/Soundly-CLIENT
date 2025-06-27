import styles from "@/components/UI/Avatar/styles.module.scss"
import { SERVER_URL } from "@/config";
import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import { FC } from "react"
import { FaUser } from "react-icons/fa6";

interface IAvatar {
  user: IUser,
  width: number,
  height: number
}

const Avatar: FC<IAvatar> = ({ user, height, width }) => {
  return <div className={styles.avatar} style={{ width: width + "px", height: height + "px" }}>
    {user.avatar ? <Image unoptimized src={`${SERVER_URL}/avatar/${user._id}.jpg`} alt="avatar" width={100} height={100} className="w-full h-full rounded" /> : <FaUser />}
  </div>
}

export default Avatar;