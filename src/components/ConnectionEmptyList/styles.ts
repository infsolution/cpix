import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 24,
        backgroundColor: colors.list.circle,
        alignItems: "center",
        padding: 12
    },
    info: {
        justifyContent: "flex-start",
        marginBottom: 24
    },
    text: {
        fontSize: 14,
        color: colors.text.label
    },
    title: {
        fontSize: 16,
        color: colors.text.label
    },
    titleMain: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.text.label
    }
});