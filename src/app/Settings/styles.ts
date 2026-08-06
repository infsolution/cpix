import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inputSession: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 24,
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
