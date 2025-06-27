"use client"

import { FC } from "react"
import CompositionPattern from "@/page/CompositionPattern";

interface IPlaylistDetail {
  id: string
}

const PlaylistDetailt: FC<IPlaylistDetail> = ({ id }) => {
  return <CompositionPattern id={id} type="playlist" />
}

export default PlaylistDetailt;