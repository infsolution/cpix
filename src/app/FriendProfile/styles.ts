import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 12,
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 12,
  },
  userContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.titles,
  },
  subTitle: {
    fontSize: 12,
    color: colors.text.subTitle,
  },
  dataContainer: {
    width: "100%",
  },
  info: {
    marginTop: 12,
  },
  label: {
    marginBottom: 8,
    color: "#080808",
    marginLeft: 2,
  },

  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
  legend: {
    width: "100%",
    paddingHorizontal: 24,
  },
});
