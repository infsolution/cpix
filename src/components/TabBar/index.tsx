import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from "./styles";

export function TabBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Conexões</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Bancos</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Minhas Chaves</Text>
            </TouchableOpacity>
        </View>
    )
}