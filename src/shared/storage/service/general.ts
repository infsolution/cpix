import AsyncStorage from '@react-native-async-storage/async-storage';


export const clearStorage = async () => {
    try {
        const item = await AsyncStorage.clear();
    } catch (error) {
        throw new Error("Error to try clear storage" + error);
    }
}