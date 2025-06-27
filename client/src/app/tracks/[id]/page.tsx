import { TFetchError } from "@/components/Wrappers/Layout";
import { IMusic } from "@/interfaces/music.interface";
import TrackDetail from "@/page/Tracks/TrackDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const res = await fetch(`http://localhost:5000/api/music/${id}`).then(res => res.json()).then(res => res as IMusic & TFetchError)

  if (res.status === 404) return notFound()

  return {
    title: res.name + " | " + "Soundly",
    description: `A separate music page called ${res.name}`,
  }
}

const TrackDetailPage = ({ params }: { params: { id: string } }) => {
  return <TrackDetail {...params} />
}

export default TrackDetailPage;
