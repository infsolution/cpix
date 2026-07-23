import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "90%",
    borderRadius: 4,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25",
    marginHorizontal: "auto",
    maxWidth: "auto",
    padding: 16,
  },

  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    color: colors.text.titles,
  },
  subtitle: {
    fontSize: 12,
    color: colors.text.subTitle,
    marginBottom: 6,
    lineHeight: 22,
  },
  options: {
    gap: 6,
  },
  option: {
    backgroundColor: colors.callAction.secondary,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
    gap: 4,
  },
  optionText: {
    color: colors.white,
  },
});
