import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 62,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 8,
  },
  texts: {
    flex: 1,
  },
  title: {
    color: colors.list.titleItem,
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    color: colors.list.textItem,
    fontWeight: "normal",
    fontSize: 16,
  },
  checkbox: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
});
