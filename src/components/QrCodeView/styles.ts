import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
export const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  textInput: {
    width: "50%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  formQR: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 16,
  },
  button: {
    width: "50%",
    height: 48,
    backgroundColor: colors.green.btn,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {},
});
