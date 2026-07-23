import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { useKeysBackup } from "@/shared/hooks/useKeysBackup";
import { useAuthContext } from "@/context/auth.context";

export const BACKUP_TASK_NAME = "auto-backup";
export const MINIMUM_INTERVAL = 1400;

export const initializeBackgroundTask = async (
  innerAppMountedPromise: Promise<void>,
) => {
  TaskManager.defineTask(BACKUP_TASK_NAME, async () => {
    await innerAppMountedPromise;
    const { user } = useAuthContext();
    const { updateOrCreateBackup } = useKeysBackup();
    try {
      if (user?.plan?.name === "Free") {
        await BackgroundTask.unregisterTaskAsync(BACKUP_TASK_NAME);
        return BackgroundTask.BackgroundTaskResult.Success;
      }
      if (!(await TaskManager.isTaskRegisteredAsync(BACKUP_TASK_NAME))) {
        await BackgroundTask.registerTaskAsync(BACKUP_TASK_NAME, {
          minimumInterval: MINIMUM_INTERVAL,
        });
      }
      updateOrCreateBackup();
    } catch (error) {
      return BackgroundTask.BackgroundTaskResult.Failed;
    }
    return BackgroundTask.BackgroundTaskResult.Success;
  });
};
