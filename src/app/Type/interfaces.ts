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

export interface FormResetPasswordParams {
  password: string;
  confirmPassword: string;
}

export interface FormRecoveryParams {
  email: string;
}
