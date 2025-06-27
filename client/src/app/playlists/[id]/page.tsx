import { TFetchError } from "@/components/Wrappers/Layout";
import { IPlaylist } from "@/interfaces/playlist.interface";
import PlaylistDetailt from "@/page/Playlists/PlaylistDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const res = await fetch(`http://localhost:5000/api/playlist/${id}`).then(res => res.json()).then(res => res as IPlaylist & TFetchError)

  if (res.status === 404) return notFound()

  return {
    title: res.name + " | " + "Soundly",
    description: `A separate music page called ${res.name}`,
  }
}

const PlaylistDetailPage = ({ params }: { params: { id: string } }) => {
  return <PlaylistDetailt id={params.id} />
}

export default PlaylistDetailPage;
