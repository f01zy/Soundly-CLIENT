import { IListening } from "./listening.interface";
import { IUser } from "./user.interface";

export interface IMusic {
  _id: string
  date: Date
  author: IUser
  name: string
  listenings: Array<IListening>,
  likes: Array<string>,
  type: "track"
}