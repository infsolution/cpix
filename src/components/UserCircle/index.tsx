import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles";
type Props={
    name: string,
}
export function UserCircle({ name }: Props) {
     const navigation = useNavigation();
    const captOne = name.charAt(0).toUpperCase();
    const captTwo = name.charAt(0).toUpperCase();
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigation.navigate("profile")}>
            <Text style={styles.text}>{captOne+captTwo}</Text>
        </TouchableOpacity>
    )
}