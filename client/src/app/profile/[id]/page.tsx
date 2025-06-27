import { TFetchError } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import Profile from "@/page/Profile";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const res = await fetch(`http://localhost:5000/api/users/${id}`).then(res => res.json()).then(res => res as IUser & TFetchError)

  if (res.status === 404) return notFound()

  return {
    title: res.username + " | " + "Soundly",
    description: `The ${res.username} page. Here you can get acquainted with his profile and watch his tracks`,
  }
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return <Profile {...params} />
}

export default ProfilePage;
