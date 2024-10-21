import { IMusic } from "./music.interface"
import { IPlaylist } from "./playlist.interface"

export interface IUser {
  _id: string
  isStaff: boolean
  username: string
  email: string
  isActivated: boolean
  avatar: boolean
  banner: boolean
  description: string
  links: Array<string>
  likes: Array<IMusic>
  tracks: Array<IMusic>
  history: Array<IMusic>
  playlists: Array<IPlaylist>
  subscriptions: Array<IUser>,
  subscribers: Array<IUser>
}