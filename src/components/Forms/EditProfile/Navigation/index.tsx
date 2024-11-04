import styles from "@/components/Forms/EditProfile/Navigation/styles.module.scss"
import { Dispatch, SetStateAction, FC } from "react";
import { TEditProfilePage, editProfileCategories, editProfilePages } from "..";

interface IEditProfileNavigation {
  setPage: Dispatch<SetStateAction<TEditProfilePage>>,
  page: TEditProfilePage
}

const EditProfileNavigation: FC<IEditProfileNavigation> = ({ setPage, page }) => {
  return <div className={styles.editProfileNavigation}>
    {
      editProfileCategories.map(
        c => <div className={styles.category}>
          <h2>{c}</h2>
          <ul>
            {
              editProfilePages.filter(p => p[0] === c).map(i =>
                <li className={`${page === i[1] ? styles.active : ""} text-base`} onClick={() => setPage(i[1])}>{i[1]}</li>
              )
            }
          </ul>
        </div>
      )
    }
  </div>
}

export default EditProfileNavigation;