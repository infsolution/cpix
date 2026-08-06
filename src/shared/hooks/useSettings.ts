import { AppError } from "../helpers/AppError";
import { Settings } from "@/shared/interfaces/settings-interfaces";
import {
  getStorageSettings,
  removeStorageSettings,
  setStorageSettings,
} from "@/shared/storage/service/settings";
import { useAuthContext } from "@/context/auth.context";
export const useSettings = () => {
  const { user } = useAuthContext();
  const getSettings = async (): Promise<Settings | null> => {
    const settings = await getStorageSettings(user?.universal_uuid || "");
    if (!settings) {
      throw new AppError("Settings not found");
    }
    console.log("settings", settings);
    return settings;
  };

  const setSettings = async (settings: Settings): Promise<void> => {
    try {
      await setStorageSettings(user?.universal_uuid || "", settings);
    } catch (error) {
      throw new AppError("Error setting settings to storage" + error);
    }
  };

  const removeSettings = async (): Promise<void> => {
    try {
      await removeStorageSettings(user?.universal_uuid || "");
    } catch (error) {
      throw new AppError("Error removing settings from storage" + error);
    }
  };

  const calcTimeLastInteraction = (lastInteraction: Date | undefined) => {
    const now = new Date();
    if (lastInteraction !== undefined) {
      const last = new Date(lastInteraction);
      const diffInSeconds = Math.floor((now.getTime() - last.getTime()) / 1000);
      return diffInSeconds > 432000;
    }
    return undefined;
  };
  return { getSettings, setSettings, removeSettings, calcTimeLastInteraction };
};
