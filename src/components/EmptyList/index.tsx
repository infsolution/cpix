import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/theme/colors";

type EmptyListProps = {
  own: number;
};
export function EmptyList({ own }: EmptyListProps) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="pix" size={92} color={colors.green.btn} />
      <Text style={styles.titleMain}>OPA!</Text>
      {own === 1 ? (
        <View style={styles.info}>
          <Text style={styles.title}>Você ainda não tem chave cadastrada!</Text>
          <Text style={styles.text}>Toque em Adicionar Chave</Text>
        </View>
      ) : (
        <View style={styles.info}>
          <Text style={styles.title}>Você não tem chave compartilhada!</Text>
          <Text style={styles.title}>Toque na lupa 🔍 para pesquisar e </Text>
          <Text style={styles.text}>peça um amigo para compartilhar você!</Text>
        </View>
      )}
    </View>
  );
}
