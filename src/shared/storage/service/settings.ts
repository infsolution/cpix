import { AppError } from "@/shared/helpers/AppError";
import { Settings } from "@/shared/interfaces/settings-interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Gets the settings from storage
 * @param key User uuid
 * @returns Setting | null
 */
export const getStorageSettings = async (
  key: string,
): Promise<Settings | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    throw new AppError("Error getting settings from storage" + error);
  }
};
/**
 * Sets the settings in storage
 * @param key user uuid
 * @param value Setting interface
 */
export const setStorageSettings = async (
  key: string,
  value: Settings,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new AppError("Error setting settings to storage" + error);
  }
};

/**
 * Removes the settings from storage
 * @param key User uuid
 */
export const removeStorageSettings = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new AppError("Error removing settings from storage" + error);
  }
};
