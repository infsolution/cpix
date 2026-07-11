import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  changePassword: {
    backgroundColor: colors.callAction.secondary,
    borderRadius: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
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
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 4,
    paddingHorizontal: 24,
  },
  termContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
});
