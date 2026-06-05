import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.titles,
  },
  subTitle: {
    fontSize: 12,
    color: colors.text.titles,
  },
  formControl: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    marginBottom: 8,
    color: "#080808",
    marginLeft: 2,
    fontSize: 12,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
});
