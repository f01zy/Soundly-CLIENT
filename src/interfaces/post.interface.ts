import { IUser } from "./user.interface";

export interface IPostComment {
  post: IPost,
  author: IUser,
  content: string
}

export interface IPost {
  _id: string
  title: string,
  author: IUser,
  date: Date,
  content: string,
  likes: Array<string>,
  comments: Array<string>
}