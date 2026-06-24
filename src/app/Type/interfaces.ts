export interface FormSigninParams {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  uuid?: string;
  termChecked: boolean;
}

export interface FormLoginParams {
  email: string;
  password: string;
}
