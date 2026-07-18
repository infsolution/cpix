import { FormLoginParams, FormSigninParams } from "@/app/Type/interfaces";
import { cPixApi } from "@/shared/api/c-pix";
import { IAuthenticateResponse } from "@/shared/interfaces/authenticate-response";

export const authenticate = async (
  userData: FormLoginParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await cPixApi.post<IAuthenticateResponse>(
    "auth/login",
    userData,
  );
  console.info("LOGGED: ", data);
  return data;
};

export const register = async (
  userData: FormSigninParams,
): Promise<IAuthenticateResponse> => {
  const userForm = {
    name: userData.name,
    user_name: userData.userName,
    email: userData.email,
    password: userData.password,
    universal_uuid: userData.uuid,
    is_public: userData.termChecked,
  };
  const { data } = await cPixApi.post<IAuthenticateResponse>(
    "auth/register",
    userForm,
  );
  return data;
};
