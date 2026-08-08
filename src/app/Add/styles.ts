import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    minHeight: "100%",
    justifyContent: "space-between",
    backgroundColor: colors.list.circle,
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    marginTop: 20,
    color: colors.text.titles,
  },
  subTitle: {
    fontSize: 14,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    padding: 24,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    color: "#080808",
    marginLeft: 2,
  },
  formControlPublic: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 26,
    marginBottom: 16,
  },
});
