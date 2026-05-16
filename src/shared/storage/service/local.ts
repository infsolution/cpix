import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        throw new Error("Error removing item from storage" + error);
    }
}