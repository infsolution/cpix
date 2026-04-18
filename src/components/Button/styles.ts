import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green.btn,
        height: 48,
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 500
    }
})