import { useAuthContext } from "@/context/auth.context";
import { usePixDatabase } from "@/database/usePixDatabase";
import { useCallback } from "react";
import { AppError } from "../helpers/AppError";
import { updateOrCreateBackupKeys } from "../services/c-pix/keys.service";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
export const useKeysBackup = () => {
  const { user } = useAuthContext();
  const { backupToCloud } = usePixDatabase();
  const { notify } = useSnackbarContext();
  const { handleError } = useErrorHandler();

  const updateOrCreateBackup = useCallback(async () => {
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
        notify({
          message: message,
          messageType: "SUCCESS",
        });
      }
    } catch (error) {
      handleError(error, "Backup keys error keys");
    }
  }, []);
  return {
    updateOrCreateBackup,
  };
};
