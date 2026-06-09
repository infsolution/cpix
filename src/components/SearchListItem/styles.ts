import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 22,
    paddingVertical: 8,
    width: "100%",
    height: 60,
    borderColor: "#AED9DA",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    color: colors.text.titles,
  },
  bankName: {
    color: colors.text.titles,
  },
  text: {
    //
  },
  icons: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
});
