import { UserLoged } from '@/app/Type/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStorageUser = async (key: string): Promise<UserLoged | null> => {
    try {
        const item = await AsyncStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        throw new Error("Error getting item from storage" + error);

    }
}

export const setStorageUser = async (key: string, value: UserLoged): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        throw new Error("Error setting item to storage" + error);
    }
}
