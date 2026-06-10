import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 112,
    backgroundColor: colors.tab.background,
    padding: 12,
    paddingTop: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  ActiveIcon: {
    marginTop: 6,
    borderRadius: 50,
    padding: 2,
    backgroundColor: colors.tab.circleIcon,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    borderRadius: 50,
    paddingTop: 12,
    backgroundColor: colors.tab.background,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textIcon: {
    fontSize: 10,
    color: colors.tab.defaultIcon,
  },
});
