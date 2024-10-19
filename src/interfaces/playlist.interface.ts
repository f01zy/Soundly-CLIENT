import { IMusic } from "./music.interface"
import { IUser } from "./user.interface"

export interface IPlaylist {
  _id: string
  name: string,
  description: string,
  author: IUser
  saving: Array<string>
  tracks: Array<IMusic>
  type: "playlist"
}