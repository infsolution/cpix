import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from "./styles";

export function TabBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab}>
                <Text>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text>Minhas Chaves</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text>Chaves de Amigos</Text>
            </TouchableOpacity>
        </View>
    )
}