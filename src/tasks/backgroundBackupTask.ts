import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { getStorageUser } from "@/shared/storage/service/user";
import { updateOrCreateBackup } from "@/shared/services/c-pix/backup.service";

export const BACKUP_TASK_NAME = "auto-backup";
export const MINIMUM_INTERVAL = 1440;

TaskManager.getRegisteredTasksAsync().then((tasks) => {
  console.info("Task registradas: ", tasks);
});

console.info("Task definida:", TaskManager.isTaskDefined(BACKUP_TASK_NAME));

TaskManager.defineTask(BACKUP_TASK_NAME, async () => {
  const user = await getStorageUser("user-data");

  try {
    if (user?.plan?.name === "Free") {
      await BackgroundTask.unregisterTaskAsync(BACKUP_TASK_NAME);
      return BackgroundTask.BackgroundTaskResult.Success;
    }
    if (user) {
      await updateOrCreateBackup(user);
    }
  } catch (error) {
    console.log("Task Error", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }

  return BackgroundTask.BackgroundTaskResult.Success;
});
export const initializeBackgroundTask = async () => {
  if (!(await TaskManager.isTaskRegisteredAsync(BACKUP_TASK_NAME))) {
    await BackgroundTask.registerTaskAsync(BACKUP_TASK_NAME, {
      minimumInterval: MINIMUM_INTERVAL,
    });
    console.info("Executando backup");
  }
};
