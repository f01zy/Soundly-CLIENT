import styles from "@/components/Tracks/TracksList/styles.module.scss"
import CardRow from "@/components/UI/CardRow";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { FC } from "react";

interface ITracksList {
  tracks: Array<IMusic> | "recent"
}

const TracksList: FC<ITracksList> = ({ tracks }) => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  return user ? (tracks === "recent" ? user?.history : tracks).map(track => (
    <div className={styles.track}>
      <CardRow {...track} />
    </div>
  )) : <h3>Please auth</h3>
}

export default TracksList;