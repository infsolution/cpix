import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  inputSession: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  input: {
    width: "60%",
    color: "#fff",
    backgroundColor: colors.header.inputBackground,
    borderRadius: 26,
    paddingHorizontal: 12,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
});
