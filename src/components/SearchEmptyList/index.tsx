import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/theme/colors";

export function SearchEmptyList() {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="pix" size={92} color={colors.green.btn} />
      <Text style={styles.titleMain}>OPA!</Text>

      <View style={styles.info}>
        <Text style={styles.title}>Informe uma chave!</Text>
        <Text style={styles.title}>Para buscar usuários comesse com @</Text>
      </View>
    </View>
  );
}
