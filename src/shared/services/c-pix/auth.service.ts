import { FormLoginParams } from "@/app/Type/interfaces";
import { cPixApi } from "@/shared/api/c-pix";
import { IAuthenticateResponse } from "@/shared/interfaces/authenticate-response";



export const authenticate = async (userData: FormLoginParams):Promise<IAuthenticateResponse> =>{
    const {data} = await cPixApi.post<IAuthenticateResponse>("auth/login", userData);
    return data;
}