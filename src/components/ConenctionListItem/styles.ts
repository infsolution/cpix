import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
    height: 60,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "space-between",
    marginBottom: 4,
    backgroundColor: colors.white,
  },
  name: {
    color: colors.text.titles,
    fontWeight: "bold",
  },
  bankName: {
    color: colors.text.subTitle,
  },
  text: {
    // color: colors.text.subTitle,
  },
  icons: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  textIconDelete: {
    fontSize: 10,
    color: colors.callAction.danger,
  },
  textIconAccept: {
    fontSize: 10,
    color: colors.callAction.tertiary,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
});
