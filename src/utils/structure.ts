import { setStringAsync } from 'expo-clipboard';
import { Share, ToastAndroid } from 'react-native';
export const copyText = async (text: string) => {
    if (text) {
        try {
            await setStringAsync(text);
            ToastAndroid.show("Chave : " + text + "\nCopiado para a áreaa de transferência.", ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show("A chave : " + text + " não pode ser copiada, tente novamente.", ToastAndroid.SHORT);
            console.log("item não copiado: " + text);
        }
    }
}


export const shareText = async (text: string) => {
    if (text) {
        try {
            await Share.share({ message: text });
            console.log("item compartilhado: " + text);
        } catch (error) {
            ToastAndroid.show("Descuple, não conseguimos compartilha a chave.", ToastAndroid.SHORT);
            console.log("item não compartilhado: " + text);
        }
    }
}


