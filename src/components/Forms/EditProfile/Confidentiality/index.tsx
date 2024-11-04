import styles from "@/components/Forms/EditProfile/Confidentiality/styles.module.scss"
import Button from "@/components/UI/Button";
import ChoiceInput from "@/components/UI/ChoiceInput";
import { useTypedSelector } from "@/hooks/selector.hook";
import { $api } from "@/http";
import { TConfidentiality, TConfidentialityField, confidentialityChoices } from "@/interfaces/user.interface";
import Image from "next/image";
import { useState, FormEvent } from "react"

const EditProfileConfidentiality = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const user = useTypedSelector(selector => selector.userSlice.user)!
  const [likes, setLikes] = useState<TConfidentialityField>(user.confidentiality.likes)
  const [subscriptions, setSubscriptions] = useState<TConfidentialityField>(user.confidentiality.subscriptions)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    const confidentiality: TConfidentiality = { likes, subscriptions }
    $api.put("/users", { confidentiality }).finally(() => setLoading(false))
  }

  return <form onSubmit={e => onSubmit(e)} className={styles.confidentiality}>
    <ChoiceInput state={likes} setState={setLikes} choices={Array.from(confidentialityChoices)} title="Visibility of likes" />
    <ChoiceInput state={subscriptions} setState={setSubscriptions} choices={Array.from(confidentialityChoices)} title="Visibility of subscriptions" />
    <Button onSubmit={e => onSubmit(e)} style={{ width: "100%", height: "40px", marginTop: "17px" }}>
      {
        loading ?
          <Image unoptimized src={"/loader.svg"} width={30} height={100} alt="loader" /> :
          "Save changes"
      }
    </Button>
  </form>
}

export default EditProfileConfidentiality;