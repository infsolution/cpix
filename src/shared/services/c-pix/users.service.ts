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

export const getConnection = async (
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
