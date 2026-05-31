import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from "./styles";
import { fontFamily } from '@/theme/fontFamily';


type Props ={
    setListType:(type:string)=>void
    listType:string
}
export function TabBar({listType, setListType}:Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={()=>setListType('own')}>
                <Text style={fontFamily.regular}>Minhas Chaves</Text>
                <View style={listType === 'own'?styles.activeTab:''}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={()=>setListType('others')}>
                <Text style={fontFamily.regular}>Chaves compartilhadas</Text>
                <View style={listType === 'others'?styles.activeTab:''}></View>
            </TouchableOpacity>
        </View>
    )
}