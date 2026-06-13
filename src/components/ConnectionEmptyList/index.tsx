import { View, Text } from "react-native";
import { styles } from "./styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/theme/colors";
import { ListType } from "@/app/Type/types";
import { Button } from "@/components/Button";

type Props = {
  listType: ListType;
};
export function ConnectionEmptyList({ listType }: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="user-friends"
        size={66}
        color={colors.callAction.tertiary}
      />
      <Text style={styles.titleMain}>OPA!</Text>
      <View style={styles.info}>
        <Text style={styles.title}>Você não tem nenhum convite!</Text>
        <Text style={styles.text}>Se seus amigos não estão no CPIX</Text>
        <Text style={styles.text}>convide-os, é de graça</Text>
      </View>

      <Button
        title="CONVIDAR AMIGO"
        customStyle={{ backgroundColor: colors.callAction.main, width: "100%" }}
      />
    </View>
  );
}
