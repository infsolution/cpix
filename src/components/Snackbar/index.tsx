import { View, Text } from "react-native";
import { styles } from "./styles";
import { useSnackbarContext } from "@/context/snackbar.context";
import { colors } from "@/theme/colors";

export const Snackbar = () => {
  const { type, message } = useSnackbarContext();
  if (!message || !type) {
    return <></>;
  }
  const bgColor = `${
    type === "SUCCESS" ? colors.callAction.secondary : colors.callAction.danger
  }`;
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
