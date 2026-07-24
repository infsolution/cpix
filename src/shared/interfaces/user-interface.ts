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
  plan?: IPlan;
}

export interface SUser {
  id: number;
  name: string;
  keyPix?: string;
  user_name: string;
  image: string;
  connected: boolean;
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

export interface FormEditProfileParams {
  id: string;
  name: string;
  userName: string;
  email: string;
  termChecked: boolean;
}

export interface FormEditProfileResponse {
  message: string;
  code: string;
  data: IUser;
}

export interface GetConfirmationResponse {
  message: string;
  code: string;
  confirm: boolean;
}

export interface UploadProfileResponse {
  message: string;
  code: string;
  image: string;
}

export interface RecoveryPasswordResponse {
  message: string;
  code: string;
  data: {
    email: string;
  };
}

export interface IPlan {
  name: string;
  number_of_allowed_keys: number;
  have_backup: boolean;
  have_custom_notifications: boolean;
  have_dashboard: boolean;
  send_invoices: boolean;
}
