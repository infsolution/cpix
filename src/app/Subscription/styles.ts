import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
    color: colors.text.titles,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.text.subTitle,
  },
  benefitBlock: {
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 16,
    color: colors.text.titles,
  },
  benefitTitle: {
    fontSize: 22,
    marginBottom: 8,
    fontWeight: 600,
    color: colors.text.label,
  },
  benefitText: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.text.subTitle,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  cardPlan: {
    alignItems: "flex-start",
    width: "100%",
    minHeight: 260,
    backgroundColor: colors.callAction.secondary,
    borderColor: colors.callAction.main,
    borderRadius: 12,
    padding: 22,
  },
  textCard: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 600,
  },
  cardItem: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginBottom: 4,
  },
  cardPeriod: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  cardValue: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "bold",
  },
  cardPeriodChange: {
    fontSize: 12,
    color: colors.text.subTitle,
    fontWeight: "bold",
    padding: 6,
    backgroundColor: colors.callAction.cardSecondary,
    borderRadius: 22,
  },
  viewPeriod: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
