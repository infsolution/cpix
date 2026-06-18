import { ConnectionResponse } from "@/app/Type/types";
import { cPixApi } from "@/shared/api/c-pix";
import { SUserResponse } from "@/shared/interfaces/user-interface";
import { getJWT } from "@/shared/storage/service/user";

type SearchType = {
  term?: string;
};
export const getUsers = async ({
  term = "",
}: SearchType): Promise<SUserResponse> => {
  const token = await getJWT("user-jwt");
  let path = "profile";
  if (term) {
    path += `?search=${term}`;
  }
  const { data } = await cPixApi.get<SUserResponse>(path, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const getConnectionUser = async (id: string): Promise<SUserResponse> => {
  const token = await getJWT("user-jwt");

  const { data } = await cPixApi.get<SUserResponse>(`profile/friend/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const getConnection = async (): Promise<ConnectionResponse> => {
  const token = await getJWT("user-jwt");

  const { data } = await cPixApi.get<ConnectionResponse>("profile/connection", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const getSentInvitation = async (): Promise<ConnectionResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<ConnectionResponse>(
    "profile/sent_invitations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};

export const getReceiverInvitation = async (): Promise<ConnectionResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<ConnectionResponse>(
    "profile/receiver_invitations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};

export const sendInvitation = async (
  id: string | number,
): Promise<SUserResponse> => {
  const token = await getJWT("user-jwt");
  const body = {
    guest: id,
  };
  const { data } = await cPixApi.post<SUserResponse>(
    "profile/send_invitation",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};

export const deleteConnection = async (
  connectionId: string,
): Promise<number> => {
  const token = await getJWT("user-jwt");
  const response = await cPixApi.delete<ConnectionResponse>(
    `profile/delete_invitation/${connectionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  return response.status;
};

export const acceptConnection = async (
  connectionId: string,
): Promise<ConnectionResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.patch<ConnectionResponse>(
    `profile/accept_invitation/${connectionId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
