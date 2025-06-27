import styles from "@/components/UI/ConfirmEmailBanner/styles.module.scss"
import { $api } from "@/http";
import Image from "next/image";
import { useState } from "react"
import { IoMdClose } from "react-icons/io";

const ConfirmEmailBanner = () => {
  const [isSended, setIsSended] = useState<boolean>(false)
  const [isClose, setIsClose] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const send = () => {
    setIsLoading(true)
    setIsError(false)
    $api.post<boolean>("/auth/activate/resend")
      .then(() => setIsSended(true))
      .finally(() => setIsLoading(false))
      .catch(() => setIsError(true))
  }

  return !isClose ? <div className={`${styles.confirm} ${isError ? "bg-red-600" : isSended ? "bg-green-600" : "bg-yellow-600"}`}>
    <div className={styles.container}>
      {
        isSended ?
          <h3>Check your mailbox. Follow the link from the sent email</h3> :
          <>
            <h3>
              {
                isError ? "Cannot send email" : "Confirm your email adress"
              }
            </h3>
            <h3 className="underine" onClick={send}>Send email</h3>
          </>
      }
    </div>
    {
      isLoading ?
        <Image src={"/circle-loader-white.svg"} alt="loading" width={100} height={100} /> :
        <IoMdClose onClick={() => setIsClose(true)} />
    }
  </div> : ""
}

export default ConfirmEmailBanner;