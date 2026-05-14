export interface FormSigninParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termChecked: boolean;
}

export interface FormLoginParams {
    email: string;
    password: string;
}