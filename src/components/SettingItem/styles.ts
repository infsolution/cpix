import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  disabledButton: { backgroundColor: "#A0A0A0", opacity: 0.6 },
});
