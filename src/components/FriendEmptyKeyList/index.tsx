import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/theme/colors";

type Props = {
  friendName: string;
};
export function FriendEmptyKeyList({ friendName }: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="pix" size={92} color={colors.green.btn} />
      <Text style={styles.titleMain}>OPA!</Text>
      <View style={styles.info}>
        <Text style={styles.title}>
          {friendName} ainda não compartilhou nenhuma chave.
        </Text>
        <Text style={styles.text}>
          Peça para que cadastre ou compartilhe uma chave!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => console.log("Pedir para compartilha")}
        activeOpacity={0.8}
      >
        <FontAwesome6
          name="slideshare"
          size={48}
          color={colors.list.capitular}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Pedir para compartilhar!</Text>
    </View>
  );
}
