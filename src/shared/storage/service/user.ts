import { AppError } from "@/shared/helpers/AppError";
import { IUser } from "@/shared/interfaces/user-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageUser = async (key: string): Promise<IUser | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    throw new AppError("Error getting item from storage" + error);
  }
};

export const setStorageUser = async (
  key: string,
  value: IUser,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new AppError("Error setting item to storage" + error);
  }
};

export const getJWT = async (key: string): Promise<string | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (error) {
    throw new Error("Error getting token from storage" + error);
  }
};
export const setJWT = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw new AppError("Error setting token to storage" + error);
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new AppError("Error removing item" + error);
  }
};
