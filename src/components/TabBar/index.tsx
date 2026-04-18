import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from "./styles";
import { fontFamily } from '@/theme/fontFamily';



export function TabBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab}>
                <Text style={fontFamily.regular}>Todas</Text>
                <View style={styles.activeTab}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Text style={fontFamily.regular}>Minhas Chaves</Text>
                {/* <View style={styles.activeTab}></View> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
               <Text style={fontFamily.regular}>Chaves de Amigos</Text>
                {/* <View style={styles.activeTab}></View> */}
            </TouchableOpacity>
        </View>
    )
}