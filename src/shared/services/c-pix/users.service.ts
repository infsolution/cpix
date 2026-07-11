import { FormResetPasswordParams } from "@/app/Type/interfaces";
import { ConnectionResponse } from "@/app/Type/types";
import { cPixApi } from "@/shared/api/c-pix";
import {
  FormEditProfileParams,
  FormEditProfileResponse,
  FriendUserResponse,
  GetConfirmationResponse,
  SUserResponse,
  UploadProfileResponse,
} from "@/shared/interfaces/user-interface";
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

export const getFriend = async (id: string): Promise<FriendUserResponse> => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.get<FriendUserResponse>(
    `profile/friend/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};

export const updateUser = async (
  userData: FormEditProfileParams,
): Promise<FormEditProfileResponse> => {
  const token = await getJWT("user-jwt");
  const user = {
    name: userData.name,
    user_name: userData.userName,
    email: userData.email,
    is_public: userData.termChecked,
  };
  const { data } = await cPixApi.patch(`profile`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const checkUserName = async (
  userName: string,
): Promise<GetConfirmationResponse> => {
  const { data } = await cPixApi.get(`auth/check_user_name/${userName}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};

export const uploadAvatar = async (
  avatarUri: string,
): Promise<UploadProfileResponse> => {
  const token = await getJWT("user-jwt");
  const formData = new FormData();
  formData.append("profile", {
    uri: avatarUri,
    type: "image/jpeg",
    name: "avatar.jpeg",
  } as unknown as Blob);

  const { data } = await cPixApi.post("profile/upload_image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const checkPassword = async (
  password: string,
): Promise<GetConfirmationResponse> => {
  const token = await getJWT("user-jwt");

  const { data } = await cPixApi.post(
    `profile/confirm_password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};

export const updatePassword = async (
  oldPassword: string,
  formPassword: FormResetPasswordParams,
): Promise<GetConfirmationResponse> => {
  const token = await getJWT("user-jwt");
  const body = {
    old_password: oldPassword,
    password: formPassword.password,
    password_confirmation: formPassword.confirmPassword,
  };
  const { data } = await cPixApi.patch(`profile/update_password`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};
