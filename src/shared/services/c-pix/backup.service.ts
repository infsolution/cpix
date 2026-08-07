import * as SQLite from "expo-sqlite";
import { cPixApi } from "@/shared/api/c-pix";
import {
  GetConfirmationResponse,
  IUser,
} from "@/shared/interfaces/user-interface";
import { getJWT } from "@/shared/storage/service/user";
import { KeysToBackup } from "@/app/Type/types";
import { AppError } from "@/shared/helpers/AppError";
import { DATABASE_NAME } from "@/database/migrate";

export const getDatabase = async () => {
  return SQLite.openDatabaseAsync(DATABASE_NAME);
};
export const backupToCloud = async (uuid: string) => {
  const database = await getDatabase();

  const data = await database.getAllAsync<KeysToBackup>(`
      SELECT name, key, bank, is_public, own FROM keys WHERE universal_uuid = '${uuid}'
      `);
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

export const updateOrCreateBackup = async (user: IUser) => {
  try {
    if (user?.universal_uuid) {
      const data = await backupToCloud(user?.universal_uuid);
      if (!data) {
        throw new AppError("Erro to trying backup keys");
      }
      const backup = {
        uuid: user.universal_uuid,
        data: data,
      };
      const dataText = JSON.stringify(backup);
      const { message, code, confirm } =
        await updateOrCreateBackupKeys(dataText);
    }
  } catch (error) {
    throw new AppError("Backup keys error keys" + error);
  }
};
