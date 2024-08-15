import { IUser } from '@entities/user'

export interface IRelations {
  subscribers: IUser[];
  friends: IUser[];
  subscriptions: IUser[];
}
