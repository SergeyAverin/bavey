export interface IFriendRequest {
  pk: number;
  sender: {
    username: string,
    avatar: string
  };
  recipient: {
    username: string,
    avatar: string
  };
  message: string;
}
