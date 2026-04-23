import { View, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from "./styles";
import { ReactNode, useState } from 'react';
import { Feather } from "@expo/vector-icons"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme/colors';
import { KeysToShare } from '@/app/Type/types';
import { shareText } from '@/utils/structure';


type Props = {
    children: ReactNode;
    keys?: KeysToShare[];
    currentRoute: string

}
export function AppBar({ children, currentRoute, keys = [] }: Props) {
    const navigation = useNavigation();
    console.log(currentRoute)
    function share() {
        if (keys.length === 0) {
            ToastAndroid.show("Selecione uma ou mais chaves para compartilhr", ToastAndroid.SHORT)
            return;
        }
        let toShare = "Olá Estou compartilhando com você as chaves PIX de:";
        if (keys.length === 1) {
            toShare = "Olá Estou compartilhando com você a chave PIX de:"
        }
        if (keys.length > 0) {
            toShare += keys.map((keyPix) => {
                return "\n" + keyPix.name + "\nChave: " + keyPix.keyPix
            })
        }
        toShare += "\n\nJá baixou o CPix? Ainda não? Então baixe agora: https://link-do-cpix-na-playstore"
        // Desmarcar as chaves na lista
        shareText(toShare);
    }
    return (
        <View style={styles.container}>
            {children}
            <View style={styles.appBar}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("home")} style={
                    currentRoute === "home" ? styles.ActiveIcon : styles.icon
                }>
                    <Feather name="home" size={32} color={
                        currentRoute === "home" ? colors.tab.defaultIconText : colors.tab.defaultIcon
                    } />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={{ paddingTop: 10 }} onPress={share}>
                    <Feather name="share-2" size={32} color={colors.tab.defaultIcon} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("profile")} style={
                    currentRoute === "profile" ? styles.ActiveIcon : styles.icon
                }>
                    <Ionicons name="person-circle-outline" size={32} color={
                        currentRoute === "profile" ? colors.tab.defaultIconText : colors.tab.defaultIcon
                    } />
                </TouchableOpacity>
            </View>
        </View>
    )
}