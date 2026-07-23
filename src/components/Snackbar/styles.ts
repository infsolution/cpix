import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    width: "90%",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    zIndex: 10,
    paddingHorizontal: 12,
    opacity: 0.8,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
