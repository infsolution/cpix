import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 50,
    alignItems: "center",
    backgroundColor: colors.list.circle,
  },
  scroll: {
    padding: 12,
    width: "96%",
  },
});
