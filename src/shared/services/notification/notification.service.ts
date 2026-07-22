import { getJWT } from "@/shared/storage/service/user";
import { cPixApi } from "@/shared/api/c-pix";
import {
  AksToShareForm,
  AskToShareNotificationResponse,
} from "@/shared/interfaces/notification-interface";

export const askToShare = async (formData: AksToShareForm) => {
  const token = await getJWT("user-jwt");
  const { data } = await cPixApi.post<AskToShareNotificationResponse>(
    "notification/ask_to_share",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
