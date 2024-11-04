import { IMusic } from "./music.interface"
import { IPlaylist } from "./playlist.interface"
import { IPost, IPostComment } from "./post.interface"

export const confidentialityChoices = ["everyone", "nobody"] as const
export type TConfidentialityField = typeof confidentialityChoices[number]

export type TConfidentiality = {
  likes: TConfidentialityField,
  subscriptions: TConfidentialityField
}

export interface IUser {
  _id: string
  isStaff: boolean
  username: string
  email: string
  isActivated: boolean
  avatar: boolean
  banner: boolean
  description: string,
  confidentiality: TConfidentiality
  links: Array<string>
  likes: Array<IMusic>
  tracks: Array<IMusic>
  history: Array<IMusic>
  playlists: Array<IPlaylist>
  posts: Array<IPost>,
  postsLiked: Array<IPost>,
  postsComments: Array<IPostComment>,
  subscriptions: Array<IUser>,
  subscribers: Array<IUser>
}