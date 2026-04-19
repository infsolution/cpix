import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from "./styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "@/theme/colors";
import { useNavigation } from '@react-navigation/native';

export function TabGoBack() {
    const navigation = useNavigation();
    return (
        <LinearGradient colors={[colors.header.max, colors.header.min]} style={styles.container} >
            <View style={styles.backcontainer}>
                <MaterialIcons name="arrow-back" size={24} color={colors.text.titles} onPress={() => navigation.navigate("home")} />
            </View>
        </LinearGradient>
    )
}