import { cPixApi } from "@/shared/api/c-pix";
import { IKeyResponse } from "@/shared/interfaces/key-interface";
import { getJWT } from "@/shared/storage/service/user";

export const getKeys = async (): Promise<IKeyResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<IKeyResponse>("key/shared", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const getUserKeys = async (): Promise<IKeyResponse> => {
  try {
    const token = await getJWT("user-jwt");
    const { data } = await cPixApi.get<IKeyResponse>("profile/keys", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error fetching user keys: " + error);
  }
};
