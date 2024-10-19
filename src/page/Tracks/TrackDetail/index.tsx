"use client"

import { FC } from "react"
import CompositionPattern from "@/page/CompositionPattern";

interface ITrackDetail {
  id: string
}

const TrackDetail: FC<ITrackDetail> = ({ id }) => {
  return <CompositionPattern id={id} type="track" />
}

export default TrackDetail;