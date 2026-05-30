import { IUser } from "./user-interface";

export interface IAuthenticateResponse{
    message: string;
    code: string
    data: IUser;
}