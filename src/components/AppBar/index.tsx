import { View, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { ReactNode, useState } from 'react';
import { Feather } from "@expo/vector-icons"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme/colors';
type Props = {
    children: ReactNode;
}
export function AppBar({ children }: Props) {
    const navigation = useNavigation();
    const [currentRoute, setCurrentRoute] = useState("profile");
    return (
        <View style={styles.container}>
            {children}
            <View style={styles.appBar}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("home")} style={
                    currentRoute === "home" ? styles.ActiveIcon : styles.icon
                    }>
                    <Feather name="home" size={32} color={
                        currentRoute === "home" ? colors.tab.defaultIconText:colors.tab.defaultIcon
                        } />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={{paddingTop:10}}>
                    <Feather name="share-2" size={32} color={colors.tab.defaultIcon} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("profile")} style={
                    currentRoute === "profile" ? styles.ActiveIcon : styles.icon
                    }>
                    <Ionicons name="person-circle-outline" size={32} color={
                        currentRoute === "profile" ? colors.tab.defaultIconText:colors.tab.defaultIcon
                        } />
                </TouchableOpacity>
            </View>
        </View>
    )
}