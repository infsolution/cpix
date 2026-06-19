export interface IUser {
  id: number;
  name: string;
  user_name: string;
  email: string;
  universal_uuid: string;
  ddd: string;
  phone: string;
  is_public: boolean;
  token: string;
  image?: string;
}

export interface SUser {
  id: number;
  name: string;
  keyPix?: string;
  user_name: string;
  image: string;
}

export interface SUserResponse {
  message: string;
  code: string;
  data: SUser[];
}

export interface UserFriend {
  id: string;
  name: string;
  userName: string;
  image?: string;
  connectionNumber: string;
  keyNumber: string;
}

export interface FriendUserResponse {
  message: string;
  code: string;
  data: UserFriend;
}
