import { cPixApi } from "@/shared/api/c-pix";
import {
  CreateKey,
  IEditKeyResponse,
  IKeyResponse,
  KeysFriendResponse,
  UpdateKey,
} from "@/shared/interfaces/key-interface";
import { GetConfirmationResponse } from "@/shared/interfaces/user-interface";
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
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<IKeyResponse>("profile/keys", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const getKey = async (id: string): Promise<IEditKeyResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<IEditKeyResponse>(`key/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const addKey = async (keyData: CreateKey): Promise<IKeyResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.post<IKeyResponse>("key/add", keyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};
export const updateKey = async (keyData: UpdateKey): Promise<IKeyResponse> => {
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
};

export const createOrUpdateKey = async (
  keyData: CreateKey | UpdateKey,
): Promise<IKeyResponse> => {
  if ("id" in keyData) {
    return await updateKey(keyData);
  } else {
    return await addKey(keyData);
  }
};

export const deleteKeys = async (ids: string[]): Promise<void> => {
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
};

export const getFriendKeys = async (id: string) => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<KeysFriendResponse>(`key/friend/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const updateOrCreateBackupKeys = async (values: string) => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.post<GetConfirmationResponse>(
    "key/backup",
    { data: values },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
