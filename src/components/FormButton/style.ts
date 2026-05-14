import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerFill: {
        backgroundColor: colors.green.btn,
        height: 48,
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    containerOutline: {
        backgroundColor: colors.white,
        height: 48,
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.green.btn,
        borderWidth: 1,

    },
    title: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 500
    },
    titleOutline: {
        color: colors.green.btn,
        fontSize: 20,
        fontWeight: 500
    }
})
