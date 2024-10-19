import { IUser } from "./user.interface"

export interface IResponce {
  refreshToken: string
  accessToken: string
  user: IUser
}