import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
export const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  title: {
    marginBottom: 4,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  formQR: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  formInput: {
    width: "49%",
    gap: 4,
  },
  label: {
    marginLeft: 4,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: colors.green.btn,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  textError: {
    color: colors.red.delete,
    paddingHorizontal: 4,
  },
  qrcode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  copy: {
    marginTop: 8,
    marginBottom: 4,
  },
});
