import {LinearGradient} from "expo-linear-gradient"
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View,  } from "react-native";
import { UserCircle } from "../UserCircle";
import { Input } from '@/components/Input';

export function Header() {
    return (
        <LinearGradient colors={[colors.header.max, colors.header.min]} style={styles.container} >
            <View style={styles.inputSession}>
                <UserCircle name="Cicero Leonardo" />
                <Input style={styles.input} placeholder='Buscar chave...' placeholderTextColor={colors.white} />
            </View>
        </LinearGradient>
    )       
}