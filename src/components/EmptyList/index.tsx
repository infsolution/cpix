import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from "@/theme/colors";

export function EmptyList() {
    return (
        <View style={styles.container} >
            <FontAwesome6 name="pix" size={92} color={colors.green.btn} />
            <Text style={styles.titleMain}>OPA!</Text>
            <View style={styles.info}>
                <Text style={styles.title}>Você ainda não tem chave cadastrada!</Text>
                <Text style={styles.text}>Toque em Adicionar Chave</Text>
                <Text style={styles.text} >Ou peça um amigo para compartilhar você!</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Pedir Amigo")} activeOpacity={0.8} >
                <FontAwesome6 name="slideshare" size={48} color={colors.list.captular} />
            </TouchableOpacity>
            <Text style={styles.text} >Pedir Amigo!</Text>
        </View>
    )
}