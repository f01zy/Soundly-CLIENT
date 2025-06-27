"use client"

import styles from "@/components/UI/Card/styles.module.scss"
import { SERVER_URL } from "@/config";
import Image from "next/image";
import { FC } from "react";
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { handlePlayClick } from "@/utils/music/handlePlayClick.utils";
import { filterListeningsByDate } from "@/utils/filterListeningsByDate.utils";

const Card: FC<IMusic> = (props) => {
	const router = useRouter()
	const { music, loading } = useTypedSelector(selector => selector.musicSlice)
	const user = useTypedSelector(selector => selector.userSlice.user)
	const dispatch = useDispatch<AppDispatch>()

	return <div className={styles.card}>
		<div className={styles.container}>
			<div className={styles.cover}>
				<Image unoptimized src={`${SERVER_URL}/cover/${props._id}.jpg`} alt={props.name} width={100} height={100} />

				<div className={styles.play}>
					<div onClick={() => {
						handlePlayClick(dispatch, props, user, router, music?._id)
					}}>
						{loading === props._id ? <Image src={"/circle-loader.svg"} alt="loading" width={100} height={100} /> : music?.name != props.name ? <IoIosPlay /> : music?.isPaused ? <IoIosPlay /> : <FaPause />}
					</div>
				</div>
			</div>
			<Link href={`/tracks/${props._id}`}><h3>{props.name}</h3></Link>
			<p>({filterListeningsByDate(props.listenings).length} listening on last week)</p>
			<Link href={`/profile/${props.author._id}`}><p>{props.author.username}</p></Link>
		</div>
	</div>
}

export default Card;