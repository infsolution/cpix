import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    paddingBottom: 48,
    minHeight: "100%",
  },
  title: {
    marginTop: 52,
    fontSize: 24,
    fontWeight: 400,
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
  formControlPublic: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 26,
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: "#080808",
    marginLeft: 2,
  },
  readyOnlyContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  readOnlyTitleConteiner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 48,
  },
  readyOnlyTitle: {
    fontSize: 28,
    fontWeight: 500,
    color: colors.text.titles,
  },
  readyOnlyText: {
    fontSize: 16,
    color: colors.text.label,
  },
  readyOnlyTextkey: {
    fontSize: 20,
    color: colors.text.label,
    fontWeight: "bold",
  },
});
