import { cPixApi } from "@/shared/api/c-pix";
import {
  CreateKey,
  IEditKeyResponse,
  IKeyResponse,
  UpdateKey,
} from "@/shared/interfaces/key-interface";
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

export const getKey = async (id: string): Promise<IEditKeyResponse> => {
  try {
    const token = await getJWT("user-jwt");
    const { data } = await cPixApi.get<IEditKeyResponse>(`key/${id}`, {
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

export const addKey = async (keyData: CreateKey): Promise<IKeyResponse> => {
  try {
    const token = await getJWT("user-jwt");
    const { data } = await cPixApi.post<IKeyResponse>("key/add", keyData, {
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
export const updateKey = async (keyData: UpdateKey): Promise<IKeyResponse> => {
  try {
    console.log("Update", keyData);
    const token = await getJWT("user-jwt");
    const { data } = await cPixApi.patch<IKeyResponse>(
      `key/${keyData.id}`,
      keyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error("Error fetching user keys: " + error);
  }
};

export const createOrUpdateKey = async (
  keyData: CreateKey | UpdateKey,
): Promise<IKeyResponse> => {
  console.info("Function", keyData);
  if ("id" in keyData) {
    return await updateKey(keyData);
  } else {
    return await addKey(keyData);
  }
};

export const deleteKeys = async (ids: string[]): Promise<void> => {
  try {
    const token = await getJWT("user-jwt");
    const keys = {
      keys: ids,
    };
    await cPixApi.delete("key/keys", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: keys,
    });
  } catch (error) {
    throw new Error("Error deleting keys: " + error);
  }
};
