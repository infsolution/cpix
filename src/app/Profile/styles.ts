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
  list: {
    flexDirection: "row",
  },
  appBar: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    width: "88%",
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: colors.callAction.light,
    borderRadius: 24,
    height: 36,
    gap: 4,
  },
  btnBar: {
    backgroundColor: colors.white,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 24,
  },
  navActiveText: {
    color: colors.callAction.main,
    fontWeight: "bold",
  },
  navInactiveText: {
    color: colors.text.subTitle,
  },
});
