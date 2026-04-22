import { setStringAsync } from 'expo-clipboard';
export async function copyText(text: string) {
    if (text) {
        await setStringAsync(text);
        console.log("item copiado: " + text);
    }
}