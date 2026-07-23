import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    height: 780,
    gap: 8,
  },
  input: {
    width: "100%",
    borderColor: colors.header.min,
    borderWidth: 1,
    color: colors.black,
    borderRadius: 26,
    paddingHorizontal: 12,
  },
  separators: {
    width: "100%",
    height: 3,
    backgroundColor: colors.background,
  },
});
