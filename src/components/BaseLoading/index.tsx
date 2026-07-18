import { FontAwesome6 } from "@expo/vector-icons";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
export const BaseLoading = () => {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="pix" size={92} color={colors.green.btn} />
      <Text style={styles.text}> carregando suas informações</Text>
      <ActivityIndicator />
    </View>
  );
};
